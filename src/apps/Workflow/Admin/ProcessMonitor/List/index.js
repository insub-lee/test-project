import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Table } from 'antd';
import { ExclamationCircleFilled, CheckCircleFilled } from '@ant-design/icons';
import moment from 'moment';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledLineTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
const AntdLineTable = StyledLineTable(Table);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const prefixUrl = '/api/workflow/v1/common/process/ProcessMonitorHandler';
    submitHandlerBySaga(sagaKey, 'GET', prefixUrl, {}, this.initData);
  }

  initData = (id, response) => {
    const { list } = response;
    this.setState({ list });
  };

  getTableColumns = () => [
    {
      title: '상태',
      dataIndex: 'STATUS',
      key: 'STATUS',
      width: '5%',
      align: 'center',
      render: (text, record) => {
        const { APPV_MEMBER, quecnt, resultcnt, STEP } = record;
        const jsonAppv = JSON.parse(APPV_MEMBER);
        return jsonAppv.length === Number(quecnt) + Number(resultcnt) && STEP !== 1 ? '정상' : '오류';
      },
    },
    {
      title: 'ID',
      dataIndex: 'DRAFT_ID',
      key: 'DRAFT_ID',
      ellipsis: true,
      width: '7%',
      align: 'center',
    },
    {
      title: '상태',
      dataIndex: 'STATUS',
      key: 'STATUS',
      width: '5%',
      align: 'center',
      render: (text, record) => {
        const { APPV_MEMBER, quecnt, resultcnt, STATUS, STEP } = record;
        const jsonAppv = JSON.parse(APPV_MEMBER);
        return jsonAppv.length !== quecnt + resultcnt || (STEP === 1 && <ExclamationCircleFilled style={{ color: '#eb2f96' }} />);
      },
    },
    {
      title: '단계',
      dataIndex: 'STEP',
      key: 'STEP',
      width: '5%',
      align: 'center',
    },
    {
      title: '결재유형',
      dataIndex: 'NODE_NAME',
      key: 'NODE_NAME',
      width: '10%',
      align: 'center',
    },
    {
      title: '상태메시지',
      dataIndex: 'MESSAGE',
      key: 'MESSAGE',
      width: '24%',
      render: (text, record) => {
        let message = '';
        const { APPV_MEMBER, quecnt, resultcnt, STEP } = record;
        const jsonAppv = JSON.parse(APPV_MEMBER);
        if (jsonAppv.length !== quecnt + resultcnt) {
          message = '결재시 오류 발생 (Queue 데이터 문제)';
        } else if (quecnt === 0 && jsonAppv.length !== resultcnt) {
          message = '다음 심사프로세스 진행 도중 오류 발생';
        } else if (STEP === 1) {
          message = '기안시 오류 발생 (Queue 데이터 문제)';
        }
        return message;
      },
    },
    {
      title: '프로세스 종류',
      dataIndex: 'PRC_NAME',
      key: 'PRC_NAME',
      ellipsis: true,
      width: '10%',
      align: 'center',
    },
    {
      title: '기안제목',
      dataIndex: 'DRAFT_TITLE',
      key: 'DRAFT_TITLE',
      ellipsis: true,
    },
    {
      title: '기안일',
      dataIndex: 'REG_DTTM',
      key: 'REG_DTTM',
      width: '11%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
  ];

  render() {
    const { list } = this.state;
    return (
      <StyledHtmlTable style={{ padding: '20px 20px 0' }}>
        <AntdLineTable
          columns={this.getTableColumns()}
          dataSource={list}
          // onRow={(record, rowIndex) => ({
          //   onClick: e => this.onRowClick(record, rowIndex, e),
          // })}
          bordered
          className="tableWrapper"
        />
      </StyledHtmlTable>
    );
  }
}

export default List;
