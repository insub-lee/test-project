import React, { Component } from './node_modules/react';
import PropTypes from './node_modules/prop-types';
import ErrorBoundary from './node_modules/containers/common/ErrorBoundary';

import AppDetailStyle from './node_modules/containers/store/AppMain/AppDetail/appDetailStyle';
import AppBasicInfo from '../../../../store/AppMain/AppDetail/AppBasicInfo';
import AppScreenshot from '../../../../store/AppMain/AppDetail/AppScreenshot';
import AppQna from '../../../../store/AppMain/AppDetail/AppQna/index';
import AppRating from '../../../../store/AppMain/AppDetail/AppRating/index';

class AppInfo extends Component {
  constructor(props) {
    super(props);

    const { match } = props;
    const { params } = match;
    const { APP_ID } = params;

    this.state = {
      appId: APP_ID,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    const { params } = match;
    const { APP_ID } = params;

    if (APP_ID
      && this.state.appId !== APP_ID) {
      this.setState({
        appId: APP_ID,
      });
    }
  }


  render() {
    return (
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        <AppDetailStyle style={{ margin: '30px auto 0' }}>
          <ErrorBoundary>
            <AppBasicInfo
              targetUrl={window.location.href}
              appId={this.state.appId}
            />
          </ErrorBoundary>
          <ErrorBoundary>
            <AppScreenshot
              appId={this.state.appId}
              gubun={1}
            />
          </ErrorBoundary>
          <ErrorBoundary>
            <AppQna appId={this.state.appId} gubun="a" />
          </ErrorBoundary>
          <ErrorBoundary>
            <AppRating
              appId={this.state.appId}
            />
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
