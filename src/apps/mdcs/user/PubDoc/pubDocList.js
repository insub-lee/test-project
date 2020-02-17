import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Icon, Modal, Button } from 'antd';

import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import StyledModalWrapper from 'commonStyled/Modal/StyledModal';
import ContentView from './ContentView';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledModalWrapper(Modal);

class PubDocList extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    isShow: false,
    pubDocInfo: {},
    pubDocList: [],
    taskSeq: 0,
    workSeq: 0,
  };

  columns = [
    {
      title: '문서종류',
      dataIndex: 'FULLPATH_NM',
      key: 'FULLPATH_NM',
      align: 'center',
      width: '10%',
    },
    {
      title: 'No.',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      align: 'center',
      width: '10%',
    },
    {
      title: 'Rev',
      dataIndex: 'VERSION',
      key: 'VERSION',
      align: 'center',
      width: '10%',
    },
    {
      title: 'Title',
      dataIndex: 'TITLE',
      key: 'TITLE',
      render: (text, record) => <a onClick={() => this.onTitleClick(record)}>{text}</a>,
    },
    {
      title: '배포일',
      dataIndex: 'END_DTTM',
      key: 'END_DTTM',
      width: '10%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
  ];

  onTitleClick = record => {
    this.setState({ isShow: true, taskSeq: record.TASK_SEQ, recvId: record.RECV_ID, workSeq: record.WORK_SEQ, pubDocInfo: record });
  };

  onDataBind = () => {
    const { result } = this.props;
    const pubDocList = result.list && result.list.pubDocList;
    this.setState({ pubDocList });
  };

  componentDidMount() {
    const { getCallDataHandler, sagaKey, apiArys } = this.props;
    getCallDataHandler(sagaKey, apiArys, this.onDataBind);
  }

  onCancel = () => {
    this.setState({ isShow: false });
  };

  onReceltComplete = sagaKey => {
    const { getCallDataHandler, apiArys } = this.props;
    getCallDataHandler(sagaKey, apiArys, this.onDataBind);
    this.setState({ isShow: false });
  };

  onRecept = () => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const param = {
      PARAM: {
        RECV_ID: this.state.recvId,
        STATUS: 1,
      },
    };
    submitHandlerBySaga(sagaKey, 'PUT', '/api/mdcs/v1/common/mdscPubDocListHandler', param, this.onReceltComplete);
  };

  render() {
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <div style={{ marginBottom: '10px' }}>
          <p style={{ fontSize: '22px', fontWeight: '500', color: '#000' }}>
            <Icon type="form" /> 접수/배포 대기함
          </p>
        </div>
        <AntdTable dataSource={this.state.pubDocList} columns={this.columns} />
        <AntdModal
          width={700}
          visible={this.state.isShow}
          onCancel={this.onCancel}
          destroyOnClose
          footer={[
            <Button type="primary" onClick={this.onRecept}>
              접수완료
            </Button>,
            <Button onClick={this.onCancel}>취소</Button>,
          ]}
        >
          <ContentView workSeq={this.state.workSeq} taskSeq={this.state.taskSeq} pubDocInfo={this.state.pubDocInfo} />
        </AntdModal>
      </div>
    );
  }
}

PubDocList.propTypes = {
  apiArys: PropTypes.array,
};

PubDocList.defaultProps = {
  apiArys: [
    {
      key: 'list',
      url: '/api/mdcs/v1/common/mdscPubDocListHandler',
      type: 'POST',
      params: { PARAM: { STATUS: 0 } },
    },
  ],
};

export default PubDocList;
