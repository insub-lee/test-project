import React from 'react';
import PropTypes from 'prop-types';
import { Card, Input, Select } from 'antd';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
class InputPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  componentDidMount() {
    this.getQuestions();
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
    this.setState(prevState => ({
      questions:
        (result.questions && result.questions.list.length && result.questions.list[0].QUESTIONS && { ...JSON.parse(result.questions.list[0].QUESTIONS) }) ||
        prevState.questions,
    }));
  };

  handleInputChange = (no, key, value) => {
    const { questions } = this.state;
    const valueObj = Object.assign(questions[no], { [key]: value });
    this.setState(prevState => ({
      questions: Object.assign(prevState.questions, valueObj),
    }));
  };

  handleSaveClick = () => {
    const { questions } = this.state;
    const { sagaKey: id, submitHandlerBySaga, handleModalClose, parentWorkSeq, parentTaskSeq, profile } = this.props;
    const questionArr = [questions[0], questions[1], questions[2], questions[3], questions[4]];

    const apiArr = {
      PARAM: {
        PARENT_WORK_SEQ: parentWorkSeq,
        PARENT_TASK_SEQ: parentTaskSeq,
        QUESTIONS: JSON.stringify(questionArr),
        REG_USER_ID: profile.USER_ID,
      },
    };

    submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eduexam`, apiArr, handleModalClose);
  };

  render() {
    const { handleInputChange, handleSaveClick } = this;
    const { questions } = this.state;
    const { handleModalClose } = this.props;
    return (
      <>
        <div style={{ marginTop: '30px', marginLeft: '100px', marginBottom: '10px' }}>
          <Card
            title={
              <>
                <div className="ant-card-head-title">1번 문항</div>
                <AntdInput
                  defaultValue={questions[0].title || ''}
                  value={questions[0].title || ''}
                  onChange={e => handleInputChange(0, 'title', e.target.value)}
                  placeholder="문제를 입력하세요."
                />
              </>
            }
            style={{ width: '90%' }}
          >
            <div style={{ textAlign: 'right' }}>
              <AntdSelect
                defaultValue={(questions[0] && questions[0].answer) || '정답'}
                value={(questions[0] && questions[0].answer) || '정답'}
                onChange={value => handleInputChange(0, 'answer', value)}
                style={{ width: '20%', marginBottom: '10px' }}
              >
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={2}>2</Select.Option>
                <Select.Option value={3}>3</Select.Option>
                <Select.Option value={4}>4</Select.Option>
              </AntdSelect>
            </div>
            <AntdInput
              defaultValue={questions[0].firstSelection || ''}
              value={questions[0].firstSelection || ''}
              onChange={e => handleInputChange(0, 'firstSelection', e.target.value)}
              placeholder="보기 1"
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <AntdInput
              defaultValue={questions[0].secondSelection || ''}
              value={questions[0].secondSelection || ''}
              onChange={e => handleInputChange(0, 'secondSelection', e.target.value)}
              placeholder="보기 2"
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <AntdInput
              defaultValue={questions[0].thirdSelection || ''}
              value={questions[0].thirdSelection || ''}
              onChange={e => handleInputChange(0, 'thirdSelection', e.target.value)}
              placeholder="보기 3"
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <AntdInput
              defaultValue={questions[0].fourthSelection || ''}
              value={questions[0].fourthSelection || ''}
              onChange={e => handleInputChange(0, 'fourthSelection', e.target.value)}
              placeholder="보기 4"
              style={{ width: '100%', marginBottom: '10px' }}
            />
          </Card>
        </div>
        <div style={{ marginLeft: '100px', marginBottom: '10px' }}>
          <Card
            title={
              <>
                <div className="ant-card-head-title">2번 문항</div>
                <AntdInput
                  defaultValue={questions[1].title || ''}
                  value={questions[1].title || ''}
                  onChange={e => handleInputChange(1, 'title', e.target.value)}
                  placeholder="문제를 입력하세요."
                />
              </>
            }
            style={{ width: '90%' }}
          >
            <div style={{ textAlign: 'right' }}>
              <AntdSelect
                defaultValue={(questions[1] && questions[1].answer) || '정답'}
                value={(questions[1] && questions[1].answer) || '정답'}
                onChange={value => handleInputChange(1, 'answer', value)}
                style={{ width: '20%', marginBottom: '10px' }}
              >
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={2}>2</Select.Option>
                <Select.Option value={3}>3</Select.Option>
                <Select.Option value={4}>4</Select.Option>
              </AntdSelect>
            </div>
            <AntdInput
              defaultValue={questions[1].firstSelection || ''}
              value={questions[1].firstSelection || ''}
              onChange={e => handleInputChange(1, 'firstSelection', e.target.value)}
              placeholder="보기 1"
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <AntdInput
              defaultValue={questions[1].secondSelection || ''}
              value={questions[1].secondSelection || ''}
              onChange={e => handleInputChange(1, 'secondSelection', e.target.value)}
              placeholder="보기 2"
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <AntdInput
              defaultValue={questions[1].thirdSelection || ''}
              value={questions[1].thirdSelection || ''}
              onChange={e => handleInputChange(1, 'thirdSelection', e.target.value)}
              placeholder="보기 3"
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <AntdInput
              defaultValue={questions[1].fourthSelection || ''}
              value={questions[1].fourthSelection || ''}
              onChange={e => handleInputChange(1, 'fourthSelection', e.target.value)}
              placeholder="보기 4"
              style={{ width: '100%', marginBottom: '10px' }}
            />
          </Card>
        </div>
        <div style={{ marginLeft: '100px', marginBottom: '10px' }}>
          <Card
            title={
              <>
                <div className="ant-card-head-title">3번 문항</div>
                <AntdInput
                  defaultValue={questions[2].title || ''}
                  value={questions[2].title || ''}
                  onChange={e => handleInputChange(2, 'title', e.target.value)}
                  placeholder="문제를 입력하세요."
                />
              </>
            }
            style={{ width: '90%' }}
          >
            <div style={{ textAlign: 'right' }}>
              <AntdSelect
                defaultValue={(questions[2] && questions[2].answer) || '정답'}
                value={(questions[2] && questions[2].answer) || '정답'}
                onChange={value => handleInputChange(2, 'answer', value)}
                style={{ width: '20%', marginBottom: '10px' }}
              >
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={2}>2</Select.Option>
                <Select.Option value={3}>3</Select.Option>
                <Select.Option value={4}>4</Select.Option>
              </AntdSelect>
            </div>
            <AntdInput
              defaultValue={questions[2].firstSelection || ''}
              value={questions[2].firstSelection || ''}
              onChange={e => handleInputChange(2, 'firstSelection', e.target.value)}
              placeholder="보기 1"
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <AntdInput
              defaultValue={questions[2].secondSelection || ''}
              value={questions[2].secondSelection || ''}
              onChange={e => handleInputChange(2, 'secondSelection', e.target.value)}
              placeholder="보기 2"
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <AntdInput
              defaultValue={questions[2].thirdSelection || ''}
              value={questions[2].thirdSelection || ''}
              onChange={e => handleInputChange(2, 'thirdSelection', e.target.value)}
              placeholder="보기 3"
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <AntdInput
              defaultValue={questions[2].fourthSelection || ''}
              value={questions[2].fourthSelection || ''}
              onChange={e => handleInputChange(2, 'fourthSelection', e.target.value)}
              placeholder="보기 4"
              style={{ width: '100%', marginBottom: '10px' }}
            />
          </Card>
        </div>
        <div style={{ marginLeft: '100px', marginBottom: '10px' }}>
          <Card
            title={
              <>
                <div className="ant-card-head-title">4번 문항</div>
                <AntdInput
                  defaultValue={questions[3].title || ''}
                  value={questions[3].title || ''}
                  onChange={e => handleInputChange(3, 'title', e.target.value)}
                  placeholder="문제를 입력하세요."
                />
              </>
            }
            style={{ width: '90%' }}
          >
            <div style={{ textAlign: 'right' }}>
              <AntdSelect
                defaultValue={(questions[3] && questions[3].answer) || '정답'}
                value={(questions[3] && questions[3].answer) || '정답'}
                onChange={value => handleInputChange(3, 'answer', value)}
                style={{ width: '20%', marginBottom: '10px' }}
              >
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={2}>2</Select.Option>
                <Select.Option value={3}>3</Select.Option>
                <Select.Option value={4}>4</Select.Option>
              </AntdSelect>
            </div>
            <AntdInput
              defaultValue={questions[3].firstSelection || ''}
              value={questions[3].firstSelection || ''}
              onChange={e => handleInputChange(3, 'firstSelection', e.target.value)}
              placeholder="보기 1"
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <AntdInput
              defaultValue={questions[3].secondSelection || ''}
              value={questions[3].secondSelection || ''}
              onChange={e => handleInputChange(3, 'secondSelection', e.target.value)}
              placeholder="보기 2"
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <AntdInput
              defaultValue={questions[3].thirdSelection || ''}
              value={questions[3].thirdSelection || ''}
              onChange={e => handleInputChange(3, 'thirdSelection', e.target.value)}
              placeholder="보기 3"
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <AntdInput
              defaultValue={questions[3].fourthSelection || ''}
              value={questions[3].fourthSelection || ''}
              onChange={e => handleInputChange(3, 'fourthSelection', e.target.value)}
              placeholder="보기 4"
              style={{ width: '100%', marginBottom: '10px' }}
            />
          </Card>
        </div>
        <div style={{ marginLeft: '100px', marginBottom: '10px' }}>
          <Card
            title={
              <>
                <div className="ant-card-head-title">5번 문항</div>
                <AntdInput
                  defaultValue={questions[4].title || ''}
                  value={questions[4].title || ''}
                  onChange={e => handleInputChange(4, 'title', e.target.value)}
                  placeholder="문제를 입력하세요."
                />
              </>
            }
            style={{ width: '90%' }}
          >
            <div style={{ textAlign: 'right' }}>
              <AntdSelect
                defaultValue={(questions[4] && questions[4].answer) || '정답'}
                value={(questions[4] && questions[4].answer) || '정답'}
                onChange={value => handleInputChange(4, 'answer', value)}
                style={{ width: '20%', marginBottom: '10px' }}
              >
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={2}>2</Select.Option>
                <Select.Option value={3}>3</Select.Option>
                <Select.Option value={4}>4</Select.Option>
              </AntdSelect>
            </div>
            <AntdInput
              defaultValue={questions[4].firstSelection || ''}
              value={questions[4].firstSelection || ''}
              onChange={e => handleInputChange(4, 'firstSelection', e.target.value)}
              placeholder="보기 1"
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <AntdInput
              defaultValue={questions[4].secondSelection || ''}
              value={questions[4].secondSelection || ''}
              onChange={e => handleInputChange(4, 'secondSelection', e.target.value)}
              placeholder="보기 2"
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <AntdInput
              defaultValue={questions[4].thirdSelection || ''}
              value={questions[4].thirdSelection || ''}
              onChange={e => handleInputChange(4, 'thirdSelection', e.target.value)}
              placeholder="보기 3"
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <AntdInput
              defaultValue={questions[4].fourthSelection || ''}
              value={questions[4].fourthSelection || ''}
              onChange={e => handleInputChange(4, 'fourthSelection', e.target.value)}
              placeholder="보기 4"
              style={{ width: '100%', marginBottom: '10px' }}
            />
          </Card>
        </div>
        <div style={{ padding: '30px' }}>
          <StyledButton className="btn-primary mr5" onClick={handleSaveClick}>
            저장
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
