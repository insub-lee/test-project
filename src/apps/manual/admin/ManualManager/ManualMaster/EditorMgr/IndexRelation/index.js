import React from 'react';
import { fromJS } from 'immutable';
import { Table, TreeSelect, Button, Icon, Tree } from 'antd';
import { getTreeFromFlatData } from 'react-sortable-tree';
import PropTypes from 'prop-types';

import Styled from './Styled';

const { TreeNode } = Tree;

const leftTableColumns = [
  {
    dataIndex: 'MUAL_NAME',
    title: '매뉴얼명',
    render: text => <div dangerouslySetInnerHTML={{ __html: text }}></div>,
  },
];

let categoryIdx = 0;
let mualIdx = 0;

const getTreeData = flatData =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item.CATEGORY_NAME,
      value: item.CATEGORY_IDX,
      key: item.CATEGORY_IDX,
      parentValue: item.CATEGORY_PARENT_IDX,
    })),
    getKey: node => node.key,
    getParentKey: node => node.parentValue,
    rootKey: 0,
  });

const haddleClickManualList = (idx, getCompList) => {
  mualIdx = idx;
  return {
    onClick: () => {
      getCompList(idx);
    },
  };
};

const handdleClickIndex = (selecteds, event, setSelectedCompItem) => {
  const { MUAL_ORG_IDX, MUAL_TABCOMP_OIDX, title, childComp } = event.node.props;
  setSelectedCompItem(fromJS({ MUAL_ORG_IDX, MUAL_TABCOMP_OIDX, title, childComp }));
};

const handdleChangeTreeSelect = (idx, getMualList) => {
  categoryIdx = idx;
  getMualList(idx);
};

const renderTreeNode = compList =>
  compList.map(node => (
    <TreeNode {...node} selectable={!((node.children && node.children.length > 0) || !node.TYPE)}>
      {node.children && node.children.length > 0 && renderTreeNode(node.children)}
    </TreeNode>
  ));

const IndexRelation = ({ treeData, getMualList, manualList, getCompList, compList, setSelectedCompItem, addEditorComponent, selectedCompItem }) => (
  <Styled>
    <table>
      <tbody>
        <tr>
          <td className="indexRelationTd">
            <div style={{ marginBottom: '10px' }}>
              <TreeSelect
                style={{ width: 433 }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                treeData={getTreeData(treeData.toJS())}
                onChange={idx => handdleChangeTreeSelect(idx, getMualList)}
              />
            </div>
            <Table
              key={`indexRelation_${categoryIdx}`}
              onRow={record => haddleClickManualList(record.MUAL_IDX, getCompList)}
              columns={leftTableColumns}
              dataSource={manualList}
            />
          </td>
          <td className="indexRelationTd right">
            <div style={{ marginBottom: '10px', textAlign: 'right' }}>
              <Button onClick={() => selectedCompItem && selectedCompItem.MUAL_TABCOMP_OIDX > 0 && addEditorComponent('indexRelation')}>
                <span>
                  <Icon type="import" />
                  적용하기
                </span>
              </Button>
            </div>
            <Tree
              className="indexRelationCompList"
              key={`indexRelationTree_${mualIdx}`}
              onSelect={(selectedKeys, e) => handdleClickIndex(selectedKeys, e, setSelectedCompItem)}
            >
              {renderTreeNode(compList)}
            </Tree>
          </td>
        </tr>
      </tbody>
    </table>
  </Styled>
);

IndexRelation.propTypes = {
  getMualList: PropTypes.func,
  manualList: PropTypes.arrayOf(PropTypes.object),
  getCompList: PropTypes.func,
  compList: PropTypes.arrayOf(PropTypes.object),
  treeData: PropTypes.object,
  setSelectedCompItem: PropTypes.func,
  addEditorComponent: PropTypes.func,
  selectedCompItem: PropTypes.object,
};

IndexRelation.defaultProps = {
  getMualList: () => false,
  manualList: [],
  getCompList: () => false,
  compList: [],
  treeData: fromJS([]),
  setSelectedCompItem: () => false,
  addEditorComponent: () => false,
  selectedCompItem: {},
};

export default IndexRelation;
