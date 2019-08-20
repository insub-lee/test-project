import React from 'react';

import TopbarWrap from '../../TopbarWrap';
import Styled from './Styled';

const Header = ({ mualMaster, navList }) => (
  <Styled>
    <TopbarWrap mualMaster={mualMaster} navList={navList} />
  </Styled>
);

export default Header;
