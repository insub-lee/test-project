import React from 'react';

import TopbarTitle from '../TopbarTitle';
import Nav from '../../Header/Nav';
import Styled from './Styled';

const TopbarWrap = ({ mualMaster, navList }) => (
  <Styled>
    <TopbarTitle mualMaster={mualMaster} />
    <Nav navList={navList} />
  </Styled>
);

export default TopbarWrap;
