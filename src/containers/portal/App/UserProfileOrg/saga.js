import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as actionType from './constants';

import { Axios } from '../../../../utils/AxiosFunc';

export function* getTreeData() {
  const response = yield call(Axios.get, '/api/common/v1/account/deptTree', { data: 'temp' });
  const list = JSON.parse(`[${response.result.join('')}]`);

  yield put({ type: actionType.SET_TREE_DATA, treeData: fromJS(list) });
}

export function* getChangeTreeData(payload) {
  const response = yield call(Axios.get, `/api/common/v1/account/deptChangeTree/${payload.depId}`);
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({ type: actionType.SET_CHANGE_TREE_DATA, 
              treeData: fromJS(list),
              selectedDept: payload.depId });
}

export function* getUsers(payload) {
  const DEPT_ID = payload.data;
  const data = {
    PARAM: {
      PAGE_CNT: 12,
    },
  };

  const response = yield call(Axios.post, `/api/common/v1/account/deptUserProfile/${DEPT_ID}`, data);

  yield put({
    type: actionType.SET_USERS,
    users: fromJS(response.list),
    selectedIndexes: fromJS([]),
  });
}

export function* getUser(payload) {
  console.log('NAME REQUEST!! - 01', payload.empno);

  const response = yield call(Axios.post, `/api/common/v1/account/userInfo/${payload.empno}`);

  const data = response;
  console.log('NAME REQUEST!! - 02', data.uuid);
  if (data != null) {
    const user = data.data;
    yield put({ type: actionType.SET_USER, user });
  } else {
  // yield put({ type: AUTH_REQUEST_ERROR });
  }
}

export function* getOrganizationUser(payload) {
  const KEYWORD = payload.keyword;
  const COMP_CD = payload.compCd;
  const data = {
    PARAM: {
      COMP_CD: COMP_CD,
    },
  };
  const response = yield call(Axios.post, `/api/common/v1/account/organizationSearch/${KEYWORD}`, data);
  let result = fromJS(response.list);
  if (result === undefined || result.size === 0) {
    result = fromJS([]);
  }

  yield put({
    type: actionType.GET_ORGANIZATION_USER,
    payload: {
      result,
    }
  });
}

export function* getOrganizationData() {
  const response = yield call(Axios.get, `/api/common/v1/account/organizationList`, { data: 'temp' });
  let data = fromJS(response.list);
  if (data === undefined || data.size === 0) {
    data = fromJS([]);
  }

  yield put({ 
    type: actionType.SET_ORGANIZATION_DATA,
    organizationData: fromJS(response.list),
    selectedDept: fromJS(response.list[0].DEPT_ID),  
  });
}

export function* loadingGridData(payload) {
  const DEPT_ID = payload.data;
  const PAGE = payload.page;
  const data = {
    PARAM: {
      PAGE: PAGE,
      PAGE_CNT: 12,
    },
  };
  const users = yield select(state => state.get('prof').get('users'));
  const response = yield call(Axios.post, `/api/common/v1/account/deptUserProfile/${DEPT_ID}`, data);
  let concatedList = users.slice().concat(fromJS(response.list));
  yield put({
    type: actionType.SET_USERS,
    users: concatedList,
    selectedIndexes: fromJS([]),
  });
}

export function* loadProfileData(payload) {
  const ID = payload.id;

  const data = {
    PARAM: {
      USERID: ID,
    },
  };

  const response = yield call(Axios.post, `/api/common/v1/account/appProfileLoad/` , data);
  let result = response.profile[0];

  yield put({ type: actionType.SET_PROFILE_DATA, result,
    selectedIndex: result.DEPT_ID });
}

export function* loadProfileDataSearch(payload) {
  const ID = payload.id;

  const data = {
    PARAM: {
      USERID: ID,
    },
  };

  const response = yield call(Axios.post, `/api/common/v1/account/appProfileLoad/` , data);
  let result = response.profile[0];

  
  result.isSearch = 'true';
  
  console.log(result, 'result^^^^^^');
  
  yield put({ type: actionType.SET_PROFILE_DATA_SEARCH, result,
    selectedIndex: result.DEPT_ID });
}

export default function* rootSaga() {
  yield takeLatest(actionType.GET_TREE_DATA_SAGA, getTreeData);
  yield takeLatest(actionType.GET_USERS_SAGA, getUsers);
  yield takeLatest(actionType.GET_USER_SAGA, getUser);
  yield takeLatest(actionType.GET_ORGANIZATION_USER_SAGA, getOrganizationUser);
  yield takeLatest(actionType.GET_ORANIZATION_DATA_SAGA, getOrganizationData);
  yield takeLatest(actionType.GET_CHANGE_TREE_DATA_SAGA, getChangeTreeData);
  yield takeLatest(actionType.LOADING_GRIDDATA, loadingGridData);
  yield takeLatest(actionType.GET_PROFILE_DATA_SAGA, loadProfileData);
  yield takeLatest(actionType.GET_PROFILE_DATA_SEARCH_SAGA, loadProfileDataSearch);
}
