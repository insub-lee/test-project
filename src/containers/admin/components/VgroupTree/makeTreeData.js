import _ from 'lodash';
import { addNodeUnderParent, getNodeAtPath, removeNode, changeNodeAtPath } from './tree-data-utils';

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
  if (parentKey == -1) {
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
  const { node, treeIndex, path } = rowInfo;
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

  // let newTree = changeNodeAtPath({
  //   treeData,
  //   path,
  //   node,
  //   getNodeKey: ({ treeIndex }) =>  treeIndex
  // });

  return newTree;
};

const existNodeByKey = (rowInfo, treeData) => {
  const { node, path } = rowInfo;

  const result = getNodeAtPath({
    treeData,
    path,
    getNodeKey: keyFromTreeIndex,
  });

  return result;
};

// 1#2#3#4#5# -> [1,2,3,4,5]
const convertPathStringToArray = path => _.compact(path.split('#').map(Number));

const mergeArray = (newArray, oldArray) => {
  for (let i = 0; i < newArray.length; i += 1) {
    newArray[i] = { ...oldArray[i], ...newArray[i] };

    const newArrayChildren = newArray[i].children;
    const oldArrayChilden = oldArray[i] ? oldArray[i].children : undefined;
    if (newArrayChildren && oldArrayChilden) {
      if (newArrayChildren.length > oldArrayChilden.length) {
        newArray[i] = { ...newArray[i], expanded: true };
      }
      mergeArray(newArrayChildren, oldArrayChilden);
    } else if (newArrayChildren) {
      mergeArray(newArrayChildren, {});
    }
  }
};

export { addNode, editNodeByKey, deleteNode, deleteNodeByKey, existNodeByKey, convertPathStringToArray, mergeArray };
