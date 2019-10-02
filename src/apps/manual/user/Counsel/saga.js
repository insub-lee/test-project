import { takeLatest, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { Axios } from 'utils/AxiosFunc';
import * as actions from './actions';

function* pushCounselHelperKeyword({ keyword }) {
  console.debug('keyword in saga >> ', keyword);
  const response = yield call(Axios.post, `/api/manual/v1/manualCounselHelperPush`, { KEYWORD: keyword });
}

export default function* watcher() {
  yield takeLatest('apps/manual/user/Counsel/PUSH_COUNSEL_HELPER_KEYWORD', pushCounselHelperKeyword);
}
