import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input, Button, Select, Modal } from 'antd';
import BizBuilderBase from 'components/BizBuilderBase';
import MdcsContentView from 'components/MdcsContentView';
import StyledButton from 'components/CommonStyled/StyledButton';
import StyledModalWrapper from 'components/CommonStyled/StyledModalWrapper';
import OpinionModal from '../ApproveView/OpinionModal';
import HoldRelease from '../ApproveView/holdRelease';

const ModalWrapper = StyledModalWrapper(Modal);

class HoldView extends Component {
  state = {
    userInfo: [],
    selectedUser: undefined,
    nextApprover: undefined,
    selectedViewType: 'VIEW',
  };

  componentDidMount() {
    const { selectedRow, setSelectedRow } = this.props;
    const appvStatus = selectedRow && selectedRow.CURRENT_STATUS && selectedRow.CURRENT_STATUS == 10 ? 20 : 2;
    const nSelectRow = { ...selectedRow, APPV_STATUS: appvStatus };
    setSelectedRow(nSelectRow);
  }

  onHoldRelase = () => {
    const { selectedRow, setSelectedRow, setOpinionVisible } = this.props;
    const APPV_STATUS = selectedRow.PROC_STATUS === 3 ? 4 : 40;
    const nSelectedRow = { ...selectedRow, APPV_STATUS };
    setSelectedRow(nSelectedRow);
    setOpinionVisible(true);
  };

  onMDCSHoldRelase = () => {
    const { selectedRow, setSelectedRow, setOpinionVisible } = this.props;
    const APPV_STATUS = 400;
    const nSelectedRow = { ...selectedRow, APPV_STATUS };
    setSelectedRow(nSelectedRow);
    setOpinionVisible(true);
  };

  handleCloseOpinionModal = () => {
    this.props.setOpinion('');
    this.props.setOpinionVisible(false);
  };

  handleReqApprove = (e, appvStatus) => {
    e.preventDefault();
    this.props.reqApprove(appvStatus);
    this.props.setOpinionVisible(false);
  };

  onModalClose = () => {
    this.props.setViewVisible(false);
  };

  onClickModify = () => {
    this.setState({ selectedViewType: 'MODIFY' });
  };

  render() {
    const { selectedRow, opinionVisible } = this.props;
    const { selectedViewType } = this.state;
    return (
      <>
        <div style={{ padding: '10px' }}>
          {console.debug('selectedViewType', selectedViewType)}
          <BizBuilderBase
            sagaKey="approveBase_approveView"
            viewType={selectedViewType}
            CustomViewPage={MdcsContentView}
            workSeq={selectedRow && selectedRow.WORK_SEQ}
            taskSeq={selectedRow && selectedRow.TASK_SEQ}
            draftId={selectedRow && selectedRow.DRAFT_ID}
            metaSeq={selectedRow && selectedRow.RULE_CONFIG.META_SEQ}
            selectedRow={selectedRow}
            // changeWorkflowFormData={this.changeWorkflowFormData}
          />
        </div>
        <ModalWrapper
          title="홀드해제"
          visible={opinionVisible}
          onOk={this.handleReqApprove}
          onCancel={this.handleCloseOpinionModal}
          width="600px"
          style={{ top: 100 }}
          destroyOnClose
        >
          {(selectedRow.APPV_STATUS === 4 || selectedRow.APPV_STATUS === 40 || selectedRow.APPV_STATUS === 400) && (
            <OpinionModal {...this.props} CustomActionView={HoldRelease} />
          )}
        </ModalWrapper>
        <div style={{ textAlign: 'center' }} className="btn-group">
          <StyledButton style={{ marginRight: '5px' }} key="appvBtn1" className="btn-primary" onClick={() => this.onClickModify()}>
            표지수정
          </StyledButton>
          {(selectedRow.PROC_STATUS === 3 || selectedRow.PROC_STATUS === 30) && selectedRow.NODE_ID !== 114 && (
            <StyledButton style={{ marginRight: '5px' }} key="appvBtn2" className="btn-primary" onClick={() => this.onHoldRelase()}>
              홀드해제
            </StyledButton>
          )}
          {(selectedRow.PROC_STATUS === 3 || selectedRow.PROC_STATUS === 300) && (
            <StyledButton style={{ marginRight: '5px' }} key="appvBtn3" className="btn-primary" onClick={() => this.onMDCSHoldRelase()}>
              홀드해제
            </StyledButton>
          )}
          <StyledButton key="close" className="btn-light" onClick={this.onModalClose}>
            닫기
          </StyledButton>
        </div>
      </>
    );
  }
}

HoldView.propTypes = {};

HoldView.defaultProps = {};

export default HoldView;
