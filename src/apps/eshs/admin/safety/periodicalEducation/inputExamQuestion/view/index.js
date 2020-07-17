/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, message, Radio, Result } from 'antd';
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
      videoId: '',
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
    const { sagaKey: id, getCallDataHandler, parentWorkSeq, parentTaskSeq, CONFIG, seq } = this.props;
    const apiArr = [
      {
        key: 'questions',
        url: `/api/eshs/v1/common/eduexam?PARENT_WORK_SEQ=${parentWorkSeq}&PARENT_TASK_SEQ=${parentTaskSeq}&SEQ=${
          seq && seq !== -1 ? seq : (CONFIG && CONFIG.property && CONFIG.property.SEQ) || -1
        }`,
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
      videoId: (result.questions && result.questions.list && result.questions.list[0] && result.questions.list[0].VIDEO_ID) || '',
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
    const { questions, answers, PARENT_TASK_SEQ, videoId } = this.state;
    const { sagaKey: id, submitHandlerBySaga, handleModalClose, result, getDataSource, CONFIG, seq } = this.props;
    const correctAnswers = [questions[0].answer, questions[1].answer, questions[2].answer, questions[3].answer, questions[4].answer];
    const selectedAnswers = Object.values(answers);

    if (selectedAnswers.length < 5) {
      return message.warn('답을 모두 선택하세요.');
    }

    if (!answers.isWatchwEducationVideo || answers.isWatchwEducationVideo === 'N' || !videoId) {
      return message.warn('영상을 모두 시청해주세요.');
    }

    let score = 0;
    for (let i = 0; i < correctAnswers.length; i += 1) {
      if (correctAnswers[i] === selectedAnswers[i]) {
        score += 1;
      }
    }

    const apiArr = {
      PARENT_TASK_SEQ,
      SCORE: score,
      EXAM_ID: (result.questions && result.questions.list.length && result.questions.list[0].EXAM_ID) || '',
      SEQ: seq || CONFIG.property.SEQ,
    };

    const afterSubmitFunc = () => {
      getDataSource();
      handleModalClose();
      if (score >= 3) {
        return message.open({
          content: (
            <Result status="success" title="정기교육 시험에 합격하셨습니다." subTitle="합격을 축하드립니다. 다음 정기교육 일정은 사내 메일로 발송됩니다." />
          ),
        });
      }
      return message.open({
        content: (
          <Result status="warning" title="정기교육 시험에 불합격하셨습니다." subTitle="시험에 불합격하셨습니다. 2차 시험 일정은 사내 메일로 발송됩니다." />
        ),
      });
    };

    return submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eduexamresult', apiArr, afterSubmitFunc);
  };

  render() {
    const { handleRadioSelect, handleSaveClick } = this;
    const { questionsLenght } = this;
    const { questions, eduDate, videoId } = this.state;
    const { handleModalClose } = this.props;
    return (
      <>
        <ContentsWrapper>
          <div className="selSaveWrapper alignLeft">
            <p style={{ display: 'inline-block', width: '5%', textAlign: 'center' }}>교육명</p>
            <p style={{ display: 'inline-block' }}>{`${Number(eduDate.EDU_YEAR)}년 ${Number(eduDate.EDU_MONTH)}월 정기교육`}</p>
          </div>
          <div style={{ marginTop: '30px', marginLeft: '100px', marginBottom: '10px' }}>
            <Card
              title={
                <>
                  <div className="ant-card-head-title">교육 영상</div>
                </>
              }
              style={{ width: '90%', height: videoId ? '600px' : '200px' }}
            >
              {videoId ? (
                <iframe
                  title="test"
                  width="100%"
                  height="425px"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : null}
            </Card>
          </div>
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
          <div style={{ marginTop: '30px', marginLeft: '100px', marginBottom: '10px' }}>
            <Card
              title={
                <>
                  <div className="ant-card-head-title">교육 영상을 모두 시청하셨습니까?</div>
                </>
              }
              style={{ width: '90%' }}
            >
              <Radio.Group
                buttonStyle="solid"
                style={{ width: '100%', textAlign: 'left' }}
                onChange={e => handleRadioSelect('isWatchwEducationVideo', e.target.value)}
              >
                <div style={{ marginBottom: '10px' }}>
                  <Radio.Button style={{ width: '100%' }} value="Y">
                    예
                  </Radio.Button>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Radio.Button style={{ width: '100%' }} value="N">
                    아니오
                  </Radio.Button>
                </div>
              </Radio.Group>
            </Card>
          </div>
          <div style={{ padding: '30px', textAlign: 'center' }}>
            <StyledButton className="btn-primary mr5" onClick={handleSaveClick}>
              제출
            </StyledButton>
            <StyledButton className="btn-light" onClick={handleModalClose}>
              취소
            </StyledButton>
          </div>
        </ContentsWrapper>
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
  result: PropTypes.object,
  getDataSource: PropTypes.func,
  CONFIG: PropTypes.object,
  seq: PropTypes.number,
};

ViewPage.defaultProps = {
  handleModalClose: null,
  sagaKey: '',
  submitHandlerBySaga: null,
  getCallDataHandler: null,
  parentTaskSeq: -1,
  parentWorkSeq: -1,
  result: null,
  getDataSource: () => {},
};

export default ViewPage;
