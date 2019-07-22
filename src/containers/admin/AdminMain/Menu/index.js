import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
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

// const homeUrl = '/store/appMain/bizManage';
const menuHomeUrl = '/admin/adminmain/menu';
const workHomeUrl = '/admin/adminmain/work';

class BizManage extends Component {
  componentDidMount() {
    console.log('componentDidMount');
    const { match: { params: { MENU } } } = this.props;
    if (MENU === 'menu') {
      console.log('getMenuBizGrpID');
      this.props.getMenuBizGrpID();
    } else if (MENU === 'work') {
      console.log('getMenuBizGrpID');
      this.props.initCategoryData();
    }
    this.MENU = MENU;
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    console.log(nextProps.history.location.pathname);
    const { match: { params: { MENU } } } = nextProps;
    this.MENU = MENU;

    if (workHomeUrl === nextProps.history.location.pathname) {
      if (nextProps.categoryData.length > 0) {
        let url;
        const generateList = (data) => {
          for (let i = 0; i < data.length; i += 1) {
            const node = data[i];

            if (url === undefined) {
              if (node.MENU_EXIST_YN !== 'N') {
                url = `/admin/adminmain/work/bizMenuReg/info/${node.key}`;
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
          console.log('workHomeUrl');
          console.log(url);
          nextProps.history.push(url);
        }
      } else {
        // 트리 데이터가 없는 경우. main화면
      }
    } else if (menuHomeUrl === nextProps.history.location.pathname) {
      console.log('menuHomeUrl');
      console.log(nextProps.menuBizGrpId);
      if (nextProps.menuBizGrpId > 0) {
        nextProps.history.push(`/admin/adminmain/menu/bizMenuReg/info/${nextProps.menuBizGrpId}`);
      }
    }
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate');
    const { match: { params: { MENU: PREVMENU } } } = prevProps;
    const { match: { params: { MENU } } } = this.props;

    if (PREVMENU !== MENU) {
      console.log('PREVMENU !== MENU');
      if (MENU === 'menu') {
        this.props.getMenuBizGrpID();
      } else if (MENU === 'work') {
        this.props.initCategoryData();
      }
      this.MENU = MENU;
    }
  }

  render() {
    const {
      // data
      history,
      location,
      categoryData,
      selectedIndex,
      changeSelectedIndex,

      saveData,
      addEmptyNode,
      moveNode,
      deleteNode,
      updateBizGroupDelYn,
    } = this.props;

    const preUrl = this.props.match.url;

    const handleTreeOnClick = (node) => {
      changeSelectedIndex(node.key);
      if (node.MENU_EXIST_YN !== 'N') {
        history.push(`/admin/adminmain/work/bizMenuReg/info/${node.key}`);
      } else {
        history.push(`/admin/adminmain/work/bizGroupReg/${node.key}`);
      }
    };

    const isTreeGroup = this.MENU === 'work';
    /*
    let isTreeGroup = false;
    if (location.pathname.indexOf('bizMenuReg/') > -1) {
      const pathArr = location.pathname.split('/');
      if (location.pathname.indexOf('info/') > -1) {
        const bizgrpId = pathArr[pathArr.length - 1];
        isTreeGroup = Number(bizgrpId) !== 1;
      } else {
        const bizgrpId = pathArr[pathArr.length - 2];
        isTreeGroup = Number(bizgrpId) !== 1;
      }
    } else {
      isTreeGroup = true;
    }
    */
    return (
      <div className="appMyPageWrapper">
        {isTreeGroup && (
          <StyledTabList className="treeWrapper" style={{ left: '200px' }}>
            <ErrorBoundary>
              <BizGroupTree
                treeData={categoryData}
                selectedIndex={selectedIndex}
                onClick={handleTreeOnClick}
                canDrag={() => true}
                canDrop={() => true}

                saveData={saveData}
                addEmptyNode={addEmptyNode}
                moveNode={moveNode}
                deleteNode={deleteNode}
                updateBizGroupDelYn={updateBizGroupDelYn}
                history={history}
              />
            </ErrorBoundary>
          </StyledTabList>
        )}
        <ErrorBoundary>
          <ModalRoute path={`${preUrl}/authSetting/:BIZGRP_ID`} component={AuthSetting} />
          <ModalContainer />
        </ErrorBoundary>
        <div className="myPageContentWrapper" style={{ minHeight: 'calc(100vh - 42px)' }}>
          <ErrorBoundary>
            <Switch>
              <Route path="/admin/adminmain/work/bizGroupReg/:BIZGRP_ID" component={BizGroupReg} exact />
              <Route path="/admin/adminmain/:MENU/bizMenuReg/:type/:BIZGRP_ID" component={BizMenuReg} />
              <Route path="/appPreview" component={AppPreview} exact />
            </Switch>
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
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  categoryData: PropTypes.array.isRequired,
  initCategoryData: PropTypes.func.isRequired,
  getMenuBizGrpID: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  changeSelectedIndex: PropTypes.func.isRequired,
  menuBizGrpId: PropTypes.number.isRequired,

  saveData: PropTypes.func.isRequired,
  addEmptyNode: PropTypes.func.isRequired,
  moveNode: PropTypes.func.isRequired,
  deleteNode: PropTypes.func.isRequired,
  updateBizGroupDelYn: PropTypes.func.isRequired,
};


export function mapDispatchToProps(dispatch) {
  return {
    // 카테고리
    initCategoryData: () => dispatch(actions.initCategoryData()),
    getMenuBizGrpID: () => dispatch(actions.getMenuBizGrpID()),

    changeSelectedIndex: selectedIndex => dispatch(actions.changeSelectedIndex(selectedIndex)),
    saveData: (rowInfo, categoryData) => dispatch(actions.saveData(rowInfo, categoryData)),

    addEmptyNode: (rowInfo, data, categoryData, history) => dispatch(actions.addEmptyNode(rowInfo, data, categoryData, history)),
    moveNode: treeData => dispatch(actions.moveNode(treeData)),
    deleteNode: (rowInfo, categoryData, history) => dispatch(actions.deleteNode(rowInfo, categoryData, history)),
    updateBizGroupDelYn: (rowInfo, categoryData, data, history) => dispatch(actions.updateBizGroupDelYn(rowInfo, categoryData, data, history)),
  };
}

const mapStateToProps = createStructuredSelector({
  // 카테고리
  categoryData: selectors.makeCategoryData(),
  selectedIndex: selectors.makeSelectedIndex(),
  menuBizGrpId: selectors.makeMenuBizGrpId(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'admin/AdminMain/Menu', reducer });
const withSaga = injectSaga({ key: 'admin/AdminMain/Menu', saga });

export default injectIntl(compose(
  withReducer,
  withConnect,
  withSaga,
)(BizManage));
