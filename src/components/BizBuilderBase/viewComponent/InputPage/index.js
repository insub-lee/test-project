import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isJSON } from 'utils/helpers';
import WorkProcess from 'apps/Workflow/WorkProcess';
import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import View from 'components/BizBuilder/PageComp/view';
import { WORKFLOW_OPT_SEQ } from 'components/BizBuilder/Common/Constants';

class InputPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
      uploadFileList: [],
    };
  }

  componentDidMount() {
    const { sagaKey: id, getProcessRule, workFlowConfig, workPrcProps } = this.props;
    const {
      info: { PRC_ID },
    } = workFlowConfig;
    if (PRC_ID !== -1) {
      const payload = {
        PRC_ID,
        DRAFT_DATA: {
          ...workPrcProps,
        },
      };
      getProcessRule(id, payload);
    }
  }

  fileUploadComplete = (id, response, etcData) => {
    const { formData, changeFormData } = this.props;
    const { DETAIL } = response;
    const selectedAttach = formData[etcData];
    const { uploadFileList } = this.state;
    const tmpAttach = { ...selectedAttach, DETAIL };
    changeFormData(id, etcData, tmpAttach);
    const tmpFileList = uploadFileList.map(file => (file.COMP_FIELD === etcData ? { ...file, isComplete: true } : file));
    this.setState({ uploadFileList: tmpFileList }, () => {
      const { uploadFileList } = this.state;
      const isUploadComplete = uploadFileList.find(f => f.isComplete === false);
      if (!isUploadComplete) {
        this.saveTask(id, id, this.saveTaskAfter);
      }
    });
  };

  filterAttach = field => {
    const config = JSON.parse(field.CONFIG);
    return config.info && config.info.isAttach;
  };

  saveBeforeProcess = (id, reloadId, callBackFunc) => {
    const { submitExtraHandler, formData, metaList } = this.props;
    const moveFileApi = '/upload/moveFileToReal';
    const { uploadFileList } = this.state;
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
          const { DETAIL } = attachInfo;
          uploadFileList.push({ COMP_FIELD, isComplete: false });
          this.setState({ uploadFileList }, () => {
            const param = { PARAM: { DETAIL } };
            submitExtraHandler(id, 'POST', moveFileApi, param, this.fileUploadComplete, COMP_FIELD);
          });
        }
      });
    }
  };

  saveTask = (id, reloadId) => {
    const { saveTask, saveTaskAfterCallbackFunc } = this.props;
    saveTask(id, reloadId, typeof saveTaskAfterCallbackFunc === 'function' ? saveTaskAfterCallbackFunc : this.saveTaskAfter);
  };

  // state값 reset테스트
  // componentWillUnmount() {
  //   const { removeReduxState, id } = this.props;
  //   removeReduxState(id);
  // }

  saveTaskAfter = (id, workSeq, taskSeq, formData) => {
    const { onCloseModleHandler, changeViewPage, isBuilderModal, reloadId } = this.props;
    if (typeof onCloseModleHandler === 'function') {
      onCloseModleHandler();
    }
    if (typeof changeViewPage === 'function') {
      changeViewPage(id, workSeq, taskSeq, 'VIEW');
    }
    if (isBuilderModal) {
      changeViewPage(reloadId, workSeq, -1, 'LIST');
    }
  };

  render = () => {
    const {
      sagaKey: id,
      viewLayer,
      workFlowConfig,
      processRule,
      setProcessRule,
      loadingComplete,
      viewPageData,
      changeViewPage,
      workInfo,
      CustomWorkProcess,
      reloadId,
      isBuilderModal,
    } = this.props;

    // Work Process 사용여부
    const isWorkflowUsed = !!(workInfo && workInfo.OPT_INFO && workInfo.OPT_INFO.findIndex(opt => opt.OPT_SEQ === WORKFLOW_OPT_SEQ) !== -1);
    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerData = JSON.parse(viewLayer[0].CONFIG).property || {};
      const { bodyStyle } = viewLayerData;
      const {
        info: { PRC_ID },
      } = workFlowConfig;

      // 로딩
      if (this.props.isLoading === false && this.state.initLoading) {
        this.setState(
          {
            initLoading: false,
          },
          () => loadingComplete(),
        );
      }
      return (
        <StyledViewDesigner>
          <Sketch {...bodyStyle}>
            {isWorkflowUsed && PRC_ID && processRule && processRule.DRAFT_PROCESS_STEP && processRule.DRAFT_PROCESS_STEP.length > 0 && (
              <WorkProcess id={id} CustomWorkProcess={CustomWorkProcess} PRC_ID={PRC_ID} processRule={processRule} setProcessRule={setProcessRule} />
            )}
            <View key={`${id}_${viewPageData.viewType}`} {...this.props} />
            <div className="alignRight">
              <StyledButton className="btn-primary" onClick={() => this.saveBeforeProcess(id, reloadId || id, this.saveTask)}>
                Save
              </StyledButton>
              {!isBuilderModal && (
                <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'LIST')}>
                  List
                </StyledButton>
              )}
            </div>
          </Sketch>
        </StyledViewDesigner>
      );
    }
    return '';
  };
}

InputPage.propTypes = {
  sagaKey: PropTypes.string,
  workFlowConfig: PropTypes.object,
  workPrcProps: PropTypes.object,
  viewLayer: PropTypes.array,
  formData: PropTypes.object,
  processRule: PropTypes.object,
  getProcessRule: PropTypes.func,
  onCloseModleHandler: PropTypes.func,
  saveTask: PropTypes.func,
  setProcessRule: PropTypes.func,
  isLoading: PropTypes.bool,
  loadingComplete: PropTypes.func,
  CustomWorkProcess: PropTypes.func,
};

InputPage.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
  loadingComplete: () => {},
  CustomWorkProcess: undefined,
};

export default InputPage;
