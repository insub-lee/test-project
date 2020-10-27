import React, { Component } from 'react';
import { Popconfirm, Modal, Button } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

import { saveProcessRule } from 'apps/eshs/common/workProcessRule';
import CustomWorkProcess from 'apps/Workflow/CustomWorkProcess';

const AntdModal = StyledContentsModal(Modal);
const StyledButton = StyledAntdButton(Button);

class CustomButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalObj: {
        title: '',
        visible: false,
        content: [],
      },
      processRule: {},
      tempProcessRule: {},
    };
  }

  handleModal = (title = '', visible = false, content = []) =>
    this.setState({
      modalObj: {
        title,
        visible,
        content,
      },
    });

  saveProcessRule = () => {
    const { relKey, relKey2, formData } = this.props;
    const { processRule } = this.state;

    saveProcessRule({
      ...processRule,
      DRAFT_DATA: {},
      REL_KEY: relKey,
      REL_KEY2: formData[relKey2],
      DRAFT_TITLE: `${formData?.EVENT_NM}(신청번호:${formData[relKey2]})`,
      TASK_SEQ: formData?.TASK_SEQ,
      WORK_SEQ: formData?.WORK_SEQ,
    });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const {
      sagaKey: id,
      reloadId,
      viewPageData,
      changeViewPage,
      deleteTask,
      isLoading,
      saveBeforeProcess,
      workSeq,
      profile,
      formData,
      prcId: PRC_ID,
    } = this.props;
    const { modalObj, processRule } = this.state;
    const customDeleteCallback = () => {
      const { viewPageData, setViewPageData, sagaKey: id, changeViewPage } = this.props;
      message.success(<MessageContent>야외행사 신청 정보를 삭제하였습니다.</MessageContent>);
      setViewPageData(id, workSeq, -1, 'MODIFY');
      changeViewPage(id, workSeq, -1, 'MODIFY');
    };

    return (
      <>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mt-20">
          {viewPageData.taskSeq !== -1 && (
            <>
              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => saveBeforeProcess(id, reloadId || id)} loading={isLoading}>
                저장
              </StyledButton>
              <Popconfirm
                title="Are you sure delete this task?"
                onConfirm={() => deleteTask(id, reloadId, viewPageData.workSeq, viewPageData.taskSeq, customDeleteCallback)}
                okText="Yes"
                cancelText="No"
              >
                <StyledButton className="btn-light btn-sm btn-first">삭제</StyledButton>
              </Popconfirm>
              {(formData?.APP_STATUS === '2A' || (formData?.APP_STATUS === '0' && formData?.REG_USER_ID === profile?.USER_ID)) && (
                <>
                  <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.saveProcessRule()}>
                    상신
                  </StyledButton>
                  <StyledButton
                    className="btn-gray btn-sm"
                    onClick={() =>
                      this.handleModal('결재선', true, [
                        <>
                          <CustomWorkProcess
                            processRule={processRule}
                            PRC_ID={PRC_ID}
                            draftId={formData?.APPROVAL_DRAFT_ID || -1}
                            viewType={formData?.APPROVAL_DRAFT_ID ? 'VIEW' : 'INPUT'}
                            setProcessRule={(_, prcRule) => this.setState({ tempProcessRule: prcRule })}
                          />
                          <StyledButtonWrapper className="btn-wrap-center btn-wrap-mb-10" style={{ paddingBottom: '10px' }}>
                            <StyledButton
                              className="btn-primary btn-sm btn-first"
                              onClick={() =>
                                this.setState(
                                  prevState => ({
                                    processRule: prevState.tempProcessRule,
                                  }),
                                  () => this.handleModal(),
                                )
                              }
                            >
                              저장
                            </StyledButton>
                            <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleModal()}>
                              닫기
                            </StyledButton>
                          </StyledButtonWrapper>
                        </>,
                      ])
                    }
                  >
                    결재선
                  </StyledButton>
                </>
              )}
            </>
          )}
        </StyledButtonWrapper>
        <AntdModal width={1000} visible={modalObj.visible} title={modalObj.title} onCancel={() => this.handleModal()} destroyOnClose footer={null}>
          {modalObj.content}
        </AntdModal>
      </>
    );
  }
}

export default CustomButtons;
