import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Modal, Table, Icon } from 'antd';

import StyledModal from 'commonStyled/Modal/StyledModal';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledAntdTable from 'commonStyled/Table/StyledAntdTable';

import ApiInput from '../ApiInput';
const BzmModal = StyledModal(Modal);
const BzmTable = StyledAntdTable(Table);

class List extends Component {
  state = {
    isRegModal: false,
    actionType: 'I',
  };

  componentDidMount() {
    const { sagaKey, getCallDataHandler, apiArys, setFormData, initData } = this.props;
    getCallDataHandler(sagaKey, apiArys);
    setFormData(sagaKey, initData);
  }

  onRegOption = () => {
    this.setState({
      isRegModal: true,
      actionType: 'I',
    });
  };

  onModalCancel = () => {
    const { sagaKey, setFormData, initData } = this.props;
    this.setState({
      isRegModal: false,
    });
    setFormData(sagaKey, initData);
  };

  onOptSave = () => {
    const { sagaKey, submitHandlerBySaga, formData } = this.props;
    const param = { PARAM: formData };
    submitHandlerBySaga(sagaKey, 'POST', '/api/builder/v1/work/apimaster', param, this.onSaveComplete);
  };

  onOptUpdate = () => {
    const { sagaKey, submitHandlerBySaga, formData } = this.props;
    const param = { PARAM: formData };
    submitHandlerBySaga(sagaKey, 'PUT', '/api/builder/v1/work/apimaster', param, this.onSaveComplete);
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
    const { sagaKey, setFormData } = this.props;
    setFormData(sagaKey, record);
    this.setState({
      isRegModal: true,
      actionType: 'U',
    });
  };

  columns = [
    {
      title: 'API명',
      dataIndex: 'API_NAME',
      key: 'API_NAME',
      width: '25%',
    },
    {
      title: 'API SRC',
      dataIndex: 'API_SRC',
      key: 'API_SRC',
      width: '20%',
    },
    {
      title: '사용여부',
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
      <div>
        <StyledButton style={{ textAlign: 'right' }} onClick={() => this.onRegOption()}>
          API등록
        </StyledButton>
        <BzmTable rowKey="OPT_SEQ" pagination={false} columns={this.columns} dataSource={result.workApiMasterList && result.workApiMasterList.list} />
        <BzmModal
          width={700}
          visible={this.state.isRegModal}
          onCancel={this.onModalCancel}
          onOk={() => (this.state.actionType === 'I' ? this.onOptSave() : this.onOptUpdate())}
          destroyOnClose
        >
          <ApiInput actionType={this.state.actionType} {...this.props} />
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
      key: 'workApiMasterList',
      url: '/api/builder/v1/work/apimaster',
      type: 'GET',
      params: {},
    },
  ],
  getCallDataHandler: () => false,
  result: {},
  initData: {
    OPT_SEQ: -1,
    OPT_NAME: '',
    OPT_APP_SRC: '',
    OPT_APP_SETTING_SRC: '',
    OPT_APP_CONFIG: '',
    ISUSED: '',
  },
};

export default List;
