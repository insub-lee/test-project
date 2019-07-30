import { fromJS } from 'immutable';
import { takeLatest, put, call, select } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';

import * as constantTypes from './constants';
import * as actions from './actions';
import selectors from './selectors';

function* getUserInfoBySaga(payload) {
  const { userName } = payload;
  const data = {
    PARAM: {
      COMP_CD: 1000,
      PAGE_CNT: 1000,
    },
  };

  let result = fromJS([]);
  if (encodeURIComponent(userName).length > 0) {
    const response = yield call(Axios.post, `/api/common/v1/account/organizationSearch/${encodeURIComponent(userName)}`, data);
    result = fromJS(response.list);
  }
  yield put(actions.setUserInfoListByReducr(result));
}

const makeEditorTabList = (tabList, componentList) => {
  const resultList = tabList.map(item => {
    let tempComp = componentList.filter(comp => comp.MUAL_TAB_IDX === item.MUAL_TAB_IDX);
    tempComp = tempComp.sort((a, b) => (a.SORT_SQ > b.SORT_SQ ? 1 : -1));
    tempComp = tempComp.map(comp => ({ ...comp, COMP_OPTION: JSON.parse(comp.COMP_OPTION) }));
    return { ...item, editorComponentList: tempComp };
  });
  return resultList;
};

function* getSelectedUserInfoSaga() {
  const pageMoveType = yield select(selectors.makeSelectMovePageType());
  const response = yield call(Axios.get, `/api/manual/v1/ManualManagerHandler/${pageMoveType.get('selectedMualIdx')}`);
  const selectedUserInfo = fromJS(response).get('selectedUserInfo');

  if (selectedUserInfo !== undefined && selectedUserInfo !== null) {
    const result = selectedUserInfo.map(item => ({ key: item.get('USER_ID'), label: item.get('USER_INFO').split(' ') }));
    yield put(actions.setSelectedUserInfoByReducr(result.toJS()));
  }
}

function* getDefaultMgrSaga() {
  const pageMoveType = yield select(selectors.makeSelectMovePageType());
  const response = yield call(Axios.get, `/api/manual/v1/ManualMasterHandler/${pageMoveType.get('selectedMualIdx')}`);

  const getDefaultMgrMap = fromJS(response).get('defaultMgrMap');
  if (getDefaultMgrMap !== undefined && getDefaultMgrMap !== null) {
    yield put(actions.setDefaultMgrByReduc(getDefaultMgrMap));
  } else {
    const defaultMovePageType = fromJS({
      pageType: 'DefaultMgr',
      selectedCategoryIdx: pageMoveType.get('selectedCategoryIdx'),
      selectedMualIdx: 0,
    });
    yield put(actions.setMovePageTypeReducr(defaultMovePageType));
  }
}

function* insertDefaultMgrSaga() {
  const defaultMgrMap = yield select(selectors.makeSelectDefaultMgr());
  const selectedUserInfo = yield select(selectors.makeSelectedUserInfo());

  const pageMoveType = yield select(selectors.makeSelectMovePageType());
  const param = {
    defaultMgrMap,
    selectedUserInfo,
  };

  const response = yield call(Axios.post, `/api/manual/v1/ManualMasterHandler/${pageMoveType.get('selectedMualIdx')}`, { param });

  const { MUAL_IDX } = response;
  const defaultMovePageType = fromJS({
    pageType: 'DefaultMgr',
    selectedCategoryIdx: pageMoveType.get('selectedCategoryIdx'),
    selectedMualIdx: MUAL_IDX,
  });
  yield put(actions.setMovePageTypeReducr(defaultMovePageType));
}

function* updateDefaultMgrSaga() {
  const pageMoveType = yield select(selectors.makeSelectMovePageType());
  const selectedUserInfo = yield select(selectors.makeSelectedUserInfo());
  const defaultMgrMap = yield select(selectors.makeSelectDefaultMgr());
  const param = {
    defaultMgrMap,
    selectedUserInfo,
  };
  const response = yield call(Axios.put, `/api/manual/v1/ManualMasterHandler/${pageMoveType.get('selectedMualIdx')}`, { param });
}

function* getEditorInfoSaga() {
  const pageMoveType = yield select(selectors.makeSelectMovePageType());
  const response = yield call(Axios.get, `/api/manual/v1/ManualEditorHandler?MUAL_IDX=${pageMoveType.get('selectedMualIdx')}`);
  if (response && response.tabList) {
    const tabList = makeEditorTabList(response.tabList, response.componentList);
    yield put(actions.setEditorMgrByReduc(fromJS(tabList)));
    yield put(actions.setEditorComponentIndexByReduc(0));
  }
}

function* saveEditorInfoSaga() {
  const pageMoveType = yield select(selectors.makeSelectMovePageType());
  const editorMgr = yield select(selectors.makeSelectEditorMgr());
  let editorTabList = editorMgr
    .get('editorTabList')
    .toJS()
    .sort((a, b) => (a.SORT_SQ > b.SORT_SQ ? 1 : -1));
  editorTabList = editorTabList.map((item, idx) => {
    let compList = [];
    if (item.editorComponentList && item.editorComponentList.length > 0) {
      const hashArr = {};

      for (let i = 0; i < item.editorComponentList.length; i++) {
        if (hashArr[item.editorComponentList[i].MUAL_TABCOMP_PIDX] === undefined) hashArr[item.editorComponentList[i].MUAL_TABCOMP_PIDX] = [];
        hashArr[item.editorComponentList[i].MUAL_TABCOMP_PIDX].push(item.editorComponentList[i]);
      }
      compList = hierarhySort(hashArr, 0, []);
      compList = compList.map((comp, index) => ({ ...comp, SORT_SQ: index + 1 }));
    }
    return {
      ...item,
      SORT_SQ: idx + 1,
      MUAL_TABVIEWINFO: JSON.stringify(setEditorTabViewInfo(compList, 0)),
      editorComponentList: compList.length > 0 ? compList.map(comp => ({ ...comp, COMP_OPTION: JSON.stringify(comp.COMP_OPTION) })) : [],
    };
  });
  const param = { editorTabList, selectedMualIdx: pageMoveType.get('selectedMualIdx') };
  const response = yield call(Axios.post, `/api/manual/v1/ManualEditorHandler`, param);
  if (response && response.tabList) {
    const tabList = makeEditorTabList(response.tabList, response.componentList);
    yield put(actions.setEditorMgrByReduc(fromJS(tabList)));
  }
}

const hierarhySort = (hashArr, key, result) => {
  if (hashArr[key] === undefined) return;
  const arr = hashArr[key].sort((a, b) => (a.SORT_SQ > b.SORT_SQ ? 1 : -1));
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i]);
    hierarhySort(hashArr, arr[i].MUAL_TABCOMP_IDX, result);
  }

  return result;
};

const setEditorTabViewInfo = (compList, compIdx) => {
  const resultList = [];
  if (!compList || compList.length === 0) return resultList;
  compList.forEach(item => {
    const { MUAL_COMPVIEWINFO, MUAL_TABCOMP_IDX, MUAL_TABCOMP_PIDX, TYPE, COMP_OPTION } = item;
    const tempObj = { MUAL_COMPVIEWINFO, MUAL_TABCOMP_IDX, MUAL_TABCOMP_PIDX, TYPE, COMP_OPTION };
    resultList.push(tempObj);
  });
  // const filterList = compList.filter(item => item.MUAL_TABCOMP_PIDX === compIdx);
  // if (filterList.length > 0) {
  //   filterList.forEach(item => {
  //     const { MUAL_COMPVIEWINFO, MUAL_TABCOMP_IDX, TYPE, COMP_OPTION } = item;
  //     const tempObj = { MUAL_COMPVIEWINFO, MUAL_TABCOMP_IDX, TYPE, COMP_OPTION };
  //     if (compList.filter(node => node.MUAL_TABCOMP_PIDX === MUAL_TABCOMP_IDX).length > 0) {
  //       tempObj.CHILDREN = setEditorTabViewInfo(compList, MUAL_TABCOMP_IDX);
  //     }
  //     resultList.push(tempObj);
  //   });
  // }
  console.debug(resultList);
  return resultList;
};

function* revisionManual() {
  const pageMoveType = yield select(selectors.makeSelectMovePageType());
  const response = yield call(Axios.post, `/api/manual/v1/ManualRevisionHandler/${pageMoveType.get('selectedMualIdx')}/0`);

  const { MUAL_IDX, defaultMgrMap, selectedUserInfo } = response;
  const defaultMovePageType = fromJS({
    pageType: 'DefaultMgr',
    selectedCategoryIdx: defaultMgrMap.CATEGORY_IDX,
    selectedMualIdx: MUAL_IDX,
  });
  if (selectedUserInfo !== undefined && selectedUserInfo !== null) {
    const result = fromJS(selectedUserInfo).map(item => ({ key: item.get('USER_ID'), label: item.get('USER_INFO').split(' ') }));
    yield put(actions.setSelectedUserInfoByReducr(result.toJS()));
  }
  yield put(actions.setMovePageTypeReducr(defaultMovePageType));
  yield put(actions.setDefaultMgrByReduc(fromJS(defaultMgrMap)));
}

function* confirmDefaultMgr() {
  const param = yield select(selectors.makeSelectDefaultMgr());

  const response = yield call(Axios.post, '/api/manual/v1/ManualConfirmHandler', param.toJS());

  const { defaultMgrMap } = response;
  const defaultMovePageType = fromJS({
    pageType: 'DefaultMgr',
    selectedCategoryIdx: defaultMgrMap.CATEGORY_IDX,
    selectedMualIdx: defaultMgrMap.SELECTED_MUAL_IDX,
  });
  // if (selectedUserInfo !== undefined && selectedUserInfo !== null) {
  //   const result = fromJS(selectedUserInfo).map(item => ({ key: item.get('USER_ID'), label: item.get('USER_INFO').split(' ') }));
  //   yield put(actions.setSelectedUserInfoByReducr(result.toJS()));
  // }
  yield put(actions.setMovePageTypeReducr(defaultMovePageType));
  yield put(actions.setDefaultMgrByReduc(fromJS(defaultMgrMap)));
}

function* resetDefaultMgr() {
  const param = yield select(selectors.makeSelectDefaultMgr());
  const versionList = param.get('VERSIONLIST');
  if (versionList.size > 1) {
    const prevVersion = versionList.getIn([1, 'VERSION']);
    const response = yield call(Axios.post, '/api/manual/v1/ManualResetHandler', param.set('PREV_VERSION', prevVersion).toJS());

    const { defaultMgrMap } = response;
    const defaultMovePageType = fromJS({
      pageType: 'DefaultMgr',
      selectedCategoryIdx: defaultMgrMap.CATEGORY_IDX,
      selectedMualIdx: defaultMgrMap.SELECTED_MUAL_IDX,
    });
    yield put(actions.setMovePageTypeReducr(defaultMovePageType));
    yield put(actions.setDefaultMgrByReduc(fromJS(defaultMgrMap)));
  } else {
    console.debug('reset error');
  }
}

function* removeManual() {
  const param = yield select(selectors.makeSelectDefaultMgr());
  const response = yield call(Axios.post, '/api/manual/v1/ManualRemoveHandler', param.toJS());
  const { defaultMgrMap, selectedUserInfo } = response;
  const defaultMovePageType = fromJS({
    pageType: 'DefaultMgr',
    selectedCategoryIdx: defaultMgrMap.CATEGORY_IDX,
    selectedMualIdx: defaultMgrMap.SELECTED_MUAL_IDX,
  });
  if (selectedUserInfo !== undefined && selectedUserInfo !== null) {
    const result = fromJS(selectedUserInfo).map(item => ({ key: item.get('USER_ID'), label: item.get('USER_INFO').split(' ') }));
    yield put(actions.setSelectedUserInfoByReducr(result.toJS()));
  }
  yield put(actions.setMovePageTypeReducr(defaultMovePageType));
  yield put(actions.setDefaultMgrByReduc(fromJS(defaultMgrMap)));
}

function* getDefaultMgrByVersion(action) {
  const { version } = action;
  const param = yield select(selectors.makeSelectDefaultMgr());
  const response = yield call(Axios.get, `/api/manual/v1/ManualRevisionHandler/${param.get('MUAL_ORG_IDX')}/${version}`);
  const { defaultMgrMap, selectedUserInfo } = response;
  const defaultMovePageType = fromJS({
    pageType: 'DefaultMgr',
    selectedCategoryIdx: defaultMgrMap.CATEGORY_IDX,
    selectedMualIdx: defaultMgrMap.SELECTED_MUAL_IDX,
  });
  if (selectedUserInfo !== undefined && selectedUserInfo !== null) {
    const result = fromJS(selectedUserInfo).map(item => ({ key: item.get('USER_ID'), label: item.get('USER_INFO').split(' ') }));
    yield put(actions.setSelectedUserInfoByReducr(result.toJS()));
  }
  yield put(actions.setMovePageTypeReducr(defaultMovePageType));
  yield put(actions.setDefaultMgrByReduc(fromJS(defaultMgrMap)));
}

export default function* initManualMangerSaga() {
  yield takeLatest(constantTypes.GET_DEFAULTMGR_SAGA, getDefaultMgrSaga);
  yield takeLatest(constantTypes.ADD_DEFAULTMGR_SAGA, insertDefaultMgrSaga);
  yield takeLatest(constantTypes.MODIFY_DEFUALTMGR_SAGA, updateDefaultMgrSaga);
  yield takeLatest(constantTypes.GET_EDITOR_INFO_SAGA, getEditorInfoSaga);
  yield takeLatest(constantTypes.SAVE_EDITOR_SAGA, saveEditorInfoSaga);
  yield takeLatest(constantTypes.GET_USERINFO_SAGA, getUserInfoBySaga);
  yield takeLatest(constantTypes.GET_SELECTEDUSERINFO_SAGA, getSelectedUserInfoSaga);
  yield takeLatest(constantTypes.REVISION_MANUAL_SAGA, revisionManual);
  yield takeLatest(constantTypes.CONFIRM_DEFAULT_MGR_SAGA, confirmDefaultMgr);
  yield takeLatest(constantTypes.RESET_DEFAULT_MGR_SAGA, resetDefaultMgr);
  yield takeLatest(constantTypes.REMOVE_MANUAL_SAGA, removeManual);
  yield takeLatest(constantTypes.GET_DEFAULTMGR_BY_VERSION_SAGA, getDefaultMgrByVersion);
}
