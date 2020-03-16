import React from 'react';

import BizBuilderBase from 'components/BizBuilderBase';

const ModalPopup = ({ sagaKey, viewType, workSeq, taskSeq, taskRowData, customViewChangeProcessSeq, changeBuilderModalState }) => (
  <BizBuilderBase
    sagaKey={`BizBuilderModalPopup_${sagaKey}_${workSeq || '-1'}`}
    reloadId={sagaKey}
    workSeq={workSeq}
    taskSeq={taskSeq}
    taskRowData={taskRowData}
    viewType={viewType}
    customViewChangeProcessSeq={customViewChangeProcessSeq}
    changeBuilderModalStateByParent={changeBuilderModalState}
  />
);

export default ModalPopup;
