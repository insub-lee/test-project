import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'containers/common/ErrorBoundary';

import AppDetailStyle from 'containers/admin/AdminMain/AppDetail/appDetailStyle';
import AppBasicInfo from 'containers/admin/AdminMain/AppDetail/AppBasicInfo';
import AppScreenshot from 'containers/admin/AdminMain/AppDetail/AppScreenshot';
import AppQna from 'containers/admin/AdminMain/AppDetail/AppQna/index';
import AppRating from 'containers/admin/AdminMain/AppDetail/AppRating/index';

class AppInfo extends Component {
  constructor(props) {
    super(props);

    const { match } = props;
    const { params } = match;
    const { APP_ID, SITE_ID } = params;

    this.state = {
      appId: APP_ID,
      SITE_ID: Number(SITE_ID) || 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    const { params } = match;
    const { APP_ID, SITE_ID } = params;

    if (APP_ID && this.state.appId !== APP_ID) {
      this.setState({
        appId: APP_ID,
        SITE_ID: Number(SITE_ID) || 0,
      });
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        <AppDetailStyle style={{ margin: '30px auto 0' }}>
          <ErrorBoundary>
            <AppBasicInfo targetUrl={window.location.href} appId={this.state.appId} visibleInfo={false} SITE_ID={this.state.SITE_ID} />
          </ErrorBoundary>
          <ErrorBoundary>
            <AppScreenshot appId={this.state.appId} gubun={1} SITE_ID={this.state.SITE_ID} />
          </ErrorBoundary>
          <ErrorBoundary>
            <AppQna appId={this.state.appId} gubun="a" />
          </ErrorBoundary>
          <ErrorBoundary>
            <AppRating appId={this.state.appId} />
          </ErrorBoundary>
        </AppDetailStyle>
      </div>
    );
  }
}

AppInfo.propTypes = {
  match: PropTypes.object.isRequired,
};

export default AppInfo;
