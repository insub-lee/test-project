import React from 'react';
import { Card } from 'antd';
import { EdgePanel, DetailPanel, CanvasPanel } from 'gg-editor';
import DetailForm from './DetailForm';
import styles from './index.module.scss';

const FlowDetailPanel = props => (
  <DetailPanel className={styles.detailPanel}>
    <EdgePanel>
      <DetailForm type="edge" />
    </EdgePanel>
    <CanvasPanel>
      <Card type="inner" size="small" title="설정옵션" bordered={false} />
    </CanvasPanel>
  </DetailPanel>
);

export default FlowDetailPanel;
