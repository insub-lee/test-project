import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constantTypes from './constants';
import * as actions from './actions';

function* getProcessData({ payload }) {
  const response = yield call(Axios.get, `/api/workflow/v1/common/process?prcId=${payload.prcId}`);
  const { processInfo, processStep } = response;
  yield put(actions.setProcessData(processInfo, processStep));
}

export default function* watcher() {
  yield takeLatest(constantTypes.GET_PROCESS_DATA, getProcessData);
}
