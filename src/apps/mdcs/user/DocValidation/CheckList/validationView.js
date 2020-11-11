import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Radio, Button, Modal, Popconfirm, DatePicker } from 'antd';
import BizBuilderBase from 'components/BizBuilderBase';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledContentsModal from 'commonStyled/MdcsStyled/Modal/StyledContentsModal';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import BuilderProcessModal from 'apps/Workflow/WorkProcess/BuilderProcessModal';
import WorkProcess from 'apps/Workflow/WorkProcess';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdDatePicker = StyledDatePicker(DatePicker);
const AntdModal = StyledContentsModal(Modal);
// eslint-disable-next-line react/prefer-stateless-function
class ValidationView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: 1,
      workProcess: {},
      coverView: { workSeq: undefined, taskSeq: undefined, viewMetaSeq: undefined, visible: false, viewType: 'VIEW' },
      revDate: undefined,
    };
  }

  componentDidMount() {
    const { id, submitHandlerBySaga } = this.props;
    const url = '/api/workflow/v1/common/workprocess/defaultPrcRuleHanlder';
    submitHandlerBySaga(id, 'POST', url, { PARAM: { PRC_ID: 105 } }, this.initProcessData);
  }

  initProcessData = (sagaKey, response) => {
    const { WORK_SEQ, TASK_SEQ, TASK_ORIGIN_SEQ, TITLE } = this.props;
    const draftData = { WORK_SEQ, TASK_SEQ, TASK_ORIGIN_SEQ };
    const { DRAFT_PROCESS } = response;
    const tProc = { ...DRAFT_PROCESS, DRAFT_DATA: draftData, REL_TYPE: 2, WORK_SEQ, TASK_SEQ, DRAFT_TITLE: TITLE };
    this.setState({ workProcess: { DRAFT_PROCESS: tProc } });
  };

  onSelectRadio = e => {
    this.setState({ selectedValue: e.target.value });
  };

  onClickEvent = () => {
    const { onValidateProcess } = this.props;
    const { selectedValue, workProcess, revDate } = this.state;
    if (selectedValue === 2 && !revDate) return this.showMessage('개정일을 확인하십시오.');
    onValidateProcess(selectedValue, revDate, workProcess);
  };

  clickCoverView = (workSeq, taskSeq, viewMetaSeq) => {
    const coverView = { workSeq, taskSeq, viewMetaSeq, visible: true, viewType: 'VIEW' };
    this.setState({ coverView });
  };

  onCloseCoverView = () => {
    const { coverView } = this.state;
    const tempCoverView = { ...coverView, visible: false };
    this.setState({ coverView: tempCoverView });
  };

  onCloseModal = () => {
    const { onModalClose } = this.props;
    onModalClose();
  };

  setProcessRule = (id, processRule) => {
    this.setState({ workProcess: { DRAFT_PROCESS: { ...processRule } } });
  };

  getValueName = () => {
    switch (this.state?.selectedValue) {
      case 1:
        return '유효';
      case 2:
        return '개정';
      case 3:
        return '폐기';
      default:
        return '';
    }
  };

  showMessage = text => message.info(<MessageContent>{text}</MessageContent>);

  render() {
    const { WORK_SEQ, TASK_SEQ, onModalClose, onShowProces } = this.props;
    const { selectedValue, coverView, workProcess } = this.state;

    return (
      <>
        <StyledHtmlTable style={{ padding: '20px 20px 0' }}>
          {workProcess && workProcess.DRAFT_PROCESS && (
            <WorkProcess
              id="work"
              CustomWorkProcessModal={BuilderProcessModal}
              setProcessRule={this.setProcessRule}
              processRule={workProcess.DRAFT_PROCESS ? workProcess.DRAFT_PROCESS : {}}
              PRC_ID={105}
            />
          )}
          <table>
            <tbody>
              <tr>
                <th style={{ width: '150px' }}>유효성 점검 </th>
                <td>
                  <Radio.Group defaultValue={selectedValue} onChange={this.onSelectRadio}>
                    <Radio value={1}>유효</Radio>
                    <Radio value={2}>개정</Radio>
                    <Radio value={3}>폐기</Radio>
                  </Radio.Group>
                </td>
              </tr>
              <tr style={{ display: selectedValue === 2 ? 'table-row' : 'none' }}>
                <th style={{ width: '150px' }}>개정일</th>
                <td>
                  <AntdDatePicker
                    className="ant-picker-sm mr5"
                    format="YYYY-MM-DD"
                    style={{ width: '125px' }}
                    placeholder=""
                    onChange={(date, str) => this.setState({ revDate: str })}
                    allowClear={false}
                    disabled={false}
                    readOnly={false}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <div style={{ textAlign: 'center', marginTop: '10px' }} className="btn-group">
          <Popconfirm title={`유효성 점검[${this.getValueName()}] 상신하시겠습니까?`} onConfirm={this.onClickEvent} okText="Yes" cancelText="No">
            <Button type="primary" style={{ marginRight: '5px' }}>
              확인
            </Button>
          </Popconfirm>

          <Button onClick={this.onCloseModal}>닫기</Button>
        </div>

        <BizBuilderBase
          sagaKey="validateView"
          workSeq={WORK_SEQ}
          taskSeq={TASK_SEQ}
          viewType="VIEW"
          clickCoverView={this.clickCoverView}
          ViewCustomButtons={() => false}
        />

        <AntdModal
          className="modalWrapper modalTechDoc modalCustom"
          title="표지 보기"
          width={800}
          destroyOnClose
          visible={coverView.visible}
          onCancel={this.onCloseCoverView}
          footer={[]}
        >
          <BizBuilderBase
            sagaKey="CoverView"
            viewType={coverView.viewType}
            workSeq={coverView.workSeq}
            taskSeq={coverView.taskSeq}
            viewMetaSeq={coverView.viewMetaSeq}
            onCloseCoverView={this.onCloseCoverView}
            onCloseModalHandler={this.onClickModifyDoCoverView}
            ViewCustomButtons={({ onCloseCoverView }) => (
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <StyledButton className="btn-primary" onClick={onCloseCoverView}>
                  닫기
                </StyledButton>
              </div>
            )}
          />
        </AntdModal>
      </>
    );
  }
}

ValidationView.propTypes = {
  onModalClose: PropTypes.func,
};

ValidationView.defaultProps = {
  selectedValue: 1,
  onModalClose: () => false,
};

export default ValidationView;
