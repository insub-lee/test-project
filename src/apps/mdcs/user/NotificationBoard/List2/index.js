import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Table, PageHeader, Button, Modal } from 'antd';
import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
    };
  }

  componentDidMount() {
    this.props.getNotificationListBySaga('notificationList', this.props.workSeq);
  }

  onClickPopup = rowitem => {
    console.log(rowitem);
    return <p>{rowitem.regDttm}</p>;
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const columns = [
      {
        title: 'NO',
        dataIndex: 'seq',
        key: 'seq',
      },
      {
        title: '제목',
        dataIndex: 'title',
        key: 'title',
        // render: (text, rowitem) => (
        //   <a role="button" onClick={() => this.onClickPopup(rowitem)}>
        //     {text}
        //   </a>
        // ),
      },
      {
        title: '소속',
        dataIndex: 'dept',
        key: 'dept',
      },
      {
        title: '작성자',
        dataIndex: 'regUserId',
        key: 'regUserId',
      },
      {
        title: '작성일',
        dataIndex: 'regDttm',
        key: 'regDttm',
      },
      {
        title: '조회',
        dataIndex: 'count',
        key: 'count',
      },
    ];

    const { notificationList } = this.props;
    const { visible, loading } = this.state;
    return (
      <div>
        <PageHeader title="알림판" />
        <Button type="primary" onClick={this.showModal}>
          글올리기
        </Button>
        <Modal
          visible={visible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <Table
          rowKey={record => record.taskSeq}
          columns={columns}
          dataSource={notificationList.map((item, index) => ({ ...item, key: index }))}
          bordered
          pagination
        />
      </div>
    );
  }
}

List.propTypes = {
  workSeq: PropTypes.number,
  getNotificationListBySaga: PropTypes.func,
  notificationList: PropTypes.arrayOf(PropTypes.object),
};

List.defaultProps = {
  workSeq: 1064,
  getNotificationListBySaga: () => false,
  notificationList: [],
};

const mapStateToProps = createStructuredSelector({
  notificationList: selectors.makeSelectNotificationList(),
});

const mapDispatchToProps = dispatch => ({
  getNotificationListBySaga: (key, workSeq) => dispatch(actions.getNotificationListBySaga(key, workSeq)),
});

const withReducer = injectReducer({ key: 'apps-mdcs-user-NotificationBoard-reducer', reducer });
const withSaga = injectSaga({ key: 'apps-mdcs-user-NotificationBoard-saga', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withReducer, withConnect)(List);
