import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constantTypes from './constants';
import * as actions from './actions';
import * as draftListActions from '../actions';

function* getDraftDetail({ payload }) {
  const response = yield call(Axios.get, `/api/workflow/v1/common/draft/detail?draftId=${payload.DRAFT_ID}&queId=${payload.QUE_ID}`);
  const { detail, signline, draftHistory } = response;
  yield put(actions.setDraftDetail(detail, signline, draftHistory));
}

function* requestApproval({ payload }) {
  const response = yield call(Axios.put, `/api/workflow/v1/common/draft/detail`, payload);
  const { code } = response;
  if (code === 200) {
    // yield put(actions.setIsRedirect(true));
    yield put(actions.setVisibleOpinionModal(false));
    // yield put(draftListActions.setSelectedDraft({}, false));
  } else {
    alert('결재요청 실패!!!!');
  }
}

export default function* watcher() {
  yield takeLatest(constantTypes.GET_DRAFT_DETAIL, getDraftDetail);
  yield takeLatest(constantTypes.REQ_APPROVAL, requestApproval);
}
