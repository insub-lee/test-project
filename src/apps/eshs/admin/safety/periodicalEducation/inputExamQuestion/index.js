import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import InputPage from './input';

const InputExamQuestion = ({ parentTaskSeq, parentWorkSeq }) => (
  <BizMicroDevBase sagaKey="InputExamQuestion" parentTaskSeq={parentTaskSeq} parentWorkSeq={parentWorkSeq} component={InputPage} />
);

InputExamQuestion.propTypes = {
  parentTaskSeq: PropTypes.number,
  parentWorkSeq: PropTypes.number,
};

export default InputExamQuestion;
