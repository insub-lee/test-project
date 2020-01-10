/* eslint-disable import/no-unresolved */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import StyledAdminMenu from './StyledAdminMenu';
import MenuItem from './MenuItem';
import adminLogo from '../../../../images/portal/admin-logo.png';

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
  z-index: 105;
  overflow-y: auto;
  overflow-x: hidden;
  backface-visibility: hidden;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

class menuList extends React.Component {
  constructor(prop) {
    super(prop);
    const pathname = window.parent.document.location.pathname.toLowerCase();
    this.state = {
      strUrl:
        // window.parent.document.location.pathname.toLowerCase() !== '' ? window.parent.document.location.pathname.toLowerCase() : '/admin/adminmain/siteadmin',
        pathname !== '' ? pathname : '/admin/adminmain/menu',
      // openMenuCode: 'SITE',
    };

    this.classChange = this.classChange.bind(this);
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

    this.props.history.push(url);
  };

  classString = url => {
    let clsStr = '';
    let strCurUrl = window.parent.document.location.pathname.toLowerCase();
    if (
      /*
      strCurUrl === '/admin' ||
      strCurUrl === '/admin/' ||
      strCurUrl === '/admin/adminmain' ||
      strCurUrl === '/admin/adminmain/' ||
      strCurUrl === '/admin/adminmain/siteadmin/sitereg' ||
      strCurUrl === '/admin/adminmain/siteadmin/sitereg/'
      */
      strCurUrl === '/admin' ||
      strCurUrl === '/admin/' ||
      strCurUrl === '/admin/adminmain' ||
      strCurUrl === '/admin/adminmain/' ||
      strCurUrl.startsWith('/admin/adminmain/menu')
    ) {
      // strCurUrl = '/admin/adminmain/siteadmin';
      strCurUrl = '/admin/adminmain/menu';
    } else if (strCurUrl === '/admin/adminmain/orgadmin/orglist' || strCurUrl === '/admin/adminmain/orgadmin/orglist/') {
      strCurUrl = '/admin/adminmain/orgadmin';
    }

    if (strCurUrl.startsWith('/admin/adminmain/workbuilder/manageapp')) {
      if (url === strCurUrl) clsStr = 'active';
    } else if (url === strCurUrl || strCurUrl.startsWith(url)) {
      clsStr = 'active';
    } else {
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

  /*
  setOpenMenuCode = code => {
    this.setState({ openMenuCode: code });
  };
  */
  makeMenu = leftMenuList =>
    leftMenuList.map(m => (
      <MenuItem
        key={m.SCR_CD}
        menuItem={m}
        // openMenuCode={this.state.openMenuCode}
        classString={this.classString}
        classChange={this.classChange}
        setIcon={this.setIcon}
        // setOpenMenuCode={this.setOpenMenuCode}
      />
    ));

  render() {
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
    return (
      <StyledAdminLeftMenu>
        <nav>
          <StyledAdminMenu>
            <div>
              <div className="nav-logo">
                <img src={adminLogo} alt="BizMicro Portal Admin" />
              </div>
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
};

export default menuList;
