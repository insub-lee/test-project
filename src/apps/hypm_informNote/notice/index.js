import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Axios from 'axios';
import update from 'react-addons-update'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Button, Checkbox, Input } from 'antd';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as feed from 'components/Feedback/functions';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as func from '../function';

const { TextArea } = Input;
let saveCheckSet = new Set();

class InformNoteNotice extends PureComponent {
  constructor(props) {
    super(props);
    saveCheckSet = new Set();
    this.state = {
      informNoticeList: this.props.informNoteDataList.informNoticeList,
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    if (this.props.informNoteDataList.informNoticeList !== nextProps.informNoteDataList.informNoticeList) {
      saveCheckSet= new Set();
      console.log('asdasdasdasd');
      this.setState({
        informNoticeList: nextProps.informNoteDataList.informNoticeList,
      })
    }
  }

  handleNoticePopup = () => {
    window.open('/sm/informNote/pop/InformNotice', 'InformNoticePopup', 'width=1200,height=750');
  }

  handleNoticeSave = () => {
    // 추후 추가해야 할 사항********************************************
    // 세션 -> 권한 확인************************************************

    if(saveCheckSet.size < 1) {
      feed.warning("선택된 Inform Notice가 없습니다.");
      return;
    }
    feed.showConfirm('저장', "Inform Notice " + saveCheckSet.size +"개를 저장하시겠습니까?", async() => {
      const param = this.makeInformNoticeParamForSave();
      Axios.post("/api/gipms/v1/informNote/saveInformNoticeTab", param)
      .then(async(result) => {
        const { sucCode, failCode } = result.data;

        // m1023_fadeOutLayer('m1023_searchAlarmDiv', false);
        // let  strFlag = "F";
        console.log(`111111111111111111111${sucCode}${failCode}`);
        if(failCode > 0){
          // strFlag = "S";
          feed.warning(`저장 결과 성공: ${sucCode}개, 실패: ${failCode}개`);
        }else{
          feed.warning("저장에 성공하였습니다.");
        }
  
      });
      // .catch(() => {
      //   //m1023_fadeOutLayer('m1023_searchAlarmDiv', false);
      //   feed.warning("처리중 오류가 발생하였습니다.");
      // });
    });
  }

  checkInterlockNotice = async(no, modifyLock) => {
    if(modifyLock == false) modifyLock = false;
    else modifyLock = true;
    let tmpArray = [];
    const { informNoticeList } = this.state;
    const noticeKey	= informNoticeList[no].SHIFT;
    const notesKey	= String(informNoticeList[no].U_ID);
    const empNum='99999999';
    console.log(saveCheckSet +` ${saveCheckSet.has(no)}  `);
    
    if(saveCheckSet.has(no)){
      // fncSetInformNoticeStyle("Edit",noticeKey);

      const param = {
        LOCK_TR : 'CHECK',
        LOCK_TABLE : 'FAB_INFORM_NOTICE',
        LOCK_TABLE_KEY : notesKey,
        LOCK_SABUN: empNum
      };

      const list = await func.callInterlockCheck(param);
      const { lockList } = list;
      console.log(lockList[0]);
      // tmpArray = Object.assign( [], this.state.interlockList );
      if(lockList.length>0){
        let { U_ID, IS_LOCK, LOCK_EMP_NAM, LOCK_SABUN, LOCK_DATETIME } = lockList[0];

        if(LOCK_SABUN == undefined) LOCK_SABUN = empNum; // 최초 락이 설정되면 undefined로 넘어옴

        if(IS_LOCK=="Y"){

          if(modifyLock) {
            const massageText = LOCK_EMP_NAM + "(" + LOCK_SABUN + ") 사용자가 인터락 설정중입니다.\n작업을 진행하시겠습니까?";
            await feed.showConfirm('인터락 설정', massageText , () => {
              console.log(no+'체크해제로직추가필요**************1');
            });
          } else { //타 사용자가 현재사용자의 lock을 갱신하면 저장금지 기능 추가 2014.07.22
            const massageText = "ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+"는" + LOCK_EMP_NAM + "(" + LOCK_SABUN + ") 사용자가 인터락 설정중입니다.";
            feed.warning(massageText);
            console.log(no+'체크해제로직추가필요**************2');
            // fncSetInformNoticeStyle("View",noticeKey);
            return;
          }
          
          //타사용자에 의해 잠금된 인터락을 본인이 잠금처리
          // fncSetInterLockClose(notesKey);
          return;
        } else if(IS_LOCK=="N"){
          if(empNum != LOCK_SABUN) {
            const massageText = LOCK_EMP_NAM + "(" + LOCK_SABUN + ") 사용자에 의해 데이타가 갱신되었습니다. 재조회후 수정하세요.";
            feed.warning(massageText);
            console.log(no+'체크해제로직추가필요**************3');
            // fncSetInformNoticeStyle("View",noticeKey);
            return;
          }
        }
        // fncGetInformNoticeDetail(notesKey);		//Inform Notice 상세조회
      }

    } else {
      const param = {
          LOCK_TR : 'UPDATE',
          LOCK_TABLE : 'FAB_INFORM_NOTICE',
          LOCK_TABLE_KEY : notesKey,
          LOCK_SABUN: empNum,
          LOCK_ACTIVE : 'N'
        };
      
        await func.callInterlockCheck(param);
      // fncSetInformNoticeStyle("View",noticeKey);
    }
  }

  makeInformNoticeParamForSave(){
    let param = [];
    const { informNoticeList } = this.state;
    saveCheckSet.forEach(value => {
      const tmp = informNoticeList[value];
      param.push({
        PARAM_NOTICE : tmp.NOTICE,
        PARAM_U_ID : tmp.U_ID,
        PARAM_NOTICE_DT : tmp.NOTICE_DT,
        PARAM_CHANGE_BY : "", // *************세션 -> 사용자 이름***************
        PARAM_EDMS_ID : tmp.EDMS_ID,
      });
    })
    console.log(param);
    const par = {
      list: param,
    }
    return par;
  }

  handleNoticeCheck = (e) => {
    console.log(e.target);
    
    if(e.target.checked === true) {
      saveCheckSet.add(e.target.value);
    } else {
      saveCheckSet.delete(e.target.value);
    }
    const cancelCheck = this.checkInterlockNotice(e.target.value);
    console.log(saveCheckSet);
  }

  parseDate = (str) => {
    const y = str.substr(0, 4);
    const m = str.substr(4, 2);
    const d = str.substr(6, 2);
    return `${y}-${m}-${d}`;
  }

  parseShiftTime = (str) => {
    if (str === '(~)') return '';
    return str;
  }

  onChangeNotice = (e) => {
    this.setState({
      informNoticeList : update(
        this.state.informNoticeList,{
          [e.target.id]: {
            NOTICE: { $set: e.target.value },
          }
        }
      )
    });
  }

  render() {
    console.log(this.props);
    const { informNoticeList } = this.state;
    let informNotices = (<div></div>);
    if (informNoticeList !== undefined) {
      informNotices = informNoticeList.map((line, index) => (
        <div>
          <h4 className="inform-title">{`${line.SHIFT_TEXT} - ${this.parseShiftTime(line.NOTICE_DT_TEXT)}`}</h4>
          <div className="inform-chapter-item">
            <span className="data-check"><Checkbox value={index} onChange={this.handleNoticeCheck} /></span>
            <div className="inform-notice-view">
              <TextArea className="pre" id={index} onChange={this.onChangeNotice} value={line.NOTICE} />
              <Button className="btn-attach-file">첨부파일</Button>
            </div>
          </div>
        </div>
      ));
    }
    return (
      <div>
        <div className="btn-group">
          <div className="right">
            <Button type="primary" className="btn-apply save" onClick={this.handleNoticeSave}>저장</Button>
            <Button type="primary" className="btn-apply" onClick={this.handleNoticePopup} >Inform Notice 이력관리</Button>
          </div>
        </div>
        {/*  */}
        { informNotices }
        {/*  */}
      </div>
    );
  }
}

InformNoteNotice.propTypes = {
  informNoteDataList: PropTypes.array,
};
InformNoteNotice.defaultProps = {
  informNoteDataList: [],
};

const mapStateToProps = createStructuredSelector({
  informNoteDataList: selectors.makeInformNoticeList()
});

export function mapDispatchToProps(dispatch) {
  return {
    handleSaveInformNotice: param => dispatch(actions.saveInformNotice(param)),
    handleCommonJobInterlockCheck: param => dispatch(actions.commonJobInterlockCheck(param)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(InformNoteNotice);
