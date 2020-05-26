import React, { Component } from 'react';
import { Row, Col } from 'antd';
// import Loadable from 'react-loadable';
import { isJSON } from 'utils/helpers';
import { CompInfo } from '../../CompInfo';

import Styled from './Styled';

class ModifyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
    };
  }

  componentDidMount() {
    const { revisionTask, id, workSeq, taskSeq, getProcessRuleByModify, workFlowConfig, workPrcProps } = this.props;
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
      getProcessRuleByModify(id, payload);
    }
    revisionTask(id, workSeq, taskSeq);
  }

  // state값 reset테스트
  componentWillUnmount() {
    const { removeReduxState, id } = this.props;
    removeReduxState(id);
  }

  saveTask = (id, reloadId, callbackFunc) => {
    const { saveTask } = this.props;
    saveTask(id, reloadId, typeof callbackFunc === 'function' ? callbackFunc : this.saveTaskAfter);
  };

  saveTaskAfter = (id, taskSeq, formData) => {
    const { onCloseModalHandler } = this.props;
    if (typeof onCloseModalHandler === 'function') {
      onCloseModalHandler();
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
      //   loader: () => import(`apps/mdcs/components/BizBuilderBase/viewComponent/Comp/${col.CONFIG.property.COMP_SRC}`),
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
      //     compProps={compProps}
      //   />
      // );
    }
    return `component!!!`;
  };

  render = () => {
    const { viewLayer, formData, loadingComplete } = this.props;

    // 로딩
    if (this.props.isLoading === false && this.state.initLoading) {
      this.setState(
        {
          initLoading: false,
        },
        () => loadingComplete(),
      );
    }

    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG) && formData) {
      const viewLayerList = JSON.parse(viewLayer[0].CONFIG).property.layer || [];
      return (
        <Styled>
          <div className="pop_con">
            <div className="sub_form">
              <div className="tableBody">
                {viewLayerList.length > 0 &&
                  viewLayerList.map((row, rowIdx) => (
                    <Row key={`BizBuilderBaseRow_${rowIdx}`}>
                      {row.length > 0 &&
                        row.map((col, colIdx) => (
                          <Col span={col.CONFIG.property.span} key={`BizBuilderBaseCol_${rowIdx}_${colIdx}`}>
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

export default ModifyPage;
