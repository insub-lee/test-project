import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Button } from 'antd';

import BizBuilderBase from 'apps/mdcs/components/BizBuilderBase';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';

import Styled from './Styled';

const AntdTable = StyledAntdTable(Table);

export class DistributeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedRow: {},
    };
  }

  componentDidMount() {
    this.getDistributeList();
  }

  getDistributeList = () => {
    const { getCallDataHandler, id } = this.props;
    const apiArr = [
      {
        key: 'distList',
        url: '/api/mdcs/v1/common/distribute/distributeList',
        type: 'POST',
        params: { PARAM: { STATUS: 0 } },
      },
    ];
    getCallDataHandler(id, apiArr);
  };

  handleCloseModal = () => {
    this.setState({
      visible: false,
      selectedRow: {},
    });
  };

  handleReceiptDistribute = () => {
    const { id, submitHandlerBySaga } = this.props;
    const { selectedRow } = this.state;
    const callbackFunc = () => {
      this.handleCloseModal();
      this.getDistributeList();
    };
    const param = {
      DRAFT_ID: selectedRow.DRAFT_ID,
      ACNT_ID: selectedRow.ACNT_ID,
    };
    submitHandlerBySaga(id, 'POST', '/api/mdcs/v1/common/distribute/distributeReceipt', { PARAM: { ...param } }, callbackFunc);
  };

  getColumns = () => [
    { title: '종류', dataIndex: 'FULLPATH_NAME', key: 'FULLPATH_NAME', width: '20%' },
    { title: 'No', dataIndex: 'SP_ID', key: 'SP_ID', width: '7%' },
    { title: 'Rev', dataIndex: 'SP_REV', key: 'SP_REV', width: '3%' },
    { title: 'Title', dataIndex: 'TITLE', key: 'TITLE', ellipsis: true },
    { title: '배포일', dataIndex: 'APPV_COMPLETE_DTTM', key: 'APPV_COMPLETE_DTTM', width: '10%' },
    { title: '확인일', dataIndex: 'CONFIRM_DTTM', key: 'CONFIRM_DTTM', width: '10%' },
  ];

  onRowClick = (record, rowIndex, e) => {
    this.setState({
      visible: true,
      selectedRow: record,
    });
  };

  render() {
    const { result } = this.props;
    const { visible, selectedRow } = this.state;

    return (
      <Styled>
        {result.distList !== undefined && (
          <AntdTable
            columns={this.getColumns()}
            dataSource={result.distList.list.map(item => ({ ...item, key: `distList_${item.TASK_SEQ}` }))}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
          />
        )}
        <Modal
          title={selectedRow.TITLE}
          visible={visible}
          onCancel={this.handleCloseModal}
          width="70%"
          footer={[
            <Button type="default" onClick={this.handleCloseModal}>
              닫기
            </Button>,
            <Button type="primary" onClick={this.handleReceiptDistribute}>
              접수
            </Button>,
          ]}
          destroyOnClose
        >
          <BizBuilderBase
            id={`distModal_${selectedRow.TASK_SEQ}`}
            workSeq={selectedRow.WORK_SEQ}
            taskSeq={selectedRow.TASK_SEQ}
            metaSeq={1451}
            viewType="VIEW"
          />
        </Modal>
      </Styled>
    );
  }
}

DistributeList.propTypes = {
  id: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
  submitHandlerBySaga: PropTypes.func,
};

DistributeList.defaultProps = {
  id: '',
  result: {},
};

export default DistributeList;
