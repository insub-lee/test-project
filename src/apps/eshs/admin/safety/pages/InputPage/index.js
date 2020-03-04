import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';

import { isJSON } from 'utils/helpers';
import WorkProcess from 'apps/Workflow/WorkProcess';
import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import View from 'components/BizBuilder/PageComp/view';
import { WORKFLOW_OPT_SEQ } from 'components/BizBuilder/Common/Constants';

function InputPage(props) {
  useEffect(() => {
    const { sagaKey: id, getProcessRule, workFlowConfig, workPrcProps } = props;
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
  }, []);

  const saveTask = (id, reloadId) => {
    const { saveTask, saveTaskAfterCallbackFunc } = props;
    saveTask(id, reloadId, typeof saveTaskAfterCallbackFunc === 'function' ? saveTaskAfterCallbackFunc : saveTaskAfter);
  };

  // state값 reset테스트
  // componentWillUnmount() {
  //   const { removeReduxState, id } = props;
  //   removeReduxState(id);
  // }

  const saveTaskAfter = (id, workSeq, taskSeq, formData) => {
    const { onCloseModleHandler, changeViewPage, baseSagaKey } = props;
    if (typeof onCloseModleHandler === 'function') {
      onCloseModleHandler();
      changeViewPage(baseSagaKey, workSeq, -1, 'LIST');
    }
  };

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
  } = props;
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
          {isWorkflowUsed &&
            PRC_ID !== -1 &&
            (typeof CustomWorkProcess === 'function' ? (
              <CustomWorkProcess id={id} PRC_ID={PRC_ID} processRule={processRule} setProcessRule={setProcessRule} />
            ) : (
              <WorkProcess id={id} PRC_ID={PRC_ID} processRule={processRule} setProcessRule={setProcessRule} />
            ))}
          <View key={`${id}_${viewPageData.viewType}`} {...props} />
          <div className="alignRight">
            <StyledButton className="btn-primary" onClick={() => props.onCloseModleHandler()}>
              나가기
            </StyledButton>
            <StyledButton className="btn-primary" onClick={() => saveTask(id, id)}>
              저장
            </StyledButton>
          </div>
        </Sketch>
      </StyledViewDesigner>
    );
  }
  return '';
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
};

InputPage.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
};

export default InputPage;
