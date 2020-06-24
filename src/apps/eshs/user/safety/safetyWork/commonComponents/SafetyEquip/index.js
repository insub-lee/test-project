import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
const AntdTable = StyledAntdTable(Table);

class SafetyWorker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { equipList, equipRemove } = this.props;
    const columns = [
      {
        title: '삭제',
        dataIndex: '',
        width: '10%',
        align: 'center',
        render: (value, record, index) => (
          <StyledButton className="btn-primary btn-xxs btn-first" onClick={() => equipRemove(index)}>
            삭제
          </StyledButton>
        ),
      },
      {
        title: '장비코드',
        dataIndex: 'EGROUP',
        width: '45%',
        align: 'center',
        render: value => <span>{value}</span>,
      },
      {
        title: '장비명',
        dataIndex: 'EQUIP_NM',
        width: '45%',
        align: 'center',
        render: value => <span>{value}</span>,
      },
    ];

    return (
      <AntdTable
        pagination={false}
        columns={columns}
        dataSource={equipList}
        footer={() => <div style={{ textAlign: 'center' }}>{`총 ${equipList.length === 0 ? 0 : equipList.length} 건`}</div>}
      />
    );
  }
}
SafetyWorker.propTypes = {
  equipList: PropTypes.array,
  equipRemove: PropTypes.func,
};

SafetyWorker.defaultProps = {
  equipList: [],
};

export default SafetyWorker;
