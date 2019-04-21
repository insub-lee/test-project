import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* saveInformNotice(payload) {
  const { param } = payload;
  const response = yield call(Axios.post, '/api/gipms/v1/informNote/saveInformNoticeTab', param);
  console.log(response.resultMsg);
  // yield put({
  //   type: constants.INFORMNOTICE_SAVERESULT,
  //   saveResult: response.resultMsg,
  // });
}

export function* commonJobInterlockCheck(payload) {
  const { param } = payload;
  const response = yield call(Axios.post, '/api/gipms/v1/common/commonJobInterlockCheck', param);
  console.log(response.resultMsg);
}

export default function* pmSheetSaga() {
  yield takeLatest(constants.SAVE_INFORMNOTICE_TAB_SAGA, saveInformNotice);
  yield takeLatest(constants.COMMON_JOB_INTERLOCK_CHECK_SAGA, commonJobInterlockCheck);
}
