import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'containers/common/ErrorBoundary';

import AppBasicInfo from '../../../AppDetail/AppBasicInfo';
import AppScreenshot from '../../../AppDetail/AppScreenshot';
import AppQna from '../../../AppDetail/AppQna/index';
import AppRating from '../../../AppDetail/AppRating/index';

const AppInfo = ({
  match: {
    params: { appId },
  },
}) => (
  <div>
    <ErrorBoundary>
      <AppBasicInfo targetUrl={window.location.href} appId={appId} />
    </ErrorBoundary>
    <ErrorBoundary>
      <AppScreenshot appId={appId} gubun={2} />
    </ErrorBoundary>
    <ErrorBoundary>
      <AppQna appId={appId} gubun="a" />
    </ErrorBoundary>
    <ErrorBoundary>
      <AppRating appId={appId} />
    </ErrorBoundary>
  </div>
);

AppInfo.propTypes = {
  match: PropTypes.object.isRequired,
};

export default AppInfo;
