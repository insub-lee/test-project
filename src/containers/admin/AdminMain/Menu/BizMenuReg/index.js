import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { Route } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';
import Widget from 'components/appSettingBizgroup';
import ErrorBoundary from 'containers/common/ErrorBoundary';
import * as actionsLoading from 'containers/common/Loading/actions';

import 'react-router-modal/css/react-router-modal.css';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as selectors from './selectors';
import * as menuSelectors from '../selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

import AppBizModal from './AppBizModal';
import BizMenuTree from '../../../components/BizMenuTree';

import Footer from '../../../App/Footer';
import BizInfo from './BizInfo';
import AppInfo from './AppInfo';
import PageInfo from './PageInfo';
import TopMenu from './TopMenu/index';
// import AuthSetting from './AuthSetting';

import StyleBizDetail from './StyleBizDetail';
import StyleBizDetailContent from './StyleBizDetailContent';

/* eslint-disable */
class BizMenuReg extends Component {
  constructor(props) {
    super(props);

    const { match, initCategoryData, loadingOn } = props;
    const { params } = match;
    const { BIZGRP_ID } = params;
    this.state = {
      BIZGRP_ID: Number(BIZGRP_ID),
    };
    loadingOn();
    initCategoryData(Number(BIZGRP_ID));
  }

  componentWillReceiveProps(nextProps) {
    const { match, initCategoryData, loadingOn } = nextProps;
    const { params } = match;
    const { BIZGRP_ID } = params;

    if (BIZGRP_ID && Number(BIZGRP_ID) !== Number(this.state.BIZGRP_ID)) {
      this.setState({
        BIZGRP_ID: Number(BIZGRP_ID),
      });
      loadingOn();
      initCategoryData(Number(BIZGRP_ID));
    }
  }

  render() {
    const {
      // data
      history,
      match,

      categoryData,
      selectedIndex,
      changeSelectedIndex,
      bizGroupInfo,

      saveData,
      moveNode,
      deleteNode,
      insertNode,
      updateNode,
      updateMymenuDisp,
      userRole,
    } = this.props;

    const { BIZGRP_ID } = this.state;
    const pathArr = history.location.pathname.split('/');
    const type = pathArr[3];
        const handleTreeOnClick = node => {
      const { key, NODE_TYPE, REF_TYPE, APP_ID, PAGE_ID } = node;
      changeSelectedIndex(key);

      let pageID = -1;

      if (NODE_TYPE !== 'F') {
        // 폴더 X
        if (REF_TYPE === 'A' && APP_ID !== -1) {
          // [앱] 상세
          history.push(`/admin/adminmain/${type}/bizMenuReg/app/${BIZGRP_ID}/${APP_ID}`);
        } else if (REF_TYPE !== 'B' && PAGE_ID !== -1) {
          // [페이지] 상세
          history.push(`/admin/adminmain/${type}/bizMenuReg/page/${BIZGRP_ID}/${PAGE_ID}`);
          pageID = PAGE_ID;
        }

        window.scrollTo(0, 0);
      }

      this.setState({ pageID });
    };

    let divStyle = { display: 'flex', flexFlow: 'column', backgroundColor: '#f7f8f9' };
    if (type === 'work') {
      divStyle = { display: 'flex', flexFlow: 'column', backgroundColor: '#f7f8f9', marginLeft: '300px' };
    }

    return (
      // <div style={{ display: 'flex', flexFlow: 'column', backgroundColor: '#f7f8f9' }}>
      <div style={divStyle}>
        <StyleBizDetail pWidth={type === 'work' ? '1000' : '1190'}>
          <ErrorBoundary>
            <TopMenu
              BIZGRP_ID={BIZGRP_ID}
              history={history}
              treeData={categoryData}
              selectedIndex={selectedIndex}
              onClick={handleTreeOnClick}
              saveData={saveData}
              moveNode={moveNode}
              deleteNode={deleteNode}
              insertNode={insertNode}
              updateNode={updateNode}
              updateMymenuDisp={updateMymenuDisp}
              pageID={this.state.pageID}
              bizGroupInfo={bizGroupInfo}
              userRole={userRole}
            />
          </ErrorBoundary>
          <StyleBizDetailContent style={{ minHeight: 'calc(100vh - 200px)' }}>
            <ul className="bizDetailContentWrapper">
              <li className="leftContent" key="leftContent">
                <ErrorBoundary>
                  <BizMenuTree
                    treeData={categoryData}
                    selectedIndex={selectedIndex}
                    onClick={handleTreeOnClick}
                    canDrag={true}
                    canDrop={true}
                    saveData={saveData}
                    moveNode={moveNode}
                    deleteNode={deleteNode}
                    insertNode={insertNode}
                    updateNode={updateNode}
                    updateMymenuDisp={updateMymenuDisp}
                    bizGroupInfo={bizGroupInfo}
                    history={history}
                    userRole={userRole}
                  />
                </ErrorBoundary>
              </li>
              <ErrorBoundary>
                <ModalRoute
                  path={`/admin/adminmain/${type}/bizMenuReg/widgetsetting/:BIZGRP_ID/:PAGE_ID/:WIDGET_ID`}
                  component={Widget}
                  className="widgetsetting-modal"
                  inClassName="widgetsetting-modal-in"
                  outClassName="widgetsetting-modal-out"
                  // backdropClassName="widgetsetting-backdrop"
                  outDelay={1200} // 1000 = 1s, widgetsetting-modal-out 시간보다 조금 더 길게
                />
              </ErrorBoundary>
              {/* <ModalContainer /> */}

              <li className="rightContent" key="rightContent">
                <ErrorBoundary>
                  <Route path={`/admin/adminmain/${type}/bizMenuReg/info/:BIZGRP_ID`} component={BizInfo} exact />
                  <Route path={`/admin/adminmain/${type}/bizMenuReg/app/:BIZGRP_ID/:appId`} component={AppInfo} exact />
                  <Route path={`/admin/adminmain/${type}/bizMenuReg/page/:BIZGRP_ID/:PAGE_ID`} component={PageInfo} exact />
                  {/* <Route
                    path={`${preUrl}/page/:BIZGRP_ID/:PAGE_ID`}
                    component={props => (<PageInfo {...props} bizGroupInfo={bizGroupInfo} />)}
                    exact
                  /> */}

                  <Route path={`/admin/adminmain/${type}/bizMenuReg/appSelect/${BIZGRP_ID}/modal`} component={AppBizModal} />

                  {/* <Route path={`${preUrl}/authSetting/:BIZGRP_ID`} component={AuthSetting} /> */}
                </ErrorBoundary>
              </li>
            </ul>
          </StyleBizDetailContent>
        </StyleBizDetail>
        <Footer />
      </div>
    );
  }
}

BizMenuReg.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,

  categoryData: PropTypes.array.isRequired,
  initCategoryData: PropTypes.func.isRequired,
  bizGroupInfo: PropTypes.object.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  changeSelectedIndex: PropTypes.func.isRequired,

  insertNode: PropTypes.func.isRequired,
  updateNode: PropTypes.func.isRequired,

  saveData: PropTypes.func.isRequired,
  moveNode: PropTypes.func.isRequired,
  deleteNode: PropTypes.func.isRequired,
  updateMymenuDisp: PropTypes.func.isRequired,

  loadingOn: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
};

BizMenuReg.defaultProps = {};

export function mapDispatchToProps(dispatch) {
  return {
    // 카테고리
    initCategoryData: BIZGRP_ID => dispatch(actions.initCategoryData(BIZGRP_ID)),
    changeSelectedIndex: selectedIndex => dispatch(actions.changeSelectedIndex(selectedIndex)),
    saveData: (rowInfo, categoryData) => dispatch(actions.saveData(rowInfo, categoryData)),

    insertNode: (rowInfo, treeData, data, history) => dispatch(actions.insertNode(rowInfo, treeData, data, history)),
    updateNode: (rowInfo, treeData, data, history) => dispatch(actions.updateNode(rowInfo, treeData, data, history)),

    moveNode: (BIZGRP_ID, treeData) => dispatch(actions.moveNode(BIZGRP_ID, treeData)),
    deleteNode: (rowInfo, categoryData, history) => dispatch(actions.deleteNode(rowInfo, categoryData, history)),
    updateMymenuDisp: () => dispatch(actions.updateMymenuDisp()),
    loadingOn: () => dispatch(actionsLoading.loadingOn()),
  };
}

const mapStateToProps = createStructuredSelector({
  // 카테고리
  categoryData: selectors.makeCategoryData(),
  bizGroupInfo: selectors.makeBizGroupInfo(),
  selectedIndex: selectors.makeSelectedIndex(),
  userRole: menuSelectors.makeUserRole(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'admin/AdminMain/Menu/BizMenuReg', reducer });
const withSaga = injectSaga({ key: 'admin/AdminMain/Menu/BizMenuReg', saga });

export default injectIntl(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(BizMenuReg),
);
