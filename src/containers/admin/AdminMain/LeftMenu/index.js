import React from 'react';
// import { Link } from 'react-router-dom';
// import { Route } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { /* intlObj, */lang } from 'utils/commonUtils';
// import Trigger from '../../App/Trigger';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

const StyledAdminLeftMenu = styled.div`
  position: fixed;
  top: 45px;
  left: 0;
  width: 200px;
  height: calc(100vh - 45px);
  padding: 10px 15px;
  border-right: 1px solid #d1d2d3;
  background-color: #ffffff;
  z-index: 100;
  overflow-y: auto;
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
        content: "";
        position: relative;
        left: -8px;
        display: inline-block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: #b3b3b3;
      }

      &:hover, &:focus {
        text-decoration: none;
      }

      &.current {
        color: #f85023;
        background: #edeff2;
      }

      &.current:before {
        content: "";
        position: relative;
        left: -8px;
        display: inline-block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: #f85023;
      }
    }
  }
`;

class menuList extends React.Component {
  constructor(prop) {
    super(prop);

    this.state = {
      strUrl: window.parent.document.location.pathname.toLowerCase() !== '' ? window.parent.document.location.pathname.toLowerCase() : '/admin/adminmain/siteadmin',
    };

    this.classChange = this.classChange.bind(this);

    this.props.getMenu('ADMIN');
  }

  componentDidMount() {
    // this.classChange(this.state.strUrl);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.classChange(this.state.strUrl);
  // }
  // componentDidUpdate() {
  //   alert('YES');
  // }

  classChange = (url) => {
    // alert(url);


    if (!url || url.length < 1) {
      return;
    } else if (url === '/store/appMain/MyApp') {
      window.open(url, '_blank');
      return;
    } else if (this.state.strUrl === url) {
      // return;
    }

    this.setState({
      strUrl: url,
    });

    this.props.historyPush(`${url}`);
  }

  classString = (url) => {
    let clsStr = '';
    let strCurUrl = window.parent.document.location.pathname.toLowerCase();

    if (strCurUrl === '/admin' || strCurUrl === '/admin/'
    || strCurUrl === '/admin/adminmain' || strCurUrl === '/admin/adminmain/'
    || strCurUrl === '/admin/adminmain/siteadmin/sitereg' || strCurUrl === '/admin/adminmain/siteadmin/sitereg/') {
      strCurUrl = '/admin/adminmain/siteadmin';
    } else if (strCurUrl === '/admin/adminmain/orgadmin/orglist' || strCurUrl === '/admin/adminmain/orgadmin/orglist/') {
      strCurUrl = '/admin/adminmain/orgadmin';
    }

    if (url === strCurUrl) {
      clsStr = 'menu current';
    } else if (url === '/admin/adminmain/account' && strCurUrl.startsWith('/admin/adminmain/account/')) {
      clsStr = 'menu current';
    // } else if (url === '/admin/adminmain/siteadmin' && strCurUrl === '/admin') {
    //   clsStr = 'menu current';
    // } else if (url === '/admin/adminmain/siteadmin' && strCurUrl === '/admin/') {
    //   clsStr = 'menu current';
    // } else if (url === '/admin/adminmain/siteadmin' && strCurUrl === '/admin/adminmain') {
    //   clsStr = 'menu current';
    // } else if (url === '/admin/adminmain/siteadmin' && strCurUrl === '/admin/adminmain/') {
    //   clsStr = 'menu current';
    } else {
      clsStr = 'menu';
    }
    return clsStr;
  }

  makeMenu = mnuList => (
    mnuList.map(m => (
      <li key={m.SCR_CD}>
        <span
          className={this.classString(m.URL)}
          onClick={() => this.classChange(m.URL)}
          onKeyPress={() => this.classChange(m.URL)}
          role="button"
          tabIndex="0"
          style={{ paddingLeft: `${m.SORT_SQ % 100 > 0 ? 15 : 0}px` }}
        >{lang.get('NAME', m)}
        </span>
      </li>
    ))
    // console.log(this.makeMenu(menuList), 'dfdfdsfdsfdsfdsfsdf'));
  //   { menuList }
  );

  render() {
    return (
      <StyledAdminLeftMenu>
        <nav>
          <MenuList>
            {/* {this.makeMenu(this.props.leftMenuList.filter(row => row.ROLE_CD === 'SA'
                          || (row.ROLE_CD === 'SM' && row.SCR_CD === 'SITE')
                          || (row.ROLE_CD === 'SM' && row.SCR_CD === 'MSG')
                          || (row.ROLE_CD === 'SM' && row.SCR_CD === 'VGROUP')))} */}
            {this.makeMenu(this.props.leftMenuList)}
          </MenuList>
        </nav>
      </StyledAdminLeftMenu>
    );
  }
}


menuList.propTypes = {
  leftMenuList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  history: PropTypes.object, //eslint-disable-line
  // .isRequired,
  location: PropTypes.object, // eslint-disable-line
  historyPush: PropTypes.func, //eslint-disable-line
  getMenu: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    historyPush: url => dispatch(push(url)),
    getMenu: SCRGRP_CD => dispatch(actions.getMenu(SCRGRP_CD)),
  }
);

const mapStateToProps = createStructuredSelector({
  leftMenuList: selectors.makeMenuList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'menuList', saga });
const withReducer = injectReducer({ key: 'menuList', reducer });


export default compose(
  withReducer,
  withConnect,
  withSaga,
)(menuList);
