import React from 'react';

import BizBuilderBase from 'components/BizBuilderBase';

const ModalPopup = ({ sagaKey, viewType, workSeq, taskSeq }) => (
  <BizBuilderBase sagaKey={`BizBuilderModalPopup_${sagaKey}_${workSeq || '-1'}`} reloadId={sagaKey} workSeq={workSeq} taskSeq={taskSeq} viewType={viewType} />
);

export default ModalPopup;
