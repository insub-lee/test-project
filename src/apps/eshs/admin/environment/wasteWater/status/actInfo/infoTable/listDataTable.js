import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

// Ehs - 용폐수 - 현황 - 처리장별 가동시간 현황
class ActInfoListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { type, listData } = this.props;
    const columns = [
      {
        title: type === 'CLEAN' ? '방지시설' : '배출시설',
        dataIndex: `${type}_NM`,
        key: `${type}_NM`,
        align: 'center',
      },
      {
        title: '일자',
        dataIndex: 'OP_DT',
        key: 'OP_DT',
        align: 'center',
      },
      {
        title: '01',
        dataIndex: 'OP_01',
        key: 'OP_01',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '02',
        dataIndex: 'OP_02',
        key: 'OP_02',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '03',
        dataIndex: 'OP_03',
        key: 'OP_03',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '04',
        dataIndex: 'OP_04',
        key: 'OP_04',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '05',
        dataIndex: 'OP_05',
        key: 'OP_05',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '06',
        dataIndex: 'OP_06',
        key: 'OP_06',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '07',
        dataIndex: 'OP_07',
        key: 'OP_07',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '08',
        dataIndex: 'OP_08',
        key: 'OP_08',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '09',
        dataIndex: 'OP_09',
        key: 'OP_09',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '10',
        dataIndex: 'OP_10',
        key: 'OP_10',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '11',
        dataIndex: 'OP_11',
        key: 'OP_11',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '12',
        dataIndex: 'OP_12',
        key: 'OP_12',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '13',
        dataIndex: 'OP_13',
        key: 'OP_13',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '14',
        dataIndex: 'OP_14',
        key: 'OP_14',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '15',
        dataIndex: 'OP_15',
        key: 'OP_15',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '16',
        dataIndex: 'OP_16',
        key: 'OP_16',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '17',
        dataIndex: 'OP_17',
        key: 'OP_17',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '18',
        dataIndex: 'OP_18',
        key: 'OP_18',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '19',
        dataIndex: 'OP_19',
        key: 'OP_19',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '20',
        dataIndex: 'OP_20',
        key: 'OP_20',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '21',
        dataIndex: 'OP_21',
        key: 'OP_21',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '22',
        dataIndex: 'OP_22',
        key: 'OP_22',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '23',
        dataIndex: 'OP_23',
        key: 'OP_23',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '24',
        dataIndex: 'OP_24',
        key: 'OP_24',
        align: 'center',
        render: data => (data === 'Y' ? <CheckOutlined style={{ color: '#5cd65c' }} /> : <CloseOutlined style={{ color: '#ff4d4d' }} />),
      },
      {
        title: '총 가동시간',
        dataIndex: 'TOTAL_ACT',
        key: 'TOTAL_ACT',
        align: 'center',
      },
    ];

    return <AntdTable pagination={false} columns={columns} dataSource={listData} />;
  }
}

ActInfoListTable.propTypes = {
  type: PropTypes.string,
  listData: PropTypes.array,
};

ActInfoListTable.defaultProps = {
  type: 'CLEAN',
  listData: [],
};

export default ActInfoListTable;
