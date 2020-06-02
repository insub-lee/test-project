import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* getSiteList() {
  const response = yield call(Axios.get, '/api/common/v1/filemanage/getSiteList', {});
  const { list } = response;

  if (list) {
    yield put({
      type: constants.SET_SITE_LIST,
      siteList: fromJS(list),
    });
  }
}

export default function* rootSaga() {
  yield takeLatest(constants.GET_SITE_LIST, getSiteList);
}
