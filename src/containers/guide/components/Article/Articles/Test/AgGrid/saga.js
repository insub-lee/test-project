import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* loadingFactoryParam() {
  const param = {
    FACTORY: 'factory',
    VERSION: 'Version',
    SIGNSTATUS: 'signStatus',
  };
  const data = yield call(Axios.post, '/api/common/v1/account/loadingFactoryParam', param);
  yield put({
    type: constants.LOADING_FACTORY_PARAM,
    factoryList: data.factoryList,
    // detailFactoryList: data.detailFactoryList,
    // sdptList: data.sdptList,
    // modelList: data.modelList,
    versionList: data.versionList,
    signStatusList: data.signStatusList,
  });
}

export function* loadingParam(payload) {
  const param = {
    factoryValue: payload.value,
  };
  const data = yield call(Axios.post, '/api/common/v1/account/loadingParam', param);
  yield put({
    type: constants.LOADING_PARAM,
    // detailFactoryList: data.detailFactoryList,
    sdptList: data.sdptList,
    // modelList: data.modelList,
  });
}

export function* loadingSdptParam(payload) {
  const param = {
    sdptValue: payload.value,
  };
  const data = yield call(Axios.post, '/api/common/v1/account/loadingSdptParam', param);
  yield put({
    type: constants.LOADING_SDPTPARAM,
    modelList: data.modelList,
  });
}

export function* loadingPmSheetSearchParam() {
  // const param = {
  //   sdptValue: payload.value,
  // };
  const data = yield call(Axios.post, '/api/common/v1/account/loadingPmSheetSearchParam');
  yield put({
    type: constants.LOADING_PMSHEETSEARCH,
    pmSheetDataList: data.resultList,
  });
}

export default function* pmSheetSaga() {
  yield takeLatest(constants.LOADING_FACTORY_PARAM_SAGA, loadingFactoryParam);
  yield takeLatest(constants.LOADING_PARAM_SAGA, loadingParam);
  yield takeLatest(constants.LOADING_SDPTPARAM_SAGA, loadingSdptParam);
  yield takeLatest(constants.LOADING_PMSHEETSEARCH_SAGA, loadingPmSheetSearchParam);
}
