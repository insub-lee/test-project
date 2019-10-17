import { takeEvery, call, put } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as actionTypes from './constants';
import * as actions from './actions';

function* getDocList(payload) {
  const { NODE_ID, WIDGET_ID } = payload;
  const response = yield call(Axios.post, `/api/mdcs/v1/common/DocArchitect`, NODE_ID);
  const { docList } = response;
  yield put(actions.setDocListByReducer(docList, WIDGET_ID));
  yield put(actions.setDocNumByReducer(docList.length, WIDGET_ID));
}

export default function* watcher() {
  yield takeEvery(actionTypes.GET_DOC_LIST, getDocList);
}
