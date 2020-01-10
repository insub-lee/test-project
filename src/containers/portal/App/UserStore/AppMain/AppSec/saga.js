import { takeLatest, put, call } from 'redux-saga/effects';
import { intlObj } from 'utils/commonUtils';
import { Axios } from 'utils/AxiosFunc';
import * as actionType from './constants';
import messages from './messages';

/* eslint-disable */
export function* getAppSecList(payload) {
  const { PAGE, PAGE_CNT, SORT_COLUMN, SORT_DIRECTION, APP_ID, REQ_STATUS_CD, SEARCH_TEXT } = payload;

  const status = {
    P: intlObj.get(messages.request),
    C: intlObj.get(messages.confirm),
    R: intlObj.get(messages.return),
    N: intlObj.get(messages.cancel),
  };

  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/getAppSecList/', {
    PAGE,
    PAGE_CNT,
    SORT_COLUMN,
    SORT_DIRECTION,
    APP_ID,
    REQ_STATUS_CD,
    SEARCH_TEXT,
  });

  let appSecList = response.result;
  const appAuthCnl = { response };

  appSecList = appSecList.map(app => {
    const appCopy = Object.assign({}, app);
    appCopy.STATUS = status[app.REQ_STATUS_CD];
    if (app.REQ_STATUS_CD === 'C') {
      appCopy.SEC_CANCEL = true;
    }
    return appCopy;
  });

  yield put({
    type: actionType.GET_APPSECLIST,
    appSecList,
    appAuthCnl,
  });
}

export function* returnRequest(payload) {
  const { REQ_ID_ARR, COMMENT, loadingSet } = payload;

  const { PAGE, PAGE_CNT, SORT_COLUMN, SORT_DIRECTION, APP_ID, REQ_STATUS_CD, SEARCH_TEXT } = loadingSet;

  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/returnRequest/', {
    REQ_ID_ARR,
    COMMENT,
  });

  if (response.result === 'success') {
    yield put({
      type: actionType.GET_APPSECLIST_SAGA,
      PAGE,
      PAGE_CNT,
      SORT_COLUMN,
      SORT_DIRECTION,
      APP_ID,
      REQ_STATUS_CD,
      SEARCH_TEXT,
    });
  }
}

export function* cancelRequest(payload) {
  const { REQ_ID, COMMENT, loadingSet } = payload;

  const { PAGE, PAGE_CNT, SORT_COLUMN, SORT_DIRECTION, APP_ID, REQ_STATUS_CD, SEARCH_TEXT } = loadingSet;

  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/cancelRequest/', {
    REQ_ID,
    COMMENT,
  });

  if (response.result === 'success') {
    yield put({
      type: actionType.GET_APPSECLIST_SAGA,
      PAGE,
      PAGE_CNT,
      SORT_COLUMN,
      SORT_DIRECTION,
      APP_ID,
      REQ_STATUS_CD,
      SEARCH_TEXT,
    });
  }
}

export function* confirmRequest(payload) {
  const { REQ_ID_ARR, loadingSet } = payload;

  const { PAGE, PAGE_CNT, SORT_COLUMN, SORT_DIRECTION, APP_ID, REQ_STATUS_CD, SEARCH_TEXT } = loadingSet;

  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/confirmRequest', {
    REQ_ID_ARR,
  });

  if (response.result === 'success') {
    yield put({
      type: actionType.GET_APPSECLIST_SAGA,
      PAGE,
      PAGE_CNT,
      SORT_COLUMN,
      SORT_DIRECTION,
      APP_ID,
      REQ_STATUS_CD,
      SEARCH_TEXT,
    });
  }
}

export default function* rootSaga() {
  yield takeLatest(actionType.GET_APPSECLIST_SAGA, getAppSecList);
  yield takeLatest(actionType.RETURN_REQUEST, returnRequest);
  yield takeLatest(actionType.CANCEL_REQUEST, cancelRequest);
  yield takeLatest(actionType.CONFIRM_REQUEST, confirmRequest);
}
