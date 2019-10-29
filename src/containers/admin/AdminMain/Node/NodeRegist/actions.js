import * as actionTypes from './constants';

export const getNodeDetail = nodeId => ({
  type: actionTypes.GET_NODE_DETAIL,
  nodeId,
});

export const setNodeDetail = node => ({
  type: actionTypes.SET_NODE_DETAIL,
  node,
});

export const saveNode = nodeInfo => ({
  type: actionTypes.SAVE_NODE,
  nodeInfo,
});

export const updateNode = nodeInfo => ({
  type: actionTypes.UPDATE_NODE,
  nodeInfo,
});
