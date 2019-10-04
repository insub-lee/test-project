import React from 'react';
import { fromJS } from 'immutable';
import { takeLatest, put, call, select } from 'redux-saga/effects';
import { getTreeFromFlatData } from 'react-sortable-tree';

import { Axios } from 'utils/AxiosFunc';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import { success, warning, error, showConfirm } from 'components/Feedback/functions';

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
    yield put(actions.initDefaultMgrByReduc());
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
  console.debug('selectedMualIdx', pageMoveType.get('selectedMualIdx'));
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

  if (defaultMgrMap.get('MUAL_NAME').length === 0) {
    error('매뉴얼명을 입력해주세요.');
    return;
  }
  if (selectedUserInfo.length === 0) {
    error('담당자 선택해주세요.');
    return;
  }

  const response = yield call(Axios.put, `/api/manual/v1/ManualMasterHandler/${pageMoveType.get('selectedMualIdx')}`, { param });
}

function* getEditorInfoSaga() {
  const pageMoveType = yield select(selectors.makeSelectMovePageType());
  const response = yield call(Axios.get, `/api/manual/v1/ManualEditorHandler?MUAL_IDX=${pageMoveType.get('selectedMualIdx')}`);
  if (response && response.tabList) {
    const tabList = makeEditorTabList(response.tabList, response.componentList);
    if (response.componentList.findIndex(find => find.TYPE === 'indexRelation') > -1) {
      const indexRelationIdxList = response.componentList.filter(find => find.TYPE === 'indexRelation');
      const indexRelationParam = [];
      indexRelationIdxList.forEach(node => {
        if (node.COMP_OPTION.length > 0) {
          const { MUAL_ORG_IDX, MUAL_TABCOMP_OIDX } = JSON.parse(node.COMP_OPTION);
          if (indexRelationParam.findIndex(find => find.MUAL_TABCOMP_OIDX === MUAL_TABCOMP_OIDX) === -1) {
            indexRelationParam.push({ MUAL_ORG_IDX, MUAL_TABCOMP_OIDX });
          }
        }
      });
      const responseComp = yield call(Axios.post, `/api/manual/v1/IndexRelationComponetHandler/${pageMoveType.get('selectedMualIdx')}`, {
        paramList: indexRelationParam,
      });
      if (responseComp) {
        yield put(actions.setIndexRelationListByReducr(fromJS(responseComp.list || [])));
      }
    }
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
      editorComponentList:
        compList.length > 0
          ? compList.map(comp => ({
              ...comp,
              COMP_OPTION: JSON.stringify(comp.COMP_OPTION),
            MUAL_COMPVIEWINFO:
                comp.MUAL_COMPVIEWINFO && typeof comp.MUAL_COMPVIEWINFO === 'object' ? JSON.stringify(comp.MUAL_COMPVIEWINFO) : comp.MUAL_COMPVIEWINFO,
            }))
          : [],
    };
  });
  const param = { editorTabList, selectedMualIdx: pageMoveType.get('selectedMualIdx') };
  const response = yield call(Axios.post, `/api/manual/v1/ManualEditorHandler`, param);
  if (response && response.tabList) {
    const tabList = makeEditorTabList(response.tabList, response.componentList);
    yield put(actions.setEditorMgrByReduc(fromJS(tabList)));
    message.success(<MessageContent>Save</MessageContent>, 3);
  } else {
    message.success(<MessageContent>Fail</MessageContent>, 3);
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

function* getOptionMgr() {
  const param = yield select(selectors.makeSelectMovePageType());
  console.debug('param.get selectedMualIdx', param.get('selectedMualIdx'));
  const response = yield call(Axios.get, `/api/manual/v1/ManualOptionHandler/${param.get('selectedMualIdx')}`);
  console.debug(response);
}

function* getCompareTempletList() {
  const response = yield call(Axios.get, `/api/manual/v1/ManualCompareTempletHandler`);
  if (response) {
    let { list } = response;
    list = list.map(node => ({
      ...node,
      TEMPLET_CONTENT: node.TEMPLET_CONTENT && node.TEMPLET_CONTENT.length > 0 ? JSON.parse(node.TEMPLET_CONTENT) : [],
    }));
    yield put(actions.setCompareTempletListByReducr(fromJS(list)));
  }
}

function* saveCompareTemplet() {
  const selectedNode = yield select(selectors.makeSelectedCompareTempletNode());
  const compareList = yield select(selectors.makeSelectCompareTemplet());
  const viewMode = yield select(selectors.makeSelectedCompareTempletViewMode());
  if (selectedNode.TEMPLET_NAME && selectedNode.TEMPLET_NAME.length > 0) {
    if (viewMode === 'I') {
      const sortSQ = compareList.length + 1;
      selectedNode.SORT_SQ = sortSQ;
    }
    const response = yield call(Axios.post, `/api/manual/v1/ManualCompareTempletHandler`, selectedNode);
    if (response) {
      const { list } = response;
      let resultList = [];
      if (compareList.length > 0) {
        resultList = list.map(item => {
          const oldIdx = compareList.findIndex(findItem => findItem.TEMPLET_IDX === item.TEMPLET_IDX);
          const oldItem = compareList[oldIdx];
          return {
            ...item,
            expanded: oldItem ? oldItem.expanded : false,
            TEMPLET_CONTENT: item.TEMPLET_CONTENT && item.TEMPLET_CONTENT.length > 0 ? JSON.parse(item.TEMPLET_CONTENT) : [],
          };
        });
      }
      yield put(actions.setCompareTempletListByReducr(fromJS(resultList)));
    }
  } else {
    console.debug('name!');
  }
}

function* getCategoryListBySaga() {
  const response = yield call(Axios.get, '/api/manual/v1/categoryhandler');
  const { list } = response;
  yield put(actions.setCategoryListByReducr(fromJS(list)));
}

function* getRelationManualListBySaga(action) {
  const { categoryIdx, chooesItem } = action;
  const response = yield call(Axios.get, `/api/manual/v1/ManualListHandler/${categoryIdx}`);
  const manualList = fromJS(response).get('manualList');
  const convertMualList = [];

  manualList.forEach(item => {
    const fobj = chooesItem.find(x => x.key === item.get('MUAL_IDX'));
    if (fobj === undefined) {
      convertMualList.push({ ...item.toJS(), disabled: false, checked: false });
    } else {
      convertMualList.push({ ...item.toJS(), disabled: true, checked: false });
    }
  });
  yield put(actions.setRelationManualListByRecur(convertMualList));
}

function* setRelationManualListBySaga(payload) {
  const { manualList } = payload;
  const defaultMgrMap = yield select(selectors.makeSelectDefaultMgr());

  const chooseMual = [];
  manualList.forEach(item => {
    chooseMual.push({
      SOURCE_MUAL_IDX: defaultMgrMap.get('MUAL_IDX'),
      SOURCE_MUAL_ORG_IDX: defaultMgrMap.get('MUAL_IDX'),
      TARGET_MUAL_IDX: item.MUAL_IDX,
      TARGET_MUAL_ORG_IDX: item.MUAL_ORG_IDX,
    });
  });

  const param = {
    param: {
      mualIdx: defaultMgrMap.get('MUAL_IDX'),
      mualList: chooseMual,
    },
  };
  const response = yield call(Axios.post, '/api/manual/v1/ManualRelationHandler', param);
}

function* getCompareMgr() {
  const defaultMgrMap = yield select(selectors.makeSelectDefaultMgr());
  if (defaultMgrMap.get('MUAL_TYPE') > 1) {
    const response = yield call(Axios.get, `/api/manual/v1/ManualCompareManageHandler/${defaultMgrMap.get('MUAL_IDX')}/${defaultMgrMap.get('MUAL_TYPE')}`);
    if (response) {
      let { compareTemplet, compareData } = response;
      compareTemplet = {
        ...compareTemplet,
        TEMPLET_CONTENT: compareTemplet.TEMPLET_CONTENT && compareTemplet.TEMPLET_CONTENT.length > 0 ? JSON.parse(compareTemplet.TEMPLET_CONTENT) : [],
      };
      if (compareData && compareData.COMPARE_DATA) {
        compareData = {
          ...compareData,
          COMPARE_DATA: compareData.COMPARE_DATA && compareData.COMPARE_DATA.length > 0 ? JSON.parse(compareData.COMPARE_DATA) : [],
        };
      }
      if (compareTemplet.TEMPLET_CONTENT) {
        compareTemplet = {
          ...compareTemplet,
          TEMPLET_CONTENT: compareTemplet.TEMPLET_CONTENT.map(node => {
            if (compareData && compareData.COMPARE_DATA) {
              const idx = compareData.COMPARE_DATA.findIndex(find => find.ITEM_IDX === node.ITEM_IDX);
              return { ...node, ITEM_DATA: idx === -1 ? '' : compareData.COMPARE_DATA[idx].ITEM_DATA };
            }
            return { ...node, ITEM_DATA: '' };
          }),
        };
      }
      yield put(actions.setCompareManageTemplet(compareTemplet));
      yield put(actions.setCompareManageData(compareData || {}));
    }
  }
}

function* saveCompareData() {
  const compareData = yield select(selectors.makeSelectCompareManageTemplet());
  const defaultMgrMap = yield select(selectors.makeSelectDefaultMgr());
  if (defaultMgrMap.get('MUAL_TYPE') > 1) {
    const param = { MUAL_IDX: defaultMgrMap.get('MUAL_IDX'), TEMPLET_IDX: compareData.TEMPLET_IDX, COMPARE_DATA: JSON.stringify(compareData.TEMPLET_CONTENT) };
    const response = yield call(
      Axios.post,
      `/api/manual/v1/ManualCompareManageHandler/${defaultMgrMap.get('MUAL_IDX')}/${defaultMgrMap.get('MUAL_TYPE')}`,
      param,
    );
    console.debug(response);
  }
}

function* getIndexRelationManualList(action) {
  const { idx } = action;
  const response = yield call(Axios.get, `/api/manual/v1/ManualListHandler/${idx}`);
  if (response) {
    const { manualList } = response;
    yield put(actions.setIndexRelationManualListByReducr(fromJS(manualList || [])));
  }
}

function* getInexRelationComponentList(action) {
  const { idx } = action;
  const response = yield call(Axios.get, `/api/manual/v1/IndexRelationComponetHandler/${idx}`);
  if (response && response.tabList) {
    const tabList = makeRelationCompList(response.tabList, response.componentList);
    yield put(actions.setInexRelationComponentListByReduc(fromJS(tabList)));
    // yield put(actions.setEditorComponentIndexByReduc(0));
  }
}

const makeRelationCompList = (tabList, componentList) => {
  const resultList = tabList.map(item => {
    let tempComp = componentList.filter(comp => comp.MUAL_TAB_IDX === item.MUAL_TAB_IDX && comp.TYPE === 'index');
    tempComp = tempComp.sort((a, b) => (a.SORT_SQ > b.SORT_SQ ? 1 : -1));
    tempComp = tempComp.map(comp => {
      const { MUAL_IDX, MUAL_TAB_IDX, MUAL_TABCOMP_IDX, MUAL_TABCOMP_OIDX, MUAL_TABCOMP_PIDX, MUAL_COMPVIEWINFO, SORT_SQ, TYPE, MUAL_ORG_IDX } = comp;
      const childComp = componentList.filter(subComp => subComp.MUAL_TABCOMP_PIDX === MUAL_TABCOMP_IDX && subComp.TYPE === 'editor');
      return {
        MUAL_IDX,
        MUAL_TAB_IDX,
        MUAL_TABCOMP_OIDX,
        MUAL_TABCOMP_PIDX,
        SORT_SQ,
        TYPE,
        key: MUAL_TABCOMP_IDX,
        title: MUAL_COMPVIEWINFO,
        childComp,
        MUAL_ORG_IDX,
      };
    });
    tempComp = getTreeFromFlatData({ flatData: tempComp, getKey: node => node.key, getParentKey: node => node.MUAL_TABCOMP_PIDX, rootKey: 0 });
    const { MUAL_IDX, MUAL_TABNAME, MUAL_TAB_IDX, SORT_SQ } = item;
    return { MUAL_IDX, SORT_SQ, key: MUAL_TAB_IDX, title: MUAL_TABNAME, children: tempComp };
  });
  return resultList;
};

export default function* initManualMangerSaga() {
  yield takeLatest(constantTypes.SET_RELATIONMANUALLIST_SAGA, setRelationManualListBySaga);
  yield takeLatest(constantTypes.GET_RELATIONMANUALLIST_SAGA, getRelationManualListBySaga);
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
  yield takeLatest(constantTypes.GET_OPTIONMGR_SAGA, getOptionMgr);
  yield takeLatest(constantTypes.GET_COMPARE_TEMPLET_SAGA, getCompareTempletList);
  yield takeLatest(constantTypes.SAVE_COMPARE_TEMPLET, saveCompareTemplet);
  yield takeLatest(constantTypes.GET_CATEGORYLIST, getCategoryListBySaga);
  yield takeLatest(constantTypes.GET_COMPARE_MGR_SAGA, getCompareMgr);
  yield takeLatest(constantTypes.SAVE_COMPARE_DATA_SAGA, saveCompareData);
  yield takeLatest(constantTypes.GET_INDEX_RELATION_MANUAL_LIST_SAGA, getIndexRelationManualList);
  yield takeLatest(constantTypes.GET_INDEX_RELATION_COMPONENT_LIST_SAGA, getInexRelationComponentList);
}
