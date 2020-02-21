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
    };
  }

  componentDidMount() {
    const { sagaKey: id, getProcessRule, workFlowConfig, workPrcProps, changeFormData, category, year, month } = this.props;

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
    changeFormData(id, 'CATEGORY', category);
    if (parseInt(month, 10) >= 12) {
      changeFormData(id, 'CHK_DATE', `${parseInt(year, 10) + 1}/01`);
      // changeFormData(id, 'CHK_YEAR', `${parseInt(year, 10) + 1}/1`);
      // changeFormData(id, 'CHK_MONTH', 1);
    } else {
      changeFormData(id, 'CHK_DATE', `${year}/${parseInt(month, 10) + 1}`);
      // changeFormData(id, 'CHK_YEAR', year);
      // changeFormData(id, 'CHK_MONTH', parseInt(month, 10) + 1);
    }

    console.debug(this.props.formData);
  }

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
    const { onCloseModleHandler, changeViewPage, baseSagaKey } = this.props;
    if (typeof onCloseModleHandler === 'function') {
      onCloseModleHandler();
      changeViewPage(baseSagaKey, workSeq, -1, 'LIST');
    }
  };

  handleOnSaveTask = () => {
    const { sagaKey: id, changeFormData, saveTask } = this.props;
    changeFormData(id, 'VALUE', '');
    changeFormData(id, 'STIE', 'C1');
    saveTask(id, id);
    changeFormData(id, 'TASK_SEQ', -1);
    changeFormData(id, 'SITE', 'H3');
    changeFormData(id, 'VALUE', '');
    this.saveTask(id, id);
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
    } = this.props;
    console.debug(this.props.year, this.props.month);
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
            {isWorkflowUsed &&
              PRC_ID !== -1 &&
              (typeof CustomWorkProcess === 'function' ? (
                <CustomWorkProcess id={id} PRC_ID={PRC_ID} processRule={processRule} setProcessRule={setProcessRule} />
              ) : (
                <WorkProcess id={id} PRC_ID={PRC_ID} processRule={processRule} setProcessRule={setProcessRule} />
              ))}

            <View key={`${id}_${viewPageData.viewType}`} {...this.props} />
            <div className="alignRight">
              <StyledButton className="btn-primary" onClick={() => this.saveTask(id, id)}>
                저장
              </StyledButton>
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
  year: PropTypes.string,
  month: PropTypes.string,
  changeFormData: PropTypes.func,
};

InputPage.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
};

export default InputPage;
