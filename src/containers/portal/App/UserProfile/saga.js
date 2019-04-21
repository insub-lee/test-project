import { takeLatest, put, call } from 'redux-saga/effects';
import * as actionType from './constants';
import { Axios } from '../../../../utils/AxiosFunc';

export function* getFullPath(payload) {
  const ID = payload.id;
  const data = {
    PARAM: {
      USERID: ID,
    },
  };
  const response = yield call(Axios.post, '/api/common/v1/account/appProfileLoad/', data);
  const result = response.profile[0];
  yield put({ type: actionType.SET_FULLPATH_SUCCESS, result });
}

export default function* rootSaga() {
  yield takeLatest(actionType.GET_FULLPATH_SAGA, getFullPath);
}
