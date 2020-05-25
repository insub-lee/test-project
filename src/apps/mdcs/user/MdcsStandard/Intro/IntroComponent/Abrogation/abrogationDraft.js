import React, { Component } from 'react';
import { Input, Button } from 'antd';
import WorkProcess from 'apps/Workflow/WorkProcess';
import WorkProcessModal from 'apps/Workflow/WorkProcess/WorkProcessModal';
import BizBuilderBase from 'components/BizBuilderBase';

import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
const { TextArea } = Input;
class AbrogationDraft extends Component {
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
    submitHandlerBySaga(id, 'POST', url, { PARAM: { PRC_ID: 106, DRAFT_DATA: { ...workPrcProps } } }, this.initProcessData);
  }

  initProcessData = (sagaKey, response) => {
    const { WORK_SEQ, TASK_SEQ, TASK_ORIGIN_SEQ, TITLE } = this.props;
    const draftData = { WORK_SEQ, TASK_SEQ, TASK_ORIGIN_SEQ };
    const { DRAFT_PROCESS } = response;
    const tProc = { ...DRAFT_PROCESS, DRAFT_DATA: draftData, REL_TYPE: 99, WORK_SEQ, TASK_SEQ, DRAFT_TITLE: TITLE };
    this.setState({ workProcess: { DRAFT_PROCESS: tProc }, draftWorkProc: tProc });
  };

  setProcessRule = (id, processRule) => {
    this.setState({ draftWorkProc: processRule });
  };

  onChangeDescription = e => {
    this.setState({ descOfChange: e.target.value });
  };

  onChangeRevHistory = e => {
    this.setState({ revHistory: e.target.value });
  };

  onClickEvent = () => {
    const { onAbrogationProcess } = this.props;
    const { draftWorkProc, descOfChange, revHistory } = this.state;
    const DRAFT_DATA = draftWorkProc.DRAFT_DATA ? draftWorkProc.DRAFT_DATA : {};
    const nDraftData = { ...DRAFT_DATA, descOfChange, revHistory };
    const nDraftWorkProc = { ...draftWorkProc, DRAFT_DATA: nDraftData };
    onAbrogationProcess(nDraftWorkProc);
  };

  render() {
    const { WORK_SEQ, TASK_SEQ } = this.props;
    console.debug('props', this.props);
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
        <BizBuilderBase sagaKey="validateView" workSeq={WORK_SEQ} taskSeq={TASK_SEQ} viewType="VIEW" ViewCustomButtons={() => false} />
      </>
    );
  }
}

export default AbrogationDraft;
