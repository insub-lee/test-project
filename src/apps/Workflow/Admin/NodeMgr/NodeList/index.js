import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';

import StyledAntdTable from 'commonStyled/Table/StyledAntdTable';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import { InputSearch } from 'components/FormStuff/Input';

import Styled from './Styled';

import NodeRegist from '../NodeRegist';

const AntdTable = StyledAntdTable(Table);

class NodeList extends Component {
  state = {
    isOpen: false,
    actionType: 'I',
  };

  columns = [
    {
      title: 'No',
      dataIndex: 'RNUM',
      key: 'RNUM',
      width: '5%',
      align: 'center',
    },
    {
      title: '노드명',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
    },
    {
      title: '노드경로',
      dataIndex: 'SRC_PATH',
      key: 'SRC_PATH',
    },
    {
      title: '클래스명',
      dataIndex: 'CLASSNAME',
      key: 'CLASSNAME',
    },
    {
      title: '편집',
      dataIndex: 'edit',
      render: (text, record) => (
        <>
          <Button onClick={() => this.onUpdate(record)}>수정</Button>
        </>
      ),
    },
  ];

  onUpdate = record => {
    const { id, setFormData } = this.props;
    setFormData(id, { ...record });
    this.setState({ isOpen: true, actionType: 'U' });
  };

  componentDidMount() {
    const { id, getCallDataHandler, apiArray } = this.props;
    getCallDataHandler(id, apiArray, () => {});
  }

  onChangeSearchText = e => {
    this.setState({ searchText: e.target.value });
  };

  onSerchNode = () => {
    const payload = {
      searchText: this.state.searchText,
    };
    this.props.getNodeList(payload);
  };

  onRegsite = () => {
    this.setState({ isOpen: true, actionType: 'I' });
  };

  onSaveDo = () => {
    const { id, submitHandlerBySaga, formData } = this.props;
    const submitData = { PARAM: { ...formData } };
    submitHandlerBySaga(id, 'POST', '/api/workflow/v1/common/node/-1', submitData, this.onSaveComplete);
  };

  onUpdateDo = () => {
    const { id, submitHandlerBySaga, formData } = this.props;
    const submitData = { PARAM: { ...formData } };
    const nodeId = formData.NODE_ID;
    submitHandlerBySaga(id, 'PUT', `/api/workflow/v1/common/node/${nodeId}`, submitData, this.onSaveComplete);
  };

  onSaveComplete = () => {
    const { id, getCallDataHandler, apiArray, removeStorageReduxState } = this.props;
    getCallDataHandler(id, apiArray, () => {});
    this.setState({ isOpen: false });
    removeStorageReduxState(id, 'formData');
  };

  onCancel = () => {
    const { id, removeStorageReduxState } = this.props;
    this.setState({ isOpen: false, actionType: 'I' });
    removeStorageReduxState(id, 'formData');
  };

  render() {
    console.debug(this.props);
    const { result } = this.props;
    const { nodeListInfo } = result;
    return (
      <Styled>
        <h3 className="pageTitle">노드 관리</h3>
        <div className="searchBox">
          <div className="searchWrapper">
            <InputSearch placeholder="노드명을 입력해주세요" onChange={e => this.onChangeSearchText(e)} onSearch={this.onSerchNode} />
          </div>
        </div>
        <div>
          <AntdTable
            columns={this.columns}
            dataSource={nodeListInfo && nodeListInfo.nodeList && nodeListInfo.nodeList.map(item => ({ ...item, key: item.NODE_ID }))}
            bordered
            pagination={false}
          />
          <Modal
            title="노드등록"
            width={600}
            visible={this.state.isOpen}
            onOk={this.state.actionType === 'I' ? this.onSaveDo : this.onUpdateDo}
            distoryOnClose
            onCancel={this.onCancel}
          >
            <NodeRegist {...this.props}></NodeRegist>
          </Modal>
        </div>
        <div className="buttonWrapper">
          <StyledButton className="btn-primary" onClick={this.onRegsite}>
            Node추가
          </StyledButton>
        </div>
      </Styled>
    );
  }
}

NodeList.propTypes = {
  apiArray: PropTypes.array,
};

NodeList.defaultProps = {
  apiArray: [{ key: 'nodeListInfo', url: `/api/workflow/v1/common/nodeList`, type: 'POST', PARAM: {} }],
};

export default NodeList;
