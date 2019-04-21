import React from 'react';
import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as feed from 'components/Feedback/functions';
import { Axios } from 'utils/AxiosFunc';
import MessageContent from 'components/Feedback/message.style2';
import message from 'components/Feedback/message';
// import messages from '../messages';
import * as constants from './constants';

export function* loadingGridParam(payload) {
  // const data1 = {
  //   param: payload.value,
  // };
  const response1 = yield call(Axios.post, '/api/gipms/v1/pmmodel/pmSheetWrokTimePopup', payload.value);
  if (response1.list.dataList && response1.list.DataList2) {
    yield put({
      type: constants.LOADING_GRID_PARAM,
      WrokTimeDataList: fromJS(response1.list.dataList),
      OperationDataList: fromJS(response1.list.DataList2),
    });
  }
  // console.log('11111111111111', response1);
  // console.log('22222222222222', response1.dataSet);
}


export function* saveWorkTime(payload) {
  /* const data1 = {
    param: payload.value,
  };
  */
  const response1 = yield call(Axios.post, '/api/gipms/v1/pmmodel/SaveWrokTime', payload.value);
  const { result } = response1;
  const { returnParam } = payload;
  if (result === '00000') {
    message.success(
      <MessageContent>
        저장되었습니다
      </MessageContent>,
      3,
    );
  } else {
    feed.error('저장에 실패하였습니다');
  }
  if (response1) {
  yield put({
    type: constants.LOADING_GRID_PARAM_SAGA,
    value: returnParam,
  });
}
  // if (response1.dataSet) {
  //   yield put({
  //     type: constants.LOADING_GRID_PARAM,
  //     saveDataList: fromJS(response1.dataSet),
  //   });
  // }
}


export default function* pmSheetSaga() {
  yield takeLatest(constants.LOADING_GRID_PARAM_SAGA, loadingGridParam);
  yield takeLatest(constants.LOADING_SAVE_WORKTIME_SAGA, saveWorkTime);
}
