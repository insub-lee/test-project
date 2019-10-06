import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal, Affix } from 'antd';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { fromJS } from 'immutable';
import { getTreeFromFlatData } from 'react-sortable-tree';

import ErrorBoundary from 'containers/common/ErrorBoundary';
import CSManualView from '../CSManualView';
import * as viewActions from '../CSManualView/actions';

import ListItem from './ListItem';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import Topbar from './Topbar';
import TitleBar from './TitleBar';
import CompareView from './CompareView';

class CSManualList extends Component {
  constructor(props) {
    super(props);
    this.handleClickTopBarButton = this.handleClickTopBarButton.bind(this);
  }

  componentDidMount() {
    const { GetTotalManualList, item } = this.props;
    const categoryIdx = item && item.data && item.data.categoryIdx ? item.data.categoryIdx : 24240;
    const widgetId = item && item.id ? item.id : categoryIdx;
    GetTotalManualList(categoryIdx, widgetId);
  }

  handleCloseModal = () => {
    const { resetManualView, setIsViewContents, setSelectedMualIdx, setViewSelectedMualIdx, item } = this.props;
    const categoryIdx = item && item.data && item.data.categoryIdx ? item.data.categoryIdx : 24240;
    const widgetId = item && item.id ? item.id : categoryIdx;
    setIsViewContents(false, widgetId);
    resetManualView(widgetId);
    setSelectedMualIdx(0, widgetId);
    setViewSelectedMualIdx(0, widgetId);
  };

  handleClickTopBarButton = key => {
    const { item, setMultiView, getCompareView } = this.props;
    const categoryIdx = item && item.data && item.data.categoryIdx ? item.data.categoryIdx : 24240;
    const widgetId = item && item.id ? item.id : categoryIdx;
    switch (key) {
      case 'mualListSetMultiView':
        setMultiView(widgetId);
        break;
      case 'mualListCompare':
        getCompareView(widgetId);
        break;
      // case 'mualListCancelCheck':
      //   resetCheckManual(widgetId);
      //   break;
      default:
        console.debug(key);
    }
  };

  handleCompareViewClose = () => {
    const { setIsCompareView, item } = this.props;
    const categoryIdx = item && item.data && item.data.categoryIdx ? item.data.categoryIdx : 24240;
    const widgetId = item && item.id ? item.id : categoryIdx;
    setIsCompareView(widgetId, false);
  };

  render() {
    const {
      totalManualList,
      isViewContents,
      setIsViewContents,
      setSelectedMualOrgIdx,
      selectedMualIdx,
      setCheckManual,
      checkedManualList,
      item,
      compareList,
      templetData,
      isCompareView,
    } = this.props;
    // let ListItemData = fromJS({});
    let ListItemData = fromJS([]);
    const categoryIdx = item && item.data && item.data.categoryIdx ? item.data.categoryIdx : 24240;
    const widgetId = item && item.id ? item.id : categoryIdx;
    let tempItemData = [];
    if (totalManualList.size > 0) {
      const flatData = totalManualList.toJS();
      // ListItemData = fromJS(
      //   getTreeFromFlatData({ flatData, getKey: node => node.CATEGORY_IDX, getParentKey: node => node.CATEGORY_PARENT_IDX, rootKey: 24240 }),
      // );

      tempItemData = getTreeFromFlatData({
        flatData,
        getKey: node => node.CATEGORY_IDX,
        getParentKey: node => node.CATEGORY_PARENT_IDX,
        rootKey: categoryIdx,
      });

      ListItemData = fromJS(
        tempItemData.map(node => {
          const tempNode = { ...node, childrenNode: node.children };
          delete tempNode.children;
          return tempNode;
        }),
      );
    }

    const topBarButton = [
      { key: 'mualListSetMultiView', title: '모아보기', event: this.handleClickTopBarButton },
      { key: 'mualListCompare', title: '상품비교', event: this.handleClickTopBarButton },
      // { key: 'listTopbar2', title: '오류신고', event: this.handleClickTopBarButton },
      // { key: 'listTopbar3', title: '오류신고', event: this.handleClickTopBarButton },
      // { key: 'listTopbar4', title: '오류신고', event: this.handleClickTopBarButton },
    ];

    return (
      <ErrorBoundary>
        <div id={`csManualList_${widgetId}`} style={{ padding: 40, border: '1px solid #eaeaea', borderRadius: 3 }}>
          <Topbar
            data={topBarButton}
            tempItemData={tempItemData}
            setSelectedMualOrgIdx={setSelectedMualOrgIdx}
            setIsViewContents={setIsViewContents}
            widgetId={widgetId}
          />
          {ListItemData.map(category => [
            <TitleBar key={`TitleBar_${category.get('CATEGORY_IDX')}`} categoryName={category.get('CATEGORY_NAME')} />,
            <Row key={`Row_${category.get('CATEGORY_IDX')}`} gutter={12}>
              {category &&
                category.get('childrenNode') &&
                category.get('childrenNode').map(manualitem => (
                  <Col xxl={6} xl={8} md={12} sm={24} key={manualitem.get('CATEGORY_IDX')}>
                    <ListItem
                      data={manualitem.toJS()}
                      linkItemAction={{
                        setIsViewContents,
                        setSelectedMualOrgIdx,
                        setCheckManual,
                        checkedManualList,
                        widgetId,
                        handleClickTopBarButton: this.handleClickTopBarButton,
                      }}
                    />
                  </Col>
                ))}
            </Row>,
          ])}
          <Modal
            width={1198}
            bodyStyle={{ height: 'calc(100vh - 66px)', padding: '4px' }}
            style={{ top: 42 }}
            visible={isViewContents && selectedMualIdx > 0}
            footer={null}
            onCancel={() => this.handleCloseModal()}
            closable={false}
            getContainer={() => document.querySelector(`#csManualList_${widgetId}`)}
          >
            <CSManualView mualIdx={selectedMualIdx} widgetId={widgetId} />
          </Modal>
          <Modal
            width={1248}
            bodyStyle={{ padding: '4px' }}
            style={{ top: 42 }}
            visible={isCompareView}
            footer={null}
            onCancel={() => this.handleCompareViewClose()}
            closable={false}
            getContainer={() => document.querySelector(`#csManualList_${widgetId}`)}
          >
            <CompareView compareList={compareList.toJS()} templetData={templetData.toJS()} />
          </Modal>
        </div>
      </ErrorBoundary>
    );
  }
}

// saga

CSManualList.propTypes = {
  GetTotalManualList: PropTypes.func,
  totalManualList: PropTypes.object,
  isViewContents: PropTypes.bool,
  item: PropTypes.object,
  setIsViewContents: PropTypes.func,
  setSelectedMualIdx: PropTypes.func,
  resetManualView: PropTypes.func,
  setViewSelectedMualIdx: PropTypes.func,
  selectedMualIdx: PropTypes.number,
  setCheckManual: PropTypes.func,
  checkedManualList: PropTypes.object,
  setMultiView: PropTypes.func,
  setSelectedMualOrgIdx: PropTypes.func,
  getCompareView: PropTypes.func,
  compareList: PropTypes.object,
  templetData: PropTypes.object,
  isCompareView: PropTypes.bool,
  setIsCompareView: PropTypes.func,
  // resetCheckManual: PropTypes.func,
};

CSManualList.defaultProps = {
  GetTotalManualList: false,
  totalManualList: fromJS([]),
  isViewContents: false,
  item: {},
  setIsViewContents: () => false,
  setSelectedMualIdx: () => false,
  resetManualView: () => false,
  setViewSelectedMualIdx: () => false,
  selectedMualIdx: 0,
  setCheckManual: () => false,
  checkedManualList: fromJS([]),
  setMultiView: () => false,
  setSelectedMualOrgIdx: () => false,
  getCompareView: () => false,
  compareList: fromJS([]),
  templetData: fromJS({}),
  isCompareView: false,
  setIsCompareView: () => false,
  // resetCheckManual: () => false,
};

const mapStateToProps = createStructuredSelector({
  totalManualList: selectors.makeSelectCSManualList(),
  isViewContents: selectors.makeSelectIsViewContents(),
  selectedMualIdx: selectors.makeSelectedMualIdx(),
  checkedManualList: selectors.makeCheckedManualList(),
  compareList: selectors.makeSelectCompareViewList(),
  templetData: selectors.makeSelectCompareViewTemplet(),
  isCompareView: selectors.makeSelectIsCompareView(),
});

const mapDispatchToProps = dispatch => ({
  GetTotalManualList: (categoryIdx, widgetId) => dispatch(actions.getTotalManualList(categoryIdx, widgetId)),
  setIsViewContents: (flag, widgetId) => dispatch(actions.setIsViewContentsByReducr(flag, widgetId)),
  setSelectedMualIdx: (mualIdx, widgetId) => dispatch(actions.setSelectedMualIdxByReducr(mualIdx, widgetId)),
  setSelectedMualOrgIdx: (mualIdx, widgetId, orgIdxList) => dispatch(actions.setSelectedMualOrgIdxBySaga(mualIdx, widgetId, orgIdxList)),
  setViewSelectedMualIdx: (idx, widgetId) => dispatch(viewActions.setSelectedMualIdxByReducr(idx, widgetId)),
  resetManualView: widgetId => dispatch(viewActions.resetManualViewByReducr(widgetId)),
  setCheckManual: (mualIdx, mualOrgIdx, widgetId) => dispatch(actions.setCheckManualByReducr(mualIdx, mualOrgIdx, widgetId)),
  setMultiView: widgetId => dispatch(actions.setMultiViewBySaga(widgetId)),
  getCompareView: widgetId => dispatch(actions.getCompareViewBySaga(widgetId)),
  setIsCompareView: (widgetId, flag) => dispatch(actions.setIsCompareViewByReducr(widgetId, flag)),
  // resetCheckManual: widgetId => dispatch(actions.resetCheckManualByReducr(widgetId)),
});

const withReducer = injectReducer({ key: 'apps-manual-user-CSManualList-reducer', reducer });
const withSaga = injectSaga({ key: 'apps-manual-user-CSManualList-saga', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CSManualList);
