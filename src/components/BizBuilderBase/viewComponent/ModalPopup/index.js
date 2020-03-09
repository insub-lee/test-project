import React from 'react';

import BizBuilderBase from 'components/BizBuilderBase';

const ModalPopup = ({ sagaKey, viewType, workSeq, metaSeq }) => (
  <BizBuilderBase sagaKey={`BizBuilderModalPopup_${sagaKey}_${workSeq || '-1'}`} reloadId={sagaKey} workSeq={workSeq} metaSeq={metaSeq} viewType={viewType} />
);

export default ModalPopup;
