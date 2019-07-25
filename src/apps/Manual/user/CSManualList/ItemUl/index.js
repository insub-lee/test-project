import React from 'react';
import PropTypes from 'prop-types';
import LinkItem from '../LinkItem';
import Styled from './Styled';

const ItemUl = ({ list }) => (
  <Styled>
    <ul>
      {list.slice(0, 5).map(item => (
        <li key={item.seq}>
          <LinkItem item={item} />
        </li>
      ))}
    </ul>
  </Styled>
);

ItemUl.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
};

ItemUl.defaultProps = {
  list: [],
};

export default ItemUl;
