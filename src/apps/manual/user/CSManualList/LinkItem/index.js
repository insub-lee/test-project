import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import Checkbox from 'components/FormStuff/Checkbox';

import Styled from './Styled';

const handleListItemClick = (item, linkItemAction) => {
  linkItemAction.setSelectedMualOrgIdx(item.MUAL_IDX, linkItemAction.widgetId, item.MUAL_ORG_IDX);
  linkItemAction.setIsViewContents(true, linkItemAction.widgetId);
  // , setCheckManual, checkedManualList
};

const LinkItem = ({ item, linkItemAction }) => (
  <Styled>
    <Checkbox
      checked={linkItemAction.checkedManualList.findIndex(find => find.get('mualIdx') === item.MUAL_IDX) > -1}
      onClick={() => linkItemAction.setCheckManual(item.MUAL_IDX, item.MUAL_ORG_IDX, linkItemAction.widgetId)}
    />
    <Button type="link" onClick={() => handleListItemClick(item, linkItemAction)}>
      <span dangerouslySetInnerHTML={{ __html: item.MUAL_NAME }}></span>
    </Button>
  </Styled>
);

LinkItem.propTypes = {
  item: PropTypes.shape({
    link: PropTypes.string,
    title: PropTypes.string,
  }),
  linkItemAction: PropTypes.object,
};

LinkItem.defaultProps = {
  item: {
    link: '',
    title: '',
  },
  linkItemAction: {},
};

export default LinkItem;
