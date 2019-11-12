import React, { Component } from 'react';
import { Row, Col } from 'antd';
import GGEditor, { Flow } from 'gg-editor';
import { FlowContextMenu } from './components/EditorContextMenu';
import { FlowToolbar } from './components/EditorToolbar';
import { FlowItemPanel } from './components/EditorItemPanel';
import EditorActionPanel from './components/EditorActionPanel';
import { FlowDetailPanel } from './components/EditorDetailPanel';
import styles from './index.module.scss';

class FlowPage extends Component {
  componentDidMount() {}

  onFlowChartSave = result => {
    const { setGGEditorModal } = this.props;
    setGGEditorModal(false);
    this.props.addEditorComponent('ggEditor', result);
  };

  render() {
    return (
      <div style={{ height: '400px' }}>
        <GGEditor className={styles.editor}>
          <Row type="flex" className={styles.editorHd}>
            <Col span={24}>
              <FlowToolbar />
            </Col>
          </Row>
          <Row type="flex" className={styles.editorBd}>
            <Col span={4} className={styles.editorSidebar}>
              <FlowItemPanel />
            </Col>
            <Col span={16} className={styles.editorContent}>
              <Flow className={styles.flow} graph={{ edgeDefaultShape: 'flow-polyline' }} />
            </Col>
            <Col span={4} className={styles.editorSidebar}>
              <EditorActionPanel onflowChartSave={this.onFlowChartSave}></EditorActionPanel>

              <FlowDetailPanel />
            </Col>
          </Row>
          <FlowContextMenu />
        </GGEditor>
      </div>
    );
  }
}

export default FlowPage;
