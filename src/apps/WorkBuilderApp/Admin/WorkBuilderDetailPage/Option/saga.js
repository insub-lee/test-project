import { takeLatest, put, call, select } from 'redux-saga/effects';

import { Axios } from 'utils/AxiosFunc';

import * as actionTypes from './constants';
import * as selectors from './selectors';
import * as actions from './actions';

function* fetchData({ id }) {
  yield put(actions.enableLoading());

  const response = yield call(Axios.get, `/api/builder/v1/work/meta?workSeq=${id}`);
  const { list } = response;
  const workFlow = list.find(meta => meta.COMP_TYPE === 'WORKFLOW');
  const revision = list.find(meta => meta.COMP_TYPE === 'REVISION');
  yield put(actions.successFetchData({ workFlow, revision }));
  yield put(actions.disableLoading());
}

function* toggleUseWorkFlow({ checked }) {
  const workSeq = yield select(selectors.makeSelectWorkSeq());
  if (checked) {
    // Todo - Post USE WORKFLOW
    const payload = {
      PARAM: {
        WORK_SEQ: workSeq,
        PRNT_SEQ: workSeq,
        ORD: 0,
        COMP_TYPE: 'WORKFLOW',
        COMP_TAG: 'WORKFLOW',
        COMP_FIELD: ' ',
        CONFIG: JSON.stringify({
          info: {},
        }),
      },
    };
    const response = yield call(Axios.put, '/api/builder/v1/work/meta', payload);
    const { PARAM: data } = response;
    yield put(actions.successEnableUseWorkFlow(data));
  } else {
    // Todo - Remove USE WORKFLOW
    const { META_SEQ: metaSeq } = yield select(selectors.makeSelectWorkFlowInfo());
    const response = yield call(Axios.delete, `/api/builder/v1/work/${workSeq}/meta/${metaSeq}`);
    console.debug('@ Response', response);
  }
}

function* toggleUseRevision({ checked }) {
  const workSeq = yield select(selectors.makeSelectWorkSeq());
  if (checked) {
    const payload = {
      PARAM: {
        WORK_SEQ: workSeq,
        PRNT_SEQ: workSeq,
        ORD: 0,
        COMP_TYPE: 'REVISION',
        COMP_TAG: 'REVISION',
        COMP_FIELD: ' ',
        CONFIG: JSON.stringify({
          info: {},
        }),
      },
    };
    const response = yield call(Axios.put, '/api/builder/v1/work/meta', payload);
    const { PARAM: data } = response;
    yield put(actions.successEnableUseRevision(data));
  } else {
    const { META_SEQ: metaSeq } = yield select(selectors.makeSelectRevisionInfo());
    const response = yield call(Axios.delete, `/api/builder/v1/work/${workSeq}/meta/${metaSeq}`);
    console.debug('@ Response', response);
  }
}

export default function* watcher() {
  yield takeLatest(actionTypes.FETCH_DATA, fetchData);
  yield takeLatest(actionTypes.TOGGLE_USE_WORK_FLOW, toggleUseWorkFlow);
  yield takeLatest(actionTypes.TOGGLE_USE_REVISION, toggleUseRevision);
}
