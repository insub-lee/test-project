import React, { Component } from 'react';
import GGEditor, { Flow } from 'gg-editor';
import { isJSON } from 'utils/helpers';
import styles from '../../GGEditorModal/index.module.scss';

export default class FlowViewer extends Component {
  componentDidMount() {}

  render() {
    const {
      item: { MUAL_COMPVIEWINFO },
    } = this.props;

    let parseData = '';
    if (isJSON(MUAL_COMPVIEWINFO)) {
      parseData = JSON.parse(MUAL_COMPVIEWINFO);
    }

    return (
      <div style={{ height: '400px' }}>
        <GGEditor className={styles.editor}>
          <Flow data={parseData.data} className={styles.flow} graph={{ mode: 'readOnly', edgeDefaultShape: 'flow-polyline' }} />
        </GGEditor>
      </div>
    );
  }
}
