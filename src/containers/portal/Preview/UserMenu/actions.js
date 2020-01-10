import { fromJS } from 'immutable';
import * as actionType from './constants';

export const getMyAppTree = BIZGRP_ID => ({
  type: actionType.GET_MYAPP_TREE_SAGA,
  BIZGRP_ID,
});

export const getApp = () => ({
  type: actionType.GET_MYAPP_TREE_SAGA,
});

export const saveData = (node, treeData) => ({
  type: actionType.SAVE_DATA,
  node,
  myAppTreeData: fromJS(treeData),
});
