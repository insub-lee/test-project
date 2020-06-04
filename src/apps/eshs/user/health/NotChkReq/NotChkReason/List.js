import React, { Component } from 'react';
import { Table } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

import moment from 'moment';

const AntdTable = StyledAntdTable(Table)

class List extends Component {
  componentDidMount() {
    const { sagaKey, getCallDataHandlerReturnRes, spinningOn, spinningOff, selectedRow } = this.props;
    const apiInfo = {
      key: 'nChkReasonList',
      url: `/api/eshs/v1/common/health/healthNChkReason?CHK_CD=${selectedRow.CHK_CD}`,
      type: 'GET',
    }
    spinningOn();
    getCallDataHandlerReturnRes(sagaKey, apiInfo, (id, res) => {
      spinningOff();
    });
  };

  columns= [
    {
      title: '구분',
      dataIndex: 'REASON_GUBUN',
      key: 'REASON_GUBUN',
      width: '12%',
      align: 'center',
    },
    {
      title: '횟수',
      dataIndex: 'SEQ',
      key: 'SEQ',
      width: '7%',
      align: 'center',
      render: text => `${text}회`,
    },
    {
      title: '신청일자',
      dataIndex: 'OCCURE_DT',
      key: 'OCCURE_DT',
      width: '12%',
      align: 'center',
      render: text => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: '신청자사번',
      dataIndex: 'REQUEST_EMP_NO',
      key: 'REQUEST_EMP_NO',
      width: '12%',
      align: 'center',
    },
    {
      title: '상태',
      dataIndex: 'STATUS',
      key: 'STATUS',
      width: '10%',
      align: 'center',
    },
    {
      title: '상세사유',
      dataIndex: 'REASON_DETAIL',
      key: 'REASON_DETAIL',
      width: '25%',
    },
    {
      title: '처리내용',
      dataIndex: 'MANAGE_CONTENT',
      key: 'MANAGE_CONTENT',
    },
  ];

  render() {
    const { result } = this.props;

    return (
      <StyledContentsWrapper>
        <AntdTable
          columns={this.columns}
          dataSource={result && result.nChkReasonList && result.nChkReasonList.list ? result.nChkReasonList.list.map(item => ({ ...item, key: `${item.CHK_CD}_${item.SEQ}`})) : []}
          bordered
          pagination={false}
        />
      </StyledContentsWrapper>
    );
  }
}

export default List;