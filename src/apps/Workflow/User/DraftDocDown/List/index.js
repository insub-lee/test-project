import React, { Component } from 'react';
import moment from 'moment';

import { Table, Icon, Modal } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);
class DraftDocDown extends Component {
  constructor(props) {
    super(props);
  }

  getTableColumns = () => [
    {
      title: 'No',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Rev',
      dataIndex: 'VERSION',
      key: 'VERSION',
      width: '6%',
      align: 'center',
    },
    {
      title: '제목',
      dataIndex: 'DRAFT_TITLE',
      key: 'DRAFT_TITLE',
    },
    {
      title: '상태',
      dataIndex: 'STATUS_NM',
      key: 'STATUS_NM',
      width: '16%',
      align: 'center',
    },
    {
      title: '기안자',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      width: '10%',
      align: 'center',
    },
    {
      title: '결재요청일',
      dataIndex: 'REG_DTTM',
      key: 'REG_DTTM',
      width: '10%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
  ];

  componentDidMount() {
    console.debug('this.props', this.props);
    const { id, getCustomDataBind } = this.props;
    const prefixUrl = '/api/workflow/v1/common/approve/DraftDocDownList';
    getCustomDataBind('POST', prefixUrl, { PARAM: { relTypes: [4] } });
  }

  onRowClick = (record, rowIndex, e) => {
    console.debug(record);
  };

  render() {
    const { customDataList } = this.props;
    return (
      <>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 다운로드 신청 목록
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <AntdTable
            columns={this.getTableColumns()}
            dataSource={customDataList}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
          />
        </StyledContentsWrapper>
      </>
    );
  }
}

export default DraftDocDown;
