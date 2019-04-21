import { takeLatest, put, call } from 'redux-saga/effects';
import * as actionType from './constants';

import { Axios } from '../../utils/AxiosFunc';

export function* sendApply(payload) {
  const data = {
    PARAM: {
      APPID: payload.appID,
      PAGEID: payload.pageID,
      NOTE: payload.note,
    },
  };
  const response = yield call(Axios.post, '/api/portal/v1/page/sendapply', data);
  const re = response.result;

  if (re > 0) {
    yield put({ type: actionType.SEND_APPLY_REDUCER });
  }
}

export function* cancelApply(payload) {
  const data = {
    PARAM: {
      APPID: payload.appID,
      PAGEID: payload.pageID,
    },
  };
  const response = yield call(Axios.post, '/api/portal/v1/page/senddeleteapply', data);
  const re = response.result;

  if (re === 'success') {
    yield put({ type: actionType.SEND_APPLY_DELETE_REDUCER });
  }
}

export default function* rootSaga() {
  yield takeLatest(actionType.SEND_APPLY_SAGA, sendApply);
  yield takeLatest(actionType.SEND_CANCEL_APPLY, cancelApply);
}
