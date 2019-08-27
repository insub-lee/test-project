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
      widge_id: this.props.item.WIDGET_ID,
      selectedMualIdx: undefined,
      selectedCategory: this.props.item.data.selectedCategory,
      totalList: [],
      updateList: [],
      newList: [],
    }
  }

  modalID = undefined;

  handleClick = mualIdx => {
    const { setModalIdx } = this.props;
    this.setState({
      selectedMualIdx: mualIdx,
    }, () => this.showModal()  )
    //setModalIdx(mualIdx);
  };

  showModal = () => {
    const { setModalView } = this.props;
    setModalView(true);
  };
  
  handleCloseModal = () => {
    const { setModalView, setModalIdx } = this.props;
    setModalIdx(undefined);
    setModalView(false);
  };

  
  
  handlePageReload = () => {
    const { widgetSize, selectedCategory, getNewsFeed } = this.props;
    getNewsFeed(widgetSize, selectedCategory);
  };
  
  componentDidMount() {
    const { getNewsFeed, item, setWidgetConfig, widgetDataList } = this.props;
    let app_id = item.APP_ID;
    let widget_id = item.WIDGET_ID;
    let selectedCategory =  item.data.selectedCategory;

    if (selectedCategory == '' || selectedCategory === undefined || selectedCategory === null ){
      selectedCategory = [];
    }

    setWidgetConfig(app_id, widget_id, selectedCategory);
    getNewsFeed(widget_id, selectedCategory);

    
  }

  render() {
    const { handleCloseModal, handleClick, handlePageReload } = this;
    const { selectedMualIdx, totalList, updateList, newList } = this.state
    const { widgetDataList } = this.props;
    console.log('데이터리스트 확인', widgetDataList);

    let widget_id = Number(this.props.item.WIDGET_ID);
    //const widgetDataFilter = widgetDataList.filter(data => Number(data.widget_id) === widget_id);
    const widgetDataFind = widgetDataList.find( item => Number(item.widget_id) === widget_id);
    console.log('파인드 데이터',widgetDataFind)

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
      <div>
        <StyleWiget className="board" style={{ width: '100%', height: '100%' }}>
              <Tabs defaultActiveKey="total">
                <TabPane tab="전체" key="total">
                  <News dataList={totalList} handleClick={handleClick}/>
                </TabPane>
                <TabPane tab="변경" key="update">
                  <News dataList={updateList} handleClick={handleClick}/>
                </TabPane>
                <TabPane tab="신규" key="new">
                  <News dataList={newList} handleClick={handleClick}/>
                </TabPane>
              </Tabs>
        </StyleWiget>
        <Modal
          width={1154}
          bodyStyle={{ height: 'calc(100vh - 66px)', padding: '4px' }}
          style={{ top: 42 }}
          visible={this.props.modalView}
          footer={null}
          onCancel={() => handleCloseModal()}
          closable={false}
        >
          <CSManualView mualIdx={selectedMualIdx} />
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
  setModalIdx: (modalIdx) => dispatch(actions.setModalIdx(modalIdx)),
  setModalView:( modalView) => dispatch(actions.setModalView(modalView)),
  setWidgetConfig: (app_id, widget_id, selectedCategory) => dispatch(actions.setWidgetConfig(app_id, widget_id, selectedCategory)),
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
