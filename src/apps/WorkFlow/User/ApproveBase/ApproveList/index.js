import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';

import ApproveView from '../ApproveView';

const AntdTable = StyledAntdTable(Table);

class ApproveList extends Component {
  componentDidMount() {
    // const { category, getApproveList } = this.props;
    // getApproveList({ searchType: category });
  }

  getTableColumns = () => [
    {
      title: 'No',
      dataIndex: 'RNUM',
      key: 'rnum',
      width: '5%',
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
    },
    {
      title: '기안일',
      dataIndex: 'REG_DTTM',
      key: 'regDttm',
      width: '10%',
    },
  ];

  onRowClick = (record, rowIndex, e) => {
    this.props.setSelectedRow(record);
    this.props.setViewVisible(true);
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
        {Object.keys(selectedRow).length > 0 && <ApproveView {...this.props} />}
      </div>
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
};

export default ApproveList;
