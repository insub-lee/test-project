import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Modal } from 'antd';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import Edit from './Edit';

const AntdModal = StyledAntdModal(Modal);
const AntdTable = StyledAntdTable(Table);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      modalEdit: false,
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler, changeFormData } = this.props;
    changeFormData(id, 'actionType', 'I');
    const apiAry = [
      {
        key: 'proposalOfficer',
        url: '/api/eshs/v1/common/eshsproposalofficer',
        type: 'GET',
        params: {},
      },
    ];
    getCallDataHandler(id, apiAry);
    this.setColumns();
  }

  setColumns = () => {
    const columns = [
      {
        title: '안전책임자 본부명',
        dataIndex: 'OFFICER_M_DEPT_KOR',
        align: 'center',
      },
      {
        title: '안전책임자 부서명',
        dataIndex: 'OFFICER_DEPT_KOR',
        align: 'center',
      },
      {
        title: '안전책임자',
        dataIndex: 'OFFICER_NAME',
        align: 'center',
      },
      {
        title: '안전책임자 번호',
        dataIndex: 'OFFICER_TEL',
        align: 'center',
      },
      {
        title: '안전유지자',
        dataIndex: 'KEEPER_NAME',
        align: 'center',
      },
      {
        title: '안전유지자 번호',
        dataIndex: 'KEEPER_TEL',
        align: 'center',
      },
      {
        title: '보건안전담당자',
        dataIndex: 'MANAGER_NAME',
        align: 'center',
      },
      {
        title: '보건안전담당자 번호',
        dataIndex: 'MANAGER_TEL',
        align: 'center',
      },
      {
        title: '삭제',
        dataIndex: 'delete',
        align: 'center',
      },
    ];
    this.setState({ columns });
  };

  onUpdateDo = record => {
    const { sagaKey: id, setFormData } = this.props;
    const nformData = { ...record, OFFICER_NO: record.OFFICER_NO, KEEPER_NO: record.OFFICER_NO, MANAGER_NO: record.MANAGER_NO, actionType: 'U' };
    setFormData(id, nformData);
    this.onModalChange();
  };

  onComplete = () => {
    const { getCallDataHandler, sagaKey: id } = this.props;
    const apiAry = [
      {
        key: 'proposalOfficer',
        url: '/api/eshs/v1/common/eshsproposalofficer',
        type: 'GET',
        params: {},
      },
    ];
    getCallDataHandler(id, apiAry);
    this.onModalChange();
  };

  onModalChange = () => {
    const { modalEdit } = this.state;
    const { sagaKey: id, setFormData } = this.props;
    if (modalEdit === true) {
      setFormData(id, {});
    }
    this.setState({ modalEdit: !modalEdit });
  };

  render() {
    const { result, sagaKey: id, formData, getCallDataHandler, submitHandlerBySaga, removeStorageReduxState, changeFormData } = this.props;
    const { columns } = this.state;
    let totalData;
    if (result && result.proposalOfficer && result.proposalOfficer.list) {
      totalData = result.proposalOfficer.list.map(item => ({
        ...item,
        OFFICER_NAME: `${item.OFFICER_NAME}(${item.OFFICER_NO})`,
        KEEPER_NAME: `${item.KEEPER_NAME}(${item.KEEPER_NO})`,
        MANAGER_NAME: `${item.MANAGER_NAME}(${item.MANAGER_NO})`,
      }));
    }

    return (
      <>
        <StyledContentsWrapper>
          <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
            <StyledButton className="btn-primary btn-sm" onClick={this.onModalChange}>
              추가
            </StyledButton>
          </StyledButtonWrapper>
          <AntdTable
            rowKey={() => totalData.SIPA_SEQ}
            pagination={false}
            dataSource={totalData}
            columns={columns}
            onRow={record => ({
              onClick: () => {
                this.onUpdateDo(record);
              },
            })}
          />
        </StyledContentsWrapper>
        <AntdModal
          className="modal-table-pad"
          title="안전관계자"
          visible={this.state.modalEdit}
          width={600}
          onCancel={this.onModalChange}
          destroyOnClose
          afterClose={this.onReset}
          footer={null}
        >
          <Edit
            sagaKey={id}
            formData={formData}
            getCallDataHandler={getCallDataHandler}
            submitHandlerBySaga={submitHandlerBySaga}
            removeStorageReduxState={removeStorageReduxState}
            changeFormData={changeFormData}
            onComplete={this.onComplete}
          ></Edit>
        </AntdModal>
      </>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  setFormData: PropTypes.func,
  getCallDataHandler: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  removeStorageReduxState: PropTypes.func,
  changeFormData: PropTypes.any,
  result: PropTypes.any,
  formData: PropTypes.any,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;
