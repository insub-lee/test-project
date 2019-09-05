import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { ThemeProvider } from 'styled-components';
import themes from 'config/themes/index';
import ErrorBoundary from 'containers/common/ErrorBoundary';
import StyleUserMenuCard from './StyleUserMenuCard';
import AppWrapper from './AppWrapper';

import BizMenuCardList from './BizMenuCardList';
import BizMenuCardDetail from './BizMenuCardDetail';

import './global-userMenuCard.css';

const { Content } = Layout;

class UserMenuCard extends PureComponent {
  render() {
    console.debug('&&&&&&&& this.props: ', this.props);
    const { execMenu, execPage } = this.props;
    return(
      <StyleUserMenuCard className="userSetting">
        <div className="userBizMenuWrapper">
          <h2 className="pageHeader">업무 폴더 메뉴</h2>
          <ThemeProvider theme={themes.themedefault}>
            <Layout className="storeLayout" style={{ minHeight: '100%' }}>
              <AppWrapper style={{ width: '100%' }}>
                <Content className="storeContent">
                  <div className="contentWrapper">
                    <ErrorBoundary>
                      <Switch>
                        <Route path="/portal/card/:TYPE/list/:ID" render={ props => (<BizMenuCardList {...props} execMenu={execMenu} execPage={execPage} />)} />
                        <Route path="/portal/card/:TYPE/detail/info/:BIZGRP_ID" component={BizMenuCardDetail} />
                        <Route path="/portal/card/:TYPE/detail/app/:BIZGRP_ID/:ID" component={BizMenuCardDetail} />
                        <Route path="/portal/card/:TYPE/detail/page/:BIZGRP_ID/:ID" component={BizMenuCardDetail} />
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
  }
}

export default UserMenuCard;
