import React, { Component } from 'react';
import { Table } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

class HistoryList extends Component {
  componentDidMount() {
    const { sagaKey, getCallDataHandlerReturnRes, spinningOn, spinningOff, extCompInfo } = this.props;
    const apiInfo = {
      key: 'historyList',
      type: 'POST',
      url: '/api/mdcs/v1/common/externalDistributeMgntHisList',
      params: {
        PARAM: {
          DOCNUMBER: extCompInfo.DOCNUMBER,
          RECV_DEPT_ID: extCompInfo.RECV_DEPT_ID,
        },
      }
    };
    spinningOn();
    getCallDataHandlerReturnRes(sagaKey, apiInfo, () => {
      spinningOff();
    });
  }
  
  columns = [
    {
      title: 'No.',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      align: 'center',
      width: '10%',
    },
    {
      title: 'Rev',
      dataIndex: 'VERSION',
      key: 'VERSION',
      align: 'center',
      width: '5%',

    },
    {
      title: '담당',
      dataIndex: 'USER_TYPE_NAME',
      key: 'USER_TYPE_NAME',
      align: 'center',
      width: '10%',
    },
    {
      title: '사용자(email)',
      dataIndex: 'USER_NAME',
      key: 'USER_NAME',
      render: (text, record) => (
        record.USER_TYPE === 'ccc' ? record.EMAIL : `${text}(${record.EMAIL})`
      )
    },
    {
      title: '업체명',
      dataIndex: 'USER_COMPANY_NAME',
      key: 'USER_COMPANY_NAME',
      align: 'center',
      width: '15%',
    },
    {
      title: 'TYPE',
      dataIndex: 'MODIFY_TYPE_NAME',
      key: 'MODIFY_TYPE_NAME',
      align: 'center',
      width: '5%',
    },
    {
      title: '수정자',
      dataIndex: 'UPD_USER_NAME',
      key: 'UPD_USER_NAME',
      align: 'center',
      width: '7%',
    },
    {
      title: '변경부서',
      dataIndex: 'UPD_DEPT_NAME',
      key: 'UPD_DEPT_NAME',
      align: 'center',
      width: '13%',
    },
    {
      title: '수정일시',
      dataIndex: 'UPD_DTTM',
      key: 'UPD_DTTM',
      align: 'center',
      width: '10%',
    },
  ];

  render() {
    const { result } = this.props;
    return (
      <StyledContentsWrapper>
        <AntdTable
          dataSource={result && result.historyList && result.historyList.list ? result.historyList.list : []}
          columns={this.columns}
          bordered
          pagination={false}
        />
      </StyledContentsWrapper>
    );
  }
}

class History extends Component {
  render() {
    const { formData } = this.props;
    return (
      <BizMicroDevBase sagaKey="extCompHistoryList" component={HistoryList} extCompInfo={formData} />
    );
  }
}

export default History;