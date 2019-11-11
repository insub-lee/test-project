import React, { Component } from 'react';
import GGEditor, { Flow } from 'gg-editor';
import { isJSON } from 'utils/helpers';
import styles from './index.module.scss';

export default class FlowViewer extends Component {
  componentDidMount() {}

  render() {
    const { parseData } = this.props;

    return (
      <div style={{ height: '400px' }}>
        <GGEditor className={styles.editor}>
          <Flow data={parseData.data} className={styles.flow} graph={{ mode: 'readOnly', edgeDefaultShape: 'flow-polyline' }} />
        </GGEditor>
      </div>
    );
  }
}
