import { takeLatest, call, put } from 'redux-saga/effects';
// import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';
import { LoadingNoticeList } from './actions';

export function* loadingNoticeList(action) {
  const payload = {};
  payload.param = {
    INSP_LOT: action.payload.value,
  };
  const response = yield call(Axios.post, '/api/gipms/v1/pmsheet/loadingNoticeList', payload);
  yield put({
    type: constants.LOADING_NOTICE_LIST,
    noticeList: response.dataList,
  });
}

export function* updateNotice(action) {
  const payload = {};
  payload.param = {
    INSP_LOT: action.payload.inspLot,
    EMP_NUM: action.payload.empNo,
    CO_WORKER: action.payload.coWorker,
    CONTENT: action.payload.content,
  };
  const response = yield call(Axios.post, '/api/gipms/v1/pmsheet/updateNotice', payload);
  if (response && response === 0) {
    console.log('updateNotice Error');
  } else {
    yield put(LoadingNoticeList(action.payload.inspLot));
  }
}

export default function* pmSheetSaga() {
  yield takeLatest(constants.LOADING_NOTICE_LIST_SAGA, loadingNoticeList);
  yield takeLatest(constants.UPDATE_NOTICE_LIST_SAGA, updateNotice);
}
