import { injectIntl } from 'react-intl';
import PropTypes from './node_modules/prop-types';
import { Route } from './node_modules/react-router-dom';
import React, { Component } from './node_modules/react';
import { compose } from './node_modules/redux';
import { connect } from './node_modules/react-redux';
import { createStructuredSelector } from './node_modules/reselect';
import { ModalContainer, ModalRoute } from './node_modules/react-router-modal';

import './node_modules/react-router-modal/css/react-router-modal.css';

import Widget from './node_modules/components/appSetting';
import Footer from './node_modules/containers/store/App/Footer';

import ErrorBoundary from './node_modules/containers/common/ErrorBoundary';

import injectReducer from './node_modules/utils/injectReducer';
import injectSaga from './node_modules/utils/injectSaga';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

import Main from './Main';
import MyPageTree from '../../../store/components/MyPageTree';
import StyledTabList from '../../../store/components/TabList/StyledTabList';
import AppInfo from './AppInfo';
import PageInfo from './PageInfo';
// import Popup from './Popup';
import AppBizModal from './AppBizModal';

const homeUrl = '/store/appMain/myPage';

function getUrl(node) {
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

  return url;
}

class AppStore extends Component {
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
              if (node.NODE_TYPE !== 'F') {
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
  }

  render() {
    const {
      // data
      history,
      categoryData,
      selectedIndex,
      changeSelectedIndex,

      insertNode,
      updateNode,

      saveData,
      moveNode,
      deleteNode,
      updateMymenuDisp,
    } = this.props;

    const handleTreeOnClick = (node) => {
      changeSelectedIndex(node.key);

      if (node.NODE_TYPE !== 'F') {
        const url = getUrl(node);
        history.push(url);
        window.scrollTo(0, 0);
      }
    };

    return (
      <div className="appMyPageWrapper">
        <StyledTabList className="treeWrapper">
          <ErrorBoundary>
            <MyPageTree
              treeData={categoryData}
              selectedIndex={selectedIndex}
              onClick={handleTreeOnClick}
              canDrag={true}
              canDrop={true}

              insertNode={insertNode}
              updateNode={updateNode}

              saveData={saveData}
              moveNode={moveNode}
              deleteNode={deleteNode}
              updateMymenuDisp={updateMymenuDisp}

              history={history}
            />
          </ErrorBoundary>
        </StyledTabList>

        <ErrorBoundary>
          <ModalRoute
            path="/store/appMain/myPage/widgetsetting/:PAGE_ID/:WIDGET_ID"
            component={Widget}
            // className="widgetsetting-modal"
            // inClassName="widgetsetting-modal-in"
            // outClassName="widgetsetting-modal-out"
            // backdropClassName="widgetsetting-backdrop"
            outDelay={1200} // 1000 = 1s, widgetsetting-modal-out 시간보다 조금 더 길게
          />
        </ErrorBoundary>

        <ModalContainer />
        <div className="myPageContentWrapper">
          <ErrorBoundary>
            <Route path="/store/appMain/myPage" component={Main} exact />
            <Route path="/store/appMain/myPage/app/:APP_ID" component={AppInfo} exact />
            <Route path="/store/appMain/myPage/page/:PAGE_ID" component={PageInfo} exact />
            <Route path="/store/appMain/myPage/modal" component={AppBizModal} />
          </ErrorBoundary>
        </div>
        <Footer />
      </div>
    );
  }
}

AppStore.propTypes = {
  history: PropTypes.object.isRequired,

  categoryData: PropTypes.array.isRequired,
  initCategoryData: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  changeSelectedIndex: PropTypes.func.isRequired,

  insertNode: PropTypes.func.isRequired,
  updateNode: PropTypes.func.isRequired,

  saveData: PropTypes.func.isRequired,
  moveNode: PropTypes.func.isRequired,
  deleteNode: PropTypes.func.isRequired,
  updateMymenuDisp: PropTypes.func.isRequired,
};

AppStore.defaultProps = {
};

export function mapDispatchToProps(dispatch) {
  return {
    // 카테고리
    initCategoryData: () => dispatch(actions.initCategoryData()),
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

