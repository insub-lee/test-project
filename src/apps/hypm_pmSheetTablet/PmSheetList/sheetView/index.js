import React from 'react';
import PropTypes from 'prop-types';
// import Scrollbars from 'react-custom-scrollbars';
import { connect } from 'react-redux';
// 이정호 개발중
import { Input, Modal, Button, Radio, Checkbox } from 'antd';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as selectors from '../selectors';
import * as actions from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import _ from 'lodash';
import GuideTest from '../guideTest';
import TimerRenderer from '../../cellRenderer/TimerRenderer';
import Collaborator from './collaborator/index';
import SendComplete from './sendComplete/index';
import Notice from './notice/index';
// 이정호 개발 중
import * as feed from 'components/Feedback/functions';
import MessageContent from 'components/Feedback/message.style2';
import message from 'components/Feedback/message';
import Axios from 'axios';
import DelayCausePopup from '../../Popup/DelayCausePopup';
import moment from 'moment';

import HeaderView from '../../view/headerView';
import HypmList from './hypmlist/index';
import IncTimmer from './IncTimmer.js'

import '../../assets/styles/pmTabletDetail.css';
import StylePmTablet from '../../assets/styles/stylePmTabletDetail.js';

const leftPad = (width, n) => {
  if ((n + '').length > width) {
      return n;
  }
  const padding = new Array(width).join('0');
  return (padding + n).slice(-width);
};

const RadioGroup = Radio.Group;

// 이정호 개발중
const btnWidth = '750';  // 버튼 div 사이즈
let btnSize = 0; // 버튼 사이즈
let inputItContent = []; // 히스토리 Array
let inputData = ''; // 버튼 선택값
let inputCode = ''; // 버튼 선택 코드
let inputDecision = ''; // inputValue 체크 A,R
let cbValue = ''; // 99999 예외처리
let jhNum = 0; // jsonHistory;
let operStartDt = ''; // oper 시작시간
let itemStartDt = ''; // item 시작시간
let inputStarDt = ''; // 입력 시작시간
let vInspchar = ' ';
let vInspopgr = '';
let vWerks = '';
let vZgroup = '';
let vOper = '';
let vOperT = '';
const ZVAL = 'ZVAL';
const ZEVAL = 'ZEVAL';
const ZCODE = 'ZCODE';

class SheetView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: true,
      start: false,
      num: 0,
      visible: true,
      min: 0,
      sec: 0,
      renderType: /*this.props.detailData.list.ReasonData.REASON === '' ? 'PmList' : 'Collaborator',*/ 'PmList',
      collaboratorList: [],
      isOpen: true,
      isDelay: false,
      indata: '',
      dataList: [],

      // 이정호 개발중
      inputValue: '',
      test:'',
      desc: '',
      operNum: 0,
      // tabletBtnChk: true, // 키패드 버튼 비활성화
      inputChk: true,  // 다음단계 버튼 비활성화
      rdCk: false, // 라디오버튼 선택시 Input 비활성화
      cbChk: false, // 체크박스 비활성화
      pValue: '', // 이전값
      updateChk: 1,

      viewWide: false, // true일시 전체화면

      codeName: '',
      corpName: '',

      // css
      modal1Visible: false,
      modal2Visible: false,
      modal3Visible: true,
      modal4Visible: false,
      value: 1,

      infoView: true,
      sideView: false,
    };
    this.timmers = {};

    // 이정호 개발중
    vOper = this.props.detailData.list.ET_OPERATION[0].OPER;
    vOperT = this.props.detailData.list.ET_OPERATION[0].OPER_T;
  }

  onClick = () => {
    this.setState({ view: !this.state.view });
  }

  
  onClickTitle = () => {

  }

  onClickTable = (data) => {

    console.log('ONCLICK TABLE', data);
    const timmer = this.timmers[`${data.INSPOPER}-${data.INSPCHAR}`];
    if (timmer.isStart === true ) {
      timmer.stop.call(timmer.incTimmer);
      timmer.isStart = false;
    } else {
      timmer.start.call(timmer.incTimmer);
      timmer.isStart = true;
    }

    let jsonData = new Object();
    jsonData.INSP_LOT = this.props.detailData.list.ES_INFO[0].INSPLOT; // pmSheet 번호
    const indateList = [];
    indateList.push(jsonData.INSP_LOT);
    indateList.push(data.INSPOPER);
    indateList.push(data.INSPCHAR);
    console.log('테스트date입니다 입니다 @@@@@@@ ', indateList);
    let subindata =  data.INSPOPER.substring(2);
    console.log( '아이디엑스 ~~~ ', data);
    this.setState({
      isDelay: true, // 지연사유 모달 
      indata: subindata, // 지연사유 배열 키값 
      dataList : indateList, // 지연사유 데이터값 
      
      imgdesc : data.DESC, // 가이드테스트 desc 
    });
  }

  // 이정호 개발중
  onStart = () => {
    this.setState({ start: true, visible: false });

    this.pmSheetInputDataUpdate('operStart','P','S'); // OPER 시작 (업데이트)
  }


  // 이정호 개발중
  handleInputChange = (e) => {

    this.setState({
      test: e.target.value,
      inputValue: e.target.value,
      // tabletBtnChk: false,
    });
    if (e.target.value === '') {
      this.setState({
        inputChk: true,
      });
    }


  }

  // 이정호 개발중
  handleCBChange = (e) => {


    // const todoValue = e.target.value;

    if (e.target.checked) {

      inputDecision = 'A';
      cbValue = '99999';

      this.setState({
        rdCk: true,
        inputChk: false,
        cbChk: e.target.checked,
        test: 'Not available',

      });

      this.jsonHistoryMake();

      this.pmSheetInputDataUpdate('inputStart','P', 'I');

    } else {

      cbValue = '';

      this.setState({
        rdCk: false,
        inputChk: true,
        test:'',
        inputValue: '',
        cbChk: e.target.checked,
      });
    }


  }

  // 이정호 개발중
  onClickCode = (vCode) => {

    message.success(
      <MessageContent>
        입력완료
      </MessageContent>,
      1,
    );

    inputDecision = vCode.DECISION;
    inputData = vCode.DESC;
    inputCode = vCode.CODE;

    this.setState({
      inputChk: false,
      pValue: vCode.DESC,
    });

    this.jsonHistoryMake();

    this.pmSheetInputDataUpdate('inputStart','P', 'I');

  }

  // 이정호 개발중 - 모바일 패드 엔터값 입력시
  onKeyDownEvent = (e, data) => {
    if (e.keyCode === 13) {
      this.inputDataCheck(data);
    }

  }

  // 이정호 개발중
  handleDescChange = (e) => {
    this.setState({
      desc: e.target.value,
    });
  }






 
  // 이정호 개발중
  onDraw = (idx) => {

    const num = idx ? idx : 0;


    const oper = this.props.detailData.list.ET_OPERATION[this.state.operNum].OPER;
    const operT = this.props.detailData.list.ET_OPERATION[this.state.operNum].OPER_T;


    const list = _.filter(this.props.detailData.list.ET_RESULT, ['INSPOPER', oper])[idx === undefined ? this.state.num : idx];
    const dataLength = _.filter(this.props.detailData.list.ET_RESULT, ['INSPOPER', oper]).length - 1;

    const selectResult = this.props.detailData.list.ET_SELECT;


    if (num <= dataLength && list !== undefined) {
      
      if (list.STEUERKZ_R === 'PI05' || list.STEUERKZ_R === 'PI07') {
        if (this.state.updateChk === 1) {
          vInspchar = list.INSPCHAR;
          vWerks = list.WERKS;
          vZgroup = list.ZGROUP;
          this.jsonHistoryInit();
          this.pmSheetInputDataUpdate('itemStart','P', 'S');
          this.setState({
            updateChk: 2,
          })
        }
        return (
          <section className="status-area">
              <div className="left item">
                <h3>{list.MIC_T}</h3>
                <p>
                  {list.SPEC}
                  {this.state.pValue !== '' ? `(이전값: ${this.state.pValue})` : false}
                </p>
              </div>
            <div className="center item">
              <div className="input-area">
                <span className="input-text">
                  <Input
                    type="text"
                    className="input-text"
                    placeholder="텍스트입력"
                    value={this.state.test}
                    onChange={this.handleInputChange}
                    onKeyDown={(e) => this.onKeyDownEvent(e, list)}
                  />
                </span>
              </div>
            </div>
            <div className="right item">
              {this.state.num < dataLength ?
                <Button
                  className="btn-step"
                  onClick={() => this.nextLevel()}
                  disabled={this.state.inputChk}
                >
                  다음단계
              </Button>
                :
                <Button
                  className="btn-step"
                  onClick={() => this.nextLevel()}
                  disabled={this.state.inputChk}
                >
                  {oper.slice(2, 4)}.절차완료
            </Button>
              }
            </div>
          </section>
          // <div className="buttonArea" style={{ padding: '25px', border: '1px solid black' }}>
          //   <table style={{ border: '1px', }}>
          //     <tr>
          //       <td style={{ width: '350px' }}>{list.MIC_T}</td>
          //       <td rowSpan='2' style={{ width: '750px' }}>
          //         <Input placeholder="입력하세요."
          //           value={this.state.test}
          //           style={{ width: 550 }}
          //           onChange={this.handleInputChange}
          //           onKeyDown={(e) => this.onKeyDownEvent(e, list, 'P')} />
          //       </td>
          //       <td rowSpan='2' style={{ width: '350px' }}>
          //         <Button type='primary' onClick={() => this.nextLevel(list, 'C')} disabled={this.state.inputChk} >다음단계</Button>
          //       </td>
          //     </tr>
          //     <td style={{ width: '350px' }}>
          //       {list.SPEC}
          //       {this.state.pValue !== '' ? `(이전값: ${this.state.pValue})` : false}
          //     </td>
          //   </table>
          // </div>
        )
      } else if (list.STEUERKZ_R === 'PI04') {
        if (this.state.updateChk === 1) {
          vInspchar = list.INSPCHAR;
          vWerks = list.WERKS;
          vZgroup = list.ZGROUP;
          this.jsonHistoryInit();
          this.pmSheetInputDataUpdate('itemStart','P', 'S');
          this.setState({
            updateChk: 2,
          })
        }
        const idx = selectResult.findIndex(p => p.INSPCHAR === list.INSPCHAR && p.INSPOPER === list.INSPOPER);
        const codeList = [];
        for (let i = 0; i < selectResult.length; i += 1) {
          if (selectResult[i].INSPCHAR === list.INSPCHAR && selectResult[i].INSPOPER === list.INSPOPER) {
            codeList.push(selectResult[i]);
          }
        }

        const renderButtons = () => {
          let jsx = '';

          jsx = codeList.map((b) => {
            return (
              <div style={{ float: 'left', width: '150px' }} >
                <Radio.Button
                  style={{ width: '150px' }}
                  onClick={() => this.onClickCode(b)}
                  value={b.DESC}
                // onClick={this.aaa}
                >
                  {b.DESC}
                </Radio.Button>
                {btnSize < btnWidth ? <br /> : false}
              </div>
            );
          });
          btnSize += 150;
          return jsx;

        }

        return (
          <div className="buttonArea" style={{ padding: '25px', border: '1px solid black' }}>
            <table>
              <tr>
                <td style={{ width: '350px' }}>{list.MIC_T}</td>
                <td rowSpan='2' style={{ width: '750px' }}>
                  <Radio.Group
                    value={this.state.desc}
                    onChange={this.handleDescChange} >
                    {renderButtons()}
                  </Radio.Group>
                </td>
                <td rowSpan='2' style={{ width: '150px' }}>
                { this.state.num < dataLength ? 
                  <Button type='primary' onClick={() => this.nextLevel()} disabled={this.state.inputChk} >다음단계</Button>
                  :
                  <Button type='primary' onClick={() => this.nextOper()} disabled={this.state.inputChk}>{oper.slice(2, 4)}.절차 완료</Button>

                }
               </td>
              </tr>
              <td style={{ width: '350px' }}>
                {list.SPEC}
                {this.state.pValue !== '' ? `(이전값: ${this.state.pValue})` : false}
              </td>
            </table>
          </div>
        )
      } else {
        if (this.state.updateChk === 1) {
          vInspchar = list.INSPCHAR;
          vWerks = list.WERKS;
          vZgroup = list.ZGROUP;
          this.jsonHistoryInit();
          this.pmSheetInputDataUpdate('itemStart','P', 'S');
          this.setState({
            updateChk: 2,
          })
        }
        return (
          <div className="buttonArea" style={{ padding: '25px', border: '1px solid black' }}>
            <table>
              <tr>
                <td style={{ width: '350px' }}>{list.MIC_T}</td>
                <td rowSpan='2' style={{ width: '750px' }}>
                  {list.LOWER !== '' ? `${list.LOWER} ≤ ` : false}
                <Input style={{ width: '150px' }}
                    onChange={this.handleInputChange}
                    placeholder={list.TARGET}
                    value={this.state.test}
                    disabled={this.state.rdCk}
                    onKeyDown={(e) => this.onKeyDownEvent(e, list, 'P')}
                  />
                  {list.UPPER !== '' ? ` ≤ ${list.UPPER} ` : false}{list.UNIT}
                <Checkbox value={99999} onChange={(e) => this.handleCBChange(e, list, 'P')} checked={this.state.cbChk}>99999 처리</Checkbox>
                </td>
                <td rowSpan='2' style={{ width: '350px' }}>
                { this.state.num < dataLength ? 
                  <Button type='primary' onClick={() => this.nextLevel()} disabled={this.state.inputChk} >다음단계</Button>
                  :
                  <Button type='primary' onClick={() => this.nextOper()} disabled={this.state.inputChk}>{oper.slice(2, 4)}.절차 완료</Button>

                }
                </td>
              </tr>
              <td style={{ width: '350px' }}>
                {list.SPEC}({list.UNIT})
                {this.state.pValue !== '' ? `(이전값: ${this.state.pValue})` : false}
              </td>
            </table>
          </div>
        )
      }
    } else {
      return (
        <div className="buttonArea" style={{ padding: '25px', border: '1px solid black' }}>
          <tr>
            <td style={{ width: '350px' }}>{operT}</td>
            <td rowSpan='2' style={{ width: '150px' }}>
              <Button type='primary' onClick={() => this.nextOper()}>{oper.slice(2, 4)}.절차 완료</Button></td>
          </tr>
          <td style={{ width: '350px' }}>
            소요시간
          </td>
        </div>
      )
    }

  }


  // 이정호 개발중 - 키패드 선택시
  inputDataCheck = (data) => {

    const {
      inputValue,
    } = this.state;

    this.setState({
      pValue: inputValue,
    });

    if (data.STEUERKZ_R === 'PI01' || data.STEUERKZ_R === 'PI06') {
      if (!isNaN(inputValue) && inputValue !== ''.trim()) {
        if (Number(data.LOWER) <= Number(inputValue) && Number(data.UPPER) >= Number(inputValue)) {

          this.onSuccess();

        } else {

          this.onFalse('상/하한 한도를 벗어나는 값을 입력하였습니다.\n 다시 확인 후 입력해주세요.');

          return;
        }
      } else {

        this.onFalse('숫자를 입력해주세요.');

        return;
      }
    }

    if (data.STEUERKZ_R === 'PI02') {
      if (!isNaN(inputValue) && inputValue !== ''.trim()) {
        if (Number(data.LOWER) <= Number(inputValue)) {
          this.onSuccess();
        } else {

          this.onFalse('하한 한도를 벗어나는 값을 입력하였습니다.\n 다시 확인 후 입력해주세요.');

          return;
        }
      } else {

        this.onFalse('숫자를 입력해주세요.');

        return;
      }
    }

    if (data.STEUERKZ_R === 'PI03') {
      if (!isNaN(inputValue) && inputValue !== ''.trim()) {
        if (Number(data.UPPER) >= Number(inputValue)) {

          this.onSuccess();
        } else {

          this.onFalse('상한 한도를 벗어나는 값을 입력하였습니다.\n 다시 확인 후 입력해주세요.');

          return;
        }
      } else {

        this.onFalse('숫자를 입력해주세요.');

        return;
      }
    }

    if (data.STEUERKZ_R === 'PI05' || data.STEUERKZ_R === 'PI07') {
      if (inputValue.trim() !== '') {


        this.onSuccess();
      } else {

        this.onFalse('입력해주세요.');

        return;
      }
    }

  }


  // 이정호 개발중
  nextOper = () => {


    this.pmSheetInputDataUpdate('itemEnd','C', 'N');
    this.pmSheetInputDataUpdate('operEnd','C','F');

    const operidx = this.state.operNum + 1;

    const operationLength = this.props.detailData.list.ET_OPERATION.length - 1;

    const alnzu = this.props.detailData.list.ET_OPERATION[operidx].ALNZU;


    if (operidx <= operationLength && alnzu === 'B') {
    this.setState({
      start: false,
      visible: true,
      operNum: operidx,
      num: 0,
      // 수정
      inputValue: '',
      test: '',
      desc: '',
      inputChk: true,
      rdCk: false,
      cbChk: false,
      pValue: '',
      updateChk: 1,
    });

    // 수정
    vOper = this.props.detailData.list.ET_OPERATION[operidx].OPER;
    vOperT = this.props.detailData.list.ET_OPERATION[operidx].OPER_T;
    inputData = '';
    inputCode = '';
    inputDecision = '';
    inputItContent = [];
    cbValue = '';
    jhNum = 0;
    operStartDt = '';
    itemStartDt = '';
    inputStarDt = '';
    vInspchar = ' ';

  } else {
    feed.success('작업완료');
  }


  }

  // 이정호 개발중
  nextLevel = () => {

    this.pmSheetInputDataUpdate('itemEnd','C', 'N');

    const idx = this.state.num + 1;
    this.setState({
      num: idx,
      inputValue: '',
      test: '',
      desc: '',
      inputChk: true,
      rdCk: false,
      cbChk: false,
      pValue: '',
      updateChk: 1,
    });

    inputData = '';
    inputCode = '';
    inputDecision = '';
    inputItContent = [];
    cbValue = '';
    jhNum = 0;
    itemStartDt = '';
    inputStarDt = '';


    this.onDraw(idx);
  }


  // 이정호 개발 중 - 입력값에 따른 Update
  pmSheetInputDataUpdate = (step,status, jobFlag) => {

    let jsonData = new Object();

    if( step === 'operStart') {
      operStartDt = moment().format('YYYYMMDDHHmmss');
     
     
      jsonData.START_DT = operStartDt;
      jsonData.INSPOPER = vOper; // Operation 코드
      jsonData.INSPCHAR = ' ' // CheckItem 코드

      jsonData.IT_CONTENT = ' '; // 입력값 이력


    } else if ( step === 'itemStart'){
      itemStartDt = moment().format('YYYYMMDDHHmmss');
      jsonData.START_DT = itemStartDt;
      jsonData.INSPOPER = vOper; // Operation 코드
      jsonData.INSPCHAR = vInspchar // CheckItem 코드
      jsonData.IT_CONTENT = JSON.stringify(inputItContent); // 입력값 이력


    } else if ( step === 'inputStart' ){
      inputStarDt = moment().format('YYYYMMDDHHmmss');
      jsonData.START_DT = inputStarDt;
      jsonData.INSPOPER = vOper; // Operation 코드
      jsonData.INSPCHAR = vInspchar // CheckItem 코드
      jsonData.IT_CONTENT = JSON.stringify(inputItContent); // 입력값 이력


    } else if ( step === 'operEnd') {
      jsonData.START_DT = operStartDt;
      jsonData.END_DT = moment().format('YYYYMMDDHHmmss');; // 작업종료시간
      jsonData.INSPOPER = vOper; // Operation 코드
      jsonData.INSPCHAR = ' ' // CheckItem 코드
      jsonData.IT_CONTENT = ' '; // 입력값 이력



    } else if ( step === 'itemEnd') {
      jsonData.START_DT = itemStartDt;
      jsonData.END_DT = moment().format('YYYYMMDDHHmmss');; // 작업종료시간
      jsonData.INSPOPER = vOper; // Operation 코드
      jsonData.INSPCHAR = vInspchar // CheckItem 코드
      jsonData.IT_CONTENT = JSON.stringify(inputItContent); // 입력값 이력


    } 
    
    jsonData.INSP_LOT = this.props.detailData.list.ES_INFO[0].INSPLOT; // pmSheet 번호        
    
    jsonData.INSPOPGR = vInspopgr // 공동작업자 그룹코드
    jsonData.CO_WORKER = this.props.detailData.list.ReasonData.HY_WORKER; // 공동작업자

    jsonData.INP_HIST = ' '; // 입력값 이력(오류값도 포함함)
    jsonData.INP_STATUS = status; // 상태
    jsonData.JOB_FLAG = jobFlag;
    jsonData.REMARK = ' ';

    // jsonData.INSPOPER = vOper; // Operation 코드
    // jsonData.INSPCHAR = vInspchar // CheckItem 코드
    // jsonData.INSPOPGR = vInspopgr // 공동작업자 그룹코드
    // jsonData.END_DT = moment().format('YYYYMMDDHHmmss');; // 작업종료시간
    // jsonData.CO_WORKER = this.props.detailData.list.ReasonData.HY_WORKER; // 공동작업자
    // jsonData.IT_CONTENT = JSON.stringify(inputItContent); // 입력값 이력
    // jsonData.INP_HIST = ' '; // 입력값 이력(오류값도 포함함)
    // jsonData.INP_STATUS = status; // 상태
    // jsonData.JOB_FLAG = jobFlag;
    // jsonData.REMARK = ' ';


    if (vZgroup === ''){
      jsonData.ZGROUP = ' ';
    } else {
      jsonData.ZGROUP = vZgroup;
    }

    if (vWerks === ''){
      jsonData.WERKS = ' ';
    } else {
      jsonData.WERKS = vWerks;
    }


    console.log('checkItem update', jsonData);
    

    Axios.post('/api/gipms/v1/pmsheet/pmSheetItemUpdate', jsonData)
      .then((result) => {
        // feed.success('저장 완료');
      })
      .catch((res) => {
        console.log(res);
        feed.error('업데이트 저장 실패');
      });
  }


  // 이정호 개발 중
  onSuccess = () => {

    message.success(
      <MessageContent>
        입력완료
      </MessageContent>,
      1,
    );


    inputDecision = 'A';

    this.setState({
      inputChk: false,
    });

    this.jsonHistoryMake();

    this.pmSheetInputDataUpdate('inputStart','P', 'I')

  }

  // 이정호 개발 중
  onFalse = (errorMessage) => {
    message.error(
      <MessageContent>
        {errorMessage}
      </MessageContent>,
      2,
    );

    inputDecision = 'R';

    this.jsonHistoryMake();

    this.pmSheetInputDataUpdate('inputStart','P','I');

    this.setState({
      test: '',
    });

  }

  // 이정호 개발중
  jsonHistoryInit = () => {

    for (let i = 1; i < 11; i += 1) {
      let jsonHistory = {};
    
      jsonHistory[ZVAL + i]= '';
      jsonHistory[ZEVAL + i]= '';
      jsonHistory[ZCODE + i]= '';

      inputItContent.push(jsonHistory);
    }

  }
  
  
  // 이정호 개발 중
  jsonHistoryMake = () => {


    if (jhNum < 10) {

      if (cbValue === '99999') {
        inputItContent[jhNum][ZVAL + (jhNum + 1)] = cbValue;
      } else if (inputData !== '') {
        inputItContent[jhNum][ZVAL + (jhNum + 1)] = inputData;
      } else {
        inputItContent[jhNum][ZVAL + (jhNum + 1)] = this.state.inputValue
      }

      inputItContent[jhNum][ZEVAL + (jhNum + 1)] = inputDecision;
      inputItContent[jhNum][ZCODE + (jhNum + 1)] = inputCode;

    } else {


      for (let i = 0; i < 10; i += 1) {

        if (i < 9) {

          inputItContent[i][ZVAL + (i + 1)] = inputItContent[i + 1][ZVAL + (i + 2)];

        } else if (i === 9) {

          if (cbValue === '99999') {
            inputItContent[i][ZVAL + (i + 1)] = cbValue;
          } else if (inputData !== '') {
            inputItContent[i][ZVAL + (i + 1)] = inputData;
          } else {
            inputItContent[i][ZVAL + (i + 1)] = this.state.inputValue
          }

          inputItContent[i][ZEVAL + (i + 1)] = inputDecision;
          inputItContent[i][ZCODE + (i + 1)] = inputCode;

        }

      }

    }

    jhNum = jhNum + 1;

  }

  handleOk = () => {
    this.setState({
      isDelay: false,
      indata: '',
    });
  }
  onClose() {
    this.setState({ visible: false });
  }

  onBack = () => {
    this.props.history.push({
      pathname: '/sm/pmSheetTablet'
    });
  }

  onCheckAllTime = (time) => {
    console.log(time);
    const hour = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString();
    const min = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)).toString();
    const sec = Math.floor((time % (1000 * 60)) / 1000).toString();

    this.setState({ hour: hour, min: min, sec: sec });
  }

  handleRenderSet = (type) => {
    this.setState({ renderType: type, isOpen: true, });
  }

  // 선택한 작업자
  handleCollaboratorList = (list) => {
    this.setState({ collaboratorList: list, code: true });
  }

  handleToggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleSelectedCode = (codeName, corpName) => {
    this.setState({ codeName: codeName, corpName: corpName });
  }

  handleChangeView = () => {
    this.setState({ viewWide: !this.state.viewWide });
  }
  handleConstruct = (data) => {
    console.log('TIMMER START', data);
    this.timmers[`${data.data.INSPOPER}-${data.data.INSPCHAR}`] = data;
  }

  handleJobStart = (data) => {
    console.log('TIMMER START', data);
  }

  handleJobStop = (data) => {
    console.log('TIMMER STOP', data);
  }

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  setModal3Visible(modal3Visible) {
    this.setState({ modal3Visible });
  }

  setModal4Visible(modal4Visible) {
    this.setState({ modal4Visible });
  }
  
  handleOnClickInfo = () => {
    this.setState({ infoView: !this.state.infoView });
  }

  handleOnClickSideBtn = () => {
    this.setState({ sideView: !this.state.sideView });
  }

  render() {
    // appListMap = _.groupBy(resultData, 'INSPOPER_T');
    // console.log(this.props.detailData.list);
    const userDefine = this.props.userDefine[0];
    const empNo = userDefine.EMP_NUM;
    const empName = userDefine.EMP_NAM;
    const roleDetail = userDefine.ROLE_DETAIL; // 910 도급 그외 자사
    const hyPmState = this.props.location.state;
    const doOperation = [];
    const detailData = this.props.detailData;
    const resultData = this.props.detailData.list.ET_RESULT;
    const operationData = this.props.detailData.list.ET_OPERATION;

    for (let i = 0; i < operationData.length; i += 1) {
      const idx = operationData[i].ALNZU === 'B';
      if (idx === true) {
        doOperation.push(operationData[i]);
      }
    }

    const sheetList = [];
    doOperation.map((o) => {
      const result = resultData.filter(r => r.INSPOPER_T === o.OPER_T);
      return sheetList.push(result);
    });

    const goPmCode = () => {
      if (detailData.list.ReasonData.HY_WORKER.length > 0) {
        this.setState({ code: true });
      } else {
        this.setState({ renderType: 'Collaborator' });
      }
      // this.setState({ code: true });
    }

    const selectComp = () => {
      this.setState({ code: true });
    }

    const renderSumTime = () => {
      return (
        <div style={{ textAlign: 'center' }} >
          <span>{leftPad(2, this.state.hour)}:</span>
          <span>{leftPad(2, this.state.min)}:</span>
          <span>{leftPad(2, this.state.sec)}</span>
        </div>
      )
    }

    const RenderSettingView = () => {
      let jsx = '';
      jsx = doOperation.map((list, i) => {
        return (
          <div>
            <tr className="level-1">
              <td>
                <button
                  style={{ marginRight: 5, background: 'transparent', }}
                  onClick={() => this.onClickTitle()}
                >▼</button>
                {list.OPER.slice(2, 4)}. {list.OPER_T}
              </td>
              <td>0/{list.ANZZL}</td>
              <td>{list.ARBEI2} {list.ARBEH}</td>
              <td>{renderSumTime}</td>
            </tr>
            {sheetList[i].map((data, idx) =>
            <tr className="level-2 default guide-required-no">
              <td
                onClick= {() => {this.onClickTable(data)}}
              >
                {data.MIC_T}
              </td>
              <td />
              <td />
                <td>
                <IncTimmer
                  handleConstruct={this.handleConstruct}
                  handleJobStart={this.handleJobStart}
                  handleJobStop={this.handleJobStop}
                  data={data}
                />
              </td>
            </tr>
            )}
          </div>
          // <tbody>
          //   <tr>
          //     <td
          //       style={{ fontWeight: 'bold', fontSize: 15 }}
          //     >
          //       <button
          //         style={{ marginRight: 5, background: 'transparent', }}
          //         onClick={() => this.onClickTitle()}
          //       >▼</button>
          //       {list.OPER.slice(2, 4)}. {list.OPER_T}
          //     </td>
          //     <td style={{ textAlign: 'center', display: 'inline-block', width: '120px' }}>0/{list.ANZZL}</td>
          //     <td style={{ display: 'inline-block', width: '77px' }}>{list.ARBEI2} {list.ARBEH}</td>
          //     <td style={{ textAlign: 'center' }}>{renderSumTime}</td>
          //   </tr>
          //   {sheetList[i].map((data, idx) =>
          //   <tr>
          //     <td
          //       onClick= {() => {this.onClickTable(data)}}
          //       style={{ padding: '3px 3px 3px 25px' }}
          //       className={idx + 1}>{data.MIC_T}
          //     </td>
          //     <td />
          //     <td />
          //       <td>
          //       <IncTimmer
          //         handleConstruct={this.handleConstruct}
          //         handleJobStart={this.handleJobStart}
          //         handleJobStop={this.handleJobStop}
          //         data={data}
          //       />
          //     </td>
          //   </tr>
          //   )}
          //   <div>
          //     <Modal
          //       visible={isDelay}
          //       onOk={this.handleOk}
          //       footer={null}
          //     >
          //       {<DelayCausePopup indata={indata} dataList={dataList} onOk={this.handleOk} />}
          //     </Modal>
          //   </div>
          // </tbody>
        );
      });
      return jsx;
    };

    const RenderSettingView2 = () => {
      let jsx = '';
      jsx = doOperation.map((list, i) => {
        return (
          <tbody>
            <tr className="level-1">
              <td>
                <button
                  style={{ marginRight: 5, background: 'transparent', }}
                  onClick={() => this.onClickTitle()}
                >▼</button>
                {list.OPER.slice(2, 4)}. {list.OPER_T}
              </td>
              <td>●</td>
              <td>{list.ARBEI2} {list.ARBEH}</td>
              <td>-</td>
            </tr>
            {sheetList[i].map((data, idx) =>
            <tr className="level-2 default guide-required-no">
              <td
                onClick= {() => {this.onClickTable(data)}}
              >
                {data.MIC_T}
              </td>
              <td />
              <td>
                <IncTimmer
                  handleConstruct={this.handleConstruct}
                  handleJobStart={this.handleJobStart}
                  handleJobStop={this.handleJobStop}
                  data={data}
                />
              </td>
              <td style={{ textAlign: 'right', width: '90px' }}>미진행</td>
              <td />
              <td />
            </tr>
            )}
          </tbody>          
          // <tbody>
          //   <tr>
          //     <td
          //       style={{ fontWeight: 'bold', fontSize: 15 }}
          //     >
          //       <button
          //         style={{ marginRight: 5, background: 'transparent', }}
          //         onClick={() => this.onClickTitle()}
          //       >▼</button>
          //       {list.OPER.slice(2, 4)}. {list.OPER_T}
          //     </td>
          //     <td style={{ textAlign: 'center', display: 'inline-block', width: '140px' }}>●</td>
          //     <td style={{ display: 'inline-block', width: '77px' }}>{list.ARBEI2} {list.ARBEH}</td>
          //     <td style={{ textAlign: 'center' }}>-</td>
          //   </tr>
          //   {sheetList[i].map((data, idx) =>
          //   <tr>
          //     <td
          //       onClick= {() => {this.onClickTable(data)}}
          //       style={{ padding: '3px 3px 3px 25px' }}
          //       className={idx + 1}>{data.MIC_T}
          //     </td>
          //     <td />
          //     <td>
          //       <IncTimmer
          //         handleConstruct={this.handleConstruct}
          //         handleJobStart={this.handleJobStart}
          //         handleJobStop={this.handleJobStop}
          //         data={data}
          //       />
          //     </td>
          //     <td style={{ textAlign: 'right', width: '90px' }}>미진행</td>
          //     <td />
          //     <td />
          //   </tr>
          //   )}
          // </tbody>
        );
      });
      return jsx;
    };

    const RenderView = (type) => {
      switch (type) {
        case 'SendComplete': {// 저장/송부 후 Open
          return (
            <SendComplete 
              sheetList={sheetList}
              doOperation={doOperation}
              detailData={this.props.detailData}
              hyPmState={hyPmState}
              empNo={empNo}
              roleDetail={roleDetail}
              onBack={this.onBack}
              visible={this.state.isOpen}
              handleToggleOpen={this.handleToggleOpen}
            />
          );
        }
        case 'Notice': {// 공동작업자 입력 후 전달사항 입력
          return (
            <Notice
              inspLot={hyPmState}
              empNo={empNo}
              empName={empName}
              roleDetail={roleDetail}
              collaboratorList={this.state.collaboratorList}
              visible={this.state.isOpen}
              handleToggleOpen={this.handleToggleOpen}
            />
          );
        }
        case 'PmList': {
          return (
            <HypmList
            codeList={this.props.codePmList}
            sheetNum={this.props.detailData.list.ES_INFO[0].INSPLOT}
            handleSavePmCode={this.props.handleSavePmCode}
            handleSelectedCode= {this.handleSelectedCode}
            pmSheetSdptList={this.props.pmSheetSdptList}
            goPmCode={goPmCode}
            detailData={this.props.detailData}
            handleSaveCorp={this.props.handleSaveCorp}
            />
          )
        }
        case 'Collaborator': {// PM 입력 후 => 공동 작업자 Open. 입력 시점 필요(상무님 변경.2019-03-22)
          return (
            <Collaborator
              empNo={empNo}
              hyPmState={hyPmState}
              visible={this.state.isOpen}
              handleToggleOpen={this.handleToggleOpen}
              handleCollaboratorList={this.handleCollaboratorList}
              goPmCode={goPmCode}
              selectComp={selectComp}
            />
          )
        }
        default:
          return '';
      }
    };

    const codeName = this.props.codeName !== '' ? this.props.codeName : this.props.detailData.list.ReasonData.REASON;
    const corpName = this.props.corpName !== '' ? this.props.corpName : this.props.detailData.list.ReasonData.CORP;

    const sectionName = () => {
      let className = 'hypmTablet CO';
      className += this.state.infoView ? ' view-info ' : ' ';
      className += this.state.viewWide ? ' view-list ' : ' ';
      className += this.state.sideView ? ' expand-guide ' : ' ';
      return className;
    };

    return (
      <div>
        <StylePmTablet>
        <section className={sectionName()}>
        {/* <div> */}
          {RenderView(this.state.renderType)}
        {/* </div> */}
        <HeaderView
          onBack={this.onBack}
          hyPmState={hyPmState}
          detailData={detailData}
          handleRenderSet={this.handleRenderSet}
          history={this.props.history}
          collaboratorList={this.state.collaboratorList}
          roleDetail={roleDetail}
          empName={empName}
          codeName={this.state.codeName}
          informId={this.props.informId}
          handleOnClickInfo={this.handleOnClickInfo}
          handleChangeView={this.handleChangeView}
          corpName={this.state.corpName}
        />
        <main className="contents detail">
          <section className="sheet-info-area">
              {/* Sheet 정보 */}
              <ul>
                <li>
                  <span className="title">FAB</span>
                  <span className="descroption">{this.props.detailData.list.ES_INFO[0].BEBER_T}</span>
                </li>
                <li>
                  <span className="title">AREA</span>
                  <span className="descroption">{this.props.detailData.list.ES_INFO[0].STORT_T}</span>
                </li>
                <li>
                  <span className="title">TEAM</span>
                  <span className="descroption">{this.props.detailData.list.ES_INFO[0].TPLNR_T}</span>
                </li>
                <li>
                  <span className="title">도급사명</span>
                  <span className="descroption">{corpName !== ' ' ? corpName : this.props.detailData.list.ES_VEN_INFO[0].ZVEN_NAME}<button className="edit" onClick={() => this.setModal1Visible(true)}>수정</button></span>
                  {/* 도급사 선택 모달 */}
                  <Modal
                    title="도급사 선택"
                    width="296px"
                    wrapClassName="hypmTablet"
                    centered
                    closable={false}
                    visible={this.state.modal1Visible}
                    onOk={() => this.setModal1Visible(false)}
                    onCancel={() => this.setModal1Visible(false)}
                    footer={[
                      <Button className="btn-cancel" key="back" onClick={() => this.setModal1Visible(false)}>취소</Button>,
                      <Button disabled className="btn-confirm" key="submit" onClick={() => this.setModal1Visible(false)}>
                        확인
                      </Button>,
                    ]}
                  >
                    <div className="contractor-radio">
                      <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <Radio value={1}>삼구</Radio>
                        <Radio value={2}>SMC</Radio>
                        <Radio value={3}>발렉스</Radio>
                        <Radio value={4}>케이텍맨파워</Radio>
                      </RadioGroup>
                    </div>
                  </Modal>
                  {/* 모달 끝 */}
                </li>
                <li>
                  <span className="title">SDPT</span>
                  <span className="descroption">{this.props.detailData.list.ES_INFO[0].ARBPL_T}</span>
                </li>
                <li>
                  <span className="title">EQ Model</span>
                  <span className="descroption">{this.props.detailData.list.ES_INFO[0].EQART_T}</span>
                </li>
                <li>
                  <span className="title">EQ ID</span>
                  <span className="descroption">{this.props.detailData.list.ES_INFO[0].TIDNR}</span>
                </li>
                <li>
                  <span className="title">FAB</span>
                  <span className="descroption">M10/1fghfgh4</span>
                </li>
                <li>
                  <span className="title">비정기/재PM 사유</span>
                  <span className="descroption">{codeName !== ' ' ? codeName : this.props.detailData.list.ES_VEN_INFO[0].ZREPM_CAUZ}<button className="edit" onClick={() => this.setModal2Visible(true)}>수정</button></span>
                  {/* 비정기/재PM 사유 선택 모달 */}
                  <Modal
                    title="비정기/재PM 사유 선택"
                    width="296px"
                    wrapClassName="hypmTablet"
                    centered
                    closable={false}
                    visible={this.state.modal2Visible}
                    onOk={() => this.setModal2Visible(false)}
                    onCancel={() => this.setModal2Visible(false)}
                    footer={[
                      <Button className="btn-prev" key="back" onClick={() => this.setModal2Visible(false)}>이전</Button>,
                      <Button className="btn-cancel" key="back" onClick={() => this.setModal2Visible(false)}>취소</Button>,
                      <Button disabled className="btn-confirm" key="submit" onClick={() => this.setModal2Visible(false)}>
                        확인
                      </Button>,
                    ]}
                  >
                    <div className="contractor-radio">
                      <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <Radio value={1}>사유</Radio>
                        <Radio value={2}>사유</Radio>
                        <Radio value={3}>사유</Radio>
                        <Radio value={4}>사유</Radio>
                        <Radio value={5}>사유</Radio>
                        <Radio value={6}>사유</Radio>
                        <Radio value={7}>사유</Radio>
                        <Radio value={8}>사유</Radio>
                        <Radio value={9}>사유</Radio>
                        <Radio value={0}>사유</Radio>
                      </RadioGroup>
                    </div>
                  </Modal>
                  {/* 모달 끝 */}
                </li>
              </ul>
            </section>
        {/* {this.state.viewWide === false ? */}
          <section className="detail-section">
          {/* list */}
            <section className="pmSheet-list">
              <table>
                <thead>
                  <tr>
                    <th>점검항목</th>
                    <th>작업현황</th>
                    <th>목표시간</th>
                    <th>소요시간</th>
                  </tr>
                </thead>
                <tbody>
                {RenderSettingView()}
                </tbody>
                <Modal
                  visible={this.state.isDelay}
                  onOk={this.handleOk}
                  footer={null}
                >
                  {<DelayCausePopup indata={this.state.indata} dataList={this.state.dataList} onOk={this.handleOk} />}
                </Modal>
              </table>
            </section>
            <GuideTest
              imgdesc={this.state.imgdesc}
              handleOnClickSideBtn={this.handleOnClickSideBtn}
            />
          </section>
          {/* 
          <div className="wide">
          <section className="detail-section">
          
             <section className="pmSheet-list">
               <table>
                 <thead>
                   <tr>
                     <th>점검항목</th>
                     <th>가이드</th>
                     <th>목표 시간</th>
                     <th>소요 시간</th>
                     <th>작업 현황</th>
                     <th>최종값</th>
                     <th>이전값</th>
                     <th>작업자</th>
                   </tr>
                 </thead>
                 {RenderSettingView2()}
              </table>
            </section>
          </section>
          </div> */}
          {
          this.state.start === false && this.state.code === true ?
            <Modal
              visible={this.state.visible}
              footer={null}
              closable={false}
              width="1020px"
              style={{
                position: 'absolute',
                top: '1290px',
                padding: '0'
              }}
              bodyStyle={{ backgroundColor: 'black', color: 'white' }}
            >
            <p
              style={{
                display: 'inline-block'
              }}
            >
              {/* 이정호 수정 */}
              작업 시작 버튼을 눌러 {vOper.slice(2, 4)}.{vOperT} 시작합니다.
            </p>
            <button onClick={() => this.onStart()} style={{ float: 'right', color: 'black' }}>작업 시작</button>
            </Modal>
            :
            false
          }
          {this.state.start == true ?
            <footer>
              {this.onDraw()}
            </footer>
            :
            <footer />
          }
          </main>
        </section>
        </StylePmTablet>
      </div>
    );
  }
}

SheetView.defaultProps = {
  location: {},
  detailData: {},
};

SheetView.propTypes = {
  location: PropTypes.object,
  detailData: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  userDefine: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  detailData: selectors.detailData(),
  profile: selectors.makeSelectProfile(),
  codePmList: selectors.codePmList(),
  userDefine: selectors.userDefine(),
  informId: selectors.informId(),
  pmSheetSdptList: selectors.pmSheetSdptList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleSavePmCode: (value, num) => dispatch(actions.savePmCode(value, num)),
    handleSaveCorp: (value, num) => dispatch(actions.saveCorpList(value, num)),
  };
}

const withReducer = injectReducer({ key: 'sheettablet', reducer });
const withSaga = injectSaga({ key: 'sheettablet', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(SheetView);
