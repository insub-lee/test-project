import Axios from 'axios';
import { createSelector } from 'reselect';
import * as feed from 'components/Feedback/functions';
import * as selecotrs from './note/selectors';

// const selectInformNote = state => state.get('gridsheet');
const selectAuth = state => state.get('auth');

const INFORMNOTE_TYPE = "CCG";

const getProfile = () => createSelector(
  selectAuth,
  authState => authState.get('profile'),
);

const fncChkAlarmCookie = (name,value) => { //alarm 쿠기정보 체크 2014.12.26
  let cookiedata = document.cookie;
  if ( cookiedata.indexOf(name + "=" + value) < 0 ){
    return "Y";
  } else {
    return "N";
  }
};

const getAllValuesInComboToString = (objId, delimeter) => {
	let returnStr = "";
	let comboOptionList = $("#"+objId+"> option");
	if(delimeter == undefined) delimeter = ",";
	if(comboOptionList.length != 0) {
		let tmpArray = new Array();
		comboOptionList.each(function(){
			if($(this).val() != "") tmpArray.push(trim($(this).val()));
		});
		returnStr = tmpArray.join(delimeter); 
	}
	return returnStr;
}

const fncAlarmPopup = (popNm, type, obj, searchParam) => {
  const { PARAM_BEBER, PARAM_STORT, MULTI_PARAM_ARBPL } = searchParam;
  let param = {
    PARAM_ALARM_BEBER: PARAM_BEBER,
    PARAM_ALARM_STAND: PARAM_STORT,
    PARAM_ALARM_ARBPL: MULTI_PARAM_ARBPL === undefined ? "" : MULTI_PARAM_ARBPL,
    PARAM_ALARM_U_ID: obj.U_ID,
    PARAM_ALARM_EQ_ID: obj.EQ_ID,
    PARAM_ALARM_EQ_MST_ID: obj.EQ_MST_ID,
    PARAM_ALARM_ISACTIVE: obj.ISACTIVE,
    PARAM_ALARM_PROC_ITEM: obj.PROC_ITEM.replace(/\n/g,"*"),
    PARAM_ALARM_COMP_ITEM: obj.COMP_ITEM.replace(/\n/g,"*"),
    PARAM_ALARM_TYPE: type,
    MULTI_PARAM_NOTI_TYPE: '',//getAllValuesInComboToString("combo_noti_type")
  }
  
  let param1 = param.PARAM_ALARM_BEBER + '|' 
    + param.PARAM_ALARM_STAND + '|' 
    + param.PARAM_ALARM_ARBPL + '|' 
    + param.PARAM_ALARM_U_ID + '|' 
    + param.PARAM_ALARM_EQ_ID + '|' 
    + param.PARAM_ALARM_EQ_MST_ID + '|' 
    + param.PARAM_ALARM_ISACTIVE + '|' 
    + param.PARAM_ALARM_PROC_ITEM + '|' 
    + param.PARAM_ALARM_COMP_ITEM + '|' 
    + param.PARAM_ALARM_TYPE + '|'
    + param.MULTI_PARAM_NOTI_TYPE;

  let url = '/hypm/Popup/InformNoteListAlarmPopup/' + param1;
  window.open(url,popNm,"top="+(screen.availHeight/2-800/2)+",left="+(screen.availWidth/2-1300/2)+",width=1250px, height=700px, location=no, toolbar=no, menubar=no, scrollbars=yes, resizable=no");
};

const popupAlarmGoDetail = (param) => {

  let startDt = param.START_DT;
  let endDt = param.END_DT;
  
  let paramJson = {
    PARAM_EQ_ID: action.param.a_eq_id,
    PARAM_EQ_MST_ID: action.param.a_eq_mst_id,
    PARAM_CODING: action.param.a_coding,
    PARAM_ARBPL: action.param.a_arbpl,
    START_DT: (startDt == "")?String(addDate(dt, {date:-7})).replaceAll("-",""):startDt,
    END_DT: (endDt == "")?String(dt).replaceAll("-",""):endDt
  };
  
  axios.post("/api/gipms/v1/informNote/fabEqAlarmPopupSearch", paramJson)
    .then(response => {

      const { AlarmList } = response.data.list;
      // alarm Popup  2014.12.26 쿠키처리 추가
      for(let i = 0; i < AlarmList.length; i++){
  
        let name = "cookie_" + AlarmList[i]["U_ID"];
        let value = ''; //empNum;
        let chkAlarm = fncChkAlarmCookie(name,value);
  
        if (chkAlarm == "Y") {
          fncAlarmPopup("fabInformNoteListAlarmPopupForm"+i, "D", AlarmList[i], param);
        }
      }
    });
}

const getInformNoteSingleData = (inform_note_no, type) => {
  let returnVal = false;

  //if (type === 'WORKORDERCREATE') inform_note_no = checkedInformNoteNo;
  if ( inform_note_no === '' ) return returnVal;
  
  let param = {
    "PARAM_U_ID": inform_note_no,
    "CURRENT_PAGE": 1, // 현재페이지
    "PAGE_LENGTH": "1", // 한 화면에 출력할 Inform note 갯수
    "MAX_PAGE_LENGTH": "1",
    "ORDER_BY": "NONE",
    "INFORMNOTE_TYPE": INFORMNOTE_TYPE // 2015-09-15 Added KILHO37
  };

  return Axios.post('/api/gipms/v1/informNote/fabInformNoteEditDetail', param);
}

const confirm = (title, msg) => {
  return new Promise( (resolve, reject) => {
    feed.showConfirm(title, msg, () => {
      resolve(true);
    }, () => {
      resolve(false);
    })
  })
}

const getInformNoteListByNo = (informNoteNo) => {
  const { informNoteList } = selectors.makeInforNoteDataList();

  if (informNoteList.length < 1)
  return [];

  let returnArr = [];
  informNoteList.map(informNote => {
    if (informNote.INFORM_NOTE_NO === informNoteNo) {
      returnArr.push(informNote);
    }
  })

  return returnArr;
}

const callInterlockCheck = (param) => {
  return Axios.post('/api/gipms/v1/common/commonJobInterlockCheck', param);
};

const fncValidateInterLock = async (U_ID, TYPE) => {
  const { EMP_NO } = getProfile();

	let lock_emp_nam = ""; // 인터락 설정 중인 사용자 초기화
	let lock_sabun = ""; // 인터락 설정 중인 사용자 사번 초기화
	let is_lock = ""; // 인터락 설정 여부 초기화

	let lockTable = "";
	if (TYPE ==="NOTES") {
		lockTable = "FAB_INFORM_NOTES";
	} else if (TYPE ==="NOTICE") {
		lockTable = "FAB_INFORM_NOTICE";
	} else {
    return;
  }

	let paramJson = {
		"LOCK_TR" : "CHECKINFO",
		"LOCK_TABLE" : lockTable,
		"LOCK_TABLE_KEY" : U_ID,
		"LOCK_SABUN": EMP_NO,
	};

  //let httpOption = {useProgress : true, timeout : 120 * 1000, async : false};
  const list = callInterlockCheck(param);
  if ( list ) {
    let resultList = list.lockList[0];
    if(resultList.length>0){
      return {
        lock_emp_nam: resultList.LOCK_EMP_NAM, // 인터락 설정 중인 사용자
        lock_sabun: resultList.LOCK_SABUN, // 인터락 설정 중인 사용자 사번
        is_lock: resultList.IS_LOCK, // 인터락 설정 여부
      }
    }
  }
}


const getShortPmType = (aufnrNm, pmType) => {
	let vPmType = "";
	if((aufnrNm != "" && pmType != "") && (pmType == "TBM" || pmType == "CBM")){
		vPmType = " (" + pmType.substring(0,1) + ")";
	}
	return vPmType;
}

const workOrderEvent = (informNote, informNoteNo, isCheck) => {
	let wsAufnr = informNote.AUFNR;

	let aufnr = informNote.AUFNR;;
	let woStatus = informNote.WO_STATUS;
	let aufnrNm = informNote.AUFNR_NM;
	let notiType = informNote.NOTI_TYPE;
	let coding = informNote.CODING;
	let eqSort = informNote.STORT;
	let eqArbpl = informNote.ARBPL;
	let pmType = informNote.PM_TYPE;

	let viewPmType = getShortPmType(aufnrNm, pmType);

	if(isCheck){
		if((notiType == "N1" && coding == "050") || (notiType == "N5" && coding == "160")){
      //$woDiv.hide();
      return ;
		} else {
			// WO 번호가 있다.
			if(wsAufnr != undefined && wsAufnr != ""){
				if((notiType == "N1" || notiType == "N2" || notiType == "N3" || notiType == "N5" || notiType == "N6" || notiType == "N7") ){
					//2014.04.18 W/O 연결 수정시 권한체크 추가(17차 수정요청사항) by kyh
					if(  (stand == eqSort)
					  || ((stand != eqSort) && (eqSort == "P128-01" || eqSort == "P129-01") && (beber == "122" || beber == "128"|| beber == "129"))	   //WLP, WLPKG팀의 WO는 ICMI에서 생성가능
					  || ((stand != eqSort) && (eqArbpl == "12043" ) && (role == "ADM"))){
						let woDetailStr = '<a href="javascript:fncWoDetail(\''+aufnr+'\',\''+woStatus+'\',\''+informNoteNo+'\');"><span id="wsAufnr'+informNoteNo+'" name="wsAufnr" value="'+aufnr+'">'+aufnrNm+'</span></a>';
						let woEditStr = '<span style="margin-left:20px;"><span class="button_g"><a href="javascript:fncWoEdit('+informNoteNo+');" title="W/O 연결수정"><span class="icon_in01" id="woEdit'+informNoteNo+'" name="woEdit">W/O 연결수정</span></a></span></span>';
						$("#d_workOrderSection"+informNoteNo).html("");
						$("#d_workOrderSection"+informNoteNo).html(woDetailStr+ viewPmType + woEditStr);
					}
				}
			// WO 번호가 없다.
			} else if(notiType == "N1" || notiType == "N2" || notiType == "N3" || notiType == "N5" || notiType == "N6" || notiType == "N7"){
				// WO DIV HIDE
				let woDetailStr = '<span id="wsAufnr'+informNoteNo+'" name="wsAufnr" value="'+aufnr+'">'+aufnrNm+'</span>';
				$("#d_workOrderSection"+informNoteNo).html("");
				$("#d_workOrderSection"+informNoteNo).html(woDetailStr + viewPmType);
				$woSpan = $woDiv.find("span[name=wsAufnr]");
				$woSpan.addClass("button_g").append("<a href='javascript:fncWoConnect("+informNoteNo+");' title='W/O 연결/생성'><span class='icon_in01' id='woConnect"+informNoteNo+"' name='woConnect'>W/O 연결/생성</span></a>");
			} else {
				$woDiv.hide();
			}
		}
	}else{
		// WO 번호가 있다.
		if(wsAufnr != undefined && wsAufnr != ""){
			if((notiType == "N1" || notiType == "N2" || notiType == "N3" || notiType == "N5" || notiType == "N6" || notiType == "N7") ){
				//2014.04.18 W/O 연결 수정시 권한체크 추가(17차 수정요청사항) by kyh
				if(  (stand == eqSort)
				  || ((stand != eqSort) && (eqSort == "P128-01" || eqSort == "P129-01") && (beber == "122" || beber == "128"|| beber == "129"))	   //WLP, WLPKG팀의 WO는 ICMI에서 생성가능
				  || ((stand != eqSort) && (eqArbpl == "12043" ) && (role == "ADM"))){
					let woDetailStr = '<a href="javascript:fncWoDetail(\''+aufnr+'\',\''+woStatus+'\',\''+informNoteNo+'\');"><span id="wsAufnr'+informNoteNo+'" name="wsAufnr" value="'+aufnr+'">'+aufnrNm+'</span></a>';
					//let woDetailStr = '<span id="wsAufnr'+informNoteNo+'" name="wsAufnr" value="'+aufnr+'">'+aufnrNm+'</span>';
					$("#d_workOrderSection"+informNoteNo).html("");
					$("#d_workOrderSection"+informNoteNo).html(woDetailStr + viewPmType);
				}
			}
		// WO 번호가 없다.
		} else if(notiType == "N1" || notiType == "N2" || notiType == "N3" || notiType == "N5" || notiType == "N6" || notiType == "N7"){
			// WO DIV HIDE
			let woDetailStr = '<span id="wsAufnr'+informNoteNo+'" name="wsAufnr" value="'+aufnr+'">'+aufnrNm+'</span>';
			$("#d_workOrderSection"+informNoteNo).html("");
			$("#d_workOrderSection"+informNoteNo).html(woDetailStr + viewPmType);
		} else {
			$woDiv.hide();
		}
	}
}

var param = {
  "PARAM_TYPE" 				: "FAB"
  ,"comboType"				: "COMBO_DANGER_TASK"
};

export {
  fncAlarmPopup,
  popupAlarmGoDetail,
  getInformNoteSingleData,
  callInterlockCheck,
  callInterlockCheck2,
  fncValidateInterLock,
  getDangerTask,
  confirm,
  getInformNoteListByNo,
}