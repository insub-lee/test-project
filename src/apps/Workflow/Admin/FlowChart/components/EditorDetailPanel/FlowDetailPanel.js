import React from 'react';
import { Card } from 'antd';
import { NodePanel, EdgePanel, GroupPanel, MultiPanel, CanvasPanel, DetailPanel } from 'gg-editor';
import DetailForm from './DetailForm';
import styles from './index.module.scss';

const FlowDetailPanel = props => (
  <DetailPanel className={styles.detailPanel}>
    <NodePanel>
      <DetailForm type="node" />
    </NodePanel>
    <EdgePanel>
      <DetailForm type="edge" />
    </EdgePanel>
    <GroupPanel>
      <DetailForm type="group" />
    </GroupPanel>
    <MultiPanel>
      <Card type="inner" size="small" title="Multi Select" bordered={false} />
    </MultiPanel>
    <CanvasPanel>
      <Card type="inner" size="small" title="설정옵션" bordered={false} />
    </CanvasPanel>
  </DetailPanel>
);

export default FlowDetailPanel;
