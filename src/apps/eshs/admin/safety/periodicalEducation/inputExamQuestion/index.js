import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import InputPage from './input';

const InputExamQuestion = ({ parentTaskSeq, parentWorkSeq, handleModalClose }) => (
  <BizMicroDevBase
    sagaKey="InputExamQuestion"
    parentTaskSeq={parentTaskSeq}
    parentWorkSeq={parentWorkSeq}
    component={InputPage}
    handleModalClose={handleModalClose}
  />
);

InputExamQuestion.propTypes = {
  parentTaskSeq: PropTypes.number,
  parentWorkSeq: PropTypes.number,
  handleModalClose: PropTypes.func,
};

export default InputExamQuestion;
