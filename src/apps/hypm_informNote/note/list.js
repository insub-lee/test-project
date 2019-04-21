import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import dateFormat from 'dateformat';
import NoteDetail from './detail';
import NoteSubtitle from './subtitle';
import TechSafe from './techsafe';
import SafetyWorkGrid from './safetywork';
import RepairGrid from './repair';
import * as feed from 'components/Feedback/functions';
import * as func from '../function';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedInformNoteNo: '',
      editable: false,
      searchParam: this.props.searchParam,
      searchState: this.props.searchState,
      profile: this.props.profile,
      repairValidation: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { Item } = this.props;
    if (nextProps.checkedInformNoteNo !== Item.INFORM_NOTE_NO) {  // 편집상태취소
      this.setState({checkedInformNoteNo: nextProps.checkedInformNoteNo, editable: false});
    } else {
      if ( !this.state.editable ) {
        this.setState({checkedInformNoteNo: nextProps.checkedInformNoteNo, editable: true})
      }
    }
  }

  onSizeChange = () => {
    this.props.onLoad();
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    if ( prevState.editable !== this.state.editable) {
      this.props.onLoad();
    }
  }
  onStatusChange = (e) => {
    this.onEditEvent(this.props.Item.INFORM_NOTE_NO, e.target.checked)
      .then( r => {
        this.props.onEditEvent(this.props.Item.INFORM_NOTE_NO, r);
      });
  }

  onEditEvent = (inform_note_no, checked) => {
    return new Promise((resolve, reject) => {
      const { checkedInformNoteNo } = this.state;
      if (checked) {
        if (checkedInformNoteNo === '' || checkedInformNoteNo === inform_note_no) {
          this.checkInterlock(inform_note_no, '')
            .then(r => {
              if (r === false) {
                resolve(false);
              }
              func.getInformNoteSingleData(inform_note_no)
                .then(result => {
                  if ( result.data ) {
                    const { list } = result.data;
                    this.setState({detail: list});
                    resolve(true);
                  } else {
                    resolve(false);
                  }
                })
            });
        } else {
          let retValue = false;
          func.confirm('Inform Note 편집', '수정중인 Inform Note 가 존재합니다. 계속 진행하시겠습니까?\n확인을 선택하면 저장하지 않은 Inform Note 내용은 삭제됩니다.')
            .then(ret => {
              if (ret) {
                this.checkInterlock(checkedInformNoteNo, false);
                this.checkInterlock(inform_note_no, '');
                func.getInformNoteSingleData(inform_note_no)
                  .then(result => {
                    if ( result.data ) {
                      const { list } = result.data;
                      this.setState({detail: list});
                      resolve(true);
                    } else {
                      resolve(false);
                    }
                  })
              }
            });
        }
      } else {
        this.checkInterlock(inform_note_no, '');
        this.setState({detail: {}});
        resolve(false);
      }
    })
  }

  checkInterlock = (inform_note_no, isInterLock) => {
    return new Promise((resolve, reject) => {
      const { checkedInformNoteNo, interlockList, editable } = this.state;
      let chkRepairSectionIsChecked = !editable;

      let tmpArray = [];
      let retVal = false;
      let param = {};
      let ret = {};
      const { profile } = this.props;
  
      if (isInterLock !== '' && isInterLock === false) {
        chkRepairSectionIsChecked = false;
      } else if (isInterLock !== '' && isInterLock === true) {
        chkRepairSectionIsChecked = true;
      }
  
      if (!chkRepairSectionIsChecked) {
        for(const i in interlockList) {
          if (interlockList[i] !== inform_note_no) {
            tmpArray.push(interlockList[i]);
          }
          else {
            // 인터락해제
            param = {
              LOCK_TR: 'UPDATE',
              LOCK_TABLE: 'FAB_INFORM_NOTES',
              LOCK_TABLE_KEY: inform_note_no,
              LOCK_SABUN: profile.EMP_NO,
              LOCK_ACTIVE: 'N',
            };
  
            func.callInterlockCheck(param);
          }
        }
        this.setState({interlockList: tmpArray});
      } else {
        //interlock table 조회
        param = {
          LOCK_TR: 'CHECK',
          LOCK_TABLE: 'FAB_INFORM_NOTES',
          LOCK_TABLE_KEY: inform_note_no,
          LOCK_SABUN: profile.EMP_NO,
        };
  
        func.callInterlockCheck(param)
          .then(r => {
            if (r.data !== undefined) {
              const { lockList } = r.data.list;
              tmpArray = Object.assign( [], this.state.interlockList );
        
              if (lockList.length > 0) {
                const { U_ID, IS_LOCK, LOCK_EMP_NAM, LOCK_SABUN, LOCK_DATETIME } = lockList[0];
        
                if (IS_LOCK === 'Y') {
                  func.confirm('인터락 설정', LOCK_EMP_NAM + "(" + LOCK_SABUN + ") 사용자가 인터락 설정중입니다.\n작업을 진행하시겠습니까? \n작업시작시간:" + LOCK_DATETIME)
                    .then(result => {
                      if (result) {
                        param = {
                          LOCK_TR: 'UPDATE',
                          U_ID: U_ID,
                          LOCK_SABUN: profile.EMP_NO,
                          LOCK_ACTIVE: 'Y',
                        };
              
                        func.callInterlockCheck(param)
                          .then(r2 => {
                            if (r2.data) {
                              tmpArray.push(inform_note_no);
                              this.setState({interlockList: tmpArray});
                              resolve(true);
                            } else {
                              feed.warning('인터락 설정중 에러가 발생하였습니다.');
                              resolve(false);
                            };
                          })
                      }
                    })
                    .catch(e => {
                      this.setState({detail: []});
                      resolve(false);
                    })
                } else {
                  tmpArray.push(inform_note_no);
                  this.setState({interlockList: tmpArray});
                  resolve(true);
                }
              }
            } else {
              throw({});
            }
          }).catch(e => {
            feed.warning('인터락정보 조회 에러');
            resolve(false);
          })
      }
    });
  }

  updateInformNote = async(list) => {
    let retDetail = this.refs.NoteDetail.updateInformNote();

    const { 
      INFORM_NOTE_NO,
      OPER,
      NOTE_COMMENT,
      HLTEXT,
      REMARK,
      ZZPROBLEM,
      CODING,
      UP_TIME,
      ZZEQUI_DATE, 
      ZZHWSET_DATE,
      ZZPROCESSSET_DATE,
      ZZPRODUCT_DATE,
      ZZEQUI_USER,
      ZZEQQUI_ID,
      ZZPROCESS_USER,
      ZZPROCESS_ID,
      LOT_ID,
      WAFERID,
      IN_EDMS_ID, 
    } = retDetail;
        
    if ( HLTEXT.length < 10 ) {
      return {
        bReturn: false,
        bReturnMsg: "조치 내용은 최소 10자 이상 작성 필요합니다!",
      };
    }

    let hltext = HLTEXT;
    hltext += "\r\n";
    hltext += "[ Last Action ";
    hltext += dateFormat(new Date(), "mm-dd HH:MM:ss") + " ";
    hltext += this.props.profile.NAME_KOR + "]";

    let _grid = this.refs.RepairGrid.getWrappedInstance();
    let retRepairGrid = _grid.updateInformNote();
    let retDelRepairGrid = _grid.deleteInformNote();

    //안전작업 허가서 WORK_NO만 추출
    let safetyWorkGridData = '';
    let safetyWorkNo = '';
    // const retSafetyWorkGrid = this.refs.SafetyWorkGrid.updateInformNote();
    let _safetyWork = this.refs.SafetyWorkGrid.getWrappedInstance();
    let retSafetyWorkGrid = _safetyWork.updateInformNote(); //안전작업 허가서 new Data
    let retDelSafetyWorkGrid = _safetyWork.deleteInformNote();  //안전작업 허가서 delete Data (InformNoID, WorkNo)

    if (retSafetyWorkGrid.length > 0) {
      retSafetyWorkGrid.map( data => {
        if (data.WORK_NO !== '' && data.WORK_NO !== null) {
          safetyWorkNo += data.WORK_NO;
          safetyWorkNo += ',';
        }
      });
    }

    // 기술안전팀
    let allSaveItemTech = [];
    // const retTechSafe = this.refs.TechSafe.updateInformNote();
    let _TechSafegrid = this.refs.TechSafe.getWrappedInstance();
    let retTechSafe = _TechSafegrid.updateInformNote();
    let retDelTechSafeGrid = _TechSafegrid.deleteInformNote();
    
    if (retTechSafe.length > 0) {
      const gridData = func.getInformNoteListByNo(INFORM_NOTE_NO);
      retTechSafe.map(data => {
        let tmpItemTech = {};
        tmpItemTech.ITEM_TECH_NO = data.ITEM_TECH_NO != undefined ? data.ITEM_TECH_NO : "";
        tmpItemTech.REQ_ITEM = data.REQ_ITEM;
        tmpItemTech.REQ_ITEM_NM = trim(data.REQ_ITEM_NM);
        tmpItemTech.EQ_ID = gridData.length > 0 ? gridData[0].EQ_ID : ""; // 반드시 있지만..., 예방차원!!!
        if(tmpItemTech.REQ_ITEM_NM == "") {
          for(var j = 0; j < m1023_COMBO_TRS_CD.length; j++) {
            if(tmpItemTech.REQ_ITEM == m1023_COMBO_TRS_CD[j].value) {
              tmpItemTech.REQ_ITEM_NM = m1023_COMBO_TRS_CD[j].text;
              break;
            }
          }
        }
        allSaveItemTech.push(tmpItemTech);
      });
    }

    if (retRepairGrid.length > 0) {
      let RepairValidation = false;
      retRepairGrid.map(data => {
        RepairValidation = this.repairGridValidationCheck(data);
      })
      if(RepairValidation){
        feed.warning("현상, 부위, 원인, 조치사항은 필수입력 사항입니다.");
      }
    } else {
      list.push({
        INFORM_NOTE_NO: INFORM_NOTE_NO,
        ITEM_NO: "NODATA",
        HLTEXT: hltext,
        ZZEQUI_DATE:	String(ZZEQUI_DATE).replace(/\-/gi,"").substring(0, 8),
        ZZHWSET_DATE:	String(ZZHWSET_DATE).replace(/\-/gi,"").substring(0, 8),
        ZZPROCESSSET_DATE:	String(ZZPROCESSSET_DATE).replace(/\-/gi,"").substring(0, 8),
        ZZPRODUCT_DATE:	String(ZZPRODUCT_DATE).replace(/\-/gi,"").substring(0, 8),
        ZZEQUI_USER:	ZZEQUI_USER,
        ZZEQQUI_ID:	ZZEQQUI_ID,
        ZZPROCESS_USER:	ZZPROCESS_USER,
        ZZPROCESS_ID: ZZPROCESS_ID,
        ZZPROBLEM:	ZZPROBLEM,
        LOT_ID:	LOT_ID,
        OPER:	OPER,
        WAFERID:   '',//m1023_convertWaferId("m1023_combo_wafer_id"+informNoteNo),
        IN_EDMS_ID:	IN_EDMS_ID,
        NOTE_COMMENT:	NOTE_COMMENT,
        REMARK:	REMARK,
        SAFETYWORK:	safetyWorkNo,
        list:	{
          ITEM_TECH_LIST: allSaveItemTech, //기술안전팀 // 2015-09-15 Added KILHO37
        },
      });
    }

    if(list.length < 1){
			feed.warning("선택된 INFORM NOTE NO가 없습니다.");
		}
    
    return list;
  }

  renderList = () => {
    const { handleDeleteLineList, moveEqid, Item, editItem } = this.props;
    const { editable, searchState } = this.state;
    // if (moveEqid === Item.EQ_ID) {
    //   this.props.move(true, Item.EQ_ID);
    // }else this.props.move(false);

    return (
      <div onResize={this.onResize}>
        <span className="data-check">
          <Checkbox checked={editable} onChange={this.onStatusChange} />
        </span>
        <div>
          <NoteDetail Item={Item} editItem={editItem} editable={editable} ref="NoteDetail"  dangerTaskList={this.props.dangerTaskList} userCompanyDefine={this.props.userCompanyDefine}/>
          <RepairGrid Item={Item} editItem={editItem} editable={editable} searchState={searchState} ref="RepairGrid" handleDeleteLineList={handleDeleteLineList} onSizeChange={this.onSizeChange} profile={this.props.profile} />
          <TechSafe Item={Item} editItem={editItem} editable={editable} searchState={searchState} ref="TechSafe" onSizeChange={this.onSizeChange} />
          <SafetyWorkGrid Item={Item} editItem={editItem} editable={editable} searchState={searchState} ref="SafetyWorkGrid" onSizeChange={this.onSizeChange} />
        </div>
      </div>
    )
  };

  repairGridValidationCheck = (data) => {
    let val = false;
    if (!data.OTEIL){
      val = true;
    } else if (!data.FECOD) {
      val = true;
    } else if (!data.URCOD) {
      val = true;
    } else if (!data.MNCOD) {
      val = true;
    } else if (!data.RESULT) {
      val = true;
    }
    return val;
  }

  render() {
    const { displayCodingName, Item, visible } = this.props;

    return (
      <div className="inform-chapter-item" id={Item.EQ_ID}  style={this.props.rowStyle}>
        { displayCodingName && <NoteSubtitle title={Item.CODING_NAME} /> }

        { visible && this.renderList() }
      </div>
    );
  }
}

List.propTypes = {
  Item: PropTypes.array,
  displayCodingName: PropTypes.bool,
  searchState: PropTypes.object,
  onEditEvent: PropTypes.func,
  onSaveEvent: PropTypes.func,
  handleDeleteLineList: PropTypes.func,
};

List.defaultProps = {
  Item: {},
  searchState: {},
  displayCodingName: true,
};

export default List;
