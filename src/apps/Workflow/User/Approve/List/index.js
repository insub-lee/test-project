import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Icon } from 'antd';
import moment from 'moment';

import StyledLineTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
import StyledModalNofooterLine from 'components/CommonStyled/StyledModalNofooterLine';
import HoldView from 'apps/Workflow/components/ApproveBase/viewComponent/MdcsAppvView/holdview';
import ContentsWrapper from 'commonStyled/MdcsStyled/Wrapper/ContentsWrapper';
// import ApproveView from '../ApproveView';
// import HoldView from '../MdcsAppvView/holdview';

const AntdLineTable = StyledLineTable(Table);
const ModalWrapper = StyledModalNofooterLine(Modal);

class ApproveList extends Component {
  componentDidMount() {
    this.props.getApproveList();
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
      title: '결재상태',
      dataIndex: 'APPV_STATUS_NM',
      key: 'APPV_STATUS_NM',
      width: '10%',
      align: 'center',
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
  };

  render() {
    const { approveList, selectedRow } = this.props;

    return (
      <>
        <ContentsWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 기결함
            </p>
          </div>
          <AntdLineTable
            columns={this.getTableColumns()}
            dataSource={approveList.map(item => ({ ...item, key: `approveList_${item.RNUM}` }))}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
          />
        </ContentsWrapper>

        <ModalWrapper title="표준문서 기결함" width={680} visible={this.props.viewVisible} destroyOnClose onCancel={this.onModalClose} footer={[]}>
          <HoldView {...this.props} />
        </ModalWrapper>
      </>
    );
  }
}

ApproveList.propTypes = {
  category: PropTypes.string,
  approveList: PropTypes.array,
  getApproveList: PropTypes.func,
  selectedRow: PropTypes.object,
  setSelectedRow: PropTypes.func,
  setViewVisible: PropTypes.func,
};

ApproveList.defaultProps = {
  category: 'draft',
  approveList: [],
  selectedRow: {},
  getApproveList: () => {},
};

export default ApproveList;
