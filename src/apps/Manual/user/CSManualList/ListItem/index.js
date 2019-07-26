import React from 'react';
import PropTypes from 'prop-types';
import ItemUl from '../ItemUl';
import Title from '../Title';
import Styled from './Styled';

const ListItem = ({ data: { CATEGORY_NAME, ManualList } }) => (
  <Styled>
    <Title title={CATEGORY_NAME} count={ManualList.length} />
    <ItemUl list={ManualList} />
  </Styled>
);

ListItem.propTypes = {
  data: PropTypes.object,
};

ListItem.defaulProps = {
  data: {
    title: {},
    children: {},
  },
};

export default ListItem;
