import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { isDesktop } from 'utils/commonUtils';
import { Route } from 'react-router-dom';
import { Layout, Spin, Icon, Button, Tooltip } from 'antd';
import Scrollbars from 'react-custom-scrollbars';
import { ThemeProvider } from 'styled-components';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as routesAction from 'containers/common/Routes/actions';
import { basicPath } from 'containers/common/constants';
import update from 'react-addons-update';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { isEqual } from 'utils/helpers';
import Fullscreen from 'components/Fullscreen';

import * as boardAction from '../../../apps/boards/widgets/actions';
import * as selectors from './selectors';
// import Fullscreen from './fullscreen';
import themes from '../../../config/themes/index';
import AppWrapper from './AppWrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './global.css';
import * as actions from './actions';
import saga from './saga';
import reducer from './reducer';
import UserDock from './UserDock';
import UserMenu from './UserMenu';
import UserSetting from './UserSetting';
import UserStore from './UserStore';
import RodalPage from '../../../components/Rodal';
import Page from '../../../components/Page';
import MenuCategory from './MenuCategory';
import AppsRouter from '../../../apps/appsRouter';

const wrap = dragDropContext(HTML5Backend);
const { Content } = Layout;

class App extends React.PureComponent {
  constructor(props) {
    super(props, 'App/index');

    const { view } = props;

    this.state = {
      // UserMenu open flag
      open: false,
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
    const {
      isUnreadCnt,
      isPreviewPage,
      handleGetDataForApps,
      setMyMenuData,
      selectedApp,
      handleSaveApps,
      apps,
      dockAppList,
      dataForApps,
      deletedDockPageId,
      executedDockPageId,
      view,
    } = this.props;

    if (dockAppList.length !== 0) {
      if (this.state.isSpinnerShow && apps.length !== prevProps.apps.length) {
        this.setIsSpinnerShow();
      }

      if (apps.length === 0 && !dataForApps && !this.isMakingApps) {
        console.log('$$$ 1.최초 apps 만들기 시작');
        // 최초 apps 만들기
        const EXEC_PAGE_IDS = [];
        /* eslint-disable  */
        dockAppList.forEach(o => {
          // if ((o.EXEC_YN === 'Y' && o.SRC_PATH !== 'legacySVC' && o.TARGET !== 'NEW')
          //   || o.LAST_EXEC_YN === 'Y') {
          //   EXEC_PAGE_IDS.push(o.PAGE_ID);
          // }
          if (o.HOME_YN === 'Y' || (o.LAST_EXEC_YN === 'Y' && o.TARGET !== 'NEW')) {
            EXEC_PAGE_IDS.push(o.PAGE_ID);
          }
        });
        /* eslint-disable  */
        console.log('$$$ 2.EXEC_PAGE_IDS', EXEC_PAGE_IDS);
        handleGetDataForApps(EXEC_PAGE_IDS);
        this.isMakingApps = true;
        return;
      }

      if (apps.length === 0 && dataForApps) {
        console.log('$$$ 4.dataForApps가 들어오고, 최초 apps 만들기', dataForApps);
        const applist = this.addInitialApps(
          dataForApps,
          isUnreadCnt,
          this.execPage,
          this.execMenu,
          this.show,
          this.onReload,
          this.setIsSpinnerShow,
          isPreviewPage,
        );

        // apps 생성 후 DOM에는 아직 생성이 되지 않아 css는 수정할 수 없다.

        // 생성된 apps를 스토어에 저장
        // 저장 후, dataForApps를 undefined로 변경해 줘야, 한번 apss가 생성되고 난 후 이곳에 다시 들어오지 않는다.
        handleSaveApps(applist, setMyMenuData);
        return;
      }

      if (!isEqual(dockAppList, prevProps.dockAppList)) {
        if (prevProps.dockAppList.length === dockAppList.length) {
          // 독 고정상태에서 독 삭제의 경우 apps에서도 지워줘야함
          if (deletedDockPageId && deletedDockPageId !== prevProps.deletedDockPageId) {
            console.log('$$$ 8-3 독 고정상태에서 독 삭제');
            this.deleteApps();
            return;
          } else if (executedDockPageId && executedDockPageId !== prevProps.executedDockPageId) {
            const index = Object.keys(apps).findIndex(o => apps[o].children.props.children.props.setMyMenuData.PAGE_ID === executedDockPageId);

            if (index === -1) {
              console.log('$$$ 8-5 현재 독에 고정되어있으면서 미실행인 독아이템을 실행');
              this.addNewApps(
                setMyMenuData,
                selectedApp,
                isUnreadCnt,
                this.execPage,
                this.execMenu,
                this.show,
                this.onReload,
                this.setIsSpinnerShow,
                isPreviewPage,
              );
              return;
            }
          } else {
            console.log('$$$ 8-4 독이 실행중인데 독을 고정/고정해제 또는 이미 실행중인 독아이템 실행');
            if (setMyMenuData !== prevProps.setMyMenuData) {
              console.log('$$$ 12. 독에 있던 앱을 메뉴에서 실행');
            }
          }
        } else if (prevProps.dockAppList.length > dockAppList.length) {
          console.log('$$$ 8-2 독 삭제');
          this.deleteApps();
          return;
        } else {
          console.log('$$$ 8-1 독 추가');
          this.addNewApps(
            setMyMenuData,
            selectedApp,
            isUnreadCnt,
            this.execPage,
            this.execMenu,
            this.show,
            this.onReload,
            this.setIsSpinnerShow,
            isPreviewPage,
          );
          return;
        }
      }

      if (Object.keys(setMyMenuData).length !== 0 && !isEqual(prevProps.setMyMenuData, setMyMenuData) && setMyMenuData.isCssTarget && apps.length !== 0) {
        console.log('$$$ 11.setMyMenuData가 새로 들어옴');

        // 실행되야하는 앱이 apps에 dom으로 생성되어있지 않을 경우 새로 생성
        const index = apps.findIndex(o => o.children.props.children.props.setMyMenuData.PAGE_ID === setMyMenuData.PAGE_ID);
        if (index === -1) {
          this.addNewApps(
            setMyMenuData,
            selectedApp,
            isUnreadCnt,
            this.execPage,
            this.execMenu,
            this.show,
            this.onReload,
            this.setIsSpinnerShow,
            isPreviewPage,
          );
          return;
        }

        const appsCopy = apps.slice();
        appsCopy.forEach((o, i) => {
          if (o.children.props.children.props.setMyMenuData.PAGE_ID !== setMyMenuData.PAGE_ID) {
            if (o.containerInfo.children[i + 1]) {
              Object.assign(o.containerInfo.children[i + 1].style, {
                // position: 'absolute',
                position: 'relative',
                // left: '-200%',
                width: 0,
                display: 'none',
              });
              o.containerInfo.children[i + 1].classList.remove('activeMenu');
            }
          } else if (o.containerInfo.children[i + 1]) {
            Object.assign(o.containerInfo.children[i + 1].style, {
              // position: 'absolute',
              position: 'relative',
              // left: 0,
              width: '100%',
              display: 'block',
            });
            o.containerInfo.children[i + 1].classList.add('activeMenu');
          }
        });

        const setMyMenuDataCopy = Object.assign({}, setMyMenuData);
        setMyMenuDataCopy.isCssTarget = false;

        const appsCopy2 = update(appsCopy, {
          [index]: {
            children: {
              props: {
                children: {
                  props: {
                    columns: {
                      $set: selectedApp,
                    },
                    /*
                      포탈에 처음 들어왔을때 만들어진 apps의 경우
                      dataForApps의 selectedApp과 setMyMenuData를 바라보고 있어
                      새로 앱을 실행했어도 여전히 dataForApps를 바라본다.
                      그래서 this.props와 nextProps의 데이터가 같아 scu에서 render를 막는다.
                      이를 해결하기 위해 새로운 setMyMenuData를 넣어준다. (데이터는 동일)
                    */
                    setMyMenuData: {
                      $set: setMyMenuDataCopy,
                    },
                  },
                },
              },
            },
          },
        });

        // 생성된 apps를 스토어에 저장
        handleSaveApps(appsCopy2, setMyMenuData);
      }

      if (view !== prevProps.view) {
        if (view === 'Mobile' || view === 'Tablet') {
          const styleSpinnerCopy = Object.assign({}, this.styleSpinner);
          styleSpinnerCopy.height = '100vh';
          styleSpinnerCopy.paddingTop = '70%';

          this.styleSpinner = styleSpinnerCopy;
        }
      }
    }
  }

  onReload = item => {
    const { handleReload } = this.props;
    handleReload(item);
  };
  // ****************** 메뉴 관련 함수 ******************
  onSetOpen = open => {
    this.setState({ open: open }); //eslint-disable-line
  };
  /* eslint-disable */
  setIsSpinnerShow = () => {
    this.setState({
      isSpinnerShow: false,
    });
  };

  setOpen = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
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
    this.setState({
      open: false,
      headerMenuOpen: false,
    });
  };
  // ****************** 모바일 Dock ContextMenu 플래그 설정 콜백 함수 ******************
  setIsCloseToTrue = DOCK_ID => {
    const { isClose } = this.state;
    const isCloseCopy = Object.assign({}, isClose);
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

  deleteApps = () => {
    /* eslint-disable */
    const { apps, handleSaveApps, deletedDockPageId, setMyMenuData } = this.props;
    /* eslint-disable */

    let targetApp = -1;

    Object.keys(apps).forEach(o => {
      if (apps[o].children.props.children.props.setMyMenuData.PAGE_ID === deletedDockPageId) {
        targetApp = o;
      }
    });

    delete apps[targetApp];

    const appsCopy = apps.filter(o => o != null);
    const setMyMenuDataCopy = Object.assign({}, setMyMenuData);
    setMyMenuDataCopy.isCssTarget = true;

    handleSaveApps(appsCopy, setMyMenuDataCopy);
  };

  addInitialApps = (dataForApps, isUnreadCnt, execPage, execMenu, show, onReload, setIsSpinnerShow, isPreviewPage) => {
    // const { setMyMenuData } = this.props;
    this.setState({
      isSpinnerShow: true,
    });
    const apps = [];
    Object.keys(dataForApps).forEach(o => {
      const isActive = this.props.setMyMenuData.PAGE_ID === dataForApps[o].setMyMenuData.PAGE_ID;
      const app = ReactDOM.createPortal(
        <div
          id={dataForApps[o].setMyMenuData.PAGE_ID}
          className={`${dataForApps[o].setMyMenuData.PAGE_ID}${isActive ? ' activeMenu' : ''}`}
          style={
            isActive
              ? {
                  position: 'relative',
                  width: '100%',
                  display: 'block',
                }
              : {
                  position: 'relative',
                  width: 0,
                  display: 'none',
                  // position: 'absolute',
                }
          }
        >
          {dataForApps[o].setMyMenuData.INTL_TYPE === 'Y' ? (
            <AppsRouter
              selectedApp={dataForApps[o].selectedApp}
              setMyMenuData={dataForApps[o].setMyMenuData}
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
              columns={dataForApps[o].selectedApp}
              setMyMenuData={dataForApps[o].setMyMenuData}
              setIsSpinnerShow={setIsSpinnerShow}
              isPreviewPage={isPreviewPage}
              isUnreadCnt={isUnreadCnt}
              execPage={execPage}
              execMenu={execMenu}
              show={show}
              onReload={onReload}
            />
          )}
        </div>,
        window.document.getElementById('child'),
      );
      apps.push(app);
    });

    console.log('$$$ 5.apps값', apps);

    return apps;
  };

  addNewApps = (setMyMenuData, selectedApp, isUnreadCnt, execPage, execMenu, show, onReload, setIsSpinnerShow, isPreviewPage) => {
    const { handleSaveApps, apps } = this.props;

    let app = [];

    // Need some simple way to distinquish the different dialogs.
    app = ReactDOM.createPortal(
      <div id={setMyMenuData.PAGE_ID} className={setMyMenuData.PAGE_ID} style={{ position: 'absolute', left: 0, width: '100%' }}>
        {setMyMenuData.INTL_TYPE === 'Y' ? (
          <AppsRouter
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
      </div>,
      window.document.getElementById('child'),
    );
    let test = [];
    if (app.length !== 0) {
      test = apps.concat(app);
    } else {
      test = apps;
    }

    const setMyMenuDataCopy = Object.assign({}, setMyMenuData);
    setMyMenuDataCopy.isCssTarget = true;

    // a = true;
    handleSaveApps(test, setMyMenuDataCopy);
  };
  // ****************** 모바일 Dock ContextMenu 플래그 설정 콜백 함수 끝 ******************
  handleClick = () => {
    this.setState(this.state.isFullscreenEnabled ? { isFullscreenEnabled: false } : { isFullscreenEnabled: !false });
  };
  // ****************** 스킨 설정 함수 ******************
  applySkin = () => {
    const { handleLoadSkin } = this.props;
    handleLoadSkin();
  };
  // ****************** 스킨 설정 함수 끝 ******************
  hideMenuButtonClick = () => {
    this.onSetOpen(false);
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
    if (node === 'common') {
      const homeApp = dockAppList[dockAppList.findIndex(item => item.HOME_YN === 'Y')];
      this.props.history.push(`/${basicPath.PAGE}/${homeApp.PAGE_ID}`);
      return;
    }

    if (node === 'set') {
      // this.props.deleteDock();
      if (this.props.view !== 'Mobile') {
        this.props.history.push(`/${basicPath.PORTAL}/settings`);
      } else {
        this.props.history.push(`/${basicPath.PORTAL}/settings`);
        this.setState({ open: false });
      }
      return;
    }

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
        this.props.history.push({
          pathname: `/${basicPath.APPS}/${node.PAGE_ID}`,
          execInfo: state,
        });
      } else {
        // console.log('!!!!!!!!!!!!!! INTL TYPE3 !!!!!!!!!!', node);
        this.props.history.push({
          pathname: `/${basicPath.PAGE}/${node.PAGE_ID}`,
          execInfo: state,
        });
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

  goStore = () => {
    this.props.history.push(`/${basicPath.PORTAL}/store`);
    this.setState({ open: false });
  };

  goSettings = () => {
    this.props.history.push(`/${basicPath.PORTAL}/settings`);
    this.setState({ open: false });
  };

  goBusinessReg = () => {
    this.props.history.push(`/${basicPath.PORTAL}/store/appMain/bizManage/bizMenuReg/info/1`);
    this.setState({ open: false });
  };

  render() {
    const { open, isClose, isSpinnerShow, headerMenuOpen } = this.state;
    const {
      mySkin,
      myHNotiCnt,
      myMNotiCnt,
      myMNotiList,
      setMyMenuData,
      managerInfo,
      dockAppList,
      isUnfixDockItem,
      setMyMenuNodeData,
      selectedIndex,
      menuName,
      handleSetMenuNameSelectedIndex,
      view,
      // Dock Data
      handleDndChangePosition,
      handleDndChangePositionSaga,
      handleExitDockItem,
      handleFixDockItem,
      handleUnfixDockItem,
      handleSetIsUnfixDockItem,
      handleDockSetMyMenuData,
      dockFixedYn,
      handleSetDockFixedYn,
      dockIconType,
      handleSetDockIconType,
      hasRoleAdmin,
      // selectedApp,
      // history,
    } = this.props;
    console.debug('$$$$my App Tree: ', this.props);
    const dockCallbacks = {
      handleDndChangePosition,
      handleDndChangePositionSaga,
      // DockItem 종료시 이전 실행한 앱을 띄워주기 전에 잠시 Spinner 표시
      // handleExitDockItem: (DOCK_ID) => { this.setState({ isSpinnerShow: true }, () => { handleExitDockItem(DOCK_ID); }); },
      handleExitDockItem,
      handleFixDockItem,
      handleUnfixDockItem,
      handleSetIsUnfixDockItem,
      handleDockSetMyMenuData,
    };
    let theme = themes.skin1;
    if (mySkin !== undefined) {
      theme = themes[`skin${mySkin}`];
    }
    // 라우팅 시 외부서비스나 페이지의 라우팅 경로 설정
    // let path = basicPath.APPS;
    if (setMyMenuData.INTL_TYPE === 'N' && setMyMenuData.SRC_PATH !== 'legacySVC') {
      //  path = basicPath.PAGE;
    }

    const dockHomeItemIndex = _.findIndex(dockAppList, ['HOME_YN', 'Y']);
    const dockHomeItem = dockHomeItemIndex > -1 ? dockAppList[dockHomeItemIndex] : '';
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
              {/* rendering check count 초기화용 버튼 */}
              {/* <button
                onClick={() => {
                  initializeCount(this);
                }}
                style={{
                  position: 'absolute',
                  zIndex: '1000000',
                  left: '100',
                }}
              >
                초기화버튼
              </button> */}
              <MenuCategory
                open={headerMenuOpen}
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
              />
              <UserMenu
                open={open}
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
              />
              <Header
                className="portalHeader"
                setOpen={this.setMenuOpen}
                execPage={this.execPage}
                handleClick={this.handleClick}
                setMyMenuData={setMyMenuData}
                // UserSetting으로 전달될 콜백
                myHNotiCnt={myHNotiCnt}
                managerInfo={managerInfo}
                view={view}
                hasRoleAdmin={hasRoleAdmin}
              />
              {/* test layout */}
              <div className="testDiv">
                <div className="testDiv02">
                  <div class="button">
                    {/* <input type="button" value="Start App" /> */}
                    <section class="links">
                      {/* <a class="link l1" href="#" value="Pure" /> */}
                      <Button class="link l1" icon="vertical-left" onClick={this.setOpen} />
                    </section>
                  </div>
                  <div className="testClass">
                    <div className="iconPositon" style={{ marginTop: '60px' }}>
                      <Tooltip placement="right" title="home">
                        <Icon type="home" style={{ color: 'white', fontSize: '20px' }} onClick={() => this.execPage(dockHomeItem, 'execDock')} />
                      </Tooltip>
                    </div>
                    <div className="iconPositon" style={{ marginTop: '20px' }}>
                      <Tooltip placement="right" title="app-store">
                        <Icon type="appstore" theme="filled" style={{ color: 'white', fontSize: '20px' }} onClick={this.goStore} />
                      </Tooltip>
                    </div>
                    <div className="iconPositon" style={{ marginTop: '20px' }}>
                      <Tooltip placement="right" title="환경설정">
                        <Icon type="setting" theme="filled" style={{ color: 'white', fontSize: '20px' }} onClick={this.goSettings} />
                      </Tooltip>
                    </div>
                    <div className="iconPositon" style={{ marginTop: '20px' }}>
                      <Tooltip placement="right" title="업무등록">
                        <Icon type="container" theme="filled" style={{ color: 'white', fontSize: '20px' }} onClick={this.goBusinessReg} />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
              {/* test layout */}
              <Fullscreen
                enabled={this.state.isFullscreenEnabled}
                onChange={this.setIsFullscreenEnabled}
                dockFixedYn={isDesktop(view) ? dockFixedYn : 'N'}
                dockIconType={isDesktop(view) ? dockIconType : 'MAX'}
                exitDockItem={handleExitDockItem}
                fixDockItem={handleFixDockItem}
                unfixDockItem={handleUnfixDockItem}
                // 모바일 Dock ContextMenu 플래그 설정
                view={view}
                setIsCloseToFalse={this.setIsCloseToFalse}
                setMyMenuData={setMyMenuData}
              >
                <div id="child" className={setMyMenuData.APP_YN === 'Y' || setMyMenuData.INTL_TYPE === 'Y' ? '' : 'gridWrapper'}>
                  <Content
                    className="portalContent"
                    style={{
                      flexShrink: '0',
                    }}
                  >
                    <Spin size="large" style={this.styleSpinner} spinning={isSpinnerShow} />
                    {this.props.apps}
                  </Content>
                  <Route
                    path={`/${basicPath.PORTAL}/settings`}
                    render={() => (
                      <UserSetting //eslint-disable-line
                        applySkin={this.applySkin}
                      />
                    )}
                  />
                  <Route
                    path={`/${basicPath.PORTAL}/store/appMain/bizManage/bizMenuReg/info/1`}
                    render={props => (
                      <UserStore //eslint-disable-line
                        {...props}
                        applySkin={this.applySkin}
                      />
                    )}
                  />
                  <Route
                    path={`/${basicPath.PORTAL}/store`}
                    render={props => (
                      <UserStore //eslint-disable-line
                        {...props}
                        applySkin={this.applySkin}
                      />
                    )}
                  />
                </div>
              </Fullscreen>
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
              <UserDock
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
              />
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
                {this.state.show === true && <RodalPage tabNum={this.state.tabNum} onClose={this.hide} show={this.show} />}
              </Rodal>
            </AppWrapper>
          </Scrollbars>
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
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(wrap(App));
