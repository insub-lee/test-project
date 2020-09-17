import React, { Component } from 'react';
import { Table } from 'antd';
import moment from 'moment';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
const AntdTable = StyledAntdTable(Table);

class ProcessView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preViewList: [],
      DOCNUMBER: undefined,
      END_DTTM: undefined,
    };
  }

  getTableColumns = () => [
    {
      title: '구분',
      dataIndex: 'NODE_NAME',
      key: 'NODE_NAME',
      width: '20%',
      align: 'center',
    },
    {
      title: '부서',
      dataIndex: 'APPV_DEPT_NAME',
      key: 'APPV_DEPT_NAME',
      width: '25%',
      ellipsis: true,
    },
    {
      title: '직급',
      dataIndex: 'APPV_PSTN_NAME',
      key: 'APPV_PSTN_NAME',
      width: '13%',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '이름',
      dataIndex: 'APPV_USER_NAME',
      key: 'APPV_USER_NAME',
      width: '13%',
      ellipsis: true,
      align: 'center',
    },
    {
      title: '상태',
      dataIndex: 'APPV_STATUS',
      key: 'APPV_STATUS',
      width: '11%',
      align: 'center',
      render: text => {
        switch (text) {
          case 2:
            return '승인';
          case 3:
            return '홀드';
          default:
            return '대기';
        }
      },
    },
    {
      title: '결재일',
      dataIndex: 'APPV_DTTM',
      key: 'APPV_DTTM',
      align: 'center',
    },
  ];

  componentDidMount() {
    const { id, submitHandlerBySaga, selectedRow } = this.props;
    const { DRAFT_ID, WORK_SEQ, TASK_SEQ } = selectedRow;
    const fixUrl = `/api/builder/v1/work/task/${WORK_SEQ}/${TASK_SEQ}`;
    submitHandlerBySaga(id, 'GET', fixUrl, {}, this.getBuilderData);
  }

  getBuilderData = (id, response) => {
    const { submitHandlerBySaga, selectedRow } = this.props;
    const { DRAFT_ID } = selectedRow;
    const {
      result: { REG_DTTM, MIG_YN, DOCNUMBER, END_DTTM },
    } = response;
    this.setState({ DOCNUMBER, END_DTTM });
    let isMig = MIG_YN === '' ? 'N' : 'Y';
    // 현행화 20년 9월 1일 이후에 등록된 결재프로세스일 경우 isMig = N
    if (REG_DTTM && moment(REG_DTTM) >= moment('20200901', 'YYYYMMDD')) {
      isMig = 'N';
    }
    const submitParam = {
      PARAM: {
        draftId: DRAFT_ID,
        isMig,
      },
    };
    const fixUrl = '/api/workflow/v1/common/process/ProcessPreviewHandler';
    submitHandlerBySaga(id, 'POST', fixUrl, submitParam, this.initDataBind);
  };

  initDataBind = (id, response) => {
    const { prcPreViewList } = response;
    console.debug(prcPreViewList);
    this.setState({ preViewList: prcPreViewList });
  };

  render() {
    const { preViewList, DOCNUMBER, END_DTTM } = this.state;
    return (
      <div style={{ padding: '20px' }}>
        <StyledHtmlTable>
          <table className="app-workflow-user-draft-docu">
            <thead>
              <tr>
                <th>문서번호</th>
                <th>Effective Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="tr-center">
                <td>{DOCNUMBER}</td>
                <td>{END_DTTM} Date</td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <AntdTable key="apps-workflow-user-draft-list" columns={this.getTableColumns()} dataSource={preViewList} bordered pagination={false}></AntdTable>
      </div>
    );
  }
}

export default ProcessView;
