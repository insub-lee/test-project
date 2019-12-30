import { takeEvery, call, put } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as actionTypes from './constants';
import * as actions from './actions';

function* getDraftQueHistoryList({ draftId }) {
  const response = yield call(Axios.post, `/api/workflow/v1/common/workprocess/draftQueHistoryList`, { PARAM: { DRAFT_ID: draftId } });
  const { list } = response;
  yield put(actions.setDraftQueHistoryList(list));
}

export default function* watcher() {
  yield takeEvery(actionTypes.GET_DRAFT_QUE_HISTORY_LIST, getDraftQueHistoryList);
}
