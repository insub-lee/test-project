import React from 'react';

import { InputSearch } from 'components/FormStuff/Input';

import TopbarBtnWrap from '../../components/TopbarBtnWrap';
import Styled from './Styled';

const Topbar = ({ data }) => (
  <Styled>
    <div className="searchInput">
      <InputSearch placeholder="페이지 내 검색" />
    </div>
    <TopbarBtnWrap data={data} />
  </Styled>
);

export default Topbar;
