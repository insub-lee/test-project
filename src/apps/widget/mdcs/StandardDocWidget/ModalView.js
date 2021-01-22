import React, { Component } from 'react';
import history from 'utils/history';

import { Modal } from 'antd';

import BizBuilderBase from 'components/BizBuilderBase';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import DraftDownLoad from 'apps/mdcs/Modal/DraftDownLoad';

const AntdModal = StyledAntdModal(Modal);

class ModalView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDownVisible: false,
      selectedRow: undefined,
      DRAFT_PROCESS: undefined,
      appvMember: undefined,
    };
  }

  componentDidMount() {}

  onClickDownLoad = formData => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const url = '/api/workflow/v1/common/workprocess/defaultPrcRuleHanlder';
    submitHandlerBySaga(sagaKey, 'POST', url, { PARAM: { PRC_ID: 107 } }, this.initProcessData);
    this.setState({ isDownVisible: true, selectedRow: { ...formData } });
  };

  initProcessData = (id, response) => {
    const { DRAFT_PROCESS } = response;
    const { DRAFT_PROCESS_STEP } = DRAFT_PROCESS;
    const appvMember =
      DRAFT_PROCESS_STEP.filter(item => item.NODE_ID === 133).length > 0 ? DRAFT_PROCESS_STEP.filter(item => item.NODE_ID === 133)[0].APPV_MEMBER : [];
    this.setState({ DRAFT_PROCESS, appvMember });
  };

  onCompleteProc = (id, response) => {
    history.push('/apps/Workflow/User/DraftDocDown');
    this.setState({ isDownVisible: false });
  };

  onCloseDownLoad = () => {
    this.setState({ isDownVisible: false });
  };

  render() {
    const { viewType, workSeq, taskSeq, closeBtnFunc, clickCoverView, clickJasperView, sagaKey, submitHandlerBySaga } = this.props;
    const { isDownVisible, selectedRow, DRAFT_PROCESS, appvMember } = this.state;
    return (
      <>
        <BizBuilderBase
          sagaKey="SearchView"
          viewType={viewType}
          workSeq={workSeq}
          taskSeq={taskSeq}
          clickCoverView={clickCoverView}
          clickJasperView={clickJasperView}
          closeBtnFunc={closeBtnFunc}
          ViewCustomButtons={({ closeBtnFunc: onClickClose, isTaskFavorite, sagaKey, formData, setTaskFavorite }) => (
            <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
              {isTaskFavorite && (
                <StyledButton
                  className="btn-primary mr5 btn-sm"
                  onClick={() => setTaskFavorite(sagaKey, formData.WORK_SEQ, formData.TASK_ORIGIN_SEQ, formData.BUILDER_TASK_FAVORITE || 'N')}
                >
                  {formData.BUILDER_TASK_FAVORITE === 'Y' ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                </StyledButton>
              )}
              <StyledButton className="btn-primary btn-sm mr5" onClick={() => this.onClickDownLoad(formData)}>
                다운로드 신청
              </StyledButton>
              <StyledButton className="btn-light btn-sm" onClick={onClickClose}>
                닫기
              </StyledButton>
            </StyledButtonWrapper>
          )}
        />
        <AntdModal
          className="modalWrapper modalTechDoc"
          title="파일 다운 신청"
          visible={isDownVisible}
          footer={null}
          width={800}
          initialWidth={800}
          onCancel={this.onCloseDownLoad}
          onOk={this.closeBtnFunc}
          okButtonProps={null}
          destroyOnClose
        >
          <DraftDownLoad
            sagaKey={sagaKey}
            selectedRow={selectedRow}
            appvMember={appvMember}
            DRAFT_PROCESS={DRAFT_PROCESS}
            submitHandlerBySaga={submitHandlerBySaga}
            onCompleteProc={this.onCompleteProc}
            onCloseDownLoad={this.onCloseDownLoad}
          />
        </AntdModal>
      </>
    );
  }
}

export default ModalView;
