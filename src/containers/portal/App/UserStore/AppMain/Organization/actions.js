import { fromJS } from 'immutable';
import { GET_TREE_DATA, SET_TREE_DATA, GET_USERS, GET_USER } from './constants';

export const getTreeData = () => ({
  type: GET_TREE_DATA,
});

export const updateTreeData = treeData => ({
  type: SET_TREE_DATA,
  treeData: fromJS(treeData),
});

export const getUsers = data => ({
  type: GET_USERS,
  data,
});

export const getUser = empno => ({
  type: GET_USER,
  empno,
});
