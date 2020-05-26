import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import InputPage from './input';
import viewPage from './view';

const InputExamQuestion = ({ parentTaskSeq, parentWorkSeq, handleModalClose, authority }) => (
  <BizMicroDevBase
    sagaKey="InputExamQuestion"
    parentTaskSeq={parentTaskSeq}
    parentWorkSeq={parentWorkSeq}
    // component={authority[0] === 'V' ? InputPage : viewPage}
    component={authority[0] !== 'V' ? InputPage : viewPage}
    handleModalClose={handleModalClose}
    authority={authority}
  />
);

InputExamQuestion.propTypes = {
  parentTaskSeq: PropTypes.number,
  parentWorkSeq: PropTypes.number,
  handleModalClose: PropTypes.func,
  authority: PropTypes.arrayOf('string'),
};

export default InputExamQuestion;
