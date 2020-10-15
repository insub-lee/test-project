import React, { Component } from 'react';
import { Radio, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import moment from 'moment';
import Styled from './Styled';

const currentYear = moment(new Date()).format('YYYY');
const today = moment(new Date()).format('YYYYMMDD');

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const { Option } = Select;

class SurveyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isload: false, // didmount 설문 진행여부 확인중 렌더 X
      isOpen: false, // 설문이 진행중인지 확인
      formData: {
        surveyType: 'stress',
        poSeq: -1,
        poyear: currentYear,
        job_type: '', // 직종
        bis_from: '', // 주요업무형태 (통상, 교대)
        gender: 'M', // 성별
        worktime: '', // 근속년수
        bigo: '', // 비고
        q1: '',
        q2: '',
        q3: '',
        q4: '',
        q5: '',
        q6: '',
        q7: '',
        q8: '',
        q9: '',
        q10: '',
        q11: '',
        q12: '',
        q13: '',
        q14: '',
        q15: '',
        q16: '',
        q17: '',
        q18: '',
        q19: '',
        q20: '',
        q21: '',
        q22: '',
        q23: '',
        q24: '',
        q25: '',
        q26: '',
        q27: '',
        q28: '',
        q29: '',
        q30: '',
        q31: '',
        q32: '',
        q33: '',
        q34: '',
        q35: '',
        q36: '',
        q37: '',
        q38: '',
        q39: '',
        q40: '',
        q41: '',
        q42: '',
        q43: '',
      },
    };
  }

  componentDidMount() {
    const { spinningOn } = this.props;
    spinningOn();
    this.checkOpenServey();
  }

  // 현재 설문조사가 진행중인지 확인
  checkOpenServey = () => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'checkOpenSurvey',
      type: 'POST',
      url: `/api/eshs/v1/common/healthPollMgt`,
      params: { PARAM: { type: 'CHECK_OPEN_SURVEY', surveyType: 'stress' } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.checkOpenServeyCallback);
  };

  checkOpenServeyCallback = (id, response) => {
    const { spinningOff } = this.props;
    const { formData } = this.state;
    const { result } = response;
    // 설문진행기간 중에만 설문페이지 OPEN
    if (result > 0) {
      this.setState({
        isload: true,
        isOpen: true,
        formData: {
          ...formData,
          poSeq: result,
        },
      });
    } else {
      this.setState({
        isload: true,
        isOpen: false,
      });
    }
    spinningOff();
  };

  onChangeFormData = (type, value, etc) => {
    const { formData } = this.state;
    // 특정 폼데이터가 바뀔때 다른 작업이 필요할 경우 해당 switch문 이용
    switch (type) {
      case '':
        break;
      default:
        break;
    }

    this.setState({
      formData: {
        ...formData,
        [type]: value,
      },
    });
  };

  // 설문지 valid Check
  validCheck = formData => {
    if (formData.job_type === '') return '직종을 선택하지 않으셨습니다.';
    if (formData.worktime === '') return '근속년수를 선택하지 않으셨습니다.';
    if (formData.bis_from === '') return '주요업무형태를 선택하지 않으셨습니다.';
    // 질문지 영역 valid check
    const noAnswer = [];
    for (let i = 1; i <= 43; i += 1) {
      if (formData[`q${i}`] === '') noAnswer.push(i);
    }

    if (noAnswer.length > 5) {
      return `총 ${noAnswer.length} 문항에 응답하지 않으셨습니다.`;
    }
    if (noAnswer.length <= 5 && noAnswer.length !== 0) {
      return `${noAnswer.join(', ')} 문항에 응답하지 않으셨습니다.`;
    }
    return '';
  };

  // 설문지 제출
  onSaveSurvey = () => {
    const { formData } = this.state;
    const { sagaKey: id, submitHandlerBySaga } = this.props;

    const msg = this.validCheck(formData);
    if (msg !== '') return message.error(<MessageContent>{msg}</MessageContent>);

    const submitData = {
      PARAM: {
        ...formData,
      },
    };

    return submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/health/eshsHealthPoll', submitData, this.onSaveCallback);
  };

  onSaveCallback = (id, response) => {
    const { result } = response;
    if (result > 0) return message.success(<MessageContent>설문을 제출하였습니다.</MessageContent>);
    return message.error(<MessageContent>설문제출에 실패하였습니다.</MessageContent>);
  };

  setSelectOption = (keyPrefix, textSuffix, startNum, endNum, increase) => {
    const options = [];
    for (let i = startNum; i <= endNum; i += increase) {
      options.push(<Option key={`${keyPrefix}_${i}`} value={String(i)}>{`${i}${textSuffix}`}</Option>);
    }
    return options;
  };

  setRadio = (key, val) => (
    <>
      <td>
        <Radio value="1" checked={val === '1'} onClick={e => this.onChangeFormData(key, e.target.value)} />
      </td>
      <td>
        <Radio value="2" checked={val === '2'} onClick={e => this.onChangeFormData(key, e.target.value)} />
      </td>
      <td>
        <Radio value="3" checked={val === '3'} onClick={e => this.onChangeFormData(key, e.target.value)} />
      </td>
      <td>
        <Radio value="4" checked={val === '4'} onClick={e => this.onChangeFormData(key, e.target.value)} />
      </td>
    </>
  );

  render() {
    const { profile } = this.props;
    const { isload, isOpen, formData } = this.state;
    // console.debug('확인', this.props);
    if (!isload) return '';
    return (
      <Styled>
        {isOpen ? (
          <>
            <div className="main_title_wrap">
              <h2 className="main_title">직무 스트레스 평가표</h2>
            </div>
            <h3 className="sub_title">I. 기본 조사표</h3>
            <StyledHtmlTable>
              <table>
                <colgroup>
                  <col width="12%" />
                  <col width="10%" />
                  <col width="20%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="18%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>성명</th>
                    <th>사번</th>
                    <th>부서</th>
                    <th>직종</th>
                    <th>근속년수</th>
                    <th>성별</th>
                    <th>주요업무형태</th>
                    <th>비고(직책 등)</th>
                  </tr>
                  <tr className="tr-center">
                    <td>{profile.NAME_KOR}</td>
                    <td>{profile.EMP_NO}</td>
                    <td>{profile.DEPT_NAME_KOR}</td>
                    <td>
                      <AntdSelect defaultValue="" className="select-xs" style={{ width: '80px' }} onChange={val => this.onChangeFormData('job_type', val)}>
                        <Option value="">선택</Option>
                        <Option value="사무직">사무직</Option>
                        <Option value="전임직">전임직</Option>
                      </AntdSelect>
                    </td>
                    <td>
                      <AntdSelect defaultValue="" className="select-xs" style={{ width: '80px' }} onChange={val => this.onChangeFormData('worktime', val)}>
                        <Option value="">선택</Option>
                        {this.setSelectOption('worktime', '년', 1, 40, 1)}
                      </AntdSelect>
                    </td>
                    <td>
                      <Radio.Group defaultValue="M" onChange={e => this.onChangeFormData('gender', e.target.value)}>
                        <Radio value="M">남</Radio>
                        <Radio value="F">여</Radio>
                      </Radio.Group>
                    </td>
                    <td>
                      <AntdSelect defaultValue="" className="select-xs" style={{ width: '80px' }} onChange={val => this.onChangeFormData('bis_from', val)}>
                        <Option value="">선택</Option>
                        <Option value="통상">통상</Option>
                        <Option value="교대">교대</Option>
                      </AntdSelect>
                    </td>
                    <td>
                      <AntdInput
                        defaultValue=""
                        className="ant-input-xs"
                        style={{ width: '100%' }}
                        onChange={e => this.onChangeFormData('bigo', e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </StyledHtmlTable>
            <h3 className="sub_title">II. 직무 스트레스 평가표 </h3>
            <StyledHtmlTable>
              <table>
                <colgroup>
                  <col width="5%" />
                  <col width="5%" />
                  <col width="50%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="10%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>범주</th>
                    <th>번호</th>
                    <th>항목</th>
                    <th>전혀 그렇지 않다</th>
                    <th>그렇지 않다</th>
                    <th>그렇다</th>
                    <th>매우 그렇다</th>
                  </tr>
                  <tr className="tr-center">
                    <td rowSpan={3}>
                      <p>물 리</p>
                      <p>환 경</p>
                    </td>
                    <td>1</td>
                    <td className="td-left">근무 장소가 깨끗하고 쾌적하다</td>
                    {this.setRadio('q1', formData.q1)}
                  </tr>
                  <tr className="tr-center">
                    <td>2</td>
                    <td className="td-left">내 일은 위험하며 사고를 당할 가능성이 있다</td>
                    {this.setRadio('q2', formData.q2)}
                  </tr>
                  <tr className="tr-center">
                    <td>3</td>
                    <td className="td-left">내 업무는 불편한 자세로 오랫동안 일을 해야한다</td>
                    {this.setRadio('q3', formData.q3)}
                  </tr>
                  <tr className="tr-center">
                    <td rowSpan={8}>
                      <p>직 무</p>
                      <p>요 구</p>
                    </td>
                    <td>4</td>
                    <td className="td-left">나는 일이 많아 항상 시간에 쫓기며 일하게 된다</td>
                    {this.setRadio('q4', formData.q4)}
                  </tr>
                  <tr className="tr-center">
                    <td>5</td>
                    <td className="td-left">현재 하던 일을 끝내기 전에 다른 일을 하도록 지시 받는다</td>
                    {this.setRadio('q5', formData.q5)}
                  </tr>
                  <tr className="tr-center">
                    <td>6</td>
                    <td className="td-left">업무량이 현저하게 증가하였다</td>
                    {this.setRadio('q6', formData.q6)}
                  </tr>
                  <tr className="tr-center">
                    <td>7</td>
                    <td className="td-left">나는 동료나 부하직원을 돌보고 책임져야 할 부담을 안고 있다</td>
                    {this.setRadio('q7', formData.q7)}
                  </tr>
                  <tr className="tr-center">
                    <td>8</td>
                    <td className="td-left">내 업무는 장시간 동안 집중력이 요구된다</td>
                    {this.setRadio('q8', formData.q8)}
                  </tr>
                  <tr className="tr-center">
                    <td>9</td>
                    <td className="td-left">업무 수행 중에 충분한 휴식(짬)이 주어진다</td>
                    {this.setRadio('q9', formData.q9)}
                  </tr>
                  <tr className="tr-center">
                    <td>10</td>
                    <td className="td-left">일이 많아서 직장과 가정에 다 잘하기가 힘들다</td>
                    {this.setRadio('q10', formData.q10)}
                  </tr>
                  <tr className="tr-center">
                    <td>11</td>
                    <td className="td-left">여러 가지 일을 동시에 해야 한다</td>
                    {this.setRadio('q11', formData.q11)}
                  </tr>
                  <tr className="tr-center">
                    <td rowSpan={5}>
                      <p>직 무</p>
                      <p>자 율</p>
                    </td>
                    <td>12</td>
                    <td className="td-left">내 업무는 창의력을 필요로 한다</td>
                    {this.setRadio('q12', formData.q12)}
                  </tr>
                  <tr className="tr-center">
                    <td>13</td>
                    <td className="td-left">업보관련사항(업보의 일정,업무량,회의시간 등)이 예고없이 갑작스럽게 정해지거나 바뀐다</td>
                    {this.setRadio('q13', formData.q13)}
                  </tr>
                  <tr className="tr-center">
                    <td>14</td>
                    <td className="td-left">내 업무를 수행하기 위해서는 높은 수준의 기술이나 지식이 필요하다</td>
                    {this.setRadio('q14', formData.q14)}
                  </tr>
                  <tr className="tr-center">
                    <td>15</td>
                    <td className="td-left">작업시간, 업무 수행 과정에서 나에게 결정권한이 주어지며 영향력을 행사할 수 있다</td>
                    {this.setRadio('q15', formData.q15)}
                  </tr>
                  <tr className="tr-center">
                    <td>16</td>
                    <td className="td-left">나의 업무량과 작업스케줄을 스스로 조절 할 수 있다</td>
                    {this.setRadio('q16', formData.q16)}
                  </tr>
                  <tr className="tr-center">
                    <td rowSpan={4}>
                      <p>관 계</p>
                      <p>갈 등</p>
                    </td>
                    <td>17</td>
                    <td className="td-left">나의 상사는 업무를 완료하는데 도움을 준다</td>
                    {this.setRadio('q17', formData.q17)}
                  </tr>
                  <tr className="tr-center">
                    <td>18</td>
                    <td className="td-left">나의 동료는 업무를 완료하는데 도움을 준다</td>
                    {this.setRadio('q18', formData.q18)}
                  </tr>
                  <tr className="tr-center">
                    <td>19</td>
                    <td className="td-left">직장에서 내가 힘들 때 내가 힘들다는 것을 알아주고 이해해 주는 사람이 있다</td>
                    {this.setRadio('q19', formData.q19)}
                  </tr>
                  <tr className="tr-center">
                    <td>20</td>
                    <td className="td-left">직장생활의 고충을 함께 나눌 동료가 있다</td>
                    {this.setRadio('q20', formData.q20)}
                  </tr>
                  <tr className="tr-center">
                    <td rowSpan={6}>
                      <p>직 무</p>
                      <p>불안정</p>
                    </td>
                    <td>21</td>
                    <td className="td-left">지금의 직장을 옮겨도 나에게 적합한 새로운 일을 쉽게 찾을 수 있다</td>
                    {this.setRadio('q21', formData.q21)}
                  </tr>
                  <tr className="tr-center">
                    <td>22</td>
                    <td className="td-left">현재의 직장을 그만두더라도 현재 수준만큼의 직업(직장)을 쉽게 구할 수 있다</td>
                    {this.setRadio('q22', formData.q22)}
                  </tr>
                  <tr className="tr-center">
                    <td>23</td>
                    <td className="td-left">직장사정이 불안하여 미래가 불확실하다</td>
                    {this.setRadio('q23', formData.q23)}
                  </tr>
                  <tr className="tr-center">
                    <td>24</td>
                    <td className="td-left">나의 직업은 실직하거나 해고당할 염려가 없다</td>
                    {this.setRadio('q24', formData.q24)}
                  </tr>
                  <tr className="tr-center">
                    <td>25</td>
                    <td className="td-left">앞으로 2년 동안 현재의 내 직업을 잃을 가능성이 있다</td>
                    {this.setRadio('q25', formData.q25)}
                  </tr>
                  <tr className="tr-center">
                    <td>26</td>
                    <td className="td-left">나의 근무조건이나 상황에 바람직하지 못한 변화(예: 구조조정 등)가 있었거나 있을 것으로 예상된다</td>
                    {this.setRadio('q26', formData.q26)}
                  </tr>
                  <tr className="tr-center">
                    <td rowSpan={7}>
                      <p>조 직</p>
                      <p>체 계</p>
                    </td>
                    <td>27</td>
                    <td className="td-left">우리 직장은 근무평가, 인사제도(승진, 부서배치 등)는 공정하고 합리적이다</td>
                    {this.setRadio('q27', formData.q27)}
                  </tr>
                  <tr className="tr-center">
                    <td>28</td>
                    <td className="td-left">업무 수행에 필요한 인원, 공간, 시설, 장비, 훈련 등의 지원이 잘 이루어지고 있다</td>
                    {this.setRadio('q28', formData.q28)}
                  </tr>
                  <tr className="tr-center">
                    <td>29</td>
                    <td className="td-left">우리 부서와 타부서 간에는 마찰이 없고 업무 협조가 잘 이루어진다</td>
                    {this.setRadio('q29', formData.q29)}
                  </tr>
                  <tr className="tr-center">
                    <td>30</td>
                    <td className="td-left">우리 부서와 타부서 간에는 마찰이 없고 업무 협조가 잘 이루어진다</td>
                    {this.setRadio('q30', formData.q30)}
                  </tr>
                  <tr className="tr-center">
                    <td>31</td>
                    <td className="td-left">일에대한 나의 생각을 반영할 수 있는 기회와 통로가 있다</td>
                    {this.setRadio('q31', formData.q31)}
                  </tr>
                  <tr className="tr-center">
                    <td>32</td>
                    <td className="td-left">나의 경력개발과 승진은 무난히 잘 될 것으로 예상된다</td>
                    {this.setRadio('q32', formData.q32)}
                  </tr>
                  <tr className="tr-center">
                    <td>33</td>
                    <td className="td-left">내 현재 직위는 나의 교육 및 경력에 비추어 볼 때 적절하다</td>
                    {this.setRadio('q33', formData.q33)}
                  </tr>
                  <tr className="tr-center">
                    <td rowSpan={6}>
                      <p>보 상</p>
                      <p>부적절</p>
                    </td>
                    <td>34</td>
                    <td className="td-left">나의 직업은 내가 평소 기대했던 것이 미치지 못한다</td>
                    {this.setRadio('q34', formData.q34)}
                  </tr>
                  <tr className="tr-center">
                    <td>35</td>
                    <td className="td-left">나의 모든 노력과 업적을 고려할 때 내 봉급/수입은 적절하다</td>
                    {this.setRadio('q35', formData.q35)}
                  </tr>
                  <tr className="tr-center">
                    <td>36</td>
                    <td className="td-left">나의 모든 노력과 업적을 고려할 때 나는 직장에서 적절하게 존중과 신임을 받고 있다</td>
                    {this.setRadio('q36', formData.q36)}
                  </tr>
                  <tr className="tr-center">
                    <td>37</td>
                    <td className="td-left">나는 지금 하는 일에 흥미를 느낀다</td>
                    {this.setRadio('q37', formData.q37)}
                  </tr>
                  <tr className="tr-center">
                    <td>38</td>
                    <td className="td-left">내 사정이 앞으로 더 좋아질 것을 생각하면 힘든 줄 모르고 일하게 된다</td>
                    {this.setRadio('q38', formData.q38)}
                  </tr>
                  <tr className="tr-center">
                    <td>39</td>
                    <td className="td-left">나의 능력을 개발하고 발휘할 수 있는 기회가 주어진다</td>
                    {this.setRadio('q39', formData.q39)}
                  </tr>
                  <tr className="tr-center">
                    <td rowSpan={4}>
                      <p>직 장</p>
                      <p>문 화</p>
                    </td>
                    <td>40</td>
                    <td className="td-left">회식자리가 불편하다</td>
                    {this.setRadio('q40', formData.q40)}
                  </tr>
                  <tr className="tr-center">
                    <td>41</td>
                    <td className="td-left">나는 기준이나 일관성이 없는 상태로 업무지시를 받는다</td>
                    {this.setRadio('q41', formData.q41)}
                  </tr>
                  <tr className="tr-center">
                    <td>42</td>
                    <td className="td-left">직장의 분위기가 권위적이고 수직적이다</td>
                    {this.setRadio('q42', formData.q42)}
                  </tr>
                  <tr className="tr-center">
                    <td>43</td>
                    <td className="td-left">남성, 여성이라는 성적인 차이 때문에 불이익을 받는다</td>
                    {this.setRadio('q43', formData.q43)}
                  </tr>
                </tbody>
              </table>
            </StyledHtmlTable>
            <StyledButtonWrapper className=" btn-wrap-center btn-wrap-mt-20  btn-wrap-mb-10">
              <StyledButton className="btn-primary" onClick={this.onSaveSurvey}>
                설문완료하기
              </StyledButton>
            </StyledButtonWrapper>
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <p>
                <b>※ 협조해 주셔서 대단히 감사합니다. </b>
              </p>
            </div>
          </>
        ) : (
          <div style={{ width: '100%', textAlign: 'center', padding: '50px' }}>
            <span style={{ fontWeight: 600, fontSize: 20 }}>직무관련 설문조사 진행기간이 아닙니다.</span>
          </div>
        )}
      </Styled>
    );
  }
}

SurveyPage.propTypes = {
  profile: PropTypes.object,
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
};

SurveyPage.defaultProps = {
  sagaKey: '',
  getCallDataHandlerReturnRes: () => false,
  submitHandlerBySaga: () => false,
  spinningOn: () => false,
  spinningOff: () => false,
};

export default SurveyPage;
