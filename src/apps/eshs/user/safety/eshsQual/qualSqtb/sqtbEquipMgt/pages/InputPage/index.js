import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import { isJSON } from 'utils/helpers';
import WorkProcess from 'apps/Workflow/WorkProcess';
import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import View from 'components/BizBuilder/PageComp/view';
import { WORKFLOW_OPT_SEQ } from 'components/BizBuilder/Common/Constants';
import Material from '../Material';
import InterLock from '../InterLock';
import Header from '../Header';

class InputPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { onCloseModalHandler, changeViewPage, isBuilderModal, reloadId, isSaveModalClose, changeBuilderModalStateByParent } = this.props;
    if (typeof onCloseModalHandler === 'function') {
      onCloseModalHandler();
    }
    if (typeof changeViewPage === 'function') {
      changeViewPage(id, workSeq, taskSeq, 'MODIFY');
    }
    if (isBuilderModal) {
      changeViewPage(reloadId, workSeq, -1, 'LIST');
      if (isSaveModalClose) changeBuilderModalStateByParent(false, 'INPUT', -1, -1);
    }
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
      workInfo,
      CustomWorkProcess,
      reloadId,
      isBuilderModal,
      isLoading,
      CustomButtons,
      formData,
      changeFormData,
      getExtraApiData,
      extraApiData,
      handleModalVisible,
      modalSelectedRow,
    } = this.props;
    // Work Process 사용여부
    const isWorkflowUsed = !!(workInfo && workInfo.OPT_INFO && workInfo.OPT_INFO.findIndex(opt => opt.OPT_SEQ === WORKFLOW_OPT_SEQ) !== -1);
    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerData = JSON.parse(viewLayer[0].CONFIG).property || {};
      const { bodyStyle } = viewLayerData;
      const {
        info: { PRC_ID },
      } = workFlowConfig;
      return (
        <StyledViewDesigner>
          <Sketch {...bodyStyle}>
            {isWorkflowUsed && PRC_ID && processRule && processRule.DRAFT_PROCESS_STEP && processRule.DRAFT_PROCESS_STEP.length > 0 && (
              <WorkProcess id={id} CustomWorkProcess={CustomWorkProcess} PRC_ID={PRC_ID} processRule={processRule} setProcessRule={setProcessRule} />
            )}
            <Header
              handleModalVisible={handleModalVisible}
              modalSelectedRow={modalSelectedRow}
              saveTask={() => this.saveBeforeProcess(id, reloadId || id, this.saveTask)}
              loading={isLoading}
              viewPageData={viewPageData}
              changeViewPage={changeViewPage}
              id={id}
            />
            <View key={`${id}_${viewPageData.viewType}`} {...this.props} />
            <InterLock
              id={id}
              formData={formData}
              changeFormData={changeFormData}
              getExtraApiData={getExtraApiData}
              extraApiData={extraApiData}
              viewPageData={viewPageData}
            />
            <Material
              id={id}
              formData={formData}
              changeFormData={changeFormData}
              getExtraApiData={getExtraApiData}
              extraApiData={extraApiData}
              viewPageData={viewPageData}
            />
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
  onCloseModalHandler: PropTypes.func,
  saveTask: PropTypes.func,
  setProcessRule: PropTypes.func,
  CustomWorkProcess: PropTypes.func,
  isLoading: PropTypes.bool,
  handleModalVisible: PropTypes.func,
  modalSelectedRow: PropTypes.object,
  searchListId: PropTypes.string,
  saveTaskAfterCallbackFunc: PropTypes.any,
};

InputPage.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
  handleModalVisible: () => {},
  CustomWorkProcess: undefined,
  isLoading: false,
  modalSelectedRow: {},
  searchListId: 'SqtbSearchList',
  saveTaskAfterCallbackFunc: undefined,
};

export default InputPage;
