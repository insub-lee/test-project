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

class CSManualList extends Component {
  componentDidMount() {
    const { GetTotalManualList } = this.props;
    GetTotalManualList(24240);
  }

  handleCloseModal = () => {
    const {
 resetManualView, setIsViewContents, setSelectedMualIdx, setViewSelectedMualIdx 
} = this.props;
    setIsViewContents(false);
    resetManualView();
    setSelectedMualIdx(0);
    setViewSelectedMualIdx(0);
  };

  render() {
    const {
 totalManualList, isViewContents, setIsViewContents, setSelectedMualIdx, selectedMualIdx 
} = this.props;
    // let ListItemData = fromJS({});
    let ListItemData = fromJS([]);
    if (totalManualList.size > 0) {
      const flatData = totalManualList.toJS();
      // ListItemData = fromJS(
      //   getTreeFromFlatData({ flatData, getKey: node => node.CATEGORY_IDX, getParentKey: node => node.CATEGORY_PARENT_IDX, rootKey: 24240 }),
      // );

      const tempItemData = getTreeFromFlatData({
        flatData,
        getKey: node => node.CATEGORY_IDX,
        getParentKey: node => node.CATEGORY_PARENT_IDX,
        rootKey: 24240,
      });

      ListItemData = fromJS(tempItemData.map((item) => {
          const tempNode = { ...item, childrenNode: item.children };
          delete tempNode.children;
          return tempNode;
        }),);
    }
    return (
      <div id="csManualList" style={{ padding: 40, border: '1px solid #eaeaea', borderRadius: 3 }}>
        <Topbar />
        {ListItemData.map(category => [
          <TitleBar key={`TitleBar_${category.get('CATEGORY_IDX')}`} categoryName={category.get('CATEGORY_NAME')} />,
          <Row key={`Row_${category.get('CATEGORY_IDX')}`} gutter={12}>
            {category.get('childrenNode').map(manualitem => (
              <Col xxl={6} xl={8} md={12} sm={24} key={manualitem.get('CATEGORY_IDX')}>
                <ListItem data={manualitem.toJS()} linkItemAction={{ setIsViewContents, setSelectedMualIdx }} />
              </Col>
            ))}
          </Row>,
        ])}
        <Modal
          width={1142}
          bodyStyle={{ height: 'calc(100vh - 66px)', padding: '4px' }}
          // maskStyle={{ backgroundColor: '#ffffff' }}
          style={{ top: 42 }}
          visible={isViewContents && selectedMualIdx > 0}
          footer={null}
          onCancel={() => this.handleCloseModal()}
          closable={false}
          getContainer={() => document.querySelector('#csManualList')}
        >
          <CSManualView mualIdx={selectedMualIdx} />
        </Modal>
      </div>
    );
  }
}

// saga

CSManualList.propTypes = {
  GetTotalManualList: PropTypes.func,
  totalManualList: PropTypes.object,
  isViewContents: PropTypes.bool,
};

CSManualList.defaultProps = {
  GetTotalManualList: false,
  totalManualList: [],
  isViewContents: false,
};

const mapStateToProps = createStructuredSelector({
  totalManualList: selectors.makeSelectCSManualList(),
  isViewContents: selectors.makeSelectIsViewContents(),
  selectedMualIdx: selectors.makeSelectedMualIdx(),
});

const mapDispatchToProps = dispatch => ({
  GetTotalManualList: categoryIdx => dispatch(actions.getTotalManualList(categoryIdx)),
  setIsViewContents: flag => dispatch(actions.setIsViewContentsByReducr(flag)),
  setSelectedMualIdx: idx => dispatch(actions.setSelectedMualIdxByReducr(idx)),
  setViewSelectedMualIdx: idx => dispatch(viewActions.setSelectedMualIdxByReducr(idx)),
  resetManualView: () => dispatch(viewActions.resetManualViewByReducr()),
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
