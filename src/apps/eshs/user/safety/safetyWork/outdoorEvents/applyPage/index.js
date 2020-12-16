import React from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import CustomInputPage from './page/Input';
import CustomModifyPage from './page/modify';

/*
    안전지킴이 - 야외행사승인 신청서 - 야외행사 수립 신청 페이지
*/

const inputBtn = () => '';

const modifyBtn = () => '';

const outdoorEvent = ({ viewType, taskSeq }) => {
  console.debug('viewType', viewType);
  console.debug('taskSeq', taskSeq);
  return (
    <BizBuilderBase
      sagaKey="outdoorEvent"
      workSeq={16321}
      relKey="야외행사신청"
      relKey2="DOC_NO"
      prcId={114}
      CustomInputPage={CustomInputPage}
      CustomModifyPage={CustomModifyPage}
      viewType={viewType}
      taskSeq={taskSeq}
    />
  );
};

outdoorEvent.propTypes = {
  viewType: PropTypes.string,
  taskSeq: PropTypes.number,
};

outdoorEvent.defaultProps = {
  viewType: 'INPUT',
  taskSeq: -1,
};

export default outdoorEvent;
