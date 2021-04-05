import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import StyledAntdTable from './styledTableForPrint';

const AntdTable = StyledAntdTable(Table);

class PrintCheckStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { listData, searchValues } = this.props;
    const { SDATE, EDATE } = searchValues;
    const columns = [
      {
        title: '작업일',
        dataIndex: 'FROM_DT',
        align: 'center',
        width: '8%',
        render: data => data.substring(5),
      },
      {
        title: '작업번호',
        dataIndex: 'WORK_NO',
        align: 'center',
        width: '9%',
      },
      {
        title: '업체명',
        dataIndex: 'WRK_CMPNY_NM',
        width: '8%',
        align: 'center',
      },
      {
        title: '작업내용',
        dataIndex: 'WORK_DESC',
        align: 'center',
        width: '15%',
      },
      {
        title: '작업인원',
        dataIndex: 'WORKER_CNT',
        align: 'center',
        width: '5%',
        render: data => `${data}명`,
      },
      {
        title: '업체감독자',
        dataIndex: 'CHARGE_WORKER_NM',
        align: 'center',
        width: '8%',
      },
      {
        title: '휴대폰번호',
        dataIndex: 'CHARGE_WORKER_TEL',
        align: 'center',
        width: '12%',
      },
      {
        title: '담당ENG',
        dataIndex: 'REQ_EMP_NM',
        align: 'center',
        width: '8%',
      },
      {
        title: '휴대폰번호',
        dataIndex: 'REG_EMP_TEL',
        align: 'center',
        width: '12%',
      },
      {
        title: '비고',
        dataIndex: 'BIGO_NULL',
        width: '15%',
      },
    ];
    return (
      <>
        <div style={{ marginBottom: '10px' }}>
          <h1>{` 안전작업 점검일지(연락처) (${SDATE}) ~ (${EDATE})`}</h1>
        </div>
        <AntdTable columns={columns} dataSource={listData || []} pagination={false} />
      </>
    );
  }
}

PrintCheckStatus.propTypes = {
  listData: PropTypes.array,
  searchValues: PropTypes.object,
};

PrintCheckStatus.defaultProps = {
  listData: [],
  searchValues: {},
};

export default PrintCheckStatus;
