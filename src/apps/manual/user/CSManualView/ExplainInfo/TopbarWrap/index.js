import React from 'react';

import TopbarTitle from '../TopbarTitle';
import Nav from '../../Header/Nav';
import Styled from './Styled';

const TopbarWrap = () => (
  <Styled>
    <TopbarTitle />
    <Nav />
  </Styled>
);

export default TopbarWrap;
