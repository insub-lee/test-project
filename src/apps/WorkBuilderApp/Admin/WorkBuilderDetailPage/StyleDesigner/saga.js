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
  yield put(actions.enableContentLoading());
  const response = yield call(Axios.get, `/api/builder/v1/work/meta?workSeq=${workSeq}`);
  const sysResponse = yield call(Axios.get, `/api/builder/v1/work/sysmeta?workSeq=${workSeq}`);
  const compResponse = yield call(Axios.get, '/api/builder/v1/work/ComponentPool');
  if (response && response.resultType && response.resultType.length > 0 && response[response.resultType] && response[response.resultType].length > 0) {
    let metaList = response[response.resultType].map(node => ({ ...node, CONFIG: JSON.parse(node.CONFIG) }));
    metaList = metaList.map(node => ({
      ...node,
      OriginSize: node.COMP_TYPE === 'FIELD' && node.CONFIG.info && node.CONFIG.info.size ? node.CONFIG.info.size : 0,
    }));
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
  yield put(actions.disableContentLoading());
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

function* addMetaData({ callbackFunc }) {
  const viewData = yield select(selectors.makeSelectViewData());
  const compData = yield select(selectors.makeSelectCompData());
  const workInfo = yield select(selectors.makeSelectWorkInfo());

  const viewDataIdx = compData.findIndex(
    node => node.COMP_FIELD === viewData.COMP_FIELD && node.COMP_TYPE === viewData.COMP_TYPE && node.COMP_TAG === viewData.COMP_TAG,
  );

  const originIdxKey = viewData.CONFIG.property.layerIdxKey;
  viewData.ORD = compData.length + 1;
  if (viewDataIdx > -1) {
    compData[viewDataIdx] = viewData;
  } else {
    compData.push(viewData);
  }
  const response = yield call(Axios.post, '/api/builder/v1/work/metaviewpage', {
    PARAM: { compList: compData, WORK_SEQ: workInfo.workSeq, beforeMetaList: compData.filter(fNode => fNode.COMP_TYPE === 'FIELD') },
  });
  if (response && response.result && response.result > 0) {
    const viewList = response.PARAM.compList.filter(fNode => fNode.COMP_TYPE === 'VIEW').map(node => ({ ...node, CONFIG: JSON.parse(node.CONFIG) }));
    const currentViewIdx = viewList.findIndex(iNode => iNode.CONFIG.property.layerIdxKey === originIdxKey);
    yield put(actions.getMetaDataBySaga(workInfo.workSeq, workInfo.viewType, viewList[currentViewIdx].META_SEQ));
    message.success(<MessageContent>Save</MessageContent>);
    if (typeof callbackFunc === 'function') callbackFunc();
  }
}

export default function* watcher() {
  yield takeLatest(constantTypes.GET_METADATA_SAGA, getMetaData);
  yield takeLatest(constantTypes.ADD_METADATA_SAGA, addMetaData);
}
