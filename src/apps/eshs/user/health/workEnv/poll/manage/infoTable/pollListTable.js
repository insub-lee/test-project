import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

// 설문조사 리스트 테이블
class PollListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { listData, handleModal } = this.props;
    const columns = [
      {
        title: '연도',
        key: 'POYEAR',
        dataIndex: 'POYEAR',
        align: 'center',
      },
      {
        title: '설문 구분',
        key: 'POTYPE',
        dataIndex: 'POTYPE',
        align: 'center',
      },
      {
        title: '설문 일정',
        key: 'POLL_',
        align: 'center',
        render: (data, record) => `${record.SDATE} / ${record.EDATE}`,
      },
      {
        title: '상태',
        key: 'STATUS',
        align: 'center',
        render: (data, record) => {
          const { SDATE, EDATE } = record;
          const now = moment();
          const sDate = SDATE && moment(SDATE, 'YYYY-MM-DD');
          const eDate = (EDATE && moment(EDATE, 'YYYY-MM-DD')) || undefined;
          const status = now >= sDate && (eDate ? now <= eDate : true);
          if (status) {
            return '진행중';
          }
          return '종료';
        },
      },
      {
        title: '응답 현황',
        key: 'RESPONDENTS',
        dataIndex: 'RESPONDENTS',
        align: 'center',
        render: data => `응답 ${data}명`,
      },
    ];

    return <AntdTable pagination={false} columns={columns} dataSource={listData} />;
  }
}

PollListTable.propTypes = {
  listData: PropTypes.array,
  handleModal: PropTypes.func,
};

PollListTable.defaultProps = {
  listData: [],
  handleModal: () => false,
};

export default PollListTable;
