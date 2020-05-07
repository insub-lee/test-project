import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Modal, Table, Icon } from 'antd';

import StyledModal from 'commonStyled/Modal/StyledModal';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledAntdTable from 'commonStyled/Table/StyledAntdTable';

import Detail from '../Detail';

const AntdModal = StyledModal(Modal);
const AntdTable = StyledAntdTable(Table);


class List extends Component {
  state = {
    actionType: 'I',
    isRegModal: false,
  }

  componentDidMount() {
    const { sagaKey, getCallDataHandler,apiArys, setFormData, initData } = this.props;
    getCallDataHandler(sagaKey, apiArys);
    setFormData(sagaKey, initData);
  }

  onRegModal = () => {
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

  onSave = () => {
    const { sagaKey, submitHandlerBySaga, formData } = this.props;
    const param = { PARAM: formData };
    submitHandlerBySaga(sagaKey, 'POST', '/api/builder/v1/work/dataNode', param, this.onSaveComplete);
  };

  onUpdate = () => {
    const { sagaKey, submitHandlerBySaga, formData } = this.props;
    const param = { PARAM: formData };
    submitHandlerBySaga(sagaKey, 'PUT', '/api/builder/v1/work/dataNode', param, this.onSaveComplete);
  }

  onSaveComplete = id => {
    const { sagaKey, getCallDataHandler, apiArys, setFormData, initData } = this.props;
    getCallDataHandler(id, apiArys);
    this.setState({
      isRegModal: false,
      actionType: 'I',
    });
    setFormData(sagaKey, initData);
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
      title: '데이터노드 ID',
      align: 'center',
      dataIndex: 'DATA_NODE_ID',
      key: 'DATA_NODE_ID',
      width: '10%',
    },
    {
      title: '데이터노드명',
      align: 'center',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      width: '20%',
    },
    {
      title: '데이터노드 클래스',
      dataIndex: 'SERVICE_NAME',
      key: 'SERVICE_NAME',
    },
    {
      title: '등록일',
      align: 'center',
      dataIndex: 'REG_DTTM',
      key: 'REG_DTTM',
      width: '15%',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: '자세히 / 수정',
      align: 'center',
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
        <StyledButton onClick={() => this.onRegModal()}>데이터 노드 등록</StyledButton>
        <AntdTable
         rowKey="DATA_NODE_ID"
         columns={this.columns}
         dataSource={result.dataNodeList && result.dataNodeList.list}
        />
        <AntdModal
          width={700}
          visible={this.state.isRegModal}
          onCancel={this.onModalCancel}
          onOk={() => (this.state.actionType === 'I' ? this.onSave() : this.onUpdate())}
          destroyOnClose
        >
          <Detail actionType={this.state.actionType} {...this.props} />
        </AntdModal>
      </div>
    )
  }
}

List.propTypes = {
  apiArys: PropTypes.object,
  initData:PropTypes.object,
};

List.defaultProps = {
  apiArys: [
    {
      key: 'dataNodeList',
      url: '/api/builder/v1/work/dataNode',
      type: 'GET',
      params: {},
    }
  ],
  initData: {
    DATA_NODE_ID: -1,
    NAME_KOR: '',
    SERVICE_NAME: '',
  },
};

export default List;