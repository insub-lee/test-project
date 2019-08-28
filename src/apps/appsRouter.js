import React from 'react';
import { Route } from 'react-router-dom';
import { basicPath } from 'containers/common/constants';
import Loadable from 'react-loadable';
import Loading from './Loading';
import ApplyWidget from 'components/ApplyWidget';
import ServiceStop from 'components/ServiceStatus';
import PropTypes from 'prop-types';
import WidgetsWrapper from '../components/Page/WidgetsWrapper';

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
    if (JSON.stringify(this.props.columns) !== JSON.stringify(nextProps.columns)) {
      this.contents = this.getAppsRouter(nextProps.columns);
    }
  }

  getAppsRouter = (selectedApp) => {
    const type = 'swidget';
    const item = selectedApp[0];
    console.log('$$$ appsRouter item', item);

    const param = Loadable({
      loader: () => import(`apps/${item.legacyPath}`),
      loading: Loading,
    });

    if (selectedApp.length > 0) {
      // 해당 앱의 상태가 중지인 경우
      if (item.SVC_YN === 'C' || item.CATG_ID === '' ) {
        return (
          <WidgetsWrapper item={item}>
            <ServiceStop item={item} type={type} />
          </WidgetsWrapper>
        );
      } else if (item.SVC_YN !== 'C' && item.SEC_YN === 'Y' && item.CATG_ID !== '') {
        // 해당 앱이 서비스 중이면서, 해당 앱에 대한 권한이 있을 경우
        return (
            <div>
              <Route path={`/${basicPath.APPS}/${item.legacyPath}`} component={param} />
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
    console.log('$$$ appsRouter의 render()', this.contents);
    return (
      <div className="appsRoute">{this.contents}</div>
    );
  }
}

AppsRouter.propTypes = {
  selectedApp: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default AppsRouter;
