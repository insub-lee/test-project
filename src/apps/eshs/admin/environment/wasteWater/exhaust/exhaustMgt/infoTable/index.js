import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

// Ehs - 용폐수 - 등록 - 배출시설
class ExhaustMgtTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { listData, handleModal } = this.props;
    const columns = [
      {
        title: '코드',
        className: 'EXHAUST_CD',
        dataIndex: 'EXHAUST_CD',
        align: 'center',
        width: '30%',
      },
      {
        title: '배출시설명',
        className: 'EXHAUST_NM',
        dataIndex: 'EXHAUST_NM',
        align: 'center',
        width: '70%',
      },
    ];
    return (
      <AntdTable
        columns={columns}
        dataSource={listData}
        footer={() => <span>{`${(listData && listData.length) || 0} 건`}</span>}
        onRow={record => ({
          onClick: () => {
            handleModal('MOD', true, record);
          },
        })}
      />
    );
  }
}

ExhaustMgtTable.propTypes = {
  listData: PropTypes.array,
  handleModal: PropTypes.func,
};

ExhaustMgtTable.defaultProps = {
  listData: [],
};

export default ExhaustMgtTable;
