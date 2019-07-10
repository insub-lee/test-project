import { put, takeLatest, call, select } from 'redux-saga/effects';

import { IflowApi } from 'utils/IflowFunc';

import * as constants from './constants';
import * as actions from './actions';

export function* getList({ page, pagepernum }) {
  const payload = { page, pagepernum };
  const uInfo = yield select(state => state.get('auth').get('profile'));
  const response = yield call(IflowApi.getTimeline, 'timeline', uInfo.EMP_NO, payload);
  const { articles } = response;
  const list = articles.map(article => ({
    ...article,
    empNo: article.empnoRegist,
  }));
  yield put(actions.setList(list));
}

export default function* watcher() {
  yield takeLatest(constants.GET_LIST, getList);
}
