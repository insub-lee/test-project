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
      selectedMualIdx: undefined,
      selectedCategory: this.props.item.data.selectedCategory,
      totalList: [],
      updateList: [],
      newList: [],
    }
  }

  handleClick = (mualIdx) => {
    this.setState({
      selectedMualIdx: mualIdx,
    }, () => this.showModal())
  };

  showModal = () => {
    const { setModalView } = this.props;
    const widget_id = this.props.item.WIDGET_ID;
    setModalView(true, widget_id);
  };
  
  handleCloseModal = () => {
    const { setModalView } = this.props;
    const widget_id = this.props.item.WIDGET_ID;
    this.setState({
      selectedMualIdx: undefined,
    }, () => setModalView(false, widget_id))
  };

  handlePageReload = () => {
    const { widgetSize, selectedCategory, getNewsFeed } = this.props;
    getNewsFeed(widgetSize, selectedCategory);
  };
  
  componentDidMount() {
    const { getNewsFeed, item, setModalView } = this.props;
    let widget_id = item.WIDGET_ID;
    let selectedCategory =  item.data.selectedCategory;

    if (selectedCategory == '' || selectedCategory === undefined || selectedCategory === null ){
      selectedCategory = [];
    }

    setModalView(false, widget_id);
    getNewsFeed(widget_id, selectedCategory);
  }

  componentWillReceiveProps(nextProps) {
    const { widget_id, selectedCategory } = this.state;
    const { getNewsFeed } = this.props;
    const nextSelectedCategory = nextProps.item.data.selectedCategory;
    
    console.log('넥스트 프롬스 바뀌었니?',nextProps.item);
    console.log('스테이트',selectedCategory);
    console.log('넥스트프롬스', nextSelectedCategory);
    if( selectedCategory !== nextSelectedCategory){
      getNewsFeed(widget_id, nextSelectedCategory);
    }
  }

  render() {
    const { handleCloseModal, handleClick, handlePageReload } = this;
    const { selectedMualIdx, totalList, updateList, newList } = this.state
    const { widgetDataList , modalView } = this.props;

    let widget_id = this.props.item.WIDGET_ID;
    const widgetDataFind = widgetDataList.find( item => Number(item.widget_id) === Number(widget_id));

    if(widgetDataFind !== undefined){
      if(totalList !== widgetDataFind.totalList){
        this.setState({
        totalList: widgetDataFind.totalList,
        updateList: widgetDataFind.updateList,
        newList: widgetDataFind.newList,
      })
      }
    }

    return (
      <div id={`newsFeed_${widget_id}`}>
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
          <CSManualView mualIdx={selectedMualIdx} widgetId={widget_id} />
        </Modal>
        </div>
    );
  }
}

NewsFeed.propTypes = {
  widgetDataList: PropTypes.array,
  selectedCategory: PropTypes.array,
  getNewsFeed: PropTypes.func,
  modalView: PropTypes.bool,
  modalIdx: PropTypes.any,
  setModalView: PropTypes.func,
};

NewsFeed.defaultProps = {
  widgetDataList: [],
  selectedCategory: [],
  modalView: false,
  modalIdx: undefined,
  getNewsFeed: () => false,
  setModalView: () => false,
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
