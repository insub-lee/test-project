import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Radio, Table } from 'antd';

import draftImg1 from 'apps/mdcs/images/draft_img1.png';
import message from 'components/Feedback/message';
import history from 'utils/history';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import * as DraftType from 'apps/Workflow/WorkFlowBase/Nodes/Constants/draftconst';
import * as ModifyType from 'apps/Workflow/WorkFlowBase/Nodes/Constants/modifyconst';
import StyledInputView from 'apps/mdcs/components/BizBuilderBase/viewComponent/InputPage/Styled';
import BizBuilderBase from 'components/BizBuilderBase';

import WorkProcessModal from 'apps/Workflow/WorkProcess/WorkProcessModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import ApproveBase from 'apps/Workflow/components/ApproveBase';
import StyledContents from '../../../../styled/StyledContents';
import StyledModalWrapper from '../../../../styled/Modals/StyledModalWrapper';

import Enactment from './Enactment';
import Amendment from './Amendment';
import Abrogation from './Abrogation';
import AbrogationDraft from './Abrogation/abrogationDraft';
import AbrogationMulti from './AbrogationMulti';
import AbrogationMultiDraft from './AbrogationMulti/abrogationMultiDraft';
const AntdModal = StyledModalWrapper(Modal);

class IntroComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDraft: DraftType.ENACTMENT,
      isShow: false,
      isAbrogationShow: false,
      isAbrogationMultiShow: false,
      isLoading: false,
      docType: '',
      selectedworkSeq: 0,
      viewChangeSeq: undefined,
      selectedtaskSeq: undefined,
      selectedTaskOriginSeq: undefined,
      abrogationList: undefined,
      title: undefined,
      isInitState: false,
      selectedNodeId: 0,
      docNumber: undefined,
      viewType: undefined,
      workPrcProps: {},
    };
  }

  onChangeDraft = e => {
    const selectedDraft = e.target.value;
    this.setState({ selectedDraft });
  };

  onMakeNumber = (id, response) => {
    const { docNumber } = response;
    this.setState({ docNumber, isShow: true });
  };

  onShowModalEnactment = (selectedworkSeq, viewChangeSeq, docNumber, selectedNodeId, viewType, workPrcProps) => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    this.setState(
      {
        selectedworkSeq,
        selectedTaskSeq: undefined,
        selectedNodeId,
        viewType,
        workPrcProps,
        viewChangeSeq,
      },
      () => {
        submitHandlerBySaga(sagaKey, 'GET', `/api/mdcs/v1/common/DocNumberHanlder/${docNumber}`, {}, this.onMakeNumber);
      },
    );
  };

  onShowModalAmendment = (selectedworkSeq, selectedTaskSeq, viewChangeSeq, selectedNodeId, viewType, workPrcProps) => {
    this.setState({
      isShow: true,
      selectedworkSeq,
      selectedTaskSeq,
      selectedNodeId,
      viewType,
      workPrcProps,
      viewChangeSeq,
    });
  };

  onShowModalAbrogation = (selectedworkSeq, selectedTaskSeq, selectedTaskOriginSeq, title, viewChangeSeq, selectedNodeId, viewType, workPrcProps) => {
    this.setState({
      isAbrogationShow: true,
      selectedworkSeq,
      selectedTaskSeq,
      selectedTaskOriginSeq,
      title,
      selectedNodeId,
      viewType,
      workPrcProps,
      viewChangeSeq,
    });
  };

  onShowAbrogationMulti = workPrcProps => {
    this.setState({
      isAbrogationMultiShow: true,
      workPrcProps,
    });
  };

  loadingComplete = () => {
    this.setState({ isLoading: false });
  };

  onCloseModalHandler = (id, redirectUrl) => {
    this.setState({ isShow: false });
    message.success('기안 완료');
    // history.push('/apps/Workflow/User/Draft');
    redirectUrl(id, '/apps/Workflow/User/Draft');
  };

  onCloseModal = () => {
    this.setState({ isShow: false });
  };

  onCloseAbrogationModal = () => {
    this.setState({ isAbrogationShow: false });
  };

  onCloseAbrogationMultiModal = () => {
    this.setState({ isAbrogationMultiShow: false });
  };

  onAbrogationProcess = workProcess => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const prefixUrl = '/api/workflow/v1/common/workprocess/draft';
    submitHandlerBySaga(sagaKey, 'POST', prefixUrl, { DRAFT_PROCESS: workProcess }, this.onCompleteProc);
  };

  onCompleteProc = () => {
    this.setState({
      isShow: false,
      isAbrogationShow: false,
      isAbrogationMultiShow: false,
    });
    history.push('/apps/Workflow/User/Draft');
  };

  onAbrogationMultiProcess = workPrcProps => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const prefixUrl = '/api/workflow/v1/common/workprocess/draft';
    submitHandlerBySaga(sagaKey, 'POST', prefixUrl, { DRAFT_PROCESS: workPrcProps }, this.onCompleteProc);
  };

  render() {
    const {
      selectedDraft,
      isShow,
      isAbrogationShow,
      isAbrogationMultiShow,
      isLoading,
      selectedworkSeq,
      selectedTaskSeq,
      selectedTaskOriginSeq,
      title,
      docNumber,
      selectedNodeId,
      viewType,
      workPrcProps,
      viewChangeSeq,
    } = this.state;

    return (
      <StyledContents>
        <div className="contentWrapper">
          <div className="contentGrid">
            <div className="grid2">
              <div className="subFlow">
                <dl>
                  <dt>사내 표준 기안 Flow</dt>
                  <dd>
                    <img src={draftImg1} alt="사내 표준 기안 Flow" /> * 문의사항 발생시 표준관리실로 문의하시기 바랍니다.
                    <br /> MDCS 총괄 박영미 (청주)4951
                  </dd>
                </dl>
              </div>
            </div>
            <div className="grid4 last">
              <div className="con-tit">
                <span>기안</span>
              </div>
              <div className="con-body">
                <ul>
                  <li>
                    <div className="label-txt">기안구분</div>
                    <Radio.Group value={selectedDraft} onChange={this.onChangeDraft}>
                      <Radio value={DraftType.ENACTMENT}>제정기안</Radio>
                      <Radio value={DraftType.AMENDMENT}>개정기안</Radio>
                      <Radio value={DraftType.ABROGATION}>폐기기안(일반)</Radio>
                      <Radio value="ABROGATION_MULTI">폐기기안(일괄)</Radio>
                    </Radio.Group>
                  </li>
                  {selectedDraft === DraftType.ENACTMENT && <Enactment {...this.props} onShowModal={this.onShowModalEnactment} />}
                  {selectedDraft === DraftType.AMENDMENT && <Amendment {...this.props} onShowModal={this.onShowModalAmendment} />}
                  {selectedDraft === DraftType.ABROGATION && <Abrogation {...this.props} onShowModalAbrogation={this.onShowModalAbrogation} />}
                  {selectedDraft === 'ABROGATION_MULTI' && <AbrogationMulti {...this.props} onShowAbrogationMulti={this.onShowAbrogationMulti} />}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <AntdModal
          destroyOnClose
          style={{ top: '50px' }}
          width={900}
          visible={isAbrogationMultiShow}
          onCancel={this.onCloseAbrogationMultiModal}
          footer={null}
          maskClosable={false}
        >
          <StyledInputView>
            <div className="pop_tit">표준 일괄 폐기</div>
            <div style={{ display: !isLoading ? 'block' : 'none' }}>
              <ApproveBase
                id="abrogationProc"
                workPrcProps={workPrcProps}
                component={AbrogationMultiDraft}
                onAbrogationMultiProcess={this.onAbrogationMultiProcess}
                onCloseAbrogationMultiModal={this.onCloseAbrogationMultiModal}
              />
              ;
            </div>
          </StyledInputView>
        </AntdModal>
        <AntdModal
          destroyOnClose
          style={{ top: '50px' }}
          width={900}
          visible={isAbrogationShow}
          onCancel={this.onCloseAbrogationModal}
          footer={null}
          maskClosable={false}
        >
          <StyledInputView>
            <div className="pop_tit">표준 폐기</div>
            <div style={{ display: !isLoading ? 'block' : 'none' }}>
              <ApproveBase
                id="abrogationProc"
                WORK_SEQ={selectedworkSeq}
                TASK_SEQ={selectedTaskSeq}
                TASK_ORIGIN_SEQ={selectedTaskOriginSeq}
                workPrcProps={workPrcProps}
                TITLE={title}
                component={AbrogationDraft}
                onAbrogationProcess={this.onAbrogationProcess}
                onCloseAbrogationModal={this.onCloseAbrogationModal}
              />
              ;
            </div>
          </StyledInputView>
        </AntdModal>
        <AntdModal destroyOnClose style={{ top: '50px' }} width={900} visible={isShow} onCancel={this.onCloseModal} footer={null} maskClosable={false}>
          <StyledInputView>
            <div className="pop_tit">업무표준</div>

            <div style={{ display: !isLoading ? 'block' : 'none' }}>
              <BizBuilderBase
                sagaKey={`BizDoc_${selectedworkSeq}`}
                workSeq={selectedworkSeq}
                taskSeq={selectedTaskSeq}
                viewChangeSeq={viewChangeSeq}
                CustomWorkProcessModal={WorkProcessModal}
                viewType={viewType}
                workPrcProps={workPrcProps}
                onCloseModalHandler={this.onCloseModalHandler}
                onCloseModal={this.onCloseModal}
                compProps={{ docNumber, NODE_ID: selectedNodeId }}
                InputCustomButtons={({ saveBeforeProcess, onCloseModal, sagaKey, reloadId }) => (
                  <div style={{ textAlign: 'center', marginTop: '12px' }}>
                    <StyledButton className="btn-primary btn-sm btn-first" onClick={() => saveBeforeProcess(sagaKey, reloadId)}>
                      저장
                    </StyledButton>
                    <StyledButton className="btn-light btn-sm" onClick={() => onCloseModal()}>
                      닫기
                    </StyledButton>
                  </div>
                )}
              />
            </div>
          </StyledInputView>
        </AntdModal>
      </StyledContents>
    );
  }
}

export default IntroComponent;
