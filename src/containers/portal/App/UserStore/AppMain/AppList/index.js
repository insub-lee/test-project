import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { BackTop, Input, Button } from 'antd';

import * as commonjs from 'containers/common/functions/common';
import ErrorBoundary from 'containers/common/ErrorBoundary';
import * as actionsLoading from 'containers/common/Loading/actions';
import Footer from 'containers/store/App/Footer';
import { intlObj } from 'utils/commonUtils';
import messages from '../../../messages';
import NavList from 'components/Header/NavList';
import NavListItem from 'components/Header/NavListItem';
import NavLink from 'components/Header/NavLink';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import * as actionsApp from '../../actions';

import ItemList from './ItemList';
import AppCategory from '../../components/AppCategory';

import StyleAppList from './StyleAppList';

class AppList extends Component {
  componentDidMount() {
    // param - ALL / ONE
    const {
      match: {
        params: { CATG_ID, searchword, limit },
      },
      loadingOn,
      handleInitPage,
    } = this.props;
    loadingOn();
    if (CATG_ID) {
      handleInitPage('ONE', Number(CATG_ID), limit);
    } else if (searchword) {
      handleInitPage('SEARCH', searchword);
    } else {
      handleInitPage('ALL');
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { CATG_ID: currentCtagId, searchword: currentSearchWord },
      },
      loadingOn,
      handleGetMapAppListSearch,
      handleGetMapListOne,
    } = this.props;
    const {
      match: {
        params: { CATG_ID: prevCtagId, searchword: prevSearchWord },
      },
    } = prevProps;
    if (currentSearchWord && currentSearchWord !== '' && currentSearchWord !== prevSearchWord) {
      loadingOn();
      handleGetMapAppListSearch(currentSearchWord);
    } else if (currentCtagId && Number(prevCtagId) !== -1 && prevCtagId !== currentCtagId) {
      loadingOn();
      handleGetMapListOne(Number(currentCtagId));
    }
  }
  /* eslint-disable */
  search = () => {
    const searchword = this.searchInput.input.value;
    this.props.changeSearchword(searchword);

    const type = this.props.history.location.pathname.indexOf('/bizStore/biz') > -1 ? 'biz' : 'app';

    if (searchword.trim() === '') {
      this.props.history.push(`/portal/store/appMain/bizStore/${type}/list`);
    } else if (this.props.searchword !== searchword || (this.props.currentView === 'Mobile' || this.props.currentView === 'Tablet')) {
      this.props.history.push(`/portal/store/appMain/bizStore/${type}/search/${searchword}`);
    }
  };

  searchEnter = e => {
    if (e.key === 'Enter') {
      this.search();
    }
  };

  render() {
    const {
      initType,
      mapList,
      searchword,
      handleGetMapAppListMore,
      handleRegistApp,
      handleRegistCategory,
      handleRegisterBiz,
      history,
      loadingOn,
      currentView,
      handleOnClick,
      handleGetMapListOneWithHistory,
      handleGoBack,
      match: {
        params: { CATG_ID },
      },
    } = this.props;

    return (
      <div className="appListWrapper">
        <BackTop />
        <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }} />
        <ErrorBoundary>
          <AppCategory handleOnClick={node => handleOnClick(node, history)} selectedIndex={Number(CATG_ID)} preUrl="/portal/store/appMain/bizStore" />
        </ErrorBoundary>
        <NavList className="navTabs">
          <NavListItem>
            <NavLink to="/portal/store/appMain/bizStore/app/list" className="current">
              {' '}
              {/* 현재 활성화된 상태에 current 클래스 적용 */}
              {intlObj.get(messages.category)}
            </NavLink>
          </NavListItem>
          <NavListItem>
            <NavLink to="/portal/store/appMain/bizStore/biz/list">{intlObj.get(messages.bizGroup)}</NavLink>
          </NavListItem>
        </NavList>

        <ErrorBoundary>
          <StyleAppList>
            <div className="topPart">
              <div className="searchInput">
                <Input
                  placeholder=""
                  title={intlObj.get(messages.searchBizStore)}
                  onKeyPress={this.searchEnter}
                  ref={ref => {
                    this.searchInput = ref;
                  }}
                />
                <Button type="button" onClick={this.search} title={intlObj.get(messages.search)} />
                {/* <LoadingSpin isLoading={isLoading && history.location.pathname.indexOf('modal') > -1} /> */}
              </div>
            </div>
          </StyleAppList>

          <ItemList
            type={initType}
            mapList={mapList}
            searchword={searchword}
            getMapListOne={key => handleGetMapListOneWithHistory(key, history)}
            getMapListMore={key => {
              loadingOn();
              handleGetMapAppListMore(key);
            }}
            registApp={handleRegistApp}
            registCategory={handleRegistCategory}
            registBiz={handleRegisterBiz}
            goBack={() => handleGoBack(history)}
            currentView={currentView}
          />
        </ErrorBoundary>
        <Footer />
      </div>
    );
  }
}

AppList.propTypes = {
  initType: PropTypes.string.isRequired,
  mapList: PropTypes.array.isRequired,
  searchword: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  handleInitPage: PropTypes.func.isRequired,
  handleGetMapListOne: PropTypes.func.isRequired,
  handleGetMapAppListMore: PropTypes.func.isRequired,
  handleGetMapAppListSearch: PropTypes.func.isRequired,
  handleRegistApp: PropTypes.func.isRequired,
  handleRegistCategory: PropTypes.func.isRequired,
  handleRegisterBiz: PropTypes.func.isRequired,

  loadingOn: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  handleGetMapListOneWithHistory: PropTypes.func.isRequired,
  handleGoBack: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleInitPage: (initType, param) => dispatch(actions.initPage(initType, param)),
  handleGetMapListOne: key => dispatch(actions.getMapListOne(key)),
  handleGetMapAppListMore: key => dispatch(actions.getMapListMore(key)),
  handleRegistApp: (APP_ID, CATG_ID) => dispatch(actions.registApp(APP_ID, CATG_ID)),
  handleRegistCategory: (APP_ID, CATG_ID) => dispatch(actions.registCategory(APP_ID, CATG_ID)),
  handleRegisterBiz: (app, catg) => dispatch(actions.registerBiz(app, catg)),
  handleGetMapAppListSearch: searchword => dispatch(actions.getMapListSearch(searchword)),
  changeSearchword: searchword => dispatch(actionsApp.changeSearchword(searchword)),
  loadingOn: () => dispatch(actionsLoading.loadingOn()),
  appBizGubun: gubun => dispatch(actions.appBizGubun(gubun)),
  handleOnClick: (node, history) => {
    history.push(`/portal/store/appMain/bizStore/app/list/${node.key}`);
    dispatch(actionsApp.changeSearchword(''));
    window.scrollTo(0, 0);
  },
  handleGetMapListOneWithHistory: (key, history) => {
    history.push(`/portal/store/appMain/bizStore/app/list/${key}`);
    dispatch(actionsApp.changeSearchword(''));
    window.scrollTo(0, 0);
  },
  handleGoBack: history => {
    dispatch(actionsApp.changeSearchword(''));
    history.goBack();
  },
});

const mapStateToProps = createStructuredSelector({
  // 앱리스트
  initType: selectors.makeInitType(),
  mapList: selectors.makeMapList(),
  searchword: selectors.makeSearchword(),
  currentView: selectors.currentView(),
});

const withReducer = injectReducer({ key: 'store-appList', reducer });
const withSaga = injectSaga({ key: 'store-appList', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(AppList);
