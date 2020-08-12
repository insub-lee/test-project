import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Modal, Table, Icon } from 'antd';

import StyledModal from 'commonStyled/Modal/StyledModal';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledAntdTable from 'commonStyled/Table/StyledAntdTable';

import InputModal from '../InputModal';
const BzmModal = StyledModal(Modal);
const BzmTable = StyledAntdTable(Table);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegModal: false,
      actionType: 'I',
      list: [],
      record: {},
    };

    this.onInitDataBind = this.onInitDataBind.bind(this);
  }

  componentDidMount() {
    this.getListData();
  }

  getListData = () => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    submitHandlerBySaga(sagaKey, 'GET', '/api/builder/v1/work/totalBuildereManageHandler', {}, this.onInitDataBind);
  };

  onInitDataBind(id, response) {
    if (response) {
      const { list } = response;
      this.setState({ list });
    }
  }

  onRegOption = () => {
    this.setState({
      isRegModal: true,
      actionType: 'I',
      record: {},
    });
  };

  onModalCancel = () => {
    this.setState({
      isRegModal: false,
      record: {},
    });
  };

  onOptSave = () => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const { record } = this.state;
    const param = { PARAM: record };
    submitHandlerBySaga(sagaKey, 'POST', '/api/builder/v1/work/totalBuildereManageHandler', param, this.onSaveComplete);
  };

  onOptUpdate = () => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const { record } = this.state;
    const param = { PARAM: record };
    submitHandlerBySaga(sagaKey, 'PUT', '/api/builder/v1/work/totalBuildereManageHandler', param, this.onSaveComplete);
  };

  onSaveComplete = () => {
    this.getListData();
    this.setState({
      isRegModal: false,
      actionType: 'I',
    });
  };

  onModify = record => {
    this.setState({
      isRegModal: true,
      actionType: 'U',
      record,
    });
  };

  changeFormData = (key, val) => {
    this.setState(prevState => ({ record: { ...prevState.record, [key]: val } }));
  };

  onRemove = record => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    submitHandlerBySaga(sagaKey, 'DELETE', `/api/builder/v1/work/totalBuildereManageHandler/${record.TOTAL_BUILDER_SEQ}`, {}, this.onSaveComplete);
  };

  columns = [
    {
      title: 'SEQ',
      dataIndex: 'TOTAL_BUILDER_SEQ',
      key: 'TOTAL_BUILDER_SEQ',
      width: '5%',
      align: 'center',
    },
    {
      title: 'ID',
      dataIndex: 'TOTAL_BUILDER_ID',
      width: '30%',
      align: 'center',
    },
    {
      title: '이름',
      dataIndex: 'TOTAL_BUILDER_NAME',
      width: '40%',
    },
    {
      title: '사용여부',
      align: 'center',
      dataIndex: 'ISUSED',
      width: '5%',
    },
    {
      title: '등록일',
      align: 'center',
      dataIndex: 'REG_DTTM',
      width: '10%',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: '자세히 / 수정',
      align: 'center',
      width: '10%',
      render: (text, record) => (
        <div className="compPool_btn_group" style={{ textAlign: 'center' }}>
          <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.onModify(record)}>
            <Icon type="edit" />
          </StyledButton>
          <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.onRemove(record)}>
            <Icon type="remove" />
          </StyledButton>
        </div>
      ),
    },
  ];

  render() {
    const { list, actionType, record } = this.state;
    return (
      <div>
        <StyledButton type="primary" style={{ textAlign: 'right' }} onClick={() => this.onRegOption()}>
          빌더 구분 등록
        </StyledButton>
        <BzmTable rowKey="TOTAL_BUILDER_SEQ" pagination={false} columns={this.columns} dataSource={list} />
        <BzmModal
          width={700}
          visible={this.state.isRegModal}
          onCancel={this.onModalCancel}
          onOk={() => (this.state.actionType === 'I' ? this.onOptSave() : this.onOptUpdate())}
          destroyOnClose
        >
          <InputModal actionType={actionType} formData={record} changeFormData={this.changeFormData} />
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
