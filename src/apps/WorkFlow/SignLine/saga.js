import { takeEvery, call, put } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as actionTypes from './constants';
import * as actions from './actions';

function* getDraftPrcRule({ draftId }) {
  const response = yield call(Axios.post, `/api/workflow/v1/common/workprocess/draftPrcRuleHanlder`, { PARAM: { DRAFT_ID: draftId } });
  const { draftPrcRule } = response;
  yield put(actions.setDraftPrcRule(draftPrcRule));
}

export default function* watcher() {
  yield takeEvery(actionTypes.GET_DRAFT_PRC_RULE, getDraftPrcRule);
}
