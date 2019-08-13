/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import { Select, Input, Tabs } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import 'ag-grid-community/dist/styles/ag-grid.css';
import excelImg from 'images/common/excel.png';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import * as feed from 'components/Feedback/functions';
import Axios from 'axios';
// import * as feed from 'components/Feedback/functions';
// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import { BtnSearchDkGray } from './buttons.style';
import GridOwnComp from './gridOwnComp.js';
import GridContractor from './gridContractor.js';


const { TabPane } = Tabs;

const { Option } = Select;

let empNum;

let etOperation;
// let chkPrueflosYn = 'N';

// let informNoteUid = '';
let stort = '';
let sheetSubmit = '';
// let allowContractEdit = false;

// FDC 추가개발 2014.10.27 이상엽
// let fdclistData = [];
// eslint-disable-next-line prefer-const
let fdclistDataC = [];
// let FDCAufnr;

// // operation 진행상태 데이터 저장변수
// let operationResult = {};
let inspLotStatus = '';
// let inspLot = '';

// //APC 추가개발 20161028 i0100373
// let apcFlag = '';
let apcAndCnt = -1;
let apcOrCnt = -1;
// let apcAndTotCnt = 0;
// let apcOrTotCnt = 0;


// 인터락 관련 변수
let interlockType = 'onLoad';
// let totalRowCntA = 0;
// let totalRowCntB = 0;

let userAction = '';
// eslint-disable-next-line prefer-const
let returnBoole = true;

// 저장 버튼 클릭 시 실행
// eslint-disable-next-line no-unused-vars
let saveSuccess = 'true';

let errorValue = 'Y';

let comboValArr = [];

class PmSheetDetailPMCardPopup extends PureComponent {
  constructor(props) {
    super(props);
    const { params } = props.match;
    const { PARAM } = params;
    let arrParam = [];
    arrParam = PARAM.split('|');

    this.state = {
      insplot: arrParam[0],
      operatorCodes: arrParam[1],
      ivMode: arrParam[2],
      workOrderNo: arrParam[4],
      searchMode: 'D',
      ivVenName: undefined,
      ivRepmCauz: undefined,
      iVPassRate: undefined,
      // worktime: undefined,
      headerSumtime: undefined,
      headerWorktimeStart: undefined,
      headerWorktimeEnd: undefined,
      shouldHide: false,

      informNo: '',
      beberT: '',
      tplnrT: '',
      standT: '',
      arbplT: '',
      ivArbplT: '',
      eqartT: '',
      tidnrT: '',
      equnrT: '',
      gridTest: [],
      isExcelDownload: 0,
      test111: 0,
      ttt: '',

      code: '',
      text: '',
      checkValue: '',
    // IV_MODE: arrParam[0],
      // IV_INSPLOT: arrParam[1],
      // OPER: arrParam[2],
      // SUBMIT: arrParam[3],
      // PARAM_AUFNR: arrParam[4],

      // searchMode: 'D',
      // insplot: '',
      // list: {},
    };
    this.props.handleLoadingGridParam({
      IV_MODE: this.state.searchMode, INSP_LOT: this.state.insplot, IV_INSPLOT: this.state.insplot, list: { IT_OPERATION: this.fncValuesToJson(this.state.operatorCodes, 'OPER') },
    });

    // this.handleSearch();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.ownCompGrid !== nextProps.ownCompGrid || this.props.contractorGrid !== nextProps.contractorGrid
      || this.props.result !== nextProps.result
    ) {
      const { result } = nextProps;
      const listDataA = result.list.ET_RESULT_A;
      const listDataB = result.list.ET_RESULT_B;
      const headerInfo = result.list.ES_INFO;
      const esVenInfo = result.list.ES_VEN_INFO;

      if (esVenInfo.length > 0) {
        this.setState({
          ivVenName: esVenInfo[0].ZVEN_NAME,
          ivRepmCauz: esVenInfo[0].ZREPM_CAUZ,
          iVPassRate: esVenInfo[0].ZPASS_RATE.replace(/[0]+/i, ''),
        });
        if (esVenInfo[0].ZSW_DATE === '' && esVenInfo[0].ZSW_TIME === '') {
          this.setState({
            // worktime: '당사작업없음',
            headerSumtime: '',
            shouldHide: false,
          });
        } else {
          const cHeaderWorktimeStart = `${esVenInfo[0].ZSW_DATE}' '${esVenInfo[0].ZSW_TIME}`;
          const cHeaderWorktimeEnd = `${esVenInfo[0].ZFW_DATE}' '${esVenInfo[0].ZFW_TIME}`;
          const cSumtime = this.calTimeDiff(cHeaderWorktimeStart, cHeaderWorktimeEnd);
          this.setState({
            headerSumtime: `소계 ${cSumtime}MIN`,
            headerWorktimeStart: cHeaderWorktimeStart,
            headerWorktimeEnd: cHeaderWorktimeEnd,
            shouldHide: true,
          });
        }
      }

      etOperation = this.etOperationB(result.list.ET_OPERATION);

      if (this.checkoldpmsheetformat(listDataB) === false) {
        feed.error('도급사 신규 PM sheet포맷이 아닙니다. PM sheet 신규생성 바랍니다.');
        return;
      }

      // FDC 추가개발 2014.10.27 이상엽
      // fdclistData = result.list.ET_FDC_INSP;
      // if (headerInfo.length > 0) {
      //   FDCAufnr = `${Number(headerInfo[0].AUFNR)}''`;
      //   FDCAufnr = this.fncLpadZeroCode(FDCAufnr, 12);
      // }
      // operationResult = result.list.ET_OPERATION;
      inspLotStatus = result.INSP_LOT_STATUS;
      // inspLot = result.INSP_LOT;
      // informNoteUid = result.INFORM_NOTE_UID;
      // apcFlag = result.APC_FLAG;
      stort = result.STORT;

      // APC 일부 Location 적용 -> 전사적용
      if (stort === 'P221-02' || true) {
        apcAndCnt = -1;
        apcOrCnt = -1;

        // $("#apcSection").html($("#list_tab2_tmpl").render()); // repair Section body
        for (let i = 0; i < listDataB.length; i += 1) {
          if (listDataB[i].DUMMY10.toUpperCase() === 'AND') {
            if (apcAndCnt < 0) apcAndCnt = 0;
            apcAndCnt += 1;
          } else if (listDataB[i].DUMMY10.toUpperCase() === 'OR') {
            if (apcOrCnt < 0) apcOrCnt = 0;
            apcOrCnt += 1;
          }
        }
        // apcAndTotCnt = apcAndCnt;
        // apcOrTotCnt = apcOrCnt;
      }

      this.setState({
        beberT: headerInfo[0].BEBER_T,
        tplnrT: headerInfo[0].TPLNR_T,
        standT: headerInfo[0].STORT_T,
        arbplT: headerInfo[0].ARBPL_T,
        ivArbplT: headerInfo[0].ARBPL,
        eqartT: headerInfo[0].EQART_T,
        tidnrT: headerInfo[0].TIDNR,
        equnrT: headerInfo[0].SUBMIT,
      });

      sheetSubmit = headerInfo[0].SUBMIT;

      // X이면 송부완료
      // totalRowCntA = listDataA.length - 1;
      // totalRowCntB = listDataB.length - 1;

      // if (listDataB.length > 0) chkPrueflosYn = 'Y';
      for (let i = 0; i < listDataA.length; i += 1) {
        if (listDataA[i].ZVAL1 === '99999') {
          listDataA[i].ZVAL1 = 'Not available';
        }
      }
      for (let i = 0; i < listDataB.length; i += 1) {
        if (listDataB[i].ZVAL1 === '99999') {
          listDataB[i].ZVAL1 = 'Not available';
        }
      }
      // 도급Tab 입력 권한
      // allowContractEdit = this.getAuthorization(this.state.ivMode, inspLotStatus);

      // 자사로 로그인 하고 도급사텝  테스트로
      this.setAuthorization(listDataB, true);
    }
  }

  setAuthorization = (listDataB, isInit) => {
    // 도급Tab 조회 권한
    // 자사는 송부가 되었을 때만 조회 가능
    if (this.state.ivMode === 'O' && sheetSubmit === 'X' && isInit) {
      this.state.gridTest = listDataB;
    }
    if (this.state.ivMode === 'O' && sheetSubmit === 'X' && isInit === false) {
      this.state.gridTest = [];
    } else if (this.state.ivMode === 'S' && isInit) { // 도급사인 경우는 항상 조회
      this.state.gridTest = listDataB;
    }

    if (inspLotStatus !== 'I020' && inspLotStatus !== 'I040') {
      console.log('');
    } else {
      console.log('');
    }
  }

  getAuthorization = (ivMode, inspLotStatusP) => {
    let allowEdit = false;

    if (ivMode === 'S') {
      // 결재중, 승인
      if (inspLotStatusP !== 'I020' && inspLotStatusP !== 'I040') {
        allowEdit = true;
      }
    }

    return allowEdit;
  }

  handleExcel = () => {
    this.setState({
      isExcelDownload: this.state.isExcelDownload + 1,
    });
  }

  fncValuesToJson = (value, jsonName) => {
    const paramJson = [];
    const temValue = value.split(',');
    for (let i = 0; i < temValue.length; i += 1) {
      if (temValue[i] === '') {
        break;
      }
      const sub = {};
      sub[jsonName] = temValue[i];
      paramJson[i] = sub;
    }
    return paramJson;
  }

  etOperationB = (value) => {
    const etOperationB = [];
    for (let i = 0; i < value.length; i += 1) {
      if (value[i].ALNZU === 'B') {
        etOperationB.push(etOperation[i]);
      }
    }
    return etOperationB;
  }

  checkoldpmsheetformat = (listDataB) => { // 초기 수정시 최소 4개만 체크
    let ckRt = true;
    for (let i = 0; i < listDataB.length; i += 1) {
      if (this.state.informNo === 'null') { // 도급사 화면에서 진입이 아닐때
        ckRt = true;
        break;
      }
      if (listDataB[i].INSPOPER === etOperation[0].OPER) { // 0010
        if (listDataB[i].ARBEI2 === '' && listDataB[i].ANZZL === '') {
          ckRt = false;
          break;
        }
      } else if (listDataB[i].INSPOPER === etOperation[1].OPER) { // 0020
        if (listDataB[i].ARBEI2 === '' && listDataB[i].ANZZL === '') {
          ckRt = false;
          break;
        }
      } else if (listDataB[i].INSPOPER === etOperation[2].OPER) { // 0030
        if (listDataB[i].ARBEI2 === '' && listDataB[i].ANZZL === '') {
          ckRt = false;
          break;
        }
      } else if (listDataB[i].INSPOPER === etOperation[3].OPER) { // 0040
        if (listDataB[i].ARBEI2 === '' && listDataB[i].ANZZL === '') {
          ckRt = false;
          break;
        }
      }
    }
    return ckRt;
  }

  // yyyy-MM-dd hh:mm:ss
  calTimeDiff = (startTimeVal, endTimeVal) => {
    if (startTimeVal !== '' && endTimeVal !== '') {
      const startTimeDate = new Date(startTimeVal.replace(/-/g, '/'));
      const endTimeDate = new Date(endTimeVal.replace(/-/g, '/'));
      const timeDiff = (endTimeDate - startTimeDate) / (1000 * 60);
      if (timeDiff <= 0) {
        return '0';
      }
      return 'test';
      // return isNaN(timeDiff) ? '0' : parseInt(timeDiff);
    }
    return '0';
  }


  fncSave = (saveOption, saveGrid) => {
    const {
      ownCompGrid,
      contractorGrid,
    } = this.props;
    interlockType = 'save';
    // fncInterLockCheck(interlockType);
    userAction = saveOption;
    if (returnBoole === false) {
      return;
    }

    const itemGridData = [];
    const itemWorkTimeGridData = [];
    // $("#" + saveGrid).alopexGrid('endEdit');
    const dataRows = (saveGrid === 'ownCompGrid' ? ownCompGrid : contractorGrid);

    for (let i = 0; i < dataRows.length; i += 1) {
      const objectParam = {};
      const worktimeObjectParam = {};
      const steuerkz = dataRows[i].STEUERKZ_R;

      if (((dataRows[i].ZEVAL1 === 'A' || dataRows[i].ZEVAL1 === 'R') && dataRows[i].ZVAL1 === '')
        ||
        ((dataRows[i].ZEVAL2 === 'A' || dataRows[i].ZEVAL2 === 'R') && dataRows[i].ZVAL2 === '')) {
        // 입력되지 않은
        alert("<spring:message code='fab.pmsheet.validation.alert.msg.type1' />");
        // $("#" + saveGrid).alopexGrid("startEdit");
        return;
      }

      objectParam.INSPOPER = dataRows[i].INSPOPER;
      objectParam.INSPCHAR = dataRows[i].INSPCHAR;
      objectParam.WERKS = dataRows[i].WERKS;
      objectParam.ZGROUP = dataRows[i].ZGROUP;
      objectParam.ZCODE1 = dataRows[i].ZCODE1;

      // 콤보선택
      if (steuerkz === 'PI04') {
        // 입력값이 없을때
        if (dataRows[i].ZTEXT1 === '') {
          const combo = dataRows[i].COMBO;
          const comboStringArray = combo.split(',');
          if (comboStringArray.length > 0) {
            const tempString = comboStringArray[0];

            if (tempString !== '') {
              comboValArr = tempString.split(':');
              // 0001:ON:A
              this.setState({
                code: comboValArr[0],
                text: comboValArr[1],
                checkValue: comboValArr[2],
              });
            }
          }
          console.log(errorValue);
          if (this.state.code === '실시') errorValue = 'N';
          if (this.statecode === '미실시') errorValue = 'N';
          // 0001:ON:A
          objectParam.ZCODE1 = this.state.code;
          objectParam.ZVAL1 = this.state.text;
          objectParam.ZEVAL1 = this.state.checkValue;
        }
        objectParam.ZCODE1 = dataRows[i].ZCODE1;
        objectParam.ZVAL1 = dataRows[i].ZTEXT1;// 콤보텍스트로
        objectParam.ZEVAL1 = dataRows[i].ZEVAL1;

        if (dataRows[i].ZCODE1 === '실시') errorValue = 'N';
        if (dataRows[i].ZCODE1 === '미실시') errorValue = 'N';

        objectParam.ZVAL2 = dataRows[i].ZTEXT2;// 콤보텍스트로
      }
      objectParam.ZCODE1 = dataRows[i].ZCODE1;
      objectParam.ZVAL1 = dataRows[i].ZVAL1;// 입력값
      objectParam.ZVAL2 = dataRows[i].ZVAL2;// 입력값
      objectParam.ZEVAL1 = dataRows[i].ZEVAL1;

      objectParam.ZCODE2 = dataRows[i].ZCODE2;
      objectParam.ZEVAL2 = dataRows[i].ZEVAL2;
      objectParam.REMARK = dataRows[i].REMARK;
      objectParam.REMARK = dataRows[i].REMARK;


      if (objectParam.ZVAL1 === 'Not available') {
        objectParam.ZVAL1 = '99999';
      }

      // 도급사 PM sheet항목 추가
      if (saveGrid === 'contractorGrid') {
        worktimeObjectParam.VORNR = dataRows[i].INSPOPER;
        const arbei = this.calTimeDiff(`${dataRows[i].NTANF} ${dataRows[i].NTANZ}`, `${dataRows[i].NTEND} ${dataRows[i].NTENZ}`);// 시간 재계산 함
        worktimeObjectParam.ARBEI = arbei;
        worktimeObjectParam.ARBEH = dataRows[i].ARBEH === '' ? 'MIN' : dataRows[i].ARBEH;
        worktimeObjectParam.DAUNO = dataRows[i].DAUNO;
        worktimeObjectParam.NTANF = dataRows[i].NTANF;
        worktimeObjectParam.NTANZ = dataRows[i].NTANZ;
        worktimeObjectParam.NTEND = dataRows[i].NTEND;
        worktimeObjectParam.NTENZ = dataRows[i].NTENZ;
        worktimeObjectParam.ZTXT = dataRows[i].ZTXT;
        worktimeObjectParam.USR01 = dataRows[i].USR01;
        itemWorkTimeGridData.push(worktimeObjectParam);
      }

      // object_param["APC_FLAG"] = apcFlag;

      itemGridData.push(objectParam);


      // FDC 추가개발 2014.10.27 이상엽 == LIF_FAB_PMMIC
      const objectParamFdc = {};
      objectParamFdc.INSPLOT = this.state.insplot;
      objectParamFdc.INSPOPER = dataRows[i].INSPOPER;
      objectParamFdc.INSPCHAR = dataRows[i].INSPCHAR;
      objectParamFdc.MIC_NO = (`${Number(dataRows[i].INSPOPER)}`);
      objectParamFdc.CHAR_DESCR = dataRows[i].MIC_T;
      objectParamFdc.SPEC = dataRows[i].SPEC;
      objectParamFdc.DESC = dataRows[i].DESC;
      objectParamFdc.INSPECTOR = dataRows[i].ZVAL1;
      objectParamFdc.BEWERTUNG = dataRows[i].ZEVAL1;
      objectParamFdc.REMARK = dataRows[i].REMARK;
      objectParamFdc.INSPECTOR2 = dataRows[i].ZVAL2;
      objectParamFdc.BEWERTUNG2 = dataRows[i].ZEVAL2;
      fdclistDataC.push(objectParamFdc);
    }

    // const equnr = $("#equnr").val();
    const paramJson = {
      IV_MODE: 'U',
      TARGET: 'InformNoteMst',
      IV_INSPLOT: this.state.insplot,
      PARAM_INSP_LOT: this.state.insplot,
      PARAM_INSP_LOT_STATUS: 'I010',
      PARAM_EQUNR: this.state.equnrT,
      IV_ARBPL: this.state.ivArbplT,
      IV_AUFNR: this.state.workOrderNo,
      list: {
        IT_RESULT: itemGridData,
      },
    };

    Axios.post('/api/gipms/v1/informNote/fabInformNoteListDetailSave', paramJson)
      .then((result) => {
        console.log(result);
        if (result.EV_SUBRC === '0') {
          if (saveOption === 'complete') {
            this.nextSubmitProssece();
          } else if (saveOption === 'send') {
            this.nextSend();
          } if (interlockType === 'save') {
            if (saveGrid === 'contractorGrid') { // 도급사 PM sheet일때
              const paramJsonC = {
                IV_AUFNR: this.fncLpadZeroCode(this.sates.workOrderNo, 12),
                IV_VEN_NAME: this.state.ivVenName,
                IV_REPM_CAUZ: this.state.ivRepmCauz,
                IV_PASS_RATE: this.state.iVPassRate,
                IV_VEN_ERNAM: empNum,
                // IV_SW_DATE: $('#header_worktime_start').val().substr(0, 10).replace(/-/gi, ''),
                // IV_SW_TIME: $('#header_worktime_start').val().substr(11, 8).replace(/:/gi, ''),
                // IV_FW_DATE: $('#header_worktime_end').val().substr(0, 10).replace(/-/gi, ''),
                // IV_FW_TIME: $('#header_worktime_end').val().substr(11, 8).replace(/:/gi, ''),
                list: {
                  // IT_OPERATION: worktimeunique(itemWorkTimeGridData),
                },
              };

              Axios.post('/api/gipms/v1/informNote/contractorsPMSheetPMCardDetailSave', paramJsonC)
                .then((result2) => {
                  console.log(result2);
                  feed.success('저장이 정상적으로 완료 되었습니다.');
                  // fncSearchList(); // 초기화
                })
                .catch((res2) => {
                  console.log(res2);
                  saveSuccess = 'false';
                  feed.error("<spring:message code='fab.InformNoteList.alert.msg.type40' />");
                });
            } else {
              feed.success('저장이 정상적으로 완료 되었습니다.');
              // fncSearchList(); // 초기화
            }
            // window.close();
          }
        }
        // var resultStatus = resJson["list"]["ET_RESULT"];
        // for(var i=0;i<resultStatus.length;i++) { }
        saveSuccess = 'false';
        feed.error("<spring:message code='fab.InformNoteList.alert.msg.type40' />");
        window.close();
      })
      .catch((res) => {
        console.log(res);
        saveSuccess = 'false';
        feed.error("<spring:message code='fab.InformNoteList.alert.msg.type40' />");
      });
  }

  nextSubmitProssece = () => {
    console.log('');
  }

  nextSend = () => {

  }

  render() {
    const {
      ivVenName,
      ivRepmCauz,
      // iVPassRate,
      // worktime,
      headerSumtime,
      headerWorktimeStart,
      headerWorktimeEnd,
      shouldHide,

      beberT,
      tplnrT,
      standT,
      arbplT,
      ivArbplT,
      eqartT,
      tidnrT,
      equnrT,
      isExcelDownload,
      test111,
      ttt,
    } = this.state;

    const {
      ownCompGrid,
      contractorGrid,
    } = this.props;

    return (
      <div>
        <div className="PMSheetTitle">
          <h2>Sheet Select</h2><br />
        </div>

        <div style={{ border: 'solid 0.5px' }}>
          <div className="SearchBox" style={{ padding: 15 }}>
            <table style={{ border: 'solid 0.5px' }}>
              <tbody>
                <tr>
                  <th style={{ width: 100 }} >FAB</th>
                  <td style={{ width: 205 }}>
                    {beberT}
                  </td>
                  <th style={{ width: 100 }} >AREA</th>
                  <td style={{ width: 205 }}>
                    {tplnrT}
                  </td>
                  <th style={{ width: 100 }} >TEAM</th>
                  <td style={{ width: 205 }}>
                    {standT}
                  </td>
                  <th style={{ width: 100 }} >도급사명</th>
                  <td className="IV_VEN_NAME" style={{ width: 205 }}>
                    {/* <Select defaultValue="선택하세요" style={{ width: 205 }} disabled> */}
                    <Select defaultValue={ivVenName === undefined ? '선택하세요' : ivVenName} style={{ width: 205 }} disabled>
                      <Option value="삼구">삼구</Option>
                      <Option value="SMC">SMC</Option>
                      <Option value="발렉스">발렉스</Option>
                      <Option value="케이텍맨파워">케이텍맨파워</Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <th style={{ width: 100 }} >BAND</th>
                  <td style={{ width: 205 }}>
                    {arbplT}
                  </td>
                  <th style={{ width: 100 }} >EQ MODEL</th>
                  <td style={{ width: 205 }}>
                    {eqartT}
                  </td>
                  <th style={{ width: 100 }} >EQ ID</th>
                  <td style={{ width: 205 }}>
                    {tidnrT}
                  </td>
                  <th style={{ width: 100 }} >PASS RATE</th>
                  <td className="IV_PASS_RATE" style={{ width: 205 }}>
                    <Select defaultValue="선택하세요" style={{ width: 205 }}>
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                      <Option value="3">3</Option>
                      <Option value="4">4</Option>
                      <Option value="5이상">5이상</Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <th style={{ width: 100 }} >비정기/재PM사유</th>
                  <td className="IV_REPM_CAUZ" style={{ width: 205 }}>
                    <Select defaultValue={ivRepmCauz === undefined ? '선택하세요' : ivRepmCauz} style={{ width: 205 }}>
                      <Option value="정기PM">정기PM</Option>
                      <Option value="공정불량">공정불량</Option>
                      <Option value="FDC이상">FDC이상</Option>
                      <Option value="P/T Out">P/T Out</Option>
                      <Option value="CD Out">CD Out</Option>
                      <Option value="THK Out">THK Out</Option>
                      <Option value="장비 Err">장비 Err</Option>
                      <Option value="Leak">Leak</Option>
                      <Option value="W/F 깨짐">W/F 깨짐</Option>
                      <Option value="장비개조">장비개조</Option>
                      <Option value="기타">기타</Option>
                    </Select>
                  </td>
                  <th style={{ width: 100 }} >당사작업시간</th>
                  <td className="worktime" style={{ width: 205 }}>
                    <Select
                      defaultValue="선택하세요"
                      style={{ width: 205 }}
                  //  onChange={this.handleSdptChange}
                    >
                      <Option value="당사작업있음">당사작업있음</Option>
                      <Option value="당사작업없음">당사작업없음</Option>
                    </Select>
                  </td>
                  <td hidden={shouldHide} colSpan="4">
                    <div style={{ float: 'left', paddingTop: '3px' }}> 시작 </div>
                    <div style={{ width: 120, float: 'left' }} >
                      <Input placeholder={headerWorktimeStart} />
                    </div>
                    <div style={{ float: 'left', paddingTop: '3px' }}> ~ 완료 </div>
                    <div style={{ width: 120, float: 'left' }} >
                      <Input placeholder={headerWorktimeEnd} />
                    </div>
                    <div style={{ float: 'left', paddingTop: '3px' }}> {headerSumtime === undefined ? '소계 0MIN' : headerSumtime} </div>
                  </td>
                </tr>
                <div style={{ visibility: 'hidden' }}>
                  <Input placeholder={equnrT} />
                </div>
                <div style={{ visibility: 'hidden' }}>
                  <Input placeholder={ivArbplT} />
                </div>
              </tbody>
            </table>
          </div>
        </div>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="자사용" key="1">
            <div style={{ padding: 5, textAlign: 'right' }}>
              <BtnSearchDkGray
                onClick={this.handleExcel}
              >
                <img style={{ marginRight: '5px', marginBottom: '4px', width: '30%' }} src={excelImg} alt="excel" />
          엑셀
              </BtnSearchDkGray>
            </div>
            <div>
              <GridOwnComp
                ownCompGrid={ownCompGrid}
                isExcelDownload={isExcelDownload}
                test111={test111}
                // editable={true}
                defaultColDef1={ttt}
              />
            </div>
          </TabPane>
          <TabPane tab="도급사용" key="2">
            <div style={{ padding: 5, textAlign: 'right' }}>
              <BtnSearchDkGray
                onClick={this.handleExcel}
              >
                <img style={{ marginRight: '5px', marginBottom: '4px', width: '30%' }} src={excelImg} alt="excel" />
          엑셀
              </BtnSearchDkGray>
            </div>
            <div>
              <GridContractor
                contractorGrid={contractorGrid}
                isExcelDownload={isExcelDownload}
              />
            </div>
          </TabPane>
        </Tabs>

        {/* <div>
          <BtnSearchDkGray
            onClick={this.fncSave('save', 'ownCompGrid')}
          >
            클릭
           </BtnSearchDkGray>
        </div> */}
      </div>
    );
  }
}

PmSheetDetailPMCardPopup.propTypes = {
  ownCompGrid: PropTypes.array,
  contractorGrid: PropTypes.array,
  result: PropTypes.array,
  handleLoadingGridParam: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};


PmSheetDetailPMCardPopup.defaultProps = {
  ownCompGrid: [],
  contractorGrid: [],
  result: [],
};

const mapStateToProps = createStructuredSelector({
  ownCompGrid: selectors.makeOwnCompGrid(),
  contractorGrid: selectors.makeContractorGrid(),
  result: selectors.makeResult(),
});

export function mapDispatchToProps(dispatch) {
  return {
    fncSearchList: param => dispatch(actions.fncSearchList(param)),
    handleLoadingGridParam: param => dispatch(actions.loadingGridParam(param)),
  };
}

const withReducer = injectReducer({ key: 'PmSheetDetailPMCardPopup', reducer });
const withSaga = injectSaga({ key: 'PmSheetDetailPMCardPopup', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PmSheetDetailPMCardPopup);
