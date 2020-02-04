import messages from 'components/appSetting/messages';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { createStructuredSelector } from 'reselect';
// import { lang } from 'utils/commonUtils';
import { ThemeProvider } from 'styled-components';
import { intlObj } from 'utils/commonUtils';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import themes from 'config/themes/index';
// import { intlObj } from 'utils/commonUtils';
// import messages from '../messages';
import { ModalContainer, ModalRoute } from 'react-router-modal';

import Widget from 'components/appSetting';
import ErrorBoundary from 'containers/common/ErrorBoundary';

import * as selectors from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import saga from './saga';
import AppWrapper from './AppWrapper';
import StyleUserSetting from './StyleUserSetting';

import AppList from './AppMain/AppList';
import AppMain from './AppMain';
import Main from './AppMain/MyPage/Main';
import AppInfo from './AppMain/MyPage/AppInfo';
import PageInfo from './AppMain/MyPage/PageInfo';
import AppBizModal from './AppMain/MyPage/AppBizModal';
import BizDetail from './AppMain/Biz/BizDetail';
import BizMenuList from './AppMain/Biz/BizMenuList';
import BizStore from './AppMain/BizStore';
import BizManage from './AppMain/BizManage';

import './global-store.css';

// const AppList = Loadable({ loader: import('./AppMain/AppList') });
// const AppMain = Loadable({ loader: import('./AppMain') });
// const Main = Loadable({ loader: import('./AppMain/MyPage/Main') });
// const AppInfo = Loadable({ loader: import('./AppMain/MyPage/AppInfo') });
// const PageInfo = Loadable({ loader: import('./AppMain/MyPage/PageInfo') });
// const AppBizModal = Loadable({ loader: import('./AppMain/MyPage/AppBizModal') });
// const BizDetail = Loadable({ loader: import('./AppMain/Biz/BizDetail') });
// const BizMenuList = Loadable({ loader: import('./AppMain/Biz/BizMenuList') });
// const BizStore = Loadable({ loader: import('./AppMain/BizStore') });
// const BizManage = Loadable({ loader: import('./AppMain/BizManage') });

const { Content } = Layout;

class UserStore extends Component {
  componentDidMount() {
    // this.props.getMenu('STORE');
    this.props.hideExecApps();
  }

  getPageHeaderTitle = () => {
    const {
      history: {
        location: { pathname },
      },
    } = this.props;
    if (pathname.includes('bizManage')) return 'Biz Card Manage';
    // if (pathname.includes('widgetsetting')) return '위젯 설정';
    if (pathname.includes('myPage')) return 'Home Widget';
    return 'App Store';
  };

  render() {
    const {
      collapsed,
      execMenu,
      execPage,
      history: {
        location: { pathname },
      },
    } = this.props;

    return (
      <StyleUserSetting className="userSetting">
        <div className="userSettingWrapper">
          <div className="pageHeaderWrapper">
            <h2 className="pageHeader">{this.getPageHeaderTitle()}</h2>
            <Button className="modalClose" onClick={this.closeModal} title={intlObj.get(messages.closeModal)} />
          </div>
          <ThemeProvider theme={themes.themedefault}>
            <Layout className="storeLayout" style={{ height: '100%', overflow: 'hidden' }}>
              <AppWrapper style={{ width: '100%' }}>
                <Content className="storeContent">
                  <div className="contentWrapper">
                    <Switch>
                      <Route exact path="/portal/store" component={AppList} />
                      <Route exact path="/portal/store/appMain" component={AppMain} />
                      <Route exact path="/portal/store/appMain/myPage" component={Main} />
                      <Route
                        exact
                        path="/portal/store/appMain/myPage/app/:APP_ID"
                        render={props => <AppInfo {...props} execMenu={execMenu} execPage={execPage} />}
                      />
                      <Route exact path="/portal/store/appMain/myPage/page/:PAGE_ID" component={PageInfo} />
                      <Route path="/portal/store/appMain/myPage/modal" component={AppBizModal} />
                      <Route
                        path="/portal/store/appMain/myPage/biz/detail/:type/:BIZGRP_ID"
                        render={props => <BizDetail {...props} execMenu={execMenu} execPage={execPage} />}
                      />
                      <Route exact path="/portal/store/appMain/myPage/biz/menulist/:BIZGRP_ID" component={BizMenuList} />
                      <Route path="/portal/store/appMain/bizManage" component={BizManage} />
                      <Route path="/portal/store/appMain/bizStore" render={props => <BizStore {...props} execMenu={execMenu} execPage={execPage} />} />
                      <Route exact path="/portal/store/appMain/bizStore/app/list/:CATG_ID" component={AppList} />
                    </Switch>
                  </div>
                  <ErrorBoundary>
                    <ModalRoute
                      path="/portal/store/appMain/myPage/widgetsetting/:PAGE_ID/:WIDGET_ID"
                      component={Widget}
                      // outDelay={1200} // 1000 = 1s, widgetsetting-modal-out 시간보다 조금 더 길게
                    />
                  </ErrorBoundary>
                  <ModalContainer />
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
  hideExecApps: PropTypes.func.isRequired,
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

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userStore-app', reducer });
const withSaga = injectSaga({ key: 'userStore-app', saga });

export default compose(withReducer, withSaga, withConnect)(UserStore);
