import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Layout } from 'antd';

import { ThemeProvider } from 'styled-components';
import themes from 'config/themes/index';
import StyleUserMenuCard from './StyleUserMenuCard';
import AppWrapper from './AppWrapper';
import ErrorBoundary from 'containers/common/ErrorBoundary';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as actionsLoading from 'containers/common/Loading/actions';

import BizMenuCardList from './BizMenuCardList';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import './global-userMenuCard.css';

const { Content } = Layout;

class UserMenuCard extends Component {
  componentDidMount() {
    const {
      match: {
        params: { ID },
      },
      handleInitPage,
    } = this.props;

    handleInitPage(ID);
  }

  componentDidUpdate(prevProps) {
    const {
      location: { pathname },
      match: {
        params: { ID },
      },
      handleInitPage,
    } = this.props;
    const {
      location: { pathname: prevPathname },
    } = prevProps;
    if (pathname !== prevPathname) {
      console.debug('### ID', ID);
      handleInitPage(ID);
    }
  }

  render() {
    return (
      <StyleUserMenuCard className="userSetting">
        <div className="userBizMenuWrapper">
          <h2 className="pageHeader">업무 폴더 메뉴</h2>
          <ThemeProvider theme={themes.themedefault}>
            <Layout className="storeLayout" style={{ minHeight: '100vh' }}>
              <AppWrapper style={{ width: '100%' }}>
                <Content className="storeContent">
                  <div className="contentWrapper">
                    <ErrorBoundary>
                      <BizMenuCardList />
                    </ErrorBoundary>
                  </div>
                </Content>
              </AppWrapper>
            </Layout>
          </ThemeProvider>
        </div>
      </StyleUserMenuCard>
    );
  }
}

UserMenuCard.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  handleInitPage: PropTypes.func.isRequired,
  menuList: PropTypes.array,
};

UserMenuCard.defaultProps = {
  menuList: [],
};

const mapDispatchToProps = dispatch => ({
  loadingOn: () => dispatch(actionsLoading.loadingOn()),
  handleInitPage: ID => dispatch(actions.initPage(ID)),
  handleGoBack: (history) => {
    // dispatch(actions.changeSearchWord(''));
    history.goBack();
  },
});

const mapStateToProps = createStructuredSelector({
  // menuList: selectors.makeMenuList(),
});

const withReducer = injectReducer({ key: 'menu-cardList', reducer });
const withSaga = injectSaga({ key: 'menu-cardList', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserMenuCard);
