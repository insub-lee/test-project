import { takeLatest, call, put } from 'redux-saga/effects';

import { Axios } from 'utils/AxiosFunc';

import * as actions from './actions';
import * as actionTypes from './constants';

function* fetchData() {
  const response = yield call(Axios.get, '/api/builder/v1/work/main');
  const { list } = response;
  yield put(actions.successFetchData(list));
}

function* postRegistWBApp({ appName, id }) {
  const payload = {
    APP_NAME: appName,
    ID: id,
  };
  console.debug('@@@', payload);
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/registWBApp', payload);
  console.debug(response);
  if (response.code === 200) {
    const { META_ID, appId, categoryId } = response;
    // Todo - Update Data after get response
    yield put(actions.updateWorkData(META_ID, appId, categoryId));
  }
}

function* updateWorkData({ id, appId, categoryId }) {
  const payload = {
    PARAM: {
      WORK_SEQ: id,
      APP_ID: appId,
      CATEGORY_ID: categoryId,
    },
  };
  // Todo - Update Meta
  const response = yield call(Axios.put, '/api/builder/v1/work/app', payload);
  console.debug('### Response', response);
  yield put(actions.fetchData());
}

export default function* watcher() {
  yield takeLatest(actionTypes.FETCH_DATA, fetchData);
  yield takeLatest(actionTypes.POST_REGIST_WB_APP, postRegistWBApp);
  yield takeLatest(actionTypes.UPDATE_WORK_DATA, updateWorkData);
}
