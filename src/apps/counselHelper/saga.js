import { Axios } from 'utils/AxiosFunc';
import { takeEvery, call, put } from 'redux-saga/effects';
import * as action from './constants';
import * as actions from './actions';

function* getCardList(payload) {
  const { BIZGRP_ID } = payload;
  const { WIDGET_ID } = payload;
  const { KEYWORD } = payload;

  const response = yield call(Axios.post, `/api/bizstore/v1/bizgroup/counsel`, { BIZGRP_ID, KEYWORD });
  const { cardList } = response;

  // yield put({ type: action.SAVE_CARD_LIST, cardList, WIDGET_ID, KEYWORD });
  yield put(actions.saveCardList(cardList, WIDGET_ID, KEYWORD));
}

export default function* watcher() {
  yield takeEvery(action.GET_CARD_LIST, getCardList);
}
