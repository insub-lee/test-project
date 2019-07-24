import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { ThemeProvider } from 'styled-components';
import themes from 'config/themes/index';
import StyleUserMenuCard from './StyleUserMenuCard';
import AppWrapper from './AppWrapper';
import ErrorBoundary from 'containers/common/ErrorBoundary';

import BizMenuCardList from './BizMenuCardList';

import './global-userMenuCard.css';

const { Content } = Layout;

const UserMenuCard = () => (
  <StyleUserMenuCard className="userSetting">
    <div className="userBizMenuWrapper">
      <h2 className="pageHeader">업무 폴더 메뉴</h2>
      <ThemeProvider theme={themes.themedefault}>
        <Layout className="storeLayout" style={{ minHeight: '100vh' }}>
          <AppWrapper style={{ width: '100%' }}>
            <Content className="storeContent">
              <div className="contentWrapper">
                <ErrorBoundary>
                  <Switch>
                    <Route path="/portal/card/:TYPE/list/:ID" component={BizMenuCardList} />
                    <Route path="/portal/card/:TYPE/detail/info/:ID" component={BizMenuCardList} />
                  </Switch>
                </ErrorBoundary>
              </div>
            </Content>
          </AppWrapper>
        </Layout>
      </ThemeProvider>
    </div>
  </StyleUserMenuCard>
);

export default UserMenuCard;
