import React from 'react';
import { Button } from 'antd';

const CompToolbar = ({ toolbarAction: { setSelectToolbarItem } }) => (
  <div className="tableBody">
    <Button onClick={() => setSelectToolbarItem('LABEL')}>Label</Button>
    <Button onClick={() => setSelectToolbarItem('TEXT')}>Text</Button>
    <Button onClick={() => setSelectToolbarItem('RICH-TEXT-EDITOR')}>Editor</Button>
  </div>
);

export default CompToolbar;
