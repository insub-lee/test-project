import React, { Component } from './node_modules/react';
import PropTypes from './node_modules/prop-types';
import { compose } from './node_modules/redux';
import { connect } from './node_modules/react-redux';
import { createStructuredSelector } from './node_modules/reselect';
import injectReducer from './node_modules/utils/injectReducer';
import injectSaga from './node_modules/utils/injectSaga';
import reducer from './node_modules/containers/store/AppMain/Biz/BizList/reducer';
import saga from './node_modules/containers/store/AppMain/Biz/BizList/saga';
import * as selectors from './node_modules/containers/store/AppMain/Biz/BizList/selectors';
import * as actions from './node_modules/containers/store/AppMain/Biz/BizList/actions';
import * as commonjs from './node_modules/containers/common/functions/common';
import ItemList from './ItemList';

class BizList extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    const { params } = match;
    const { BIZGRP_ID, searchword } = params;

    if (BIZGRP_ID) {
      this.BIZGRP_ID = BIZGRP_ID;
      this.props.handleInitPage('ONE', BIZGRP_ID);
    } else if (searchword) {
      this.searchword = searchword;
      this.props.handleInitPage('SEARCH', searchword);
    } else {
      this.props.handleInitPage('ALL');
    }
  }
  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    const { params } = match;
    const { BIZGRP_ID, searchword } = params;
    if (searchword
      && searchword !== ''
      && this.searchword !== searchword) {
      this.searchword = searchword;
      this.props.handleGetMapListSearch(searchword);
    } else if (BIZGRP_ID
      && BIZGRP_ID !== ''
      && this.BIZGRP_ID !== BIZGRP_ID) {
      this.BIZGRP_ID = BIZGRP_ID;
      this.props.handleGetMapListOne(BIZGRP_ID);
    }
  }

  render() {
    const {
      initType,
      mapList,
      searchword,
      handleGetMapListMore,
      handleRegisterBiz,

      history,
      /* 테스트 */
      // bizMenuData,
    } = this.props;

    const preUrl = commonjs.getPreUrl(this.props.match.path, '/modal');

    const handleGetMapListOne = key => history.push(`${preUrl}/biz/list/${key}`);
    const handleGoBack = () => {
      history.goBack();
    };

    const registBizs = (BIZGRP_ID, CATG_ID) => handleRegisterBiz(BIZGRP_ID, CATG_ID, history);

    return (
      <div>
        <ItemList
          type={initType}
          mapList={mapList}
          searchword={searchword}
          getMapListOne={handleGetMapListOne}
          getMapListMore={handleGetMapListMore}
          registerBiz={registBizs}
          // registCategory={handleRegistCategory}
          goBack={handleGoBack}
          // history={history}
        />
      </div>
    );
  }
}
BizList.propTypes = {
  initType: PropTypes.string.isRequired,
  mapList: PropTypes.array.isRequired,
  searchword: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  handleInitPage: PropTypes.func.isRequired,
  handleGetMapListOne: PropTypes.func.isRequired,
  handleGetMapListMore: PropTypes.func.isRequired,
  handleGetMapListSearch: PropTypes.func.isRequired,
  handleRegisterBiz: PropTypes.func.isRequired,
};
export function mapDispatchToProps(dispatch) {
  return {
    handleInitPage: (initType, param) => dispatch(actions.initPage(initType, param)),
    handleGetMapListOne: key => dispatch(actions.getMapListOne(key)),
    handleGetMapListMore: key => dispatch(actions.getMapListMore(key)),
    handleGetMapListSearch: searchword => dispatch(actions.getMapListSearch(searchword)),
    handleRegisterBiz: (BIZGRP_ID, CATG_ID, history) =>
      dispatch(actions.registBizModal(BIZGRP_ID, CATG_ID, history)),
    changeSearchword: searchword => dispatch(actions.changeSearchword(searchword)),
    // 테스트
    // handleOnClick: key => dispatch(actions.getBizMenu(key)),
  };
}
const mapStateToProps = createStructuredSelector({
  // 앱리스트
  initType: selectors.makeInitType(),
  mapList: selectors.makeMapList(),
  searchword: selectors.makeSearchword(),
  // 테스트
  // bizMenuData: selectors.makgeBizMenuData(),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'bizList', reducer });
const withSaga = injectSaga({ key: 'bizList', saga });
export default compose(
  withReducer,
  withConnect,
  withSaga,
)(BizList);
