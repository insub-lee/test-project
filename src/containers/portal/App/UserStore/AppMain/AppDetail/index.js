import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'containers/common/ErrorBoundary';

import AppBasicInfo from './AppBasicInfo/index';
import AppScreenshot from './AppScreenshot/index';
import AppQna from './AppQna/index';
import AppRating from './AppRating/index';
import AppCategory from '../../components/AppCategory';
import AppDetailStyle from './appDetailStyle';
import Footer from '../../Footer';

class AppDetail extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      APP_ID: prop.match.params.APP_ID,
      CATG_ID: prop.match.params.CATG_ID,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    const { params } = match;
    const { APP_ID, CATG_ID } = params;
    if (this.state.APP_ID !== APP_ID) {
      this.setState({
        APP_ID,
      });
      window.scrollTo(0, 0);
    }
    if (this.state.CATG_ID !== CATG_ID) {
      this.setState({
        CATG_ID,
      });
    }
  }

  render() {
    const menuNum = 0; // 0-카테고리, 1-업무그룹
    const { history } = this.props;
    const handleOnClick = node => history.push(`/portal/store/appMain/bizStore/app/list/${node.key}`);
    return (
      <div className="appDetailWrapper" style={{ display: 'flex', flexFlow: 'column', backgroundColor: '#f7f8f9' }}>
        <AppDetailStyle>
          <ErrorBoundary>
            <AppCategory handleOnClick={handleOnClick} menuNum={menuNum} selectedIndex={Number(this.state.CATG_ID)} preUrl="/store/appMain/bizStore" />
          </ErrorBoundary>
          <ErrorBoundary>
            <AppBasicInfo targetUrl={window.location.href} appId={this.state.APP_ID} history={history} />
          </ErrorBoundary>

          <ErrorBoundary>
            <AppScreenshot appId={this.state.APP_ID} gubun={1} />
          </ErrorBoundary>

          <ErrorBoundary>
            <AppQna appId={this.state.APP_ID} gubun="a" />
          </ErrorBoundary>

          <ErrorBoundary>
            <AppRating appId={this.state.APP_ID} />
          </ErrorBoundary>
        </AppDetailStyle>
        <Footer />
      </div>
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
