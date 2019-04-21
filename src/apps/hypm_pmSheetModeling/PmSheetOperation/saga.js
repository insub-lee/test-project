import React from 'react';
import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';
import * as feed from 'components/Feedback/functions';
import MessageContent from 'components/Feedback/message.style2';
import message from 'components/Feedback/message';
import * as loadingConstants from 'containers/common/Loading/constants';

// get these operation data list
export function* loadingFactoryParam(payload) {

  const data2 = {
    comboType: 'COMBO_TASKLIST_RELATION_CODE',
    IV_MODE: '3',
    IV_STRAT: payload.param.PARAM_STRAT,
    comboSessionWhereAble: 'false',
  };
  // console.log('payload in pmsheetOperation about param: ', payload.param);
  const response2 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data2);
  console.log('response2.list.IT_LIST: ', response2.list.IT_LIST);
  response2.list.IT_LIST2 = [{CODE: 'A', TEXT: '자사용'},{CODE: 'B', TEXT: '도급사용'}];
  console.log('response2.list.IT_LIST2: ', response2.list.IT_LIST2);
  const param = {
    PARAM_PLNAL: payload.param.PARAM_PLNAL,
    PARAM_PLNNR: payload.param.PARAM_PLNNR,
    PARAM_REVISION: payload.param.PARAM_REVISION,
  };
  yield put({
    type: loadingConstants.LOADING_ON,
  });
  const data = yield call(Axios.post, '/api/gipms/v1/pmmodel/masterPmSheetOperation', param);
  yield [
    put({
    type: constants.LOADING_PMSHEET_OPERATION_PARAM,
    pmSheetDataList: fromJS(data.list.pmSheetDataList),
    pmTypeCombo: response2.list.IT_LIST,
    pmTypeCombo2: response2.list.IT_LIST2,
    searchSuccess: true,
    }),
    put({
      type: loadingConstants.LOADING_OFF,
    })
  ];
  console.log('fromJS(data.pmSheetDataList): ', fromJS(data.list.pmSheetDataList));
  if (!data) {
    feed.error('데이터 조회에 실패하였습니다. 다시 시도해 주세요.');
  }
}

// get the getTaskRevisionMaxYn data
export function* loadingSaveParam(payload) {
  const data1 = {
    param: payload.value,
  };
  const response1 = yield call(Axios.post, '/api/gipms/v1/pmmodel/PmSheetSaveYn', data1);
  if (response1.dataSet) {
    yield put({
      type: constants.LOADING_SAVE_PARAM,
      save: response1.dataSet[0].REVISION_MAX_YN,
    });
  }
}

// save pmsheetOperation data
export function* loadingPmSheetOperationSaveParam(payload) {
  yield put({
    type: loadingConstants.LOADING_ON,
  });
  const response1 = yield call(Axios.post, '/api/gipms/v1/pmmodel/masterPmSheetOperationListSave', payload.value);
  if (response1) {
    yield [
      put({
        type: constants.LOADING_PMSHEET_OPERATION_GRID_SAVE_PARAM, // LOADING_PMSHEET_OPERATION_GRID_SAVE_PARAM, LOADING_PMSHEET_OPERATION_PARAM_SAGA
        save: response1.dataSet,
      }),
      put({
        type: loadingConstants.LOADING_OFF,
      })
    ];
  }
  const { resultCode } = response1;
  console.log('resultCode: ', resultCode);
  if (resultCode === '00000') {
    message.success(
      <MessageContent>
        저장되었습니다
      </MessageContent>,
      3,
    );
  } else {
    feed.error('저장에 실패하였습니다');
  }
}

export default function* pmSheetSaga() {
  yield takeLatest(constants.LOADING_PMSHEET_OPERATION_PARAM_SAGA, loadingFactoryParam);
  yield takeLatest(constants.LOADING_SAVE_PARAM_SAGA, loadingSaveParam);
  yield takeLatest(constants.LOADING_PMSHEET_OPERATION_GRID_SAVE_PARAM_SAGA, loadingPmSheetOperationSaveParam);

  // yield takeLatest(constants.LOADING_PMSHEET_OPERATION_GRID_SAVE_PARAM_SAGA, loadingPmSheetOperationSaveParam);
}
