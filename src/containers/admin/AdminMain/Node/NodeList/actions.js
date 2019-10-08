import * as actionTypes from './constants';

export const getNodeList = payload => ({
  type: actionTypes.GET_NODE_LIST,
  payload,
});

export const setNodeList = nodeList => ({
  type: actionTypes.SET_NODE_LIST,
  nodeList,
});
