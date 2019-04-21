import React from 'react';
import styled from 'styled-components';
import SKhynixLogo from '../../../images/bizstore/skhynix-logo.png';

const FooterStyle = styled.div`
  position: relative;
  bottom: 0;  
  display: block;
  width: 100%;
  height: 55px;
  padding-top: 15px;
  text-align: center;
  color: #909090;
  font-size: 12px;

  > img  {
    margin-right: 10px;
  }
`;

const Footer = () => (
  <FooterStyle>
    <img src={SKhynixLogo} alt="SK 하이닉스" />
    Copyright &copy; SK hynix. All rights reserved.
  </FooterStyle>
);

export default Footer;

