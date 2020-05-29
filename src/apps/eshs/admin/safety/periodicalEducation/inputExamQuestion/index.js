import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import InputPage from './input';
import ViewPage from './view';

const InputExamQuestion = ({ parentTaskSeq, parentWorkSeq, handleModalClose, authority, getDataSource }) => (
  <BizMicroDevBase
    sagaKey="InputExamQuestion"
    parentTaskSeq={parentTaskSeq}
    parentWorkSeq={parentWorkSeq}
    // component={authority[0] === 'V' ? InputPage : ViewPage} // 문제 제출 페이지
    component={authority[0] !== 'V' ? InputPage : ViewPage} // 문제 풀이 페이지
    handleModalClose={handleModalClose}
    authority={authority}
    getDataSource={getDataSource}
  />
);

InputExamQuestion.propTypes = {
  parentTaskSeq: PropTypes.number,
  parentWorkSeq: PropTypes.number,
  handleModalClose: PropTypes.func,
  authority: PropTypes.arrayOf('string'),
  getDataSource: PropTypes.func,
};

export default InputExamQuestion;
