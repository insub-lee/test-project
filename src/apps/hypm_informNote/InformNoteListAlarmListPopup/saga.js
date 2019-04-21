import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as feed from 'components/Feedback/functions';
import * as constants from './constants';

export function* loadingParam(payload) {
  const data1 = { // SDPT
    comboType: 'COMBO_WORK_CENTER',
    PARAM_BEBER: payload.param.PARAM_BEBER,
    PARAM_STAND: payload.param.PARAM_STAND,
  };
  const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data1);

  const data2 = { // DownType
    comboType: 'COMBO_CODING_TYPE2',
    PARAM_KATALOGART: 'D',
    MULTI_PARAM_CODEGRUPPE: payload.param.MULTI_PARAM_CODEGRUPPE,
  };
  const response2 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data2);

  const downTypeList = response2.list.comboList;
  for (let i = downTypeList.length - 1; i >= 0; i -= 1) {
    if (downTypeList[i].CODE === '040' || downTypeList[i].CODE === '090' || downTypeList[i].CODE === '100' ||
    downTypeList[i].CODE === '110' || downTypeList[i].CODE === '120' || downTypeList[i].CODE === '210' ||
    downTypeList[i].CODE === '220' || downTypeList[i].CODE === '230' || downTypeList[i].CODE === '240' ||
    downTypeList[i].CODE === '320') {
      downTypeList.splice(i, 1);
    }
  }

  const data3 = { // F/L
    comboType: 'COMBO_FUNCTIONAL_LOCATION',
    PARAM_BEBER: payload.param.PARAM_BEBER,
    PARAM_STAND: payload.param.PARAM_STAND,
  };
  const response3 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data3);

  yield put({
    type: constants.LOADING_PARAM,
    sdptList: response1.list.comboList,
    downTypeList,
    flList: response3.list.comboList,
  });
}

export function* loadingSdptParam(payload) {
  const data1 = { // Model
    comboType: 'COMBO_OBJECT_TYPE',
    PARAM_ARBPL: payload.value,
  };
  const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data1);

  yield put({
    type: constants.LOADING_SDPT_PARAM,
    modelList: response1.list.comboList,
  });
}

export function* loadingFlParam(payload) {
  const data = { // Model
    comboType: 'COMBO_OBJECT_TYPE_WITH_FL',
    PARAM_BEBER: payload.param.PARAM_BEBER,
    PARAM_STAND: payload.param.PARAM_STAND,
    MULTI_PARAM_TPLNR: payload.param.MULTI_PARAM_TPLNR,
    PARAM_ARBPL: payload.param.PARAM_ARBPL,
  };
  const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data);

  yield put({
    type: constants.LOADING_FL_PARAM,
    modelList: response1.list.comboList,
  });
}

export function* alarmListSearch(payload) {
  const response1 = yield call(Axios.post, '/api/gipms/v1/informNote/fabInformNoteListAlarmListPopupSearch', payload.param);
  if (response1.list.alarmDataList) {
    yield put({
      type: constants.LOADING_ALARM_SEARCH,
      alarmDataList: fromJS(response1.list.alarmDataList),
    });
  }
}

export function* alarmListSave(payload) {
  const param = {
    list: {
      deleteList: payload.value,
    },
  };

  const response1 = yield call(Axios.post, '/api/gipms/v1/informNote/fabInformNoteListAlarmListPopupDelete', param);
  if (response1.errCode > 0) {
    feed.success('저장이 완료 되었습니다.');
  } else {
    feed.error('저장에 실패하였습니다.');
  }
}

export default function* alarmListSaga() {
  yield takeLatest(constants.LOADING_PARAM_SAGA, loadingParam);
  yield takeLatest(constants.LOADING_SDPT_PARAM_SAGA, loadingSdptParam);
  yield takeLatest(constants.LOADING_FL_PARAM_SAGA, loadingFlParam);
  yield takeLatest(constants.LOADING_ALARM_SEARCH_SAGA, alarmListSearch);
  yield takeLatest(constants.LOADING_ALARM_SAVE_SAGA, alarmListSave);
}
