import React from 'react';
import PropTypes from 'prop-types';
import { Card, Input, Select, message } from 'antd';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import ContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
class InputPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eduDate: {},
      selectedDate: {},
      PARENT_WORK_SEQ: props.parentWorkSeq,
      PARENT_TASK_SEQ: props.parentTaskSeq,
      questions: {
        0: {
          title: '',
          firstSelection: '',
          secondSelection: '',
          thirdSelection: '',
          fourthSelection: '',
        },
        1: {
          title: '',
          firstSelection: '',
          secondSelection: '',
          thirdSelection: '',
          fourthSelection: '',
        },
        2: {
          title: '',
          firstSelection: '',
          secondSelection: '',
          thirdSelection: '',
          fourthSelection: '',
        },
        3: {
          title: '',
          firstSelection: '',
          secondSelection: '',
          thirdSelection: '',
          fourthSelection: '',
        },
        4: {
          title: '',
          firstSelection: '',
          secondSelection: '',
          thirdSelection: '',
          fourthSelection: '',
        },
      },
    };
  }

  questionsLenght = [1, 2, 3, 4, 5];

  componentDidMount() {
    this.getQuestions();
    this.getEducationDate();
    this.getEduacationYears();
    this.getEducationMonths();
  }

  getQuestions = () => {
    const { sagaKey: id, getCallDataHandler, parentWorkSeq, parentTaskSeq } = this.props;
    const apiArr = [
      {
        key: 'questions',
        url: `/api/eshs/v1/common/eduexam?PARENT_WORK_SEQ=${parentWorkSeq}&PARENT_TASK_SEQ=${parentTaskSeq}`,
        type: 'GET',
      },
    ];

    getCallDataHandler(id, apiArr, this.setQuestions);
  };

  setQuestions = () => {
    const { result } = this.props;
    const initQuestions = {
      0: {
        title: '',
        firstSelection: '',
        secondSelection: '',
        thirdSelection: '',
        fourthSelection: '',
      },
      1: {
        title: '',
        firstSelection: '',
        secondSelection: '',
        thirdSelection: '',
        fourthSelection: '',
      },
      2: {
        title: '',
        firstSelection: '',
        secondSelection: '',
        thirdSelection: '',
        fourthSelection: '',
      },
      3: {
        title: '',
        firstSelection: '',
        secondSelection: '',
        thirdSelection: '',
        fourthSelection: '',
      },
      4: {
        title: '',
        firstSelection: '',
        secondSelection: '',
        thirdSelection: '',
        fourthSelection: '',
      },
    };

    this.setState(prevState => ({
      questions:
        (result.questions &&
          result.questions.list &&
          result.questions.list[0] &&
          result.questions.list[0].QUESTIONS && { ...JSON.parse(result.questions.list[0].QUESTIONS) }) ||
        initQuestions,
      PARENT_WORK_SEQ:
        (result.questions && result.questions.list && result.questions.list[0] && result.questions.list[0].PARENT_WORK_SEQ) || prevState.PARENT_WORK_SEQ,
      PARENT_TASK_SEQ:
        (result.questions && result.questions.list && result.questions.list[0] && result.questions.list[0].PARENT_TASK_SEQ) || prevState.PARENT_TASK_SEQ,
    }));
  };

  getEducationDate = () => {
    const { sagaKey: id, getCallDataHandler, parentWorkSeq, parentTaskSeq } = this.props;
    const apiArr = [
      {
        key: 'eduDate',
        url: `/api/eshs/v1/common/edudate?WORK_SEQ=${parentWorkSeq}&TASK_SEQ=${parentTaskSeq}`,
        type: 'GET',
      },
    ];

    getCallDataHandler(id, apiArr, this.setEducationDate);
  };

  setEducationDate = () => {
    const { result } = this.props;
    this.setState({
      eduDate: (result.eduDate && result.eduDate.list.length && result.eduDate.list[0]) || {},
      selectedDate: (result.eduDate && result.eduDate.list.length && result.eduDate.list[0]) || {},
    });
  };

  handleInputChange = (no, key, value) => {
    const { questions } = this.state;
    const valueObj = Object.assign(questions[no], { [key]: value });
    this.setState(prevState => ({
      questions: Object.assign(prevState.questions, valueObj),
    }));
  };

  handleSelectChange = (key, value) => {
    const valueObj = { [key]: value };

    this.setState(
      prevState => ({
        selectedDate: Object.assign(prevState.selectedDate, valueObj),
      }),
      key === 'EDU_MONTH' ? this.getEducationInfoByDate : this.getEducationMonths,
    );
  };

  getEducationInfoByDate = () => {
    const { selectedDate } = this.state;
    const { sagaKey: id, getCallDataHandler } = this.props;

    const apiArr = [
      {
        key: 'questions',
        url: `/api/eshs/v1/common/edusearchbydate?EDU_YEAR=${selectedDate.EDU_YEAR}&EDU_MONTH=${selectedDate.EDU_MONTH}`,
        type: 'GET',
      },
    ];

    getCallDataHandler(id, apiArr, this.setQuestions);
  };

  getEduacationYears = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'educationYears',
        url: `/api/eshs/v1/common/eduyears`,
        type: 'GET',
      },
    ];

    getCallDataHandler(id, apiArr, this.getEducationMonths);
  };

  getEducationMonths = () => {
    const { selectedDate } = this.state;
    const { sagaKey: id, getCallDataHandler } = this.props;

    const apiArr = [
      {
        key: 'educationMonths',
        url: `/api/eshs/v1/common/edumonths?EDU_YEAR=${selectedDate.EDU_YEAR}`,
        type: 'GET',
      },
    ];

    getCallDataHandler(id, apiArr);
  };

  handleSaveClick = isModify => {
    const { questions, PARENT_WORK_SEQ, PARENT_TASK_SEQ } = this.state;
    const { sagaKey: id, submitHandlerBySaga, handleModalClose, profile, result } = this.props;
    const questionArr = [questions[0], questions[1], questions[2], questions[3], questions[4]]; // questions === object

    if (questionArr.filter(question => !question.answer).length) {
      return message.error('정답을 모두 입력해주세요.');
    }

    const apiArr = {
      PARAM: {
        PARENT_WORK_SEQ,
        PARENT_TASK_SEQ,
        QUESTIONS: JSON.stringify(questionArr),
        REG_USER_ID: profile.USER_ID,
        EXAM_ID: (result.questions && result.questions.list && result.questions.list[0] && result.questions.list[0].EXAM_ID) || '',
      },
    };

    if (isModify) {
      return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eduexam`, apiArr, handleModalClose);
    }

    return submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eduexam`, apiArr, handleModalClose);
  };

  render() {
    const { handleInputChange, handleSaveClick, handleSelectChange } = this;
    const { questionsLenght } = this;
    const { questions, eduDate, selectedDate } = this.state;
    const { handleModalClose, result } = this.props;
    const isModify = result.questions && result.questions.list && result.questions.list && result.questions.list[0] && result.questions.list[0].EXAM_ID;
    console.debug(isModify);
    return (
      <>
        <ContentsWrapper>
          <div className="selSaveWrapper alignLeft">
            <p style={{ display: 'inline-block', width: '5%', textAlign: 'center' }}>교육명</p>
            <p style={{ display: 'inline-block' }}>{`${Number(eduDate.EDU_YEAR)}년 ${Number(eduDate.EDU_MONTH)}월 정기교육`}</p>
          </div>
          <div className="selSaveWrapper">
            <p style={{ display: 'inline-block', width: '15%', textAlign: 'center' }}>이전 문제 가져오기</p>
            <AntdSelect className="mr5" value={selectedDate.EDU_YEAR} onChange={value => handleSelectChange('EDU_YEAR', value)} style={{ width: '15%' }}>
              {result.educationYears &&
                result.educationYears.list &&
                result.educationYears.list.map(year => <Select.Option value={year.EDU_YEAR.toString()}>{`${year.EDU_YEAR}년`}</Select.Option>)}
            </AntdSelect>
            <AntdSelect value={selectedDate.EDU_MONTH} onChange={value => handleSelectChange('EDU_MONTH', value)} style={{ width: '15%' }}>
              {result.educationMonths &&
                result.educationMonths.list &&
                result.educationMonths.list.map(month => <Select.Option value={month.EDU_MONTH}>{`${month.EDU_MONTH}월`}</Select.Option>)}
            </AntdSelect>
          </div>
        </ContentsWrapper>
        {questionsLenght.map((v, i) => (
          <div style={{ marginTop: '30px', marginLeft: '100px', marginBottom: '10px' }}>
            <Card
              title={
                <>
                  <div className="ant-card-head-title">{`${i + 1}번 문제`}</div>
                  <AntdInput
                    className="ant-input-block"
                    defaultValue={questions[i].title || ''}
                    value={questions[i].title || ''}
                    onChange={e => handleInputChange(i, 'title', e.target.value)}
                    placeholder="문제를 입력하세요."
                  />
                </>
              }
              style={{ width: '90%' }}
            >
              <div style={{ textAlign: 'right' }}>
                <p style={{ display: 'inline-block', width: '5%', textAlign: 'center' }}>정답</p>
                <AntdSelect
                  defaultValue={(questions[i] && questions[i].answer) || '정답'}
                  value={(questions[i] && questions[i].answer) || '정답'}
                  onChange={value => handleInputChange(i, 'answer', value)}
                  style={{ width: '20%', marginBottom: '10px' }}
                >
                  <Select.Option value={1}>1</Select.Option>
                  <Select.Option value={2}>2</Select.Option>
                  <Select.Option value={3}>3</Select.Option>
                  <Select.Option value={4}>4</Select.Option>
                </AntdSelect>
              </div>
              <p style={{ display: 'inline-block', width: '5%' }}>1.</p>
              <AntdInput
                className="ant-input-inline"
                defaultValue={questions[i].firstSelection || ''}
                value={questions[i].firstSelection || ''}
                onChange={e => handleInputChange(i, 'firstSelection', e.target.value)}
                placeholder="보기 1"
                style={{ width: '95%', marginBottom: '10px' }}
              />
              <p style={{ display: 'inline-block', width: '5%' }}>2.</p>
              <AntdInput
                className="ant-input-inline"
                defaultValue={questions[i].secondSelection || ''}
                value={questions[i].secondSelection || ''}
                onChange={e => handleInputChange(i, 'secondSelection', e.target.value)}
                placeholder="보기 2"
                style={{ width: '95%', marginBottom: '10px' }}
              />
              <p style={{ display: 'inline-block', width: '5%' }}>3.</p>
              <AntdInput
                className="ant-input-inline"
                defaultValue={questions[i].thirdSelection || ''}
                value={questions[i].thirdSelection || ''}
                onChange={e => handleInputChange(i, 'thirdSelection', e.target.value)}
                placeholder="보기 3"
                style={{ width: '95%', marginBottom: '10px' }}
              />
              <p style={{ display: 'inline-block', width: '5%' }}>4.</p>
              <AntdInput
                className="ant-input-inline"
                defaultValue={questions[i].fourthSelection || ''}
                value={questions[i].fourthSelection || ''}
                onChange={e => handleInputChange(i, 'fourthSelection', e.target.value)}
                placeholder="보기 4"
                style={{ width: '95%', marginBottom: '10px' }}
              />
            </Card>
          </div>
        ))}
        <div style={{ padding: '30px' }}>
          <StyledButton className="btn-primary mr5" onClick={() => handleSaveClick(isModify)}>
            {isModify ? '수정' : '저장'}
          </StyledButton>
          <StyledButton className="btn-light" onClick={handleModalClose}>
            취소
          </StyledButton>
        </div>
      </>
    );
  }
}

InputPage.propTypes = {
  handleModalClose: PropTypes.func,
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandler: PropTypes.func,
  parentTaskSeq: PropTypes.number,
  parentWorkSeq: PropTypes.number,
  profile: PropTypes.object,
  result: PropTypes.object,
};

InputPage.defaultProps = {
  handleModalClose: null,
  sagaKey: '',
  submitHandlerBySaga: null,
  getCallDataHandler: null,
  parentTaskSeq: -1,
  parentWorkSeq: -1,
  profile: null,
  result: null,
};

export default InputPage;
