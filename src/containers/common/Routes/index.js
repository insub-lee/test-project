import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { Debounce } from 'react-throttle';
import { LicenseManager } from 'ag-grid-enterprise';
import WindowResizeListener from 'react-window-size-listener';
import { intlObj, checkPath } from 'utils/commonUtils';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
// import { Cookies } from 'react-cookie';
import OrganizationPopup from 'components/OrganizationPopup';
import Loading from 'containers/common/Loading';
import ErrorPage from 'containers/portal/App/ErrorPage';

import 'style/sortable-tree-biz.css';
import 'utils/momentLang';

import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import SignIn from '../Auth/index';
import PortalApp from '../../portal/App/index';
import PortalSingleModeApp from '../../portal/SingleModeApp/index';
import StoreApp from '../../store/App/index';
import AdminApp from '../../admin/App/index';
import GuideApp from '../../guide/App/index';
import Preview from '../../portal/Preview/index';
import * as authSelectors from '../Auth/selectors';
import { basicPath } from '../constants';

import RestrictedRoute from './RestrictedRoute';
import Watermark from './Watermark';

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

LicenseManager.setLicenseKey('Evaluation_License-_Not_For_Production_Valid_Until_25_April_2019__MTU1NjE0NjgwMDAwMA==5095db85700c871b2d29d9537cd451b3');

class PublicRoutes extends Component {
  componentDidMount() {}

  render() {
    const {
      isLoggedIn,
      intl,
      profile,
      history,
      location,
      getLoaddata,
      getSingleModeLoaddata,
      // SMSESSION,
      // checkSession,
    } = this.props;

    const pathArray = location.pathname.split('/');

    if (isLoggedIn) {
      if (location.pathname === '/') {
        // portalloc.skhynix.com
        getLoaddata('latest');
      } else if (checkPath(pathArray[1], portalPath)) {
        // go to getLoaddata
        const param1 = pathArray[1];
        const param2 = Number.isInteger(Number(pathArray[2])) ? Number(pathArray[2]) : pathArray[2];
        const param3 = {
          isCssTarget: true,
        };

        /*
          메뉴 실행 / 독 실행 / 독 종료
          (execMenu / execDock / exitDock)
          이 세가지의 경우 MDI CSS 작업등의 이유로 PUSH를 할 때 state값을 함께 넘겨준다.
        */
        console.log('$$$ history', history.location);
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
        // eslint-disable-line
        const param1 = pathArray[1];
        const param2 = pathArray[2];
        getSingleModeLoaddata(param1, param2);
      } else if (checkPath(pathArray[1], etcPath)) {
        // eslint-disable-line
        // getLoaddata를 호출할 필요 없는 경로 (stroe, guide, admin ...)
      } else {
        // go to error
        history.push('/error');
      }

      // checkSession
      // const cookies = new Cookies();
      // const SMSESSION2 = cookies.get('SMSESSION');
      // const payload = {
      //   url: location.pathname, // location.state ? location.state.from.pathname : '/',
      //   pathname: location.pathname,
      // };
      // if (SMSESSION2 === null || SMSESSION2 === undefined) {
      //   checkSession(1, payload);
      // } else if (SMSESSION !== SMSESSION2) {
      //   checkSession(2, payload);
      // }
    } else if (!checkPath(pathArray[1], portalPath) && !checkPath(pathArray[1], etcPath) && !checkPath(pathArray[1], portalSinglePath)) {
      // 로그인 되지 않았으면서 잘못된 경로로 들어온 경우
      history.push('/error');
    }

    console.log('##isLoggedIn##', isLoggedIn);
    console.log('##isLoggedIn this.props.location##', this.props.location);
    intlObj.setIntl(intl);

    return (
      <div>
        <Debounce time="400" handler="onResize">
          <WindowResizeListener onResize={windowSize => this.props.windowResize(windowSize)} />
        </Debounce>
        <Switch>
          <RestrictedRoute exact path="/" component={PortalApp} isLoggedIn={isLoggedIn} profile={profile} />
          <RestrictedRoute exact path="/preview/page/:pageID" component={Preview} isLoggedIn={isLoggedIn} profile={profile} />
          <RestrictedRoute exact path={`/${basicPath.PAGE}/:PAGE_ID`} component={PortalApp} isLoggedIn={isLoggedIn} profile={profile} />
          <RestrictedRoute path={`/${basicPath.APPS}/:PAGE_ID`} component={PortalApp} isLoggedIn={isLoggedIn} profile={profile} />
          <RestrictedRoute path={`/${basicPath.SINGLE}/:PAGE_ID`} component={PortalSingleModeApp} isLoggedIn={isLoggedIn} profile={profile} />
          <RestrictedRoute path="/portal/settings" component={PortalApp} isLoggedIn={isLoggedIn} profile={profile} />
          <Route path="/signin" component={SignIn} />
          <RestrictedRoute path="/store" component={StoreApp} isLoggedIn={isLoggedIn} profile={profile} />
          <RestrictedRoute path="/portal/store" component={PortalApp} isLoggedIn={isLoggedIn} profile={profile} />
          <RestrictedRoute path="/admin" component={AdminApp} isLoggedIn={isLoggedIn} profile={profile} />
          <RestrictedRoute path="/guide" component={GuideApp} isLoggedIn={isLoggedIn} profile={profile} />
          <RestrictedRoute exact path="/popup/organization/:lang/:deptId/:userId" component={OrganizationPopup} isLoggedIn={isLoggedIn} profile={profile} />
          <RestrictedRoute exact path="/popup/organization/:lang/:deptId" component={OrganizationPopup} isLoggedIn={isLoggedIn} profile={profile} />
          <RestrictedRoute component={ErrorPage} isLoggedIn={isLoggedIn} profile={profile} />
        </Switch>
        <Loading />
        {profile !== null ? <Watermark profile={profile} /> : <div />}
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
});

const withReducer = injectReducer({ key: 'hynix.common', reducer });
const withSaga = injectSaga({ key: 'auth', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
/* eslint-disable */
export default injectIntl(
  compose(
    withSaga,
    withReducer,
    withConnect,
  )(PublicRoutes),
);
/* eslint-disable */
