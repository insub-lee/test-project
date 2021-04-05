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
        width: '6%',
        render: data => data.substring(5),
      },
      {
        title: '작업번호',
        dataIndex: 'WORK_NO',
        width: '9%',
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
        width: '6%',
        align: 'center',
      },
      {
        title: '장소',
        dataIndex: 'WLOC',
        width: '8%',
        align: 'center',
      },
      {
        title: '주작업',
        dataIndex: 'WCATEGORY',
        width: '6%',
        align: 'center',
      },
      // {
      //   title: '시작',
      //   dataIndex: 'FROM_TIME',
      //   align: 'center',
      // },
      // {
      //   title: '종료',
      //   dataIndex: 'TO_TIME',
      //   align: 'center',
      // },
      /* 인쇄시 공란으로 나오도록 현업요청 */
      {
        title: '작업내용',
        dataIndex: 'WORK_DESC',
        align: 'center',
        width: '15%',
      },
      {
        title: '점검시간',
        dataIndex: 'CHECK_TIME_NULL',
        align: 'center',
        width: '8%',
      },
      {
        title: '점검자',
        dataIndex: 'CHECK_EMP_NM_NULL',
        align: 'center',
        width: '8%',
      },
      {
        title: '점검결과',
        dataIndex: 'CHECK_CONTENT_NULL',
        align: 'center',
        width: '15%',
      },
      {
        title: '시작',
        dataIndex: 'START_NULL',
        align: 'center',
        width: '6%',
      },
      {
        title: '종료',
        dataIndex: 'END_NULL',
        align: 'center',
        width: '6%',
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
