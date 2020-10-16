import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal, Select } from 'antd';

import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';

import Styled from 'apps/eshs/user/health/ChkReservation/Questionnaire/Styled';
import DeptSelect from 'components/DeptSelect';

import moment from 'moment';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';
import PollImg from '../survey/poll.gif';

const AntdModal = StyledAntdModal(Modal);
const AntdSelect = StyledSelect(Select);
const { Option } = Select;
const AntdSearch = StyledSearchInput(Input.Search);

const questions = [
  {
    title: (
      <p className="question-txt">
        <span className="question-num">1. </span>규칙적인 <b>(한번에 30분 이상, 1주일에 적어도 2-3회 이상)</b> 여가 및 취미활동을 하고 계시는 곳에 표시(√)하여
        주십시오.
      </p>
    ),
    field: 'Q1',
    questions: [
      { text: '컴퓨터 관련 활동', SEQ: '1' },
      { text: '악기연주 (피아노, 바이올린등)', SEQ: '2' },
      { text: '뜨개질, 자수', SEQ: '3' },
      { text: '붓글씨', SEQ: '4' },
      { text: '테니스/배드민턴/스쿼시', SEQ: '5' },
      { text: '촉구/족구/농구/스키', SEQ: '6' },
      { text: '해당사항 없음', SEQ: '7' },
    ],
  },
  {
    title: (
      <p className="question-txt">
        <span className="question-num">2. </span>귀하의 하루 평균 가사노동시간(밥하기, 빨래하기, 청소하기, 2살 미만의 아이 돌보기 등)은 얼마나 됩니까?
      </p>
    ),
    field: 'Q2',
    questions: [
      { text: '거의 하지 않는다', SEQ: '1' },
      { text: '1시간 미만', SEQ: '2' },
      { text: '1-2시간', SEQ: '3' },
      { text: '2-3시간', SEQ: '4' },
      { text: '3시간 이상', SEQ: '5' },
    ],
  },
  {
    title: (
      <p className="question-txt">
        <span className="question-num">3. </span>귀하는 의사로부터 다음과 같은 질병에 대해 진단을 받은 적이 있습니까? (해당 질병에 체크)
      </p>
    ),
    field: 'Q4',
    questions: [
      { text: '아니오', SEQ: '1' },
      { text: '예', SEQ: '2' },
    ],
    children: [
      {
        title: <p className="question-txt">'예'인 경우 현재 상태는 ?</p>,
        field: 'Q5',
        questions: [
          { text: '완치', SEQ: '1' },
          { text: '치료나 관찰 중', SEQ: '2' },
        ],
      },
      {
        title: <p className="question-txt">보기</p>,
        field: 'Q3',
        questions: [
          { text: '류마티스 관절염', SEQ: '1' },
          { text: '당뇨병', SEQ: '2' },
          { text: '루프스병', SEQ: '3' },
          { text: '통풍', SEQ: '4' },
          { text: '알콜중독', SEQ: '5' },
        ],
      },
    ],
  },
  {
    title: (
      <p className="question-txt">
        <span className="question-num">4. </span>과거에 운동 중 혹은 사고로 (교통사고, 넘어짐 추락 등) 인해 손/손가락/손목, 팔/팔꿈치, 어깨, 목, 허리, 무릎
        부의를 다친 적이 있습니까?
      </p>
    ),
    field: 'Q6',
    questions: [
      { text: '아니오', SEQ: '1' },
      { text: '예', SEQ: '2' },
    ],
    children: [
      {
        title: <p className="question-txt">'예'인 경우 상해 부위는 ?</p>,
        field: 'Q7',
        questions: [
          { text: '손/손가락/손목', SEQ: '1' },
          { text: '팔/팔꿈치', SEQ: '2' },
          { text: '어깨', SEQ: '3' },
          { text: '목', SEQ: '4' },
          { text: '허리', SEQ: '5' },
          { text: '무릎', SEQ: '6' },
        ],
      },
    ],
  },
  {
    title: (
      <p className="question-txt">
        <span className="question-num">5. </span>현재 하고 계시는 일의 작업강도 (육체적 부담 정도)는 어느 정도라고 생각하십니까?
      </p>
    ),
    field: 'Q8',
    questions: [
      { text: '전혀 힘들지 않다', SEQ: '1' },
      { text: '견딜만 하다', SEQ: '2' },
      { text: '약간 힘들다', SEQ: '3' },
      { text: '매우 힘들다', SEQ: '4' },
    ],
  },
];

const acheQuestions = [
  {
    title: '1. 해당 되는 통증 부위는?',
    fields: ['Q11', 'Q21', 'Q31', 'Q41', 'Q51', 'Q61'],
    questions: [
      { text: '왼쪽', SEQ: '1' },
      { text: '오른쪽', SEQ: '2' },
      { text: '양쪽', SEQ: '3' },
      { text: '없음', SEQ: '4' },
    ],
  },
  {
    title: (
      <>
        2. 한번 아프기 시작하면 통증 기간은 <b>얼마동안</b> 지속됩니까?
      </>
    ),
    fields: ['Q12', 'Q22', 'Q32', 'Q42', 'Q52', 'Q62'],
    questions: [
      { text: '1일 미만', SEQ: '1' },
      { text: '1일 - 1주일', SEQ: '2' },
      { text: '1주일 - 1달', SEQ: '3' },
      { text: '1달 - 6개월', SEQ: '4' },
      { text: '6개월 이상', SEQ: '5' },
    ],
  },
  {
    title: (
      <>
        3. 그 때의 아픈 정도는 <b>어느정도</b> 입니까?
        <br />
        (보기를 참고하여 체크해 주십시오)
      </>
    ),
    fields: ['Q13', 'Q23', 'Q33', 'Q43', 'Q53', 'Q63'],
    questions: [
      { text: '통증 없음', SEQ: '1' },
      { text: '약한 통증', SEQ: '2' },
      { text: '중간 통증', SEQ: '3' },
      { text: '심한 통증', SEQ: '4' },
      { text: '매우심한 통증', SEQ: '5' },
    ],
  },
  {
    title: (
      <>
        4. <b>지난 1년 동안</b> 이러한 증상을 얼마나 자주 경혐하였습니까?
      </>
    ),
    fields: ['Q14', 'Q24', 'Q34', 'Q44', 'Q54', 'Q64'],
    questions: [
      { text: '6개월에 1번', SEQ: '1' },
      { text: '2-3달에 1번', SEQ: '2' },
      { text: '1달에 1번', SEQ: '3' },
      { text: '1주일에 1번', SEQ: '4' },
      { text: '매일', SEQ: '5' },
    ],
  },
  {
    title: (
      <>
        5. <b>지난 1주일</b> 동안 에도 그러한 증상이 있었습니까?
      </>
    ),
    fields: ['Q15', 'Q25', 'Q35', 'Q45', 'Q55', 'Q65'],
    questions: [
      { text: '예', SEQ: '1' },
      { text: '아니오', SEQ: '2' },
    ],
  },
  {
    title: (
      <>
        6. <b>지난 1년 동안</b> 그러한 통증으로 인해 어떤 일이 있었습니까?
      </>
    ),
    fields: ['Q16', 'Q26', 'Q36', 'Q46', 'Q56', 'Q66'],
    questions: [
      {
        text: (
          <>
            병원 혹은
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;한의원 치료
          </>
        ),
        SEQ: '1',
      },
      { text: '약국 치료', SEQ: '2' },
      { text: '병가, 산재', SEQ: '3' },
      { text: '부서전환', SEQ: '4' },
      { text: '해당사항없음', SEQ: '5' },
    ],
  },
];

const parts = ['손/손목/손가락', '팔/팔꿈치', '어깨', '목', '허리', '무릅'];

const excelColumns = [
  {
    title: '문제',
    field: 'QUESTION',
    width: { wpx: 100 },
  },
  {
    title: '보기1',
    field: 'Q1',
    width: { wpx: 100 },
  },
  {
    title: '보가2',
    field: 'Q2',
    width: { wpx: 100 },
  },
  {
    title: '보기3',
    field: 'Q3',
    width: { wpx: 100 },
  },
  {
    title: '보기4',
    field: 'Q4',
    width: { wpx: 100 },
  },
  {
    title: '보기5',
    field: 'Q5',
    width: { wpx: 100 },
  },
  {
    title: '보기6',
    field: 'Q6',
    width: { wpx: 100 },
  },
  {
    title: '보기7',
    field: 'Q7',
    width: { wpx: 100 },
  },
];

const excelPersonColumns = [
  {
    title: '사번',
    field: 'EMPNO',
    width: { wpx: 100 },
  },
  {
    title: '성명',
    field: 'EMPNAME',
    width: { wpx: 100 },
  },
  {
    title: '부서',
    field: 'DEPT_NM',
    width: { wpx: 200 },
  },
  {
    title: '공정',
    field: 'DEPT02',
    width: { wpx: 100 },
  },
  {
    title: '작업내용',
    field: 'JOB01',
    width: { wpx: 300 },
  },
  {
    title: '1문제',
    field: 'Q1',
    width: { wpx: 100 },
  },
  {
    title: '2문제',
    field: 'Q2',
    width: { wpx: 100 },
  },
  {
    title: '3-1문제',
    field: 'Q3',
    width: { wpx: 100 },
  },
  {
    title: '3-2문제',
    field: 'Q4',
    width: { wpx: 100 },
  },
  {
    title: '3-3문제',
    field: 'Q5',
    width: { wpx: 100 },
  },
  {
    title: '4-1문제',
    field: 'Q6',
    width: { wpx: 100 },
  },
  {
    title: '4-2문제',
    field: 'Q7',
    width: { wpx: 100 },
  },
  {
    title: '5문제',
    field: 'Q8',
    width: { wpx: 100 },
  },
  {
    title: 'CK(통증여부)',
    field: 'QCK',
    width: { wpx: 100 },
  },
  {
    title: '손/손목/손가락-1문제',
    field: 'Q11',
    width: { wpx: 200 },
  },
  {
    title: '1-2문제',
    field: 'Q12',
    width: { wpx: 100 },
  },
  {
    title: '1-3문제',
    field: 'Q13',
    width: { wpx: 100 },
  },
  {
    title: '1-4문제',
    field: 'Q14',
    width: { wpx: 100 },
  },
  {
    title: '1-5문제',
    field: 'Q15',
    width: { wpx: 100 },
  },
  {
    title: '1-6문제',
    field: 'Q16',
    width: { wpx: 100 },
  },
  {
    title: '팔/ 팔꿈치-1문제',
    field: 'Q21',
    width: { wpx: 200 },
  },
  {
    title: '2-2문제',
    field: 'Q22',
    width: { wpx: 100 },
  },
  {
    title: '2-3문제',
    field: 'Q23',
    width: { wpx: 100 },
  },
  {
    title: '2-4문제',
    field: 'Q24',
    width: { wpx: 100 },
  },
  {
    title: '2-5문제',
    field: 'Q25',
    width: { wpx: 100 },
  },
  {
    title: '2-6문제',
    field: 'Q26',
    width: { wpx: 100 },
  },
  {
    title: '어깨-1문제',
    field: 'Q31',
    width: { wpx: 200 },
  },
  {
    title: '3-2문제',
    field: 'Q32',
    width: { wpx: 100 },
  },
  {
    title: '3-3문제',
    field: 'Q33',
    width: { wpx: 100 },
  },
  {
    title: '3-4문제',
    field: 'Q34',
    width: { wpx: 100 },
  },
  {
    title: '3-5문제',
    field: 'Q35',
    width: { wpx: 100 },
  },
  {
    title: '3-6문제',
    field: 'Q36',
    width: { wpx: 100 },
  },
  {
    title: '목-1문제',
    field: 'Q41',
    width: { wpx: 200 },
  },
  {
    title: '4-2문제',
    field: 'Q42',
    width: { wpx: 100 },
  },
  {
    title: '4-3문제',
    field: 'Q43',
    width: { wpx: 100 },
  },
  {
    title: '4-4문제',
    field: 'Q44',
    width: { wpx: 100 },
  },
  {
    title: '4-5문제',
    field: 'Q45',
    width: { wpx: 100 },
  },
  {
    title: '4-6문제',
    field: 'Q46',
    width: { wpx: 100 },
  },
  {
    title: '허리-1문제',
    field: 'Q51',
    width: { wpx: 200 },
  },
  {
    title: '5-2문제',
    field: 'Q52',
    width: { wpx: 100 },
  },
  {
    title: '5-3문제',
    field: 'Q53',
    width: { wpx: 100 },
  },
  {
    title: '5-4문제',
    field: 'Q54',
    width: { wpx: 100 },
  },
  {
    title: '5-5문제',
    field: 'Q55',
    width: { wpx: 100 },
  },
  {
    title: '5-6문제',
    field: 'Q56',
    width: { wpx: 100 },
  },
  {
    title: '무릎-1문제',
    field: 'Q61',
    width: { wpx: 200 },
  },
  {
    title: '6-2문제',
    field: 'Q62',
    width: { wpx: 100 },
  },
  {
    title: '6-3문제',
    field: 'Q63',
    width: { wpx: 100 },
  },
  {
    title: '6-4문제',
    field: 'Q64',
    width: { wpx: 100 },
  },
  {
    title: '6-5문제',
    field: 'Q65',
    width: { wpx: 100 },
  },
  {
    title: '6-6문제',
    field: 'Q66',
    width: { wpx: 100 },
  },
];

const excelListSort = [
  { target: 'Q1', text: '1' },
  { target: 'Q2', text: '2' },
  { target: 'Q3', text: '3-1' },
  { target: 'Q4', text: '3-2' },
  { target: 'Q5', text: '3-3' },
  { target: 'Q6', text: '4-1' },
  { target: 'Q7', text: '4-2' },
  { target: 'Q8', text: '5' },
  { target: 'QCK', text: 'qck' },
  { target: 'Q11', text: 'q11' },
  { target: 'Q12', text: 'q12' },
  { target: 'Q13', text: 'q13' },
  { target: 'Q14', text: 'q14' },
  { target: 'Q15', text: 'q15' },
  { target: 'Q16', text: 'q16' },
  { target: 'Q21', text: 'q21' },
  { target: 'Q22', text: 'q22' },
  { target: 'Q23', text: 'q23' },
  { target: 'Q24', text: 'q24' },
  { target: 'Q25', text: 'q25' },
  { target: 'Q26', text: 'q26' },
  { target: 'Q31', text: 'q31' },
  { target: 'Q32', text: 'q32' },
  { target: 'Q33', text: 'q33' },
  { target: 'Q34', text: 'q34' },
  { target: 'Q35', text: 'q35' },
  { target: 'Q36', text: 'q36' },
  { target: 'Q41', text: 'q41' },
  { target: 'Q42', text: 'q42' },
  { target: 'Q43', text: 'q43' },
  { target: 'Q44', text: 'q44' },
  { target: 'Q45', text: 'q45' },
  { target: 'Q46', text: 'q46' },
  { target: 'Q51', text: 'q51' },
  { target: 'Q52', text: 'q52' },
  { target: 'Q53', text: 'q53' },
  { target: 'Q54', text: 'q54' },
  { target: 'Q55', text: 'q55' },
  { target: 'Q56', text: 'q56' },
  { target: 'Q61', text: 'q61' },
  { target: 'Q62', text: 'q62' },
  { target: 'Q63', text: 'q63' },
  { target: 'Q64', text: 'q64' },
  { target: 'Q65', text: 'q65' },
  { target: 'Q66', text: 'q66' },
];

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      pollList: [],
      selectedPoll: -1,
      searchParam: {
        POSEQ: -1,
        DEPT_ID: '',
      },
      statistics: {},
      excelList: [],
      excelPersonList: [],
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.init();
  }

  // 첫 진입시
  init = () => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'getMusclePollResult',
      type: 'POST',
      url: `/api/eshs/v1/common/healthPollMgt`,
      params: { PARAM: { type: 'GET_MUSCLE_SURVEY_RESULT_INIT' } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.initCallback);
  };

  initCallback = (id, response) => {
    const { pollList, result, list } = response;
    const statistics = (result && result) || {};
    const excelPersonList = (list && list) || [];

    const parseStatistics = {};
    const excelList = [];
    let target = '';
    for (target in statistics) {
      if (target === 'TOTAL') {
        parseStatistics[target] = statistics[target];
      } else {
        parseStatistics[target] = statistics[target] && statistics[target].value && JSON.parse(statistics[target].value);
      }
    }

    excelListSort.forEach(item => {
      if (parseStatistics[item.target]) {
        const excelRow = {};
        parseStatistics[item.target].forEach(question => {
          excelRow[`Q${question.SEQ}`] = question.CNT;
        });
        excelRow.QUESTION = item.text;
        excelList.push(excelRow);
      } else {
        excelList.push({ QUESTION: item.text, Q1: '0', Q2: '0', Q3: '0', Q4: '0', Q5: '0', Q6: '0', Q7: '0' });
      }
    });

    this.setState({
      isLoaded: true,
      pollList: (pollList && pollList) || [],
      selectedPoll: (pollList && pollList[0] && pollList[0].POSEQ) || -1,
      searchParam: {
        POSEQ: (pollList && pollList[0] && pollList[0].POSEQ) || -1,
      },
      statistics: parseStatistics,
      excelList,
      excelPersonList,
    });
  };

  getSearchData = () => {
    const { sagaKey: id, getCallDataHandlerReturnRes, spinningOn } = this.props;
    const { searchParam, selectedDept } = this.state;
    spinningOn();
    const deptId = (selectedDept && `${selectedDept.DEPT_ID}`) || null;
    const poSeq = (searchParam && searchParam.POSEQ) || -1;
    const apiInfo = {
      key: 'getMusclePollResult',
      type: 'POST',
      url: `/api/eshs/v1/common/healthPollMgt`,
      params: { PARAM: { type: 'GET_MUSCLE_SURVEY_RESULT', POSEQ: poSeq, DEPT_ID: deptId } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.searchCallback);
  };

  searchCallback = (id, response) => {
    const { searchParam, selectedDept } = this.state;
    const { result, list } = response;
    const statistics = (result && result) || {};
    const excelPersonList = (list && list) || [];

    const parseStatistics = {};
    const excelList = [];
    let target = '';
    for (target in statistics) {
      if (target === 'TOTAL') {
        parseStatistics[target] = statistics[target];
      } else {
        parseStatistics[target] = statistics[target] && statistics[target].value && JSON.parse(statistics[target].value);
      }
    }

    excelListSort.forEach(item => {
      if (parseStatistics[item.target]) {
        const excelRow = {};
        parseStatistics[item.target].forEach(question => {
          excelRow[`Q${question.SEQ}`] = question.CNT;
        });
        excelRow.QUESTION = item.text;
        excelList.push(excelRow);
      } else {
        excelList.push({ QUESTION: item.text, Q1: '0', Q2: '0', Q3: '0', Q4: '0', Q5: '0', Q6: '0', Q7: '0' });
      }
    });

    this.setState(
      {
        statistics: parseStatistics,
        excelList,
        excelPersonList,
        searchParam: {
          ...searchParam,
          DEPT_NM: selectedDept?.NAME_KOR || 'MAGNACHIP반도체',
        },
      },
      () => this.props.spinningOff(),
    );
  };

  customSpan = (text, field, seq) => {
    const { statistics } = this.state;
    let idx = -1;
    if (statistics[field]) {
      idx = statistics[field].findIndex(q => q.SEQ === seq);
    }
    return (
      <span style={{ paddingRight: '8px', paddingLeft: '8px' }}>
        {text}
        {idx > -1 ? (
          <span style={{ paddingLeft: '5px', color: 'red' }}>{`${statistics[field][idx].CNT}명`}</span>
        ) : (
          <span style={{ paddingLeft: '5px', color: 'red' }}>0명</span>
        )}
      </span>
    );
  };

  handleModalVisible = () => {
    this.setState(prevState => ({ modalVisible: !prevState.modalVisible }));
  };

  onChangeSearchParam = (target, value) => this.setState(prevState => ({ searchParam: { ...prevState.searchParam, [target]: value } }));

  render() {
    const { statistics, excelList, modalVisible, isLoaded, searchParam, excelPersonList, pollList, selectedPoll, selectedDept } = this.state;
    const searchDept = (selectedDept && selectedDept.NAME_KOR) || 'MAGNACHIP반도체';
    if (!isLoaded) return '';
    if (isLoaded && selectedPoll === -1)
      return (
        <div style={{ width: '100%', textAlign: 'center', padding: '50px' }}>
          <span style={{ fontWeight: 600, fontSize: 20 }}>조회된 설문조사 통계데이터가 없습니다.</span>
        </div>
      );
    return (
      <Styled>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper className="search-wrapper-inline">
            <div className="search-input-area">
              <AntdSelect
                defaultValue={(searchParam && searchParam.POSEQ) || -1}
                className="select-sm mr5"
                style={{ width: 350 }}
                onChange={val => this.onChangeSearchParam('POSEQ', val)}
              >
                <Option value={-1}>설문조사 선택</Option>
                {pollList.map(item => (
                  <Option value={item.POSEQ}>{`${item.POYEAR} - ${item.POTYPE} :: ${item.SDATE} ~ ${item.EDATE}`}</Option>
                ))}
              </AntdSelect>
              <AntdSearch
                className="input-search-sm"
                style={{ width: 250 }}
                value={searchDept}
                onClick={this.handleModalVisible}
                onSearch={this.handleModalVisible}
              />
            </div>
            <div className="btn-area">
              <StyledButton className="btn-primary btn-sm btn-first" onClick={this.getSearchData}>
                검색
              </StyledButton>
              <div style={{ display: 'inline-block', marginRight: '5px' }}>
                <ExcelDownloadComp
                  isBuilder={false}
                  fileName={`Poll_total_${moment().format('YYYYMMDD')}`}
                  className="testClassName"
                  btnText="전체통계 엑셀받기"
                  sheetName={`Poll_total_${moment().format('YYYYMMDD')}`}
                  listData={excelList}
                  btnSize="btn-sm btn-first mr5"
                  fields={excelColumns.map(item => ({
                    ...item,
                    style: { font: { sz: '12' }, alignment: { vertical: 'center', horizontal: 'center' } },
                  }))}
                  columns={excelColumns.map(item => ({
                    ...item,
                    style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '', bold: true }, alignment: { vertical: 'center', horizontal: 'center' } },
                  }))}
                />
              </div>
              <div style={{ display: 'inline-block', marginRight: '5px' }}>
                <ExcelDownloadComp
                  isBuilder={false}
                  fileName={`Poll_person_${moment().format('YYYYMMDD')}`}
                  className="testClassName"
                  btnText="개인별통계 엑셀받기"
                  sheetName={`Poll_person_${moment().format('YYYYMMDD')}`}
                  listData={excelPersonList}
                  btnSize="btn-sm btn-first mr5"
                  fields={excelPersonColumns.map(item => ({
                    ...item,
                    style: { font: { sz: '12' }, alignment: { vertical: 'center', horizontal: 'center' } },
                  }))}
                  columns={excelPersonColumns.map(item => ({
                    ...item,
                    style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '', bold: true }, alignment: { vertical: 'center', horizontal: 'center' } },
                  }))}
                />
              </div>
            </div>
            <div className="div-comment" style={{ display: 'inline-block', marginLeft: '5px' }}>
              {searchParam.DEPT_NM || 'MAGNACHIP반도체'} 설문참여자 : {statistics.TOTAL || 0}명
            </div>
          </StyledCustomSearchWrapper>
          <div className="examination-area">
            {questions.map((q, index) => (
              <div key={`QUESTION_DIV_${index}`} className="question-item">
                {q.title}
                <div className="question-article">
                  {q.questions.map(detailQ => (
                    <>{this.customSpan(detailQ.text, q.field, detailQ.SEQ)}</>
                  ))}
                </div>
                {q.children && (
                  <div className="question-article">
                    {q.children.map(qc => (
                      <>
                        {qc.title}
                        {qc.questions.map(qcq => (
                          <>{this.customSpan(qcq.text, qc.field, qcq.SEQ)}</>
                        ))}
                      </>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ display: 'inline-block' }}>
            <div className="examination-area" style={{ float: 'left', width: '90%' }}>
              <div className="question-item">
                <p className="add-title">
                  Ⅱ. 지난 1년 동안 손/손가락/손목, 팔/팔꿈치, 어깨, 허리, 무릎 중 어느 한 부위 에서라도 귀하의 직업과 관련하여 통증이나 불편함(통증,쑤시는 느낌,
                  뻣뻣함, 화끈거리는 느낌, 무감각 혹은 찌릿찌릿함 등)을 느끼신 적이 있습니까?(오른쪽 그림을 참고하십시오)
                </p>
                <div className="question-article">
                  {this.customSpan('예', 'QCK', '1')}
                  {this.customSpan('아니오', 'QCK', '2')}
                </div>
              </div>
            </div>
            <div style={{ float: 'right', width: '10%' }}>
              <img src={PollImg} alt="pollImg" />
            </div>
          </div>
          <div className="examination-area">
            <div className="question-item">
              <table className="question-table">
                <colgroup>
                  <col style={{ width: '16%' }} />
                  {parts.map((p, index) => (
                    <col key={`COL_PART_${index}`} style={{ width: `${86 / parts.length}%` }} />
                  ))}
                </colgroup>
                <thead>
                  <tr>
                    <th>구분</th>
                    {parts.map((p, index) => (
                      <th key={`TH_PART_${index}`}>{p}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {acheQuestions.map((ache, rowIdx) => {
                    if (rowIdx === 3) {
                      return (
                        <>
                          <tr>
                            <th colSpan={2}>☞ 보기 : 아픈 정도에 대한 기준</th>
                            <th colSpan={parts.length - 1} style={{ textAlign: 'left' }}>
                              ■ 통 증 없 음 : 전혀 안 아프다.
                              <br />
                              ■ 약 한 통 증 : 약간 불편한 정도이나 작업에 열중할 때는 못 느낀다.
                              <br />
                              ■ 중 간 통 증 : 작업 중 통증이 있으나, 귀가 후 휴식을 취하면 괜찮다.
                              <br />
                              ■ 심 한 통 증 : 작업 중 통증이 비교적 심하고, 귀가 후에도 통증이 계속된다.
                              <br />
                              ■ 매우 심한 통증 : 통증 때문에 작업은 물론 일상생활을 하기가 어렵다.
                              <br />
                            </th>
                          </tr>
                          <tr key={`TR_ACHE_${rowIdx}`}>
                            <th style={{ textAlign: 'left' }}>{ache.title}</th>
                            {ache.fields.map((field, colIdx) => (
                              <td key={`TD_field_${rowIdx}_${colIdx}`} style={{ textAlign: 'left' }}>
                                {ache.questions.map((question, qIdx) => (
                                  <p>{this.customSpan(question.text, field, question.SEQ)}</p>
                                ))}
                              </td>
                            ))}
                          </tr>
                        </>
                      );
                    }
                    return (
                      <tr key={`TR_ACHE_${rowIdx}`}>
                        <th style={{ textAlign: 'left' }}>{ache.title}</th>
                        {ache.fields.map((field, colIdx) => (
                          <td key={`TD_field_${rowIdx}_${colIdx}`} style={{ textAlign: 'left' }}>
                            {ache.questions.map((question, qIdx) => {
                              if (field === 'Q41' || field === 'Q51') {
                                if (question.SEQ === '3' || question.SEQ === '4') {
                                  return <p>{this.customSpan(question.SEQ === '3' ? '있음' : '없음', field, question.SEQ)}</p>;
                                }
                                return null;
                              }
                              return <p>{this.customSpan(question.text, field, question.SEQ)}</p>;
                            })}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </StyledContentsWrapper>
        <AntdModal visible={modalVisible} title="부서 선택" onCancel={this.handleModalVisible} footer={null}>
          <DeptSelect
            onCancel={this.handleModalVisible}
            onComplete={dept => this.setState({ selectedDept: dept }, this.handleModalVisible)}
            rootDeptChange
            defaultRootDeptId={72761}
          />
        </AntdModal>
      </Styled>
    );
  }
}

View.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  result: PropTypes.object,
  getCallDataHandlerReturnRes: PropTypes.func,
};

View.defaultProps = {};

export default View;
