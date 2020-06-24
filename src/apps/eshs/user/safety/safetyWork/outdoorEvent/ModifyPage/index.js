import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, message, Modal, Input, Popconfirm } from 'antd';
import { isJSON } from 'utils/helpers';
import View from 'components/BizBuilder/PageComp/view';
import WorkProcess from 'apps/Workflow/WorkProcess';
import Sketch from 'components/BizBuilder/Sketch';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import BizBuilderBase from 'components/BizBuilderBase';
import MessageContent from 'components/Feedback/message.style2';
import { WORKFLOW_OPT_SEQ, CHANGE_VIEW_OPT_SEQ } from 'components/BizBuilder/Common/Constants';
import { DefaultStyleInfo } from 'components/BizBuilder/DefaultStyleInfo';

// 야외행사 수립 신청 - Modify 페이지 커스텀

const AntdModal = StyledContentsModal(Modal);
const StyledButton = StyledAntdButton(Button);
const AntdSearch = StyledSearchInput(Input.Search);

class ModifyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      uploadFileList: [],
      StyledWrap: StyledViewDesigner,
    };
  }

  componentDidMount() {
    const { sagaKey: id, getProcessRuleByModify, workInfo, workPrcProps, draftInfo } = this.props;
    const isWorkflowUsed = !!(workInfo && workInfo.OPT_INFO && workInfo.OPT_INFO.findIndex(opt => opt.OPT_SEQ === WORKFLOW_OPT_SEQ) !== -1);
    const workflowOpt = workInfo && workInfo.OPT_INFO && workInfo.OPT_INFO.filter(opt => opt.OPT_SEQ === WORKFLOW_OPT_SEQ);
    const prcId = workflowOpt && workflowOpt.length > 0 ? workflowOpt[0].OPT_VALUE : -1;

    if (workInfo.BUILDER_STYLE_PATH) {
      const StyledWrap = DefaultStyleInfo(workInfo.BUILDER_STYLE_PATH);
      this.setState({ StyledWrap });
    }

    if (isWorkflowUsed && prcId !== -1) {
      const payload = {
        PRC_ID: Number(prcId),
        DRAFT_INFO: draftInfo,
        DRAFT_DATA: {
          ...workPrcProps,
        },
      };
      getProcessRuleByModify(id, payload);
    }
  }

  fileUploadComplete = (id, response, etcData) => {
    const { formData, changeFormData } = this.props;
    const { DETAIL, code } = response;
    const selectedAttach = formData[etcData];
    const { uploadFileList } = this.state;
    const tmpAttach = { ...selectedAttach, DETAIL };
    changeFormData(id, etcData, tmpAttach);
    const tmpFileList = uploadFileList.map(file =>
      file.COMP_FIELD === etcData ? { ...file, isComplete: code === 200 || code === 300, isAttempted: true } : file,
    );
    this.setState({ uploadFileList: tmpFileList }, () => {
      const { uploadFileList } = this.state;

      let AttemptionCount = 0; // API 찌른 횟수
      let isCompleteCount = 0; // API 성공 횟수
      const limit = uploadFileList.length || 0; // 총 파일 갯수

      uploadFileList.forEach(e => {
        if (e.isAttempted === true) {
          // API 찌른 경우
          AttemptionCount++;
        }
        if (e.isComplete === true) {
          // API 성공 횟수
          isCompleteCount++;
        }
      });

      if (AttemptionCount === limit) {
        // 총 파일 갯수만큼 API를 찔렀는지
        if (isCompleteCount === limit) {
          // 총 파일 갯수만큼 API 정상 작동했는지
          this.saveTask(id, id, this.saveTaskAfter);
        } else {
          message.error('file upload 에러 발생 , 관리자에게 문의 바랍니다.!');
        }
      }
    });
  };

  filterAttach = field => {
    const config = JSON.parse(field.CONFIG);
    return config.info && config.info.isAttach;
  };

  saveBeforeProcess = (id, reloadId, callBackFunc) => {
    const { submitExtraHandler, formData, metaList, workInfo, processRule, changeIsLoading } = this.props;
    changeIsLoading(true);
    const { uploadFileList } = this.state;
    const { OPT_INFO } = workInfo;
    // workflow 결재 체크 하기
    const IsWorkProcess = OPT_INFO.filter(f => f.OPT_SEQ === WORKFLOW_OPT_SEQ);
    let isByPass = true;
    // eslint-disable-next-line no-unused-expressions
    IsWorkProcess &&
      IsWorkProcess.forEach(opt => {
        if (opt.ISUSED === 'Y') {
          // workProces validation check
          const { DRAFT_PROCESS_STEP } = processRule;
          const ruleCheckList = DRAFT_PROCESS_STEP.filter(rule => rule.ISREQUIRED === 1);
          ruleCheckList.forEach(rule => {
            if (rule.APPV_MEMBER.length === 0) {
              isByPass = false;
              message.error(`${rule.NODE_NAME_KOR} 단계의 결재를 선택해 주세요`);
            }
          });
        }
      });
    if (isByPass) {
      const attachList = metaList && metaList.filter(mata => this.filterAttach(mata));
      // 첨부파일이 없는 경우 체크
      const isUploadByPass = attachList.filter(f => formData[f.COMP_FIELD]);
      if (isUploadByPass && isUploadByPass.length === 0) {
        this.saveTask(id, reloadId, this.saveTaskAfter);
      } else {
        attachList.map(attachItem => {
          const { COMP_FIELD } = attachItem;
          const attachInfo = formData[COMP_FIELD];
          if (attachInfo) {
            const { DETAIL, MOVEFILEAPI } = attachInfo;
            uploadFileList.push({ COMP_FIELD, isComplete: false, isAttempted: false });
            this.setState({ uploadFileList }, () => {
              const param = { PARAM: { DETAIL } };
              const moveFileApi = MOVEFILEAPI || '/upload/moveFileToReal';
              submitExtraHandler(id, 'POST', moveFileApi, param, this.fileUploadComplete, COMP_FIELD);
            });
          }
        });
      }
    } else {
      changeIsLoading(false);
    }
  };

  saveTask = (id, reloadId, callbackFunc) => {
    const { modifyTask, changeIsLoading, reloadViewType } = this.props;
    modifyTask(id, reloadId, typeof callbackFunc === 'function' ? callbackFunc : this.saveTaskAfter, changeIsLoading, reloadViewType);
  };

  saveTaskAfter = (id, workSeq, taskSeq, formData) => {
    const {
      reloadId,
      onCloseModalHandler,
      changeViewPage,
      isBuilderModal,
      isSaveModalClose,
      changeBuilderModalStateByParent,
      workInfo,
      changeIsLoading,
      reloadViewType,
      reloadTaskSeq,
    } = this.props;
    message.success(<MessageContent>야외행사 신청서를 수정하였습니다.</MessageContent>);
    if (typeof onCloseModalHandler === 'function') {
      onCloseModalHandler();
    }
    if (typeof changeViewPage === 'function') {
      const changeViewOptIdx = workInfo.OPT_INFO.findIndex(opt => opt.OPT_SEQ === CHANGE_VIEW_OPT_SEQ);
      if (changeViewOptIdx !== -1) {
        const changeViewOpt = workInfo.OPT_INFO[changeViewOptIdx];
        const optValue = JSON.parse(changeViewOpt.OPT_VALUE);
        changeViewPage(id, workSeq, taskSeq, optValue.MODIFY);
      } else {
        changeViewPage(id, workSeq, taskSeq, 'VIEW');
      }
    }
    if (isBuilderModal) {
      changeViewPage(
        reloadId,
        workSeq,
        reloadId && reloadViewType && reloadTaskSeq ? reloadTaskSeq : -1,
        reloadId && reloadViewType && reloadTaskSeq ? reloadViewType : 'LIST',
      );
      if (isSaveModalClose) changeBuilderModalStateByParent(false, 'INPUT', -1, -1);
    }
    changeIsLoading(false);
  };

  // 야외행사 신청번호 찾기 모달 핸들러
  searchModalHandler = bool => {
    this.setState({
      modalVisible: bool,
    });
  };

  // 커스텀 로우 온 클릭
  customRowOnclick = record => {
    const { viewPageData, setViewPageData, sagaKey: id, changeViewPage } = this.props;
    this.setState(
      {
        modalVisible: false,
      },
      () => {
        setViewPageData(id, record.WORK_SEQ, record.TASK_SEQ, 'MODIFY');
        changeViewPage(id, record.WORK_SEQ, record.TASK_SEQ, 'MODIFY');
      },
    );
  };

  resetFormData = () => {
    const { sagaKey: id, workSeq, setViewPageData, changeViewPage } = this.props;
    setViewPageData(id, workSeq, -1, 'INPUT');
    changeViewPage(id, workSeq, -1, 'INPUT');
  };

  deleteCallback = () => {
    const { sagaKey: id, workSeq, setViewPageData, changeViewPage } = this.props;
    message.success(<MessageContent>야외행사 신청서를 삭제하였습니다.</MessageContent>);
    setViewPageData(id, workSeq, -1, 'INPUT');
    changeViewPage(id, workSeq, -1, 'INPUT');
  };

  render = () => {
    const {
      sagaKey: id,
      viewLayer,
      workFlowConfig,
      processRule,
      setProcessRule,
      viewPageData,
      changeViewPage,
      isBuilderModal,
      ModifyCustomButtons,
      workInfo,
      CustomWorkProcess,
      CustomWorkProcessModal,
      reloadId,
      formData,
      deleteTask,
      workSeq,
      taskSeq,
    } = this.props;

    const { StyledWrap, modalVisible } = this.state;

    const isWorkflowUsed = !!(workInfo && workInfo.OPT_INFO && workInfo.OPT_INFO.findIndex(opt => opt.OPT_SEQ === WORKFLOW_OPT_SEQ) !== -1);
    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerData = JSON.parse(viewLayer[0].CONFIG).property || {};
      const { bodyStyle } = viewLayerData;
      const { PRC_ID } = processRule;
      return (
        <>
          <StyledWrap className={viewPageData.viewType}>
            <Sketch {...bodyStyle}>
              <StyledCustomSearchWrapper>
                <div className="search-input-area">
                  <span className="text-label">신청번호</span>
                  <AntdSearch
                    className="ant-search-inline input-search-mid mr5"
                    onClick={() => this.searchModalHandler(true)}
                    onSearch={() => this.searchModalHandler(true)}
                    value={(formData.DOC_NO && formData.DOC_NO) || ''}
                    style={{ width: '200px' }}
                  />
                </div>
              </StyledCustomSearchWrapper>
              <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
                <StyledButton className="btn-primary mr5 btn-sm" onClick={() => this.saveBeforeProcess(id, reloadId || id, this.saveTask)}>
                  저장
                </StyledButton>
                <StyledButton className="btn-primary btn-sm mr5" onClick={() => this.resetFormData()}>
                  초기화
                </StyledButton>
                <Popconfirm
                  title="정말 삭제하시겠습니까?"
                  onConfirm={() => deleteTask(id, reloadId, workSeq, changeViewPage, this.deleteCallback)}
                  okText="Yes"
                  cancelText="No"
                >
                  <StyledButton className="btn-light mr5 btn-sm">삭제</StyledButton>
                </Popconfirm>
              </StyledButtonWrapper>
              {isWorkflowUsed && processRule && processRule.DRAFT_PROCESS_STEP && processRule.DRAFT_PROCESS_STEP.length > 0 && (
                <WorkProcess
                  id={id}
                  CustomWorkProcess={CustomWorkProcess}
                  CustomWorkProcessModal={CustomWorkProcessModal}
                  PRC_ID={PRC_ID}
                  processRule={processRule}
                  setProcessRule={setProcessRule}
                />
              )}
              <View key={`${id}_${viewPageData.viewType}`} {...this.props} saveBeforeProcess={this.saveBeforeProcess} />
              {ModifyCustomButtons ? (
                <ModifyCustomButtons saveBeforeProcess={this.saveBeforeProcess} {...this.props} />
              ) : (
                <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
                  <StyledButton className="btn-primary mr5 btn-sm" onClick={() => this.saveBeforeProcess(id, reloadId || id, this.saveTask)}>
                    저장
                  </StyledButton>
                  {!isBuilderModal && (
                    <StyledButton className="btn-light btn-sm" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'LIST')}>
                      목록
                    </StyledButton>
                  )}
                </StyledButtonWrapper>
              )}
            </Sketch>
          </StyledWrap>
          <AntdModal
            title="야외행사 신청 리스트"
            width="90%"
            destroyOnClose
            visible={modalVisible}
            footer={null}
            onOk={() => this.searchModalHandler(false)}
            onCancel={() => this.searchModalHandler(false)}
          >
            {modalVisible && (
              <BizBuilderBase
                sagaKey="outdoorEvent_search"
                viewType="LIST"
                workSeq={4821}
                ListCustomButtons={() => <></>}
                customOnRowClick={this.customRowOnclick}
              />
            )}
          </AntdModal>
        </>
      );
    }
    return '';
  };
}

ModifyPage.propTypes = {
  isLoading: PropTypes.bool,
  formData: PropTypes.object,
  viewPageData: PropTypes.object,
  // loadingComplete: PropTypes.func,
};

ModifyPage.defaultProps = {
  isLoading: false,
  // loadingComplete: () => {},
};

export default ModifyPage;
