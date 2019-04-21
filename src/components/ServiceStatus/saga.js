import { takeLatest, put, call } from 'redux-saga/effects';
import * as actionType from './constants';

import { Axios } from '../../utils/AxiosFunc';

export function* getService(payload) {
  const data = {
    PARAM: {
      APPID: payload.appID,
      PAGEID: payload.pageID,
    },
  };
  const response = yield call(Axios.post, '/api/portal/v1/page/appservice', data);
  const servicedata = response.DATA;
  if (servicedata.length > 0) {
    yield put({ type: actionType.SET_SERVICE_DATA, servicedata });
  }
}

export default function* rootSaga() {
  yield takeLatest(actionType.GET_SERVICE_DATA, getService);
}
