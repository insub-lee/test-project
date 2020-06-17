import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Icon } from 'antd';
import { ExportOutlined } from '@ant-design/icons';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import DragAntdModal from 'components/DragAntdModal';

import ContentView from './ContentView';
import ExternalDist from './ExternalDist';

const AntdTable = StyledAntdTable(Table);

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
  };

  onTitleClick = record => {
    this.setState({ isShow: true, taskSeq: record.TASK_SEQ, recvId: record.RECV_ID, workSeq: record.WORK_SEQ, pubDocInfo: record });
  };

  onDataBind = () => {
    const { result } = this.props;
    const pubDocList = result.list && result.list.pubDocList;
    this.setState({ pubDocList: pubDocList.map(item => ({ ...item, key: item.TASK_SEQ })) });
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
      };
    });
  };

  onClickExternalDist = () => {
    if (this.state.selectedRowKeys.length > 0) {
      this.setState({ isExternalDistShow: true });
    } else {
      message.info(<MessageContent>외부배포할 문서를 선택해주세요.</MessageContent>);
    }
  };

  onExternalDistCancel = () => {
    this.setState({ isExternalDistShow: false });
  };

  onExternalDistComplete = () => {
    this.setState({
      isExternalDistShow: false,
      selectedRowKeys: [],
    });
    message.success(<MessageContent>외부배포에 성공하였습니다.</MessageContent>);
  };

  render() {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <>
        <DragAntdModal
          width={700}
          visible={this.state.isShow}
          onCancel={this.onCancel}
          destroyOnClose
          footer={[<StyledButton className="btn-light btn-sm" onClick={this.onCancel}>취소</StyledButton>]}
        >
          <ContentView workSeq={this.state.workSeq} taskSeq={this.state.taskSeq} pubDocInfo={this.state.pubDocInfo} />
        </DragAntdModal>
        <DragAntdModal
          width={1000}
          visible={this.state.isExternalDistShow}
          title="외부배포"
          onCancel={this.onExternalDistCancel}
          destroyOnClose
          footer={null}
        >
          <ExternalDist
            docList={this.state.selectedPubDocList}
            onExternalDistComplete={this.onExternalDistComplete}
            onExternalDistCancel={this.onExternalDistCancel}
          />
        </DragAntdModal>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 접수/배포 완료함
            </p>
            <div className="btnPositonMid">
              <StyledButton className="btn-primary btn-sm" onClick={this.onClickExternalDist}>
                <ExportOutlined /> 외부배포
              </StyledButton>
            </div>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <AntdTable rowSelection={rowSelection} dataSource={this.state.pubDocList} columns={this.columns} />
        </StyledContentsWrapper>
      </>
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
