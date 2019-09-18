import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route, Link, Switch } from 'react-router-dom';
// import { Layout, Input, Menu, Icon } from 'antd';
import { Layout, Icon } from 'antd';
import { createStructuredSelector } from 'reselect';
import { intlObj } from 'utils/commonUtils';
import { ThemeProvider } from 'styled-components';

import themes from 'config/themes/index';
import storeHome from 'images/bizstore/system-admin-appstore.png';
import 'containers/admin/App/global-store.css';
import 'containers/admin/App/global-admin.css';

import injectReducer from '../../../utils/injectReducer';
import Trigger from './Trigger';

import AdminMain from '../AdminMain/SiteAdmin/SiteList';
import AdminList from '../AdminMain';

// import AdminUpload from '../Account/Admin/index2';
// import Study from '../Study';

import * as selectors from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import messages from './messages';

import AppWrapper from './AppWrapper';
// import './global-admin.css';

import LeftMenu from '../AdminMain/LeftMenu';

const { Header, Content } = Layout;

class App extends Component {
  constructor() {
    super();

    this.state = {
      // visible: false,
    };

    this.hide = this.hide.bind(this);
    // this.handleVisibleChange = this.handleVisibleChange.bind(this);
  }

  componentDidMount() {
    const url = this.props.history.location.pathname.toLowerCase();
    if (url === '/admin' || url === '/admin/') {
      this.props.history.push('/admin/adminmain/menu');
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      searchword,
      history,
      // menuList,
    } = nextProps;
    const { location } = history;
    const { pathname } = location;

    // const { searchword } = nextProps;

    if (searchword !== undefined && this.props.searchword !== searchword) {
      this.searchInput.input.value = searchword;
    }

    // this.props.menuAuthChk(pathname, history, 'ADMIN');
  }

  hide = () => {
    this.setState({
      // visible: false,
    });
  };

  // handleVisibleChange(visible) {
  //   this.setState({ visible });
  // }

  // searchEnter = (e) => {
  //   if (e.key === 'Enter') {
  //     this.search();
  //   }
  // }

  // search = () => {
  //   const searchword = this.searchInput.input.value;
  //   this.props.changeSearchword(searchword);

  //   const type = this.props.history.location.pathname.indexOf('biz') > -1 ? 'biz' : 'app';

  //   if (searchword.trim() === '') {
  //     this.props.history.push(`/store/appMain/${type}/list`);
  //   } else {
  //     this.props.history.push(`/store/appMain/${type}/search/${searchword}`);
  //   }
  // }

  render() {
    return (
      <ThemeProvider theme={themes.themedefault}>
        <Layout className="storeLayout" style={{ minHeight: '100vh' }}>
          <AppWrapper style={{ width: '100%' }}>
            {/*
            <Header className="storeHeader">
              <Trigger className="triggerSider">
                <Icon
                  className="trigger"
                  type={this.props.collapsed ? 'sider-unfold' : 'sider-fold'}
                  onClick={() => this.props.toggleCollapseSidebar()}
                />
              </Trigger>
              <div className="onCenter">
                <Link to="/admin">
                  <img src={storeHome} alt={intlObj.get(messages.adminMain)} />
                </Link>
              </div>
            </Header>
            */}
            <Content className="storeContent">
              <div className="appListWrapper">
                <LeftMenu />
                {/* 비즈앱 메인 콘텐츠 */}
                <div style={{ width: '100%' }}>
                  <Switch>
                    <Route exact path="/" />
                    <Route exact path="/admin" component={AdminMain} />
                    <Route path="/admin/adminMain" component={AdminList} />
                    {/* <Route path="/admin/upload" component={AdminUpload} />
                    <Route path="/admin/study" component={Study} /> */}
                  </Switch>
                </div>
              </div>
            </Content>
          </AppWrapper>
        </Layout>
      </ThemeProvider>
    );
  }
}

App.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggleCollapseSidebar: PropTypes.func.isRequired,
  menus: PropTypes.array, //eslint-disable-line
  historyPush: PropTypes.func, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  changeSearchword: PropTypes.func, //eslint-disable-line
  searchword: PropTypes.string, //eslint-disable-line
  menuAuthChk: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  toggleCollapseSidebar: () => dispatch(actions.toggleCollapseSidebar()),
  historyPush: url => dispatch(push(url)),
  changeSearchword: searchword => dispatch(actions.changeSearchword(searchword)),
  menuAuthChk: (pathname, history, SCRGRP_CD) => dispatch(actions.menuAuthChk(pathname, history, SCRGRP_CD)),
});

const mapStateToProps = createStructuredSelector({
  menus: selectors.makeSelectMenus(),
  collapsed: selectors.makeSelectCollapsed(),
  searchword: selectors.makeSearchword(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'app', reducer });

export default compose(
  withReducer,
  withConnect,
)(App);
