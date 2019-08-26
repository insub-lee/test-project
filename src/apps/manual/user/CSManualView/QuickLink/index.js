import React from 'react';

import TopTitle from './TopTitle';
import ItemUl from './ItemUl';
import Title from './Title';
import Styled from './Styled';

const QuickLink = ({ quickProps }) => (
  <Styled>
    <TopTitle />
    <Title />
    <ItemUl quickProps={quickProps} />
    {/* <Title />
    <ItemUl /> */}
  </Styled>
);

export default QuickLink;
