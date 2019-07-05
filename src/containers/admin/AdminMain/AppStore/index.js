import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import { Select } from 'antd';
import 'react-router-modal/css/react-router-modal.css';

import Widget from 'components/appSetting';
import Footer from 'containers/admin/App/Footer';

import ErrorBoundary from 'containers/common/ErrorBoundary';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

import Main from './Main';
import AppStoreTree from './AppStoreTree';
// import StyledTabList from '../../../store/components/TabList/StyledTabList';
import AppInfo from './AppInfo';
import PageInfo from './PageInfo';
// import Popup from './Popup';
import AppModal from './AppBizModal/AppModal';
import StyleAppStore from './StyleAppStore';

const Option = Select.Option; // eslint-disable-line
const homeUrl = '/admin/adminmain/appstore';

function getUrl(node) {
  console.log('getUrl');
  console.log(node);

  const {
    NODE_TYPE, APP_ID, PAGE_ID,
  } = node;

  let url = homeUrl;

  if (NODE_TYPE === 'A' && APP_ID > 0) { // [앱] 상세
    url = `${homeUrl}/app/${APP_ID}`;
  } else if (NODE_TYPE === 'P' && PAGE_ID > 0) { // [페이지] 상세
    url = `${homeUrl}/page/${PAGE_ID}`;
  } else {
    url = '/admin/adminmain/appstore';
  }
  /*
  const {
    NODE_TYPE, REF_TYPE, REF_ID, APP_ID, PAGE_ID, APP_YN,
  } = node;

  let url = homeUrl;

  if (REF_TYPE === 'A' && APP_ID !== 0) { // [앱] 상세
    url = `${homeUrl}/app/${APP_ID}`;
  } else if (REF_TYPE !== 'B' && PAGE_ID !== 0) { // [페이지] 상세
    url = `${homeUrl}/page/${PAGE_ID}`;
  } else if (REF_TYPE === 'B') { // [업무그룹]
    if (NODE_TYPE === 'R') { // 상세
      url = `${homeUrl}/biz/detail/info/${REF_ID}`;
    } else if (APP_YN === 'Y') { // 앱상세
      // 임시
      url = `${homeUrl}/biz/detail/app/${REF_ID}/${APP_ID === 0 ? '' : APP_ID}`;
    } else { // 페이지 상세
      url = `${homeUrl}/biz/detail/page/${REF_ID}/${PAGE_ID}`;
    }
  }
  */
  return url;
}

class AppStore extends Component {
  componentWillMount() {
    this.props.getCategoryComboList();
    this.props.getCategoryData(1);
  }

  // eslint-disable-next-line no-unused-vars
  componentWillReceiveProps(nextProps) {
    /* 첫(기본)페이지일 경우 우측에 띄와줄 화면 세팅
    if (homeUrl === nextProps.history.location.pathname) {
      if (nextProps.categoryData.length > 0) {
        let url;
        const generateList = (data) => {
          for (let i = 0; i < data.length; i += 1) {
            const node = data[i];

            if (url === undefined) {
              if (node.NODE_TYPE === 'A') {
                url = getUrl(node);
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
    */
  }

  onChangeSite = (siteId) => {
    /*
    this.setState({
      siteId,
    });
    */
    this.props.getCategoryData(siteId);
  }

  insertAppNode = (rowInfo, treeData, data, history) => {
    console.log('insertAppNode');
    console.log(rowInfo);
    console.log(treeData);
    console.log(data);
    console.log(history);
    /*
    if (data.NODE_TYPE === 'F') { // 앱 카테고리 수정
      const {
        SITE_ID, PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN,
      } = data;
      this.props.insertCategory(SITE_ID, PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN);
    } else {
      this.props.insertNode(rowInfo, treeData, data, history);
    }
    */
  }

  updateAppNode = (rowInfo, treeData, data, history) => {
    console.log('updateAppNode');
    console.log(rowInfo);
    console.log(treeData);
    console.log(data);
    console.log(history);
    /*
    if (data.NODE_TYPE === 'F') { // 앱 카테고리 수정
      const {
        SITE_ID, CATG_ID, NAME_KOR, NAME_ENG, NAME_CHN,
      } = data;
      this.props.updateCategory(SITE_ID, CATG_ID, NAME_KOR, NAME_ENG, NAME_CHN)
    } else {
      this.props.updateNode(rowInfo, treeData, data, history);
    }
    */
  }

  render() {
    const {
      // data
      history,
      categoryData,
      selectedIndex,
      changeSelectedIndex,
      saveData,
      moveNode,
      deleteNode,
      updateMymenuDisp,
    } = this.props;

    const handleTreeOnClick = (node) => {
      changeSelectedIndex(node.key);
      const url = getUrl(node);
      history.push(url);
      window.scrollTo(0, 0);
    };

    return (
      <div>
        <StyleAppStore>
          <h3 className="pageTitle list">AppStore 관리</h3>
          {/* <div style={{ display: 'inline-block', width: '100%', minHeight: '100%' }}> */}
          <div className="pageContent" style={{ display: 'inline-block', width: '100%', height: 'calc(100vh - 170px)' }}>
            <div className="appstoreTreeWrapper">
              <div>
                <ErrorBoundary>
                  <Select defaultValue={1} onChange={this.onChangeSite}>
                    {this.props.categoryComboList.map(item => (
                      <Option value={item.SITE_ID} key={item.SITE_ID}>
                        {item.NAME_KOR}
                      </Option>
                    ))}
                  </Select>
                  <AppStoreTree
                    treeData={categoryData}
                    selectedIndex={selectedIndex}
                    onClick={handleTreeOnClick}
                    canDrag={false}
                    canDrop={false}
                    insertNode={this.insertAppNode}
                    updateNode={this.updateAppNode}
                    saveData={saveData}
                    moveNode={moveNode}
                    deleteNode={deleteNode}
                    updateMymenuDisp={updateMymenuDisp}
                    history={history}
                  />
                </ErrorBoundary>
              </div>
            </div>
            <div className="appstoreContents">
              <ErrorBoundary>
                <ModalRoute
                  path="/admin/adminmain/appstore/widgetsetting/:PAGE_ID/:WIDGET_ID"
                  component={Widget}
                  // className="widgetsetting-modal"
                  // inClassName="widgetsetting-modal-in"
                  // outClassName="widgetsetting-modal-out"
                  // backdropClassName="widgetsetting-backdrop"
                  outDelay={1200} // 1000 = 1s, widgetsetting-modal-out 시간보다 조금 더 길게
                />
              </ErrorBoundary>
              <ModalContainer />
              <div>
                <ErrorBoundary>
                  <Route path="/admin/adminmain/appstore" component={Main} exact />
                  <Route path="/admin/adminmain/appstore/app/:APP_ID" component={AppInfo} exact />
                  <Route path="/admin/adminmain/appstore/page/:PAGE_ID" component={PageInfo} exact />
                  <Route path="/admin/adminmain/appstore/modal/app/list" component={AppModal} />
                </ErrorBoundary>
              </div>
            </div>
          </div>
          <Footer />
        </StyleAppStore>
      </div>
    );
  }
}

AppStore.propTypes = {
  categoryComboList: PropTypes.array.isRequired,
  getCategoryComboList: PropTypes.func.isRequired,
  selectedIndex: PropTypes.string.isRequired,
  categoryData: PropTypes.array.isRequired,
  getCategoryData: PropTypes.func.isRequired,
  insertCategory: PropTypes.func.isRequired, //eslint-disable-line
  updateCategory: PropTypes.func.isRequired, //eslint-disable-line
  // 현재미사용
  changeSelectedIndex: PropTypes.func.isRequired,
  insertNode: PropTypes.func.isRequired, //eslint-disable-line
  updateNode: PropTypes.func.isRequired, //eslint-disable-line
  saveData: PropTypes.func.isRequired,
  moveNode: PropTypes.func.isRequired,
  deleteNode: PropTypes.func.isRequired,
  updateMymenuDisp: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

AppStore.defaultProps = {
};

export function mapDispatchToProps(dispatch) {
  return {
    // 카테고리
    getCategoryComboList: () => dispatch(actions.getCategoryComboList()),
    getCategoryData: siteId => dispatch(actions.getCategoryData(siteId)),
    insertCategory: (SITE_ID, PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN) => {
      dispatch(actions.insertCategory(SITE_ID, PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN));
    },
    updateCategory: (SITE_ID, CATG_ID, NAME_KOR, NAME_ENG, NAME_CHN) => {
      dispatch(actions.updateCategory(SITE_ID, CATG_ID, NAME_KOR, NAME_ENG, NAME_CHN));
    },
    // 현재미사용
    changeSelectedIndex: selectedIndex =>
      dispatch(actions.changeSelectedIndex(selectedIndex)),
    saveData: (rowInfo, categoryData) => dispatch(actions.saveData(rowInfo, categoryData)),
    moveNode: treeData => dispatch(actions.moveNode(treeData)),
    deleteNode: (rowInfo, categoryData, history) =>
      dispatch(actions.deleteNode(rowInfo, categoryData, history)),
    updateMymenuDisp: () => dispatch(actions.updateMymenuDisp()),
    insertNode: (rowInfo, treeData, data, history) =>
      dispatch(actions.insertNode(rowInfo, treeData, data, history)),
    updateNode: (rowInfo, treeData, data, history) =>
      dispatch(actions.updateNode(rowInfo, treeData, data, history)),
  };
}

const mapStateToProps = createStructuredSelector({
  // 카테고리
  categoryComboList: selectors.makeCategoryComboList(),
  categoryData: selectors.makeCategoryData(),
  selectedIndex: selectors.makeSelectedIndex(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'appstore', reducer });
const withSaga = injectSaga({ key: 'appstore', saga });

export default injectIntl(compose(
  withReducer,
  withConnect,
  withSaga,
)(AppStore));

