import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import Checkbox from 'components/FormStuff/Checkbox';

import Styled from './Styled';

const handleListItemClick = (item, linkItemAction) => {
  linkItemAction.setSelectedMualIdx(item.MUAL_IDX);
  linkItemAction.setIsViewContents(true);
};

const LinkItem = ({ item, linkItemAction }) => (
  <Styled>
    <Checkbox />
    <Button type="link" onClick={() => handleListItemClick(item, linkItemAction)}>
      {item.MUAL_NAME}
    </Button>
  </Styled>
);

LinkItem.propTypes = {
  item: PropTypes.shape({
    link: PropTypes.string,
    title: PropTypes.string,
  }),
};

LinkItem.defaultProps = {
  item: {
    link: '',
    title: '',
  },
};

export default LinkItem;
