import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import { basicPath } from 'containers/common/constants';
import ApplyWidget from 'components/ApplyWidget';
import ServiceStop from 'components/ServiceStatus';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import Loading from './Loading';
import WidgetsWrapper from '../components/Page/WidgetsWrapper';
import WorkBuilderViewer from './WorkBuilderApp/User/WorkBuilderViewerPage';
import Draft from './WorkFlow/User/Draft';

// import PMSheetList from './hypm_pmSheetList';
// import PmSheetTablet from './hypm_pmSheetTablet';
// import PMSheetModeling from './hypm_pmSheetModeling';
// import InformNote from './hypm_informNote';
// import Bookroom from './bookroom';

class SmAppsRouter extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      contents: null,
    };
  }

  componentDidMount() {
    const contents = this.getAppsRouter(this.props.selectedApp);

    this.setContents(contents);
  }

  setContents = (contents) => {
    this.setState({
      contents,
    });
  }

  getAppsRouter = (selectedApp) => { // eslint-disable-line
    const type = 'swidget';
    const item = selectedApp[0];
    console.log('$$$ appsRouter item', item);

    const param = Loadable({
      loader: () => import(`apps/${item.legacyPath}`),
      loading: Loading,
    });

    if (selectedApp.length > 0) {
      // 해당 앱의 상태가 중지인 경우
      if (item.SVC_YN === 'C' || item.CATG_ID === '') {
        return (
          <WidgetsWrapper item={item}>
            <ServiceStop item={item} type={type} />
          </WidgetsWrapper>
        );
      } else if (item.SVC_YN !== 'C' && item.SEC_YN === 'Y' && item.CATG_ID !== '') {
        // 해당 앱이 서비스 중이면서, 해당 앱에 대한 권한이 있을 경우
        return (
          <div>
            <Route path={`/${basicPath.SINGLE}/workBuilder/:ID`} component={WorkBuilderViewer} />
            <Route path={`/${basicPath.SINGLE}/draft/:CATE`} component={Draft} />
            <Route path={`/${basicPath.SINGLE}/${item.legacyPath}`} component={param} />
          </div>
        );
      } else if (item.SEC_YN === 'N' && item.CATG_ID !== '') {
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

  render() {
    console.log('$$$ smRouter render()');
    return (
      <div className="appsRoute">{this.state.contents}</div>
    );
  }
}

SmAppsRouter.propTypes = {
  selectedApp: PropTypes.array.isRequired,
};

export default SmAppsRouter;
