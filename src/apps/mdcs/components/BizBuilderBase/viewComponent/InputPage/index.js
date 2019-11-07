import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import Loadable from 'react-loadable';

import { isJSON } from 'utils/helpers';
import WorkProcess from 'apps/WorkFlow/WorkProcess';
import { CompInfo } from '../../CompInfo';

import Styled from './Styled';

class InputPage extends Component {
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

  // state값 reset테스트
  componentWillUnmount() {
    const { removeReduxState, id } = this.props;
    removeReduxState(id);
  }

  saveTaskAfter = (id, taskSeq, formData) => {
    const { onCloseModleHandler } = this.props;
    if (typeof onCloseModleHandler === 'function') {
      onCloseModleHandler();
    }
  };

  renderCol = (col, colData) => {
    const { changeFormData, id, changeValidationData, getExtraApiData, extraApiData, formData, compProps } = this.props;
    if (col.CONFIG.property.COMP_SRC && col.CONFIG.property.COMP_SRC.length > 0 && CompInfo[col.CONFIG.property.COMP_SRC]) {
      return CompInfo[col.CONFIG.property.COMP_SRC].renderer({
        ...col,
        colData,
        changeFormData,
        id,
        saveTask: this.saveTask,
        changeValidationData,
        getExtraApiData,
        extraApiData,
        formData,
        compProps,
      });
      // const Comp = Loadable({
      //   loader: () => import(`apps/mdcs/components/BizBuilderBase/viewComponet/Comp/${col.CONFIG.property.COMP_SRC}`),
      //   loading: () => null,
      // });
      // return (
      //   <Comp
      //     key={`bizBuilderBase_Input_${col.CONFIG.property.COMP_FIELD}`}
      //     {...col}
      //     colData={colData}
      //     changeFormData={changeFormData}
      //     id={id}
      //     saveTask={this.saveTask}
      //     changeValidationData={changeValidationData}
      //     getExtraApiData={getExtraApiData}
      //     extraApiData={extraApiData}
      //     formData={formData}
      //   />
      // );
    }
    return `component!!!`;
  };

  render = () => {
    const { id, viewLayer, formData, workFlowConfig, processRule, setProcessStep } = this.props;
    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerList = JSON.parse(viewLayer[0].CONFIG).property.layer || [];

      const {
        info: { PRC_ID },
      } = workFlowConfig;

      return (
        <Styled>
          <div className="pop_tit">업무표준</div>
          <div className="pop_con">
            <div className="sub_form">
              <div className="tableBody">
                {PRC_ID !== -1 && <WorkProcess id={id} PRC_ID={PRC_ID} processRule={processRule} setProcessStep={setProcessStep} />}
                {viewLayerList.length > 0 &&
                  viewLayerList.map((row, rowIdx) => (
                    <Row key={`BizBuilderBaseRow_${rowIdx}`}>
                      {row.length > 0 &&
                        row.map((col, colIdx) => (
                          <Col
                            span={col.CONFIG.property.span}
                            style={col.CONFIG.property.style || {}}
                            className={col.CONFIG.property.className || ''}
                            key={`BizBuilderBaseCol_${rowIdx}_${colIdx}`}
                          >
                            {this.renderCol(col, col.CONFIG.property.COMP_FIELD ? formData[col.CONFIG.property.COMP_FIELD] : '')}
                          </Col>
                        ))}
                    </Row>
                  ))}
              </div>
            </div>
          </div>
        </Styled>
      );
    }
    return '';
  };
}

InputPage.propTypes = {
  id: PropTypes.string,
  workFlowConfig: PropTypes.object,
  workPrcProps: PropTypes.object,
  viewLayer: PropTypes.array,
  formData: PropTypes.object,
  processRule: PropTypes.object,
  getProcessRule: PropTypes.func,
  onCloseModleHandler: PropTypes.func,
  saveTask: PropTypes.func,
  setProcessStep: PropTypes.func,
};

InputPage.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
};

export default InputPage;
