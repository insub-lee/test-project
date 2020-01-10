import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as actionType from './constants';
import { Axios } from '../../utils/AxiosFunc';

export function* getUrl(payload) {
  const data = {
    PARAM: {
      APPID: payload.appId,
      VER: payload.version,
    },
  };
  const response = yield call(Axios.post, '/api/portal/v1/page/getUrl/', data);
  const result = response.resultValue;

  if (result !== 'fail') {
    yield put({
      type: actionType.SET_LEGACYSVC_URL_SUCCESS,
      result,
    });
  } else {
    yield put({
      type: actionType.SET_LEGACYSVC_URL_FAIL,
    });
  }
}

export function* getMeta() {
  const authInfo = yield select(state => state.get('auth')).tojs;
  const META = authInfo.get('meta');
  yield put({
    type: actionType.SET_LEGACYSVC_URL_SUCCESS,
    META,
  });
}

export default function* legacySVCSaga() {
  yield takeLatest(actionType.GET_LEGACYSVC_URL_SAGA, getMeta);
}
