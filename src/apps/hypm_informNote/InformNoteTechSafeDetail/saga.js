import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* loadingTechSafeDetailParam(payload) {
  const techSafeDetail = yield call(Axios.post, '/api/gipms/v1/informNote/loadingUtillityInformNoteSearchPopup', payload.value);
  if (techSafeDetail.list.informNoteList.length > 0) {
    yield put({
      type: constants.LOADING_TECHSAFE_DETAIL_SEARCH,
      techSafeDetail: techSafeDetail.list.informNoteList,
    });
  } else {
    yield put({
      type: constants.LOADING_TECHSAFE_DETAIL_SEARCH,
      techSafeDetail: undefined,
    });
  }
}

export default function* noteSaga() {
  yield takeLatest(constants.LOADING_TECHSAFE_DETAIL_SEARCH_SAGA, loadingTechSafeDetailParam);
}
