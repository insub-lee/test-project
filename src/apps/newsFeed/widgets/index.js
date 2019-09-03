import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Modal } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import News from './news';
import * as selectors from './selector';
import * as actions from './action';
import saga from './saga';
import reducer from './reducer';
import StyleWiget from './StyleWidgets';
import CSManualView from 'apps/manual/user/CSManualView';

const TabPane  = Tabs.TabPane;

class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widget_id: this.props.item.WIDGET_ID,
      selectedCategory: this.props.item.data.selectedCategory,
      newsfeedDataList: this.props.widgetDataList,
    }
  }


  handleClick = (mualIdx) => {
    const { setModalIdx } = this.props;
    const { widget_id } = this.state;
    const { showModal } = this;
    setModalIdx(mualIdx, widget_id);
    showModal();
  };


  showModal = () => {
    const { setModalView } = this.props;
    const {widget_id} = this. state;
    setModalView(true, widget_id);
  };
  

  handleCloseModal = () => {
    const { setModalView, setModalIdx } = this.props;
    const {widget_id} = this.state;
    setModalIdx(undefined, widget_id);
    setModalView(false, widget_id);
  };


  handlePageReload = () => {
    const { widgetSize, getNewsFeed } = this.props;
    const { selectedCategory } = this.state;
    getNewsFeed(widgetSize, selectedCategory);
  };
  

  componentDidMount() {
    const { getNewsFeed, item, setModalView } = this.props;
    const  {widget_id} = this.state; 
    let selectedCategory =  item.data.selectedCategory;

    if (selectedCategory == '' || selectedCategory === undefined || selectedCategory === null){
      selectedCategory = [];
    }

    setModalView(false, widget_id);
    getNewsFeed(widget_id, selectedCategory);
  }


  //componentWillReceiveProps(nextProps) {}

  render() {
    const { handleCloseModal, handleClick, handlePageReload } = this;
    const { widget_id } = this.state
    const { modalView, modalIdx ,widgetDataList } = this.props;
    const totalList = widgetDataList.totalList;
    const updateList = widgetDataList.updateList;
    const newList = widgetDataList.newList;
    
    return (
      <div>
        <StyleWiget className="board" style={{ width: '100%', height: '100%' }}>
              <Tabs defaultActiveKey="total">
                <TabPane tab="전체" key="total">
                  <News dataList={totalList} handleClick={handleClick} widget_id={widget_id}/>
                </TabPane>
                <TabPane tab="변경" key="update">
                  <News dataList={updateList} handleClick={handleClick}  widget_id={widget_id}/>
                </TabPane>
                <TabPane tab="신규" key="new">
                  <News dataList={newList} handleClick={handleClick}  widget_id={widget_id}/>
                </TabPane>
              </Tabs>
        </StyleWiget>
        <Modal
          width={1198}
          bodyStyle={{ height: 'calc(100vh - 66px)', padding: '4px' }}
          style={{ top: 42 }}
          visible={ modalView }
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
  setModalView:( modalView, widget_id) => dispatch(actions.setModalView(modalView, widget_id)),
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
