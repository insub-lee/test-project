import React, { Component } from 'react';
import { Table } from 'antd';
import styled from 'styled-components';

import StyledAntdTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';

const StyledCustomTable = tableComp => styled(tableComp)`
  .ant-table .ant-table-content .ant-table-body table .ant-table-tbody > tr > td,
  .ant-table .ant-table-content .ant-table-body table .ant-table-thead > tr > th {
    padding: 8px 4px;
  }
`;

const StyledPre = styled.pre`
  margin-top: 0px;
  margin-bottom: 0px;
  overflow: hidden;
  white-space: pre-wrap;
`;

const AntdTable = StyledCustomTable(StyledAntdTable(Table));

const columns = [
  {
    title: 'Rev.',
    dataIndex: 'VERSION',
    key: 'TASK_SEQ',
    width: '30px',
    align: 'center',
  },
  {
    title: 'Date.',
    dataIndex: 'END_DTTM',
    width: '60px',
    align: 'center',
    // render: text => (text ? text.split(' ')[0] : ''),
  },
  {
    title: 'Short Description(Including the Para./clause)',
    dataIndex: 'COPY_REMARK',
    width: '550px',
    render: text => <StyledPre>{text}</StyledPre>,
  },
];

class MdcsRevisionHistoryListComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  initDataBind = list => {
    this.setState({ list });
  };

  componentDidMount() {
    const { fieldSelectData, CONFIG } = this.props;

    if (fieldSelectData && CONFIG.property.compSelectDataKey && CONFIG.property.compSelectDataKey.length > 0) {
      if (fieldSelectData[CONFIG.property.compSelectDataKey]) {
        const list = fieldSelectData[CONFIG.property.compSelectDataKey];
        this.initDataBind(list);
      }
    }
    // const { sagaKey, submitExtraHandler, formData } = this.props;
    // const url = `/api/mdcs/v1/common/mdcsrevisionListHandler?WORK_SEQ=${formData.WORK_SEQ}&TASK_SEQ=${formData.TASK_SEQ}`;
    // submitExtraHandler(sagaKey, 'GET', url, {}, this.initData);
  }

  render() {
    const { list } = this.state;
    return <AntdTable columns={columns} dataSource={list} pagination={false} />;
  }
}

export default MdcsRevisionHistoryListComp;
