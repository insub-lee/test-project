import { fromJS } from 'immutable';
import * as actionType from './constants';

export const getTreeData = () => ({
  type: actionType.GET_TREE_DATA_SAGA,
});

export const updateTreeData = treeData => ({
  type: actionType.SET_TREE_DATA,
  treeData: fromJS(treeData),
});

export const getUsers = data => ({
  type: actionType.GET_USERS_SAGA,
  data,
});

export const getUser = empno => ({
  type: actionType.GET_USER_SAGA,
  empno,
});

export const getOrganizationUser = (keyword, compCd) => ({
  type: actionType.GET_ORGANIZATION_USER_SAGA,
  keyword,
  compCd,
});

export const getOrganizationData = () => ({
  type: actionType.GET_ORANIZATION_DATA_SAGA,
});

export const getChangeTreeData = depId => ({
  type: actionType.GET_CHANGE_TREE_DATA_SAGA,
  depId,
});

export const closeModalInit = () => ({
  type: actionType.CLOSE_MODAL,
});

export const loadingGridData = (data, page) => ({
  type: actionType.LOADING_GRIDDATA,
  data,
  page,
});

export const loadProfileData = id => ({
  type: actionType.GET_PROFILE_DATA_SAGA,
  id,
});

export const loadProfileDataSearch = id => ({
  type: actionType.GET_PROFILE_DATA_SEARCH_SAGA,
  id,
});


