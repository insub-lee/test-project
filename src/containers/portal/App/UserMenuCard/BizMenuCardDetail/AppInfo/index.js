import React from 'react';
import PropTypes from 'prop-types';

import AppBasicInfo from '../../../UserStore/AppMain/AppDetail/AppBasicInfo';
import AppScreenshot from '../../../UserStore/AppMain/AppDetail/AppScreenshot';
import AppQna from '../../../UserStore/AppMain/AppDetail/AppQna/index';
import AppRating from '../../../UserStore/AppMain/AppDetail/AppRating/index';

const AppInfo = ({
  match: {
    params: { appId },
  },
  history,
  execMenu,
  execPage,
}) => (
  <div>
    <AppBasicInfo targetUrl={window.location.href} appId={appId} history={history} execMenu={execMenu} execPage={execPage}/>
    <AppScreenshot appId={appId} gubun={2} />
    <AppQna appId={appId} gubun="b" />
    <AppRating appId={appId} />
  </div>
);

AppInfo.propTypes = {
  match: PropTypes.object.isRequired,
};

export default AppInfo;
