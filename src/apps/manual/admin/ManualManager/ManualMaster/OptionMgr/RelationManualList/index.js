import React from 'react';
import { Table, Button, Spin, TreeSelect } from 'antd';

import Styled from './Styled';

const { TreeNode } = TreeSelect;

const RelationManualList = () => (
  <Styled>
    <TreeSelect
      showSearch
      style={{ width: 300 }}
      // value={this.state.value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="Please select"
      allowClear
      treeDefaultExpandAll
      // onChange={this.onChange}
    >
      <TreeNode value="parent 1" title="parent 1" key="0-1">
        <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
          <TreeNode value="leaf1" title="my leaf" key="random" />
          <TreeNode value="leaf2" title="your leaf" key="random1" />
        </TreeNode>
        <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
          <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
        </TreeNode>
      </TreeNode>
    </TreeSelect>
  </Styled>
);

export default RelationManualList;
