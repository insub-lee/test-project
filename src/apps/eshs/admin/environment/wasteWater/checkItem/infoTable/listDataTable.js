import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

// Ehs - 용폐수 - 관리 - 수질측정항목
class ListDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { listData, onClickListRow } = this.props;
    const columns = [
      {
        title: '측정항목',
        dataIndex: 'ITEM_NM',
        key: 'ITEM_NM',
        align: 'center',
        width: 100,
      },
      {
        title: '단위',
        dataIndex: 'ITEM_UNIT',
        key: 'ITEM_UNIT',
        align: 'center',
        width: 100,
      },
      {
        title: '사용',
        dataIndex: 'IS_USE',
        key: 'IS_USE',
        align: 'center',
        width: 40,
      },
      {
        title: '측정값종류',
        dataIndex: 'CHECK_VALUE_LIST',
        key: 'CHECK_VALUE_LIST',
        align: 'center',
        width: 150,
      },
      {
        title: '용수',
        align: 'center',
        children: [
          {
            title: '항목',
            dataIndex: 'IS_USE_WATER',
            key: 'IS_USE_WATER',
            align: 'center',
            width: 40,
            render: data => <span>{data === 0 ? '' : 'O'}</span>,
          },
          {
            title: 'Daily',
            dataIndex: 'IS_DAILY',
            key: 'IS_DAILY',
            align: 'center',
            width: 50,
            render: data => <span>{data === 0 ? '' : 'O'}</span>,
          },
          {
            title: 'Impurity',
            dataIndex: 'IS_IMPURITY',
            key: 'IS_IMPURITY',
            align: 'center',
            width: 80,
            render: data => <span>{data === 0 ? '' : 'O'}</span>,
          },
        ],
      },
      {
        title: '폐수',
        align: 'center',
        children: [
          {
            title: '항목',
            dataIndex: 'IS_WASTE_WATER',
            key: 'IS_WASTE_WATER',
            align: 'center',
            width: 40,
            render: data => <span>{data === 0 ? '' : 'O'}</span>,
          },
          {
            title: '폭기조',
            dataIndex: 'IS_POKGIJO',
            key: 'IS_POKGIJO',
            align: 'center',
            width: 50,
            render: data => <span>{data === 0 ? '' : 'O'}</span>,
          },
          {
            title: '유기물',
            dataIndex: 'IS_DERELICT',
            key: 'IS_DERELICT',
            align: 'center',
            width: 50,
            render: data => <span>{data === 0 ? '' : 'O'}</span>,
          },
          {
            title: '상한값',
            dataIndex: 'LAW_SPEC_HIGH',
            key: 'LAW_SPEC_HIGH',
            align: 'center',
            width: 80,
            render: data => <span>{data.toString()}</span>,
          },
          {
            title: '하한값',
            dataIndex: 'LAW_SPEC_LOW',
            key: 'LAW_SPEC_LOW',
            align: 'center',
            width: 80,
            render: data => <span>{data.toString()}</span>,
          },
          {
            title: '기준값',
            dataIndex: 'LAW_SPEC_BASE',
            key: 'LAW_SPEC_BASE',
            align: 'center',
            width: 80,
            render: data => <span>{data.toString()}</span>,
          },
        ],
      },
    ];

    return (
      <AntdTable
        bordered
        pagination={false}
        columns={columns}
        dataSource={listData.toJS()}
        onRow={(record, rowIndex) => ({
          onClick: () => onClickListRow(rowIndex, record),
        })}
      />
    );
  }
}

ListDataTable.propTypes = {
  listData: PropTypes.array,
  onClickListRow: PropTypes.func,
};

ListDataTable.defaultProps = {
  listData: [],
};

export default ListDataTable;
