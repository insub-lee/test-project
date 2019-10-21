import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { basicPath } from 'containers/common/constants';
import ErrorBoundary from 'containers/common/ErrorBoundary';
import Loadable from 'react-loadable';
import ApplyWidget from 'components/ApplyWidget';
import ServiceStop from 'components/ServiceStatus';
import PropTypes from 'prop-types';
import Loading from './Loading';
import WidgetsWrapper from '../components/Page/WidgetsWrapper';
import WorkBuilderViewer from './WorkBuilderApp/User/WorkBuilderViewerPage';
import Draft from './WorkFlow/User/Draft';

class AppsRouter extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { selectedApp } = this.props;
    this.forceUpdate();
    this.contents = this.getAppsRouter(selectedApp);
  }

  componentWillReceiveProps(nextProps) {
    // 2019.10.21 REMOVE PORTAL MULTIPLE DIVS
    // if (JSON.stringify(this.props.columns) !== JSON.stringify(nextProps.columns)) {
    if (nextProps.columns && JSON.stringify(this.props.columns) !== JSON.stringify(nextProps.columns)) {
      this.contents = this.getAppsRouter(nextProps.columns);
    }
  }

  getAppsRouter = selectedApp => {
    const type = 'swidget';
    const item = selectedApp[0];
    console.log('$$$ appsRouter item', item);

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
          <div>
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
                path={`/${basicPath.APPS}/draft/:CATE`}
                render={props => (
                  <ErrorBoundary>
                    <Draft {...props} />
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
    <div />;
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
