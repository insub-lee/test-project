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
    console.debug('flowpage create');
  }

  componentWillReceiveProps() {
    console.debug('flowpage componentWillReceiveProps');
    return false;
  }

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
              <EditorActionPanel id={id} onflowChartSave={this.props.onFlowChartSave}></EditorActionPanel>
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
  // actionApi: PropTypes.array,
  // publicActionMethodBySaga: PropTypes.func,
  // getCallDataHanlder: PropTypes.func,
};

FlowPage.defaultProps = {};

// class FlowPageBase extends Component {
//   render() {
//     return <BizMicroDevBase PRC_ID={this.props.PRC_ID} id="flow" component={FlowPage}></BizMicroDevBase>;
//   }
// }

export default FlowPage;
