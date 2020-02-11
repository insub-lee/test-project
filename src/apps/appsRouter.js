import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { basicPath } from 'containers/common/constants';
import ErrorBoundary from 'containers/common/ErrorBoundary';
// import Loadable from 'react-loadable';
import Loadable from 'components/Loadable';
import ApplyWidget from 'components/ApplyWidget';
import ServiceStop from 'components/ServiceStatus';
import PropTypes from 'prop-types';
import Loading from './Loading';
import WidgetsWrapper from '../components/Page/WidgetsWrapper';
// 뷰어 변경 jhkim 20-02-07
// import WorkBuilderViewer from './WorkBuilderApp/User/WorkBuilderViewerPage';
import WorkBuilderViewer from './WorkBuilderApp/User/BizBuilderViewer';
import ApproveBase from './Workflow/User/ApproveBase';

class AppsRouter extends React.PureComponent {
  componentDidMount() {
    const { selectedApp } = this.props;
    this.forceUpdate();
    this.contents = this.getAppsRouter(selectedApp);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { selectedApp: prevSelectedApp } = prevProps;
    const { selectedApp } = this.props;
    if (selectedApp && prevSelectedApp && JSON.stringify(selectedApp) !== JSON.stringify(prevSelectedApp)) {
      this.forceUpdate();
      this.contents = this.getAppsRouter(selectedApp);
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   // REMOVE PORTAL MULTIPLE DIVS
  //   // if (JSON.stringify(this.props.columns) !== JSON.stringify(nextProps.columns)) {
  //   // console.debug('@@@@', this.props, nextProps.columns);
  //   if (nextProps.columns && JSON.stringify(this.props.columns) !== JSON.stringify(nextProps.columns)) {
  //     this.contents = this.getAppsRouter(nextProps.columns);
  //   }
  // }

  getAppsRouter = selectedApp => {
    const type = 'swidget';
    const item = selectedApp[0];

    const Comp = Loadable({
      loader: () => import(`apps/${item.legacyPath}`),
      loading: Loading,
    });

    if (selectedApp.length > 0) {
      // 해당 앱의 상태가 중지인 경우
      if (item.SVC_YN === 'C' || item.CATG_ID === '') {
        return (
          <WidgetsWrapper item={item}>
            <ErrorBoundary>
              <ServiceStop item={item} type={type} />
            </ErrorBoundary>
          </WidgetsWrapper>
        );
      }
      if (item.SVC_YN !== 'C' && item.SEC_YN === 'Y' && item.CATG_ID !== '') {
        // 해당 앱이 서비스 중이면서, 해당 앱에 대한 권한이 있을 경우
        return (
          <div className="AppsRouterWrapper">
            <Switch>
              <Route
                path={`/${basicPath.APPS}/workBuilder/:ID`}
                render={props => (
                  <ErrorBoundary>
                    <WorkBuilderViewer {...props} />
                  </ErrorBoundary>
                )}
              />
              <Route
                path={`/${basicPath.APPS}/Workflow/User/ApproveBase/:CATE`}
                render={props => (
                  <ErrorBoundary>
                    <ApproveBase {...props} />
                  </ErrorBoundary>
                )}
              />
              <Route
                path={`/${basicPath.APPS}/${item.legacyPath}`}
                render={() => (
                  <ErrorBoundary>
                    <Comp />
                  </ErrorBoundary>
                )}
              />
            </Switch>
          </div>
        );
      }
      return (
        // 해당 앱에 권한이 없는 경우
        <WidgetsWrapper item={item}>
          <ErrorBoundary>
            <ApplyWidget item={item} type={type} />
          </ErrorBoundary>
        </WidgetsWrapper>
      );
    }
    return <div />;
  };

  render() {
    console.log('$$$ appsRouter의 render()', this.contents);
    return <div className="appsRoute">{this.contents}</div>;
  }
}

AppsRouter.propTypes = {
  selectedApp: PropTypes.array.isRequired,
  columns: PropTypes.array,
};

export default AppsRouter;
