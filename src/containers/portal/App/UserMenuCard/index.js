import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { ThemeProvider } from 'styled-components';
import themes from 'config/themes/index';
import ErrorBoundary from 'containers/common/ErrorBoundary';
import Loadable from 'components/Loadable';

import StyleUserMenuCard from './StyleUserMenuCard';
import AppWrapper from './AppWrapper';

// import BizMenuCardList from './BizMenuCardList';
// import BizMenuCardDetail from './BizMenuCardDetail';

import './global-userMenuCard.css';

const BizMenuCardList = Loadable({ loader: () => import('./BizMenuCardList') });
const BizMenuCardDetail = Loadable({ loader: () => import('./BizMenuCardDetail') });

const { Content } = Layout;

class UserMenuCard extends PureComponent {
  componentDidMount() {
    this.props.hideExecApps();
  }

  getPageHeaderTitle = () => {
    const {
      history: {
        location: { pathname },
      },
    } = this.props;
    if (pathname.includes('bizManage')) return 'Biz Card Manage';
    // if (pathname.includes('widgetsetting')) return '위젯 설정';
    if (pathname.includes('myPage')) return 'Home Widget';
    return 'Biz Card';
  };

  render() {
    const { execMenu, execPage } = this.props;
    return (
      <StyleUserMenuCard className="userSetting">
        <div className="userBizMenuWrapper">
          {/* Todo - Title 사용 시 아래 h2 코드 이용 */}
          <h2 className="pageHeader menuCardClass">{this.getPageHeaderTitle()}</h2>
          <ThemeProvider theme={themes.themedefault}>
            <Layout className="storeLayout" style={{ minHeight: '100%' }}>
              <AppWrapper style={{ width: '100%' }}>
                <Content className="storeContent">
                  <div className="contentWrapper">
                    <ErrorBoundary>
                      <Switch>
                        <Route path="/portal/card/:TYPE/list/:ID" render={props => <BizMenuCardList {...props} />} />
                        <Route path="/portal/card/:TYPE/detail" render={props => <BizMenuCardDetail {...props} execMenu={execMenu} execPage={execPage} />} />
                        {/* <Route */}
                        {/*  path="/portal/card/:TYPE/detail/app/:BIZGRP_ID/:ID" */}
                        {/*  render={props => <BizMenuCardDetail {...props} execMenu={execMenu} execPage={execPage} />} */}
                        {/* /> */}
                        {/* <Route */}
                        {/*  path="/portal/card/:TYPE/detail/page/:BIZGRP_ID/:ID" */}
                        {/*  render={props => <BizMenuCardDetail {...props} execMenu={execMenu} execPage={execPage} />} */}
                        {/* /> */}
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

UserMenuCard.propTypes = {
  hideExecApps: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default UserMenuCard;
