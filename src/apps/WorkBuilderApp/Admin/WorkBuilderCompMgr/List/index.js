/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Modal } from 'antd';
import FroalaEditorView from 'components/FormStuff/RichTextEditor/FroalaEditorView';
import Edit from '../Edit';
import StyledButton from '../Styled/StyledButton';
import StyledModalWrapper from '../Styled/StyledModalWrapper';
import CompDetail from './compDetail';
import StyledPool from './StyledPool';

const AntdModal = StyledModalWrapper(Modal);

class List extends Component {
  state = {
    actionType: 'I',
    editVisible: false,
    detailVisible: false,
  };

  componentDidMount() {
    const { getCallDataHanlder, sagaKey: id, apiArys } = this.props;
    getCallDataHanlder(id, apiArys);
  }

  onSaveComplete = () => {
    const { getCallDataHanlder, sagaKey: id, apiArys, removeStorageReduxState } = this.props;
    console.debug(this.props);
    getCallDataHanlder(id, apiArys);
    this.setState({
      actionType: 'I',
      editVisible: false,
      detailVisible: false,
    });
    removeStorageReduxState(id, 'formData');
  };

  onCompSave = () => {
    console.debug('onCompSave!!!!', this.props);
    const { sagaKey: id, submitHadnlerBySaga, formData } = this.props;
    const apiUrl = '/api/builder/v1/work/ComponentPool';
    submitHadnlerBySaga(id, 'POST', apiUrl, formData, this.onSaveComplete);
  };

  onViewSearch = record => {
    const { sagaKey: id, setFormData } = this.props;
    setFormData(id, record);
    this.setState({ detailVisible: true });
  };

  onModify = record => {
    const { sagaKey: id, setFormData } = this.props;
    setFormData(id, record);
    this.setState({ actionType: 'U', editVisible: true });
  };

  onModifySave = () => {
    console.debug('onCompSave!!!!', this.props);
    const { sagaKey: id, submitHadnlerBySaga, formData } = this.props;
    const apiUrl = '/api/builder/v1/work/ComponentPool';
    submitHadnlerBySaga(id, 'PUT', apiUrl, formData, this.onSaveComplete);
  };

  render() {
    const { result, sagaKey: id, removeStorageReduxState } = this.props;

    const columns = [
      {
        title: '컴포넌트 명',
        dataIndex: 'COMP_NAME',
        key: 'COMP_NAME',
        width: '20%',
      },
      {
        title: '컬럼TAG',
        dataIndex: 'COMP_TAG',
        key: 'COMP_TAG',
        width: '10%',
      },
      {
        title: '컬럼형식',
        dataIndex: 'COL_GROUP_NAME',
        key: 'COL_GROUP_NAME',
        width: '10%',
      },
      {
        title: '컬럼 DB타입',
        dataIndex: 'COL_DB_TYPE',
        key: 'COL_DB_TYPE',
        width: '10%',
      },
      {
        title: '컴포넌트 경로',
        dataIndex: 'COMP_SRC',
        key: 'COMP_SRC',
        width: '35%',
      },
      {
        title: '자세히 / 수정',
        align: 'center',
        dataIndex: 'COMP_POOL_IDX',
        key: 'COMP_POOL_IDX',
        width: '15%',
        render: (text, record) => (
          <div className="compPool_btn_group" style={{ textAlign: 'center' }}>
            <StyledButton className="btn-light btn-first btn-sm" onClick={() => this.onViewSearch(record)}>
              <Icon type="plus" />
            </StyledButton>
            <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.onModify(record)}>
              <Icon type="edit" />
            </StyledButton>
          </div>
        ),
      },
    ];

    const compPoolList = result && result.compPoolData && result.compPoolData.compPoolList;

    return (
      <StyledPool>
        <div className="list_top">
          <StyledButton className="btn-primary btn-sm" onClick={() => this.setState({ actionType: 'I', editVisible: true })}>
            <Icon type="plus" /> 컴포넌트추가
          </StyledButton>
        </div>
        {compPoolList && compPoolList.length > 0 && (
          <Table
            rowKey="COMP_POOL_IDX"
            columns={columns}
            dataSource={compPoolList}
            bordered
            expandedRowRender={record => (
              <div>
                <div style={{ paddingBottom: '13px' }}> 컴포넌트 설정경로 : {record.COMP_SETTING_SRC} </div>
                <FroalaEditorView model={record.COMP_DESC} />
              </div>
            )}
            defaultExpandAllRows
            pagination={false}
          />
        )}

        <AntdModal
          className="modalWrapper  modalCustom"
          visible={this.state.editVisible}
          footer={null}
          width={1080}
          onCancel={() => {
            this.setState({ editVisible: false });
            removeStorageReduxState(id, 'formData');
          }}
          destroyOnClose
        >
          <>
            <div className="pop_tit">ComponentPool Editor</div>
            <div className="pop_con">
              <Edit {...this.props} onCompSave={this.onCompSave} onModifySave={this.onModifySave} actionType={this.state.actionType} />
            </div>
          </>
        </AntdModal>
        <AntdModal
          className="modalWrapper  modalCustom"
          visible={this.state.detailVisible}
          footer={null}
          width={1080}
          onCancel={() => {
            this.setState({ detailVisible: false });
          }}
        >
          <>
            <div className="pop_tit">ComponentPool Detail</div>
            <div className="pop_con">
              <CompDetail {...this.props} />
            </div>
          </>
        </AntdModal>
      </StyledPool>
    );
  }
}

List.propTypes = {
  getCallDataHanlder: PropTypes.func,
  sagaKey: PropTypes.string,
  apiArys: PropTypes.array,
  result: PropTypes.object,
  setFormData: PropTypes.func,
  submitHadnlerBySaga: PropTypes.func,
  formData: PropTypes.object,
};

List.defaultProps = {
  sagaKey: 'ComponentPool',
  apiArys: [
    {
      key: 'compPoolData',
      url: '/api/builder/v1/work/ComponentPool',
      type: 'GET',
      params: {},
    },
  ],
  getCallDataHanlder: () => false,
  result: {},
};

export default List;
