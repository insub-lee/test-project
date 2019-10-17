import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constantTypes from './constants';
import * as actions from './actions';

function* getDraftList({ payload, pathname }) {
  console.debug('###### get Draft List call #####');
  console.debug('payload', payload);
  const response = yield call(Axios.get, `/api/workflow/v1/common/draft/list?searchType=${payload.searchType}`);
  const { list } = response;
  yield put(actions.setDraftList(list, pathname));
}

export default function* watcher() {
  yield takeLatest(constantTypes.GET_DRAFT_LIST, getDraftList);
}
