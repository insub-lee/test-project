import React from 'react';
import { Table, Button, Spin, TreeSelect } from 'antd';

import Styled from './Styled';

const RelationManualList = () => (
  <Styled>
    <TreeSelect
      style={{ width: 300 }}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="Please select"
      allowClear
      // treeData={treeData}
      // onChange={this.onChange}
    />
  </Styled>
);

export default RelationManualList;
