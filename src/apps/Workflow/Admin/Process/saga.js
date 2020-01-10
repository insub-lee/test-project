import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constantTypes from './constants';
import * as actions from './actions';

function* saveProcessInfo({ processInfo }) {
  const response = yield call(Axios.post, '/api/workflow/v1/common/process', processInfo);
  const { code, prcInfo } = response;
  if (code === 0) {
    yield put(actions.getProcessData({ prcId: prcInfo.PRC_ID }));
    yield put(actions.setModalVisible(false));
    yield put(actions.setSpinning(false));
  }
}

function* updateProcessInfo({ processInfo }) {
  const response = yield call(Axios.put, '/api/workflow/v1/common/process', processInfo);
  const { code } = response;
  if (code === 0) {
    yield put(actions.getProcessData({ prcId: processInfo.PRC_ID }));
    yield put(actions.setModalVisible(false));
    yield put(actions.setSpinning(false));
  }
}

function* deleteProcessInfo({ processInfo }) {
  const response = yield call(Axios.delete, '/api/workflow/v1/common/process', processInfo);
  const { code } = response;
  if (code === 0) {
    yield put(actions.initProcessData());
  }
}

function* getProcessData({ payload }) {
  const response = yield call(Axios.get, `/api/workflow/v1/common/process?prcId=${payload.prcId}`);
  const { processInfo, processStep } = response;
  yield put(actions.setProcessData(processInfo, processStep));
}

export default function* watcher() {
  yield takeLatest(constantTypes.SAVE_PROCESS_INFO, saveProcessInfo);
  yield takeLatest(constantTypes.UPDATE_PROCESS_INFO, updateProcessInfo);
  yield takeLatest(constantTypes.DELETE_PROCESS_INFO, deleteProcessInfo);
  yield takeLatest(constantTypes.GET_PROCESS_DATA, getProcessData);
}
