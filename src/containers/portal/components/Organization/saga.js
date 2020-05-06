import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { lang } from 'utils/commonUtils';
import { Axios } from 'utils/AxiosFunc';
import * as actionType from './constants';

// 그리드에 한번에 보여줄 사용자의 수
const PAGE_CNT = 20;

export function* getTreeData() {
  const response = yield call(Axios.get, '/api/common/v1/account/deptTree', { data: 'temp' });
  const list = JSON.parse(`[${response.result.join('')}]`);

  yield put({ type: actionType.SET_TREE_DATA, treeData: fromJS(list) });
}

export function* getChangeTreeData(payload) {
  const response = yield call(Axios.get, `/api/common/v1/account/deptChangeTree/${payload.depId}`);
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({
    type: actionType.SET_CHANGE_TREE_DATA,
    treeData: fromJS(list),
    selectedDept: payload.depId,
  });
}

export function* getGrpTreeData() {
  const response = yield call(Axios.get, '/api/common/v1/account/grpTree', { data: 'temp' });
  const list = JSON.parse(`[${response.result.join('')}]`);
  const siteId = response.SITE_ID;
  yield put({
    type: actionType.SET_GRP_TREE_DATA,
    grpTreeData: fromJS(list),
    siteId,
  });
}

export function* getChangeGrpTreeData(payload) {
  const response = yield call(Axios.get, `/api/common/v1/account/grpChangeTree/${payload.siteId}`);
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({
    type: actionType.SET_CHANGE_GRPTREE_DATA,
    grpTreeData: fromJS(list),
    selectedGrpDept: payload.siteId,
  });
}

export function* getPstnTreeData() {
  const response = yield call(Axios.get, '/api/common/v1/account/pstnTree', { data: 'temp' });
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({
    type: actionType.SET_PSTN_TREE_DATA,
    pstnTreeData: fromJS(list),
  });
}

export function* getChangePstnTreeData(payload) {
  const response = yield call(Axios.get, `/api/common/v1/account/pstnChangeTree/${payload.pstnId}`);
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({
    type: actionType.SET_CHANGE_PSTNTREE_DATA,
    pstnTreeData: fromJS(list),
    selectedPstnDept: payload.pstnId,
  });
}

export function* getDutyTreeData() {
  const response = yield call(Axios.get, '/api/common/v1/account/dutyTree', { data: 'temp' });
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({
    type: actionType.SET_DUTY_TREE_DATA,
    dutyTreeData: fromJS(list),
  });
}

export function* getChangeDutyTreeData(payload) {
  const response = yield call(Axios.get, `/api/common/v1/account/dutyChangeTree/${payload.dutyId}`);
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({
    type: actionType.SET_CHANGE_DUTYTREE_DATA,
    dutyTreeData: fromJS(list),
    selectedDutyDept: payload.dutyId,
  });
}

export function* getUsers(payload) {
  const DEPT_ID = payload.data;

  const response = yield call(Axios.get, `/api/common/v1/account/deptUser/${DEPT_ID}/${PAGE_CNT}`);

  yield put({
    type: actionType.SET_USERS,
    users: fromJS(response.list),
    selectedIndexes: fromJS([]),
  });

  yield put({
    type: actionType.RESET_CHECKBOX,
  });
}

// selectbox의 SITEID도 함께 넘겨주고
// 넘어온 SITEID가 없으면 세션에서 가져와서 사용
export function* getGrpUsers(payload) {
  const GRP_ID = payload.grpId;
  const SITE_ID = payload.siteId;
  const response = yield call(Axios.get, `/api/common/v1/account/grpUser/${GRP_ID}/${SITE_ID}/${PAGE_CNT}`, { data: 'temp' });
  yield put({
    type: actionType.SET_GRP_USERS,
    grpUsers: fromJS(response.list),
    selectedIndexes4: fromJS([]),
  });

  yield put({
    type: actionType.RESET_CHECKBOX,
  });
}

export function* getPstnUsers(payload) {
  const PSTN_ID = payload.data;
  const response = yield call(Axios.get, `/api/common/v1/account/pstnUser/${PSTN_ID}/${PAGE_CNT}`, { data: 'temp' });
  yield put({
    type: actionType.SET_PSTN_USERS,
    pstnUsers: fromJS(response.list),
    selectedIndexes2: fromJS([]),
  });

  yield put({
    type: actionType.RESET_CHECKBOX,
  });
}

export function* getDutyUsers(payload) {
  const DUTY_ID = payload.data;
  const response = yield call(Axios.get, `/api/common/v1/account/dutyUser/${DUTY_ID}/${PAGE_CNT}`, { data: 'temp' });
  yield put({
    type: actionType.SET_DUTY_USERS,
    dutyUsers: fromJS(response.list),
    selectedIndexes3: fromJS([]),
  });

  yield put({
    type: actionType.RESET_CHECKBOX,
  });
}

export function* getUser(payload) {
  const response = yield call(Axios.post, `/api/common/v1/account/userInfo/${payload.empno}`);

  const data = response;
  if (data != null) {
    const user = data.data;
    yield put({
      type: actionType.SET_USER,
      user,
    });
  }
}

// 검색
export function* getOrganizationUser(payload) {
  const KEYWORD = payload.keyword;
  const COMP_CD = payload.compCd;
  const type = payload.tabType;
  const data = {
    PARAM: {
      COMP_CD,
      PAGE_CNT,
      KEYWORD,
    },
  };
  const response = yield call(Axios.post, `/api/common/v1/account/organizationSearch`, data);
  let result = fromJS(response.list);
  if (result === undefined || result.size === 0) {
    result = fromJS([]);
  }

  yield put({
    type: actionType.GET_ORGANIZATION_USER,
    result,
    aType: type,
  });
}

// 무한 스크롤 데이터 로딩 작업
export function* loadingOrganizationUser(payload) {
  const KEYWORD = payload.keyword;
  const COMP_CD = payload.compCd;
  const PAGE = payload.page;
  const type = payload.tabType;
  const data = {
    PARAM: {
      PAGE,
      COMP_CD,
      PAGE_CNT,
      KEYWORD,
    },
  };
  const organizationSearchResultNames = {
    user: 'organizationSearchResult',
    pstn: 'organizationSearchResultForPstn',
    duty: 'organizationSearchResultForDuty',
  };
  const organizationSearchResult = yield select(state => state.get('org').get(organizationSearchResultNames[type]));
  if (organizationSearchResult.length / PAGE_CNT === PAGE) {
    return;
  }
  const response = yield call(Axios.post, `/api/common/v1/account/organizationSearch`, data);
  let result = fromJS(response.list);
  if (result === undefined || result.size === 0) {
    result = fromJS([]);
  }

  result = organizationSearchResult.slice().concat(result);

  yield put({
    type: actionType.GET_ORGANIZATION_USER,
    result,
    aType: type,
  });
}

export function* getOrganizationData() {
  const response = yield call(Axios.get, '/api/common/v1/account/organizationList', { data: 'temp' });
  let data = fromJS(response.list);
  if (data === undefined || data.size === 0) {
    data = fromJS([]);
  }
  yield put({
    type: actionType.SET_ORGANIZATION_DATA,
    organizationData: fromJS(response.list),
    selectedDept: response.list[0].DEPT_ID,
  });
}

export function* getOrganizationPstnData() {
  const response = yield call(Axios.get, '/api/common/v1/account/organizationPstnList', { data: 'temp' });
  let data = fromJS(response.list);
  if (data === undefined || data.size === 0) {
    data = fromJS([]);
  }
  yield put({
    type: actionType.SET_ORGANIZATION_PSTNDATA,
    organizationPstnData: fromJS(response.list),
    selectedPstnDept: fromJS(response.list[0].PSTN_ID),
  });
}

export function* getOrganizationDutyData() {
  const response = yield call(Axios.get, '/api/common/v1/account/organizationDutyList', { data: 'temp' });
  let data = fromJS(response.list);
  if (data === undefined || data.size === 0) {
    data = fromJS([]);
  }

  yield put({
    type: actionType.SET_ORGANIZATION_DUTYDATA,
    organizationDutyData: fromJS(response.list),
    selectedDutyDept: fromJS(response.list[0].DUTY_ID),
  });
}

export function* getOrganizationGrpData() {
  const response = yield call(Axios.get, '/api/common/v1/account/organizationGrpList', { data: 'temp' });
  let data = fromJS(response.list);
  if (data === undefined || data.size === 0) {
    data = fromJS([]);
  }

  yield put({
    type: actionType.SET_ORGANIZATION_GRPDATA,
    organizationGrpData: fromJS(response.list),
    selectedGrpDept: fromJS(response.list[0].SITE_ID),
  });
}

// Grid 무한 스크롤을 위한 데이터로딩 작업
export function* loadingGridDataDuty(payload) {
  const DUTY_ID = payload.data;
  const PAGE = payload.page;
  const data = {
    PARAM: {
      PAGE,
    },
  };
  const dutyUsers = yield select(state => state.get('org').get('dutyUsers'));
  if (dutyUsers.length / PAGE_CNT === PAGE) {
    return;
  }
  const response = yield call(Axios.post, `/api/common/v1/account/dutyUser/${DUTY_ID}/${PAGE_CNT}`, data);
  const concatedList = dutyUsers.slice().concat(fromJS(response.list));
  yield put({
    type: actionType.SET_DUTY_USERS,
    dutyUsers: concatedList,
    selectedIndexes3: fromJS([]),
  });
}

export function* loadingGridDataPstn(payload) {
  const PSTN_ID = payload.data;
  const PAGE = payload.page;
  const data = {
    PARAM: {
      PAGE,
    },
  };

  const pstnUsers = yield select(state => state.get('org').get('pstnUsers'));
  if (pstnUsers.length / PAGE_CNT === PAGE) {
    return;
  }

  const response = yield call(Axios.post, `/api/common/v1/account/pstnUser/${PSTN_ID}/${PAGE_CNT}`, data);
  const concatedList = pstnUsers.slice().concat(fromJS(response.list));
  yield put({
    type: actionType.SET_PSTN_USERS,
    pstnUsers: concatedList,
    selectedIndexes2: fromJS([]),
  });
}

export function* loadingGridDataGrp(payload) {
  const GRP_ID = payload.grpId;
  const SITE_ID = payload.siteId;
  const PAGE = payload.page;
  const data = {
    PARAM: {
      PAGE,
    },
  };

  const grpUsers = yield select(state => state.get('org').get('grpUsers'));
  if (grpUsers.length / PAGE_CNT === PAGE) {
    return;
  }
  const response = yield call(Axios.post, `/api/common/v1/account/grpUser/${GRP_ID}/${SITE_ID}/${PAGE_CNT}`, data);
  const concatedList = grpUsers.slice().concat(fromJS(response.list));
  yield put({
    type: actionType.SET_GRP_USERS,
    grpUsers: concatedList,
    selectedIndexes4: fromJS([]),
  });
}

export function* loadingGridData(payload) {
  const DEPT_ID = payload.data;
  const PAGE = payload.page;
  const data = {
    PARAM: {
      PAGE,
    },
  };
  const users = yield select(state => state.get('org').get('users'));
  if (users.length / PAGE_CNT === PAGE) {
    return;
  }
  const response = yield call(Axios.post, `/api/common/v1/account/deptUser/${DEPT_ID}/${PAGE_CNT}`, data);
  const concatedList = users.slice().concat(fromJS(response.list));
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

  const response = yield call(Axios.post, '/api/common/v1/account/appProfileLoad/', data);
  const result = response.profile[0];

  yield put({
    type: actionType.SET_PROFILE_DATA,
    result,
    // selectedIndex: result.DEPT_ID
  });
}

export function* getProfileData(payload) {
  const ID = payload.id;

  const data = {
    PARAM: {
      USERID: ID,
    },
  };

  const response = yield call(Axios.post, '/api/common/v1/account/appProfileLoad/', data);
  const result = response.profile[0];

  const arr = result.FULL_PATH.split('|');
  const selectedDept = Number(arr[0]);
  const selectedIndex = arr[arr.length - 1];
  const selectedUserDeptName = lang.get('DEPT_NAME', result);

  const response2 = yield call(Axios.get, `/api/common/v1/account/deptUser/${selectedIndex}/${PAGE_CNT}`, { data: 'temp' });

  yield put({
    type: actionType.SET_PROFILE,
    result,
    selectedDept,
    selectedIndex,
    selectedUserDeptName,
    users: fromJS(response2.list),
  });
}

export function* setSelectedProfile(payload) {
  const deptName = payload.name;
  const firstDeptId = payload.fpath;
  const lastDeptId = payload.path;

  // 변경된 트리 데이터 가져오기
  let response = yield call(Axios.get, `/api/common/v1/account/deptChangeTree/${firstDeptId}`);
  const treeData = fromJS(JSON.parse(`[${response.result.join('')}]`));

  // 변경된 그리드의 구성원 데이터 가져오기
  response = yield call(Axios.get, `/api/common/v1/account/deptUser/${lastDeptId}/${PAGE_CNT}`, { data: 'temp' });
  const users = fromJS(response.list);

  yield put({
    type: actionType.SET_SELECTEDPROFILE,
    treeData,
    users,
    selectedIndex: lastDeptId,
    selectedDept: firstDeptId,
    selectedUserDeptName: deptName,
  });
}

export function* getTreeDataForProfile(payload) {
  const { DEPT_ID } = payload;
  const response = yield call(Axios.post, '/api/common/v1/account/getDeptTreeForProfile', { DEPT_ID });
  const list = JSON.parse(`[${response.result.join('')}]`);

  yield put({ type: actionType.GET_TREE_DATA_PROFILE, treeData: fromJS(list) });
}

export default function* rootSaga() {
  yield takeLatest(actionType.GET_TREE_DATA_SAGA, getTreeData);
  yield takeLatest(actionType.GET_GRP_TREE_DATA_SAGA, getGrpTreeData);
  yield takeLatest(actionType.GET_PSTN_TREE_DATA_SAGA, getPstnTreeData);
  yield takeLatest(actionType.GET_DUTY_TREE_DATA_SAGA, getDutyTreeData);
  yield takeLatest(actionType.GET_USERS_SAGA, getUsers);
  yield takeLatest(actionType.GET_GRP_USERS_SAGA, getGrpUsers);
  yield takeLatest(actionType.GET_PSTN_USERS_SAGA, getPstnUsers);
  yield takeLatest(actionType.GET_DUTY_USERS_SAGA, getDutyUsers);
  yield takeLatest(actionType.GET_USER_SAGA, getUser);
  yield takeLatest(actionType.GET_ORGANIZATION_USER_SAGA, getOrganizationUser);
  yield takeLatest(actionType.GET_ORANIZATION_DATA_SAGA, getOrganizationData);
  yield takeLatest(actionType.GET_ORANIZATION_PSTNDATA_SAGA, getOrganizationPstnData);
  yield takeLatest(actionType.GET_ORANIZATION_DUTYDATA_SAGA, getOrganizationDutyData);
  yield takeLatest(actionType.GET_ORANIZATION_GRPDATA_SAGA, getOrganizationGrpData);
  yield takeLatest(actionType.GET_CHANGE_TREE_DATA_SAGA, getChangeTreeData);
  yield takeLatest(actionType.GET_CHANGE_GRPTREE_DATA_SAGA, getChangeGrpTreeData);
  yield takeLatest(actionType.GET_CHANGE_PSTNTREE_DATA_SAGA, getChangePstnTreeData);
  yield takeLatest(actionType.GET_CHANGE_DUTYTREE_DATA_SAGA, getChangeDutyTreeData);
  yield takeLatest(actionType.LOADING_GRIDDATA_DUTY, loadingGridDataDuty);
  yield takeLatest(actionType.LOADING_GRIDDATA_PSTN, loadingGridDataPstn);
  yield takeLatest(actionType.LOADING_GRIDDATA_GRP, loadingGridDataGrp);
  yield takeLatest(actionType.LOADING_GRIDDATA, loadingGridData);
  yield takeLatest(actionType.LOADING_SEARCH_DATA, loadingOrganizationUser);
  yield takeLatest(actionType.GET_PROFILE_DATA_SAGA, loadProfileData);
  yield takeLatest(actionType.GET_PROFILE_SAGA, getProfileData);
  yield takeLatest(actionType.SET_SELECTEDPROFILE_SAGA, setSelectedProfile);

  yield takeLatest(actionType.GET_TREE_DATA_PROFILE_SAGA, getTreeDataForProfile);
}
