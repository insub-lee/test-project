import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { Icon } from 'antd';
import { /* intlObj, */ lang } from 'utils/commonUtils';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import StyledAdminMenu from './StyledAdminMenu';
import MenuItem from './MenuItem';

const StyledAdminLeftMenu = styled.div`
  position: fixed;
  /* top: 45px; */
  left: 0;
  /* width: 270px; */
  width: 230px;
  /* height: calc(100vh - 45px); */
  height: 100%;
  /* padding: 10px 15px; */
  /* padding: 10px 15px 10px 30px; */
  /* border-right: 1px solid #d1d2d3; */
  /* background-color: #ffffff; */
  z-index: 100;
  overflow-y: auto;
`;

class menuList extends React.Component {
  constructor(prop) {
    super(prop);

    this.state = {
      strUrl:
        window.parent.document.location.pathname.toLowerCase() !== '' ? window.parent.document.location.pathname.toLowerCase() : '/admin/adminmain/siteadmin',
      openMenuCode: 'SITE',
    };

    this.classChange = this.classChange.bind(this);

    this.props.getMenu('ADMIN');
  }

  classChange = url => {
    if (!url || url.length < 1) {
      return;
    }
    if (this.state.strUrl === url) {
      // return;
    }

    this.setState({
      strUrl: url,
    });

    this.props.historyPush(`${url}`);
  };

  classString = url => {
    let clsStr = '';
    let strCurUrl = window.parent.document.location.pathname.toLowerCase();

    if (
      strCurUrl === '/admin' ||
      strCurUrl === '/admin/' ||
      strCurUrl === '/admin/adminmain' ||
      strCurUrl === '/admin/adminmain/' ||
      strCurUrl === '/admin/adminmain/siteadmin/sitereg' ||
      strCurUrl === '/admin/adminmain/siteadmin/sitereg/'
    ) {
      strCurUrl = '/admin/adminmain/siteadmin';
    } else if (strCurUrl === '/admin/adminmain/orgadmin/orglist' || strCurUrl === '/admin/adminmain/orgadmin/orglist/') {
      strCurUrl = '/admin/adminmain/orgadmin';
    }

    if (
      url === strCurUrl ||
      (url === '/admin/adminmain/account' && strCurUrl.startsWith('/admin/adminmain/account/')) ||
      (url === '/admin/adminmain/menu' && strCurUrl.startsWith('/admin/adminmain/menu')) ||
      (url === '/admin/adminmain/work' && strCurUrl.startsWith('/admin/adminmain/work'))
    ) {
      // clsStr = 'menu current';
      clsStr = 'active';
    } else {
      // clsStr = 'menu';
      clsStr = '';
    }
    return clsStr;
  };

  setIcon = code => {
    switch (code) {
      case 'BUILDER':
        return 'build';
      case 'APPSTORE':
        return 'appstore';
      case 'ORG':
        return 'apartment';
      case 'CODE':
        return 'share-alt';
      case 'ALARM':
        return 'message';
      case 'CLASSIFY':
        return 'database';
      default:
        return 'setting';
    }
  };

  setOpenMenuCode = code => {
    this.setState({ openMenuCode: code });
  };

  makeMenu = leftMenuList =>
    leftMenuList.map(m => (
      <MenuItem
        menuItem={m}
        openMenuCode={this.state.openMenuCode}
        classString={this.classString}
        classChange={this.classChange}
        setIcon={this.setIcon}
        setOpenMenuCode={this.setOpenMenuCode}
      />
      // <li className={`${this.classString(m.URL)} ${m.child ? ' open' : ''}`}>
      //   <a onClick={() => !m.child && this.classChange(m.URL)} onKeyPress={() => !m.child && this.classChange(m.URL)}>
      //     <Icon type={this.setIcon(m.SCR_CD)} />
      //     <span className="nav-link-text">{lang.get('NAME', m)}</span>
      //     {m.child && (
      //       <b className="collapse-sign">
      //         <em className="fa fa-angle-up"></em>
      //       </b>
      //     )}
      //   </a>
      //   {m.child && (
      //     <ul>
      //       {m.child.map(s => (
      //         <li className={this.classString(s.URL)}>
      //           <a onClick={() => this.classChange(s.URL)} onKeyPress={() => this.classChange(s.URL)}>
      //             <span className="nav-link-text">{lang.get('NAME', s)}</span>
      //           </a>
      //         </li>
      //       ))}
      //     </ul>
      //   )}
      // </li>
    ));

  render() {
    return (
      <StyledAdminLeftMenu>
        <nav>
          <StyledAdminMenu>
            <div>
              <div className="wrap-nav">
                <ul className="nav-menu">{this.makeMenu(this.props.leftMenuList)}</ul>
              </div>
            </div>
          </StyledAdminMenu>
        </nav>
      </StyledAdminLeftMenu>
    );
  }
}

menuList.propTypes = {
  leftMenuList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  history: PropTypes.object, //eslint-disable-line
  location: PropTypes.object, // eslint-disable-line
  historyPush: PropTypes.func, //eslint-disable-line
  getMenu: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  historyPush: url => dispatch(push(url)),
  getMenu: SCRGRP_CD => dispatch(actions.getMenu(SCRGRP_CD)),
});

const mapStateToProps = createStructuredSelector({
  leftMenuList: selectors.makeMenuList(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'menuList', saga });
const withReducer = injectReducer({ key: 'menuList', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(menuList);
