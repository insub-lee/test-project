import React from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import CustomAcceptPage from './page';
import ModifyCustomButtons from './customBtn/modifyBtn';

/*
    안전지킴이 - 야외행사승인 신청서 - 야외행사 수립 승인 페이지
*/

const outdoorEvent = ({ viewType, taskSeq }) => {
  console.debug('viewType', viewType);
  console.debug('taskSeq', taskSeq);
  console.debug('????????????????????????????????????');
  return (
    <BizBuilderBase
      sagaKey="outdoorEvent_accept"
      workSeq={16321}
      modifyMetaSeq={16421}
      CustomModifyPage={CustomAcceptPage}
      ModifyCustomButtons={ModifyCustomButtons}
      relKey="야외행사승인"
      relKey2="DOC_NO"
      prcId={115}
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
  viewType: 'MODIFY',
  taskSeq: -1,
};

export default outdoorEvent;
