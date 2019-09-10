import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* getBizInfo(payload) {
  const { BIZGRP_ID } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/store/bizgroupinfo', { BIZGRP_ID: Number(BIZGRP_ID), pageType: 'test' });
  if (response.result) {
    yield put({
      type: constants.SET_BIZ_INFO,
      bizInfo: response.result,
    });
  }
}

export function* getBizFeedBackList(payload) {
  const { BIZGRP_ID, BOARD_TYPE } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/store/bizfeedbacklist', { BIZGRP_ID: Number(BIZGRP_ID), BOARD_TYPE });

  if (response.result.length > 0) {
    if (BOARD_TYPE === 'Q') {
      yield put({
        type: constants.SET_QNALIST,
        bizQnaList: response.result,
      });
    } else if (BOARD_TYPE === 'F') {
      yield put({
        type: constants.SET_FAQLIST,
        bizFaqList: response.result,
      });
    }
  }
}

export default function* rootSaga() {
  yield takeLatest(constants.GET_BIZ_INFO, getBizInfo);
  yield takeLatest(constants.GET_BIZ_FEEDBACKLIST, getBizFeedBackList);
}
