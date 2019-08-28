import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { basicPath } from 'containers/common/constants';

const StyledAdminLeftMenu = styled.div`
  position: fixed;
  top: 45px;
  left: 0;
  width: 300px;
  height: calc(100vh - 45px);
  padding: 10px 15px;
  border-right: 1px solid #d1d2d3;
  background-color: #ffffff;
  z-index: 100;
`;

const StyledAdminMenu = styled.div`
  position: fixed;
  top: 45px;
  left: 110;
  width: 300px;
  height: calc(100vh - 45px);
  padding: 10px 15px;
  border-right: 1px solid #d1d2d3;
  background-color: #ffffff;
  z-index: 100;
`;
const MenuList = styled.ul`
  display: inline-block;
  width: 100%;

  > li {
    height: 35px;
    line-height: 35px;

    .menu {
      display: block;
      padding-left: 20px;
      font-size: 14px;
      color: #404040;
      cursor: pointer;

      &:before {
        content: '';
        position: relative;
        left: -8px;
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #b3b3b3;
      }

      &:hover,
      &:focus {
        text-decoration: none;
      }

      &.current {
        color: #886ab5;
        background: #edeff2;
        cursor: default;
      }

      &.current:before {
        content: '';
        position: relative;
        left: -8px;
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #886ab5;
      }
    }
  }
`;
class BcAdmin extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      strUrl: 'site',
    };

    this.classChange = this.classChange.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate() {}

  classChange = url => {
    if (url.length <= 0) {
      return;
    } else if (this.state.strUrl === url) {
      return;
    }

    this.setState({
      strUrl: url,
    });
    this.props.historyPush(`/${basicPath.APPS}/businesscard/BcMain/${url}Sub`);
  };

  render() {
    const menuParsing = url => (
      <MenuList>
        <span
          className={url === 'Guide' ? 'menu current' : 'menu'}
          onClick={() => this.classChange('Guide')}
          onKeyPress={() => this.classChange('Guide')}
          role="button"
          tabIndex="1"
          key={1}
        >
          이용 안내
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          className={url === 'Bcask' ? 'menu current' : 'menu'}
          onClick={() => this.classChange('Bcask')}
          onKeyPress={() => this.classChange('Bcask')}
          role="button"
          tabIndex="1"
          key={2}
        >
          명함 신청
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          className={url === 'Bcaskinfo' ? 'menu current' : 'menu'}
          onClick={() => this.classChange('Bcaskinfo')}
          onKeyPress={() => this.classChange('Bcaskinfo')}
          role="button"
          tabIndex="1"
          key={3}
        >
          신청결과 조회
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          className={url === 'Bcadmin' ? 'menu current' : 'menu'}
          onClick={() => this.classChange('Bcadmin')}
          onKeyPress={() => this.classChange('Bcadmin')}
          role="button"
          tabIndex="1"
          key={4}
        >
          명함신청 관리
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          className={url === 'Bcaskorg' ? 'menu current' : 'menu'}
          onClick={() => this.classChange('Bcaskorg')}
          onKeyPress={() => this.classChange('Bcaskorg')}
          role="button"
          tabIndex="1"
          key={5}
        >
          신청자 원본 조회
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          className={url === 'Notify' ? 'menu current' : 'menu'}
          onClick={() => this.classChange('Notify')}
          onKeyPress={() => this.classChange('Notify')}
          role="button"
          tabIndex="1"
          key={6}
        >
          {' '}
          ...임시
        </span>
      </MenuList>
    );

    return (
      <StyledAdminMenu>
        <nav>{menuParsing(this.state.strUrl)}</nav>
      </StyledAdminMenu>
    );
  }
}

BcAdmin.propTypes = {
  history: PropTypes.object, //eslint-disable-line
  historyPush: PropTypes.func, //eslint-disable-line
};

const mapDispatchToProps = dispatch => ({
  historyPush: url => dispatch(push(url)),
});

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(BcAdmin);
