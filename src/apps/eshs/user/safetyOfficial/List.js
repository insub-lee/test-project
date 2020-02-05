import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Button, Popconfirm } from 'antd';

import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';

import Edit from './Edit';

const AntdTable = StyledAntdTable(Table);
const ButtonGroup = Button.Group;

class List extends Component {
  componentDidMount() {
    const { id, getCallDataHanlder, apiAry, changeFormData } = this.props;
    changeFormData(id, 'actionType', 'I');
    getCallDataHanlder(id, apiAry);
  }

  getTableColumns = () => [
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
      render: (text, record, index) => (
        <ButtonGroup>
          <Button type="primary" icon="edit" onClick={() => this.onUpdateDo(record)} />
          <Popconfirm title="삭제하시겠습니끼?" onConfirm={() => this.onRemoveDo(record)}>
            <Button icon="delete" />
          </Popconfirm>
        </ButtonGroup>
      ),
    },
  ];

  onUpdateDo = record => {
    const { id, setFormData } = this.props;
    const nformData = { ...record, OFFICER_NO: record.OFFICER_NO, KEEPER_NO: record.OFFICER_NO, MANAGER_NO: record.MANAGER_NO, actionType: 'U' };
    setFormData(id, nformData);
  };

  onComplete = id => {
    const { getCallDataHanlder, apiAry } = this.props;
    getCallDataHanlder(id, apiAry);
  };

  onRemoveDo = record => {
    const { id, submitHadnlerBySaga } = this.props;
    const param = { PARAM: { ...record } };
    submitHadnlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsproposalofficer', param, this.onComplete);
  };

  render() {
    const { result } = this.props;
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
      <div style={{ padding: '48px', backgroundColor: 'white' }}>
        <Edit {...this.props}></Edit>
        <AntdTable rowKey={totalData => totalData.SIPA_SEQ} pagination={false} dataSource={totalData} columns={this.getTableColumns()}></AntdTable>
      </div>
    );
  }
}

List.propTypes = {};

List.defaultProps = {
  id: 'eshsSafetyOfficial',
  apiAry: [
    {
      key: 'proposalOfficer',
      url: '/api/eshs/v1/common/eshsproposalofficer',
      type: 'GET',
      params: {},
    },
  ],
  getCallDataHanlder: () => {},
  formData: {},
};

export default List;
