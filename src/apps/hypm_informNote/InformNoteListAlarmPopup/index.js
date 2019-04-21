import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { DatePicker, Select, Input, Checkbox, Button } from 'antd';
import moment from 'moment';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import * as feed from 'components/Feedback/functions';
import Axios from 'axios';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import EqIdSearch from '../EqIdSearch';
import * as selectors from '../informNote/selectors';

const Options = Select.Option;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

let PARAM_ALARM_BEBER;
let PARAM_ALARM_STAND;
let PARAM_ALARM_ARBPL;
let MULTI_PARAM_NOTI_TYPE;
let MULTI_PARAM_U_ID;
let PARAM_EQ_ID;
let PARAM_EQ_MST_ID;
let PARAM_TYPE;
const tempMultiData = { CODE: '', NAME: 'ALL' };
class InformNoteListAlarmPopup extends PureComponent {
  constructor(props) {
    super(props);

    const { params } = props.match;
    const { PARAM } = params;
    let arrParam = [];
    arrParam = PARAM.split('|');
    PARAM_ALARM_BEBER = arrParam[0] === undefined ? '' : arrParam[0];
    PARAM_ALARM_STAND = arrParam[1] === undefined ? '' : arrParam[1];
    PARAM_ALARM_ARBPL = arrParam[2] === undefined ? '' : arrParam[2];
    MULTI_PARAM_NOTI_TYPE = arrParam[3] === undefined ? '' : arrParam[3];
    MULTI_PARAM_U_ID = arrParam[4] === undefined ? '' : arrParam[4];
    PARAM_EQ_ID = arrParam[5] === undefined ? '' : arrParam[5];
    PARAM_EQ_MST_ID = arrParam[6] === undefined ? '' : arrParam[6];
    PARAM_TYPE = arrParam[7] === undefined ? '' : arrParam[7];

    this.state = {
      defaultBox: [],
      sdpt: PARAM_ALARM_ARBPL,
      fl: [],
      model: [],
      eqId: [],
      downType: [],
      isActive: undefined,
      isDisabled: undefined,
      alarmDt: [moment(), moment('99991230')],
      procItem: undefined,
      compItem: undefined,
      isBtnSaveDisplay: '',
      sdptList: [],
      flList: [],
      modelList: [],
      downTypeList: [],
    };

    const param = {
      PARAM_BEBER: PARAM_ALARM_BEBER, // FAB
      PARAM_STAND: PARAM_ALARM_STAND, // Team
      MULTI_PARAM_CODEGRUPPE: MULTI_PARAM_NOTI_TYPE, // Down
      PARAM_ARBPL: PARAM_ALARM_ARBPL, // SDPT
    };
    this.handleLoadingParam(param);
    this.handleLoadingSdptParam(PARAM_ALARM_ARBPL);

    if (PARAM_TYPE === 'D') {
      this.handleSearch();
    }
  }

  handleSdptChange = (event) => {
    this.handleLoadingSdptParam(event);
    this.setState({
      sdpt: event,
      model: [],
      eqId: [],
    });
  }

  handleFlChange = (event) => {
    let selectData;
    if (event.findIndex(this.isAllFind) > -1 && this.state.fl.findIndex(this.isAllFind) < 0) {
      // ALL 체크박스에 체크가 된 경우
      selectData = this.state.flList.map(flKey => ({ label: flKey.NAME, value: flKey.CODE }));
    } else if (event.findIndex(this.isAllFind) < 0 && this.state.fl.findIndex(this.isAllFind) > -1) {
      // ALL 체크박스의 체크가 해제된 경우
      selectData = [];
    } else if (event.findIndex(this.isAllFind) > -1) {
      // ALL 체크박스의 체크가 변경되지 않고 다른 값이 변경된 경우
      selectData = event;
      selectData.splice(event.findIndex(this.isAllFind), 1);
    } else {
      selectData = event;
    }

    const param = {
      PARAM_BEBER: PARAM_ALARM_BEBER, // FAB
      PARAM_STAND: PARAM_ALARM_STAND, // Team
      MULTI_PARAM_TPLNR: selectData && selectData.length > 0 ? selectData.map(f => `'${f.value}'`).join(',') : '', // F/L
      PARAM_ARBPL: this.state.sdpt, // SDPT
    };
    this.handleLoadingFlParam(param);
    this.setState({
      fl: selectData,
      model: [],
      eqId: [],
    });
  }

  handleModelChange = (event) => {
    let selectData;
    if (event.findIndex(this.isAllFind) > -1 && this.state.model.findIndex(this.isAllFind) < 0) {
      // ALL 체크박스에 체크가 된 경우
      selectData = this.state.modelList.map(modelKey => ({ label: modelKey.NAME, value: modelKey.CODE }));
    } else if (event.findIndex(this.isAllFind) < 0 && this.state.model.findIndex(this.isAllFind) > -1) {
      // ALL 체크박스의 체크가 해제된 경우
      selectData = [];
    } else if (event.findIndex(this.isAllFind) > -1) {
      // ALL 체크박스의 체크가 변경되지 않고 다른 값이 변경된 경우
      selectData = event;
      selectData.splice(event.findIndex(this.isAllFind), 1);
    } else {
      selectData = event;
    }

    this.setState({
      model: selectData,
      eqId: [],
    });
  }

  handleDownTypeChange = (event) => {
    let selectData;
    if (event.findIndex(this.isAllFind) > -1 && this.state.downType.findIndex(this.isAllFind) < 0) {
      // ALL 체크박스에 체크가 된 경우
      selectData = this.state.downTypeList.map(downTypeKey => ({ label: downTypeKey.NAME, value: downTypeKey.CODE }));
    } else if (event.findIndex(this.isAllFind) < 0 && this.state.downType.findIndex(this.isAllFind) > -1) {
      // ALL 체크박스의 체크가 해제된 경우
      selectData = [];
    } else if (event.findIndex(this.isAllFind) > -1) {
      // ALL 체크박스의 체크가 변경되지 않고 다른 값이 변경된 경우
      selectData = event;
      selectData.splice(event.findIndex(this.isAllFind), 1);
    } else {
      selectData = event;
    }

    this.setState({
      downType: selectData,
    });
  }

  handleAlarmDtChange = (event) => {
    this.setState({
      alarmDt: [event[0], event[1]],
    });
  }

  handleIsActiveChange = (event) => {
    this.setState({
      isActive: event.target.checked,
    });
  }

  handleProcItemChange = (event) => {
    this.setState({
      procItem: event.target.value,
    });
  }

  handleCompItemChange = (event) => {
    this.setState({
      compItem: event.target.value,
    });
  }

  // 날짜변환함수(년.월.일)
  timeToDateForm = (val, formType) => {
    const timestamp = new Date(val).getTime();
    const todate = ('00'.concat(new Date(timestamp).getDate())).slice(-2);
    const tomonth = ('00'.concat(new Date(timestamp).getMonth() + 1)).slice(-2);
    const toyear = new Date(timestamp).getFullYear();
    let originalDate = '';

    if (!Number.isNaN(Number(val)) && formType === 'point') {
      originalDate = `${toyear}.${tomonth}.${todate}`;
    } else if (!Number.isNaN(Number(val)) && formType === 'bar') {
      originalDate = `${toyear}-${tomonth}-${todate}`;
    }
    return originalDate;
  }

  handleLabelChange = (event) => {
    if (event.value.length === 0) {
      return event.placeholderButtonLabel;
    } else if (event.value.length === 1) {
      return event.value[0].label;
    } else if (event.value.findIndex(this.isAllFind) > -1) {
      return `${event.value.length - 1}개 선택`;
    }
    return `${event.value.length}개 선택`;
  }

  isAllFind = element => element.label === 'ALL';

  handleSearch = () => {
    const param = {
      MULTI_PARAM_U_ID, // SDPT
    };

    this.handleAlarmSearch(param);
  }

  handleSave = () => {
    const alarmDtFrom = this.timeToDateForm(this.state.alarmDt[0], 'bar').replace(/-/g, '');
    const alarmDtTo = this.timeToDateForm(this.state.alarmDt[1], 'bar').replace(/-/g, '');

    if (this.state.eqId === undefined || this.state.eqId.length === 0) {
      feed.warning('EQ ID는 필수 검색 조건 입니다.');
      return;
    }

    if (alarmDtFrom === '') {
      feed.warning('시작일과 종료일을 잘못 선택하셨습니다.');
      return;
    }

    if (alarmDtFrom > alarmDtTo) {
      feed.warning('시작일이 종료일보다 이전일 수 없습니다.\n다시 선택하세요.');
      return;
    }

    feed.showConfirm('데이터 를 저장 하시겠습니까?', '', this.fncSave);
  }

  fncSave = () => {
    const {
      eqId,
      downType,
      isActive,
      procItem,
      compItem,
    } = this.state;

    const alarmDtFrom = this.timeToDateForm(this.state.alarmDt[0], 'bar').replace(/-/g, '');
    let alarmDtTo = this.timeToDateForm(this.state.alarmDt[1], 'bar').replace(/-/g, '');

    if (alarmDtTo === '') {
      alarmDtTo = '99991230';
    }

    if (!this.props.profile.EMP_NO) {
      feed.error('사용자 정보가 없습니다. \n로그인 후 다시 시도하세요.');
      return;
    }

    const param = {
      U_ID: MULTI_PARAM_U_ID,
      EQ_ID: eqId && eqId.length > 0 ? eqId.map(e => e.CODE).join(',') : '',
      EQ_MST_ID: eqId && eqId.length > 0 ? eqId.map(e => e.EQUNR).join(',') : '',
      CODING: downType && downType.length > 0 ? downType.map(d => d.value).join(',') : '000',
      ISACTIVE: isActive ? 'Y' : 'N',
      PROC_ITEM: procItem,
      COMP_ITEM: compItem,
      ALARM_START_DT: alarmDtFrom,
      ALARM_END_DT: alarmDtTo,
      PARAM_REQ_ID: this.props.profile.EMP_NO,
    };

    this.handleAlarmSave(param);
  }

  handleCancle = () => {
    window.close();
  }

  handleLoadingParam = (param) => {
    const data1 = { // SDPT
      comboType: 'COMBO_WORK_CENTER',
      PARAM_BEBER: param.PARAM_BEBER,
      PARAM_STAND: param.PARAM_STAND,
    };
    Axios.post('/api/gipms/v1/common/commonCombo', data1)
      .then((result) => {
        if (result.data) {
          const { data } = result;
          this.setState({
            sdptList: data.list.comboList,
          });
        }
      });

    const data2 = { // DownType
      comboType: 'COMBO_CODING_TYPE2',
      PARAM_KATALOGART: 'D',
      MULTI_PARAM_CODEGRUPPE: param.MULTI_PARAM_CODEGRUPPE,
    };
    Axios.post('/api/gipms/v1/common/commonCombo', data2)
      .then((result) => {
        if (result.data) {
          const { data } = result;
          const downTypeList = data.list.comboList;
          for (let i = downTypeList.length - 1; i >= 0; i -= 1) {
            if (downTypeList[i].CODE === '040' || downTypeList[i].CODE === '090' || downTypeList[i].CODE === '100' ||
          downTypeList[i].CODE === '110' || downTypeList[i].CODE === '120' || downTypeList[i].CODE === '210' ||
          downTypeList[i].CODE === '220' || downTypeList[i].CODE === '230' || downTypeList[i].CODE === '240' ||
          downTypeList[i].CODE === '320') {
              downTypeList.splice(i, 1);
            }
          }
          downTypeList.unshift(tempMultiData);
          this.setState({
            downTypeList,
          });
        }
      });

    const data3 = { // F/L
      comboType: 'COMBO_FUNCTIONAL_LOCATION',
      PARAM_BEBER: param.PARAM_BEBER,
      PARAM_STAND: param.PARAM_STAND,
    };
    Axios.post('/api/gipms/v1/common/commonCombo', data3)
      .then((result) => {
        if (result.data) {
          const { data } = result;
          data.list.comboList.unshift(tempMultiData);
          this.setState({
            flList: data.list.comboList,
          });
        }
      });
  }

  handleLoadingSdptParam = (value) => {
    const data1 = { // Model
      comboType: 'COMBO_OBJECT_TYPE',
      PARAM_ARBPL: value,
    };
    Axios.post('/api/gipms/v1/common/commonCombo', data1)
      .then((result) => {
        if (result.data) {
          const { data } = result;
          data.list.comboList.unshift(tempMultiData);
          this.setState({
            modelList: data.list.comboList,
          });
        }
      });
  }

  handleLoadingFlParam = (param) => {
    const data1 = { // Model
      comboType: 'COMBO_OBJECT_TYPE_WITH_FL',
      PARAM_BEBER: param.PARAM_BEBER,
      PARAM_STAND: param.PARAM_STAND,
      MULTI_PARAM_TPLNR: param.MULTI_PARAM_TPLNR,
      PARAM_ARBPL: param.PARAM_ARBPL,
    };
    Axios.post('/api/gipms/v1/common/commonCombo', data1)
      .then((result) => {
        if (result.data) {
          const { data } = result;
          data.list.comboList.unshift(tempMultiData);
          this.setState({
            modelList: data.list.comboList,
          });
        }
      });
  }

  handleAlarmSearch = (param) => {
    Axios.post('/api/gipms/v1/informNote/fabInformNoteListAlarmPopupSearch', param)
      .then((result) => {
        if (result.data) {
          const { alarmData } = result.data.list;
          if (alarmData.length > 0) {
            this.setState({
              isDisabled: true,
              fl: [{ label: alarmData[0].PLTXT, value: alarmData[0].TPLNR }],
              model: [{ label: alarmData[0].EARTX, value: alarmData[0].EQART }],
              eqId: [{ CODE: PARAM_EQ_ID, EQUNR: PARAM_EQ_MST_ID }],
              downType: alarmData[0].CODING === '000' ? [] : [{ label: alarmData[0].KURZTEXT, value: alarmData[0].CODING }],
              isActive: alarmData[0].ISACTIVE === 'Y',
              alarmDt: [moment(alarmData[0].ALARM_START_DT), moment(alarmData[0].ALARM_END_DT)],
              procItem: alarmData[0].PROC_ITEM,
              compItem: alarmData[0].COMP_ITEM,
            });
            if (alarmData[0].DESC_CNT > 1) {
              feed.warning('선택하신 ITEM중 기 등록건이 존재하여 수정할수 없습니다.');
              this.setState({
                isBtnSaveDisplay: 'none',
              });
            }
          }
        }
      });
  }

  handleAlarmSave = (param) => {
    Axios.post('/api/gipms/v1/informNote/fabInformNoteListAlarmPopupSave', param)
      .then((result) => {
        if (result.data) {
          const { data } = result;
          if (data.errCode > 0) {
            feed.success('저장이 완료 되었습니다.');
          } else {
            feed.error('저장에 실패하였습니다.');
          }
        }
      });
  }

  render() {
    const {
      defaultBox,
      sdpt,
      fl,
      model,
      eqId,
      downType,
      isActive,
      alarmDt,
      procItem,
      compItem,
      isDisabled,
      isBtnSaveDisplay,
      sdptList,
      flList,
      modelList,
      downTypeList,
    } = this.state;

    return (
      <section className="gipms popup">
        <header>
          <h2 className="title">Alarm List</h2>
          <Button className="btn-popup-close" onClick={this.handleCancle}>닫기</Button>
        </header>
        {/* popup contnent */}
        <section className="popup-content">
          {/* 검색영역 시작 */}
          <section className="search-area">
            <div className="search-item-area">
              {/* 검색 옵션 search-item */}
              <div className="search-item">
                <span className="search-label required">SDPT</span>
                <span className="search-select">
                  <Select
                    defaultValue={defaultBox}
                    value={sdpt}
                    style={{ width: 150 }}
                    onChange={this.handleSdptChange}
                    notFoundContent="Select 하세요."
                    placeholder="Select 하세요."
                    defaultActiveFirstOption={false}
                    disabled={isDisabled}
                  >
                    { sdptList.map(sdptKey => <Options key={sdptKey.CODE}>{sdptKey.NAME}</Options>) }
                  </Select>
                </span>
              </div>
              <div className="search-item">
                <span className="search-label">F/L</span>
                <span className="search-select">
                  <ReactMultiSelectCheckboxes
                    placeholderButtonLabel="ALL"
                    defaultValue={defaultBox}
                    value={fl}
                    onChange={this.handleFlChange}
                    hideSearch={true}
                    options={flList.length > 0 ? flList.map(flKey => ({ label: flKey.NAME, value: flKey.CODE })) : [{ label: 'ALL', value: '' }]}
                    width={150}
                    menuIsOpen={isDisabled ? false : undefined} // ##추후 작업 필요 - 스타일을 Disabled 적용필요
                    getDropdownButtonLabel={this.handleLabelChange}
                  />
                </span>
              </div>
              <div className="search-item">
                <span className="search-label">Model</span>
                <span className="search-select">
                  <ReactMultiSelectCheckboxes
                    placeholderButtonLabel="ALL"
                    defaultValue={defaultBox}
                    value={model}
                    onChange={this.handleModelChange}
                    hideSearch={true}
                    options={modelList.length > 0 ? modelList.map(modelKey =>
                      ({ label: modelKey.NAME, value: modelKey.CODE })) : [{ label: 'ALL', value: '' }]}
                    width={150}
                    menuIsOpen={isDisabled ? false : undefined} // ##추후 작업 필요 - 스타일을 Disabled 적용필요
                    getDropdownButtonLabel={this.handleLabelChange}
                  />
                </span>
              </div>
              <div className="search-item">
                <span className="search-label">EQ ID</span>
                <span className="search-select">
                  <EqIdSearch
                    fab={PARAM_ALARM_BEBER}
                    team={PARAM_ALARM_STAND}
                    sdpt={sdpt}
                    fl={fl}
                    model={model}
                    tidnConfirmList={eqId}
                    isDisabled={isDisabled}
                  />
                </span>
              </div>
              <div className="search-item">
                <span className="search-label">DownType</span>
                <span className="search-select">
                  <ReactMultiSelectCheckboxes
                    placeholderButtonLabel="ALL"
                    defaultValue={defaultBox}
                    value={downType}
                    onChange={this.handleDownTypeChange}
                    hideSearch={true}
                    options={downTypeList.length > 0 ? downTypeList.map(downTypeKey =>
                      ({ label: downTypeKey.NAME, value: downTypeKey.CODE })) : [{ label: 'ALL', value: '' }]}
                    width={150}
                    menuIsOpen={isDisabled ? false : undefined} // ##추후 작업 필요 - 스타일을 Disabled 적용필요
                    getDropdownButtonLabel={this.handleLabelChange}
                  />
                </span>
              </div>
              <div className="search-item">
                <span className="search-label required">Alarm Date</span>
                <span className="search-select">
                  <span className="date-range">
                    <RangePicker
                      ranges={{
                        오늘: [moment(), moment()],
                        '이번 달': [moment().startOf('month'), moment().endOf('month')],
                      }}
                      onChange={this.handleAlarmDtChange}
                      showToday={true}
                      value={alarmDt !== '' ? alarmDt : null}
                      id="alarmDt"
                    />
                  </span>
                </span>
              </div>
              <div className="search-item">
                <span className="search-select">
                  <span className="data-check" style={{ marginLeft: '5px' }}>
                    <Checkbox
                      checked={isActive}
                      onChange={this.handleIsActiveChange}
                    >
                      ISACTIVE
                    </Checkbox>
                  </span>
                </span>
              </div>
            </div>
          </section>

          <table className="data-table col-2">
            <tr>
              <th style={{ width: '10%', height: 250 }}>진행중인 Item</th>
              <td style={{ width: '90%', height: 250 }}>
                {/* text area */}
                <TextArea
                  rows={9}
                  value={procItem}
                  onChange={this.handleProcItemChange}
                />
              </td>
            </tr>
            <tr>
              <th style={{ width: '10%', height: 250 }}>완료된 Item</th>
              <td style={{ width: '90%', height: 250 }}>
                {/* text area */}
                <TextArea
                  rows={9}
                  value={compItem}
                  onChange={this.handleCompItemChange}
                />
              </td>
            </tr>
          </table>

          {/* footer */}
          <footer>
            <div className="btn-group">
              <div className="right">
                <Button type="primary" className="btn-apply save" onClick={this.handleSave} style={{ display: isBtnSaveDisplay }}>저장</Button>
                <Button type="primary" className="btn-normal add-line" onClick={this.handleCancle}>Cancle</Button>
              </div>
            </div>
          </footer>
        </section>
      </section>
    );
  }
}

InformNoteListAlarmPopup.propTypes = {
  match: PropTypes.object.isRequired,
  profile: PropTypes.object,
};

InformNoteListAlarmPopup.defaultProps = {
  profile: {},
};

const mapStateToProps = createStructuredSelector({
  profile: selectors.makeSelectProfile(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(InformNoteListAlarmPopup);
