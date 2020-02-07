import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { createStructuredSelector } from 'reselect';
import { ThemeProvider } from 'styled-components';

import themes from 'config/themes/index';
import 'containers/admin/App/global-store.css';
import 'containers/admin/App/global-admin.css';
// import Loadable from 'components/Loadable';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import saga from './saga';

import AdminMain from '../AdminMain/SiteAdmin/SiteList';
import AdminList from '../AdminMain';

import * as selectors from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import AppWrapper from './AppWrapper';
import LeftMenu from './LeftMenu';

// const AdminMain = Loadable({ loader: () => import('../AdminMain/SiteAdmin/SiteList') });
// const AdminList = Loadable({ loader: () => import('../AdminMain') });

const { Content } = Layout;

class App extends Component {
  componentDidMount() {
    this.props.getMenu('ADMIN');
    const url = this.props.history.location.pathname.toLowerCase();
    if (url === '/admin' || url === '/admin/') {
      this.props.history.push('/admin/adminmain/menu');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { history } = nextProps;
    const { location } = history;
    const { pathname } = location;

    this.props.menuAuthChk(pathname, history, 'ADMIN');
  }

  render() {
    const { leftMenuList, history } = this.props;
    return (
      <ThemeProvider theme={themes.themedefault}>
        <Layout className="storeLayout" style={{ minHeight: '100vh' }}>
          <AppWrapper style={{ width: '100%' }}>
            <Content className="storeContent">
              <div className="appListWrapper">
                <LeftMenu leftMenuList={leftMenuList} history={history} />
                {/* 비즈앱 메인 콘텐츠 */}
                <div style={{ width: '100%' }}>
                  <Switch>
                    {/*<Route exact path="/" />*/}
                    <Route exact path="/admin" component={AdminMain} />
                    <Route path="/admin/adminmain" component={AdminList} />
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
  historyPush: PropTypes.func, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  changeSearchword: PropTypes.func, //eslint-disable-line
  searchword: PropTypes.string, //eslint-disable-line
  menuAuthChk: PropTypes.func.isRequired,
  location: PropTypes.object, // eslint-disable-line
  leftMenuList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  getMenu: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  historyPush: url => dispatch(push(url)),
  changeSearchword: searchword => dispatch(actions.changeSearchword(searchword)),
  menuAuthChk: (pathname, history, SCRGRP_CD) => dispatch(actions.menuAuthChk(pathname, history, SCRGRP_CD)),
  getMenu: SCRGRP_CD => dispatch(actions.getMenu(SCRGRP_CD)),
});

const mapStateToProps = createStructuredSelector({
  searchword: selectors.makeSearchword(),
  leftMenuList: selectors.makeMenuList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'adminMenu', saga });
const withReducer = injectReducer({ key: 'adminMenu', reducer });

export default compose(withSaga, withReducer, withConnect)(App);
