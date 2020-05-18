import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Radio, Button, Modal } from 'antd';
import BizBuilderBase from 'components/BizBuilderBase';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledContentsModal from 'commonStyled/MdcsStyled/Modal/StyledContentsModal';
import StyledButton from 'commonStyled/Buttons/StyledButton';

const AntdModal = StyledContentsModal(Modal);
// eslint-disable-next-line react/prefer-stateless-function
class ApproveView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: 2,
      workProcess: {},
      coverView: { workSeq: undefined, taskSeq: undefined, viewMetaSeq: undefined, visible: false, viewType: 'VIEW' },
    };
  }

  componentDidMount() {
    const { id, submitHandlerBySaga } = this.props;
    const url = '/api/workflow/v1/common/workprocess/defaultPrcRuleHanlder';
    submitHandlerBySaga(id, 'POST', url, { PARAM: { PRC_ID: 105 } }, this.initProcessData);
  }

  initProcessData = (sagaKey, response) => {
    const { WORK_SEQ, TASK_SEQ, TASK_ORIGIN_SEQ, TITLE, selectedRow, setSelectedRow } = this.props;
    const { selectedValue } = this.state;
    const nSelectRow = { ...selectedRow, APPV_STATUS: selectedValue };
    setSelectedRow(nSelectRow);
    const draftData = { WORK_SEQ, TASK_SEQ, TASK_ORIGIN_SEQ };
    const { DRAFT_PROCESS } = response;
    const tProc = { ...DRAFT_PROCESS, DRAFT_DATA: draftData, REL_TYPE: 2, WORK_SEQ, TASK_SEQ, DRAFT_TITLE: TITLE };
    this.setState({ workProcess: { DRAFT_PROCESS: tProc } });
  };

  onSelectRadio = e => {
    const { selectedRow, setSelectedRow } = this.props;
    const nSelectRow = { ...selectedRow, APPV_STATUS: e.target.value };
    setSelectedRow(nSelectRow);
    this.setState({ selectedValue: e.target.value });
  };

  onClickEvent = e => {
    e.preventDefault();
    const { selectedValue } = this.state;
    const { onModalClose, reqApprove } = this.props;
    reqApprove(selectedValue);
    onModalClose();
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

  render() {
    const { WORK_SEQ, TASK_SEQ, onModalClose } = this.props;
    const { selectedValue, coverView } = this.state;
    return (
      <>
        <StyledHtmlTable style={{ padding: '20px 20px 0' }}>
          <table>
            <tbody>
              <tr>
                <th style={{ width: '150px' }}>유효성 점검 </th>
                <td>
                  <Radio.Group defaultValue={selectedValue} onChange={this.onSelectRadio}>
                    <Radio value={2}>유효</Radio>
                    <Radio value={9}>부결</Radio>
                  </Radio.Group>
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <div style={{ textAlign: 'center', marginTop: '10px' }} className="btn-group">
          <Button type="primary" style={{ marginRight: '5px' }} onClick={this.onClickEvent}>
            확인
          </Button>
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

ApproveView.propTypes = {
  onModalClose: PropTypes.func,
};

ApproveView.defaultProps = {
  selectedValue: 1,
  onModalClose: () => false,
};

export default ApproveView;
