import { takeLatest, call, put } from 'redux-saga/effects';
// import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* loadingCollaboratorList(action) {
  const payload = {};
  payload.param = {
    EMP_NUM: action.payload.empNo,
  };
  const response = yield call(Axios.post, '/api/gipms/v1/pmsheet/loadingCollaboratorList', payload);
  yield put({
    type: constants.LOADING_COLLABORATOR_LIST,
    collaboratorList: response.dataList,
  });
}

export function* updateCollaboratorList(action) {
  const payload = {};
  payload.list = action.payload.list;

  const response = yield call(Axios.post, '/api/gipms/v1/pmsheet/updateCollaboratorList', payload);
  if (response && response === 0) console.log('updateCollaboratorList Error');
}

export function* updateSheetInfoCollaboratorList(action) {
  const payload = {};
  payload.info = action.payload.info;

  const response = yield call(Axios.post, '/api/gipms/v1/pmsheet/updateSheetInfoCollaboratorList', payload);
  if (response && response === 0) console.log('updateSheetInfoCollaboratorList Error');
}

export default function* pmSheetSaga() {
  yield takeLatest(constants.LOADING_COLLABORATOR_LIST_SAGA, loadingCollaboratorList);
  yield takeLatest(constants.UPDATE_COLLABORATOR_LIST_SAGA, updateCollaboratorList);
  yield takeLatest(constants.UPDATE_SHEET_INFO_COLLABORATOR_LIST_SAGA, updateSheetInfoCollaboratorList);
}
