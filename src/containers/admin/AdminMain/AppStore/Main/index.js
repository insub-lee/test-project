import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col } from 'antd';

import MenuBg01 from 'images/bizstore/mp-menu01.png';
import MenuBg02 from 'images/bizstore/mp-menu02.png';
import MenuBg03 from 'images/bizstore/mp-menu03.png';
import MenuBg04 from 'images/bizstore/mp-menu04.png';
import MenuBg05 from 'images/bizstore/mp-menu05.png';
import MenuBg06 from 'images/bizstore/mp-menu06.png';

const MyPageMainStyle = styled.div`
  // width: 1260px;
  margin: 0 auto;

  @media only screen and (max-width: 1660px) {
    width: 630px;

    .menu {
      width: 33.3%;
    }
  }

  @media only screen and (max-width: 680px) {
    width: 420px;

    .menu {
      width: 50%;
    }
  }

  @media only screen and (max-width: 460px) {
    width: 100%;
    padding: 0 10px;

    .menu {
      width: 100%;
    }
  }

  .titleSect {
    height: 100px;
    padding-top: 60px;
    color: #707070;
    font-size: 16px;    
  }

  .menu {
    // width: 210px;
    height: 350px;
    padding-top: 194px;
    text-align: center;
    // border-top: 1px solid #222222;

    &.sec01, &.sec02, &.sec03, &.sec04, &.sec05, &.sec06 {
      background-repeat: no-repeat;
      background-position: 50% 70px;
    }

    &.sec01 {
      background-image: url(${MenuBg01});
    }
    &.sec02 {
      background-image: url(${MenuBg02});
    }
    &.sec03 {
      background-image: url(${MenuBg03});
    }
    &.sec04 {
      background-image: url(${MenuBg04});
    }
    &.sec05 {
      background-image: url(${MenuBg05});
    }
    &.sec06 {
      background-image: url(${MenuBg06});
    }

    h2 {
      color: #404040;
      font-size: 16px;
    }

    .desc {
      margin-top: 20px;
      color: #404040;
      font-size: 14px;
    }
  }

 
`;

class PageInfo extends Component {
  constructor(props) {
    super(props);

    console.log('main');
  }

  render() {
    return (
      <MyPageMainStyle>
        <Row tyle="flex" justify="center">
          <Col xl={4} sm={8} xs={12} className="menu sec01">
            <h2>앱 등록</h2>
          </Col>
          <Col xl={4} sm={8} xs={12} className="menu sec02">
            <h2>카테고리 추가</h2>
          </Col>
          <Col xl={4} sm={8} xs={12} className="menu sec03">
            <h2>페이지 추가</h2>
          </Col>
        </Row>
      </MyPageMainStyle>
    );
  }
}

PageInfo.propTypes = {
  history: PropTypes.object, //eslint-disable-line
  match: PropTypes.object, //eslint-disable-line
};

export default PageInfo;
