import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import Scrollbars from 'react-custom-scrollbars';
import { ThemeProvider } from 'styled-components';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as selectors from './selectors';
import Fullscreen from '../App/fullscreen';
import themes from '../../../config/themes/index';
import AppWrapper from '../App/AppWrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../App/global.css';
import * as actions from './actions';
import { onLoadCheck } from '../App/UserSetting/actions';
import saga from './saga';
import reducer from './reducer';
import UserDock from './UserDock';
import Apps from '../../../apps';
// import UserMenu from './UserMenu';
import UserSetting from '../App/UserSetting';
import RootRouter from '../App/rootRouter';
import AppsRouter from '../../../apps/appsRouter';

// const {
//   Content,
// } = Layout;
const wrap = dragDropContext(HTML5Backend);
class App extends React.Component {
  constructor(props) {
    super(props);
    const {
      handleLoadSkin,
      // handleGetNotiHCnt,
      handleGetNotiMCnt,
      handleGetNotiMList,
      handleonLoadCheck,
      handleGetInitialPortalPage,
      getNotify,
      match,
    } = props;

    const { params } = match;
    const { pageID } = params;
    
    handleGetInitialPortalPage();
    handleLoadSkin();
    // handleGetNotiHCnt();
    handleGetNotiMCnt();
    handleGetNotiMList();
    handleonLoadCheck();
    getNotify();
    this.state = {
      // UserMenu open flag
      open: false,
      // FullScreen
      isFullscreenEnabled: false,
      set: false,
      // Skin 테마명
      // skinName: 'skin1',
      numChildren: 0,
      appsList: [],
      visible: false,
      // 현재 Page에 표시된 앱이 단일앱인지 여부
      isSnglApp: false,
      // 모바일에서 Dock의 ContextMenu 닫기를 위한 플래그
      isClose: {},
      // 스피너 상태
      isSpinnerShow: false,
      pageID,
      isPreviewPage: true,
    };
  }
  // componentDidUpdate(prevProps) {
  //   if (this.state.isSpinnerShow && prevProps !== this.props) {
  //     this.setIsSpinnerShow();
  //   }
  // }
  // ****************** 메뉴 관련 함수 ******************
  onSetOpen = (open) => {
    this.setState({ open: open }); //eslint-disable-line
  }
  setIsSpinnerShow = () => {
    this.setState({
      isSpinnerShow: false,
    });
  }
  setIsFix = () => {
    this.setState({
      isFix: !this.state.isFix,
    });
  }
  setOpen = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  }
  setting = (stat) => {
    console.log(stat);
    // const { set, open } = this.state;
    // this.setState({
    //   set: !set,
    //   open: !open,
    // });
  }
  setClose = () => {
    this.setState({ visible: false });
  }
  setMenuClose = () => {
    this.setState({
      open: false,
    });
  }
  // hideMenuButtonClick = (ev) => {
  //   ev.preventDefault();
  //   this.onSetOpen(false);
  // } // Setting label 클릭안됨
  // ****************** 모바일 Dock ContextMenu 플래그 설정 콜백 함수 ******************
  setIsCloseToTrue = (DOCK_ID) => {
    const {
      isClose,
    } = this.state;
    const isCloseCopy = Object.assign({}, isClose);
    isCloseCopy[DOCK_ID] = true;
    // console.log('여기123');
    this.setState({
      isClose: isCloseCopy,
    });
  }
  setIsCloseToFalse = () => {
    // console.log('여기123123123');
    this.setState({
      isClose: {},
    });
  }
  // ****************** 모바일 Dock ContextMenu 플래그 설정 콜백 함수 끝 ******************
  handleClick = () => {
    this.setState(this.state.isFullscreenEnabled ?
      { isFullscreenEnabled: false } : { isFullscreenEnabled: !false });
  }
  handleAppendApps = () => {
    const content = [];
    const { setMyMenuData } = this.props;
    const { numChildren } = this.state;
    // 존재하는 apps 비교로직 필요
    for (let i = 0; i < this.state.numChildren + 1; i += 1) {
      content.push(<Apps key={i} setMyMenuData={setMyMenuData} />);
    }
    this.setState({
      appsList: content,
      numChildren: numChildren + 1,
    });
  }
  // ****************** 스킨 설정 함수 ******************
  applySkin = () => {
    const { handleLoadSkin } = this.props;
    handleLoadSkin();
  }
  // ****************** 스킨 설정 함수 끝 ******************
  hideMenuButtonClick = () => {
    this.onSetOpen(false);
  }
  execMenu = (PAGE_ID, TARGET) => {
    const { handleExecMenu } = this.props;
    handleExecMenu(PAGE_ID, TARGET);
    this.setState({
      isSpinnerShow: true,
    });
  }
  execPage = (node) => {
    const {
      handleClickApps,
      onExecDockItem,
      dockAppList,
      onDockSetMyMenuData,
    } = this.props;

    const {
      pageID
    } = this.state;

    if (node !== 'common') {
      if (node !== 'set') {
        handleClickApps(pageID, node);
      }
    } else if (node !== 'set') {
      const homeApp = dockAppList[dockAppList.findIndex(item => item.HOME_YN === 'Y')];
      onExecDockItem(homeApp.DOCK_ID, homeApp.USER_ID);
      onDockSetMyMenuData(homeApp.PAGE_ID, 'Y');
    }
    if (node.INTL_TYPE !== undefined) {
      if (node.INTL_TYPE === 'Y') {
        console.log('!!!!!!!!!!!!!! INTL TYPE !!!!!!!!!!', node);
        this.props.history.push(`/apps/${node.SRC_PATH}`);
      } else {
        console.log('!!!!!!!!!!!!!! INTL TYPE2 !!!!!!!!!!', node);
        this.props.history.push(`/preview/page/${pageID}`);
      }
      if (node.APP_YN === 'Y') {
        this.setState({
          set: false,
          open: false,
          isSnglApp: true,
          isSpinnerShow: true,
        });
      } else {
        this.setState({
          set: false,
          open: false,
          isSnglApp: false,
          isSpinnerShow: true,
        });
      }
    } else if (node === 'set') {
      this.props.deleteDock();
      this.props.history.push('/apps/settings');
    }
  }
  closeSetting = () => {
    const { set } = this.state;
    this.setState({
      set: !set,
    });
  }
  render() {
    const {
      open,
      set,
      appsList,
      isSnglApp,
      isClose,
      isSpinnerShow,
      isPreviewPage,
    } = this.state;

    const dock = {};

    const {
      // handleExecPage,
      handleExecMenu,
      mySkin,
      myHNotiCnt,
      myMNotiCnt,
      myMNotiList,
      setMyMenuData,
      managerInfo,
      selectedApp,
      dockAppList,
      isUnfixDockItem,
      setMyMenuNodeData,
      // 홈
      setBizHome,
      selectedIndex,
      menuName,
      handleSetMenuNameSelectedIndex,
      view,
      // Dock Data
      onDndChangePosition,
      onDndChangePositionSaga,
      onExecDockItem,
      onExitDockItem,
      onFixDockItem,
      onUnfixDockItem,
      setIsUnfixDockItem,
      onDockSetMyMenuData,
      dockFixedYn,
      handleSetDockFixedYn,
      dockIconType,
      handleSetDockIconType,
      isUnreadCnt,
    } = this.props;
    const dockCallbacks = {
      onDndChangePosition,
      onDndChangePositionSaga,
      onExecDockItem,
      // DockItem 종료시 이전 실행한 앱을 띄워주기 전에 잠시 Spinner 표시
      onExitDockItem: (DOCK_ID) => { this.setState({ isSpinnerShow: true }, () => { onExitDockItem(DOCK_ID); }); },
      onFixDockItem,
      onUnfixDockItem,
      setIsUnfixDockItem,
      onDockSetMyMenuData,
    };
    let theme = themes.skin1;
    if (mySkin !== undefined) {
      theme = themes[`skin${mySkin}`];
    }
    // const styleSpinner = { margin: 'auto', width: '100%', padding: '20%', position: 'absolute', zIndex: '100' };
    return (
      <ThemeProvider theme={theme}>
        <Layout className="portalLayout">
          <Scrollbars
            className="custom-scrollbar"
            style={{ width: 'auto', minHeight: '100vh', height: 'auto' }}
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
          >
            <AppWrapper style={{ width: '100%' }}>
              {/* <UserMenu
                open={open}
                setting={this.setting}
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
                BIZGRP_ID={this.state.BIZGRP_ID}
              /> */}
              <Header
                className="portalHeader"
                setOpen={this.setOpen}
                execMenu={handleExecMenu}
                execPage={this.execPage}
                handleClick={this.handleClick}
                setMyMenuData={setMyMenuData}
                // UserSetting으로 전달될 콜백
                myHNotiCnt={myHNotiCnt}
                managerInfo={managerInfo}
              />
              <Fullscreen
                enabled={this.state.isFullscreenEnabled}
                onChange={isFullscreenEnabled => this.setState({ isFullscreenEnabled })}
                dockFixedYn={dockFixedYn}
                dockIconType={dockIconType}
                isSnglApp={isSnglApp}
                // 모바일 Dock ContextMenu 플래그 설정
                view={view}
                setIsCloseToFalse={this.setIsCloseToFalse}
              >
                <Route path="/apps" component={AppsRouter} />
                <Route
                  path="/apps/settings"
                  render={() =>
                    <UserSetting //eslint-disable-line
                      applySkin={this.applySkin}
                    />}
                />
                <Route
                  exact
                  path={`/preview/page/${this.state.pageID}`}
                  render={() =>
                    <RootRouter //eslint-disable-line
                      setMyMenuData={setMyMenuData}
                      appsList={appsList}
                      selectedApp={selectedApp}
                      setBizHome={setBizHome}
                      isUnreadCnt={isUnreadCnt}
                      closeSetting={this.closeSetting}
                      applySkin={this.applySkin}
                      set={set}
                      isSpinnerShow={isSpinnerShow}
                      setIsSpinnerShow={this.setIsSpinnerShow}
                      isPreviewPage={isPreviewPage}
                    />}
                />
              </Fullscreen>
              {setMyMenuData.APP_YN !== 'Y' ?
                <Footer
                  style={{
                    background: 'transparent',
                  }}
                  dockFixedYn={dockFixedYn}
                  dockIconType={dockIconType}
                  view={view}
                />
                :
                <div />
              }
              <UserDock
                execPage={this.execPage}
                dockAppList={dock}
                isUnfixDockItem={isUnfixDockItem}
                dockCallbacks={dockCallbacks}
                setMyMenuNodeData={setMyMenuNodeData}
                dockFixedYn={dockFixedYn}
                handleSetDockFixedYn={handleSetDockFixedYn}
                appYn={setMyMenuData.APP_YN}
                dockIconType={dockIconType}
                handleSetDockIconType={handleSetDockIconType}
                // 모바일 Dock ContextMenu 플래그 설정
                isClose={isClose}
                setIsCloseToTrue={this.setIsCloseToTrue}
                setIsCloseToFalse={this.setIsCloseToFalse}
              />
            </AppWrapper>
          </Scrollbars>
        </Layout>
      </ThemeProvider>
    );
  }
}
App.propTypes = {
  handleExecMenu: PropTypes.func.isRequired,
  handleClickApps: PropTypes.func.isRequired,
  mySkin: PropTypes.string,
  handleLoadSkin: PropTypes.func.isRequired,
  // handleGetNotiHCnt: PropTypes.func.isRequired,
  handleGetNotiMCnt: PropTypes.func.isRequired,
  handleGetNotiMList: PropTypes.func.isRequired,
  myHNotiCnt: PropTypes.number.isRequired,
  myMNotiCnt: PropTypes.number.isRequired,
  myMNotiList: PropTypes.array.isRequired,
  handleonLoadCheck: PropTypes.func.isRequired,
  setMyMenuData: PropTypes.object,
  managerInfo: PropTypes.array.isRequired,
  selectedApp: PropTypes.array.isRequired,
  setBizHome: PropTypes.array.isRequired,
  view: PropTypes.string.isRequired,
  // 메뉴트리와 독의 동기화
  selectedIndex: PropTypes.number.isRequired,
  menuName: PropTypes.string.isRequired,
  handleSetMenuNameSelectedIndex: PropTypes.func.isRequired,
  // Dock Data
  handleGetInitialPortalPage: PropTypes.func.isRequired,
  dockAppList: PropTypes.array.isRequired,
  isUnfixDockItem: PropTypes.bool.isRequired,
  onDndChangePosition: PropTypes.func.isRequired,
  onDndChangePositionSaga: PropTypes.func.isRequired,
  onExecDockItem: PropTypes.func.isRequired,
  onExitDockItem: PropTypes.func.isRequired,
  onFixDockItem: PropTypes.func.isRequired,
  onUnfixDockItem: PropTypes.func.isRequired,
  setIsUnfixDockItem: PropTypes.func.isRequired,
  onDockSetMyMenuData: PropTypes.func.isRequired,
  setMyMenuNodeData: PropTypes.object,
  dockFixedYn: PropTypes.string.isRequired,
  handleSetDockFixedYn: PropTypes.func.isRequired,
  dockIconType: PropTypes.string.isRequired,
  handleSetDockIconType: PropTypes.func.isRequired,
  getNotify: PropTypes.func.isRequired,
  isUnreadCnt: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  deleteDock: PropTypes.func.isRequired,
};
App.defaultProps = {
  setMyMenuNodeData: [],
  setMyMenuData: {},
  mySkin: undefined,
};
const mapStateToProps = createStructuredSelector({
  mySkin: selectors.makeSelectSkin(),
  myHNotiCnt: selectors.makeSelectHNotiCnt(),
  myMNotiCnt: selectors.makeSelectMNotiCnt(),
  myMNotiList: selectors.makeSelectMNotiList(),
  setMyMenuData: selectors.makeSelectMyMenuData(),
  managerInfo: selectors.makeSelectManagerInfo(),
  selectedApp: selectors.makeSelectApps(),
  setBizHome: selectors.makeSelectSetBizHome(),
  selectedIndex: selectors.makeSelectSelectedIndex(),
  menuName: selectors.makeSelectMenuName(),
  view: selectors.makeSelectView(),
  isUnreadCnt: selectors.makeUnreadCnt(),
  // Dock Data
  dockAppList: selectors.makeSelectDockAppList(),
  isUnfixDockItem: selectors.makeSelectIsUnfixDockItem(),
  setMyMenuNodeData: selectors.makeSelectSetMyMenuNodeData(),
  dockFixedYn: selectors.makeSelectDockFixedYn(),
  dockIconType: selectors.makeSelectDockIconType(),
});
const mapDispatchToProps = dispatch => ({
  handleExecMenu: (PAGE_ID, TARGET) =>
    dispatch(actions.execMenu(PAGE_ID, TARGET)),
  handleClickApps: (pageID, node) =>
    dispatch(actions.execApps(pageID, node)),
  handleLoadSkin: () =>
    dispatch(actions.loadSkin()),
  // handleGetNotiHCnt: () =>
  //   dispatch(actions.getNotiHCnt()),
  handleGetNotiMCnt: () =>
    dispatch(actions.getNotiMCnt()),
  handleGetNotiMList: () =>
    dispatch(actions.getNotiMList()),
  handleonLoadCheck: () =>
    dispatch(onLoadCheck()),
  handleSetMenuNameSelectedIndex: (menuName, selectedIndex) =>
    dispatch(actions.setMenuNameSelectedIndex(menuName, selectedIndex)),
  // Dock Data
  handleGetInitialPortalPage: () => dispatch(actions.getInitialPortalPage()),
  onDndChangePosition: (appDockId, afterDockId) =>
    dispatch(actions.dndChangePosition(appDockId, afterDockId)),
  onDndChangePositionSaga: () =>
    dispatch(actions.dndChangePositionSaga()),
  onExecDockItem: (dockId, userId) =>
    dispatch(actions.execDockItem(dockId, userId)),
  onExitDockItem: dockId =>
    dispatch(actions.exitDockItem(dockId)),
  onFixDockItem: dockId =>
    dispatch(actions.fixDockItem(dockId)),
  onUnfixDockItem: dockId =>
    dispatch(actions.unfixDockItem(dockId)),
  setIsUnfixDockItem: () =>
    dispatch(actions.setIsUnfixDockItem()),
  onDockSetMyMenuData: (pageId, isHome) =>
    dispatch(actions.dockSetMyMenuData(pageId, isHome)),
  handleSetDockFixedYn: dockFixedYn =>
    dispatch(actions.setDockFixedYn(dockFixedYn)),
  handleSetDockIconType: dockIconType =>
    dispatch(actions.setDockIconType(dockIconType)),
  getNotify: () =>
    dispatch(actions.getNotify()),
  deleteDock: () =>
    dispatch(actions.deleteDock()),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'preview', reducer });
const withSaga = injectSaga({ key: 'preview', saga });
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(wrap(App));
