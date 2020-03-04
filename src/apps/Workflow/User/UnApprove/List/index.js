import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Icon } from 'antd';
import moment from 'moment';

import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import StyledModalWrapper from 'components/CommonStyled/StyledModalWrapper';

import ApproveView from 'apps/Workflow/components/ApproveBase/viewComponent/ApproveView';
import MdcsAppvView from 'apps/Workflow/components/ApproveBase/viewComponent/MdcsAppvView';

const AntdTable = StyledAntdTable(Table);
const ModalWrapper = StyledModalWrapper(Modal);

class UnApproveList extends Component {
  componentDidMount() {
    this.props.getUnApproveList();
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
  };

  render() {
    const { unApproveList, selectedRow } = this.props;
    console.debug(this.props);
    return (
      <div>
        <div style={{ marginBottom: '10px' }}>
          <p style={{ fontSize: '22px', fontWeight: '500', color: '#000' }}>
            <Icon type="form" /> 미결함
          </p>
        </div>
        <AntdTable
          columns={this.getTableColumns()}
          dataSource={unApproveList.map(item => ({ ...item, key: `unApproveList_${item.RNUM}` }))}
          onRow={(record, rowIndex) => ({
            onClick: e => this.onRowClick(record, rowIndex, e),
          })}
          bordered
        />
        <ModalWrapper title="표준문서 결재" width={680} visible={this.props.viewVisible} destroyOnClose onCancel={this.onModalClose} footer={[]}>
          <MdcsAppvView {...this.props} />
        </ModalWrapper>
      </div>
    );
  }
}

UnApproveList.propTypes = {
  unApproveList: PropTypes.array,
  getUnApproveList: PropTypes.func,



  selectedRow: PropTypes.object,
  setSelectedRow: PropTypes.func,
  setViewVisible: PropTypes.func,
};

UnApproveList.defaultProps = {
  unApproveList: [],
  getUnApproveList: () => {},


  selectedRow: {},
};

export default UnApproveList;
