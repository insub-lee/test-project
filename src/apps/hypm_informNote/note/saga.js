import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* loadingUnitParam(payload) {
  const unitCombo = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', payload.value);
  yield put({
    type: constants.LOADING_UNIT_PARAM,
    unitList: unitCombo.list.comboList,
    versionList: [],
    signStatusList: [],
  });
}

export function* loadingTypeParam(payload) {
  const unitCombo = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', payload.value);
  yield put({
    type: constants.LOADING_TYPE_PARAM,
    typeList: unitCombo.list.comboList,
    versionList: [],
    signStatusList: [],
  });
}

export function* loadingCauseParam(payload) {
  const unitCombo = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', payload.value);
  yield put({
    type: constants.LOADING_CAUSE_PARAM,
    causeList: unitCombo.list.comboList,
    versionList: [],
    signStatusList: [],
  });
}

export function* loadingPartParam(payload) {
  const unitCombo = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', payload.value);
  yield put({
    type: constants.LOADING_PART_PARAM,
    partList: unitCombo.list.comboList,
    versionList: [],
    signStatusList: [],
  });
}

export default function* noteSaga() {
  yield takeLatest(constants.LOADING_UNIT_PARAM_SAGA, loadingUnitParam);
  yield takeLatest(constants.LOADING_TYPE_PARAM_SAGA, loadingTypeParam);
  yield takeLatest(constants.LOADING_CAUSE_PARAM_SAGA, loadingCauseParam);
  yield takeLatest(constants.LOADING_PART_PARAM_SAGA, loadingPartParam);
}
