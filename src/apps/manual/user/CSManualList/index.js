import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal } from 'antd';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { fromJS } from 'immutable';
import { getTreeFromFlatData } from 'react-sortable-tree';

import CSManualView from '../CSManualView';
import * as viewActions from '../CSManualView/actions';

import ListItem from './ListItem';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import Topbar from './Topbar';
import TitleBar from './TitleBar';

const onClickTest = () => console.debug('listtopclick!!!');

class CSManualList extends Component {
  componentDidMount() {
    const { GetTotalManualList, item } = this.props;
    const categoryIdx = item && item.data && item.data.categoryIdx ? item.data.categoryIdx : 24240;
    const widgetId = item && item.id ? item.id : categoryIdx;
    GetTotalManualList(categoryIdx, widgetId);
  }

  handleCloseModal = () => {
    const {
 resetManualView, setIsViewContents, setSelectedMualIdx, setViewSelectedMualIdx, item 
} = this.props;
    const categoryIdx = item && item.data && item.data.categoryIdx ? item.data.categoryIdx : 24240;
    const widgetId = item && item.id ? item.id : categoryIdx;
    setIsViewContents(false, widgetId);
    resetManualView(widgetId);
    setSelectedMualIdx(0, widgetId);
    setViewSelectedMualIdx(0, widgetId);
  };

  render() {
    const {
 totalManualList, isViewContents, setIsViewContents, setSelectedMualIdx, selectedMualIdx, setCheckManual, checkedManualList, item 
} = this.props;
    // let ListItemData = fromJS({});
    let ListItemData = fromJS([]);
    const categoryIdx = item && item.data && item.data.categoryIdx ? item.data.categoryIdx : 24240;
    const widgetId = item && item.id ? item.id : categoryIdx;
    if (totalManualList.size > 0) {
      const flatData = totalManualList.toJS();
      // ListItemData = fromJS(
      //   getTreeFromFlatData({ flatData, getKey: node => node.CATEGORY_IDX, getParentKey: node => node.CATEGORY_PARENT_IDX, rootKey: 24240 }),
      // );

      const tempItemData = getTreeFromFlatData({
        flatData,
        getKey: node => node.CATEGORY_IDX,
        getParentKey: node => node.CATEGORY_PARENT_IDX,
        rootKey: categoryIdx,
      });

      ListItemData = fromJS(tempItemData.map((node) => {
          const tempNode = { ...node, childrenNode: node.children };
          delete tempNode.children;
          return tempNode;
        }),);
    }

    const topBarButton = [
      { key: 'listTopbar', title: '모아보기', event: onClickTest },
      { key: 'listTopbar', title: '오류신고', event: onClickTest },
      { key: 'listTopbar', title: '오류신고', event: onClickTest },
      { key: 'listTopbar', title: '오류신고', event: onClickTest },
      { key: 'listTopbar', title: '오류신고', event: onClickTest },
    ];

    return (
      <div id={`csManualList_${widgetId}`} style={{ padding: 40, border: '1px solid #eaeaea', borderRadius: 3 }}>
        <Topbar data={topBarButton} />
        {ListItemData.map(category => [
          <TitleBar key={`TitleBar_${category.get('CATEGORY_IDX')}`} categoryName={category.get('CATEGORY_NAME')} />,
          <Row key={`Row_${category.get('CATEGORY_IDX')}`} gutter={12}>
            {category.get('childrenNode').map(manualitem => (
              <Col xxl={6} xl={8} md={12} sm={24} key={manualitem.get('CATEGORY_IDX')}>
                <ListItem data={manualitem.toJS()} linkItemAction={{
 setIsViewContents, setSelectedMualIdx, setCheckManual, checkedManualList, widgetId 
}} />
              </Col>
            ))}
          </Row>,
        ])}
        <Modal
          width={1158}
          bodyStyle={{ height: 'calc(100vh - 66px)', padding: '4px' }}
          // maskStyle={{ backgroundColor: '#ffffff' }}
          style={{ top: 42 }}
          visible={isViewContents && selectedMualIdx > 0}
          footer={null}
          onCancel={() => this.handleCloseModal()}
          closable={false}
          getContainer={() => document.querySelector(`#csManualList_${widgetId}`)}
        >
          <CSManualView mualIdx={selectedMualIdx} widgetId={widgetId} />
        </Modal>
      </div>
    );
  }
}

// saga

CSManualList.propTypes = {
  GetTotalManualList: PropTypes.func,
  totalManualList: PropTypes.arrayOf(PropTypes.object),
  isViewContents: PropTypes.bool,
  item: PropTypes.object,
  setIsViewContents: PropTypes.func,
  setSelectedMualIdx: PropTypes.func,
  resetManualView: PropTypes.func,
  setViewSelectedMualIdx: PropTypes.func,
  selectedMualIdx: PropTypes.number,
  setCheckManual: PropTypes.func,
  checkedManualList: PropTypes.array,
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
  checkedManualList: [],
};

const mapStateToProps = createStructuredSelector({
  totalManualList: selectors.makeSelectCSManualList(),
  isViewContents: selectors.makeSelectIsViewContents(),
  selectedMualIdx: selectors.makeSelectedMualIdx(),
  checkedManualList: selectors.makeCheckedManualList(),
});

const mapDispatchToProps = dispatch => ({
  GetTotalManualList: (categoryIdx, widgetId) => dispatch(actions.getTotalManualList(categoryIdx, widgetId)),
  setIsViewContents: (flag, widgetId) => dispatch(actions.setIsViewContentsByReducr(flag, widgetId)),
  setSelectedMualIdx: (idx, widgetId) => dispatch(actions.setSelectedMualIdxByReducr(idx, widgetId)),
  setViewSelectedMualIdx: (idx, widgetId) => dispatch(viewActions.setSelectedMualIdxByReducr(idx, widgetId)),
  resetManualView: widgetId => dispatch(viewActions.resetManualViewByReducr(widgetId)),
  setCheckManual: (mualIdx, widgetId) => dispatch(actions.setCheckManualByReducr(mualIdx, widgetId)),
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
