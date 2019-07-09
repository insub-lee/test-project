import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { basicPath } from 'containers/common/constants';
import ApplyWidget from 'components/ApplyWidget';
import ServiceStop from 'components/ServiceStatus';
import PropTypes from 'prop-types';
import WidgetsWrapper from '../components/Page/WidgetsWrapper';

import Bookroom from './bookroom';
import Bc from './businesscard';
import PMSheetList from './hypm_pmSheetList';
import PmSheetTablet from './hypm_pmSheetTablet';
import PMSheetModeling from './hypm_pmSheetModeling';
import InformNote from './hypm_informNote';
import CicdProject from './cicdProject';
import CicdService from './cicdService';

import WorkBuilderViewer from './WorkBuilderApp/WorkBuilderViewerPage';

class AppsRouter extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { selectedApp } = this.props;
    this.contents = this.getAppsRouter(selectedApp);
    this.forceUpdate();
  }

  getAppsRouter = (selectedApp) => {
    const type = 'swidget';
    const item = selectedApp[0];
    console.log('$$$ appsRouter item', item);
    if (selectedApp.length > 0) {
      // 해당 앱의 상태가 중지인 경우
      if (item.SVC_YN === 'C') {
        return (
          <WidgetsWrapper item={item}>
            <ServiceStop item={item} type={type} />
          </WidgetsWrapper>
        );
      } else if (item.SVC_YN !== 'C' && item.SEC_YN === 'Y') {
        // 해당 앱이 서비스 중이면서, 해당 앱에 대한 권한이 있을 경우
        return (
          <div>
            <Switch>
              <Route path={`/${basicPath.APPS}/bookroom`} component={Bookroom} />
              <Route path={`/${basicPath.APPS}/businesscard`} component={Bc} />
              <Route path={`/${basicPath.APPS}/pmSheetList`} component={PMSheetList} />
              <Route path={`/${basicPath.APPS}/pmSheetModeling`} component={PMSheetModeling} />
              <Route path={`/${basicPath.APPS}/informNote`} component={InformNote} />
              <Route path={`/${basicPath.APPS}/pmSheetTablet`} component={PmSheetTablet} />
              <Route path={`/${basicPath.APPS}/cicdProject`} component={CicdProject} />
              <Route path={`/${basicPath.APPS}/cicdService`} component={CicdService} />
              <Route path={`/${basicPath.APPS}/workBuilder/:ID`} component={WorkBuilderViewer} />
            </Switch>
          </div>
        )
      } else {
        return (
          // 해당 앱에 권한이 없는 경우
          <WidgetsWrapper item={item}>
            <ApplyWidget item={item} type={type} />
          </WidgetsWrapper>
        )
      }
    } else {
      <div />
    }
  }

  render() {
    console.log('$$$ appsRouter의 render()');
    return (
      <div className="appsRoute">{this.contents}</div>
    );
  }
}

AppsRouter.propTypes = {
  selectedApp: PropTypes.array.isRequired,
};

export default AppsRouter;
