import React from 'react';
import PropTypes from 'prop-types';
import ItemUl from '../ItemUl';
import Title from '../Title';
import Styled from './Styled';

const ListItem = ({ data: { CATEGORY_NAME, ManualList }, linkItemAction }) => (
  <Styled>
    <Title title={CATEGORY_NAME} count={ManualList.length} />
    <ItemUl list={ManualList} linkItemAction={linkItemAction} />
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
