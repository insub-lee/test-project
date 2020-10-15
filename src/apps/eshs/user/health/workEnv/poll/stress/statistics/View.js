import React, { Component } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import Styled from './Styled';

const AntdSelect = StyledSelect(Select);
const { Option } = Select;

class StressView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isload: false,
      selectedPoll: -1,
      formData: {},
    };
  }

  componentDidMount() {
    const { spinningOn } = this.props;
    spinningOn();
    this.init();
  }

  // 첫 진입시
  init = () => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    this.setState({ isload: false });
    const apiInfo = {
      key: 'getStressPollResult',
      type: 'POST',
      url: `/api/eshs/v1/common/healthPollMgt`,
      params: { PARAM: { type: 'GET_STRESS_SURVEY_RESULT_INIT' } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.checkOpenServeyCallback);
  };

  checkOpenServeyCallback = (id, response) => {
    const { spinningOff } = this.props;
    const { list, info } = response;
    const surveydata = this.setSurveyData(info);
    this.setState({
      pollList: list || [],
      selectedPoll: (list && list[0] && list[0].POSEQ) || -1,
      formData: {
        ...surveydata,
      },
    });
    this.setState({ isload: true });
    spinningOff();
  };

  setSurveyData = info => {
    const result = {
      ...info,
      DEPT: (info.DEPT && JSON.parse(info.DEPT.value)) || [],
      BIS_FROM: (info.BIS_FROM && JSON.parse(info.BIS_FROM.value)) || [],
      JOB_TYPE: (info.JOB_TYPE && JSON.parse(info.JOB_TYPE.value)) || [],
      WORKTIME: (info.WORKTIME && JSON.parse(info.WORKTIME.value)) || [],
      GENDER: (info.GENDER && JSON.parse(info.GENDER.value)) || [],
    };
    for (let i = 1; i <= 43; i += 1) {
      const key = `Q${i}`;
      result[key] = (info[key] && JSON.parse(info[key].value)) || [];
    }
    return result;
  };

  // 검색버튼
  onSearch = () => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const { selectedPoll } = this.state;
    if (selectedPoll === -1 || selectedPoll === '') return false;
    const apiInfo = {
      key: 'getStressPollResult',
      type: 'POST',
      url: `/api/eshs/v1/common/healthPollMgt`,
      params: { PARAM: { type: 'GET_STRESS_SURVEY_RESULT', POSEQ: selectedPoll } },
    };
    return getCallDataHandlerReturnRes(id, apiInfo, this.onSearchCallback);
  };

  onSearchCallback = (id, response) => {
    const { info } = response;
    const surveydata = this.setSurveyData(info);
    this.setState({
      formData: {
        ...surveydata,
      },
    });
  };

  // 기본 조사 통계
  setStressBasic = data => (
    <>
      {data.length > 0 ? (
        data.map(item => (
          <p>
            {item.TYPE} : {item.COUNT} 명
          </p>
        ))
      ) : (
        <p>설문조사 통계 결과가 없습니다.</p>
      )}
    </>
  );

  // 직무 스트레스 평가 통계
  setSurveyResult = (key, data) => (
    <>
      <td>{data.length > 0 ? (data.find(item => item.TYPE === '1') && data.find(item => item.TYPE === '1').COUNT) || 0 : 0} 명</td>
      <td>{data.length > 0 ? (data.find(item => item.TYPE === '2') && data.find(item => item.TYPE === '2').COUNT) || 0 : 0} 명</td>
      <td>{data.length > 0 ? (data.find(item => item.TYPE === '3') && data.find(item => item.TYPE === '3').COUNT) || 0 : 0} 명</td>
      <td>{data.length > 0 ? (data.find(item => item.TYPE === '4') && data.find(item => item.TYPE === '4').COUNT) || 0 : 0} 명</td>
    </>
  );

  render() {
    const { isload, formData, pollList } = this.state;
    if (!isload) return '';
    return (
      <Styled>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <AntdSelect
              defaultValue={(pollList[0] && pollList[0].POSEQ) || -1}
              placehoder="조회하실 설문을 선택해 주십시오"
              className="select-sm mr5"
              style={{ width: 350 }}
              onChange={val => this.setState({ selectedPoll: val })}
            >
              {pollList.map(item => (
                <Option value={item.POSEQ}>{`${item.POYEAR} - ${item.POTYPE} :: ${item.SDATE} ~ ${item.EDATE}`}</Option>
              ))}
            </AntdSelect>
            <StyledButton className="btn-gray btn-sm" onClick={this.onSearch}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearchWrapper>
        <h3 className="sub_title">I. 기본 조사 통계</h3>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="10%" />
              <col width="10%" />
              <col width="80%" />
            </colgroup>
            <tbody>
              <tr className="tr-center">
                <th rowSpan={7}>
                  <p>기 본 조 사</p>
                  <p>통 계</p>
                </th>
                <th>조사기간</th>
                <td className="td-left">
                  <p>{`${formData.SDATE} ~ ${formData.EDATE}`}</p>
                </td>
              </tr>
              <tr className="tr-center">
                <th>총 응답인원</th>
                <td className="td-left">
                  <p>{formData.RESPONDENTS || 0} 명</p>
                </td>
              </tr>
              <tr className="tr-center">
                <th>부서</th>
                <td className="td-left">{this.setStressBasic(formData.DEPT || [])}</td>
              </tr>
              <tr className="tr-center">
                <th>직종</th>
                <td className="td-left">{this.setStressBasic(formData.JOB_TYPE || [])}</td>
              </tr>
              <tr className="tr-center">
                <th>근속년수</th>
                <td className="td-left">{this.setStressBasic(formData.WORKTIME || [])}</td>
              </tr>
              <tr className="tr-center">
                <th>성별</th>
                <td className="td-left">{this.setStressBasic(formData.GENDER || [])}</td>
              </tr>
              <tr className="tr-center">
                <th>주요업무형태</th>
                <td className="td-left">{this.setStressBasic(formData.BIS_FROM || [])}</td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <h3 className="sub_title">II. 직무 스트레스 평가통계</h3>
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
                {this.setSurveyResult('q1', formData.Q1)}
              </tr>
              <tr className="tr-center">
                <td>2</td>
                <td className="td-left">내 일은 위험하며 사고를 당할 가능성이 있다</td>
                {this.setSurveyResult('q2', formData.Q2)}
              </tr>
              <tr className="tr-center">
                <td>3</td>
                <td className="td-left">내 업무는 불편한 자세로 오랫동안 일을 해야한다</td>
                {this.setSurveyResult('q3', formData.Q3)}
              </tr>
              <tr className="tr-center">
                <td rowSpan={8}>
                  <p>직 무</p>
                  <p>요 구</p>
                </td>
                <td>4</td>
                <td className="td-left">나는 일이 많아 항상 시간에 쫓기며 일하게 된다</td>
                {this.setSurveyResult('q4', formData.Q4)}
              </tr>
              <tr className="tr-center">
                <td>5</td>
                <td className="td-left">현재 하던 일을 끝내기 전에 다른 일을 하도록 지시 받는다</td>
                {this.setSurveyResult('q5', formData.Q5)}
              </tr>
              <tr className="tr-center">
                <td>6</td>
                <td className="td-left">업무량이 현저하게 증가하였다</td>
                {this.setSurveyResult('q6', formData.Q6)}
              </tr>
              <tr className="tr-center">
                <td>7</td>
                <td className="td-left">나는 동료나 부하직원을 돌보고 책임져야 할 부담을 안고 있다</td>
                {this.setSurveyResult('q7', formData.Q7)}
              </tr>
              <tr className="tr-center">
                <td>8</td>
                <td className="td-left">내 업무는 장시간 동안 집중력이 요구된다</td>
                {this.setSurveyResult('q8', formData.Q8)}
              </tr>
              <tr className="tr-center">
                <td>9</td>
                <td className="td-left">업무 수행 중에 충분한 휴식(짬)이 주어진다</td>
                {this.setSurveyResult('q9', formData.Q9)}
              </tr>
              <tr className="tr-center">
                <td>10</td>
                <td className="td-left">일이 많아서 직장과 가정에 다 잘하기가 힘들다</td>
                {this.setSurveyResult('q10', formData.Q10)}
              </tr>
              <tr className="tr-center">
                <td>11</td>
                <td className="td-left">여러 가지 일을 동시에 해야 한다</td>
                {this.setSurveyResult('q11', formData.Q11)}
              </tr>
              <tr className="tr-center">
                <td rowSpan={5}>
                  <p>직 무</p>
                  <p>자 율</p>
                </td>
                <td>12</td>
                <td className="td-left">내 업무는 창의력을 필요로 한다</td>
                {this.setSurveyResult('q12', formData.Q12)}
              </tr>
              <tr className="tr-center">
                <td>13</td>
                <td className="td-left">업보관련사항(업보의 일정,업무량,회의시간 등)이 예고없이 갑작스럽게 정해지거나 바뀐다</td>
                {this.setSurveyResult('q13', formData.Q13)}
              </tr>
              <tr className="tr-center">
                <td>14</td>
                <td className="td-left">내 업무를 수행하기 위해서는 높은 수준의 기술이나 지식이 필요하다</td>
                {this.setSurveyResult('q14', formData.Q14)}
              </tr>
              <tr className="tr-center">
                <td>15</td>
                <td className="td-left">작업시간, 업무 수행 과정에서 나에게 결정권한이 주어지며 영향력을 행사할 수 있다</td>
                {this.setSurveyResult('q15', formData.Q15)}
              </tr>
              <tr className="tr-center">
                <td>16</td>
                <td className="td-left">나의 업무량과 작업스케줄을 스스로 조절 할 수 있다</td>
                {this.setSurveyResult('q16', formData.Q16)}
              </tr>
              <tr className="tr-center">
                <td rowSpan={4}>
                  <p>관 계</p>
                  <p>갈 등</p>
                </td>
                <td>17</td>
                <td className="td-left">나의 상사는 업무를 완료하는데 도움을 준다</td>
                {this.setSurveyResult('q17', formData.Q17)}
              </tr>
              <tr className="tr-center">
                <td>18</td>
                <td className="td-left">나의 동료는 업무를 완료하는데 도움을 준다</td>
                {this.setSurveyResult('q18', formData.Q18)}
              </tr>
              <tr className="tr-center">
                <td>19</td>
                <td className="td-left">직장에서 내가 힘들 때 내가 힘들다는 것을 알아주고 이해해 주는 사람이 있다</td>
                {this.setSurveyResult('q19', formData.Q19)}
              </tr>
              <tr className="tr-center">
                <td>20</td>
                <td className="td-left">직장생활의 고충을 함께 나눌 동료가 있다</td>
                {this.setSurveyResult('q20', formData.Q20)}
              </tr>
              <tr className="tr-center">
                <td rowSpan={6}>
                  <p>직 무</p>
                  <p>불안정</p>
                </td>
                <td>21</td>
                <td className="td-left">지금의 직장을 옮겨도 나에게 적합한 새로운 일을 쉽게 찾을 수 있다</td>
                {this.setSurveyResult('q21', formData.Q21)}
              </tr>
              <tr className="tr-center">
                <td>22</td>
                <td className="td-left">현재의 직장을 그만두더라도 현재 수준만큼의 직업(직장)을 쉽게 구할 수 있다</td>
                {this.setSurveyResult('q22', formData.Q22)}
              </tr>
              <tr className="tr-center">
                <td>23</td>
                <td className="td-left">직장사정이 불안하여 미래가 불확실하다</td>
                {this.setSurveyResult('q23', formData.Q23)}
              </tr>
              <tr className="tr-center">
                <td>24</td>
                <td className="td-left">나의 직업은 실직하거나 해고당할 염려가 없다</td>
                {this.setSurveyResult('q24', formData.Q24)}
              </tr>
              <tr className="tr-center">
                <td>25</td>
                <td className="td-left">앞으로 2년 동안 현재의 내 직업을 잃을 가능성이 있다</td>
                {this.setSurveyResult('q25', formData.Q25)}
              </tr>
              <tr className="tr-center">
                <td>26</td>
                <td className="td-left">나의 근무조건이나 상황에 바람직하지 못한 변화(예: 구조조정 등)가 있었거나 있을 것으로 예상된다</td>
                {this.setSurveyResult('q26', formData.Q26)}
              </tr>
              <tr className="tr-center">
                <td rowSpan={7}>
                  <p>조 직</p>
                  <p>체 계</p>
                </td>
                <td>27</td>
                <td className="td-left">우리 직장은 근무평가, 인사제도(승진, 부서배치 등)는 공정하고 합리적이다</td>
                {this.setSurveyResult('q27', formData.Q27)}
              </tr>
              <tr className="tr-center">
                <td>28</td>
                <td className="td-left">업무 수행에 필요한 인원, 공간, 시설, 장비, 훈련 등의 지원이 잘 이루어지고 있다</td>
                {this.setSurveyResult('q28', formData.Q28)}
              </tr>
              <tr className="tr-center">
                <td>29</td>
                <td className="td-left">우리 부서와 타부서 간에는 마찰이 없고 업무 협조가 잘 이루어진다</td>
                {this.setSurveyResult('q29', formData.Q29)}
              </tr>
              <tr className="tr-center">
                <td>30</td>
                <td className="td-left">우리 부서와 타부서 간에는 마찰이 없고 업무 협조가 잘 이루어진다</td>
                {this.setSurveyResult('q30', formData.Q30)}
              </tr>
              <tr className="tr-center">
                <td>31</td>
                <td className="td-left">일에대한 나의 생각을 반영할 수 있는 기회와 통로가 있다</td>
                {this.setSurveyResult('q31', formData.Q31)}
              </tr>
              <tr className="tr-center">
                <td>32</td>
                <td className="td-left">나의 경력개발과 승진은 무난히 잘 될 것으로 예상된다</td>
                {this.setSurveyResult('q32', formData.Q32)}
              </tr>
              <tr className="tr-center">
                <td>33</td>
                <td className="td-left">내 현재 직위는 나의 교육 및 경력에 비추어 볼 때 적절하다</td>
                {this.setSurveyResult('q33', formData.Q33)}
              </tr>
              <tr className="tr-center">
                <td rowSpan={6}>
                  <p>보 상</p>
                  <p>부적절</p>
                </td>
                <td>34</td>
                <td className="td-left">나의 직업은 내가 평소 기대했던 것이 미치지 못한다</td>
                {this.setSurveyResult('q34', formData.Q34)}
              </tr>
              <tr className="tr-center">
                <td>35</td>
                <td className="td-left">나의 모든 노력과 업적을 고려할 때 내 봉급/수입은 적절하다</td>
                {this.setSurveyResult('q35', formData.Q35)}
              </tr>
              <tr className="tr-center">
                <td>36</td>
                <td className="td-left">나의 모든 노력과 업적을 고려할 때 나는 직장에서 적절하게 존중과 신임을 받고 있다</td>
                {this.setSurveyResult('q36', formData.Q36)}
              </tr>
              <tr className="tr-center">
                <td>37</td>
                <td className="td-left">나는 지금 하는 일에 흥미를 느낀다</td>
                {this.setSurveyResult('q37', formData.Q37)}
              </tr>
              <tr className="tr-center">
                <td>38</td>
                <td className="td-left">내 사정이 앞으로 더 좋아질 것을 생각하면 힘든 줄 모르고 일하게 된다</td>
                {this.setSurveyResult('q38', formData.Q38)}
              </tr>
              <tr className="tr-center">
                <td>39</td>
                <td className="td-left">나의 능력을 개발하고 발휘할 수 있는 기회가 주어진다</td>
                {this.setSurveyResult('q39', formData.Q39)}
              </tr>
              <tr className="tr-center">
                <td rowSpan={4}>
                  <p>직 장</p>
                  <p>문 화</p>
                </td>
                <td>40</td>
                <td className="td-left">회식자리가 불편하다</td>
                {this.setSurveyResult('q40', formData.Q40)}
              </tr>
              <tr className="tr-center">
                <td>41</td>
                <td className="td-left">나는 기준이나 일관성이 없는 상태로 업무지시를 받는다</td>
                {this.setSurveyResult('q41', formData.Q41)}
              </tr>
              <tr className="tr-center">
                <td>42</td>
                <td className="td-left">직장의 분위기가 권위적이고 수직적이다</td>
                {this.setSurveyResult('q42', formData.Q42)}
              </tr>
              <tr className="tr-center">
                <td>43</td>
                <td className="td-left">남성, 여성이라는 성적인 차이 때문에 불이익을 받는다</td>
                {this.setSurveyResult('q43', formData.Q43)}
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
      </Styled>
    );
  }
}

StressView.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
};

StressView.defaultProps = {
  sagaKey: '',
  getCallDataHandlerReturnRes: () => false,
  spinningOn: () => false,
  spinningOff: () => false,
};

export default StressView;
