import React from 'react';
import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import uuid from 'uuid/v1';
import cloneDeep from 'lodash/cloneDeep';

import { Axios } from 'utils/AxiosFunc';
import { cloneJSON } from 'utils/helpers';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import * as constantTypes from './constants';
import * as actions from './actions';
import * as selectors from './selectors';
import { setGroupsLayerIdxKey, setInitListGroups } from './helper';

const getNewKey = () => uuid();

function* getMetaData({ workSeq, viewType, viewID }) {
  const response = yield call(Axios.get, `/api/builder/v1/work/meta?workSeq=${workSeq}`);
  const sysResponse = yield call(Axios.get, `/api/builder/v1/work/sysmeta?workSeq=${workSeq}`);
  const compResponse = yield call(Axios.get, '/api/builder/v1/work/ComponentPool');
  if (response && response.resultType && response.resultType.length > 0 && response[response.resultType] && response[response.resultType].length > 0) {
    const metaList = response[response.resultType].map(node => ({ ...node, CONFIG: JSON.parse(node.CONFIG) }));
    const viewList = metaList.filter(fNode => fNode.COMP_TYPE === 'VIEW');
    const topMenus = makeTopMenuData(viewList);
    let viewDataIdx = viewList.findIndex(node => node.META_SEQ === viewID && node.COMP_TAG === viewType);
    if (viewList.length > 0 && viewID !== 0) {
      if (viewDataIdx === -1) {
        viewDataIdx = viewList.findIndex(fNode => fNode.COMP_TAG === 'INPUT') > -1 ? viewList.findIndex(fNode => fNode.COMP_TAG === 'INPUT') : 0;
      }
      yield put(actions.setViewDataByReducer(viewList[viewDataIdx]));
      yield put(actions.setWorkInfoByReducer(workSeq, viewType));
    } else if (viewType === 'LIST') {
      yield put(actions.setInitListDataByReducer(workSeq, viewType));
    } else {
      yield put(actions.setInitDataByReducer(workSeq, viewType));
    }
    yield put(actions.setCompDataByReducer(metaList));
    yield put(actions.setTopMenusByReducer(topMenus));
    if (sysResponse && sysResponse.list) {
      yield put(actions.setSysMetaListByReducer(sysResponse.list, metaList));
    }
    if (compResponse) {
      yield put(actions.setComponentPoolListByReducer(compResponse.compPoolList, compResponse.colGroup));
    }
  } else {
    yield put(actions.setInitDataByReducer(workSeq, viewType));
    if (sysResponse && sysResponse.list) {
      yield put(actions.setSysMetaListByReducer(sysResponse.list, []));
    }
    if (compResponse) {
      yield put(actions.setComponentPoolListByReducer(compResponse.compPoolList, compResponse.colGroup));
    }
  }
}

const makeTopMenuData = viewList => {
  let topMenus = [
    { key: 'INPUT', title: '입력', menus: [] },
    { key: 'MODIFY', title: '수정', menus: [] },
    { key: 'VIEW', title: '조회', menus: [] },
    { key: 'LIST', title: '목록', menus: [] },
  ];
  if (viewList.length > 0) {
    topMenus = topMenus.map(node => {
      const tempList = viewList.filter(fNode => fNode.COMP_TAG === node.key).map(viewNode => ({ key: viewNode.META_SEQ, title: viewNode.NAME_KOR }));
      return { ...node, menus: tempList };
    });
  }
  return topMenus;
};

function* addMetaData() {
  const viewData = yield select(selectors.makeSelectViewData());
  let compData = yield select(selectors.makeSelectCompData());
  const workInfo = yield select(selectors.makeSelectWorkInfo());
  const viewCnt = compData.filter(fNode => fNode.COMP_TYPE === 'VIEW').length;
  let isError = false;
  let errorField = '';
  compData
    .filter(fNode => fNode.COMP_TYPE !== 'VIEW' && !fNode.isRemove)
    .forEach(node => {
      if (!node.COMP_FIELD || (node.COMP_FIELD && node.COMP_FIELD.length) < 1) {
        isError = true;
        errorField = node.CONFIG.property.COMP_NAME || '';
      }
      // else if (!node.NAME_KOR || (node.NAME_KOR && node.NAME_KOR.length) < 1) {
      //   isError = true;
      //   errorField = `${node.NAME_KOR}(${node.COMP_FIELD})`;
      // }
    });

  if (isError) {
    message.error(<MessageContent>{`${errorField} 필드 데이터를 채워주세요.`}</MessageContent>);
    return;
  }
  const viewDataIdx = compData.findIndex(
    node => node.COMP_FIELD === viewData.COMP_FIELD && node.COMP_TYPE === viewData.COMP_TYPE && node.COMP_TAG === viewData.COMP_TAG,
  );

  const originIdxKey = viewData.CONFIG.property.layerIdxKey;
  viewData.ORD = compData.length + 1;
  if (viewDataIdx > -1) {
    compData[viewDataIdx] = viewData;
  } else {
    compData.push(viewData);
    if (viewCnt === 0) {
      const modifyIdxKey = `layerIdx_${getNewKey()}`;
      const modifyData = cloneJSON(viewData);
      modifyData.NAME_KOR = 'BASIC';
      modifyData.COMP_TAG = 'MODIFY';
      modifyData.ORD = compData.length + 1;
      modifyData.CONFIG.property.layerIdxKey = modifyIdxKey;
      modifyData.CONFIG.property.layer.groups = setGroupsLayerIdxKey(viewData.CONFIG.property.layer.groups, originIdxKey, modifyIdxKey);
      compData.push(modifyData);

      const viewIdxKey = `layerIdx_${getNewKey()}`;
      const newViewData = cloneJSON(viewData);
      newViewData.NAME_KOR = 'BASIC';
      newViewData.COMP_TAG = 'VIEW';
      newViewData.ORD = compData.length + 1;
      newViewData.CONFIG.property.layerIdxKey = viewIdxKey;
      newViewData.CONFIG.property.layer.groups = setGroupsLayerIdxKey(modifyData.CONFIG.property.layer.groups, originIdxKey, viewIdxKey);
      compData.push(newViewData);

      const listIdxKey = `layerIdx_${getNewKey()}`;
      const newListData = cloneJSON(viewData);
      newListData.NAME_KOR = 'BASIC';
      newListData.COMP_TAG = 'LIST';
      newListData.ORD = compData.length + 1;
      newListData.CONFIG.property.layerIdxKey = listIdxKey;
      newListData.CONFIG.property.layer.groups = setInitListGroups(
        compData.filter(fNode => fNode.COMP_FIELD === 'TITLE' || fNode.COMP_FIELD === 'REG_USER_NAME' || fNode.COMP_FIELD === 'REG_DTTM'),
      );
      compData.push(newListData);

      compData = compData.map(node => {
        const tempNode = { ...node };
        if (tempNode.COMP_TYPE !== 'VIEW' && tempNode.CONFIG.property.layerIdx && tempNode.CONFIG.property.layerIdx[originIdxKey]) {
          tempNode.CONFIG.property.layerIdx[modifyIdxKey] = tempNode.CONFIG.property.layerIdx[originIdxKey];
          tempNode.CONFIG.property.layerIdx[viewIdxKey] = tempNode.CONFIG.property.layerIdx[originIdxKey];
        }
        if (tempNode.COMP_FIELD === 'TITLE' || tempNode.COMP_FIELD === 'REG_USER_NAME' || tempNode.COMP_FIELD === 'REG_DTTM') {
          if (tempNode.CONFIG.property.layerIdx) tempNode.CONFIG.property.layerIdx[listIdxKey] = '1-0-0';
          else tempNode.CONFIG.property.layerIdx = { [listIdxKey]: '1-0-0' };
        } else if (tempNode.COMP_FIELD === 'REG_USER_NAME') {
          if (tempNode.CONFIG.property.layerIdx) tempNode.CONFIG.property.layerIdx[listIdxKey] = '1-0-1';
          else tempNode.CONFIG.property.layerIdx = { [listIdxKey]: '1-0-1' };
        } else if (tempNode.COMP_FIELD === 'REG_DTTM') {
          if (tempNode.CONFIG.property.layerIdx) tempNode.CONFIG.property.layerIdx[listIdxKey] = '1-0-2';
          else tempNode.CONFIG.property.layerIdx = { [listIdxKey]: '1-0-2' };
        }
        return tempNode;
      });

      // todo list basic view...
    }
  }
  const response = yield call(Axios.post, '/api/builder/v1/work/metaviewpage', {
    PARAM: { compList: compData, WORK_SEQ: workInfo.workSeq, beforeMetaList: compData.filter(fNode => fNode.COMP_TYPE === 'FIELD') },
  });
  if (response && response.result && response.result > 0) {
    const viewList = response.PARAM.compList.filter(fNode => fNode.COMP_TYPE === 'VIEW').map(node => ({ ...node, CONFIG: JSON.parse(node.CONFIG) }));
    const currentViewIdx = viewList.findIndex(iNode => iNode.CONFIG.property.layerIdxKey === originIdxKey);
    yield put(actions.getMetaDataBySaga(workInfo.workSeq, workInfo.viewType, viewList[currentViewIdx].META_SEQ));
    message.success(<MessageContent>Save</MessageContent>);
  }
}

function* getComponentPoolList() {
  const response = yield call(Axios.get, '/api/builder/v1/work/ComponentPool');
  if (response) {
    yield put(actions.setComponentPoolListByReducer(response.compPoolList, response.colGroup));
  }
}

function* getSysMetaList() {
  const response = yield call(Axios.get, '/api/builder/v1/work/sysmeta');
  if (response && response.list) {
    yield put(actions.setSysMetaListByReducer(response.list));
  }
}

export default function* watcher() {
  yield takeLatest(constantTypes.GET_METADATA_SAGA, getMetaData);
  yield takeLatest(constantTypes.ADD_METADATA_SAGA, addMetaData);
  yield takeLatest(constantTypes.GET_COMPONENT_POOL_SAGA, getComponentPoolList);
  yield takeLatest(constantTypes.GET_SYSMETA_LIST_SAGA, getSysMetaList);
}
