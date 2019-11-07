import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Modal, Input, Select } from 'antd';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import BizMicroDevBase from 'components/BizMicroDevBase';
import FlowChart from '../FlowChart';

const AntdTable = StyledAntdTable(Table);
const { Option } = Select;

class ProcessMgr extends Component {
  state = {
    prcId: 1,
    isShow: false,
    actionType: 'I',
  };

  componentDidMount() {
    const { getCallDataHanlder, apiArray, id } = this.props;
    getCallDataHanlder(id, apiArray);
  }

  onTitleClick = record => {
    const { getCallDataHanlder, apiArray, id } = this.props;
    this.setState({
      prcId: record.PRC_ID,
      isShow: true,
    });

    const designInfo = {
      key: 'designInfo',
      url: '/api/workflow/v1/common/process/getprocessdesign',
      type: 'POST',
      params: { PARAM: { PRC_ID: record.PRC_ID } },
    };
    let isSave = true;
    for (let i = 0; i < apiArray.length; i++) {
      if (apiArray[i].key === designInfo.key) {
        apiArray[i] = designInfo;
        isSave = false;
        break;
      }
    }
    if (isSave) {
      apiArray.push(designInfo);
    }
    getCallDataHanlder(id, apiArray);
  };

  onSaveComplete = fid => {
    const { getCallDataHanlder, apiArray } = this.props;
    getCallDataHanlder(fid, apiArray);
  };

  onFlowChartSave = (id, result) => {
    const { submitHadnlerBySaga } = this.props;

    const submitData = {
      PARAM: {
        PRC_ID: this.state.prcId,
        FLOWCHART_INFO: result.FLOWCHART_INFO,
        DESIGN_DATA: result.DESIGN_DATA,
      },
    };
    console.debug('submitData', id, submitData, this.props);
    submitHadnlerBySaga(id, 'POST', '/api/workflow/v1/common/workprocess/AddDefaultPrcRuleHandler', submitData, this.onSaveComplete);
  };

  onReRender = () => {
    const { getCallDataHanlder, apiArray, id } = this.props;
    getCallDataHanlder(id, apiArray);
  };

  onUpdate = prcId => {
    const { getCallDataHanlder, apiArray, id } = this.props;
    const processInfo = {
      key: 'processInfo',
      url: `/api/workflow/v1/common/getWorkflowProcesHandler/${prcId}`,
      type: 'GET',
    };
    apiArray.push(processInfo);
    getCallDataHanlder(id, apiArray);
    this.setState({
      actionType: 'M',
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
    {
      title: '수정/삭제',
      dataIndex: 'config',
      key: 'config',
      align: 'center',
      render: (text, record) => {
        return (
          <div>
            {/* <Button onClick={() => this.onUpdate(record.PRC_ID)}>수정</Button> */}
            <Button>삭제</Button>
          </div>
        );
      },
    },
  ];

  onRefresh = () => {
    const { getCallDataHanlder, apiArray, id } = this.props;
    getCallDataHanlder(id, apiArray);
  };

  render() {
    const { result } = this.props;
    console.debug('props!!', this.props);
    const prcList = result && result.prcList && result.prcList.processList;
    return (
      <div>
        <div>프로세스 관리</div>
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
          <FlowChart id="processMgr" onFlowChartSave={this.onFlowChartSave} result={result}></FlowChart>
        </Modal>
      </div>
    );
  }
}

ProcessMgr.propTypes = {
  apiArray: PropTypes.array,
};

ProcessMgr.defaultProps = {
  apiArray: [
    { key: 'prcList', url: '/api/workflow/v1/common/process', type: 'GET' },
    { key: 'nodeList', url: `/api/workflow/v1/common/nodeList`, type: 'POST' },
  ],
};

const ProcessMgrPageBase = () => <BizMicroDevBase id="processMgr" component={ProcessMgr}></BizMicroDevBase>;

export default ProcessMgrPageBase;
