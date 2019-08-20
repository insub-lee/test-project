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
      selectedMualIdx: undefined,
    };
  }

  handleClick = data => {
    this.showModal(data);
  };

  showModal = data => {
    const { setModalView } = this.props;
    this.setState({
      selectedMualIdx: data.MUAL_IDX,
    });
    setModalView(true);
  };

  handleCloseModal = () => {
    const { setModalView } = this.props;
    this.setState({
      selectedMualIdx: undefined,
    });
    setModalView(false);
  };

  handlePageReload = () => {
    const { widgetSize, selectedCategory, getNewsFeed } = this.props;
    getNewsFeed(widgetSize, selectedCategory);
  };

  componentDidMount() {
    const { widgetSize, selectedCategory, getNewsFeed } = this.props;
    getNewsFeed(widgetSize, selectedCategory);
  }

  render() {
    const { handleCloseModal, handleClick, handlePageReload } = this;
    const { selectedMualIdx } = this.state;
    return (
      <Fragment>
        <StyleWiget className="board" style={{ width: '100%', height: '100%' }}>
              <Tabs defaultActiveKey="total">

                <TabPane tab="전체" key="total">
                  <News dataList={this.props.totalList} handleClick={handleClick}/>
                </TabPane>

                <TabPane tab="변경" key="update">
                  <News dataList={this.props.updateList} handleClick={handleClick}/>
                </TabPane>

                <TabPane tab="신규" key="new">
                  <News dataList={this.props.newList} handleClick={handleClick}/>
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

      </Fragment>
    );
  }
}

NewsFeed.propTypes = {
  widgetTitle: PropTypes.string,
  selectedCategory: PropTypes.array,
  totalList: PropTypes.array,
  updateList: PropTypes.array,
  newList: PropTypes.array,
  getNewsFeed: PropTypes.func,
  isTitle: PropTypes.bool,
  widgetSize: PropTypes.string,
  widgetColor: PropTypes.string,
  modalView: PropTypes.bool,
  setModalView: PropTypes.func,
};

NewsFeed.defaultProps = {
  widgetTitle: '',
  selectedCategory: [],
  totalList: [],
  updateList: [],
  newList: [],
  isTitle: true,
  widgetSize: '1X1',
  widgetColor: 'white',
  modalView: false,
  getNewsFeed: () => false,
  setModalView: () => false,
};

const mapStateToProps = createStructuredSelector({
  widgetTitle: selectors.selectWidgetTitle(),
  isTitle: selectors.selectUseTitle(),
  widgetSize: selectors.selectWidgetSize(),
  widgetColor: selectors.selectWidgetcolor(),
  totalList: selectors.selectTotalList(),
  updateList: selectors.selectUpdateList(),
  newList: selectors.selectNewList(),
  selectedCategory: selectors.selectWidgetCategory(),
  totalCategory: selectors.selectWidgetTotalCategory(),
  modalView: selectors.selectModalView(),
});

const mapDispatchToProps = dispatch => ({
  getNewsFeed: (widgetSize, selectedCategory) => dispatch(actions.getNewsfeedDataList(widgetSize, selectedCategory)),
  setModalView: modalView => dispatch(actions.setModalView(modalView)),
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
