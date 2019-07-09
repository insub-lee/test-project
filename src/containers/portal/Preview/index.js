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
import RootRouter from '../App/rootRouter';

const wrap = dragDropContext(HTML5Backend);
class App extends React.Component {
  constructor(props) {
    super(props);
    const {
      handleLoadSkin,
      handleonLoadCheck,
      handleGetInitialPortalPage,
      getNotify,
    } = props;

    const { params } = props.match;
    const { pageID } = params;

    handleGetInitialPortalPage(Number(pageID));
    handleLoadSkin();
    handleonLoadCheck();
    getNotify();
    this.state = {
      // UserMenu open flag
      open: false,
      // FullScreen
      isFullscreenEnabled: false,
      set: false,
      appsList: [],
      // 현재 Page에 표시된 앱이 단일앱인지 여부
      isSnglApp: false,
      isSpinnerShow: false,
      pageID,
      isPreviewPage: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      setMyMenuNodeData,
    } = this.props;
    if (setMyMenuNodeData !== nextProps.setMyMenuNodeData) {
      this.execPage(nextProps.setMyMenuNodeData);
    }
  }
  // ****************** 메뉴 관련 함수 ******************
  setIsSpinnerShow = () => {
    this.setState({
      isSpinnerShow: false,
    });
  }
  setOpen = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  }
  setIsCloseToFalse = () => {
    // console.log('여기123123123');
  }
  // ****************** 모바일 Dock ContextMenu 플래그 설정 콜백 함수 끝 ******************
  handleClick = () => {
    this.setState(this.state.isFullscreenEnabled ?
      { isFullscreenEnabled: false } : { isFullscreenEnabled: !false });
  }

  // ****************** 스킨 설정 함수 ******************
  applySkin = () => {
    const { handleLoadSkin } = this.props;
    handleLoadSkin();
  }

  execPage = (node) => {
    const {
      handleClickApps,
    } = this.props;

    const {
      pageID,
    } = this.state;

    handleClickApps(pageID, node);

    this.setState({
      set: false,
      open: false,
      isSnglApp: false,
      isSpinnerShow: true,
    });
  }
  closeSetting = () => {
    const { set } = this.state;
    this.setState({
      set: !set,
    });
  }
  render() {
    const {
      set,
      appsList,
      isSnglApp,
      isSpinnerShow,
      isPreviewPage,
    } = this.state;

    const {
      mySkin,
      setMyMenuData,
      selectedApp,
      view,
    } = this.props;
    let theme = themes.skin1;
    if (mySkin !== undefined) {
      theme = themes[`skin${mySkin}`];
    }
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
              <Header
                className="portalHeader"
                setOpen={this.setOpen}
                execPage={this.execPage}
                handleClick={this.handleClick}
                setMyMenuData={setMyMenuData}
                view={view}
                // UserSetting으로 전달될 콜백
                myHNotiCnt={0}
              />
              <Fullscreen
                enabled={this.state.isFullscreenEnabled}
                onChange={isFullscreenEnabled => this.setState({ isFullscreenEnabled })}
                isSnglApp={isSnglApp}
                // 모바일 Dock ContextMenu 플래그 설정
                view={view}
                setIsCloseToFalse={this.setIsCloseToFalse}
              >
                <Route
                  exact
                  path={`/preview/page/${this.state.pageID}`}
                  render={() => (
                    <RootRouter
                      setMyMenuData={setMyMenuData}
                      appsList={appsList}
                      selectedApp={selectedApp}
                      closeSetting={this.closeSetting}
                      applySkin={this.applySkin}
                      set={set}
                      isSpinnerShow={isSpinnerShow}
                      setIsSpinnerShow={this.setIsSpinnerShow}
                      isPreviewPage={isPreviewPage}
                    />
                  )}
                />
              </Fullscreen>
              <Footer
                style={{
                  background: 'transparent',
                }}
                view={view}
              />
            </AppWrapper>
          </Scrollbars>
        </Layout>
      </ThemeProvider>
    );
  }
}

App.propTypes = {
  match: PropTypes.object.isRequired,
  mySkin: PropTypes.number,
  handleClickApps: PropTypes.func.isRequired,
  handleLoadSkin: PropTypes.func.isRequired,
  handleonLoadCheck: PropTypes.func.isRequired,
  handleGetInitialPortalPage: PropTypes.func.isRequired,
  setMyMenuData: PropTypes.object,
  setMyMenuNodeData: PropTypes.object,
  selectedApp: PropTypes.array.isRequired,
  view: PropTypes.string.isRequired,
  getNotify: PropTypes.func.isRequired,
};

App.defaultProps = {
  setMyMenuNodeData: {},
  setMyMenuData: {},
  mySkin: undefined,
};

const mapStateToProps = createStructuredSelector({
  mySkin: selectors.makeSelectSkin(),
  setMyMenuData: selectors.makeSelectMyMenuData(),
  managerInfo: selectors.makeSelectManagerInfo(),
  selectedApp: selectors.makeSelectApps(),
  selectedIndex: selectors.makeSelectSelectedIndex(),
  menuName: selectors.makeSelectMenuName(),
  view: selectors.makeSelectView(),
  setMyMenuNodeData: selectors.makeSelectSetMyMenuNodeData(),
});

const mapDispatchToProps = dispatch => ({
  handleClickApps: (pageID, node) =>
    dispatch(actions.execApps(pageID, node)),
  handleLoadSkin: () =>
    dispatch(actions.loadSkin()),
  handleonLoadCheck: () =>
    dispatch(onLoadCheck()),
  handleGetInitialPortalPage: PAGE_ID => dispatch(actions.getInitialPortalPage(PAGE_ID)),
  getNotify: () =>
    dispatch(actions.getNotify()),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'preview', reducer });
const withSaga = injectSaga({ key: 'preview', saga });
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(wrap(App));
