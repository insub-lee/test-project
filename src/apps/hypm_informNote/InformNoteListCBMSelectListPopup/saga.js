import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* loadingFabParam() {
  const data1 = { // TEAM
    param: {
      PARAM_MENU: 'FAB',
      comboType: 'COMBO_PLANT_SECTION',
    },
  };

  // const param = {
  //   FACTORY: 'factory',
  //   VERSION: 'Version',
  //   SIGNSTATUS: 'signStatus',
  // };
  const response1 = yield call(Axios.post, '/api/gipms/v1/pmmodel/commonCombo', data1);
  yield put({
    type: constants.LOADING_FAB_PARAM,
    fabList: response1.comboList,
    versionList: [],
    signStatusList: [],
  });
}

export function* loadingGridParam(payload) {
  // const data1 = {
  //   param: payload.value,
  // };
  const response1 = yield call(Axios.post, '/api/gipms/v1/informNote/informNoteListCBMSelectList', payload.value);
  console.log(`dddd===${response1.EV_SUBRC}`);

  if (response1.EV_SUBRC === '0') {
    // for (let i = 0; i < response1.list.ET_INSOPER_LIST.length; i + 1) {
    //   if (response1.list.ET_INSOPER_LIST[i].ANLZU === 'A' || response1.list.ET_INSOPER_LIST[i].ANLZU === '') {
    //     response1.list.ET_INSOPER_LIST[i].ANLZU = '자사용';
    //   } else {
    //     response1.list.ET_INSOPER_LIST[i].ANLZU = '도급용';
    //   }
    // }
    yield put({
      type: constants.LOADING_GRID_PARAM,
      informNoteListCBMSelectList: fromJS(response1.list.ET_INSOPER_LIST),
    });
  } else {
    alert('PM SHEET 확정 후 PM SHEET MODELING이 변경되었습니다.\nPM SHEET 재확정이 필요하니 운영팀에 연락 바랍니다. \n(TEL : 이천, 984-8304)');
  }
}
export default function* pmSheetSaga() {
  yield takeLatest(constants.LOADING_FAB_PARAM_SAGA, loadingFabParam);
  yield takeLatest(constants.LOADING_GRID_PARAM_SAGA, loadingGridParam);
}
