import React from 'react';
import Styled from './Styled';

const TopbarTitle = () => (
  <Styled>
    <li>
      <dl>
        <dt>· 담당자 :&nbsp;</dt>
        <dd>홍길동</dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>· 배포일 :&nbsp;</dt>
        <dd>2019.07.31</dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>· 만료일 :&nbsp;</dt>
        <dd>2020.01.01</dd>
      </dl>
    </li>
  </Styled>
);

export default TopbarTitle;
