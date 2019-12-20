import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route, Link } from 'react-router-dom';
// import { Layout, Input, Menu, Icon } from 'antd';
import { Layout, Input, Icon } from 'antd';
import { createStructuredSelector } from 'reselect';
import { intlObj, lang } from 'utils/commonUtils';
import { ThemeProvider } from 'styled-components';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// import * as actionsLoading from 'containers/common/Loading/actions';
// import * as selectorsLoading from 'containers/common/Loading/selectors';
// import LoadingSpin from 'containers/common/LoadingSpin';

import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';

import themes from '../../../config/themes/index';

// import Sidebar from './Sidebar';
import Trigger from './Trigger';

import AppMain from '../AppMain';
import AppList from '../AppMain/AppList';

import * as selectors from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import messages from './messages';
import saga from './saga';

import Popover from '../../../components/Popover';
import Button from '../../../components/Button';
import AppWrapper from './AppWrapper';
import './global-store.css';

import storeHome from '../../../images/bizstore/home-appstore.png';
import AppCategory from '../components/AppCategory';
import BizCategory from '../components/BizCategory';

const { Header, Content, Sider } = Layout;

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      visible: false,
      mobileSearchVisible: false,
    };

    this.handleVisibleChange = this.handleVisibleChange.bind(this);

    props.getMenu('STORE');
  }

  componentWillReceiveProps(nextProps) {
    const {
      searchword,
      history,
      menuList,
      // isLoading,
    } = nextProps;
    const { location } = history;
    const { pathname } = location;

    if (searchword !== undefined && this.props.searchword !== searchword) {
      this.searchInput.input.value = searchword;
    }

    if (menuList.length > 0) {
      const paths = pathname.split('/');
      if (paths.length > 3) {
        const menu = paths[3]; // /store/appMain/bizStore/*biz*
        menuList.forEach(m => {
          const newMenuName = lang.get('NAME', m);
          if (m.URL.split('/')[3] === menu && this.props.menuName !== newMenuName) {
            this.props.changeMenuName(newMenuName);
          }
        });
      } else {
        this.props.changeMenuName(lang.get('NAME', menuList[0]));
      }
    }
    this.props.menuAuthChk(pathname, history, 'STORE');
  }

  onClickMenu = () => {
    this.hide();
  };

  handleVisibleChange(visible) {
    this.setState({ visible });
  }

  searchEnter = e => {
    if (e.key === 'Enter') {
      this.search();
    }
  };

  search = () => {
    const searchword = this.searchInput.input.value;
    this.props.changeSearchword(searchword);

    const type = this.props.history.location.pathname.indexOf('/bizStore/biz') > -1 ? 'biz' : 'app';

    if (searchword.trim() === '') {
      this.props.history.push(`/store/appMain/bizStore/${type}/list`);
    } else if (this.props.searchword !== searchword || this.props.currentView === 'Mobile' || this.props.currentView === 'Tablet') {
      this.props.history.push(`/store/appMain/bizStore/${type}/search/${searchword}`);
    }
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  makeMenu = menuList => (
    <ul>
      {menuList.map(m => (
        <li key={`SCR_CD_${m.SCR_CD}`}>
          <Link
            to={m.URL}
            title={lang.get('NAME', m)}
            onClick={() => {
              this.onClickMenu();
              this.props.changeSearchword('');
            }}
          >
            {lang.get('NAME', m)}
          </Link>
        </li>
      ))}
    </ul>
  );

  handleOnClick = node => {
    this.props.history.push(`/store/appMain/bizStore/app/list/${node.key}`);
    this.setState({ visible: false });
  };

  handleTreeOnClick = node => {
    if (node.children || node.MENU_EXIST_YN === 'N') {
      this.props.history.push(`/store/appMain/bizStore/biz/list/${node.key}`);
    } else {
      this.props.history.push(`/store/appMain/bizStore/biz/detail/info/${node.key}`);
    }
    this.setState({ visible: false });
  };

  makecate = appbizGubun => (
    <div>
      {appbizGubun === 0 ? (
        <AppCategory handleOnClick={this.handleOnClick} menuNum={0} selectedIndex={-1} preUrl="/store/appMain/bizStore" />
      ) : (
        <BizCategory handleOnClick={this.handleTreeOnClick} preUrl="/store/appMain/bizStore" />
      )}
    </div>
  );

  render() {
    const {
      history,
      menuList,
      collapsed,
      toggleCollapseSidebar,
      // isLoading, // 검색로딩
      currentView,
      appbizGubun,
    } = this.props;

    const { mobileSearchVisible } = this.state;

    const mobileSearch = () => {
      if (mobileSearchVisible) {
        this.search();
      } else {
        this.setState({ mobileSearchVisible: true });
      }
    };
    const mobileSearchHide = () => {
      if (mobileSearchVisible) {
        this.setState({ mobileSearchVisible: false });
      }
    };

    return (
      <ThemeProvider theme={themes.themedefault}>
        <Layout className="storeLayout" style={{ minHeight: '100vh' }}>
          <Sider trigger={null} collapsible collapsed={collapsed} className="siderLayout" />
          <AppWrapper style={{ width: '100%' }}>
            <Header className="storeHeader">
              <Trigger className="triggerSider">
                <Icon className="trigger" type={collapsed ? 'sider-unfold' : 'sider-fold'} onClick={() => toggleCollapseSidebar()} />
              </Trigger>
              {appbizGubun === 0 || appbizGubun === 1 || (currentView !== 'Mobile' && currentView !== 'Tablet') ? (
                <Popover
                  placement="bottomLeft"
                  content={currentView === 'Mobile' || currentView === 'Tablet' ? this.makecate(appbizGubun) : this.makeMenu(menuList)}
                  // content={hamburgerMenu}
                  overlayClassName="storeSubmenu"
                  trigger="click"
                  visible={this.state.visible}
                  onVisibleChange={this.handleVisibleChange}
                >
                  <Button className="headerMenu" title={intlObj.get(messages.menu)}>
                    <span className="icon icon-menu" />
                  </Button>
                </Popover>
              ) : (
                ''
              )}
              {(appbizGubun === 3 || appbizGubun === 4) && (currentView === 'Mobile' || currentView === 'Tablet') ? (
                <Button onClick={() => history.goBack()} className="goBack" title={intlObj.get(messages.goBack)} />
              ) : (
                ''
              )}
              <h2 className="pageHeader">{this.props.menuName}</h2>
              <div className="onCenter">
                <h1 className="siteHeader">
                  <Link to="/store">
                    <img src={storeHome} alt={intlObj.get(messages.bizStroeMain)} />
                  </Link>
                </h1>
                <Button className="headerMenu bizLogo" title={intlObj.get(messages.menu)} />
              </div>
              {currentView === 'Mobile' || currentView === 'Tablet' ? (
                <div className={mobileSearchVisible ? 'onRight mobile active' : 'onRight mobile'}>
                  <button
                    title={intlObj.get(messages.close)}
                    style={{
                      display: mobileSearchVisible ? 'inline-block' : 'none',
                    }}
                    onClick={mobileSearchHide}
                    className="closeBtn"
                  />
                  <div
                    style={{
                      display: mobileSearchVisible ? 'inline-block' : 'none',
                    }}
                    className="searchInputMobile"
                  >
                    <Input
                      placeholder={intlObj.get(messages.enterSearchword)}
                      title={intlObj.get(messages.searchBizStore)}
                      onKeyPress={this.searchEnter}
                      ref={ref => {
                        this.searchInput = ref;
                      }}
                    />
                  </div>
                  <button title={intlObj.get(messages.search)} onClick={mobileSearch} className="searchButton" />
                </div>
              ) : (
                <div className="onRight">
                  <div className="searchInput store">
                    <Input
                      placeholder=""
                      title={intlObj.get(messages.searchBizStore)}
                      onKeyPress={this.searchEnter}
                      ref={ref => {
                        this.searchInput = ref;
                      }}
                    />
                    <button className="searchButton" title={intlObj.get(messages.search)} onClick={this.search} />
                  </div>
                </div>
              )}
            </Header>

            <Content className="storeContent">
              <div className="contentWrapper">
                <Route exact path="/" />
                <Route exact path="/store" component={AppList} />
                <Route path="/store/appMain" component={AppMain} />
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

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  // )(App);
)(DragDropContext(HTML5Backend)(App));
