import React from 'react';
import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { Axios } from 'utils/AxiosFunc';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import * as constantTypes from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

function* getMetaData({ workSeq }) {
  console.debug(workSeq);
}

function* addMetaData() {
  const groups = yield select(selectors.makeSelectGroups());
  const compData = yield select(selectors.makeSelectCompData());
  const workInfo = yield select(selectors.makeSelectWorkInfo());
  let isError = false;

  compData.forEach(node => {
    if (!node.COMP_FIELD || (node.COMP_FIELD && node.COMP_FIELD.length) < 1) isError = true;
    else if (!node.NAME_KOR || (node.NAME_KOR && node.NAME_KOR.length) < 1) isError = true;
  });

  if (isError) {
    message.error(<MessageContent>필드 데이터를 채워주세요.</MessageContent>);
    return;
  }

  const viewMetaData = {
    WORK_SEQ: workInfo.workSeq,
    COMP_TYPE: 'VIEW',
    COMP_TAG: workInfo.viewType,
    COMP_FIELD: 'testView',
    NAME_KOR: 'testView@',
    ORD: 1,
    PRNT_SEQ: workInfo.workSeq,
    CONFIG: {
      info: { type: 'VIEW' },
      property: {
        WORK_SEQ: workInfo.workSeq,
        COMP_TAG: workInfo.viewType,
        COMP_TYPE: 'VIEW',
        COMP_FIELD: 'testView',
        NAME_KOR: 'testView@',
        PRNT_SEQ: workInfo.workSeq,
        layer: groups,
      },
      option: {},
    },
  };
  compData.push(viewMetaData);
  console.debug(compData.sort((a, b) => a.ORD - b.ORD));
  const response = yield call(Axios.post, '/api/builder/v1/work/metaviewpage', { PARAM: { compList: compData.sort((a, b) => a.ORD - b.ORD) } });
  const payload = {
    PARAM: {
      WORK_SEQ: workInfo.workSeq,
    },
  };
  if (response) {
    console.debug(response);
    const createResponse = yield call(Axios.post, '/api/builder/v1/work/create', payload);
  }
}

export default function* watcher() {
  yield takeLatest(constantTypes.GET_METADATA_BY_SAGA, getMetaData);
  yield takeLatest(constantTypes.ADD_METADATA_BY_SAGA, addMetaData);
}
