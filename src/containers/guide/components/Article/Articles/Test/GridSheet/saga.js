import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* loadingFabParam() {
  const dataFab = {
    // FAB
    PARAM_MENU: 'FAB',
    comboType: 'COMBO_PLANT_SECTION',
  };

  const resFab = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataFab);

  yield put({
    type: constants.LOADING_FAB_PARAM,
    fabList: resFab.list.comboList,
    versionList: [],
    signStatusList: [],
  });
}

export function* loadingParam(payload) {
  const dataTeam = {
    // TEAM
    comboType: 'COMBO_LOCATION',
    PARAM_BEBER: payload.value,
  };
  const resTeam = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataTeam);

  const dataSdtp = {
    // SDPT
    comboType: 'COMBO_WORK_CENTER',
    PARAM_BEBER: payload.value,
  };
  const resSdtp = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataSdtp);

  const dataFl = {
    // F/L
    comboType: 'COMBO_FUNCTIONAL_LOCATION',
    PARAM_BEBER: payload.value,
  };
  const resFl = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataFl);

  yield put({
    type: constants.LOADING_PARAM,
    // detailFactoryList: data.detailFactoryList,
    teamList: resTeam.list.comboList,
    sdptList: resSdtp.list.comboList,
    flList: resFl.list.comboList,
    // modelList: data.sdptList,
  });
}

export function* loadingTeamParam(payload) {
  const dataSdtp = {
    // SDPT
    comboType: 'COMBO_WORK_CENTER',
    PARAM_STAND: payload.value,
  };
  const resSdtp = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataSdtp);

  const dataFl = {
    // F/L
    comboType: 'COMBO_FUNCTIONAL_LOCATION',
    PARAM_STAND: payload.value,
  };
  const resFl = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataFl);

  yield put({
    type: constants.LOADING_TEAMPARAM,
    sdptList: resSdtp.list.comboList,
    flList: resFl.list.comboList,
    // modelList: data.sdptList,
  });
}

export function* loadingSdptParam(payload) {
  const dataModel = {
    // MODEL
    comboType: 'COMBO_OBJECT_TYPE',
    PARAM_ARBPL: payload.value,
  };
  const resModel = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataModel);

  yield put({
    type: constants.LOADING_SDPTPARAM,
    modelList: resModel.list.comboList,
  });
}

export function* loadingPmSheetSearchParam(payload) {
  const data1 = {
    param: payload.param,
  };
  const response1 = yield call(Axios.post, '/api/gipms/v1/guide/loadingPmSheetSearchParam', data1);
  if (response1.dataList) {
    yield put({
      type: constants.LOADING_PMSHEETSEARCH,
      pmSheetDataList: fromJS(response1.dataList),
    });
  }
}

export default function* pmSheetSaga() {
  yield takeLatest(constants.LOADING_FAB_PARAM_SAGA, loadingFabParam);
  yield takeLatest(constants.LOADING_PARAM_SAGA, loadingParam);
  yield takeLatest(constants.LOADING_TEAMPARAM_SAGA, loadingTeamParam);
  yield takeLatest(constants.LOADING_SDPTPARAM_SAGA, loadingSdptParam);
  yield takeLatest(constants.LOADING_PMSHEETSEARCH_SAGA, loadingPmSheetSearchParam);
}
