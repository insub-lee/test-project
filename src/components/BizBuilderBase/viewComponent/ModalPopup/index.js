import React from 'react';

import BizBuilderBase from 'components/BizBuilderBase';

const ModalPopup = ({
  sagaKey,
  viewType,
  workSeq,
  taskSeq,
  taskRowData,
  viewChangeSeq,
  changeBuilderModalState,
  InputCustomButtons,
  ModifyCustomButtons,
  ViewCustomButtons,
}) => (
  <BizBuilderBase
    sagaKey={`BizBuilderModalPopup_${sagaKey}_${workSeq || '-1'}`}
    reloadId={sagaKey}
    workSeq={workSeq}
    taskSeq={taskSeq}
    taskRowData={taskRowData}
    viewType={viewType}
    viewChangeSeq={viewChangeSeq}
    changeBuilderModalStateByParent={changeBuilderModalState}
    InputCustomButtons={InputCustomButtons}
    ModifyCustomButtons={ModifyCustomButtons}
    ViewCustomButtons={ViewCustomButtons}
  />
);

export default ModalPopup;
