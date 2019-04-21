import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route } from 'react-router-dom';
import { Layout, Icon, Menu } from 'antd';
import { createStructuredSelector } from 'reselect';
import { ThemeProvider } from 'styled-components';

import injectReducer from 'utils/injectReducer';
import Logo from 'components/Logo';
import Sidebar from './Sidebar';
import Division from '../Account/Division';
import Admin from '../Account/Admin';
import Sync from '../Account/Sync';
import themes from '../../../config/themes/index';

import * as selectors from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import Trigger from './Trigger';

// import Test01 from '../Test/Test01';
// import Test02 from '../Test/Test02';
// import Test03 from '../Test/Test03';

// import CodeAdmin from '../CodeAdmin';
// import SiteAdmin from '../SiteAdmin';
// import GlobalAdmin from '../GlobalAdmin';

const {
  Content,
  Header,
  Sider,
  Footer,
} = Layout;

const App = props => (
  <ThemeProvider theme={themes.themedefault}>
    <Layout style={{ height: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={props.collapsed}
      >
        <Logo />
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['1']}
        >
          <Sidebar menus={props.menus[0].nav} historyPush={url => props.historyPush(url)} />
        </Menu>
      </Sider>
      <Layout>
        <Header style={{
          background: '#fff',
          padding: 0,
          height: 67,
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        }}
        >
          <Trigger>
            <Icon
              className="trigger"
              type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={() => props.toggleCollapseSidebar()}
            />
          </Trigger>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            {
              props.menus.map(menu => (
                <Menu.Item key={menu.key}>
                  <Icon type="mail" />{menu.name}
                </Menu.Item>
              ))
            }
          </Menu>
        </Header>
        <Content
          style={{
            background: '#f1f3f6',
            padding: 15,
            flexShrink: '0',
            minHeight: 280,
          }}
        >
          <Route exact path="/" />
          <Route path="/admin/account/divisionManage" component={Division} />
          <Route path="/admin/account/adminManage" component={Admin} />
          <Route path="/admin/account/syncManage" component={Sync} />
          {/* <Route path="/admin/test/test01" component={Test01} />
          <Route path="/admin/test/test02" component={Test02} />
          <Route path="/admin/test/test03" component={Test03} />
          <Route path="/admin/codeadmin" component={CodeAdmin} />
          <Route path="/admin/siteadmin" component={SiteAdmin} />
          <Route path="/admin/globaladmin" component={GlobalAdmin} /> */}


        </Content>
        <Footer
          style={{
            background: '#ffffff',
            textAlign: 'center',
            borderTop: '1px solid #ededed',
          }}
        >
          Footer!!!
        </Footer>
      </Layout>
    </Layout>
  </ThemeProvider>
);

App.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  menus: PropTypes.array, //eslint-disable-line
  historyPush: PropTypes.func, //eslint-disable-line
  toggleCollapseSidebar: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    toggleCollapseSidebar: () => dispatch(actions.toggleCollapseSidebar()),
    historyPush: url => dispatch(push(url)),
  }
);

const mapStateToProps = createStructuredSelector({
  menus: selectors.makeSelectMenus(),
  collapsed: selectors.makeSelectCollapsed(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'app', reducer });

export default compose(
  withReducer,
  withConnect,
)(App);
