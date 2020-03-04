import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Icon } from 'antd';
import moment from 'moment';

import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import StyledModalNofooterLine from 'components/CommonStyled/StyledModalNofooterLine';
import ApproveView from 'apps/Workflow/components/ApproveBase/viewComponent/ApproveView';
import HoldView from 'apps/Workflow/components/ApproveBase/viewComponent/MdcsAppvView/holdview';

const AntdTable = StyledAntdTable(Table);
const ModalWrapper = StyledModalNofooterLine(Modal);
class DraftList extends Component {
  componentDidMount() {
    this.props.getDraftList();
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
      title: '프로세스상태',
      dataIndex: 'STATUS_NM',
      key: 'STATUS_NM',
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
      title: '기안일',
      dataIndex: 'REG_DTTM',
      key: 'regDttm',
      width: '10%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
  ];

  onRowClick = (record, rowIndex, e) => {
    if (record.STATUS === 3) {
      record.PROC_STATUS = 3;
    }
    this.props.setSelectedRow(record);
    this.props.setViewVisible(true);
  };

  render() {
    // const { approveList } = this.props;
    const { draftList } = this.props;

    return (
      <div>
        <div style={{ marginBottom: '10px' }}>
          <p style={{ fontSize: '22px', fontWeight: '500', color: '#000' }}>
            <Icon type="form" /> 기안함
          </p>
        </div>
        <AntdTable
          columns={this.getTableColumns()}
          dataSource={draftList.map(item => ({
            ...item,
            key: `draftList_${item.RNUM}`,
          }))}
          onRow={(record, rowIndex) => ({
            onClick: e => this.onRowClick(record, rowIndex, e),
          })}
          bordered
        />
        <ModalWrapper title="기안함" width={680} visible={this.props.viewVisible} destroyOnClose onCancel={this.onModalClose} footer={[]}>
          <HoldView {...this.props} />
        </ModalWrapper>
      </div>
    );
  }
}

DraftList.propTypes = {
  draftList: PropTypes.array,
  getDraftList: PropTypes.func,
  selectedRow: PropTypes.object,
  setSelectedRow: PropTypes.func,
  setViewVisible: PropTypes.func,
};

DraftList.defaultProps = {
  draftList: [],
  getDraftList: () => {},
  selectedRow: {},
};

export default DraftList;
