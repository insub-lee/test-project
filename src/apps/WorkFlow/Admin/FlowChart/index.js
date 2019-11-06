import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';
import GGEditor, { Flow, withPropsAPI, RegisterEdge } from 'gg-editor';
import BizMicroDevBase from 'components/BizMicroDevBase';
import { FlowContextMenu } from './components/EditorContextMenu';
import { FlowToolbar } from './components/EditorToolbar';
import { FlowItemPanel } from './components/EditorItemPanel';
import { FlowDetailPanel } from './components/EditorDetailPanel';
import EditorActionPanel from './components/EditorActionPanel';
import styles from './index.module.scss';

class FlowPage extends Component {
  componentDidMount() {
    const { getCallDataHanlder, apiArray, id, PRC_ID } = this.props;
    const designInfo = {
      key: 'designInfo',
      url: '/api/workflow/v1/common/process/getprocessdesign',
      type: 'POST',
      params: { PARAM: { PRC_ID } },
    };
    apiArray.push(designInfo);
    getCallDataHanlder(id, apiArray);
  }

  onSaveComplete = fid => {
    const { getCallDataHanlder, apiArray } = this.props;
    getCallDataHanlder(fid, apiArray);
  };

  onFlowChartSave = (id, result) => {
    const { submitHadnlerBySaga } = this.props;
    console.debug('onFlowSave', id, result);
    const submitData = {
      PARAM: result,
    };
    submitHadnlerBySaga(id, 'POST', '/api/workflow/v1/common/workprocess/AddDefaultPrcRuleHandler', submitData, this.onSaveComplete);
  };

  state = {
    edgeEvent: 1,
  };

  render() {
    const { id, result } = this.props;
    console.debug('result : ', result, this.props);

    return (
      <div style={{ height: '100vh' }}>
        <GGEditor className={styles.editor}>
          <Row type="flex" className={styles.editorHd}>
            <Col span={24}>
              <FlowToolbar />
            </Col>
          </Row>
          <Row type="flex" className={styles.editorBd}>
            <Col span={4} className={styles.editorSidebar}>
              <FlowItemPanel items={result.nodeList ? result.nodeList.nodeList : []} />
            </Col>
            <Col span={16} className={styles.editorContent}>
              <Flow
                data={result && result.designInfo && result.designInfo.DESIGN_DATA !== null ? result.designInfo.DESIGN_DATA : undefined}
                className={styles.flow}
                graph={{ edgeDefaultShape: 'flow-polyline' }}
              />
            </Col>
            <Col span={4} className={styles.editorSidebar}>
              <EditorActionPanel id={id} onflowChartSave={this.onFlowChartSave}></EditorActionPanel>
              <FlowDetailPanel />
            </Col>
          </Row>
          <FlowContextMenu />
        </GGEditor>
      </div>
    );
  }
}

FlowPage.propTypes = {
  apiArray: PropTypes.array,
  actionApi: PropTypes.array,
  publicActionMethodBySaga: PropTypes.func,
  getCallDataHanlder: PropTypes.func,
};

FlowPage.defaultProps = {
  apiArray: [{ key: 'nodeList', url: `/api/workflow/v1/common/nodeList`, type: 'POST' }],
};

class FlowPageBase extends Component {
  render() {
    return <BizMicroDevBase PRC_ID={this.props.PRC_ID} id="flow" component={FlowPage}></BizMicroDevBase>;
  }
}

export default FlowPageBase;
