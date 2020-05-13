import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, message } from 'antd';

import { isJSON } from 'utils/helpers';
import WorkProcess from 'apps/Workflow/WorkProcess';
import Sketch from 'components/BizBuilder/Sketch';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import View from 'components/BizBuilder/PageComp/view';
import { WORKFLOW_OPT_SEQ, CHANGE_VIEW_OPT_SEQ } from 'components/BizBuilder/Common/Constants';
import { DefaultStyleInfo } from 'components/BizBuilder/DefaultStyleInfo';

// import Loadable from 'components/Loadable';
// import Loading from '../Common/Loading';

const StyledButton = StyledAntdButton(Button);

class CustomModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadFileList: [],
      StyledWrap: StyledViewDesigner,
    };
  }

  componentDidMount() {
    const { sagaKey: id, getProcessRule, workInfo, workPrcProps } = this.props;
    const isWorkflowUsed = !!(workInfo && workInfo.OPT_INFO && workInfo.OPT_INFO.findIndex(opt => opt.OPT_SEQ === WORKFLOW_OPT_SEQ) !== -1);
    const workflowOpt = workInfo && workInfo.OPT_INFO && workInfo.OPT_INFO.filter(opt => opt.OPT_SEQ === WORKFLOW_OPT_SEQ);
    const prcId = workflowOpt && workflowOpt.length > 0 ? workflowOpt[0].OPT_VALUE : -1;

    if (workInfo.BUILDER_STYLE_PATH) {
      // const StyledWrap = Loadable({
      //   loader: () => import(`commonStyled/${workInfo.BUILDER_STYLE_PATH}`),
      //   loading: Loading,
      // });
      const StyledWrap = DefaultStyleInfo(workInfo.BUILDER_STYLE_PATH);
      this.setState({ StyledWrap });
    }

    if (isWorkflowUsed && prcId !== -1) {
      const payload = {
        PRC_ID: Number(prcId),
        DRAFT_DATA: {
          ...workPrcProps,
        },
      };
      getProcessRule(id, payload);
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
    const { submitExtraHandler, formData, metaList, workInfo, processRule } = this.props;
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
    }
  };

  saveTask = (id, reloadId, callbackFunc) => {
    const { modifyTask, formData } = this.props;
    const condFileList = (formData && formData.condFileList) || [];
    if (condFileList.length) {
      this.condFileListMoveReal(condFileList);
    } else {
      modifyTask(id, reloadId, typeof callbackFunc === 'function' ? callbackFunc : this.saveTaskAfter);
    }
  };

  saveTaskAfter = (id, workSeq, taskSeq, formData) => {
    const { reloadId, onCloseModalHandler, changeViewPage, isBuilderModal, isSaveModalClose, changeBuilderModalStateByParent, workInfo } = this.props;
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
      changeViewPage(reloadId, workSeq, -1, 'LIST');
      if (isSaveModalClose) changeBuilderModalStateByParent(false, 'INPUT', -1, -1);
    }
  };

  condFileListMoveReal = condFileList => {
    const { sagaKey: id, getExtraApiData } = this.props;
    const param = { PARAM: { DETAIL: condFileList } };
    const apiArray = [
      {
        key: 'condRealFileList',
        type: 'POST',
        url: '/upload/moveFileToReal',
        params: param,
      },
    ];
    getExtraApiData(id, apiArray, this.condFileUploadComplete);
  };

  condFileUploadComplete = () => {
    const { sagaKey: id, extraApiData, formData, setFormData, modifyTask } = this.props;

    const condRealFileList = (extraApiData && extraApiData.condRealFileList && extraApiData.condRealFileList.DETAIL) || [];
    const condList = (formData && formData.condList) || [];
    setFormData(id, {
      ...formData,
      condList: condList.map((a, index) => {
        const key = condRealFileList.findIndex(c => index === c.targetIndex);
        return key > -1
          ? {
              ...a,
              APPROVE_FILE_SEQ: Number(condRealFileList[key].seq),
            }
          : a;
      }),
      condFileList: [],
    });
    this.saveTask(id, id, this.saveTaskAfter);
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
      isLoading,
      workInfo,
      CustomWorkProcess,
      reloadId,
      deleteTask,
    } = this.props;

    const { StyledWrap } = this.state;

    const isWorkflowUsed = !!(workInfo && workInfo.OPT_INFO && workInfo.OPT_INFO.findIndex(opt => opt.OPT_SEQ === WORKFLOW_OPT_SEQ) !== -1);
    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerData = JSON.parse(viewLayer[0].CONFIG).property || {};
      const { bodyStyle } = viewLayerData;
      const { PRC_ID } = processRule;
      return (
        <StyledWrap className={viewPageData.viewType}>
          <Sketch {...bodyStyle}>
            {isWorkflowUsed && processRule && processRule.DRAFT_PROCESS_STEP && processRule.DRAFT_PROCESS_STEP.length > 0 && (
              <WorkProcess id={id} CustomWorkProcess={CustomWorkProcess} PRC_ID={PRC_ID} processRule={processRule} setProcessRule={setProcessRule} />
            )}
            <View
              key={`${id}_${viewPageData.viewType}`}
              {...this.props}
              deleteTask={deleteTask}
              modifySaveTask={() => this.saveBeforeProcess(id, reloadId || id, this.saveTask)}
            />
            {ModifyCustomButtons ? (
              <ModifyCustomButtons modifySaveTask={this.saveBeforeProcess} {...this.props} />
            ) : (
              <div className="alignRight">
                <StyledButton className="btn-primary btn-first" onClick={() => this.saveBeforeProcess(id, reloadId || id, this.saveTask)} loading={isLoading}>
                  Save
                </StyledButton>
                {!isBuilderModal && (
                  <StyledButton className="btn-light" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'LIST')}>
                    List
                  </StyledButton>
                )}
              </div>
            )}
          </Sketch>
        </StyledWrap>
      );
    }
    return '';
  };
}

CustomModify.propTypes = {
  isLoading: PropTypes.bool,
  deleteTask: PropTypes.func,

  // loadingComplete: PropTypes.func,
};

CustomModify.defaultProps = {
  isLoading: false,
  deleteTask: () => {},

  // loadingComplete: () => {},
};

export default CustomModify;
