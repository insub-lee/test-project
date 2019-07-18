import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import { ThemeProvider } from 'styled-components';
import themes from 'config/themes/index';
import StyleUserBiz from './StyleUserBiz';
import AppWrapper from './AppWrapper';

import BizMenuList from './BizMenuList';

import './global-userBiz.css';

const { Content } = Layout;

class UserBizMenu extends Component {
  componentDidMount() {
    console.debug('>>>>>>>>>>>>>>여긴 업무 폴더: ', this.props);
  }

  render() {
    return (
      <StyleUserBiz className="userSetting">
        <div className="userBizMenuWrapper">
          <h2 className="pageHeader">업무 폴더 메뉴</h2>
          <ThemeProvider theme={themes.themedefault}>
            <Layout className="storeLayout" style={{ minHeight: '100vh' }}>
              <AppWrapper style={{ width: '100%' }}>
                <Content className="storeContent">
                  <div className="contentWrapper">
                    <Switch>
                      <Route path="/portal/bizMenu" component={BizMenuList} />
                      <Route exact path="/portal/bizMenu/:ID" component={BizMenuList} />
                    </Switch>
                  </div>
                </Content>
              </AppWrapper>
            </Layout>
          </ThemeProvider>
        </div>
      </StyleUserBiz>
    );
  }
}

export default UserBizMenu;
