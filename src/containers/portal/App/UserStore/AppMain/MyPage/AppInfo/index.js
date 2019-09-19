import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'containers/common/ErrorBoundary';

import AppDetailStyle from 'containers/store/AppMain/AppDetail/appDetailStyle';
import AppBasicInfo from '../../AppDetail/AppBasicInfo';
import AppScreenshot from '../../AppDetail/AppScreenshot';
import AppQna from '../../AppDetail/AppQna/index';
import AppRating from '../../AppDetail/AppRating/index';

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

    if (APP_ID && this.state.appId !== APP_ID) {
      this.setState({
        appId: APP_ID,
      });
    }
  }

  render() {
    const { history, execPage, execMenu } = this.props;
    return (
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        <AppDetailStyle style={{ margin: '30px auto 0' }}>
          <ErrorBoundary>
            <AppBasicInfo targetUrl={window.location.href} appId={this.state.appId} history={history} execPage={execPage} execMenu={execMenu} />
          </ErrorBoundary>
          <ErrorBoundary>
            <AppScreenshot appId={this.state.appId} gubun={1} />
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
  history: PropTypes.object.isRequired,
  execPage: PropTypes.func.isRequired,
  execMenu: PropTypes.func.isRequired,
};

export default AppInfo;
