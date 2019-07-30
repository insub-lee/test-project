import { takeLatest, put, call, select } from 'redux-saga/effects';

import { Axios } from 'utils/AxiosFunc';

import * as actionTypes from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

function* fetchData({ id }) {
  yield put(actions.enableLoading());

  const response = yield call(Axios.get, `/api/builder/v1/work/meta?workSeq=${id}`);
  const { list } = response;
  const workFlow = list.find(meta => meta.COMP_TYPE === 'WORKFLOW');
  yield put(actions.successFetchData({ workFlow }));
  yield put(actions.disableLoading());
}

function* setProcessId({ prcId }) {
  console.debug('Edititng...');
  yield put(actions.enableLoading());
  const workFlowInfo = yield select(selectors.makeSelectWorkFlowInfo());
  const config = JSON.parse(workFlowInfo.CONFIG || '{ "info": {} }');
  config.info.PRC_ID = prcId;
  console.debug('@ Data', prcId, workFlowInfo);
  console.debug('@ Config', prcId, config);
  const payload = {
    PARAM: {
      ...workFlowInfo,
      CONFIG: JSON.stringify(config),
    },
  };
  const response = yield call(Axios.post, '/api/builder/v1/work/meta', payload);
  console.debug('Response', response);
  const { PARAM: data } = response;
  yield put(actions.successUpdatePrcId(data));
  yield put(actions.disableLoading());
}

export default function* watcher() {
  yield takeLatest(actionTypes.FETCH_DATA, fetchData);
  yield takeLatest(actionTypes.SET_PROCESS_ID, setProcessId);
}
