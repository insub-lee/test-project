import { takeLatest, put, call } from 'redux-saga/effects';
// import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

// get these operation data list
export function* loadingFactoryParam(payload) {
  const param = {
    PARAM_PLNAL: payload.param.PARAM_PLNAL,
    PARAM_PLNNR: payload.param.PARAM_PLNNR,
    PARAM_REVISION: payload.param.PARAM_REVISION,
  };
  const data = yield call(Axios.post, '/api/gipms/v1/pmmodel/masterPmSheetOperation', param);
  yield put({
    type: constants.LOADING_PMSHEET_OPERATION_PARAM,
    pmSheetDataList: data.pmSheetDataList,
  });
  // console.log('data.pmSheetDataList: ', data.pmSheetDataList);
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

export default function* pmSheetSaga() {
  yield takeLatest(constants.LOADING_PMSHEET_OPERATION_PARAM_SAGA, loadingFactoryParam);
  yield takeLatest(constants.LOADING_SAVE_PARAM_SAGA, loadingSaveParam);
}
