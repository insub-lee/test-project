/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { BackTop } from 'antd';
import * as actionsLoading from 'containers/common/Loading/actions';
import NavList from 'components/Header/NavList';
import NavListItem from 'components/Header/NavListItem';
import NavLink from 'components/Header/NavLink';
import { intlObj } from 'utils/commonUtils';
import messages from 'containers/store/App/messages';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import * as actionsApp from '../../../actions';
import ItemList from './ItemList';
import Footer from '../../../Footer';

class BizList extends Component {
  constructor(props) {
    super(props);
    const { match, loadingOn } = props;
    const { params } = match;
    const { BIZGRP_ID, searchword } = params;

    loadingOn();

    if (BIZGRP_ID) {
      this.BIZGRP_ID = Number(BIZGRP_ID);
      this.props.handleInitPage('ONE', this.BIZGRP_ID);
    } else if (searchword) {
      this.searchword = searchword;
      this.props.handleInitPage('SEARCH', searchword);
    } else {
      this.props.handleInitPage('ALL');
    }

    this.props.appBizGubun(1);
  }

  componentWillReceiveProps(nextProps) {
    const { match, loadingOn } = nextProps;
    const { params } = match;
    const { BIZGRP_ID, searchword } = params;
    if (searchword && searchword !== '' && this.searchword !== searchword) {
      this.searchword = searchword;
      loadingOn();
      this.props.handleGetMapListSearch(searchword);
    } else if (BIZGRP_ID && BIZGRP_ID !== '' && this.BIZGRP_ID !== Number(BIZGRP_ID)) {
      this.BIZGRP_ID = Number(BIZGRP_ID);
      loadingOn();
      this.props.handleGetMapListOne(this.BIZGRP_ID);
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
      changeSearchword,
      loadingOn,
      /* 테스트 */
      // bizMenuData,
    } = this.props;

    console.debug('>>>>>>this.props: ', this.props);

    const handleGetMapListOne = key => {
      changeSearchword('');
      history.push(`/portal/store/appMain/bizStore/biz/list/${key}`);
    };
    const handleGoBack = () => {
      changeSearchword('');
      history.goBack();
    };

    return (
      <div>
        <BackTop />
        <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }} />
        <NavList className="navTabs">
          <NavListItem>
            <NavLink to="/portal/store/appMain/bizStore">{intlObj.get(messages.category)}</NavLink>
          </NavListItem>
          <NavListItem>
            <NavLink to="/portal/store/appMain/bizStore" className="current">
              {' '}
              {/* 현재 활성화된 상태에 current 클래스 적용 */}
              {intlObj.get(messages.bizGroup)}
            </NavLink>
          </NavListItem>
        </NavList>
        <ItemList
          type={initType}
          mapList={mapList}
          searchword={searchword}
          getMapListOne={handleGetMapListOne}
          getMapListMore={key => {
            loadingOn();
            handleGetMapListMore(key);
          }}
          registerBiz={handleRegisterBiz}
          // registCategory={handleRegistCategory}
          goBack={handleGoBack}
        />
        {/* <Footer /> */}
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
  // handleOnClick: PropTypes.func.isRequired,
  // bizMenuData: PropTypes.array.isRequired,
  changeSearchword: PropTypes.func.isRequired,
  loadingOn: PropTypes.func.isRequired,
  appBizGubun: PropTypes.func.isRequired,
};
export function mapDispatchToProps(dispatch) {
  return {
    handleInitPage: (initType, param) => dispatch(actions.initPage(initType, param)),
    handleGetMapListOne: key => dispatch(actions.getMapListOne(key)),
    handleGetMapListMore: key => dispatch(actions.getMapListMore(key)),
    handleGetMapListSearch: searchword => dispatch(actions.getMapListSearch(searchword)),
    handleRegisterBiz: (app, catg) => dispatch(actions.registerBiz(app, catg)),
    changeSearchword: searchword => dispatch(actionsApp.changeSearchword(searchword)),

    loadingOn: () => dispatch(actionsLoading.loadingOn()),
    // 테스트
    // handleOnClick: key => dispatch(actions.getBizMenu(key)),
    appBizGubun: gubun => dispatch(actions.appBizGubun(gubun)),
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
const withReducer = injectReducer({ key: 'portal_bizList', reducer });
const withSaga = injectSaga({ key: 'portal_bizList', saga });
export default compose(withReducer, withSaga, withConnect)(BizList);
