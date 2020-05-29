/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, message, Radio } from 'antd';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import ContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';

class ViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eduDate: {},
      selectedDate: {},
      PARENT_WORK_SEQ: props.parentWorkSeq,
      PARENT_TASK_SEQ: props.parentTaskSeq,
      answers: {},
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

  handleRadioSelect = (key, value) => {
    this.setState(prevState => ({
      answers: Object.assign(prevState.answers, { [key]: value }),
    }));
  };

  handleSaveClick = () => {
    const { questions, answers, PARENT_TASK_SEQ } = this.state;
    const { sagaKey: id, submitHandlerBySaga, handleModalClose, profile, result, getDataSource } = this.props;
    const originAnswers = [questions[0].answer, questions[1].answer, questions[2].answer, questions[3].answer, questions[4].answer];
    const selectedAnswers = Object.values(answers);

    if (selectedAnswers.length < 5) {
      return message.error('답을 모두 선택하세요.');
    }

    let score = 0;
    for (let i = 0; i < originAnswers.length; i += 1) {
      if (originAnswers[i] === selectedAnswers[i]) {
        score += 1;
      }

      if (score >= 3) {
        break;
      }
    }

    const apiArr = {
      PARAM: {
        PARENT_TASK_SEQ,
        SCORE: score,
        USER_ID: profile.USER_ID,
        EXAM_ID: (result.questions && result.questions.list.length && result.questions.list[0].EXAM_ID) || '',
      },
    };

    const afterSubmitFunc = async () => {
      await getDataSource();
      handleModalClose();
    };

    return submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eduexamresult', apiArr, afterSubmitFunc);
  };

  render() {
    const { handleRadioSelect, handleSaveClick } = this;
    const { questionsLenght } = this;
    const { questions, eduDate } = this.state;
    const { handleModalClose } = this.props;
    return (
      <>
        <ContentsWrapper>
          <div className="selSaveWrapper alignLeft">
            <p style={{ display: 'inline-block', width: '5%', textAlign: 'center' }}>교육명</p>
            <p style={{ display: 'inline-block' }}>{`${Number(eduDate.EDU_YEAR)}년 ${Number(eduDate.EDU_MONTH)}월 정기교육`}</p>
          </div>
        </ContentsWrapper>
        {questionsLenght.map((v, i) => (
          <div style={{ marginTop: '30px', marginLeft: '100px', marginBottom: '10px' }}>
            <Card
              title={
                <>
                  <div className="ant-card-head-title">{`${i + 1}번 문제`}</div>
                  <p>{questions[i].title || ''}</p>
                </>
              }
              style={{ width: '90%' }}
            >
              <Radio.Group buttonStyle="solid" style={{ width: '100%', textAlign: 'left' }} onChange={e => handleRadioSelect(`${i}`, e.target.value)}>
                <div style={{ marginBottom: '10px' }}>
                  <Radio.Button style={{ width: '100%' }} value={1}>
                    {questions[i].firstSelection}
                  </Radio.Button>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Radio.Button style={{ width: '100%' }} value={2}>
                    {questions[i].secondSelection}
                  </Radio.Button>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Radio.Button style={{ width: '100%' }} value={3}>
                    {questions[i].thirdSelection}
                  </Radio.Button>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Radio.Button style={{ width: '100%' }} value={4}>
                    {questions[i].fourthSelection}
                  </Radio.Button>
                </div>
              </Radio.Group>
            </Card>
          </div>
        ))}
        <div style={{ padding: '30px', textAlign: 'center' }}>
          <StyledButton className="btn-primary mr5" onClick={handleSaveClick}>
            제출
          </StyledButton>
          <StyledButton className="btn-light" onClick={handleModalClose}>
            취소
          </StyledButton>
        </div>
      </>
    );
  }
}

ViewPage.propTypes = {
  handleModalClose: PropTypes.func,
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandler: PropTypes.func,
  parentTaskSeq: PropTypes.number,
  parentWorkSeq: PropTypes.number,
  profile: PropTypes.object,
  result: PropTypes.object,
  getDataSource: PropTypes.func,
};

ViewPage.defaultProps = {
  handleModalClose: null,
  sagaKey: '',
  submitHandlerBySaga: null,
  getCallDataHandler: null,
  parentTaskSeq: -1,
  parentWorkSeq: -1,
  profile: null,
  result: null,
  getDataSource: () => {},
};

export default ViewPage;
