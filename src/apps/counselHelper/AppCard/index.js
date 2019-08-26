import React from 'react';
import { Link } from 'react-router-dom';
import appImg from '../../../images/icon-app.png';
import Styled from './Styled';
import { Rate } from 'antd';
const AppCard = ({ title, value }) => (
  <Styled className="app-card">
    <div className="app-card-body">
      <div className="appd-card-icon">
        <img src={appImg} alt="" />
      </div>
      <a href={`/portal/card/bizMenu/detail/info/${value}`} className="app-card-text">
        <p>{title}</p>
        <span>수신업무와 관련 메뉴 어쩌고저쩌고</span>

        <Rate allowHalf disabled value={4.5} style={{ fontSize: '12px' }} />
      </a>
    </div>
  </Styled>
);

export default AppCard;
