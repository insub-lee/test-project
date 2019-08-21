import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { Layout, Input, Button } from 'antd';
import { createStructuredSelector } from 'reselect';
// import { lang } from 'utils/commonUtils';
import { ThemeProvider } from 'styled-components';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import themes from 'config/themes/index';
import { intlObj } from 'utils/commonUtils';
import messages from '../messages';

import * as selectors from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import saga from './saga';
import AppWrapper from './AppWrapper';
import StyleUserSetting from './StyleUserSetting';

import AppList from './AppMain/AppList';
import AppMain from './AppMain';

import MyPage from './AppMain/MyPage';
import Main from './AppMain/MyPage/Main';
import AppInfo from './AppMain/MyPage/AppInfo';
import PageInfo from './AppMain/MyPage/PageInfo';
import AppBizModal from './AppMain/MyPage/AppBizModal';
import BizDetail from './AppMain/Biz/BizDetail';
import BizMenuList from './AppMain/Biz/BizMenuList';
import BizStore from './AppMain/BizStore';
import BizManage from './AppMain/BizManage';

import StyleAppList from './AppMain/AppList/StyleAppList';

import './global-store.css';

const { Content, Sider } = Layout;
/* eslint-disable */
class UserStore extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getMenu('STORE');
  }

  render() {
    const { collapsed } = this.props;

    return (
      <StyleUserSetting className="userSetting">
        <div className="userSettingWrapper">
          <div className="pageHeaderWrapper">
            <h2 className="pageHeader">App Store</h2>
            <StyleAppList>
              <div className="topPart">
                <div className="searchInput">
                  <Input
                    placeholder=""
                    title={intlObj.get(messages.searchBizStore)}
                    onKeyPress={this.searchEnter}
                    ref={ref => {
                      this.searchInput = ref;
                    }}
                  />
                  <Button type="button" onClick={this.search} title={intlObj.get(messages.search)} />
                  {/* <LoadingSpin isLoading={isLoading && history.location.pathname.indexOf('modal') > -1} /> */}
                </div>
              </div>
            </StyleAppList>
          </div>
          <ThemeProvider theme={themes.themedefault}>
            <Layout className="storeLayout" style={{ minHeight: '100%' }}>
              <Sider trigger={null} collapsible collapsed={collapsed} className="siderLayout" />
              <AppWrapper style={{ width: '100%' }}>
                <Content className="storeContent">
                  <div className="contentWrapper">
                    <Switch>
                      <Route exact path="/portal/store" component={AppList} />
                      <Route exact path="/portal/store/appMain" component={AppMain} />
                      <Route exact path="/portal/store/appMain/myPage" component={Main} />
                      <Route path="/portal/store/appMain/myPage/widgetsetting" component={MyPage} />
                      <Route exact path="/portal/store/appMain/myPage/app/:APP_ID" component={AppInfo} />
                      <Route exact path="/portal/store/appMain/myPage/page/:PAGE_ID" component={PageInfo} />
                      <Route path="/portal/store/appMain/myPage/modal" component={AppBizModal} />
                      <Route path="/portal/store/appMain/myPage/biz/detail/:type/:BIZGRP_ID" component={BizDetail} />
                      <Route exact path="/portal/store/appMain/myPage/biz/menulist/:BIZGRP_ID" component={BizMenuList} />
                      <Route path="/portal/store/appMain/bizManage" component={BizManage} />
                      <Route path="/portal/store/appMain/bizStore" component={BizStore} />
                      <Route exact path="/portal/store/appMain/bizStore/app/list/:CATG_ID" component={AppList} />
                    </Switch>
                  </div>
                </Content>
              </AppWrapper>
            </Layout>
          </ThemeProvider>
        </div>
      </StyleUserSetting>
    );
  }
}

UserStore.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggleCollapseSidebar: PropTypes.func.isRequired,
  menuList: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.object.isRequired,
  menuName: PropTypes.string.isRequired,
  searchword: PropTypes.string.isRequired,
  changeMenuName: PropTypes.func.isRequired,
  changeSearchword: PropTypes.func.isRequired,
  getMenu: PropTypes.func.isRequired,
  menuAuthChk: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
  appbizGubun: PropTypes.number.isRequired,
};

const mapDispatchToProps = dispatch => ({
  toggleCollapseSidebar: () => dispatch(actions.toggleCollapseSidebar()),
  historyPush: url => dispatch(push(url)),
  changeSearchword: searchword => dispatch(actions.changeSearchword(searchword)),
  changeMenuName: menuName => dispatch(actions.changeMenuName(menuName)),
  getMenu: SCRGRP_CD => dispatch(actions.getMenu(SCRGRP_CD)),
  menuAuthChk: (pathname, history, SCRGRP_CD) => dispatch(actions.menuAuthChk(pathname, history, SCRGRP_CD)),
});

const mapStateToProps = createStructuredSelector({
  menus: selectors.makeSelectMenus(),
  collapsed: selectors.makeSelectCollapsed(),
  searchword: selectors.makeSearchword(),
  menuName: selectors.makeMenuName(),
  menuList: selectors.makeMenuList(),
  currentView: selectors.currentView(),
  appbizGubun: selectors.makeAppBizGubun(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'userStore-app', reducer });
const withSaga = injectSaga({ key: 'userStore-app', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserStore);
