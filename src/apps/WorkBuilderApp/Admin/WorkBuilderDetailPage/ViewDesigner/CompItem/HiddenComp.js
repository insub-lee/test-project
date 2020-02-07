import React from 'react';
import { Popconfirm } from 'antd';

const HiddenComp = ({ compItem, compIndex, removeHiddenComp }) => (
  <div>
    <span>{compItem.COMP_FIELD || 'no id'}</span>
    <Popconfirm title="Are you sure delete this Component?" onConfirm={() => removeHiddenComp(compIndex)} okText="Yes" cancelText="No">
      <span className="toolbar-item fa fa-trash" role="button" onKeyPress={() => false} tabIndex="0" />
    </Popconfirm>
  </div>
);

export default HiddenComp;
