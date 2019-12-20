import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isJSON } from 'utils/helpers';
import WorkProcess from 'apps/Workflow/WorkProcess';
import Sketch from 'components/BizBuilder/Sketch';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import View from 'components/BizBuilder/PageComp/view';

class StdInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
    };
  }

  componentDidMount() {
    const { id, getProcessRule, workFlowConfig, workPrcProps } = this.props;
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

  saveTask = (id, reloadId, callbackFunc) => {
    const { saveTask } = this.props;
    saveTask(id, reloadId, typeof callbackFunc === 'function' ? callbackFunc : this.saveTaskAfter);
  };

  saveTaskAfter = (id, workSeq, taskSeq, formData) => {
    const { onCloseModleHandler, changeViewPage } = this.props;
    if (typeof onCloseModleHandler === 'function') {
      onCloseModleHandler();
    }
    if (typeof changeViewPage === 'function') {
      changeViewPage(id, workSeq, taskSeq, 'VIEW');
    }
  };

  render = () => {
    const { id, viewLayer, workFlowConfig, processRule, setProcessRule, loadingComplete, viewPageData, changeViewPage, workInfo, onCloseModal } = this.props;
    // Work Process 사용여부
    const isWorkflowUsed = !!(workInfo && workInfo.OPT_INFO && workInfo.OPT_INFO.findIndex(opt => opt.OPT_SEQ === 0) !== -1);
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
            {isWorkflowUsed && PRC_ID !== -1 && <WorkProcess id={id} PRC_ID={PRC_ID} processRule={processRule} setProcessRule={setProcessRule} />}
            <View key={`${id}_${viewPageData.viewType}`} {...this.props} />
            <div style={{ textAlign: 'right' }}>
              <StyledButton className="btn-primary" onClick={() => this.saveTask(id, id, this.saveTaskAfter)}>
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
  };
}

StdInput.propTypes = {
  id: PropTypes.string,
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
