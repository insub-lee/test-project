import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'containers/common/ErrorBoundary';

import AppBasicInfo from '../../../AppDetail/AppBasicInfo';
import AppScreenshot from '../../../AppDetail/AppScreenshot';
import AppQna from '../../../AppDetail/AppQna/index';
import AppRating from '../../../AppDetail/AppRating/index';

class AppInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appId: props.match.params.appId,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    const { params } = match;
    const { appId } = params;

    if (appId && this.state.appId !== appId) {
      this.setState({
        appId,
      });
    }
  }

  render() {
    return (
      <div>
        <ErrorBoundary>
          <AppBasicInfo targetUrl={window.location.href} appId={this.state.appId} history={this.props.history} />
        </ErrorBoundary>
        <ErrorBoundary>
          <AppScreenshot appId={this.state.appId} gubun={2} />
        </ErrorBoundary>
        <ErrorBoundary>
          <AppQna appId={this.state.appId} gubun="a" />
        </ErrorBoundary>
        <ErrorBoundary>
          <AppRating appId={this.state.appId} />
        </ErrorBoundary>
      </div>
    );
  }
}

AppInfo.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default AppInfo;
