import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Modal } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import CSManualView from 'apps/manual/user/CSManualView';
import News from './news';
import * as selectors from './selector';
import * as actions from './action';
import saga from './saga';
import reducer from './reducer';
import StyleWiget from './StyleWidgets';

const { TabPane } = Tabs;

// 신규지식 위젯
class NewsFeed extends Component {
  handleClick = mualIdx => {
    const { showModal } = this;
    const { setModalIdx } = this.props;
    const widget_id = this.props.item.WIDGET_ID;
    setModalIdx(mualIdx, widget_id);
    showModal();
  };

  showModal = () => {
    const { setModalView } = this.props;
    const widget_id = this.props.item.WIDGET_ID;
    setModalView(true, widget_id);
  };

  handleCloseModal = () => {
    const { setModalView, setModalIdx } = this.props;
    const widget_id = this.props.item.WIDGET_ID;
    setModalIdx(undefined, widget_id);
    setModalView(false, widget_id);
  };

  componentDidMount() {
    const { getNewsFeed, item, setModalView } = this.props;
    const widget_id = this.props.item.WIDGET_ID;
    let { selectedCategory } = item.data;

    if (selectedCategory == '' || selectedCategory === undefined || selectedCategory === null) {
      selectedCategory = [];
    }

    setModalView(false, widget_id);
    getNewsFeed(widget_id, selectedCategory);
  }

  render() {
    const { handleCloseModal, handleClick } = this;
    const widget_id = this.props.item.WIDGET_ID;
    const widgetSize = this.props.item.size;
    const { modalView, modalIdx, widgetDataList } = this.props;
    const { totalList } = widgetDataList;
    const { updateList } = widgetDataList;
    const { newList } = widgetDataList;

    console.log('widgetDataList', widgetDataList);

    return (
      <div>
        <StyleWiget className="board" style={{ width: '100%', height: '100%' }}>
          <Tabs defaultActiveKey="total">
            <TabPane tab="전체" key="total">
              <News dataList={totalList} handleClick={handleClick} widget_id={widget_id} widgetSize={widgetSize} />
            </TabPane>
            <TabPane tab="변경" key="update">
              <News dataList={updateList} handleClick={handleClick} widget_id={widget_id} widgetSize={widgetSize} />
            </TabPane>
            <TabPane tab="신규" key="new">
              <News dataList={newList} handleClick={handleClick} widget_id={widget_id} widgetSize={widgetSize} />
            </TabPane>
          </Tabs>
        </StyleWiget>
        <Modal
          width={1198}
          bodyStyle={{ height: 'calc(100vh - 66px)', padding: '4px' }}
          style={{ top: 42 }}
          visible={modalView}
          footer={null}
          onCancel={() => handleCloseModal()}
          closable={false}
        >
          <CSManualView mualIdx={modalIdx} widgetId={widget_id} />
        </Modal>
      </div>
    );
  }
}

NewsFeed.propTypes = {
  widgetDataList: PropTypes.object,
  selectedCategory: PropTypes.array,
  getNewsFeed: PropTypes.func,
  modalView: PropTypes.bool,
  modalIdx: PropTypes.any,
  setModalView: PropTypes.func,
  setModalIdx: PropTypes.func,
};

NewsFeed.defaultProps = {
  item: {
    WIDGET_ID: 11079,
    size: '2X1',
    data: {
      selectedCategory: [],
    },
  },
  widgetDataList: {},
  selectedCategory: [],
  modalView: false,
  modalIdx: undefined,
  getNewsFeed: () => false,
  setModalView: () => false,
  setModalIdx: () => false,
};

const mapStateToProps = createStructuredSelector({
  widgetDataList: selectors.selectWidgetDataList(),
  selectedCategory: selectors.selectWidgetCategory(),
  totalCategory: selectors.selectWidgetTotalCategory(),
  modalView: selectors.selectModalView(),
  modalIdx: selectors.selectModalIdx(),
});

const mapDispatchToProps = dispatch => ({
  getNewsFeed: (widget_id, selectedCategory) => dispatch(actions.getNewsfeedDataList(widget_id, selectedCategory)),
  setModalView: (modalView, widget_id) => dispatch(actions.setModalView(modalView, widget_id)),
  setModalIdx: (mualIdx, widget_id) => dispatch(actions.setModalIdx(mualIdx, widget_id)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'NewsFeed', saga });
const withReducer = injectReducer({ key: 'NewsFeed', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NewsFeed);
