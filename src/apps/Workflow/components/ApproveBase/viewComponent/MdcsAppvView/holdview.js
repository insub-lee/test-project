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
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      selectedUser: undefined,
      nextApprover: undefined,
      selectedViewType: 'VIEW',
      modalWidth: 800,
    };
  }

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

  handleReqApprove = e => {
    e.preventDefault();
    this.props.reqApprove({});
    this.props.setOpinionVisible(false);
  };

  onCloseModal = () => {
    const { onResizeModal } = this.props;
    console.debug('modal close');
    onResizeModal(600);
    this.props.setViewVisible(false);
  };

  onClickModify = () => {
    const { onResizeModal } = this.props;
    onResizeModal(900);
    this.setState({ selectedViewType: 'MODIFY' });
  };

  onChangeForm = () => {
    const { onResizeModal } = this.props;
    onResizeModal(600);
    this.setState({ selectedViewType: 'VIEW' });
  };

  clickCoverView = (workSeq, taskSeq, viewMetaSeq) => {};

  closeBtnFunc = () => {};

  render() {
    const { selectedRow, opinionVisible } = this.props;
    const { selectedViewType, modalWidth } = this.state;
    return (
      <>
        <BizBuilderBase
          sagaKey="approveBase_approveView"
          viewType={selectedViewType}
          onCloseModal={this.onCloseModal}
          onChangeForm={this.onChangeForm}
          closeBtnFunc={this.closeBtnFunc}
          clickCoverView={this.clickCoverView}
          workSeq={selectedRow && selectedRow.WORK_SEQ}
          taskSeq={selectedRow && selectedRow.TASK_SEQ}
          metaSeq={selectedRow && selectedRow.RULE_CONFIG.META_SEQ}
          selectedRow={selectedRow}
          ViewCustomButtons={() => false}
          // changeWorkflowFormData={this.changeWorkflowFormData}
        />
        <ModalWrapper
          title="홀드해제"
          visible={opinionVisible}
          onOk={this.handleReqApprove}
          onCancel={this.handleCloseOpinionModal}
          width={modalWidth}
          style={{ top: 100 }}
          destroyOnClose
        >
          {(selectedRow.APPV_STATUS === 4 || selectedRow.APPV_STATUS === 40 || selectedRow.APPV_STATUS === 400) && (
            <OpinionModal {...this.props} CustomActionView={HoldRelease} />
          )}
        </ModalWrapper>
        {selectedViewType !== 'MODIFY' && (
          <div style={{ textAlign: 'center' }} className="btn-group">
            <StyledButton style={{ marginRight: '5px' }} key="appvBtn1" className="btn-primary btn-sm" onClick={() => this.onClickModify()}>
              표지수정
            </StyledButton>
            {(selectedRow.PROC_STATUS === 3 || selectedRow.PROC_STATUS === 30) && selectedRow.NODE_ID !== 114 && (
              <StyledButton style={{ marginRight: '5px' }} key="appvBtn2" className="btn-primary btn-sm" onClick={() => this.onHoldRelase()}>
                홀드해제
              </StyledButton>
            )}
            {(selectedRow.PROC_STATUS === 3 || selectedRow.PROC_STATUS === 300) && (
              <StyledButton style={{ marginRight: '5px' }} key="appvBtn3" className="btn-primary btn-sm" onClick={() => this.onMDCSHoldRelase()}>
                홀드해제
              </StyledButton>
            )}
            <StyledButton key="close" className="btn-light btn-sm" onClick={() => this.onCloseModal()}>
              닫기
            </StyledButton>
          </div>
        )}
      </>
    );
  }
}

HoldView.propTypes = {};

HoldView.defaultProps = {};

export default HoldView;
