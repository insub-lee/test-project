import React from 'react';

import appImg from '../../../images/icon-app.png';
import Styled from './Styled';

const AppCard = ({ title, value }) => (
  <Styled className="app-card">
    <div className="app-card-body">
      <div className="appd-card-icon">
        <img src={appImg} alt="" />
      </div>
      <a href={value} className="app-card-text">
        <p>{title}</p>
        <span>수신업무와 관련 메뉴 어쩌고저쩌고</span>
        <span>별표..</span>
      </a>
    </div>
  </Styled>
);

export default AppCard;
