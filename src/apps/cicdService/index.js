import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import { Layout, Input, Menu, Icon } from 'antd';
import { Layout } from 'antd';

import { ThemeProvider } from 'styled-components';

import themes from 'config/themes/index';

import 'containers/store/App/global-store.css';
import 'containers/admin/App/global-admin.css';

import serviceList from './serviceList';
import serviceReg from './serviceReg';
import serviceDetail from './serviceDetail';

import AppWrapper from './AppWrapper';

const {
  Content,
} = Layout;

class App extends Component {
  constructor() {
    super();

    this.state = {
      // visible: false,
    };

    this.hide = this.hide.bind(this);
    // this.handleVisibleChange = this.handleVisibleChange.bind(this);
  }

  hide = () => {
    this.setState({
      // visible: false,
    });
  }

  render() {
    return (
      <ThemeProvider theme={themes.themedefault}>
        <Layout
          className="storeLayout"
          style={{ minHeight: '100vh' }}
        >
          <AppWrapper style={{ width: '100%' }}>
            <Content className="storeContent">
              {/* 비즈앱 메인 콘텐츠 */}
              <div style={{ width: '100%' }}>
                <Route exact path="/apps/cicdService" component={serviceList} />
                <Route exact path="/apps/cicdService/serviceList" component={serviceList} />
                <Route exact path="/apps/cicdService/serviceReg" component={serviceReg} />
                <Route exact path="/apps/cicdService/serviceDetail" component={serviceDetail} />
              </div>
            </Content>
          </AppWrapper>
        </Layout>
      </ThemeProvider>
    );
  }
}

export default App;
