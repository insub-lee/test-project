import React from 'react';

import Styled from './Styled';

const handleOnClick = (mualIdx, mualOrgIdx, widgetId, addManualHistory, setListSelectedMualIdx) => {
  setListSelectedMualIdx(mualIdx, widgetId);
  addManualHistory(widgetId, mualIdx, mualOrgIdx);
};

const LinkItem = ({ node, widgetId, addManualHistory, setListSelectedMualIdx }) => (
  <Styled>
    <a onClick={() => handleOnClick(node.MUAL_IDX, node.MUAL_ORG_IDX, widgetId, addManualHistory, setListSelectedMualIdx)}>{node.MUAL_NAME}</a>
  </Styled>
);

export default LinkItem;
