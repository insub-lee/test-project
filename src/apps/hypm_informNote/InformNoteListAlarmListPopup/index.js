import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Select, Input, Button } from 'antd';
import moment from 'moment';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import * as feed from 'components/Feedback/functions';
import Axios from 'axios';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import EqIdSearch from '../EqIdSearch';
import Grid from './grid.js';

const Options = Select.Option;
const { RangePicker } = DatePicker;

let gridApi;
let selectedRows = [];
let deleteList = [];
let PARAM_ALARM_BEBER;
let PARAM_ALARM_STAND;
let PARAM_ALARM_ARBPL;
let MULTI_PARAM_NOTI_TYPE;
const tempMultiData = { CODE: '', NAME: 'ALL' };
class InformNoteListAlarmListPopup extends PureComponent {
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

    this.state = {
      defaultBox: [],
      sdpt: PARAM_ALARM_ARBPL,
      fl: [],
      model: [],
      eqId: [],
      downType: [],
      reqNm: '',
      searchDt: undefined,
      alarmDt: [moment(), moment('99991230')],
      isExcelDownload: 0,
      sdptList: [],
      flList: [],
      modelList: [],
      downTypeList: [],
      alarmDataList: [],
    };

    const param = {
      PARAM_BEBER: PARAM_ALARM_BEBER, // FAB
      PARAM_STAND: PARAM_ALARM_STAND, // Team
      MULTI_PARAM_CODEGRUPPE: MULTI_PARAM_NOTI_TYPE, // Down
      PARAM_ARBPL: PARAM_ALARM_ARBPL, // SDPT
    };
    this.handleLoadingParam(param);
    this.handleLoadingSdptParam(PARAM_ALARM_ARBPL);
  }

  onGridReady = (params) => {
    gridApi = params.api;
    gridApi.sizeColumnsToFit();
  };

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

  handleReqNmChange = (event) => {
    this.setState({
      reqNm: event.target.value,
    });
  }

  handleSearchDtChange = (event) => {
    this.setState({
      searchDt: [event[0], event[1]],
    });
  }

  handleAlarmDtChange = (event) => {
    this.setState({
      alarmDt: [event[0], event[1]],
    });
  }

  handleGridSelectionChanged = () => {
    selectedRows = gridApi.getSelectedRows();
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
    const {
      sdpt,
      downType,
      fl,
      model,
      eqId,
      reqNm,
      searchDt,
      alarmDt,
    } = this.state;

    let searchDtFrom = '';
    let searchDtTo = '';
    let alarmDtFrom = '';
    let alarmDtTo = '';

    if (searchDt === undefined) {
      searchDtFrom = '';
      searchDtTo = '';
    } else {
      searchDtFrom = this.timeToDateForm(searchDt[0], 'bar').replace(/-/g, '');
      searchDtTo = this.timeToDateForm(searchDt[1], 'bar').replace(/-/g, '');
    }

    alarmDtFrom = this.timeToDateForm(alarmDt[0], 'bar').replace(/-/g, '');
    alarmDtTo = this.timeToDateForm(alarmDt[1], 'bar').replace(/-/g, '');

    if (alarmDtTo === '') {
      alarmDtTo = '99991230';
    }

    if (sdpt === '' || sdpt === undefined) {
      feed.warning('SDPT은 필수 값입니다.');
      return;
    }

    if (alarmDtFrom > alarmDtTo) {
      feed.warning('시작일이 종료일보다 이전일 수 없습니다.\n다시 선택하세요.');
      return;
    }

    const param = {
      PARAM_ARBPL: sdpt,
      MULTI_PARAM_EQ_ID: eqId && eqId.length > 0 ? eqId.map(e => `'${e.CODE}'`).join(',') : '',
      MULTI_PARAM_EQ_MST_ID: eqId && eqId.length > 0 ? eqId.map(e => `'${e.EQUNR}'`).join(',') : '',
      MULTI_PARAM_CODING: downType && downType.length > 0 ? downType.map(d => `'${d.value}'`).join(',') : '',
      MULTI_PARAM_TPLNR: fl && fl.length > 0 ? fl.map(f => `'${f.value}'`).join(',') : '',
      MULTI_PARAM_EQART: model && model.length > 0 ? model.map(m => `'${m.value}'`).join(',') : '',
      PARAM_REQ_NAM: reqNm,
      PARAM_START_DT: searchDtFrom,
      PARAM_END_DT: searchDtTo,
      isCheckDate: 'Y',
      ALARM_START_DT: alarmDtFrom,
      ALARM_END_DT: alarmDtTo,
    };

    this.handleAlarmListSearch(param);
    // 조회시 선택된 행과 삭제할 행을 초기화해준다.
    selectedRows = [];
    deleteList = [];
    gridApi.deselectAll();
  }

  handleDelete = () => {
    if (selectedRows.length === 0) {
      feed.warning('삭제할 라인을 선택하세요.');
      return;
    }

    const { alarmDataList } = this.state;
    for (let i = 0; i < selectedRows.length; i += 1) {
      for (let j = alarmDataList.length - 1; j >= 0; j -= 1) {
        if (selectedRows[i].U_ID === alarmDataList[j].U_ID) {
          alarmDataList.splice(j, 1);
          deleteList.push(selectedRows[i].U_ID);
          break;
        }
      }
    }

    gridApi.updateRowData({ remove: selectedRows });
  }

  handleSave = () => {
    if (deleteList.length === 0) {
      feed.warning('저장할 데이터가 없습니다.');
      return;
    }
    feed.showConfirm('데이터 를 저장 하시겠습니까?', '', this.fncSave);
  }

  fncSave = () => {
    this.handleAlarmListSave(deleteList);
    // this.handleSearch();
  }

  handleModify = () => {
    if (selectedRows.length === 0) {
      feed.warning('선택된 행이 없습니다.');
      return;
    }

    if (selectedRows.length > 1) {
      feed.warning('한번에 한가지 아이템만 수정이 가능합니다.');
      return;
    }

    let sParam = '';
    let sUrl = '/sm/informNote/pop/InformNoteListAlarmPopup/';

    sParam += PARAM_ALARM_BEBER;
    sParam += '|';
    sParam += PARAM_ALARM_STAND;
    sParam += '|';
    sParam += this.state.sdpt;
    sParam += '|';
    sParam += this.state.downType && this.state.downType.length > 0 ? this.state.downType.map(d => `'${d.value}'`).join(',') : '';
    sParam += '|';
    sParam += selectedRows[0].U_ID;
    sParam += '|';
    sParam += selectedRows[0].EQ_ID;
    sParam += '|';
    sParam += selectedRows[0].EQ_MST_ID;
    sParam += '|D';

    sUrl += sParam;
    window.open(sUrl, 'InformNoteListAlarmPopup', 'width=1500,height=720');
  }

  handleCreate = () => {
    let sParam = '';
    let sUrl = '/sm/informNote/pop/InformNoteListAlarmPopup/';

    sParam += PARAM_ALARM_BEBER;
    sParam += '|';
    sParam += PARAM_ALARM_STAND;
    sParam += '|';
    sParam += this.state.sdpt;
    sParam += '|';
    sParam += this.state.downType && this.state.downType.length > 0 ? this.state.downType.map(d => `'${d.value}'`).join(',') : '';
    sParam += '||||';

    sUrl += sParam;
    window.open(sUrl, 'InformNoteListAlarmPopup', 'width=1500,height=720');
  }

  handleExcel = () => {
    this.setState({
      isExcelDownload: this.state.isExcelDownload + 1,
    });
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

  handleAlarmListSearch = (param) => {
    Axios.post('/api/gipms/v1/informNote/fabInformNoteListAlarmListPopupSearch', param)
      .then((result) => {
        if (result.data) {
          const { data } = result;
          this.setState({
            alarmDataList: data.list.alarmDataList,
          });
        }
      });
  }

  handleAlarmListSave = (value) => {
    const data1 = {
      list: {
        deleteList: value,
      },
    };
    Axios.post('/api/gipms/v1/informNote/fabInformNoteListAlarmListPopupDelete', data1)
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
      reqNm,
      searchDt,
      alarmDt,
      isExcelDownload,
      sdptList,
      flList,
      modelList,
      downTypeList,
      alarmDataList,
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
                    getDropdownButtonLabel={this.handleLabelChange}
                  />
                </span>
              </div>
              <div className="search-item">
                <span className="search-label">등록자</span>
                <span className="use-time-input">
                  <Input
                    value={reqNm}
                    style={{ width: 180 }}
                    onChange={this.handleReqNmChange}
                    placeholder="검색어를 입력해 주십시오."
                  />
                </span>
              </div>
              <div className="search-item">
                <span className="search-label">등록일</span>
                <span className="search-select">
                  <span className="date-range">
                    <RangePicker
                      ranges={{
                        오늘: [moment(), moment()],
                        '이번 달': [moment().startOf('month'), moment().endOf('month')],
                      }}
                      onChange={this.handleSearchDtChange}
                      showToday={true}
                      value={searchDt !== '' ? searchDt : null}
                      id="searchDt"
                    />
                  </span>
                </span>
              </div>
              <div className="search-item">
                <span className="search-label">Alarm Date</span>
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
            </div>
            <div className="btn-area">
              <Button type="primary" className="btn-search" onClick={this.handleSearch}>Search</Button>
            </div>
          </section>

          <div className="btn-group">
            <div className="right">
              <Button type="primary" className="btn-normal add-line" onClick={this.handleCreate}>추가</Button>
              <Button type="primary" className="btn-normal edit" onClick={this.handleModify}>수정</Button>
              <Button type="primary" className="btn-normal add-line" onClick={this.handleDelete}>삭제</Button>
              <Button type="primary" className="btn-apply save" onClick={this.handleSave}>저장</Button>
              <Button type="primary" className="btn-apply excel" onClick={this.handleExcel}>엑셀</Button>
            </div>
          </div>
          {/* ag Grid */}
          <div className="grid-area">
            <div className="ag-theme-balham" style={{ width: '100%' }}>
              <Grid
                gridApi={gridApi}
                alarmDataList={alarmDataList}
                onGridReady={this.onGridReady}
                handleGridSelectionChanged={this.handleGridSelectionChanged}
                isExcelDownload={isExcelDownload}
              />
            </div>
          </div>
        </section>
      </section>
    );
  }
}

InformNoteListAlarmListPopup.propTypes = {
  match: PropTypes.object.isRequired,
};

InformNoteListAlarmListPopup.defaultProps = {
};

export default InformNoteListAlarmListPopup;
