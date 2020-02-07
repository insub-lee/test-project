import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
// import { Debounce } from 'react-throttle';
// import { LicenseManager } from 'ag-grid-enterprise/dist/lib/licenseManager';
// import WindowResizeListener from 'react-window-size-listener';
import { checkPath, intlObj } from 'utils/commonUtils';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import 'style/sortable-tree-biz.css';
import 'utils/momentLang';

import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import * as authActions from '../Auth/actions';
import SignIn from '../Auth/index';
// import PortalApp from '../../portal/App/index';
// import PortalSingleModeApp from '../../portal/SingleModeApp/index';
// import StoreApp from '../../store/App/index';
// import AdminApp from '../../admin/App/index';
// import GuideApp from '../../guide/App/index';
// import Preview from '../../portal/Preview/index';
import * as authSelectors from '../Auth/selectors';
// import { basicPath } from '../constants';
import RestrictedRoute from './RestrictedRoute';
import routes from './routes';

// import OrganizationPopup from 'components/OrganizationPopup';
// // import Loading from 'containers/common/Loading';
// import ErrorPage from 'containers/portal/App/ErrorPage';
// import Watermark from './Watermark';

// import HyPm from '../../../apps/hyPm';

// 포탈에서 앱을 실행했을 때 사용되는 경로
// getLoaddata 함수가 실행되야함
const portalPath = ['apps', 'page'];

const portalSinglePath = ['sm'];

const etcPath = [
  'store',
  'guide',
  'portal',
  'signin',
  'admin',
  'error',
  'popup',
  'iflow',
  'preview',
  // 'hypm',
  'devpmmodel',
];

// LicenseManager.setLicenseKey('Evaluation_License-_Not_For_Production_Valid_Until_25_April_2019__MTU1NjE0NjgwMDAwMA==5095db85700c871b2d29d9537cd451b3');

class PublicRoutes extends Component {
  UNSAFE_componentWillMount() {
    const {
      location: { pathname, search },
      boot,
    } = this.props;
    console.debug('@@@ location', this.props.location);
    // const url = locState ? locState.from.pathname : '/';
    // const search = locState ? locState.from.search : '';
    boot(pathname + search, pathname);
  }

  componentDidMount() {
    const { intl } = this.props;
    intlObj.setIntl(intl);
  }

  componentDidUpdate(prevProps) {
    const { intl: prevIntl } = prevProps;
    const { isLoggedIn, intl } = this.props;

    if (JSON.stringify(prevIntl) !== JSON.stringify(intl)) {
      intlObj.setIntl(intl);
    }
    if (isLoggedIn) {
      this.loadData();
    }
  }

  loadData = () => {
    const { location, history, getLoaddata, getSingleModeLoaddata } = this.props;
    const pathArray = location.pathname.split('/');
    if (location.pathname === '/') {
      // REMOVE DOCK - 주석처리, 기본 루트로 들어왔을 경우 처리 공통홈으로 이동 처리
      // getLoaddata('latest');
      getLoaddata('commonHome');
    } else if (checkPath(pathArray[1], portalPath)) {
      // go to getLoaddata
      const param1 = pathArray[1];
      // let param2 = pathArray[2];
      let param2 = pathArray.slice(2).join('/');
      // const appStartPath = ['WorkBuilderApp', 'WorkFlow', 'manual'];
      if (Number.isInteger(Number(pathArray[2]))) param2 = Number(pathArray[2]);
      // else if (appStartPath.indexOf(pathArray[2]) > -1) param2 = pathArray.slice(2).join('/');
      const param3 = {
        isCssTarget: true,
      };

      /*
        메뉴 실행 / 독 실행 / 독 종료
        (execMenu / execDock / exitDock)
        이 세가지의 경우 MDI CSS 작업등의 이유로 PUSH를 할 때 state값을 함께 넘겨준다.
      */
      // REMOVE DOCK - TODO 아래의 DOCK 관련된 부분 찾아서 제거
      if (history.location.execInfo) {
        param3.type = history.location.execInfo.type;
        switch (history.location.execInfo.type) {
          case 'execMenu':
            param3.node = history.location.execInfo.node;
            param3.executedDockPageId = history.location.execInfo.executedDockPageId;
            break;
          case 'exitDock':
            param3.node = {};
            param3.deletedDockPageId = history.location.execInfo.deletedDockPageId;
            break;
          case 'execDock':
            param3.executedDockPageId = history.location.execInfo.executedDockPageId;
            break;
          case 'reloadDock':
            param3.node = {};
            break;
          default:
        }
      }
      getLoaddata(param1, param2, param3);
    } else if (checkPath(pathArray[1], portalSinglePath)) {
      const param1 = pathArray[1];
      let param2 = pathArray.slice(2).join('/');
      if (Number.isInteger(Number(pathArray[2]))) param2 = Number(pathArray[2]);
      getSingleModeLoaddata(param1, param2);
    }
  };

  render() {
    const { isLoggedIn, profile, location, windowResize } = this.props;

    const pathArray = location.pathname.split('/');

    const hasError =
      isLoggedIn &&
      location.pathname !== '/' &&
      !checkPath(pathArray[1], portalPath) &&
      !checkPath(pathArray[1], portalSinglePath) &&
      !checkPath(pathArray[1], etcPath);

    if (hasError) {
      return <Redirect to="/error" />;
    }

    return (
      <div className="rootRouteWrapper">
        {/*
        <Debounce time="400" handler="onResize">
          <WindowResizeListener onResize={windowSize => windowResize(windowSize)} />
        </Debounce>
        */}
        <Switch>
          <Route path="/signin" component={SignIn} />
          {routes.map(route => (
            <RestrictedRoute {...route} isLoggedIn={isLoggedIn} profile={profile} />
          ))}
        </Switch>
        <div />
      </div>
    );
  }
}
PublicRoutes.propTypes = {
  windowResize: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  profile: PropTypes.object,
  history: PropTypes.object.isRequired,
  getLoaddata: PropTypes.func.isRequired,
  getSingleModeLoaddata: PropTypes.func.isRequired,
  boot: PropTypes.func.isRequired,
  // SMSESSION: PropTypes.string,
  // checkSession: PropTypes.func.isRequired,
};

PublicRoutes.defaultProps = {
  profile: undefined,
  // SMSESSION: null,
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: authSelectors.makeSelectIdToken(),
  profile: authSelectors.makeSelectProfile(),
  SMSESSION: authSelectors.makeSMSESSION(),
});

const mapDispatchToProps = dispatch => ({
  windowResize: w => dispatch(actions.windowResize(w.windowWidth, w.windowHeight)),
  getLoaddata: (path, param, data) => dispatch(actions.getLoaddata(path, param, data)),
  getSingleModeLoaddata: (path, param) => dispatch(actions.getSingleModeLoaddata(path, param)),
  checkSession: (ctype, payload) => dispatch(actions.checkSession(ctype, payload)),
  boot: (url, pathname, username) => dispatch(authActions.checkAuthorization(url, pathname, username)),
});

const withReducer = injectReducer({ key: 'common', reducer });
const withSaga = injectSaga({ key: 'auth', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default injectIntl(compose(withSaga, withReducer, withConnect)(PublicRoutes));
