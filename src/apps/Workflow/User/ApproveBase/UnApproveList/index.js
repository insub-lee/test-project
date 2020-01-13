import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal } from 'antd';
import moment from 'moment';

import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import StyledButton from 'components/CommonStyled/StyledButton';
import ApproveView from '../ApproveView';
import MdcsAppvView from '../MdcsAppvView';

const AntdTable = StyledAntdTable(Table);

class UnApproveList extends Component {
  componentDidMount() {
    const { getApproveList } = this.props;
    const category = 'unApproval';
    getApproveList({ searchType: category });
    console.debug('didmount');
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.CATE !== prevProps.match.params.CATE) {
      const { getApproveList } = this.props;
      const category = 'unApproval';
      getApproveList({ searchType: category });
    }
    console.debug('didupdate');
  }

  getTableColumns = () => [
    {
      title: 'No',
      dataIndex: 'RNUM',
      key: 'rnum',
      width: '5%',
      align: 'center',
    },
    {
      title: '구분',
      dataIndex: 'APPVGUBUN',
      key: 'APPVGUBUN',
      width: '10%',
      align: 'center',
    },
    {
      title: '유형',
      dataIndex: 'NODETYPE',
      key: 'NODETYPE',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Title',
      dataIndex: 'DRAFT_TITLE',
      key: 'title',
      ellipsis: true,
    },

    {
      title: '기안자',
      dataIndex: 'NAME_KOR',
      key: 'nameKor',
      width: '10%',
      align: 'center',
    },
    {
      title: '기안일',
      dataIndex: 'REG_DTTM',
      key: 'regDttm',
      width: '10%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
  ];

  onRowClick = (record, rowIndex, e) => {
    this.props.setSelectedRow(record);
    this.props.setViewVisible(true);
    console.debug('rowclick');
  };

  onModalClose = () => {
    this.props.setViewVisible(false);
  };

  handleReqApprove = (e, appvStatus) => {
    e.preventDefault();
    this.props.reqApprove(appvStatus);
    this.props.setOpinionVisible(false);
  };

  getApproveButtons = selectedRow => {
    const btnAry = [];
    btnAry.push(
      <StyledButton key="close" className="btn-light" onClick={this.onModalClose}>
        닫기
      </StyledButton>,
    );
    if (selectedRow.APPV_STATUS === 4) {
      btnAry.push(
        <StyledButton key="ok" className="btn-primary" onClick={e => this.handleReqApprove(e, selectedRow.APPV_STATUS)}>
          승인
        </StyledButton>,
      );
    } else {
      btnAry.push(
        <StyledButton key="back" className="btn-gray" onClick={e => this.handleReqApprove(e, 9)}>
          반려
        </StyledButton>,
        <StyledButton key="ok" className="btn-primary" onClick={e => this.handleReqApprove(e, 2)}>
          승인
        </StyledButton>,
      );
    }
    console.debug(btnAry);
    return btnAry;
  };

  render() {
    const { approveList, selectedRow } = this.props;
    return (
      <div>
        <AntdTable
          columns={this.getTableColumns()}
          dataSource={approveList.map(item => ({ ...item, key: `approveList_${item.RNUM}` }))}
          onRow={(record, rowIndex) => ({
            onClick: e => this.onRowClick(record, rowIndex, e),
          })}
          bordered
        />
        <Modal visible={this.props.viewVisible} destroyOnClose onCancel={this.onModalClose} footer={this.getApproveButtons(selectedRow)}>
          <MdcsAppvView {...this.props} />
        </Modal>
      </div>
    );
  }
}

UnApproveList.propTypes = {
  category: PropTypes.string,
  approveList: PropTypes.array,
  getApproveList: PropTypes.func,
  selectedRow: PropTypes.object,
  setSelectedRow: PropTypes.func,
  setViewVisible: PropTypes.func,
};

UnApproveList.defaultProps = {
  category: 'draft',
  approveList: [],
  selectedRow: {},
};

export default UnApproveList;
