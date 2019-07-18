import { fromJS } from 'immutable';
import _ from 'lodash';
import { addNodeUnderParent, getNodeAtPath, removeNode, changeNodeAtPath, getFlatMapDataFromTree, getTreeFromFlatData } from './tree-data-utils';

const keyFromTreeIndex = ({ node }) => node.key;
const addNode = (rowInfo, newNode, treeData) => {
  const { path } = rowInfo;
  const parentNode = getNodeAtPath({
    treeData,
    path,
    getNodeKey: ({ treeIndex }) => treeIndex,
    ignoreCollapsed: true,
  });
  const getNodeKey = ({ treeIndex: number }) => number;
  let parentKey = getNodeKey(parentNode);
  if (parentKey === -1) {
    parentKey = null;
  }
  const newTree = addNodeUnderParent({
    treeData,
    newNode,
    expandParent: true,
    parentKey,
    getNodeKey: ({ treeIndex }) => treeIndex,
  });

  return newTree.treeData;
};

const deleteNode = (rowInfo, treeData) => {
  const { path } = rowInfo;
  const newTree = removeNode({
    treeData,
    path,
    getNodeKey: ({ treeIndex }) => treeIndex,
  });

  return newTree.treeData;
};

const deleteNodeByKey = (rowInfo, treeData) => {
  const { path } = rowInfo;
  const newTree = removeNode({
    treeData,
    path,
    getNodeKey: keyFromTreeIndex,
  });

  return newTree.treeData;
};

const editNodeByKey = (rowInfo, treeData) => {
  const { node, path } = rowInfo;

  const newTree = changeNodeAtPath({
    treeData,
    path,
    newNode: node,
    getNodeKey: keyFromTreeIndex,
  });
  return newTree;
};

const existNodeByKey = (rowInfo, treeData) => {
  const { path } = rowInfo;

  const result = getNodeAtPath({
    treeData,
    path,
    getNodeKey: keyFromTreeIndex,
  });

  return result;
};

const mergeArray = (newArray, oldArray) => {
  for (let i = 0; i < newArray.length; i += 1) {
    let expanded = false;
    if (oldArray[i] && oldArray[i].expanded
    ) {
      expanded = true;
    }
    newArray[i] = { ...newArray[i], expanded }; // eslint-disable-line

    const newArrayChildren = newArray[i].children;
    const oldArrayChilden = oldArray[i] ? oldArray[i].children : undefined;
    if (newArrayChildren && oldArrayChilden) {
      if (newArrayChildren.length > oldArrayChilden.length) {
        newArray[i] = { ...newArray[i], expanded : true }; // eslint-disable-line
      }
      mergeArray(newArrayChildren, oldArrayChilden);
    } else if (newArrayChildren) {
      mergeArray(newArrayChildren, {});
    }
  }
};

// treeData -> map형태로 바꾸는 함수.
let tempData1 = fromJS({});
let count1 = 0;
const genList = (data) => {
  for (let i = 0; i < data.size; i += 1) {
    const node = data.get(i);
    const nodeObject = node.toJS();
    const key = node.get('key');
    tempData1 = tempData1.set(key, {
      index: count1,
      ...nodeObject,
      path: _.drop(nodeObject.path, 1),
    });
    count1 += 1;
    if (node.get('children')) {
      genList(node.get('children'));
    }
  }
  return tempData1;
};

const generateList = (data) => {
  tempData1 = fromJS({});
  count1 = 0;
  return genList(data);
};


let tempData2 = fromJS({});
let count2 = 0;
const generateListBiz = (data) => {
  for (let i = 0; i < data.size; i += 1) {
    const node = data.get(i);
    const nodeObject = node.toJS();
    const key = node.get('key');
    tempData2 = tempData2.set(key, {
      index: count2,
      ...nodeObject,
      path: _.drop(nodeObject.path, 1),
      LVL: Number(node.get('LVL')),
      BIZGRP_ID: Number(node.get('BIZGRP_ID')),
      PRNT_ID: Number(node.get('PRNT_ID')),
      SITE_ID: Number(node.get('SITE_ID')),
      SORT_SQ: Number(node.get('SORT_SQ')),
    });
    count2 += 1;
    if (node.get('children')) {
      generateListBiz(node.get('children'));
    }
  }
  return tempData2;
};

let tempData3 = fromJS({});
let count3 = 0;
const generateListBizManage = (data) => {
  for (let i = 0; i < data.size; i += 1) {
    const node = data.get(i);
    const nodeObject = node.toJS();
    const key = node.get('key');
    tempData3 = tempData3.set(key, {
      index: count3,
      ...nodeObject,
    });
    count3 += 1;
    if (node.get('children')) {
      generateListBizManage(node.get('children'));
    }
  }
  return tempData3;
};

const setFlatDataKey = (dataList, keyName) => dataList.map((d) => {
  const d2 = d;
  d2.key = d[keyName];
  return d2;
});

const getFlatMapDataFromTreeData = treeData => getFlatMapDataFromTree({
  treeData,
  getNodeKey: ({ node }) => node.key,
  ignoreCollapsed: false,
});

const getTreeFromFlatTreeData = (flatData, rootKey) => getTreeFromFlatData({
  flatData,
  rootKey,
});

export {
  addNode,
  editNodeByKey,
  deleteNode,
  deleteNodeByKey,
  existNodeByKey,
  mergeArray,
  generateList,
  initGenerateList,
  generateListBiz,
  generateListBizManage,
  getTreeFromFlatTreeData,
  getFlatMapDataFromTreeData,
  setFlatDataKey,
};
