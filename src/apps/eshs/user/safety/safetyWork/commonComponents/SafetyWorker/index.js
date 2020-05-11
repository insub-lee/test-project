import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Select } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledButton from 'commonStyled/Buttons/StyledButton';
const AntdTable = StyledLineTable(Table);
const AntdSelect = StyledSelect(Select);
const { Option } = Select;

class SafetyWorker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { workerList, handleWorkerPosition, workerRemove } = this.props;
    const columns = [
      {
        title: '삭제',
        dataIndex: 'WORKER_SEQ',
        width: '10%',
        align: 'center',
        render: (value, record, index) => (
          <StyledButton className="btn-primary btn-xxs btn-first" onClick={() => workerRemove(index)}>
            작업자 제외
          </StyledButton>
        ),
      },
      {
        title: '성명',
        dataIndex: 'WORKER_NM',
        width: '15%',
        align: 'center',
      },
      {
        title: '생년월일',
        dataIndex: 'WORKER_SSN',
        width: '15%',
        align: 'center',
        render: value => <span>{value.substr(0, 6)}</span>,
      },
      {
        title: '직책',
        dataIndex: 'POSITION',
        width: '10%',
        align: 'center',
        render: (value, record, index) => (
          <AntdSelect className="select-xs" style={{ width: '100px' }} value={value} onChange={e => handleWorkerPosition(index, e)}>
            <Option value="작업자">작업자</Option>
            <Option value="감독자">감독자</Option>
          </AntdSelect>
        ),
      },
      {
        title: '핸드폰(연락처)',
        dataIndex: 'M_TEL',
        width: '20%',
        align: 'center',
      },
      {
        title: '긴급연락처',
        dataIndex: 'TEL',
        width: '20%',
        align: 'center',
      },
      {
        title: '교육이수',
        dataIndex: 'EDU_CHECK',
        width: '10%',
        align: 'center',
        render: value => {
          if (value === -1) return <CloseOutlined style={{ color: '#ff6666' }} />;
          return <CheckOutlined style={{ color: '#71da71' }} />;
        },
      },
    ];

    return (
      <AntdTable
        pagination={false}
        columns={columns}
        dataSource={workerList}
        footer={() => <div style={{ textAlign: 'center' }}>{`총 ${workerList.length === 0 ? 0 : workerList.length} 명`}</div>}
      />
    );
  }
}
SafetyWorker.propTypes = {
  workerList: PropTypes.array,
  handleWorkerPosition: PropTypes.func,
  workerRemove: PropTypes.func,
};

SafetyWorker.defaultProps = {
  workerList: [],
};

export default SafetyWorker;
