import React from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { Input, Modal, Button, Radio, Checkbox } from 'antd';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { EB } from 'utils/SockjsFunc';
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

import HeaderView from '../../view/headerView';
import HypmList from './hypmlist/index';

import IncTimmer from './IncTimmer.js'

const leftPad = (width, n) => {
  if ((n + '').length > width) {
      return n;
  }
  const padding = new Array(width).join('0');
  return (padding + n).slice(-width);
};

// 이정호 개발중
const btnWidth = '750';  // 버튼 div 사이즈
let btnSize = 0; // 버튼 사이즈

let inputHistory = []; // 히스토리 Array

class SheetView2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: true,
      start: false,
      num: 0,
      visible: true,
      min: 0,
      sec: 0,
      renderType: '',
      collaboratorList: [],
      isOpen: true,      

      // 이정호 개발중
      inputData: '',
      inputDecision: '',
      test:'',
      desc: '실시',
      operNum: 0,
      oper: this.props.detailData.list.ET_OPERATION[0].OPER,
      operT: this.props.detailData.list.ET_OPERATION[0].OPER_T,
      tabletBtnChk: true, // 키패드 버튼 비활성화
      inputChk: true,  // 다음단계 버튼 비활성화
      rdCk: false, // 라디오버튼 선택시 Input 비활성화
      cbChk: false, // 체크박스 비활성화
      pValue: '', // 이전값

      viewWide: false, // true일시 전체화면
    };
    this.timmers = {};
  }

  onClick = () => {
    this.setState({ view: !this.state.view });
  }

  // 이정호 개발중
  handleInputChange = (e) => {

    this.setState({
      test: e.target.value,
      inputData: e.target.value,
      tabletBtnChk: false,
    });

  }

  // 이정호 개발중
  handleCBChange = (e) => {


    // const todoValue = e.target.value;

    if (e.target.checked) {
      this.setState({
        rdCk: true,
        // inputChk: false,
        tabletBtnChk: false,
        test: e.target.value,
        inputData: e.target.value,
        cbChk: e.target.checked,
      });

    } else {
      this.setState({
        rdCk: false,
        tabletBtnChk: true,
        // inputChk: true,
        test: '',
        inputData: '',
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
      
      this.setState({
        inputData: vCode.CODE,
        inputDecision: vCode.DECISION,
        inputChk: false,
        pValue: vCode.DESC,
      });

     let jsonHistory = {};

      jsonHistory.ZVAL1 = vCode.CODE;
      jsonHistory.ZEVAL1 = vCode.DECISION;
  
      inputHistory.push(jsonHistory);

  }

  // 이정호 개발중
  handleDescChange = (e) => {
    this.setState({
      desc: e.target.value,
    });
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
  }

  // 이정호 개발중
  onStart = () => {
    this.setState({ start: true, visible: false });

    this.pmSheetStartOperUpdate(); // OPER 시작 (업데이트)
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
      // 텍스트 
      if (list.STEUERKZ_R === 'PI05' || list.STEUERKZ_R === 'PI07') {
        return (
          <div className="buttonArea" style={{ padding: '25px', border: '1px solid black' }}>
            <table style={{ border: '1px', }}>
              <tr>
                <td style={{ width: '350px' }}>{list.MIC_T}</td>
                <td rowSpan='2' style={{ width: '750px' }}>
                  <Input placeholder="입력하세요." value={this.state.test} style={{ width: 550 }} onChange={this.handleInputChange} />
                </td>
                <td rowSpan='2' style={{ width: '350px' }}>
                  <Button type='primary' onClick={() => this.inputDataCheck(list)} disabled={this.state.tabletBtnChk}>키패드 완료</Button>
                  <Button type='primary' onClick={() => this.nextLevel(list)} disabled={this.state.inputChk} >다음단계</Button>
                </td>
              </tr>
              <td style={{ width: '350px' }}>
                {list.SPEC}
                &nbsp;&nbsp;&le;
                {this.state.pValue !== '' ? `(이전값: ${this.state.pValue})` : false}
              </td>
            </table>
          </div>
        )
      } else if (list.STEUERKZ_R === 'PI01' || list.STEUERKZ_R === 'PI06') {

        return (
          <div className="buttonArea" style={{ padding: '25px', border: '1px solid black' }}>
            <table>
              <tr>
                <td style={{ width: '350px' }}>{list.MIC_T}</td>
                <td rowSpan='2' style={{ width: '750px' }}>
                  {list.LOWER}&le;&nbsp;&nbsp;
                <Input style={{ width: '150px' }} onChange={this.handleInputChange} placeholder={list.TARGET} value={this.state.test} disabled={this.state.rdCk}/>
                  &nbsp;&nbsp;&le;{list.UPPER}&nbsp;&nbsp;&nbsp;&nbsp; {list.UNIT}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                <Checkbox value={99999} onChange={this.handleCBChange} checked={this.state.cbChk}>99999 처리</Checkbox>
                </td>
                <td rowSpan='2' style={{ width: '350px' }}>
                  <Button type='primary' onClick={() => this.inputDataCheck(list)} disabled={this.state.tabletBtnChk}>키패드 완료</Button>
                  <Button type='primary' onClick={() => this.nextLevel(list)} disabled={this.state.inputChk} >다음단계</Button>
                </td>
              </tr>
              <td style={{ width: '350px' }}>
                {list.SPEC}({list.UNIT})
                &nbsp;&nbsp;&le;
                {this.state.pValue !== '' ? `(이전값: ${this.state.pValue})` : false}
              </td>
            </table>
          </div>
        )
      }
      else if (list.STEUERKZ_R === 'PI02') {
        return (
          <div className="buttonArea" style={{ padding: '25px', border: '1px solid black' }}>
            <table>
              <tr>
                <td style={{ width: '350px' }}>{list.MIC_T}</td>
                <td rowSpan='2' style={{ width: '750px' }}>
                  {list.LOWER}&le;&nbsp;&nbsp;
                <Input style={{ width: '150px' }} onChange={this.handleInputChange} value={this.state.test} disabled={this.state.rdCk}/>
                  &nbsp;&nbsp;&nbsp;&nbsp;{list.UNIT}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                <Checkbox value={99999} onChange={this.handleCBChange} checked={this.state.cbChk}>99999 처리</Checkbox>
                  </td>
                  <td rowSpan='2' style={{ width: '350px' }}>
                  <Button type='primary' onClick={() => this.inputDataCheck(list)} disabled={this.state.tabletBtnChk}>키패드 완료</Button>
                  <Button type='primary' onClick={() => this.nextLevel(list)} disabled={this.state.inputChk} >다음단계</Button>
                </td>
              </tr>
              <td style={{ width: '350px' }}>
                {list.SPEC}({list.UNIT})
                &nbsp;&nbsp;&le;
                {this.state.pValue !== '' ? `(이전값: ${this.state.pValue})` : false}
              </td>
            </table>
          </div>
        )
      } else if (list.STEUERKZ_R === 'PI03') {
        return (
          <div className="buttonArea" style={{ padding: '25px', border: '1px solid black' }}>
            <table>
              <tr>
                <td style={{ width: '350px' }}>{list.MIC_T}</td>
                <td rowSpan='2' style={{ width: '750px' }}>
                  <Input style={{ width: '150px' }} onChange={this.handleInputChange} value={this.state.test} disabled={this.state.rdCk}/>
                  &nbsp;&nbsp;&le; {list.UPPER} &nbsp;&nbsp;&nbsp;&nbsp; {list.UNIT}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                  <Checkbox value={99999} onChange={this.handleCBChange} checked={this.state.cbChk}>99999 처리</Checkbox>
                   </td>
                   <td rowSpan='2' style={{ width: '350px' }}>
                  <Button type='primary' onClick={() => this.inputDataCheck(list)} disabled={this.state.tabletBtnChk}>키패드 완료</Button>
                  <Button type='primary' onClick={() => this.nextLevel(list)} disabled={this.state.inputChk} >다음단계</Button>
                </td>
              </tr>
              <td style={{ width: '350px' }}>
                {list.SPEC}({list.UNIT})
                &nbsp;&nbsp;&le;
                {this.state.pValue !== '' ? `(이전값: ${this.state.pValue})` : false}
              </td>
            </table>
          </div>
        )
      } else {
        const idx = selectResult.findIndex(p => p.INSPCHAR === list.INSPCHAR && p.INSPOPER === list.INSPOPER);
        const codeList = [];
        for (let i = 0; i < selectResult.length; i += 1) {
          if (selectResult[i].INSPCHAR === list.INSPCHAR && selectResult[i].INSPOPER === list.INSPOPER) {
            codeList.push(selectResult[i]);
          }
        }
        
        const descCk = _.findIndex(codeList, { 'DECISION': 'A', 'DESC': '실시' });
        
        
        if(descCk !== -1){
        if (this.state.inputChk) {
          this.setState({
            inputChk: false,
            inputData: '0001',
            inputDecision: 'A',
          });
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
              {btnSize < btnWidth ? <br/> : false}
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
                  <Radio.Group value={this.state.desc} onChange={this.handleDescChange} >
                    {renderButtons()}
                  </Radio.Group>
                </td>
                <td rowSpan='2' style={{ width: '150px' }}>
                <Button type='primary' onClick={() => this.nextLevel(list)} disabled={this.state.inputChk} >다음단계</Button></td>
              </tr>
              <td style={{ width: '350px' }}>
                {list.SPEC}
                &nbsp;&nbsp;&le;
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
      inputData,
    } = this.state;

    this.setState({
      pValue: inputData,
      tabletBtnChk: true,
    });

    if (data.STEUERKZ_R === 'PI01' || data.STEUERKZ_R === 'PI06') {
      if ((!isNaN(inputData) && inputData !== ''.trim()) || inputData === 99999) {
        if ((Number(data.LOWER) <= Number(inputData) && Number(data.UPPER) >= Number(inputData)) || inputData === 99999) {

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
      if ((!isNaN(inputData) && inputData !== ''.trim()) || inputData === 99999) {
        if ((Number(data.LOWER) <= Number(inputData)) || inputData === 99999) {
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
      if ((!isNaN(inputData) && inputData !== ''.trim()) || inputData === 99999) {
        if ((Number(data.UPPER) >= Number(inputData)) || inputData === 99999) {

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
      if (inputData.trim() !== '') {

        // this.pmSheetInputDataUpdate(data);
        this.onSuccess();
      } else {

        this.onFalse('입력해주세요.');

        return;
      }
    }

  }


  // 이정호 개발중
  nextOper = () => {

    this.PmSheetEndOperUpdate();

    const operidx = this.state.operNum + 1;

   // if (this.props.detailData.list.ET_OPERATION[operidx].ALNZU === 'B') {
      this.setState({
        start: false,
        visible: true,
        operNum: operidx,
        oper: this.props.detailData.list.ET_OPERATION[operidx].OPER,
        operT: this.props.detailData.list.ET_OPERATION[operidx].OPER_T,
        num: 0,
      });
      // }
    }

   // 이정호 개발중
   nextLevel = (data) => {

    this.pmSheetInputDataUpdate(data);

    const idx = this.state.num + 1;
    this.setState({
      num: idx,
      inputData: '',
      inputDecision: '',
      test: '',
      desc: '실시',
      inputChk: true,
      rdCk: false,
      cbChk: false,
      pValue: '',
    });

    inputHistory = [];

    this.onDraw(idx);
  }

    // 이정호 개발 중 - 작업 시작 Oper
    pmSheetStartOperUpdate = () => {

      let jsonData = new Object();
      jsonData.INSP_LOT = this.props.detailData.INSP_LOT; // pmSheet 번호                 
      jsonData.INSPOPER = this.state.oper; // Operation 코드
      jsonData.INSPCHAR = ''; // CheckItem 코드
      jsonData.START_DT = ''; // 작업시작시간
      jsonData.CO_WORKER = ''; // 공동작업자
      jsonData.INP_STATUS = 'P'; // 상태
  
      // Axios.post('/api/gipms/v1/pmsheet/pmSheetStartOper', jsonData)
      //   .then((result) => {
      //     console.log(result);
      //     feed.success('저장 완료');
      //   })
      //   .catch((res) => {
      //     console.log(res);
      //     feed.error('저장 실패');
      //   });
  
  
    }
  
      // 이정호 개발 중 - 작업 종료 Oper
      PmSheetEndOperUpdate = () => {
  
        let jsonData = new Object();
        jsonData.INSP_LOT = this.props.detailData.INSP_LOT; // pmSheet 번호                 
        jsonData.INSPOPER = this.state.oper; // Operation 코드
        jsonData.INSPCHAR = ''; // CheckItem 코드
        jsonData.END_DT = ''; // 작업종료시간
        jsonData.CO_WORKER = ''; // 공동작업자
        jsonData.INP_STATUS = 'C'; // 상태
    
        // Axios.post('/api/gipms/v1/pmsheet/pmSheetStartOper', jsonData)
        //   .then((result) => {
        //     console.log(result);
        //     feed.success('저장 완료');
        //   })
        //   .catch((res) => {
        //     console.log(res);
        //     feed.error('저장 실패');
        //   });
    
    
      }
  
  
    // 이정호 개발 중 - 입력값에 따른 Update
    pmSheetInputDataUpdate = (updateData) => {
  
      if (this.state.inputData === 99999) {
        this.setState({
          inputData: 'Not available'
        });
      }
  
      // 입력값 이력(정상)
      let jsonItContent = new Object();
      jsonItContent.ZVAL1 = this.state.inputData;
      jsonItContent.ZEVAL1 = this.state.inputDecision;
  
  
      let jsonData = new Object();
      // jsonData.INSP_LOT = this.props.detailData.INSP_LOT; // pmSheet 번호                 
      // jsonData.INSPOPER = updateData.INSPOPER; // Operation 코드
      // jsonData.INSPCHAR = updateData.INSPCHAR; // CheckItem 코드
      // jsonData.START_DT = ''; // 작업시작시간
      // jsonData.END_DT = ''; // 작업종료시간
      // jsonData.CO_WORKER = ''; // 공동작업자
      // jsonData.IT_CONTENT = JSON.stringify(jsonItContent); // 입력값 이력(정상값)
      // jsonData.INP_HIST = JSON.stringify(inputHistory); // 입력값 이력(오류값도 포함함)
      // jsonData.INP_STATUS = 'C'; // 상태
  
  
      jsonData.INSP_LOT = '140003234657'; // pmSheet 번호                 
      jsonData.INSPOPER = '0010'; // Operation 코드
      jsonData.INSPCHAR = '0010' // CheckItem 코드
      jsonData.START_DT = ''; // 작업시작시간
      jsonData.END_DT = ''; // 작업종료시간
      jsonData.CO_WORKER = '홍길동'; // 공동작업자
      jsonData.IT_CONTENT = JSON.stringify(jsonItContent); // 입력값 이력(정상값)
      jsonData.INP_HIST = JSON.stringify(inputHistory); // 입력값 이력(오류값도 포함함)
      jsonData.INP_STATUS = 'C'; // 상태
  
  
      // Axios.post('/api/gipms/v1/pmsheet/pmSheetInputData', jsonData)
      //   .then((result) => {
      //     console.log(result);
      //     feed.success('저장 완료');
      //   })
      //   .catch((res) => {
      //     console.log(res);
      //     feed.error('저장 실패');
      //   });
    }
  
    
     // 이정호 개발 중
    onSuccess = () => {
  
      message.success(
        <MessageContent>
          입력완료
      </MessageContent>,
        1,
      );
  
      this.setState({
        inputChk: false,
        inputDecision: 'A',
      });
  
      let jsonHistory = {};
  
      jsonHistory.ZVAL1 = this.state.inputData;
      jsonHistory.ZEVAL1 = 'A'
  
      inputHistory.push(jsonHistory);
  
  
    }
  
    // 이정호 개발 중
    onFalse = (errorMessage) => {
      message.error(
        <MessageContent>
          {errorMessage}
        </MessageContent>,
        2,
      );
  
      let jsonHistory = {};
  
      jsonHistory.ZVAL1 = this.state.inputData;
      jsonHistory.ZEVAL1 = 'R';
  
      inputHistory.push(jsonHistory);
  
      this.setState({
        test: '',
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

  handleSelectedCode = (codeName) => {
    this.setState({ code: true, codeName: codeName });
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
    console.log('EventBus', EB.status());
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
      if (this.props.detailData.list.ReasonData.REASON === '') {
        this.setState({ renderType: 'PmList' });
      }
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
          <tbody>
            <tr>
              <td
                style={{ fontWeight: 'bold', fontSize: 15 }}
              >
                <button
                  style={{ marginRight: 5, background: 'transparent', }}
                  onClick={() => this.onClickTitle()}
                >▼</button>
                {list.OPER.slice(2, 4)}. {list.OPER_T}
              </td>
              <td style={{ textAlign: 'center', display: 'inline-block', width: '120px' }}>0/{list.ANZZL}</td>
              <td style={{ display: 'inline-block', width: '77px' }}>{list.ARBEI2} {list.ARBEH}</td>
              <td style={{ textAlign: 'center' }}>{renderSumTime}</td>
            </tr>
            {sheetList[i].map((data, idx) =>
            <tr>
              <td
                onClick= {() => {this.onClickTable(data)}}
                style={{ padding: '3px 3px 3px 25px' }}
                className={idx + 1}>{data.MIC_T}
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
          </tbody>
        );
      });
      return jsx;
    };

    const RenderSettingView2 = () => {
      let jsx = '';
      jsx = doOperation.map((list, i) => {
        return (
          <tbody>
            <tr>
              <td
                style={{ fontWeight: 'bold', fontSize: 15 }}
              >
                <button
                  style={{ marginRight: 5, background: 'transparent', }}
                  onClick={() => this.onClickTitle()}
                >▼</button>
                {list.OPER.slice(2, 4)}. {list.OPER_T}
              </td>
              <td style={{ textAlign: 'center', display: 'inline-block', width: '140px' }}>●</td>
              <td style={{ display: 'inline-block', width: '77px' }}>{list.ARBEI2} {list.ARBEH}</td>
              <td style={{ textAlign: 'center' }}>-</td>
            </tr>
            {sheetList[i].map((data, idx) =>
            <tr>
              <td
                onClick= {() => {this.onClickTable(data)}}
                style={{ padding: '3px 3px 3px 25px' }}
                className={idx + 1}>{data.MIC_T}
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
        );
      });
      return jsx;
    };

    const RenderView = (type) => {
      switch (type) {
        case 'SendComplete': {
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
        case 'Notice': {
          return (
            <Notice
              inspLot={hyPmState}
              empNo={empNo}
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
              sheetNum={this.props.detailData.INSP_LOT}
              handleSavePmCode={this.props.handleSavePmCode}
              handleSelectedCode= {this.handleSelectedCode}
            />
          )
        }
        default:
          return '';
      }
    };

    return (
      <div style={{ height: '100%' }}>
        <div>
          {
            roleDetail === '910' ?
            <Collaborator
              empNo={empNo}
              onBack={this.onBack}
              handleCollaboratorList={this.handleCollaboratorList}
              goPmCode={goPmCode}
            />
            : ''
          }
        </div>
        <div>
          {RenderView(this.state.renderType)}
        </div>
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
          handleChangeView={this.handleChangeView}
        />
        {this.state.viewWide === false ?
          <div className="center" style={{ overflow: 'hidden' }}>
            <div className="left" style={{ float: 'left', width: '55%' }}>
              <table>
                <thead>
                  <tr style={{ height: 35, fontWeight: 'bold', fontSize: 15 }}>
                    <th style={{ width: '300px', paddingLeft: '25px' }}>점검항목1</th>
                    <th style={{ width: '80px', textAlign: 'center' }}>작업 현황</th>
                    <th style={{ width: '80px', textAlign: 'center' }}>목표시간</th>
                    <th style={{ width: '80px', textAlign: 'center' }}>소요 시간</th>
                  </tr>
                </thead>
                <Scrollbars
                    className="custom-scrollbar"
                    style={{ width: 'calc(100% + 300px)', height: 'calc(100vh - 270px)' }}
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                >
                {RenderSettingView()}
                </Scrollbars>
              </table>
            </div>
            <div className="right" style={{ float: 'right', width: '45%' }}>
              <GuideTest />
            </div>
          </div>
          :
          <div className="wide">
            <table>
              <thead>
                <tr style={{ height: 35, fontWeight: 'bold', fontSize: 15 }}>
                  <th style={{ width: '300px', paddingLeft: '25px' }}>점검항목</th>
                  <th style={{ width: '80px', paddingLeft: '25px' }}>가이드</th>
                  <th style={{ width: '90px', paddingLeft: '25px' }}>목표 시간</th>
                  <th style={{ width: '105px', textAlign: 'center' }}>소요 시간</th>
                  <th style={{ width: '80px', textAlign: 'center' }}>작업 현황</th>
                  <th style={{ width: '80px', textAlign: 'center' }}>최종값</th>
                  <th style={{ width: '80px', textAlign: 'center' }}>이전값</th>
                  <th style={{ width: '80px', textAlign: 'center' }}>작업자</th>
                </tr>
              </thead>
              <Scrollbars
                  className="custom-scrollbar"
                  style={{ width: 'calc(100% + 610px)', height: 'calc(100vh - 270px)' }}
                  autoHide
                  autoHideTimeout={1000}
                  autoHideDuration={200}
              >
              {RenderSettingView2()}
              </Scrollbars>
            </table>
          </div>
        }
        {
          this.state.start === false 
          // && (this.state.collaboratorList.length !== 0 || roleDetail !== '910')
          && this.state.code === true ?
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
              작업 시작 버튼을 눌러 {this.state.oper.slice(2, 4)}.{this.state.operT} 시작합니다.
            </p>
          <button onClick={() => this.onStart()} style={{ float: 'right', color: 'black' }}>작업 시작</button>
          </Modal>
          :
          false
        }
        {this.state.start == true ?
          this.onDraw()
          :
          false
        }
      </div>
    );
  }
}

SheetView2.defaultProps = {
  location: {},
  detailData: {},
};

SheetView2.propTypes = {
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
});

export function mapDispatchToProps(dispatch) {
  return {
    handleSavePmCode: (value, num) => dispatch(actions.savePmCode(value, num)),
  };
}

const withReducer = injectReducer({ key: 'sheettablet', reducer });
const withSaga = injectSaga({ key: 'sheettablet', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SheetView2);
