import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import ErrorBoundary from 'containers/common/ErrorBoundary';

import 'react-router-modal/css/react-router-modal.css';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

import BizGroupTree from '../../components/BizGroupTree';
import StyledTabList from '../../components/TabList/StyledTabList';
import AppPreview from '../../../portal/Preview/index';
import BizGroupReg from './BizGroupReg';
import BizMenuReg from './BizMenuReg';
import AuthSetting from './BizMenuReg/AuthSetting';
// import Footer from '../../App/Footer';

const homeUrl = '/store/appMain/bizManage';

class BizManage extends Component {
  componentWillMount() {
    this.props.initCategoryData();
  }

  componentWillReceiveProps(nextProps) {
    if (homeUrl === nextProps.history.location.pathname) {
      if (nextProps.categoryData.length > 0) {
        let url;
        const generateList = (data) => {
          for (let i = 0; i < data.length; i += 1) {
            const node = data[i];

            if (url === undefined) {
              if (node.MENU_EXIST_YN !== 'N') {
                url = `/store/appMain/bizManage/bizMenuReg/info/${node.key}`;
                this.props.changeSelectedIndex(node.key);
              }

              if (node.children) {
                generateList(node.children);
              }
            }
          }
        };

        generateList(nextProps.categoryData);

        if (url) {
          nextProps.history.push(url);
        }
      } else {
        // 트리 데이터가 없는 경우. main화면
      }
    }
  }

  render() {
    const {
      // data
      history,
      categoryData,
      selectedIndex,
      changeSelectedIndex,

      saveData,
      addEmptyNode,
      // moveNode,
      deleteNode,
      updateBizGroupDelYn,
    } = this.props;

    const handleTreeOnClick = (node) => {
      changeSelectedIndex(node.key);
      if (node.MENU_EXIST_YN !== 'N') {
        history.push(`/store/appMain/bizManage/bizMenuReg/info/${node.key}`);
      } else {
        history.push(`/store/appMain/bizManage/bizGroupReg/${node.key}`);
      }
    };

    return (
      <div className="appMyPageWrapper">
        <StyledTabList className="treeWrapper">
          <ErrorBoundary>
            <BizGroupTree
              treeData={categoryData}
              selectedIndex={selectedIndex}
              onClick={handleTreeOnClick}
              // canDrag={() => true}
              // canDrop={() => true}

              saveData={saveData}
              addEmptyNode={addEmptyNode}
              // moveNode={moveNode}
              deleteNode={deleteNode}
              updateBizGroupDelYn={updateBizGroupDelYn}

              history={history}
            />
          </ErrorBoundary>
        </StyledTabList>
        <ErrorBoundary>
          <ModalRoute path="/store/appMain/bizManage/authSetting/:BIZGRP_ID" component={AuthSetting} />
          <ModalContainer />
        </ErrorBoundary>
        <div className="myPageContentWrapper" style={{ minHeight: 'calc(100vh - 42px)' }}>
          <ErrorBoundary>
            <Route path="/store/appMain/bizManage/bizGroupReg/:BIZGRP_ID" component={BizGroupReg} exact />
            <Route path="/store/appMain/bizManage/bizMenuReg/:type/:BIZGRP_ID" component={BizMenuReg} />
            <Route
              path="/appPreview"
              component={AppPreview}
              exact
            />
          </ErrorBoundary>

          {/* <Route path="/store/appMain/bizManage/aut
        hSetting/:BIZGRP_ID" component={AuthSetting} /> */}
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

BizManage.propTypes = {
  history: PropTypes.object.isRequired,

  categoryData: PropTypes.array.isRequired,
  initCategoryData: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  changeSelectedIndex: PropTypes.func.isRequired,

  saveData: PropTypes.func.isRequired,
  addEmptyNode: PropTypes.func.isRequired,
  // moveNode: PropTypes.func.isRequired,
  deleteNode: PropTypes.func.isRequired,
  updateBizGroupDelYn: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    // 카테고리
    initCategoryData: () => dispatch(actions.initCategoryData()),
    changeSelectedIndex: selectedIndex =>
      dispatch(actions.changeSelectedIndex(selectedIndex)),
    saveData: (rowInfo, categoryData) => dispatch(actions.saveData(rowInfo, categoryData)),

    addEmptyNode: (rowInfo, data, categoryData, history) =>
      dispatch(actions.addEmptyNode(rowInfo, data, categoryData, history)),
    // moveNode: treeData => dispatch(actions.moveNode(treeData)),
    deleteNode: (rowInfo, categoryData, history) =>
      dispatch(actions.deleteNode(rowInfo, categoryData, history)),
    updateBizGroupDelYn: (rowInfo, categoryData, data, history) =>
      dispatch(actions.updateBizGroupDelYn(rowInfo, categoryData, data, history)),
  };
}

const mapStateToProps = createStructuredSelector({
  // 카테고리
  categoryData: selectors.makeCategoryData(),
  selectedIndex: selectors.makeSelectedIndex(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'bizmanage', reducer });
const withSaga = injectSaga({ key: 'bizmanage', saga });

export default injectIntl(compose(
  withReducer,
  withConnect,
  withSaga,
)(BizManage));

