import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Modal, Row, Col, Input } from 'antd';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import BizMicroDevBase from 'components/BizMicroDevBase';
import FlowChart from '../FlowChart';

const AntdTable = StyledAntdTable(Table);

class ProcessInput extends Component {
  render() {
    return (
      <div>
        <Row gutter={[16, 16]}>
          <Col span={6}>프로세스명</Col>
          <Col span={6}>
            <Input></Input>
          </Col>
          <Col span={6}>클래스</Col>
          <Col span={6}>
            <Input></Input>
          </Col>
        </Row>
      </div>
    );
  }
}

class ProcessMgr extends Component {
  state = {
    prcId: 1,
    isShow: false,
  };

  componentDidMount() {
    const { getCallDataHanlder, apiArray, id } = this.props;
    getCallDataHanlder(id, apiArray);
  }

  onTitleClick = record => {
    this.setState({
      prcId: record.PRC_ID,
      isShow: true,
    });
  };

  columns = [
    {
      title: 'PRC_ID',
      dataIndex: 'PRC_ID',
      key: 'PRC_ID',
      align: 'center',
    },
    {
      title: '프로세스명',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      render: (text, record) => <a onClick={() => this.onTitleClick(record)}>{record.NAME_KOR}</a>,
    },
    {
      title: 'PROCESS CLASS',
      dataIndex: 'PROCESS_SVRNAME',
      key: 'PROCESS_SVRNAME',
      align: 'center',
    },
  ];

  render() {
    const { result } = this.props;
    console.debug('props!!', this.props);
    const prcList = result && result.prcList && result.prcList.processList;
    return (
      <div>
        <div>프로세스 관리</div>
        <div style={{ padding: '10px' }}>
          <Button onClick={() => this.openWrite()}>프로세스 등록</Button>
        </div>
        <ProcessInput></ProcessInput>
        <AntdTable dataSource={prcList} columns={this.columns}></AntdTable>
        <Modal
          style={{ top: '50px' }}
          visible={this.state.isShow}
          width="90%"
          maskClosable={false}
          onCancel={() => {
            this.setState({ isShow: false });
          }}
          destroyOnClose
          footer={null}
        >
          <FlowChart PRC_ID={this.state.prcId}></FlowChart>
        </Modal>
      </div>
    );
  }
}

ProcessMgr.propTypes = {
  apiArray: PropTypes.array,
};

ProcessMgr.defaultProps = {
  apiArray: [{ key: 'prcList', url: '/api/workflow/v1/common/process', type: 'GET' }],
};

const ProcessMgrPageBase = () => <BizMicroDevBase id="processMgr" component={ProcessMgr}></BizMicroDevBase>;

export default ProcessMgrPageBase;
