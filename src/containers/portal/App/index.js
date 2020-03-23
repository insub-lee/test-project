import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { isDesktop } from 'utils/commonUtils';
import { Route, Switch } from 'react-router-dom';
// import { Icon, Layout, Spin, Tooltip } from 'antd';
import Icon from 'antd/lib/icon';
import Layout from 'antd/lib/layout';
// import Spin from 'antd/lib/spin';
import Tooltip from 'antd/lib/tooltip';
import { ThemeProvider } from 'styled-components';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Rodal from 'rodal';

import Loadable from 'components/Loadable';

import * as routesAction from 'containers/common/Routes/actions';
import { basicPath } from 'containers/common/constants';
import * as routesSelector from 'containers/common/Routes/selectors';
import * as authSelector from 'containers/common/Auth/selectors';
import Fullscreen from 'components/Fullscreen';
import SideMenu from 'components/SideMenu';
import { BtnMyhome } from './UserStore/components/uielements/buttons.style';

import * as boardAction from '../../../apps/boards/widgets/actions';
import * as selectors from './selectors';
import * as actions from './actions';
import saga from './saga';
import reducer from './reducer';
import themes from '../../../config/themes';

import AppWrapper from './AppWrapper';
import Header from '../components/Header';
// import MenuCategory from './MenuCategory';
import StyledContainer from './StyledContainer';
// import UserCategoryMenu from './UserCategoryMenu';
import ErrorPage from './ErrorPage';

/* Code Split */
const MenuCategory = Loadable({ loader: () => import('./MenuCategory') });
const UserCategoryMenu = Loadable({ loader: () => import('./UserCategoryMenu') });
const UserMenuCard = Loadable({ loader: () => import('./UserMenuCard') });
const UserSetting = Loadable({ loader: () => import('./UserSetting') });
const UserStore = Loadable({ loader: () => import('./UserStore') });
const RodalPage = Loadable({ loader: () => import('../../../components/Rodal') });
const Page = Loadable({ loader: () => import('../../../components/Page') });
const AppsRouter = Loadable({ loader: () => import('../../../apps/appsRouter') });

// import Fullscreen from 'components/Fullscreen';
// import SideMenu from 'components/SideMenu';
// import themes from '../../../config/themes/index';
// import AppWrapper from './AppWrapper';
// import Header from '../components/Header';
// import UserMenuCard from './UserMenuCard';
// import UserSetting from './UserSetting';
// import UserStore from './UserStore';
// import RodalPage from '../../../components/Rodal';
// import Page from '../../../components/Page';
// import MenuCategory from './MenuCategory';
// import AppsRouter from '../../../apps/appsRouter';
// import StyledContainer from './StyledContainer';
// import UserCategoryMenu from './UserCategoryMenu';

const wrap = dragDropContext(HTML5Backend);
const { Content } = Layout;

const mobileDockCss = {
  marginLeft: 45,
};

// REMOVE DOCK - 주석 처리
/*
const desktopDockCss = {
  marginLeft: 45,
  marginRight: 70,
};
*/

// const routePaths = [`/${basicPath.PORTAL}/settings`, `/${basicPath.PORTAL}/store/appMain/bizManage`, `/${basicPath.PORTAL}/store`, `/${basicPath.PORTAL}/card`];

class App extends React.Component {
  constructor(props) {
    super(props, 'App/index');

    const { view, menuFixedYn } = props;

    this.state = {
      // UserMenu open flag
      open: menuFixedYn === 'Y',
      // MenuCategory open flag
      headerMenuOpen: false,
      // FullScreen
      isFullscreenEnabled: false,
      set: false,
      // Skin 테마명
      // skinName: 'skin1',
      visible: false,
      show: false,
      // 모바일에서 Dock의 ContextMenu 닫기를 위한 플래그
      isClose: {},
      // 스피너 상태
      isSpinnerShow: false,
      // isPreviewPage: false,
    };

    this.count = 0;
    this.isMakingApps = false;

    this.styleSpinner = {
      margin: 'auto',
      width: '100%',
      padding: '20%',
      position: 'absolute',
      zIndex: '100',
    };
    if (view === 'Mobile' || view === 'Tablet') {
      this.styleSpinner.height = '100vh';
      this.styleSpinner.paddingTop = '70%';
    }
  }

  componentDidMount() {
    // 공통 Home 위젯 페이지를 1회성으로 새창 띄우기
    // 레이어 팝업으로 띄우는게 나을지 확인이 필요함.
  }

  componentDidUpdate(prevProps) {
    const { view } = this.props;

    if (view !== prevProps.view) {
      if (view === 'Mobile' || view === 'Tablet') {
        const styleSpinnerCopy = {
          ...this.styleSpinner,
          height: '100vh',
          paddingTop: '70%',
        };
        this.styleSpinner = styleSpinnerCopy;
      }
    }
  }

  onReload = item => {
    const { handleReload } = this.props;
    handleReload(item);
  };

  setIsSpinnerShow = () => {
    this.setState({
      isSpinnerShow: false,
    });
  };

  setOpen = () => {
    this.setState({
      open: true,
    });
  };

  setFixedOpenMenu = () => {
    const { handleUpdateMenuFixedYn, menuFixedYn } = this.props;
    const isMenuFixed = menuFixedYn === 'Y';
    handleUpdateMenuFixedYn(isMenuFixed ? 'N' : 'Y');
  };

  setMenuOpen = () => {
    this.setState(prevState => ({
      headerMenuOpen: !prevState.headerMenuOpen,
    }));
  };

  setClose = () => {
    this.setState({ visible: false });
  };

  setMenuClose = () => {
    const { menuFixedYn } = this.props;
    this.setState(prevState => {
      const { open } = prevState;
      return { open: menuFixedYn === 'Y' ? open : false };
    });
  };

  setHeaderMenuClose = () => {
    this.setState({
      headerMenuOpen: false,
    });
  };

  // ****************** 모바일 Dock ContextMenu 플래그 설정 콜백 함수 ******************
  setIsCloseToTrue = DOCK_ID => {
    const { isClose } = this.state;
    const isCloseCopy = { ...isClose };
    isCloseCopy[DOCK_ID] = true;
    this.setState({
      isClose: isCloseCopy,
    });
  };

  setIsCloseToFalse = () => {
    this.setState({
      isClose: {},
    });
  };

  setIsFullscreenEnabled = isFullscreenEnabled => this.setState({ isFullscreenEnabled });

  renderApps = (setMyMenuData, selectedApp, isUnreadCnt, execPage, execMenu, show, onReload, setIsSpinnerShow, isPreviewPage) => (
    <div id={setMyMenuData.PAGE_ID} className={setMyMenuData.PAGE_ID}>
      {setMyMenuData.INTL_TYPE === 'Y' ? (
        <AppsRouter
          id={setMyMenuData.PAGE_ID}
          selectedApp={selectedApp}
          setMyMenuData={setMyMenuData}
          setIsSpinnerShow={setIsSpinnerShow}
          isPreviewPage={isPreviewPage}
          isUnreadCnt={isUnreadCnt}
          execPage={execPage}
          execMenu={execMenu}
          show={show}
          onReload={onReload}
        />
      ) : (
        <Page
          columns={selectedApp}
          setMyMenuData={setMyMenuData}
          setIsSpinnerShow={setIsSpinnerShow}
          isPreviewPage={isPreviewPage}
          isUnreadCnt={isUnreadCnt}
          execPage={execPage}
          execMenu={execMenu}
          show={show}
          onReload={onReload}
        />
      )}
    </div>
  );

  // ****************** 모바일 Dock ContextMenu 플래그 설정 콜백 함수 끝 ******************
  handleClick = () => {
    this.setState(prevState => ({ isFullscreenEnabled: !prevState.isFullscreenEnabled }));
  };

  // ****************** 스킨 설정 함수 ******************
  applySkin = () => {
    const { handleLoadSkin } = this.props;
    handleLoadSkin();
  };

  // ****************** 스킨 설정 함수 끝 ******************
  hideMenuButtonClick = () => {
    // this.onSetOpen(false);
  };

  execMenu = (PAGE_ID, TARGET, node) => {
    const { handleExecMenu } = this.props;

    handleExecMenu(PAGE_ID, TARGET, node);

    if (this.props.view !== 'Mobile') {
      this.setState({
        isSpinnerShow: true,
      });
    } else {
      this.setState({
        isSpinnerShow: true,
        open: false,
      });
    }
  };

  execPage = (node, type) => {
    const { dockAppList } = this.props;

    switch (node) {
      case 'common': {
        // REMOVE DOCK - 주석 처리, 스토어의  myHomePageId 사용
        // const homeApp = dockAppList[dockAppList.findIndex(item => item.HOME_YN === 'Y')];
        const { myHomePageId } = this.props;
        this.props.history.push(`/${basicPath.PAGE}/${myHomePageId}`);
        break;
      }
      case 'set': {
        // this.props.deleteDock();
        this.props.history.push(`/${basicPath.PORTAL}/settings`);
        if (this.props.view === 'Mobile') {
          this.setState({ open: false });
        }
        break;
      }
      default: {
        // 1. 내부서비스 /apps/SRC_PATH ex) 회의실예약, 명함신청
        // 2. 외부서비스 /apps/PAGE_ID ex) 큐브
        // 3. 페이지 /page/PAGE_ID
        if (node) {
          const state = {
            type,
            node,
            executedDockPageId: node.PAGE_ID,
          };

          if (node.INTL_TYPE === 'Y') {
            // console.log('!!!!!!!!!!!!!! INTL TYPE !!!!!!!!!!', node);
            this.props.history.push({
              pathname: `/${basicPath.APPS}/${node.SRC_PATH}`,
              execInfo: state,
            });
          } else if (node.SRC_PATH === 'legacySVC') {
            // console.log('!!!!!!!!!!!!!! INTL TYPE2 !!!!!!!!!', node);
            if (node.TARGET.toUpperCase() === 'NEW') {
              window.open(node.URL, node.NAME_KOR, 'width=1280, height=720, toolbar=yes, resizable=yes, menubar=yes, status=yes, location=yes');
            } else {
              this.props.history.push({
                pathname: `/${basicPath.APPS}/${node.PAGE_ID}`,
                execInfo: state,
              });
            }
          } else {
            // console.log('!!!!!!!!!!!!!! INTL TYPE3 !!!!!!!!!!', node);
            this.props.history.push({
              pathname: `/${basicPath.PAGE}/${node.PAGE_ID}`,
              execInfo: state,
            });
          }
        }
        break;
      }
    }
  };

  closeSetting = () => {
    this.setState(prevState => ({
      set: !prevState.set,
    }));
  };

  show = (boardList, tabNum) => {
    this.props.handleLoadBoard(boardList.arSeq);
    this.setState({ show: true, tabNum });
  };

  hide = () => {
    this.setState({ show: false });
  };

  hideExecApps = () => {
    // REMOVE DOCK - resetLastExecYn 미사용 - 해당 props function 제거 (containers\common\Routes\saga.js)
    // const { apps, resetLastExecYn } = this.props;
    const { apps } = this.props;
    const appsCopy = apps.slice();
    appsCopy.forEach((o, i) => {
      if (o.containerInfo.children[i + 1]) {
        Object.assign(o.containerInfo.children[i + 1].style, {
          position: 'relative',
          width: 0,
          display: 'none',
        });
        o.containerInfo.children[i + 1].classList.remove('activeMenu');
      }
    });
    // common.dockAppList 의 LAST_EXEC_YN 값을 'N'으로 변경 - DB는 변경 하지 않음
    // REMOVE DOCK - resetLastExecYn 미사용 - 해당 props function 제거 (containers\common\Routes\saga.js)
    // resetLastExecYn();
  };

  goStore = () => {
    this.props.history.push(`/${basicPath.PORTAL}/store/appMain/bizStore`);
  };

  goSettings = () => {
    this.props.history.push(`/${basicPath.PORTAL}/settings`);
  };

  goBusinessReg = () => {
    this.props.history.push(`/${basicPath.PORTAL}/store/appMain/bizManage`);
  };

  goHomeWidget = homeId => {
    this.props.history.push(`/${basicPath.PORTAL}/store/appMain/myPage/page/${homeId}`);
  };

  goCommonHome = () => {
    const { rootPageInfo, myHomePageId } = this.props;

    if (rootPageInfo && rootPageInfo.extras) {
      this.execPage(rootPageInfo.extras, 'execMenu');
    } else {
      this.props.history.push(`/${basicPath.PAGE}/${myHomePageId}`);
    }

  };

  getLayoutMarginRight = () =>
    // REMOVE DOCK - 주석 처리
    // const { dockFixedYn } = this.props;
    // return dockFixedYn === 'Y' ? 70 : 0;
    0;

  getLayoutMarginLeft = () => {
    // REMOVE DOCK - 주석 처리
    const { open } = this.state;
    const { menuFixedYn } = this.props;
    return open && menuFixedYn === 'Y' ? 335 : 45;
  };

  getLayoutStyle = desktopMode =>
    desktopMode
      ? {
          // height: '100%',
          marginTop: 42,
          marginLeft: this.getLayoutMarginLeft(),
          marginRight: this.getLayoutMarginRight(),
          transition: 'margin-left 0.3s ease-out 0s',
        }
      : mobileDockCss;

  getChildDivClassName = (setMyMenuData, history, isFullSize) => {
    if ((setMyMenuData.APP_YN === 'Y' && setMyMenuData.SRC_PATH !== 'PAGE') || setMyMenuData.INTL_TYPE === 'Y' || isFullSize) {
      return '';
    }
    return 'gridWrapper';
  };

  render() {
    const { open, isSpinnerShow, headerMenuOpen } = this.state;
    const {
      mySkin,
      myHNotiCnt,
      myMNotiCnt,
      myMNotiList,
      setMyMenuData,
      managerInfo,
      selectedIndex,
      menuName,
      handleSetMenuNameSelectedIndex,
      view,
      handleExitDockItem,
      handleFixDockItem,
      handleUnfixDockItem,
      dockFixedYn,
      dockIconType,
      hasRoleAdmin,
      hasRoleBizMng,
      bizGrpMngCnt,
      selectedApp,
      history,
      headerTitle,
      profile,
      menuFixedYn,
      isUnreadCnt,
      isPreviewPage,
      menuLayoutCode,
      menuCompCode,
    } = this.props;

    let theme = themes.skin1;
    if (mySkin !== undefined) {
      theme = themes[`skin${mySkin}`];
    }

    const { myHomePageId } = this.props;
    const isFullSize = selectedApp && selectedApp.length === 1 && selectedApp[0].size.toUpperCase() === 'FULLSIZE';
    return (
      <ThemeProvider theme={theme}>
        <Layout className="portalLayout">
          {/* TODO menuLayoutCode, menuCompCode값에 따라 메뉴 타입 (레이아웃 + 컴포넌트 형태) */}
          {/* Header */}
          <Header
            className="portalHeader"
            setOpen={this.setMenuOpen}
            execPage={this.execPage}
            handleClick={this.handleClick}
            setMyMenuData={setMyMenuData}
            location={history.location}
            myHNotiCnt={myHNotiCnt}
            managerInfo={managerInfo}
            view={view}
            hasRoleAdmin={hasRoleAdmin}
            headerTitle={headerTitle}
            siteId={profile.SITE_ID}
          />
          {/* <HeaderMenu execMenu={this.execMenu} execPage={this.execPage} /> */}
          {/* SideBar */}
          <UserCategoryMenu
            isShow={open}
            setOpen={this.setOpen}
            setFixedOpenMenu={this.setFixedOpenMenu}
            execMenu={this.execMenu}
            execPage={this.execPage}
            myMNotiCnt={myMNotiCnt}
            myHNotiCnt={myHNotiCnt}
            myMNotiList={myMNotiList}
            selectedIndex={selectedIndex}
            menuName={menuName}
            handleSetMenuNameSelectedIndex={handleSetMenuNameSelectedIndex}
            setMyMenuData={setMyMenuData}
            visible={this.state.visible}
            setMenuClose={this.setMenuClose}
            view={view}
            history={this.props.history}
            fixedMenu={menuFixedYn === 'Y'}
          />
          <SideMenu>
            <div className="iconPositon" style={{ marginTop: '20px' }}>
              <Tooltip placement="right" title="Home">
                <Icon type="home" style={{ color: 'white', fontSize: '20px' }} onClick={() => this.goCommonHome()} />
              </Tooltip>
            </div>
            <div className="iconPositon" style={{ marginTop: '20px' }}>
              <Tooltip placement="right" title="My Home">
                <BtnMyhome onClick={() => history.push(`/${basicPath.PAGE}/${myHomePageId}`)} />
              </Tooltip>
            </div>
            <div className="iconPositon" style={{ marginTop: '20px' }}>
              <Tooltip placement="right" title="Home Widget">
                <Icon type="qrcode" style={{ color: 'white', fontSize: '20px' }} onClick={() => this.goHomeWidget(myHomePageId)} />
              </Tooltip>
            </div>
            <div className="iconPositon" style={{ marginTop: '20px' }}>
              <Tooltip placement="right" title="App Store">
                <Icon type="appstore" theme="filled" style={{ color: 'white', fontSize: '20px' }} onClick={this.goStore} />
              </Tooltip>
            </div>
            {/* SA BM 권한이 있을 경우에만 노출 되도록 (SA권한 OR BM권한 + 업무그룹담당자 일 경우 업무그룹수정가능)*/}
            {(hasRoleAdmin || hasRoleBizMng || bizGrpMngCnt > 0) && (
              <div className="iconPositon" style={{ marginTop: '20px' }}>
                <Tooltip placement="right" title="Biz Card">
                  <Icon type="profile" style={{ color: 'white', fontSize: '20px' }} onClick={this.goBusinessReg} />
                </Tooltip>
              </div>
            )}
          </SideMenu>
          <MenuCategory open={headerMenuOpen} execMenu={this.execMenu} execPage={this.execPage} setMenuClose={this.setHeaderMenuClose}>
            <Layout style={this.getLayoutStyle(isDesktop(view))}>
              <Content style={{}}>
                <StyledContainer>
                  <AppWrapper style={{ width: '100%', height: '100%', backgroundColor: '#ffffff' }}>
                    <Fullscreen
                      enabled={this.state.isFullscreenEnabled}
                      onChange={this.setIsFullscreenEnabled}
                      dockFixedYn={isDesktop(view) ? dockFixedYn : 'N'}
                      dockIconType={isDesktop(view) ? dockIconType : 'MAX'}
                      exitDockItem={handleExitDockItem} // REMOVE DOCK - 확인후 처리
                      fixDockItem={handleFixDockItem} // REMOVE DOCK - 확인후 처리
                      unfixDockItem={handleUnfixDockItem} // REMOVE DOCK - 확인후 처리
                      // 모바일 Dock ContextMenu 플래그 설정
                      view={view}
                      setIsCloseToFalse={this.setIsCloseToFalse}
                      setMyMenuData={setMyMenuData}
                    >
                      <div id="child" className={this.getChildDivClassName(setMyMenuData, history, isFullSize)} style={{ height: '100%' }}>
                        <Content
                          className="portalContent"
                          style={{
                            flexShrink: '0',
                            height: '100%',
                            // display: routePaths.some(path => history.location.pathname.indexOf(path) === 0) ? 'none' : 'inherit',
                          }}
                        >
                          <Switch>
                            <Route exact path="/error" component={ErrorPage} />
                            {/*
                          <Route
                            exact
                            path={`/${basicPath.PORTAL}/store/appMain/bizManage`}
                            render={props => <UserStore {...props} applySkin={this.applySkin} hideExecApps={this.hideExecApps} />}
                          />
                          */}
                            <Route
                              path={`/${basicPath.PORTAL}/settings`}
                              render={() => <UserSetting applySkin={this.applySkin} hideExecApps={this.hideExecApps} />}
                            />
                            <Route
                              path={`/${basicPath.PORTAL}/store`}
                              render={props => (
                                <UserStore
                                  {...props}
                                  execMenu={this.execMenu}
                                  execPage={this.execPage}
                                  applySkin={this.applySkin}
                                  hideExecApps={this.hideExecApps}
                                />
                              )}
                            />
                            <Route
                              path={`/${basicPath.PORTAL}/card`}
                              render={props => (
                                <UserMenuCard
                                  {...props}
                                  execMenu={this.execMenu}
                                  execPage={this.execPage}
                                  applySkin={this.applySkin}
                                  hideExecApps={this.hideExecApps}
                                />
                              )}
                            />
                            <Route
                              path={`/${basicPath.APPS}/:PAGE_ID`}
                              render={() => (
                                <div id={setMyMenuData.PAGE_ID} className={`app-view ${setMyMenuData.PAGE_ID}`} style={{ height: '100%' }}>
                                  <AppsRouter
                                    id={setMyMenuData.PAGE_ID}
                                    selectedApp={selectedApp}
                                    setMyMenuData={setMyMenuData}
                                    setIsSpinnerShow={this.setIsSpinnerShow}
                                    isPreviewPage={isPreviewPage}
                                    isUnreadCnt={isUnreadCnt}
                                    execPage={this.execPage}
                                    execMenu={this.execMenu}
                                    show={this.show}
                                    onReload={this.onReload}
                                  />
                                </div>
                              )}
                            />
                            <Route
                              path={`/${basicPath.PAGE}/:PAGE_ID`}
                              render={() => (
                                <div id={setMyMenuData.PAGE_ID} className={setMyMenuData.PAGE_ID}>
                                  <Page
                                    columns={selectedApp}
                                    setMyMenuData={setMyMenuData}
                                    setIsSpinnerShow={this.setIsSpinnerShow}
                                    isPreviewPage={isPreviewPage}
                                    isUnreadCnt={isUnreadCnt}
                                    execPage={this.execPage}
                                    execMenu={this.execMenu}
                                    show={this.show}
                                    onReload={this.onReload}
                                  />
                                </div>
                              )}
                            />
                          </Switch>
                        </Content>
                      </div>
                    </Fullscreen>
                    {/*
                  {setMyMenuData.APP_YN !== 'Y' && (
                    <Footer
                      style={{
                        background: 'transparent',
                      }}
                      dockFixedYn={isDesktop(view) ? dockFixedYn : 'N'}
                      dockIconType={isDesktop(view) ? dockIconType : 'MAX'}
                      view={view}
                    />
                  )}
                  */}

                    <Rodal
                      className="drillDownCon"
                      visible={this.state.show}
                      onClose={this.hide}
                      animation="slideRight"
                      showCloseButton={false}
                      // leaveAnimation="slideLeft"
                      duration={1000}
                      customStyles={{
                        position: 'absolute',
                        width: 1580,
                        height: 'calc(100vh - 200px)',
                        backgroundColor: '#646567',
                      }}
                      // height는 태블릿, 모바일에서 하단에 나오는 Dock 높이를 고려해서 계산함
                    >
                      {this.state.show && <RodalPage tabNum={this.state.tabNum} onClose={this.hide} show={this.show} />}
                    </Rodal>
                  </AppWrapper>
                </StyledContainer>
              </Content>
            </Layout>
          </MenuCategory>
          {/* // REMOVE DOCK - 확인후 처리 (주석??) */}
          {/* <UserDock
            execPage={this.execPage}
            dockAppList={dockAppList}
            isUnfixDockItem={isUnfixDockItem}
            dockCallbacks={dockCallbacks}
            setMyMenuNodeData={setMyMenuNodeData}
            dockFixedYn={isDesktop(view) ? dockFixedYn : 'N'}
            handleSetDockFixedYn={handleSetDockFixedYn}
            appYn={setMyMenuData.APP_YN}
            dockIconType={isDesktop(view) ? dockIconType : 'MAX'}
            handleSetDockIconType={handleSetDockIconType}
            // 모바일 Dock ContextMenu 플래그 설정
            isClose={isClose}
            setIsCloseToTrue={this.setIsCloseToTrue}
            setIsCloseToFalse={this.setIsCloseToFalse}
            history={this.props.history}
          /> */}
        </Layout>
      </ThemeProvider>
    );
  }
}
App.propTypes = {
  mySkin: PropTypes.number,
  myHNotiCnt: PropTypes.number.isRequired,
  myMNotiCnt: PropTypes.number.isRequired,
  myMNotiList: PropTypes.array.isRequired,
  setMyMenuData: PropTypes.object,
  managerInfo: PropTypes.array,
  view: PropTypes.string.isRequired,
  // 메뉴트리와 독의 동기화
  selectedIndex: PropTypes.number.isRequired,
  menuName: PropTypes.string.isRequired,
  handleSetMenuNameSelectedIndex: PropTypes.func.isRequired,

  dockAppList: PropTypes.array.isRequired,
  isUnfixDockItem: PropTypes.bool.isRequired,
  setMyMenuNodeData: PropTypes.object,
  dockFixedYn: PropTypes.string,
  handleSetDockFixedYn: PropTypes.func.isRequired,
  dockIconType: PropTypes.string,
  handleSetDockIconType: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  // deleteDock: PropTypes.func.isRequired,

  handleLoadSkin: PropTypes.func.isRequired,
  handleExecMenu: PropTypes.func.isRequired,
  // handleClickApps: PropTypes.func.isRequired,
  handleDndChangePosition: PropTypes.func.isRequired,
  handleDndChangePositionSaga: PropTypes.func.isRequired,
  handleExitDockItem: PropTypes.func.isRequired,
  handleFixDockItem: PropTypes.func.isRequired,
  handleUnfixDockItem: PropTypes.func.isRequired,
  handleSetIsUnfixDockItem: PropTypes.func.isRequired,
  handleDockSetMyMenuData: PropTypes.func.isRequired,
  handleReload: PropTypes.func.isRequired,
  handleLoadBoard: PropTypes.func.isRequired,
  selectedApp: PropTypes.array.isRequired,
  // setIsSpinnerShow: PropTypes.func.isRequired,
  isPreviewPage: PropTypes.bool,
  isUnreadCnt: PropTypes.array.isRequired,
  handleGetDataForApps: PropTypes.func.isRequired,
  dataForApps: PropTypes.object,
  handleSaveApps: PropTypes.func.isRequired,
  apps: PropTypes.array.isRequired,
  deletedDockPageId: PropTypes.number,
  executedDockPageId: PropTypes.number,
  hasRoleAdmin: PropTypes.bool,
  hasRoleBizMng: PropTypes.bool,
  bizGrpMngCnt: PropTypes.number,
  headerTitle: PropTypes.string,
  profile: PropTypes.object.isRequired,
  handleMenuShow: PropTypes.func,
  commonMenuTreeData: PropTypes.array.isRequired,
  resetLastExecYn: PropTypes.func.isRequired,
  menuFixedYn: PropTypes.string,
  // REMOVE DOCK - 공통홈, 개인홈 페이지 ID
  rootPageInfo: PropTypes.object,
  myHomePageId: PropTypes.number,
  menuLayoutCode: PropTypes.string,
  menuCompCode: PropTypes.string,
};

App.defaultProps = {
  setMyMenuNodeData: undefined,
  setMyMenuData: {},
  mySkin: undefined,
  managerInfo: undefined,
  dockFixedYn: undefined,
  dockIconType: undefined,
  deletedDockPageId: undefined,
  executedDockPageId: undefined,
  dataForApps: undefined,
  isPreviewPage: false,
  hasRoleAdmin: false,
  hasRoleBizMng: false,
  bizGrpMngCnt: 0,
  headerTitle: '',
  menuLayoutCode: '1',
  menuCompCode: '1',
};

const mapStateToProps = createStructuredSelector({
  // 1. selector
  myHNotiCnt: selectors.makeSelectHNotiCnt(),
  myMNotiCnt: selectors.makeSelectMNotiCnt(),
  myMNotiList: selectors.makeSelectMNotiList(),
  setMyMenuData: selectors.makeSelectMyMenuData(),
  selectedApp: selectors.makeSelectSelectedApp(),
  isUnreadCnt: selectors.makeUnreadCnt(),
  isUnfixDockItem: selectors.makeSelectIsUnfixDockItem(),

  // 2. routesSelector
  view: selectors.makeSelectView(),
  dockAppList: selectors.makeSelectDockAppList(),
  dockFixedYn: selectors.makeSelectDockFixedYn(),
  dockIconType: selectors.makeSelectDockIconType(),
  setMyMenuNodeData: selectors.makeSelectSetMyMenuNodeData(),
  selectedIndex: selectors.makeSelectSelectedIndex(),
  menuName: selectors.makeSelectMenuName(),
  managerInfo: selectors.makeSelectManagerInfo(),
  mySkin: selectors.makeSelectSkin(),
  dataForApps: selectors.makeSelectDataForApps(),
  apps: selectors.makeSelectApps(),
  deletedDockPageId: selectors.makeSelectDeletedDockPageId(),
  executedDockPageId: selectors.makeSelectExecutedDockPageId(),
  hasRoleAdmin: selectors.makeSelectRoleAdmin(),
  hasRoleBizMng: selectors.makeSelectRoleBizMng(),
  bizGrpMngCnt: selectors.makeSelectBizGrpMngCnt(),
  headerTitle: routesSelector.makeSelectHeaderTitle(),
  profile: authSelector.makeSelectProfile(),
  commonMenuTreeData: routesSelector.makeCommonMenuTree(),
  menuFixedYn: selectors.makeSelectMenuFixedYn(),
  // REMOVE DOCK - 공통홈, 개인홈 페이지 ID
  rootPageInfo: routesSelector.makeSelectRootPageInfo(),
  myHomePageId: routesSelector.makeSelectMyHomePageID(),
  menuLayoutCode: selectors.makeSelectMenuLayoutCode(),
  menuCompCode: selectors.makeSelectMenuCompCode(),
});

const mapDispatchToProps = dispatch => ({
  deleteDock: () => dispatch(actions.deleteDock()),

  // RoutesAction의 디스패쳐
  handleLoadSkin: () => dispatch(routesAction.loadSkin()),
  handleDockSetMyMenuData: (pageId, isHome) => dispatch(routesAction.dockSetMyMenuData(pageId, isHome)),
  handleExitDockItem: dockId => dispatch(routesAction.exitDockItem(dockId)),
  handleClickApps: node => dispatch(routesAction.execApps(node)),
  handleFixDockItem: dockId => dispatch(routesAction.fixDockItem(dockId)),
  handleUnfixDockItem: dockId => dispatch(routesAction.unfixDockItem(dockId)),
  handleDndChangePosition: (appDockId, afterDockId) => dispatch(routesAction.dndChangePosition(appDockId, afterDockId)),
  handleDndChangePositionSaga: () => dispatch(routesAction.dndChangePositionSaga()),
  handleSetIsUnfixDockItem: () => dispatch(routesAction.setIsUnfixDockItem()),
  handleExecMenu: (PAGE_ID, TARGET, node) => dispatch(routesAction.execMenu(PAGE_ID, TARGET, node)),
  handleSetMenuNameSelectedIndex: (menuName, selectedIndex) => dispatch(routesAction.setMenuNameSelectedIndex(menuName, selectedIndex)),
  handleSetDockFixedYn: dockFixedYn => dispatch(routesAction.setDockFixedYn(dockFixedYn)),
  handleSetDockIconType: dockIconType => dispatch(routesAction.setDockIconType(dockIconType)),
  handleReload: item => dispatch(routesAction.reload(item)),
  handleLoadBoard: num => dispatch(boardAction.getIfDetailBoardList(num)),
  handleGetDataForApps: EXEC_PAGE_IDS => dispatch(routesAction.getDataForApps(EXEC_PAGE_IDS)),
  handleSaveApps: (apps, setMyMenuData) => dispatch(routesAction.saveApps(apps, setMyMenuData)),
  resetLastExecYn: () => dispatch(routesAction.resetLastExecYn()),
  handleUpdateMenuFixedYn: menuFixedYn => dispatch(routesAction.updateMenuFixedYn(menuFixedYn)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default compose(withReducer, withSaga, withConnect)(wrap(App));
