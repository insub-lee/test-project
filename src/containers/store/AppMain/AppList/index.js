import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ErrorBoundary from 'containers/common/ErrorBoundary';
import * as actionsLoading from 'containers/common/Loading/actions';
import { BackTop } from 'antd';
// import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';

import Footer from 'containers/store/App/Footer';

import { intlObj } from 'utils/commonUtils';
import messages from 'containers/store/App/messages';
import NavList from 'components/Header/NavList';
import NavListItem from 'components/Header/NavListItem';
import NavLink from 'components/Header/NavLink';

import injectReducer from '../../../../utils/injectReducer';
import injectSaga from '../../../../utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import * as actionsApp from '../../App/actions';

import ItemList from './ItemList';
import AppCategory from '../../components/AppCategory';

class AppList extends Component {
  constructor(prop) {
    super(prop);
    this.state = {};
    this.props.appBizGubun(0);
  }

  componentDidMount() {
    // param - ALL / ONE
    const { match, loadingOn } = this.props;
    const { params } = match;
    const { CATG_ID, searchword, limit } = params;

    loadingOn();

    if (CATG_ID) {
      this.CATG_ID = Number(CATG_ID);
      this.props.handleInitPage('ONE', this.CATG_ID, limit);
    } else if (searchword) {
      this.CATG_ID = -1;
      this.props.handleInitPage('SEARCH', searchword);
    } else {
      this.CATG_ID = -1;
      this.props.handleInitPage('ALL');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match, loadingOn } = nextProps;
    const { params } = match;
    const { CATG_ID, searchword } = params;

    if (searchword && nextProps.searchword && nextProps.searchword !== '' && nextProps.searchword !== searchword) {
      loadingOn();
      this.props.handleGetMapAppListSearch(searchword);
    } else if (CATG_ID && this.CATG_ID !== -1 && this.CATG_ID !== Number(CATG_ID)) {
      this.CATG_ID = Number(CATG_ID);
      loadingOn();
      this.props.handleGetMapListOne(this.CATG_ID);
    }
  }

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
      changeSearchword,
      loadingOn,
      currentView,
    } = this.props;

    const handleOnClick = node => {
      this.props.history.push(`/store/appMain/bizStore/app/list/${node.key}`);
      changeSearchword('');
      window.scrollTo(0, 0);
    };
    const handleGetMapListOne = key => {
      this.props.history.push(`/store/appMain/bizStore/app/list/${key}`);
      changeSearchword('');
      window.scrollTo(0, 0);
    };
    const handleGoBack = () => {
      changeSearchword('');
      history.goBack();
    };

    return (
      <div className="appListWrapper">
        <BackTop />
        <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }} />
        <ErrorBoundary>
          <AppCategory handleOnClick={handleOnClick} selectedIndex={this.CATG_ID} preUrl="/store/appMain/bizStore" />
        </ErrorBoundary>

        <NavList className="navTabs">
          <NavListItem>
            <NavLink to="/store/appMain/bizStore/app/list" className="current">
              {' '}
              {/* 현재 활성화된 상태에 current 클래스 적용 */}
              {intlObj.get(messages.category)}
            </NavLink>
          </NavListItem>
          <NavListItem>
            <NavLink to="/store/appMain/bizStore/biz/list">{intlObj.get(messages.bizGroup)}</NavLink>
          </NavListItem>
        </NavList>

        <ErrorBoundary>
          <ItemList
            type={initType}
            mapList={mapList}
            searchword={searchword}
            getMapListOne={handleGetMapListOne}
            getMapListMore={key => {
              loadingOn();
              handleGetMapAppListMore(key);
            }}
            registApp={handleRegistApp}
            registCategory={handleRegistCategory}
            registBiz={handleRegisterBiz}
            goBack={handleGoBack}
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
  changeSearchword: PropTypes.func.isRequired,

  loadingOn: PropTypes.func.isRequired,
  appBizGubun: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    handleInitPage: (initType, param) => dispatch(actions.initPage(initType, param)),

    handleGetMapListOne: key => dispatch(actions.getMapListOne(key)),
    handleGetMapAppListMore: key => dispatch(actions.getMapListMore(key)),

    handleRegistApp: (APP_ID, CATG_ID) => dispatch(actions.registApp(APP_ID, CATG_ID)),
    handleRegistCategory: (APP_ID, CATG_ID) => {
      dispatch(actions.registCategory(APP_ID, CATG_ID));
    },
    handleRegisterBiz: (app, catg) => dispatch(actions.registerBiz(app, catg)),

    handleGetMapAppListSearch: searchword => dispatch(actions.getMapListSearch(searchword)),

    changeSearchword: searchword => dispatch(actionsApp.changeSearchword(searchword)),

    loadingOn: () => dispatch(actionsLoading.loadingOn()),
    appBizGubun: gubun => dispatch(actions.appBizGubun(gubun)),
  };
}

const mapStateToProps = createStructuredSelector({
  // 앱리스트
  initType: selectors.makeInitType(),
  mapList: selectors.makeMapList(),
  searchword: selectors.makeSearchword(),
  currentView: selectors.currentView(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'appList', reducer });
const withSaga = injectSaga({ key: 'appList', saga });

export default compose(withReducer, withSaga, withConnect)(AppList);
