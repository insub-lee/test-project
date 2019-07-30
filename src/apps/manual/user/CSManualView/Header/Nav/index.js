import React from 'react';

import Styled from './Styled';

const Nav = () => (
  <Styled>
    <li className="home">
      <i className="fa fa-home"></i>
      HOME
    </li>
    <li>고객서비스</li>
    <li className="here">전자금융</li>
  </Styled>
);

export default Nav;
