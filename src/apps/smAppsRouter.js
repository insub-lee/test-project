import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { basicPath } from 'containers/common/constants';
import ApplyWidget from 'components/ApplyWidget';
import ServiceStop from 'components/ServiceStatus';
import PropTypes from 'prop-types';
import WidgetsWrapper from '../components/Page/WidgetsWrapper';

import PMSheetList from './hypm_pmSheetList';
import PmSheetTablet from './hypm_pmSheetTablet';
import PMSheetModeling from './hypm_pmSheetModeling';
import InformNote from './hypm_informNote';
import Bookroom from './bookroom';

class SmAppsRouter extends Component {
  componentDidMount() {
    const { selectedApp } = this.props;
    this.contents = this.getAppsRouter(selectedApp);
    this.forceUpdate();
  }

  getAppsRouter = (selectedApp) => { // eslint-disable-line
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
            <Route path={`/${basicPath.SINGLE}/pmSheetModeling`} component={PMSheetModeling} />
            <Route path={`/${basicPath.SINGLE}/pmSheetList`} component={PMSheetList} />
            <Route path={`/${basicPath.SINGLE}/informNote`} component={InformNote} />
            <Route path={`/${basicPath.SINGLE}/pmSheetTablet`} component={PmSheetTablet} />
            <Route path={`/${basicPath.SINGLE}/bookroom`} component={Bookroom} />
          </div>
        );
      } else if (item.SEC_YN === 'N') {
        return (
          // 해당 앱에 권한이 없는 경우
          <WidgetsWrapper item={item}>
            <ApplyWidget item={item} type={type} />
          </WidgetsWrapper>
        );
      }
    } else {
      return (
        <div />
      );
    }
  }

  // componentDidUpdate() {
  //   const { selectedApp } = this.state;
  //   if (selectedApp !== null) {
  //     this.props.setIsSpinnerShow();
  //   }
  // }

  render() {
    console.log('$$$ singleappsRouter의 render()');

    return (
      <div className="appsRoute">{this.contents}</div>
    );
  }
}

SmAppsRouter.propTypes = {
  selectedApp: PropTypes.array.isRequired,
  // setIsSpinnerShow: PropTypes.func.isRequired,
};

export default SmAppsRouter;
