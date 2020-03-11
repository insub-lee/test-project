import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Icon, Modal, Button } from 'antd';

import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import StyledModalWrapper from 'commonStyled/Modal/StyledModal';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import ContentView from './ContentView';
import ExternalDist from './ExternalDist';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledModalWrapper(Modal);

class PubCompleteDocList extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    isShow: false,
    pubDocInfo: {},
    pubDocList: [],
    taskSeq: 0,
    workSeq: 0,
    selectedRowKeys: [],
    selectedPubDocList: [],
    isExternalDistShow: false,
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
    {
      title: '확인일',
      dataIndex: 'CONFIRM_DTTM',
      key: 'CONFIRM_DTTM',
      width: '10%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
  ];

  rowSelection = {
    selectedRowKeys: this.state.selectedRowKeys,
    onChange: this.onSelectChange,
  }

  onTitleClick = record => {
    this.setState({ isShow: true, taskSeq: record.TASK_SEQ, recvId: record.RECV_ID, workSeq: record.WORK_SEQ, pubDocInfo: record });
  };

  onDataBind = () => {
    const { result } = this.props;
    const pubDocList = result.list && result.list.pubDocList;
    this.setState({ pubDocList: pubDocList.map(item => ({ ...item, key: item.TASK_SEQ})) });
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

  onSelectChange = selectedRowKeys => {
    this.setState(prevState => {
      const { pubDocList } = prevState;
      return {
        selectedPubDocList: pubDocList.filter(item => selectedRowKeys.includes(item.TASK_SEQ)),
        selectedRowKeys,
      }
    })
  };

  onClickExternalDist = () => {
    if (this.state.selectedRowKeys.length > 0) {
      this.setState({ isExternalDistShow: true });
    } else {
      message.info(<MessageContent>{`외부배포할 문서를 선택해주세요.`}</MessageContent>);
    }
  };

  onExternalDistCancel = () => {
    this.setState({ isExternalDistShow: false });
  }

  onExternalDistComplete = () => {
    this.setState({ 
      isExternalDistShow: false,
      selectedRowKeys: [],
    });
    message.success(<MessageContent>{`외부배포에 성공하였습니다.`}</MessageContent>);
  }

  render() {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
    }

    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white', height: '100%' }}>
        <div style={{ marginBottom: '10px', clear: 'both', overflow: 'hidden', width: '100%' }}>
          <p style={{ fontSize: '22px', fontWeight: '500', color: '#000', paddingBottom: '10px', float: 'left' }}>
            <Icon type="form" /> 접수/배포 완료함
          </p>
          <p style={{ float: 'right', marginTop: '5px' }}>
            <Button icon="export" onClick={this.onClickExternalDist}>외부배포</Button>
          </p>
        </div>
        <AntdTable rowSelection={rowSelection} dataSource={this.state.pubDocList} columns={this.columns} />
        <AntdModal width={700} visible={this.state.isShow} onCancel={this.onCancel} destroyOnClose footer={[<Button onClick={this.onCancel}>취소</Button>]}>
          <ContentView workSeq={this.state.workSeq} taskSeq={this.state.taskSeq} pubDocInfo={this.state.pubDocInfo} />
        </AntdModal>
        <AntdModal
          width={1000} visible={this.state.isExternalDistShow} title="외부배포" onCancel={this.onExternalDistCancel} destroyOnClose footer={[<Button onClick={this.onExternalDistCancel}>취소</Button>]}>
          <ExternalDist docList={this.state.selectedPubDocList} onExternalDistComplete={this.onExternalDistComplete} />
        </AntdModal>
      </div>
    );
  }
}

PubCompleteDocList.propTypes = {
  apiArys: PropTypes.array,
};

PubCompleteDocList.defaultProps = {
  apiArys: [
    {
      key: 'list',
      url: '/api/mdcs/v1/common/mdscPubDocListHandler',
      type: 'POST',
      params: { PARAM: { STATUS: 1 } },
    },
  ],
};

export default PubCompleteDocList;
