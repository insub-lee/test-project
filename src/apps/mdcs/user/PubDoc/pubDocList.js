import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Icon, Modal } from 'antd';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import DragAntdModal from 'components/DragAntdModal';
import ContentView from './ContentView';

const AntdTable = StyledAntdTable(Table);

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
      <>
        <DragAntdModal
          width={700}
          // title="문서상세"
          visible={this.state.isShow}
          onCancel={this.onCancel}
          destroyOnClose
          footer={[
            <StyledButton className="btn-light btn-sm" onClick={this.onCancel}>취소</StyledButton>,
            <StyledButton className="btn-primary btn-sm" onClick={this.onRecept}>접수완료</StyledButton>,
          ]}
        >
          <ContentView workSeq={this.state.workSeq} taskSeq={this.state.taskSeq} pubDocInfo={this.state.pubDocInfo} />
        </DragAntdModal>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 접수/배포 대기함
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <AntdTable dataSource={this.state.pubDocList} columns={this.columns} />
        </StyledContentsWrapper>
      </>
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
