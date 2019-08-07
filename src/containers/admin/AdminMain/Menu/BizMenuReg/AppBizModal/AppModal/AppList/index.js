import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import * as actionsLoading from 'containers/common/Loading/actions';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import ItemList from './ItemList';

function checkValue(v1, v2) {
  return v1 && v2 && v2 !== '' && v1 !== v2;
}

class AppList extends Component {
  componentDidMount() {
    const { match: { params: { CATG_ID, searchword } }, loadingOn, handleInitPage } = this.props;
    loadingOn();
    if (CATG_ID) {
      handleInitPage('ONE', CATG_ID);
    } else if (searchword) {
      handleInitPage('SEARCH', searchword);
    } else {
      handleInitPage('ALL');
    }
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { prevCatgId, prevSearchword } } } = prevProps;
    const {
      match: { params: { CATG_ID, searchword } }, loadingOn, handleGetMapAppListSearch, handleGetMapListOne,
    } = this.props;
    if (checkValue(prevSearchword, searchword)) {
      loadingOn();
      handleGetMapAppListSearch(CATG_ID);
    } else if (checkValue(prevCatgId, CATG_ID)) {
      loadingOn();
      handleGetMapListOne(CATG_ID);
    }
  }

  render() {
    const {
      history,
      initType,
      mapList,
      handleGetMapAppListMore,
      handleRegistApp,
      handleRegistCategory,
      handleGetMapListOne,
      searchword,
      loadingOn,
    } = this.props;
    return (
      <ItemList
        history={history}
        type={initType}
        mapList={mapList}
        getMapListOne={handleGetMapListOne}
        getMapListMore={(key) => {
          loadingOn();
          handleGetMapAppListMore(key);
        }}
        registApp={handleRegistApp}
        registCategory={handleRegistCategory}
        goBack={() => history.goBack()}
        searchword={searchword}
        // history={history}
      />
    );
  }
}

AppList.propTypes = {
  initType: PropTypes.string.isRequired,
  mapList: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  searchword: PropTypes.string.isRequired,

  handleInitPage: PropTypes.func.isRequired,
  handleGetMapListOne: PropTypes.func.isRequired,
  handleGetMapAppListMore: PropTypes.func.isRequired,
  handleGetMapAppListSearch: PropTypes.func.isRequired,
  handleRegistApp: PropTypes.func.isRequired,
  handleRegistCategory: PropTypes.func.isRequired,

  loadingOn: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    handleInitPage: (initType, param) => dispatch(actions.initPage(initType, param)),

    handleGetMapListOne: key => dispatch(actions.getMapListOne(key)),
    handleGetMapAppListMore: key => dispatch(actions.getMapListMore(key)),

    handleRegistApp: (APP_ID, CATG_ID, history) => {
      dispatch(actions.registAppModal(APP_ID, CATG_ID, history));
    },
    handleRegistCategory: (APP_ID, CATG_ID, history) => {
      dispatch(actions.registCategoryModal(APP_ID, CATG_ID, history));
    },
    handleGetMapAppListSearch: searchword => dispatch(actions.getMapListSearch(searchword)),
    changeSearchword: searchword => dispatch(actions.changeSearchword(searchword)),

    loadingOn: () => dispatch(actionsLoading.loadingOn()),
  };
}

const mapStateToProps = createStructuredSelector({
  // 앱리스트
  initType: selectors.makeInitType(),
  mapList: selectors.makeMapList(),
  searchword: selectors.makeSearchword(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'admin/AdminMain/Menu/BizMenuReg/AppBizModal/AppModal/AppList', reducer });
const withSaga = injectSaga({ key: 'admin/AdminMain/Menu/BizMenuReg/AppBizModal/AppModal/AppList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppList);
