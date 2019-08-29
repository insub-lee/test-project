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
  width: 180px;
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
  > ol {
    height: 35px;
    line-height: 35px;

    .menu {
      display: block;
      padding-left: 20px;
      font-size: 12px;
      color: 'green';
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
class LeftMenu extends React.Component {
  constructor(prop) {
    super(prop);

    this.state = {
      // strUrl: 'Bcask',
      strUrl: this.props.history.location.param === 'fromWidget' ? 'Bcaskinfo' : 'Bcask',
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
    this.props.history.push(`/${basicPath.APPS}/businesscard/BcMain/${url}Sub`);
  };

  render() {
    const menuParsing = url => (
      <MenuList>
        <li>
          <span
            className={url === 'Guide' ? 'menu current' : 'menu'}
            onClick={() => this.classChange('Guide')}
            onKeyPress={() => this.classChange('Guide')}
            role="button"
            tabIndex="0"
            key={1}
          >
            이용 안내
          </span>
        </li>

        <li>
          <span
            className={url === 'Bcask' ? 'menu current' : 'menu'}
            onClick={() => this.classChange('Bcask')}
            onKeyPress={() => this.classChange('Bcask')}
            role="button"
            tabIndex="0"
            key={2}
          >
            명함 신청
          </span>
        </li>
        <li>
          <span
            className={url === 'Bcaskinfo' ? 'menu current' : 'menu'}
            onClick={() => this.classChange('Bcaskinfo')}
            onKeyPress={() => this.classChange('Bcaskinfo')}
            role="button"
            tabIndex="0"
            key={3}
          >
            신청결과 조회
          </span>
        </li>

        <li>
          <span className={url === 'Bcadmin' ? 'menu current' : 'menu'} role="button" tabIndex="0" key={4}>
            명함신청 관리
          </span>
        </li>

        <ol>
          <span
            className={url === 'BcAdmin00' ? 'menu current' : 'menu'}
            onClick={() => this.classChange('BcAdmin00')}
            onKeyPress={() => this.classChange('BcAdmin00')}
            role="button"
            tabIndex="0"
            key={5}
          >
            전체현황
          </span>
        </ol>

        <ol>
          <span
            className={url === 'BcAdmin01' ? 'menu current' : 'menu'}
            onClick={() => this.classChange('BcAdmin01')}
            onKeyPress={() => this.classChange('BcAdmin01')}
            role="button"
            tabIndex="0"
            key={6}
          >
            승인대상
          </span>
        </ol>

        <ol>
          <span
            className={url === 'BcAdmin02' ? 'menu current' : 'menu'}
            onClick={() => this.classChange('BcAdmin02')}
            onKeyPress={() => this.classChange('BcAdmin02')}
            role="button"
            tabIndex="0"
            key={7}
          >
            발급대기
          </span>
        </ol>

        <ol>
          <span
            className={url === 'BcAdmin03' ? 'menu current' : 'menu'}
            onClick={() => this.classChange('BcAdmin03')}
            onKeyPress={() => this.classChange('BcAdmin03')}
            role="button"
            tabIndex="0"
            key={8}
          >
            발급완료
          </span>
        </ol>

        <ol>
          <span
            className={url === 'BcAdmin04' ? 'menu current' : 'menu'}
            onClick={() => this.classChange('BcAdmin04')}
            onKeyPress={() => this.classChange('BcAdmin04')}
            role="button"
            tabIndex="0"
            key={9}
          >
            배송완료
          </span>
        </ol>

        <ol>
          <span
            className={url === 'BcAdmin05' ? 'menu current' : 'menu'}
            onClick={() => this.classChange('BcAdmin05')}
            onKeyPress={() => this.classChange('BcAdmin05')}
            role="button"
            tabIndex="0"
            key={10}
          >
            보류내역
          </span>
        </ol>

        <ol>
          <span
            className={url === 'BcAdmin06' ? 'menu current' : 'menu'}
            onClick={() => this.classChange('BcAdmin06')}
            onKeyPress={() => this.classChange('BcAdmin06')}
            role="button"
            tabIndex="0"
            key={11}
          >
            취소내역
          </span>
        </ol>

        <li>
          <span
            className={url === 'Bcaskorg' ? 'menu current' : 'menu'}
            onClick={() => this.classChange('Bcaskorg')}
            onKeyPress={() => this.classChange('Bcaskorg')}
            role="button"
            tabIndex="0"
            key={12}
          >
            신청자원본조회
          </span>
        </li>
        {/*
        <li>
          <span
            className={url === 'Notify' ? 'menu current' : 'menu'}
            onClick={() => this.classChange('Notify')}
            onKeyPress={() => this.classChange('Notify')}
            role="button"
            tabIndex="0"
            key={6}
          > ...임시...
          </span>
        </li>
*/}
      </MenuList>
    );

    return (
      <StyledAdminLeftMenu>
        <nav>{menuParsing(this.state.strUrl)}</nav>
      </StyledAdminLeftMenu>
    );
  }
}

LeftMenu.propTypes = {
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

export default compose(withConnect)(LeftMenu);
