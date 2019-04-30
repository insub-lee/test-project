import React from 'react';
import styled from 'styled-components';

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
    Copyright &copy;
  </FooterStyle>
);

export default Footer;

