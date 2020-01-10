import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StyledAntdTable from 'commonStyled/Table/StyledAntdTable';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledModal from 'commonStyled/Modal/StyledModal';

import { Button, Modal, Table, Icon } from 'antd';
import BizMicroDevBase from 'components/BizMicroDevBase/index';
import SysFieldInput from './SysFieldInput';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledModal(Modal);

class WorkBuilderSysFieldMgr extends Component {
  state = {
    actionType: 'I',
    isWriteMode: false,
  };

  componentDidMount() {
    const { getCallDataHanlder, sagaKey: id, apiArray, initData, setFormData } = this.props;
    getCallDataHanlder(id, apiArray);
    setFormData(id, initData);
  }

  onWrite = () => {
    this.setState({
      actionType: 'I',
      isWriteMode: true,
    });
  };

  onSaveDo = () => {
    const { sagaKey: id, submitHadnlerBySaga, formData } = this.props;
    const param = {
      PARAM: formData,
    };
    console.debug(param);
    submitHadnlerBySaga(id, 'POST', '/api/builder/v1/work/sysmeta', param, this.onSaveComplete);
    this.setState({
      actionType: 'I',
      isWriteMode: false,
    });
  };

  onCancel = () => {
    const { sagaKey: id, removeStorageReduxState, initData, setFormData } = this.props;
    this.setState({
      isWriteMode: false,
    });
    removeStorageReduxState(id, 'formData');
    setFormData(id, initData);
  };

  onSaveComplete = rid => {
    const { getCallDataHanlder, sagaKey: id, apiArray, removeStorageReduxState, initData, setFormData } = this.props;
    getCallDataHanlder(id, apiArray);
    removeStorageReduxState(id, 'formData');
    setFormData(id, initData);
  };

  onModify = record => {
    const { sagaKey: id, setFormData } = this.props;
    setFormData(id, record);
    this.setState({
      actionType: 'U',
      isWriteMode: true,
    });
  };

  onModifyDo = () => {
    const { sagaKey: id, submitHadnlerBySaga, formData } = this.props;
    const param = {
      PARAM: formData,
    };
    submitHadnlerBySaga(id, 'PUT', '/api/builder/v1/work/sysmeta', param, this.onSaveComplete);
    this.setState({
      actionType: 'I',
      isWriteMode: false,
    });
  };

  onDBApply = record => {
    const { sagaKey: id, submitHadnlerBySaga } = this.props;
    const param = {
      PARAM: record,
    };
    submitHadnlerBySaga(id, 'POST', '/api/builder/v1/worksys/create', param, this.onComplete);
  };

  onComplete = id => {
    const { getCallDataHanlder, apiArray } = this.props;
    getCallDataHanlder(id, apiArray);
  };

  columns = [
    {
      title: 'KEY',
      dataIndex: 'META_SEQ',
      key: 'META_SEQ',
      width: '5%',
    },
    {
      title: '필드명(KOR)',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      width: '15%',
    },
    {
      title: '필드명(물리)',
      dataIndex: 'COMP_FIELD',
      key: 'COMP_FIELD',
      width: '15%',
    },
    {
      title: '데이터타입(DB)',
      dataIndex: 'COMP_TYPE',
      key: 'COMP_TYPE',
      width: '10%',
    },
    {
      title: '사이즈',
      dataIndex: 'COMP_SIZE',
      key: 'CONFIG',
      width: '10%',
      render: (text, record) => record.CONFIG.info.size,
    },
    {
      title: 'TAG명',
      dataIndex: 'COMP_TAG',
      key: 'COMP_TAG',
      width: '15%',
    },
    {
      title: '등록일',
      dataIndex: 'REG_DTTM',
      key: 'REG_DTTM',
      width: '10%',
    },
    {
      title: '수정',
      align: 'center',
      dataIndex: 'COMP_POOL_IDX',
      key: 'COMP_POOL_IDX',
      width: '30%',
      render: (text, record) => (
        <div className="compPool_btn_group" style={{ textAlign: 'center' }}>
          <Button className="btn-primary btn-first btn-sm" onClick={() => this.onModify(record)}>
            <Icon type="edit" />
          </Button>
          {record && record.fieldInfo && record.fieldInfo.sysFields.findIndex(row => row.COLUMN_NAME === record.COMP_FIELD) === -1 ? (
            <Button className="btn-primary btn-first btn-sm" onClick={() => this.onDBApply(record)}>
              <Icon type="edit" /> DB 컬럼생성하기
            </Button>
          ) : (
            ''
          )}
        </div>
      ),
    },
  ];

  render() {
    const { result } = this.props;
    const dataSource = result && result.sysWorkMeta && result.sysWorkMeta.list.map(item => ({ ...item, fieldInfo: result.sysFieldInfo }));

    return (
      <div>
        <StyledButtonWrapper className="btn-wrap-right">
          <StyledButton className="btn-primary" onClick={this.onWrite}>
            등록하기
          </StyledButton>
        </StyledButtonWrapper>
        <AntdTable
          rowKey="META_SEQ"
          columns={this.columns}
          dataSource={dataSource}
          expandedRowRender={record => (
            <div>
              <div style={{ paddingBottom: '13px' }}>
                필드명(ENG) : {record.NAME_ENG}
                필드명(CHN) : {record.NAME_CHN}
                필드명(JPN) : {record.NAME_JPN}
                필드명(ETC) : {record.NAME_ETC}
              </div>
              <div style={{ paddingBottom: '13px' }}>Config : {JSON.stringify(record.CONFIG)}</div>
            </div>
          )}
          pagination={false}
        ></AntdTable>
        <AntdModal
          width="70%"
          visible={this.state.isWriteMode}
          onCancel={this.onCancel}
          footer={[
            <StyledButton className="btn-light btn-first" key="modify" onClick={this.onCancel}>
              취소
            </StyledButton>,
            <StyledButton className="btn-primary" key="modify" onClick={this.onSaveDo} style={{ display: this.state.actionType === 'I' ? 'inline' : 'none' }}>
              등록
            </StyledButton>,
            <StyledButton className="btn-primary" key="modify" onClick={this.onModifyDo} style={{ display: this.state.actionType === 'U' ? 'inline' : 'none' }}>
              수정
            </StyledButton>,
          ]}
        >
          <SysFieldInput {...this.props} />
        </AntdModal>
      </div>
    );
  }
}

WorkBuilderSysFieldMgr.propTypes = {
  apiArray: PropTypes.array,
  initConfig: PropTypes.object,
};

WorkBuilderSysFieldMgr.defaultProps = {
  apiArray: [
    { key: 'compPoolData', url: '/api/builder/v1/work/ComponentPool', type: 'GET' },
    { key: 'sysWorkMeta', url: '/api/builder/v1/work/sysmeta', type: 'GET' },
    { key: 'sysFieldInfo', url: '/api/builder/v1/worksys/create', type: 'GET' },
  ],
  initData: {
    NAME_KOR: '',
    NAME_ENG: '',
    NAME_CHN: '',
    NAME_JPN: '',
    NAME_ETC: '',
    DSCR: '',
    STATUS: 0,
    COMP_TYPE: 'FIELD',
    COMP_TAG: '',
    COMP_FIELD: '',
    COMP_POOL_IDX: undefined,
    PRNT_SEQ: -1,
    CONFIG: {
      info: {
        type: '',
        nullable: false,
        defaultValue: '',
        size: -1,
      },
      property: {
        compKey: '',
        COMP_SRC: '',
        COMP_SETTING_SRC: '',
      },
      option: {},
    },
  },
};

const WorkBuilderSysFieldMgrBase = () => <BizMicroDevBase sagaKey="workBuilderSysFieldMgrBase" component={WorkBuilderSysFieldMgr}></BizMicroDevBase>;

export default WorkBuilderSysFieldMgrBase;
