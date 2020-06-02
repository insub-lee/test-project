import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Modal, Button } from 'antd';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import RequesterView from './RequesterView';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);

class RequesterList extends Component {
  state = {
    isShow: false,
    selectedRow: {},
  };

  componentDidMount() {
    this.initList();
  }

  initList = () => {
    const { id, apiAry, getCallDataHandler } = this.props;
    getCallDataHandler(id, apiAry, () => {});
  };

  onClickRow = (record, rowIndex) => {
    this.setState({
      selectedRow: record,
      isShow: true,
    });
  };

  onCancelPopup = () => {
    this.setState({ isShow: false }, () => {
      this.initList();
    });
  };

  columns = [
    {
      title: '요청ID',
      dataIndex: 'REQUEST_ID',
      key: 'REQUEST_ID',
      align: 'center',
      width: '12%',
    },
    {
      title: '요청자명',
      dataIndex: 'REQUESTER_NAME',
      key: 'REQUESTER_NAME',
      align: 'center',
      width: '10%',
    },
    {
      title: '회사명',
      dataIndex: 'COMPANY_NAME',
      key: 'COMPANY_NAME',
      align: 'center',
      width: '20%',
    },

    {
      title: '부서명',
      dataIndex: 'DEPT_NAME',
      key: 'DEPT_NAME',
      align: 'center',
      width: '15%',
    },
    {
      title: '전화번호',
      dataIndex: 'PHONE',
      key: 'PHONE',
      align: 'center',
      width: '10%',
    },
    {
      title: '이메일',
      dataIndex: 'EMAIL',
      key: 'EMAIL',
      align: 'center',
    },
    {
      title: '요청일자',
      dataIndex: 'REG_DATE',
      key: 'REG_DATE',
      align: 'center',
      width: '10%',
    },
  ];

  render() {
    const {
      result: { requesterList },
    } = this.props;
    let list = [];
    if (requesterList && requesterList !== undefined) {
      if (requesterList.list !== undefined) {
        list = requesterList.list;
      }
    }

    return (
      <>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 요청자 승인/삭제
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <AntdTable
            dataSource={list.map(item => ({ ...item, key: `KEY_${item.REQUEST_ID}` }))}
            columns={this.columns}
            onRow={(record, rowIndex) => ({
              onClick: event => {
                this.onClickRow(record, rowIndex);
              },
            })}
          />
        </StyledContentsWrapper>
        <AntdModal
          width={700}
          visible={this.state.isShow}
          title="요청 상세"
          onCancel={this.onCancelPopup}
          destroyOnClose
          footer={null}
          className="modal-table-pad"
        >
          <RequesterView selectedRow={this.state.selectedRow} onCancelPopup={this.onCancelPopup} />
        </AntdModal>
      </>
    );
  }
}

RequesterList.propTypes = {
  id: PropTypes.string,
  apiAry: PropTypes.array,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
};

RequesterList.defaultProps = {
  id: 'requesterList',
  apiAry: [
    {
      key: 'requesterList',
      url: '/api/edds/v1/common/requesterList',
      type: 'POST',
      params: {},
    },
  ],
  result: {
    requesterList: {
      list: [],
    },
  },
  getCallDataHandler: () => {},
};

export default RequesterList;
