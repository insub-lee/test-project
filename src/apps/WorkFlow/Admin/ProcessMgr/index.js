import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Modal, Input, Select } from 'antd';
import StyledAntdTable from 'commonStyled/Table/StyledAntdTable';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledModal from 'commonStyled/Modal/StyledModal';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ProcessInput from './ProcessInput';
import FlowChart from '../FlowChart';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledModal(Modal);
const { Option } = Select;

class ProcessMgr extends Component {
  state = {
    prcId: -1,
    isFlowShow: false,
    isInputShow: false,
    actionType: 'I',
    NAME_KOR: '',
    PROCESS_SVRNAME: '',
  };

  componentDidMount() {
    const { getCallDataHanlder, apiArray, id } = this.props;
    getCallDataHanlder(id, apiArray);
  }

  onTitleClick = record => {
    this.setState({
      isInputShow: true,
      actionType: 'U',
      prcId: record.PRC_ID,
      NAME_KOR: record.NAME_KOR,
      PROCESS_SVRNAME: record.PROCESS_SVRNAME,
    });
  };

  onProcessSetting = record => {
    const { getCallDataHanlder, apiArray, id } = this.props;
    this.setState({
      prcId: record.PRC_ID,
      isFlowShow: true,
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
    submitHadnlerBySaga(id, 'POST', '/api/workflow/v1/common/workprocess/AddDefaultPrcRuleHandler', submitData, this.onSaveComplete);
  };

  onReRender = () => {
    const { getCallDataHanlder, apiArray, id } = this.props;
    getCallDataHanlder(id, apiArray);
  };

  onSaveProcess = () => {
    const { submitHadnlerBySaga, id } = this.props;
    const { NAME_KOR, PROCESS_SVRNAME } = this.state;
    const submitData = {
      PARAM: {
        PRC_ID: -1,
        NAME_KOR,
        PROCESS_SVRNAME,
      },
    };
    submitHadnlerBySaga(id, 'POST', '/api/workflow/v1/common/process', submitData, this.onSaveComplete);
    this.setState({
      isInputShow: false,
    });
  };

  onUpdateProcess = () => {
    const { submitHadnlerBySaga, id } = this.props;
    const { NAME_KOR, PROCESS_SVRNAME } = this.state;
    const submitData = {
      PARAM: {
        PRC_ID: this.state.prcId,
        NAME_KOR,
        PROCESS_SVRNAME,
      },
    };
    submitHadnlerBySaga(id, 'PUT', '/api/workflow/v1/common/process', submitData, this.onSaveComplete);
    this.setState({
      isInputShow: false,
    });
  };

  onDeleteProcess = record => {
    const { submitHadnlerBySaga, id } = this.props;

    const submitData = {
      PARAM: {
        PRC_ID: record.PRC_ID,
        NAME_KOR: '',
        PROCESS_SVRNAME: '',
      },
    };

    console.debug('submitData', submitData);

    submitHadnlerBySaga(id, 'POST', '/api/workflow/v1/common/deleteprocess', submitData, this.onSaveComplete);
    this.setState({
      isInputShow: false,
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
      render: (text, record) => (
        <div>
          <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.onProcessSetting(record)}>
            프로세스설정
          </StyledButton>
          <StyledButton className="btn-light btn-sm" onClick={() => this.onDeleteProcess(record)}>
            삭제
          </StyledButton>
        </div>
      ),
    },
  ];

  onRefresh = () => {
    const { getCallDataHanlder, apiArray, id } = this.props;
    getCallDataHanlder(id, apiArray);
  };

  onInputClick = () => {
    this.setState({ prcId: -1, isFlowShow: false, isInputShow: true, actionType: 'I', NAME_KOR: '', PROCESS_SVRNAME: '' });
  };

  onChangeValue = (id, value) => {
    const retObj = {};
    retObj[id] = value;

    this.setState(retObj);
  };

  render() {
    const { result } = this.props;
    console.debug('index state!!', this.state);
    const prcList = result && result.prcList && result.prcList.processList;
    return (
      <div>
        <div>프로세스 관리</div>
        <div style={{ margin: '10px', textAlign: 'right' }}>
          <StyledButton className="btn-primary" onClick={this.onInputClick}>
            프로세스등록
          </StyledButton>
        </div>

        <AntdTable dataSource={prcList} columns={this.columns} rowKey="PRC_ID"></AntdTable>
        <AntdModal
          width="40%"
          style={{ height: '300px' }}
          visible={this.state.isInputShow}
          onCancel={() => {
            this.setState({ isInputShow: false });
          }}
          destroyOnClose
          footer={null}
        >
          <ProcessInput
            processInfo={this.state}
            onUpdateProcess={this.onUpdateProcess}
            onSaveProcess={this.onSaveProcess}
            onChangeValue={this.onChangeValue}
          ></ProcessInput>
        </AntdModal>
        <AntdModal
          style={{ top: '50px' }}
          visible={this.state.isFlowShow}
          width="90%"
          maskClosable={false}
          onCancel={() => {
            this.setState({ isFlowShow: false });
          }}
          destroyOnClose
          footer={null}
        >
          <FlowChart id="processMgr" onFlowChartSave={this.onFlowChartSave} result={result}></FlowChart>
        </AntdModal>
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
