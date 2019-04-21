import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* gridColumnSearch(payload) {
  const data = yield call(Axios.post, '/api/gipms/v1/common/fabInformNoteListGridColumnSetSearch', payload.param);
  yield put({
    type: constants.LOADING_GRIDCOLUMN_SEARCH,
    userGridDefineList: data.list.userGridDefineList,
  });
}

export function* gridColumnSave(payload) {
  const data = yield call(Axios.post, '/api/gipms/v1/common/fabInformNoteListGridColumnSetSave', payload.param);
  yield put({
    type: constants.LOADING_GRIDCOLUMN_SAVE,
    resultCode: data.resultCode,
  });
}

export default function* columSetSaga() {
  yield takeLatest(constants.LOADING_GRIDCOLUMN_SEARCH_SAGA, gridColumnSearch);
  yield takeLatest(constants.LOADING_GRIDCOLUMN_SAVE_SAGA, gridColumnSave);
}
