import React from 'react';

import BizBuilderBase from 'components/BizBuilderBase';

const ModalPopup = ({ sagaKey, viewType, workSeq, taskSeq, taskRowData, viewChangeSeq, changeBuilderModalState, CustomButtons }) => (
  <BizBuilderBase
    sagaKey={`BizBuilderModalPopup_${sagaKey}_${workSeq || '-1'}`}
    reloadId={sagaKey}
    workSeq={workSeq}
    taskSeq={taskSeq}
    taskRowData={taskRowData}
    viewType={viewType}
    viewChangeSeq={viewChangeSeq}
    changeBuilderModalStateByParent={changeBuilderModalState}
    CustomButtons={CustomButtons} // ModalPopup에서 CustomBtns을 Props로 받도록 수정 (by.정현)
  />
);

export default ModalPopup;
