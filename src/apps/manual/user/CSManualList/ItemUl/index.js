import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

import LinkItem from '../LinkItem';
import Styled from './Styled';

const ItemUl = ({ list, linkItemAction }) => (
  <Styled>
    <Scrollbars>
      <ul>
        {list.slice(0, 20).map(item => (
          <li key={`itemUl_${item.MUAL_IDX}`}>
            <LinkItem item={item} linkItemAction={linkItemAction} />
          </li>
        ))}
      </ul>
    </Scrollbars>
  </Styled>
);

ItemUl.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
};

ItemUl.defaultProps = {
  list: [],
};

export default ItemUl;
