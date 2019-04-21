import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import NoteDetailWrapper from './detailStyle';
import { createStructuredSelector } from 'reselect';
import dateFormat from 'dateformat';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Plan from '../Plan';
import Lot from './lot';
import * as alarmFunction from '../function';
import * as selectors from '../informNote/selectors';

class NoteDetail extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      disabled: !this.props.editable,
      Item: this.props.Item,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);

    if ( nextProps.editItem ) {
      const { editItem } = nextProps;
      if ( editItem.informNoteList !== undefined ) {
        editItem.informNoteList.map(informNote => {
          if ( informNote.INFORM_NOTE_NO === this.props.Item.INFORM_NOTE_NO ) {
            
            this.setState({
              disabled: !nextProps.editable,
              Item: informNote}
            );
          }
        });

        return;
      }
    }

    this.setState({
      disabled: !nextProps.editable,
    });
  }

  onChange = (e, property) => {
    let editInformNote = Object.assign( {}, this.state.Item );
    editInformNote[property] = e.target.value;
    this.setState({
      Item: editInformNote,
    });
  }

  onInterlockMapLink = (e) => {
    const { Item } = this.props;
		let url = "http://eshdev2.skhynix.com/safety_dev";
			url += "/eshgate.jsp?param=screenId::03130400__urlParam::EQ_MASTER_ID!!"; // 변경 URL이후 화면ID셋팅
			url += Item.EQ_MST_ID; // Parameter로  장비 Master ID 전달
		//alert(url);
		window.open(url,"","top="+(screen.availHeight/2-800/2)+",left="+(screen.availWidth/2-1300/2)+",width=1250px, height=700px, location=no, toolbar=no, menubar=no, scrollbars=yes, resizable=no");
  }
  
  onAlarmGoDetail(e, pop_gubun) {
    const { Item } = this.props;

		let paramJson = {
      a_eq_id: Item.EQ_ID,
      a_eq_mst_id: Item.EQ_MST_ID,
      a_coding: Item.CODING,
      a_arbpl: Item.ARBPL,
    };

    alarmFunction.popupAlarmGoDetail(paramJson);
  }

  updateInformNote(saveInformNote) {
    return this.state.Item;
  }

  onUpdateLot = (lotId, operNo) => {
    let item = Object.assign({}, this.state.Item);
    item.OPER = operNo;
    item.LOT_ID = lotId;

    this.setState({
      Item: item,
    });
  }
  
  getShortPmType = (aufnrNm, pmType) => {
    let vPmType = "";
    if((aufnrNm != "" && pmType != "") && (pmType == "TBM" || pmType == "CBM")){
      vPmType = " (" + pmType.substring(0,1) + ")";
    }
    return vPmType;
  }

  fncWoEdit = () => {
    const { Item } = this.state;

    const informNoteNo = Item.INFORM_NOTE_NO;
  }

  fncWoDetail = async () => {
    const { Item } = this.state; 
    const { profile } = this.props;

    const aufnr = Item.AUFNR;;
    const woStatus = Item.WO_STATUS;
    const informNoteNo = Item.INFORM_NOTE_NO;

    if(woStatus == "0" || woStatus == "2"){

      //********************** 2014.04.10 인터락기능 추가 **********************//
      let paramJson = {
        "LOCK_TR" : "CHECK",
        "LOCK_TABLE" : "FAB_SAB_WORK_ORDER",
        "LOCK_TABLE_KEY" : aufnr,
        "LOCK_SABUN": profile.EMP_NO,
      };

      ret = await func.callInterlockCheck(param);
      if ( ret != undefined ) {
        let lockList = ret.lockList[0];
        let lockYn = lockList.IS_LOCK;

        //인터락이 걸려있는 경우
        if(lockYn == 'Y'){
          let empNam = lockList.LOCK_EMP_NAM;
          let empNm = lockList.LOCK_SABUN;

          if(!confirm(empNam + "(" + empNm + ") 사용자가 인터락 설정중입니다.\n작업을 진행하시겠습니까?")){
            openWorkOrderPopup(aufnr, 'Detail');
          }else{
            //현재 사용자로 interlock update 처리
            paramJson = {
                "LOCK_TR" : "UPDATE",
                "U_ID" : lockList.U_ID,
                "LOCK_ACTIVE" : "Y",
                "LOCK_SABUN": profile.EMP_NO,
            };

            httpSend("commonJobInterlockCheck", paramJson, function(resJson){
              openWorkOrderPopup(aufnr, 'Update');
            }, function(resJson){
              alert('인터락 설정중 에러가 발생하였습니다.');
            });
          }
        }else{
          //service에서 자동으로 인터락 정보를 db에 등록처리
          openWorkOrderPopup(aufnr, 'Update');
        }
      } else {
        await feed.warning('인터락 정보 조회중 에러가 발생하였습니다.');
      }
    }
    //조회
    else if(woStatus == "3"){
      openWorkOrderPopup(aufnr, 'Detail');
    } else {

    }
  }

  fncWoConnect = async () => {
    const { Item } = this.state; 
    const { profile, searchParam } = this.props;

    const informNoteNo = Item.INFORM_NOTE_NO;

    //2014.04.03 김지영부장 요청처리
		// if(  ("FAB" == "<%=role%>" && "050" == "<%=roleDetail%>")
    //   || ("UTL" == "<%=role%>" && "050" == "<%=roleDetail%>")){
    //   alert("접근 권한이 없습니다.");
    //   return;
    // }

    //interlock check
    const ret = await alarmFunction.fncValidateInterLock(informNoteNo, "NOTES");
    if(ret.is_lock === 'Y') {
      await feed.warningAsync(ret.lock_emp_nam + "(" + ret.lock_sabun + ") 사용자가 인터락 설정중입니다.\n저장에 실패하였습니다.");
      return;
    }else if(ret.lock_sabun !== "" && profile.EMP_NO !== ret.lock_sabun){
      await feed.warningAsync("인터락이 해제되어 저장에 실패하였습니다.");
      return;
    }

    let allGridData = INFORM_NOTE_LIST["informNoteList"];
    let _arbpl = "";
    let _beber = "";
    let _stort = "";
    let _tplnr = "";

    let _equnr = "";
    let _auart = "";
    let _ilart = "";
    let _notiType = "";
    let _pmType = "";
    let createDt = "";
    let today = new Date().format("yyyy-mm-dd");

    _beber = Item.BEBER;
    _stort = Item.STORT;
    _arbpl = Item.ARBPL;
    _tplnr = Item.TPLNR;
    _equnr = Item.EQUNR;
    _notiType = Item.NOTI_TYPE;
    _ilart = Item.CODING;
    _pmType = Item.PM_TYPE;
    createDt = Item.CREATE_TIME.split(" ")[0].replaceAll(".", "-").substring(0,10);

    let bsiArbpl = searchParam.sdpt;

    // 20140328 권한 로직 변경
    if((stand == _stort) //같은 팀 W/O 생성가능
          || ((stand != _stort) && (_stort == "P128-01" || _stort == "P129-01") && (beber == "122" || beber == "128"|| beber == "129")) //WLP, WLPKG팀의 WO는 ICMI에서 생성가능
          || ( bsiArbpl == "12043" && "ADM" == role ) //R3 BSI 소속장비 연구소에서 사용
    ){
      //WO생성가능
    } else {
      await feed.warningAsync("W/O 연결/생성 권한이 없습니다.");
      return;
    }

    // AUART
    if(_notiType == "N1"){
      _auart = [{"AUART" : "PM10"}];
    } else if(_notiType == "N2"){
      if(_pmType == "TBM"){
        _auart = [{"AUART" : "PM20"}];
      } else if(_pmType == "CBM"){
        _auart = [{"AUART" : "PM30"}];
      } else {
        _auart = [{"AUART" : "PM20"},{"AUART" : "PM30"}];
      }
    } else if(_notiType == "N3"){
      _auart = [{"AUART" : "PM00"}];
    } else if(_notiType == "N5" && _ilart == "150"){
      _auart = [{"AUART" : "PM50"}];
    } else if(_notiType == "N5" && _ilart == "170"){
      _auart = [{"AUART" : "PM60"}];
    } else if(_notiType == "N6"){
      _auart = [{"AUART" : "PM70"}];
    } else if(_notiType == "N7"){
      _auart = [{"AUART" : "PM80"}];
    } else {
      await feed.warningAsync("W/O 연결이 있으면 안됨..");
    } 

    // ILART
    if(_ilart == "130"){
      _ilart = "330";
    } else if(_ilart == "140"){
      _ilart = "340";
    }

    let paramJson = {
      "IV_BEBER" : _beber,
      "IV_GSTRP_BEG" : addDate(createDt, {date:-120}),
      "IV_GSTRP_END" : addDate(today, {date:36}),
      "IV_TPLNR" : _tplnr,
      list : {
        "IT_STORT" : [{"STORT" : _stort}],
        "IT_ARBPL" : [{"ARBPL" : _arbpl}],
        //,"IT_TPLNR" : [{"ILART" : tplnr}]
        "IT_AUART" : _auart,
        "IT_EQUNR" : [{"EQUNR" : (_equnr != "")?trim(_equnr):""}],
        "IT_IPHAS"	: [{"IPHAS" : "2"}],
      }
    };
    // DOWN이(N5:Setup)일때만 downType을 넘겨준다.
    if(_notiType == "N5") {
      paramJson["list"]["IT_ILART"] =[{"ILART" : _ilart}];
    } else {
      paramJson["list"]["IT_ILART"] =[];
    }
    
    const result = await Axios.post('/api/gipms/v1/informNote/fabInformNoteWorkOrderConnectSearch', paramJson);
    if ( result.data ) {
      const { resultCode, list } = ret.data;

      if(resultCode == "0"){
        woConnectList = [];
        woConnectList  = list.ET_RESULT;

        let options = {height:300,width:900,scrollbars:false};
        let paramJson = {"informNoteNo":InformNoteNo.toString()};

        fncCommonOpenPopup("fabInformNoteWorkOrderConnectForm.view", paramJson, options);
      } else {
        if( await feed.confirmAsync("연결 할 W/O 리스트가 없습니다. W/O를 생성하시겠습니까?")){
          fncWoCreate(InformNoteNo);
        }
      }
    }
  }

  fncWoCreate = () => {
    const gridData = this.state.Item;
    const { fab, team, sdpt } = this.props.searchParam;

		let notiType = gridData.NOTI_TYPE;
		let coding = gridData.CODING;
		let eqId = gridData.EQ_ID;
		let pmType = gridData.PM_TYPE;
		let downDt = gridData.DOWN_TIME;
		let downDate = "";
		let downTime = "";

		if(downDt != ""){
			downDate = downDt.substring(0, 10).replaceAll("-", "");
			downTime = downDt.substring(11, 19).replaceAll(":", "");
		}

		// AUART
		if (notiType === "N1") {
		    notiType = "PM10";
		} else if (notiType === "N2") {
			notiType ="PM20','PM30";
		} else if (notiType === "N3") {
		    notiType = "PM00";
		} else if (notiType === "N5" && coding == "150") {
		    notiType = "PM50";
		} else if (notiType === "N5" && coding == "170") {
		    notiType = "PM60";
		} else if (notiType === "N6") {
		    notiType = "PM70";
		} else if (notiType === "N7") {
		    notiType = "PM80";
		} else {
		}

		// ILART
		if (coding === "130") {
		    coding = "330";
		} else if (coding === "140") {
		    coding = "340";
		}

    
		$("#PARAM_WO_BEBER").val(fab);
		$("#PARAM_WO_STAND").val(team);
		$("#PARAM_WO_ARBPL").val(sdpt);

    $("#NOTI_TYPE").val(notiType);
    $("#CODDING").val(coding);
    $("#TIDNR").val(eqId);
    $("#U_ID").val(InformNoteNo);
    $("#DOWN_DATE").val(downDate);
    $("#DOWN_TIME").val(downTime);

		window.open("about:blank","createWorkOrderPopupForInformNotes","top="+(screen.availHeight/2-800/2)+",left="+(screen.availWidth/2-1300/2)+",width=1250px, height=700px, location=no, toolbar=no, menubar=no, scrollbars=yes, resizable=no");
		workOrderPopupForm.action = "fabWorkOrderNewCreateForm.view";
    workOrderPopupForm.submit();
  }

  renderWorkOrderSection() {
    const { Item } = this.state;

    const wsAufnr = Item.AUFNR;

    const aufnr = Item.AUFNR;;
    const woStatus = Item.WO_STATUS;
    const aufnrNm = Item.AUFNR_NM;
    const notiType = Item.NOTI_TYPE;
    const coding = Item.CODING;
    const eqSort = Item.STORT;
    const eqArbpl = Item.ARBPL;
    const pmType = Item.PM_TYPE;
  
    const viewPmType = this.getShortPmType(aufnrNm, pmType);

    let bRender = true;
    let woSection = null;
    let woDetail = null;
    let woSpan = null;

    if ( this.props.editable ) {
      if ( (notiType == "N1" && coding == "050") || (notiType == "N5" && coding == "160") ) {
        bRender = false;
      } else {
        if(wsAufnr != undefined && wsAufnr != ""){
          if((notiType == "N1" || notiType == "N2" || notiType == "N3" || notiType == "N5" || notiType == "N6" || notiType == "N7") ){
            //2014.04.18 W/O 연결 수정시 권한체크 추가(17차 수정요청사항) by kyh
            if(  (stand == eqSort)
              || ((stand != eqSort) && (eqSort == "P128-01" || eqSort == "P129-01") && (beber == "122" || beber == "128"|| beber == "129"))	   //WLP, WLPKG팀의 WO는 ICMI에서 생성가능
              || ((stand != eqSort) && (eqArbpl == "12043" ) && (role == "ADM"))) {
                woDetail = <a onclick={this.fncWoDetail}><span>{aufnrNm}</span></a>;
                let woEdit = <span style={{marginLeft:'20px'}}><span className="button_g"><a onClick={this.fncWoEdit} title="W/O 연결수정"><span class="icon_in01">W/O 연결수정</span></a></span></span>;

                woSection = <Fragment>{woDetail}viewPmType{woEdit}</Fragment>;
            }
          }
        // WO 번호가 없다.
        } else if(notiType == "N1" || notiType == "N2" || notiType == "N3" || notiType == "N5" || notiType == "N6" || notiType == "N7"){
          // WO DIV HIDE
          woDetail = <span>{aufnrNm}</span>;
          woSpan = <a onClick={this.fncWoConnect} title='W/O 연결/생성'><span class='icon_in01'>W/O 연결/생성</span></a>;
          woSection = <Fragment>{woSpan}</Fragment>;
        } else {
          bRender = false;
        }
      }
    } else {
      woSection = Item.AUFNR_NM;
    }

    return (
      <Fragment>
        { ((bRender && this.props.editable) || !this.props.editable) && (
          <tr>
            <th>W/O #</th>
            <td>{woSection}</td>
            <th>PM Sheet</th>
            <td>{Item.INSP_LOT}</td>
            <th>PM Sheet Status</th>
            <td>{Item.INSP_LOT_STATUS_NM}</td>
            <th>고분보연계</th>
            <td>{Item.GBB_UID}</td>
          </tr>
        )}
      </Fragment>
    )
  }

  fncDangerTaskConfirm = async () => {
    	//2014.04.03 김지영부장 요청처리
		// if(  ("FAB" == "<%=role%>" && "050" == "<%=roleDetail%>")
    //   || ("UTL" == "<%=role%>" && "050" == "<%=roleDetail%>")){
    //     alert("접근 권한이 없습니다.");
    //     return;
    // }

    const { Item } = this.state.Item;

    //interlock check
    const ret = await alarmFunction.fncValidateInterLock(Item.INFORM_NOTE_NO, "NOTES");
    if(ret.is_lock === 'Y') {
      await feed.warningAsync(ret.lock_emp_nam + "(" + ret.lock_sabun + ") 사용자가 인터락 설정중입니다.\n저장에 실패하였습니다.");
      return;
    }else if(ret.lock_sabun !== "" && profile.EMP_NO !== ret.lock_sabun){
      await feed.warningAsync("인터락이 해제되어 저장에 실패하였습니다.");
      return;
    }

    // UP Time 체크
    if (!await getInformNoteSingleData(informNoteNo, 'UPTIME')) {
      await feed.warningAsync("장비 UP이 되어 위험작업 확정이 불가능합니다.");
      return;
    } else if ($("#combo_danger_task" + informNoteNo).val() == "") {
      await feed.warningAsync("위험작업을 선택하지 않으면 확정할 수 없습니다.");
      return;
    }

    const gridData = this.props.Item;

    //2st dev by mhkim / note : 위험작업 분류 선택 시 해당사항 없음 이 다른 분류와 같이 선택되지 안도록 수정
    let checkValues = $("#combo_danger_task"+ informNoteNo).val();
    let isPass = true;
    let eshUid = "";
    if(checkValues.length > 1){
      for(let i=0; i<checkValues.length; i++) {
        if(checkValues[i] == 13){
          isPass = false;
          break;
        }else{
          if(i==0) eshUid += "'"+checkValues[i]+"'";
          else eshUid += ",'"+checkValues[i]+"'";
        }
      }
    }else{
      eshUid += "'"+checkValues[0]+"'";
    }
    if(!isPass) {
      await feed.warningAsync("해당없음은 다른 값과 같이 선택 할 수 없습니다.");
      return;
    }

    let vSwerk = gridData[0].SWERK;
    if(vSwerk == '1010'){
      vSwerk = "이천";
    }else if(vSwerk == '1020'){
      vSwerk = "청주";
    }else if(vSwerk == '2010'){
      vSwerk = "Wuxi";
    }else{
      vSwerk = "Wuxi";
    }

    let paramJson = {
        "SITE" : vSwerk,
        "FUNC_LOC" : $("#combo_functional_location").find(
            "option[value=" + gridData[0].TPLNR + "]").html(),
        "EQP_ID" : gridData[0].EQ_ID,
        "CAT" : "FAB",
        "ESH_UID" : eshUid,
        "LOCATION" : orgNam,
        "TMP_CAL1" : empNam,
        "INFORM_NOTE_NO" : informNoteNo,
        "DOWNTIME" : gridData[0].DOWN_TIME
      };

      httpSend("fabInformNoteEshHstSave", paramJson, function(res) {
        $("#h_combo_danger_task"+informNoteNo).val(eshUid);
        $("#t_danger"+informNoteNo).val(checkValues.length + "건 선택");

        alert("확정완료");
      }, function(res) {
        alert("통신 중 에러가 발생했습니다.");
      });
  }
  renderCodefinder03 = () => {
    const { editable } = this.props;
    const { Item } = this.state;
    const { dangerTaskList } = this.props;
    return (
      <Fragment>
        { editable && (
          <div className="codefinder03">
            <div class="condition_group02">
              <ReactMultiSelectCheckboxes
                placeholderButtonLabel="ALL"
                value={dangerTaskList.comboList}
                hideSearch={true}
                options={dangerTaskList.comboList.length > 0 ? dangerTaskList.comboList.map(option => ({ label: option.NAME, value: option.CODE })) : [{ label: 'All', value: '' }]}
                width={180}
              />
              <div>
                <span class="button_g">
                  <a onClick={this.fncDangerTaskConfirm} title="확정">
                    <span class="icon_in01">확정</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        )}
        { !editable && <Input readOnly={this.state.disabled} value={`${Item.ESH_UID_CNT}건 선택`} size="small" /> }
      </Fragment>
    )
  }

  attachFile = () => {
    //첨부파일
    let informNoteNo = '';
    let edmsmode = 'R';
    let edmsCallBack = '';
    let htnBtnID = '';
    let hdnUid = '';
    informNoteNo = this.props.Item.INFORM_NOTE_NO;
    if ( this.props.editable ) {
      edmsmode = 'U';
    }
    edmsCallBack = 'setEdmsInfo';

    //epmqa view(jsp) 직접 호출
    let url = "http://epmqa.skhynix.com/servlet/commonEdms.view?uuid=";
    url += informNoteNo;
    url += "&edmsmode=";
    url += edmsmode;
    url += "&edmsCallBack=";
    url += edmsCallBack;
    url += "&htnBtnID=";
    url += htnBtnID;
    url += "&hdnUid=";
    url += hdnUid;
    window.open(url,"","top="+(screen.availHeight/2-800/2)+",left="+(screen.availWidth/2-1300/2)+",width=820px, height=250px, location=no, toolbar=no, menubar=no, scrollbars=yes, resizable=yes");

    //popup 생성
    // let param = informNoteNo + '|' 
    // + edmsmode + '|' 
    // + edmsCallBack + '|' 
    // + htnBtnID + '|' 
    // + hdnUid;
    // window.open(`/sm/informNote/pop/InformNoteDetailAttachFile/${param}`, 'InformNoteSafetyWorkConnect', 'width=820,height=250');
  }

  render() {
    const { Item } = this.state;
    const alarmYn = ( Item.ALARM_YN === 'Y' ? <a className="bg_c_pink" onClick={e => this.onAlarmGoDetail(e, 'DETAIL')}>알람 보기</a> : '알람미등록' );

    const { ROLE, ROLE_DETAIL } = this.props.userCompanyDefine[0];
    console.log('detail', ROLE, ROLE_DETAIL);
    let isFab = true;
    if (ROLE==='FAB' && ( ROLE_DETAIL === '110' || ROLE_DETAIL === '120' )) {
      isFab = true;
    } else {
      isFab = false;
    }

    return (
      <table className="data-table">
        <tr>
          <th>EQ ID</th>
          <td className="sp">{Item.EQ_ID_NM}</td>
          <th>Model</th>
          <td>{Item.MODEL}</td>
          <th>Down Time</th>
          <td>{Item.DOWN_TIME}</td>
          <th>Up Time</th>
          <td>{Item.UP_TIME}</td>
        </tr>
        <tr>
          <th>Down</th>
          <td>{Item.NOTI_TYPE_NAME}</td>
          <th>Down Type</th>
          <td>{Item.CONFIG_NAME}</td>
          <th>Auto/Manual</th>
          <td>{Item.IS_MANUAL}</td>
          <th>첨부파일</th>
          <td><Button className="btn-attach-file" onClick={this.attachFile}>첨부파일</Button></td>
        </tr>
        <tr>
          <th>Total Time</th>
          <td className="sp">{Item.INTERVAL_A}</td>
          <th>Work Time</th>
          <td>{Item.INTERVAL_B}</td>
          <th>Lot ID</th>
          <td>{this.state.disabled ? Item.LOT_ID : <Lot {...this.props} onUpdateLot={this.onUpdateLot}/>}</td>
          <th>Wafer ID</th>
          <td>{ isFab ? `${Item.WAFERID_CNT}건 선택` : <Input readOnly={this.state.disabled} size="small" value={`${Item.WAFERID_CNT}건 선택`} onChange={e => this.onChange(e, 'OPER')} /> }</td>
        </tr>
        <tr>
          <th>Down Comment</th>
          <td colSpan="3"><Input readOnly={this.state.disabled} size="small" value={Item.NOTE_COMMENT} onChange={e => this.onChange(e, 'NOTE_COMMENT')} /></td>
          <th>Warranty</th>
          <td>{Item.WARRANTY_FLAG}</td>
          <th>Next TBM</th>
          <td><Plan eqMstId={Item.EQ_MST_ID} upTime={Item.UP_TIME.substring(0, 10)} downTime={Item.DOWN_TIME.substring(0, 10)} key={Item.EQ_MST_ID}/></td>
        </tr>
        <tr>
          <th>SVID</th>
          <td>{Item.SVID}</td>
          <th>SVID Description</th>
          <td>{Item.SVID_DESC}</td>
          <th>Value</th>
          <td>{Item.CURR_VAL}</td>
          <th>위험작업 분류</th>
          <td>{this.renderCodefinder03()}</td>
        </tr>
        <tr>
          <th>Problem</th>
          <td colSpan="3"><Input.TextArea readOnly={this.state.disabled} style={{ height: '19px' }} value={Item.ZZPROBLEM} /></td>
          { <th>{alarmYn}</th> }
          <td><Button size="small" type="danger" onClick={this.onInterlockMapLink}>장비 Interlock Map</Button> </td>
          <th>Last Receipe ID</th>
          <td>{Item.LAST_RECIPE_ID}</td>
        </tr>
        <tr>
          <th>조치 상세 내용</th>
          <td colSpan="7"><Input.TextArea readOnly={this.state.disabled} style={{ height: '200px' }} value={Item.HLTEXT} onChange={e => this.onChange(e, 'HLTEXT')} /></td>
        </tr>
        <tr>
          <th>Remark</th>
          <td colSpan="7"><Input.TextArea readOnly={this.state.disabled} style={{ height: '19px' }} value={Item.REMARK} onChange={e => this.onChange(e, 'REMARK')} /></td>
        </tr>
        {
          this.renderWorkOrderSection()
        }
      </table>
    );
  }
}

NoteDetail.defaultProps = {
  Item: {},
  editable: false,
  OPER: '',
  NOTE_COMMENT: '',
  HLTEXT: '',
  REMARK: '',
  searchParam: {},
  profile: '',
};

NoteDetail.propTypes = {
  Item: PropTypes.object,
  editable: PropTypes.bool,
  OPER: PropTypes.string,
  NOTE_COMMENT: PropTypes.string,
  HLTEXT: PropTypes.string,
  REMARK: PropTypes.string,
  searchParam: PropTypes.object,
  profile: PropTypes.object,
};

export default NoteDetail;
