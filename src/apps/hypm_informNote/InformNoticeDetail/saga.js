import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* loadingFabParam() {
  const data1 = { // TEAM
    PARAM_MENU: 'FAB',
    comboType: 'COMBO_PLANT_SECTION',
  };

  // const param = {
  //   FACTORY: 'factory',
  //   VERSION: 'Version',
  //   SIGNSTATUS: 'signStatus',
  // };
  const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data1);
  yield put({
    type: constants.LOADING_FAB_PARAM,
    fabList: response1.list.comboList,
    versionList: [],
    signStatusList: [],
  });
}

export function* loadingParam(payload) {
  const data1 = { // TEAM
    comboType: 'COMBO_LOCATION',
    PARAM_BEBER: payload.value,
  };
  const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data1);

  const data2 = { // SDPT
    comboType: 'COMBO_WORK_CENTER',
    PARAM_BEBER: payload.value,
  };
  const response2 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data2);

  const data3 = { // F/L
    comboType: 'COMBO_FUNCTIONAL_LOCATION',
    PARAM_BEBER: payload.value,
  };
  const response3 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data3);

  yield put({
    type: constants.LOADING_PARAM,
    // detailFactoryList: data.detailFactoryList,
    teamList: response1.list.comboList,
    sdptList: response2.list.comboList,
    flList: response3.list.comboList,
    // modelList: data.sdptList,
  });
}

// export function* loadingParam(payload) {
//   const param = {
//     factoryValue: payload.value,
//   };
//   const data = yield call(Axios.post, '/api/gipms/v1/pmsheet/loadingParam', param);
//   yield put({
//     type: constants.LOADING_PARAM,
//     // detailFactoryList: data.detailFactoryList,
//     sdptList: data.sdptList,
//     teamList: data.sdptList,
//     flList: data.sdptList,
//     modelList: data.sdptList,
//   });
// }

export function* loadingTeamParam(payload) {
  // const param = {
  //   sdptValue: payload.value,
  // };
  // const data = yield call(Axios.post, '/api/gipms/v1/pmsheet/loadingSdptParam', param);
  const data1 = { // SDPT
    comboType: 'COMBO_WORK_CENTER',
    PARAM_STAND: payload.value,
  };
  const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data1);

  const data2 = { // F/L
    comboType: 'COMBO_FUNCTIONAL_LOCATION',
    PARAM_STAND: payload.value,
  };
  const response2 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data2);

  yield put({
    type: constants.LOADING_TEAMPARAM,
    sdptList: response1.list.comboList,
    flList: response2.list.comboList,
    // modelList: data.sdptList,
  });
}


export function* loadingSdptParam(payload) {
  const data1 = { // MODEL
    comboType: 'COMBO_OBJECT_TYPE',
    PARAM_ARBPL: payload.value,
  };
  const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data1);
  yield put({
    type: constants.LOADING_SDPTPARAM,
    modelList: response1.comboList,
  });
}


export function* loadingInformNoticeSearch(payload) {
  const { param } = payload;
  const response = yield call(Axios.post, '/api/gipms/v1/informNote/fabInformNotice', param);
  if (response.list.informNoticeList) {
    yield put({
      type: constants.LOADING_INFORMNOTICE,
      informNoticeList: fromJS(response.list.informNoticeList),
    });
  }
}

export function* loadingInformNoticeDetail(payload) {
  const { param } = payload;
  const response = yield call(Axios.post, '/api/gipms/v1/informNote/fabInformNoticeDetailSearch', param);
  yield put({
    type: constants.LOADING_INFORMNOTICEDETAIL,
    informNoticeDetail: response.InformNoticeDetail,
  });
}

export function* saveInformNotice(payload) {
  const { param } = payload;
  const response = yield call(Axios.post, '/api/gipms/v1/informNote/fabSaveInformNotice', param);
  console.log(response.resultMsg);
  yield put({
    type: constants.INFORMNOTICE_SAVERESULT,
    saveResult: response.resultMsg,
  });
}

export default function* pmSheetSaga() {
  yield takeLatest(constants.LOADING_FAB_PARAM_SAGA, loadingFabParam);
  yield takeLatest(constants.LOADING_PARAM_SAGA, loadingParam);
  yield takeLatest(constants.LOADING_TEAMPARAM_SAGA, loadingTeamParam);
  yield takeLatest(constants.LOADING_SDPTPARAM_SAGA, loadingSdptParam);
  yield takeLatest(constants.LOADING_INFORMNOTICE_SAGA, loadingInformNoticeSearch);
  yield takeLatest(constants.LOADING_INFORMNOTICEDETAIL_SAGA, loadingInformNoticeDetail);
  yield takeLatest(constants.SAVE_INFORMNOTICE_SAGA, saveInformNotice);
}
