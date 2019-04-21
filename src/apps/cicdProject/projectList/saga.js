import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

// CICD PROJECT LIST SEARCH
export function* loadingProjectListSearchParam(payload) {
  const response = yield call(Axios.post, '/apps/api/v1/cicd/projectListSearch', payload);

  if (response.resultList) {
    yield put({
      type: constants.LOADING_PROJECTLISTSEARCH,
      projectListSearch: fromJS(response.resultList),
    });
  }

  if (response.resultCountInfo) {
    yield put({
      type: constants.LOADING_PROJECTCOUNTINFO,
      projectCountInfo: fromJS(response.resultCountInfo.PROJECT_TOTAL_COUNT),
    });
  }
}

export default function* projectListSaga() {
  // CICD PROJECT LIST SEARCH
  yield takeLatest(constants.LOADING_PROJECTLISTSEARCH_SAGA, loadingProjectListSearchParam);
  yield takeLatest(constants.LOADING_PROJECTCOUNTINFO_SAGA, loadingProjectListSearchParam);
}
