import React, { Component } from 'react';
import { Input, Button, Table } from 'antd';
import moment from 'moment';

import WorkProcess from 'apps/Workflow/WorkProcess';
import WorkProcessModal from 'apps/Workflow/WorkProcess/WorkProcessModal';

import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledLineTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
const AntdLineTable = StyledLineTable(Table);

const { TextArea } = Input;
class AbrogationMultiDraft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workProcess: undefined,
      draftWorkProc: undefined,
      descOfChange: undefined,
      revHistory: undefined,
    };
  }

  componentDidMount() {
    const { id, submitHandlerBySaga, workPrcProps } = this.props;
    const url = '/api/workflow/v1/common/workprocess/defaultPrcRuleHanlder';
    submitHandlerBySaga(id, 'POST', url, { PARAM: { PRC_ID: 106, DRAFT_DATA: { ...workPrcProps, isMultiAbrogation: true } } }, this.initProcessData);
  }

  initProcessData = (sagaKey, response) => {
    const { workPrcProps } = this.props;
    const { DRAFT_PROCESS } = response;
    const tProc = { ...DRAFT_PROCESS, REL_TYPE: 999 };
    this.setState({ workProcess: { DRAFT_PROCESS: tProc }, draftWorkProc: tProc });
  };

  setProcessRule = (id, processRule) => {
    this.setState({ draftWorkProc: processRule });
  };

  onChangeTitle = e => {
    this.setState({ draftTitle: e.target.value });
  };

  onChangeDescription = e => {
    this.setState({ descOfChange: e.target.value });
  };

  onChangeRevHistory = e => {
    this.setState({ revHistory: e.target.value });
  };

  onClickEvent = () => {
    const { onAbrogationMultiProcess } = this.props;
    const { draftWorkProc, descOfChange, revHistory, draftTitle } = this.state;
    const DRAFT_DATA = draftWorkProc.DRAFT_DATA ? draftWorkProc.DRAFT_DATA : {};
    const nDraftData = { ...DRAFT_DATA, descOfChange, revHistory };
    const nDraftWorkProc = { ...draftWorkProc, DRAFT_TITLE: draftTitle, DRAFT_DATA: nDraftData };
    onAbrogationMultiProcess(nDraftWorkProc);
  };

  getTableColumns = () => [
    {
      title: 'Title',
      dataIndex: 'TITLE',
      key: 'TITLE',
      ellipsis: true,
    },
    {
      title: '개정번호',
      dataIndex: 'VERSION',
      key: 'VERSION',
      width: '13%',
      align: 'center',
    },
    {
      title: '작성자',
      dataIndex: 'REG_USER_NAME',
      key: 'REG_USER_NAME',
      width: '12%',
      align: 'center',
    },
    {
      title: '부서',
      dataIndex: 'REG_DEPT_NAME',
      key: 'REG_DEPT_NAME',
      width: '17%',
      align: 'center',
    },
    {
      title: '기안일',
      dataIndex: 'REG_DTTM',
      key: 'REG_DTTM',
      width: '15%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
  ];

  onCloseModal = () => {
    const { onCloseAbrogationMultiModal } = this.props;
    onCloseAbrogationMultiModal();
  };

  render() {
    const { workProcess } = this.state;
    return (
      <>
        <StyledHtmlTable style={{ padding: '20px 20px 0' }}>
          {workProcess && workProcess.DRAFT_PROCESS && (
            <WorkProcess
              id="work"
              CustomWorkProcessModal={WorkProcessModal}
              setProcessRule={this.setProcessRule}
              processRule={workProcess.DRAFT_PROCESS ? workProcess.DRAFT_PROCESS : {}}
              PRC_ID={106}
            />
          )}
          <table>
            <tbody>
              <tr>
                <th style={{ width: '300px' }}>제목 </th>
                <td>
                  <Input style={{ width: '100%' }} onChange={this.onChangeTitle}></Input>
                </td>
              </tr>
              <tr>
                <th style={{ width: '300px' }}>Description Of Change(From/To) </th>
                <td>
                  <TextArea style={{ width: '100%' }} onChange={this.onChangeDescription}></TextArea>
                </td>
              </tr>
              <tr>
                <th style={{ width: '300px' }}>제개정 이력</th>
                <td>
                  <TextArea style={{ width: '100%' }} onChange={this.onChangeRevHistory}></TextArea>
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ textAlign: 'center', marginTop: '10px' }} className="btn-group">
            <Button type="primary" style={{ marginRight: '5px' }} onClick={this.onClickEvent}>
              확인
            </Button>
            <Button onClick={this.onCloseModal}>닫기</Button>
          </div>
        </StyledHtmlTable>
        <StyledHtmlTable style={{ padding: '20px 20px 0' }}>
          <AntdLineTable
            columns={this.getTableColumns()}
            dataSource={
              workProcess && workProcess.DRAFT_PROCESS && workProcess.DRAFT_PROCESS.DRAFT_DATA.abrogationList !== null
                ? workProcess.DRAFT_PROCESS.DRAFT_DATA.abrogationList
                : []
            }
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
            className="tableWrapper"
          />
        </StyledHtmlTable>
      </>
    );
  }
}

export default AbrogationMultiDraft;
