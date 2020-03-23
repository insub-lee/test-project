import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Modal, Table, Icon } from 'antd';

import StyledModal from 'commonStyled/Modal/StyledModal';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledAntdTable from 'commonStyled/Table/StyledAntdTable';

import OptInput from '../OptInput';
const BzmModal = StyledModal(Modal);
const BzmTable = StyledAntdTable(Table);

class List extends Component {
  state = {
    isRegModal: false,
    actionType: 'I',
  };

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler, apiArys, setFormData, initData } = this.props;
    getCallDataHandler(id, apiArys);
    setFormData(id, initData);
  }

  onRegOption = () => {
    this.setState({
      isRegModal: true,
      actionType: 'I',
    });
  };

  onModalCancel = () => {
    const { sagaKey: id, setFormData, initData } = this.props;
    this.setState({
      isRegModal: false,
    });
    setFormData(id, initData);
  };

  onOptSave = () => {
    const { sagaKey: id, submitHandlerBySaga, formData } = this.props;
    const param = { PARAM: formData };
    submitHandlerBySaga(id, 'POST', '/api/builder/v1/work/optionmeta', param, this.onSaveComplete);
  };

  onOptUpdate = () => {
    const { sagaKey: id, submitHandlerBySaga, formData } = this.props;
    const param = { PARAM: formData };
    submitHandlerBySaga(id, 'PUT', '/api/builder/v1/work/optionmeta', param, this.onSaveComplete);
  };

  onSaveComplete = id => {
    const { getCallDataHandler, apiArys } = this.props;
    getCallDataHandler(id, apiArys);
    this.setState({
      isRegModal: false,
      actionType: 'I',
    });
  };

  onModify = record => {
    const { sagaKey: id, setFormData } = this.props;
    setFormData(id, record);
    this.setState({
      isRegModal: true,
      actionType: 'U',
    });
  };

  columns = [
    {
      title: '옵션 코드',
      dataIndex: 'OPT_CODE',
      key: 'OPT_CODE',
      width: '7%',
      align: 'center',
    },
    {
      title: '옵션명',
      dataIndex: 'OPT_NAME',
      key: 'OPT_NAME',
      width: '25%',
    },
    {
      title: '사용자 조회화면 경로',
      dataIndex: 'OPT_APP_SRC',
      key: 'OPT_APP_SRC',
      width: '20%',
    },
    {
      title: '관리자 설정화면 경로',
      dataIndex: 'OPT_APP_SETTING_SRC',
      key: 'OPT_APP_SETTING_SRC',
      width: '16%',
    },
    {
      title: '옵션사용여부',
      align: 'center',
      dataIndex: 'ISUSED',
      key: 'ISUSED',
      width: '10%',
    },
    {
      title: '등록일',
      align: 'center',
      dataIndex: 'REG_DTTM',
      key: 'REG_DTTM',
      width: '10%',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: '자세히 / 수정',
      align: 'center',
      dataIndex: 'COMP_POOL_IDX',
      key: 'COMP_POOL_IDX',
      width: '15%',
      render: (text, record) => (
        <div className="compPool_btn_group" style={{ textAlign: 'center' }}>
          <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.onModify(record)}>
            <Icon type="edit" />
          </StyledButton>
        </div>
      ),
    },
  ];

  render() {
    const { result } = this.props;
    return (
      <div style={{ margin: '10px' }}>
        <StyledButton style={{ textAlign: 'right' }} onClick={() => this.onRegOption()}>
          옵션등록
        </StyledButton>
        <BzmTable rowKey="OPT_SEQ" pagination={false} columns={this.columns} dataSource={result.workOptMataList && result.workOptMataList.list}></BzmTable>
        <BzmModal
          width={700}
          visible={this.state.isRegModal}
          onCancel={this.onModalCancel}
          onOk={() => (this.state.actionType === 'I' ? this.onOptSave() : this.onOptUpdate())}
          destroyOnClose
        >
          <OptInput actionType={this.state.actionType} {...this.props}></OptInput>
        </BzmModal>
      </div>
    );
  }
}

List.propTypes = {
  getCallDataHandler: PropTypes.func,
  sagaKey: PropTypes.string,
  apiArys: PropTypes.array,
  result: PropTypes.object,
  setFormData: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  formData: PropTypes.object,
  initData: PropTypes.object,
};

List.defaultProps = {
  apiArys: [
    {
      key: 'workOptMataList',
      url: '/api/builder/v1/work/optionmeta',
      type: 'GET',
      params: {},
    },
  ],
  getCallDataHandler: () => false,
  result: {},
  initData: {
    OPT_SEQ: -1,
    OPT_CODE: undefined,
    OPT_NAME: '',
    OPT_APP_SRC: '',
    OPT_APP_SETTING_SRC: '',
    OPT_APP_CONFIG: '',
    ISUSED: '',
  },
};

export default List;
