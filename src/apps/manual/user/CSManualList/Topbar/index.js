import React from 'react';

import { InputSearch } from 'components/FormStuff/Input';

import TopbarBtnWrap from '../../components/TopbarBtnWrap';
import Styled from './Styled';

const Topbar = () => (
  <Styled>
    <div className="searchInput">
      <InputSearch placeholder="페이지 내 검색" />
    </div>
    <TopbarBtnWrap />
  </Styled>
);

export default Topbar;
