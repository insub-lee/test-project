import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import ErrorBoundary from 'containers/common/ErrorBoundary';
import Loadable from 'components/Loadable';

// import AppBasicInfo from './AppBasicInfo';
// import AppScreenshot from './AppScreenshot';
// import AppQna from './AppQna';
// import AppRating from './AppRating';
// import AppCategory from '../../components/AppCategory';
import AppDetailStyle from './appDetailStyle';
// import Footer from '../../Footer';

const AppBasicInfo = Loadable({ loader: () => import('./AppBasicInfo') });
const AppScreenshot = Loadable({ loader: () => import('./AppScreenshot') });
const AppQna = Loadable({ loader: () => import('./AppQna') });
const AppRating = Loadable({ loader: () => import('./AppRating') });
const AppCategory = Loadable({ loader: () => import('../../components/AppCategory') });

const { Content, Sider } = Layout;

class AppDetail extends React.Component {
  // constructor(prop) {
  //   super(prop);
  //   this.state = {
  //     APP_ID: prop.match.params.APP_ID,
  //     CATG_ID: prop.match.params.CATG_ID,
  //   };
  // }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { APP_ID: PREV_APP_ID },
      },
    } = prevProps;
    const {
      match: {
        params: { APP_ID },
      },
    } = this.props;
    if (PREV_APP_ID !== APP_ID) {
      window.scrollTo(0, 0);
    }
  }
  //
  // componentWillReceiveProps(nextProps) {
  //   const { match } = nextProps;
  //   const { params } = match;
  //   const { APP_ID, CATG_ID } = params;
  //   if (this.state.APP_ID !== APP_ID) {
  //     // this.setState({
  //     //   APP_ID,
  //     // });
  //     window.scrollTo(0, 0);
  //   }
  //   // if (this.state.CATG_ID !== CATG_ID) {
  //   //   this.setState({
  //   //     CATG_ID,
  //   //   });
  //   // }
  // }

  handleOnClick = node => {
    const { history } = this.props;
    history.push(`/portal/store/appMain/bizStore/app/list/${node.key}`);
  };

  render() {
    const menuNum = 0; // 0-카테고리, 1-업무그룹
    const {
      history,
      match: {
        params: { APP_ID, CATG_ID },
      },
    } = this.props;
    // const handleOnClick = node => history.push(`/portal/store/appMain/bizStore/app/list/${node.key}`);
    return (
      <Layout style={{ height: '100%', overflow: 'hidden' }}>
        <Sider className="biz-store-sider">
          <ErrorBoundary>
            <AppCategory handleOnClick={this.handleOnClick} menuNum={menuNum} selectedIndex={Number(CATG_ID)} preUrl="/portal/store/appMain/bizStore" />
          </ErrorBoundary>
        </Sider>
        <Content>
          <div className="appDetailWrapper">
            <AppDetailStyle>
              <ErrorBoundary>
                <AppBasicInfo targetUrl={window.location.href} appId={APP_ID} history={history} />
              </ErrorBoundary>

              <ErrorBoundary>
                <AppScreenshot appId={APP_ID} gubun={1} />
              </ErrorBoundary>

              <ErrorBoundary>
                <AppQna appId={APP_ID} gubun="a" />
              </ErrorBoundary>

              <ErrorBoundary>
                <AppRating appId={APP_ID} />
              </ErrorBoundary>
            </AppDetailStyle>
            {/* <Footer /> */}
          </div>
        </Content>
      </Layout>
    );
  }
}

AppDetail.propTypes = {
  getAppId: PropTypes.func, //eslint-disable-line
  match: PropTypes.object, //eslint-disable-line
  appId: PropTypes.string, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
};

export default AppDetail;
