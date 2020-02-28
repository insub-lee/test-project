import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isJSON } from 'utils/helpers';
import WorkProcess from 'apps/Workflow/WorkProcess';
import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import View from 'components/BizBuilder/PageComp/view';
import { WORKFLOW_OPT_SEQ } from 'components/BizBuilder/Common/Constants';

class StdInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
      isUploadDataComplete: false,
      uploadFileList: [],
    };
  }

  componentDidMount() {
    const { sagaKey: id, getProcessRule, workInfo, workPrcProps } = this.props;

    const isWorkflowUsed = !!(workInfo && workInfo.OPT_INFO && workInfo.OPT_INFO.findIndex(opt => opt.OPT_SEQ === WORKFLOW_OPT_SEQ) !== -1);
    const workflowOpt = workInfo && workInfo.OPT_INFO && workInfo.OPT_INFO.filter(opt => opt.OPT_SEQ === WORKFLOW_OPT_SEQ);
    const prcId = workflowOpt && workflowOpt.length > 0 ? workflowOpt[0].OPT_VALUE : -1;
    console.debug('inputcomponentDidMount', this.props);
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
    const { DETAIL } = response;
    const { ATTACH } = formData;
    const { uploadFileList } = this.state;
    const tmpAttach = { ...ATTACH, DETAIL };
    console.debug('complete file', etcData, response);
    changeFormData(id, etcData, tmpAttach);
    const tmpFileList = uploadFileList.map(file => (file.COMP_FIELD === etcData ? { ...file, isComplete: true } : file));
    this.setState({ uploadFileList: tmpFileList }, () => {
      const { uploadFileList } = this.state;
      const isUploadComplete = uploadFileList.find(f => f.isComplete === false);
      console.debug('isUploadComplete', isUploadComplete);
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
  };

  saveTask = (id, reloadId, callbackFunc) => {
    const { saveTask } = this.props;
    saveTask(id, reloadId, typeof callbackFunc === 'function' ? callbackFunc : this.saveTaskAfter);
  };

  saveTaskAfter = (id, workSeq, taskSeq, formData) => {
    const { onCloseModleHandler, changeViewPage, sagaKey, redirectUrl } = this.props;
    if (typeof onCloseModleHandler === 'function') {
      onCloseModleHandler();
    }
    if (typeof changeViewPage === 'function') {
      // changeViewPage(id, workSeq, taskSeq, 'VIEW');
      // page 이동
      redirectUrl(sagaKey, '/apps/Workflow/User/ApproveBase/draft');
    }
  };

  render() {
    console.debug(this.state);

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
      onCloseModal,
    } = this.props;

    // Work Process 사용여부
    const isWorkflowUsed = !!(workInfo && workInfo.OPT_INFO && workInfo.OPT_INFO.findIndex(opt => opt.OPT_SEQ === WORKFLOW_OPT_SEQ) !== -1);
    const workflowOpt = workInfo && workInfo.OPT_INFO && workInfo.OPT_INFO.filter(opt => opt.OPT_SEQ === WORKFLOW_OPT_SEQ);
    const prcId = workflowOpt && workflowOpt.length > 0 ? workflowOpt[0].OPT_VALUE : -1;
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
              <WorkProcess id={id} PRC_ID={prcId} CustomWorkProcess={CustomWorkProcess} processRule={processRule} setProcessRule={setProcessRule} />
            )}
            <View key={`${id}_${viewPageData.viewType}`} {...this.props} />
            <div style={{ textAlign: 'right' }}>
              <StyledButton className="btn-primary btn-first" onClick={() => this.saveBeforeProcess(id, id, this.saveTask)}>
                Save
              </StyledButton>
              <StyledButton className="btn-primary" onClick={() => onCloseModal()}>
                닫기
              </StyledButton>
            </div>
          </Sketch>
        </StyledViewDesigner>
      );
    }
    return '';
  }
}

StdInput.propTypes = {
  sagaKey: PropTypes.string.isRequired,
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
};

StdInput.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
};

export default StdInput;
