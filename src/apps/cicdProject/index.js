import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';

import { ThemeProvider } from 'styled-components';

import themes from 'config/themes/index';

import 'containers/store/App/global-store.css';
import 'containers/admin/App/global-admin.css';

import projectReg from './projectReg';
import projectList from './projectList';
import projectDtl from './projectDtl';

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
    // athis.handleVisibleChange = this.handleVisibleChange.bind(this);
  }

  hide = () => {
    this.setState({
      // visible: false,
    });
  }

  render() {
    return (
      <ThemeProvider theme={themes.skin1}>
        <Layout
          className="storeLayout"
          style={{ minHeight: '100vh' }}
        >
          <AppWrapper style={{ width: '100%' }}>
            <Content className="storeContent">
              {/* 비즈앱 메인 콘텐츠 */}
              <div style={{ width: '100%' }}>
                <Route exact path="/apps/cicdProject" component={projectList} />
                <Route exact path="/apps/cicdProject/projectList" component={projectList} />
                <Route exact path="/apps/cicdProject/projectReg" component={projectReg} />
                <Route exact path="/apps/cicdProject/projectDtl" component={projectDtl} />
              </div>
            </Content>
          </AppWrapper>
        </Layout>
      </ThemeProvider>
    );
  }
}

export default App;
