import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import magnachipLogo from 'components/ContentsPrint/magnachip_print_logo.png';
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
        width: '12%',
        align: 'center',
      },
      {
        title: '업체명',
        dataIndex: 'WRK_CMPNY_NM',
        align: 'center',
        ellipsis: true,
      },
      {
        title: '작업동',
        dataIndex: 'DGUBUN',
        align: 'center',
      },
      {
        title: '장소',
        dataIndex: 'WLOC',
        ellipsis: true,
        align: 'center',
      },
      {
        title: '주작업',
        dataIndex: 'WCATEGORY',
        ellipsis: true,
        align: 'center',
      },
      {
        title: '작업시간',
        dataIndex: 'TIME',
        width: '10%',
        align: 'center',
      },
      {
        title: '작업내용',
        dataIndex: 'WORK_DESC',
        align: 'center',
        ellipsis: true,
      },
      {
        title: '점검시간',
        dataIndex: '',
        align: 'center',
      },
      {
        title: '점검자',
        dataIndex: 'CHECK_EMP_NM',
        align: 'center',
      },
      {
        title: '점검결과',
        dataIndex: 'CHECK_CONTENT',
        ellipsis: true,
        align: 'center',
      },
    ];
    return (
      <>
        <div style={{ marginBottom: '10px' }}>
          <h1>{` 안전작업 점검일지 (${SDATE}) ~ (${EDATE})`}</h1>
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
