import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Modal, Radio, Table, Spin } from 'antd';

import draftImg1 from 'apps/mdcs/images/draft_img1.png';
import message from 'components/Feedback/message';
import history from 'utils/history';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import * as DraftType from 'apps/Workflow/WorkFlowBase/Nodes/Constants/draftconst';
import * as ModifyType from 'apps/Workflow/WorkFlowBase/Nodes/Constants/modifyconst';
import StyledInputView from 'apps/mdcs/components/BizBuilderBase/viewComponent/InputPage/Styled';
import BizBuilderBase from 'components/BizBuilderBase';

import DraftPrcLine from 'apps/mdcs/user/Workflow/DraftPrcLine';
import StyledContents from '../../../../styled/StyledContents';
import StyledButton from '../../../../styled/StyledButton';
import StyledModalWrapper from '../../../../styled/Modals/StyledModalWrapper';

import StdView from '../StdView';
import StdInput from '../StdInput';
import Enactment from './Enactment';
import Amendment from './Amendment';
import Abrogation from './Abrogation';
import AbrogationMulti from './AbrogationMulti';
import TransferView from './AbrogationMulti/TransferView';

const AntdModal = StyledModalWrapper(Modal);

class IntroComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDraft: DraftType.ENACTMENT,
      isShow: false,
      isLoading: false,
      docType: '',
      selectedworkSeq: 0,
      viewChangeSeq: undefined,
      selectedtaskSeq: undefined,
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

  loadingComplete = () => {
    this.setState({ isLoading: false });
  };

  onCloseModalHandler = () => {
    this.setState({ isShow: false });
    message.success('기안 완료');
    history.push('/apps/Workflow/User/Draft');
  };

  onCloseModal = () => {
    this.setState({ isShow: false });
  };

  render() {
    const { selectedDraft, isShow, isLoading, selectedworkSeq, selectedTaskSeq, docNumber, selectedNodeId, viewType, workPrcProps, viewChangeSeq } = this.state;
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
                  {selectedDraft === DraftType.ABROGATION && <Abrogation />}
                  {selectedDraft === 'ABROGATION_MULTI' && <AbrogationMulti />}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <AntdModal destroyOnClose style={{ top: '50px' }} width={900} visible={isShow} onCancel={this.onCloseModal} footer={null} maskClosable={false}>
          <StyledInputView>
            <div className="pop_tit">업무표준</div>
            <div style={{ display: isLoading ? 'block' : 'none' }}>
              <Spin tip="Loading...">
                <div style={{ height: '300px' }} />
              </Spin>
            </div>
            <div style={{ display: !isLoading ? 'block' : 'none' }}>
              <BizBuilderBase
                sagaKey={`BizDoc_${selectedworkSeq}`}
                workSeq={selectedworkSeq}
                taskSeq={selectedTaskSeq}
                viewChangeSeq={viewChangeSeq}
                CustomWorkProcess={DraftPrcLine}
                viewType={viewType}
                workPrcProps={workPrcProps}
                onCloseModalHandler={this.onCloseModalHandler}
                compProps={{ docNumber, NODE_ID: selectedNodeId }}
                InputCustomButtons={({ saveBeforeProcess, onCloseModal, sagaKey, reloadId }) => (
                  <div style={{ textAlign: 'center', marginTop: '12px' }}>
                    <StyledButton className="btn-primary btn-first" onClick={() => saveBeforeProcess(sagaKey, reloadId)}>
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
