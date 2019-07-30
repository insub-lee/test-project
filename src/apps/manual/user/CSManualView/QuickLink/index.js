import React from 'react';

import TopTitle from './TopTitle';
import ItemUl from './ItemUl';
import Title from './Title';
import Styled from './Styled';

const QuickLink = () => (
  <Styled>
    <TopTitle />
    <Title />
    <ItemUl />
    <Title />
    <ItemUl />
  </Styled>
);

export default QuickLink;
