import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

// Chemical Fab List Table
class UseInfoListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { listData, handleModal } = this.props;
    const columns = [
      {
        title: 'KEY-NO',
        dataIndex: 'FAB_KEYNO',
        align: 'center',
        width: '33%',
      },
      {
        title: '사용공정',
        dataIndex: 'FAB_PROC',
        align: 'center',
        width: '33%',
      },
      {
        title: '장비위치',
        dataIndex: 'FAB_AREA',
        align: 'center',
        width: '33%',
      },
    ];
    return (
      <AntdTable
        pagination={false}
        columns={columns}
        dataSource={listData}
        onRow={record => ({
          onClick: () => handleModal('MODIFY', true, record),
        })}
      />
    );
  }
}

UseInfoListTable.propTypes = {
  listData: PropTypes.array,
  handleModal: PropTypes.func,
};

UseInfoListTable.defaultProps = {
  listData: [],
  handleModal: () => false,
};

export default UseInfoListTable;
