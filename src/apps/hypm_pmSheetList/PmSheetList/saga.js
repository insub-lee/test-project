import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

// 초기 init
export function* loadingFabParam() {
  const data1 = { // TEAM
    PARAM_MENU: 'FAB',
    comboType: 'COMBO_PLANT_SECTION',
  };

  const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data1);
  yield put({
    type: constants.LOADING_FAB_PARAM,
    fabList: response1.list.comboList,
  });

  const data2 = { // W/O 유형
    comboType: 'COMBO_ORDER_TYPE',
    PARAM_LIKE_AUART: 'PM',
    PARAM_NOT_AUART: 'PM40',
  };

  const response2 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data2);
  const list = [{ CODE: '', NAME: 'ALL' }];
  Array.prototype.push.apply(list, response2.list.comboList);
  yield put({
    type: constants.LOADING_AUARTPARAM,
    auartList: list,
  });

  // as-is gipms JSP 하드코딩
  const list1 = [ // Sheet 상태
    { CODE: '', NAME: 'ALL' },
    { CODE: 'I000', NAME: '작성전' },
    { CODE: 'I010', NAME: '진행중' },
    { CODE: 'I020', NAME: '상신' },
    { CODE: 'I040', NAME: '승인' },
    { CODE: 'I050', NAME: '부결' },
  ];
  yield put({
    type: constants.LOADING_INSPLOTSATUSPARAM,
    inspLotStatusList: list1,
  });

  const list2 = [ // Auto/Manual
    { CODE: '', NAME: 'ALL' },
    { CODE: 'A', NAME: 'Auto' },
    { CODE: 'M', NAME: 'Manual' },
  ];
  yield put({
    type: constants.LOADING_CREATEGBPARAM,
    createGbList: list2,
  });
}

// defualt Set
export function* loadingDefaultParam(payload) {
  const data1 = { // TEAM
    comboType: 'COMBO_LOCATION',
    PARAM_BEBER: payload.beber,
  };
  const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data1);

  const data2 = { // SDPT
    comboType: 'COMBO_WORK_CENTER',
    PARAM_STAND: payload.stand,
  };
  const response2 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data2);
  const list2 = [{ CODE: '', NAME: 'ALL' }];
  Array.prototype.push.apply(list2, response2.list.comboList);

  const data3 = { // F/L
    comboType: 'COMBO_FUNCTIONAL_LOCATION',
    PARAM_STAND: payload.stand,
  };
  const response3 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data3);
  const list3 = [{ CODE: '', NAME: 'ALL' }];
  Array.prototype.push.apply(list3, response3.list.comboList);

  const data4 = { // MODEL
    comboType: 'COMBO_OBJECT_TYPE_MULTI',
    PARAM_ARBPL: response2.list.comboList.map(e => `'${e.CODE}'`).join(','),
  };
  const response4 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data4);
  const list4 = [{ CODE: '', NAME: 'ALL' }];
  Array.prototype.push.apply(list4, response4.list.comboList);

  yield put({
    type: constants.LOADING_DEFAULT_PARAM,
    teamList: response1.list.comboList,
    sdptList: list2,
    flList: list3,
    modelList: list4,
  });
}

// fab select
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
  const list2 = [{ CODE: '', NAME: 'ALL' }];
  Array.prototype.push.apply(list2, response2.list.comboList);

  const data3 = { // F/L
    comboType: 'COMBO_FUNCTIONAL_LOCATION',
    PARAM_BEBER: payload.value,
  };
  const response3 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data3);
  const list3 = [{ CODE: '', NAME: 'ALL' }];
  Array.prototype.push.apply(list3, response3.list.comboList);

  const data4 = { // MODEL
    comboType: 'COMBO_OBJECT_TYPE_MULTI',
    PARAM_ARBPL: response2.list.comboList.map(e => `'${e.CODE}'`).join(','),
  };
  const response4 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data4);
  const list4 = [{ CODE: '', NAME: 'ALL' }];
  Array.prototype.push.apply(list4, response4.list.comboList);

  yield put({
    type: constants.LOADING_PARAM,
    teamList: response1.list.comboList,
    sdptList: list2,
    flList: list3,
    modelList: list4,
  });
}

// team select
export function* loadingTeamParam(payload) {
  const data1 = { // SDPT
    comboType: 'COMBO_WORK_CENTER',
    PARAM_STAND: payload.value,
  };
  const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data1);
  const list1 = [{ CODE: '', NAME: 'ALL' }];
  Array.prototype.push.apply(list1, response1.list.comboList);

  const data2 = { // F/L
    comboType: 'COMBO_FUNCTIONAL_LOCATION',
    PARAM_STAND: payload.value,
  };
  const response2 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data2);
  const list2 = [{ CODE: '', NAME: 'ALL' }];
  Array.prototype.push.apply(list2, response2.list.comboList);

  yield put({
    type: constants.LOADING_TEAMPARAM,
    sdptList: list1,
    flList: list2,
  });
}

// sdpt select
export function* loadingSdptParam(payload) {
  const data1 = { // MODEL
    comboType: 'COMBO_OBJECT_TYPE_MULTI',
    PARAM_ARBPL: payload.value,
  };
  const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data1);
  const list1 = [{ CODE: '', NAME: 'ALL' }];
  Array.prototype.push.apply(list1, response1.list.comboList);
  yield put({
    type: constants.LOADING_SDPTPARAM,
    modelList: list1,
  });
}

// w/o 유형 select
export function* loadingAuartParam(payload) {
  const data1 = { // Down Type
    comboType: 'COMBO_PM_ACTIVITY_TYPE',
    MULTI_PARAM_AUART: payload.value,
  };
  const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data1);
  const list1 = [{ CODE: '', NAME: 'ALL' }];
  Array.prototype.push.apply(list1, response1.list.comboList);
  yield put({
    type: constants.LOADING_DOWNTYPEPARAM,
    downTypeList: list1,
  });
}

export function* loadingPmSheetSearchParam(payload) {
  const data1 = payload.param;
  const response1 = yield call(Axios.post, '/api/gipms/v1/pmsheet/fabPMSheetList', data1);
  if (response1.list.resultList) {
    yield put({
      type: constants.LOADING_PMSHEETLISTSEARCH,
      pmSheetDataList: fromJS(response1.list.resultList),
    });
  }
}

export function* loadingTidnParam(payload) {
  const data = payload.param;
  const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data);
  const tidnData = response1.list.comboList;

  for (let i = 0; i < tidnData.length; i += 1) {
    tidnData[i].key = i.toString();
    tidnData[i].title = tidnData[i].CODE;
    tidnData[i].description = '';
    tidnData[i].chosen = '';
  }
  yield put({
    type: constants.LOADING_TIDNPARAM,
    tidnList: tidnData,
  });
}

export function* getUserDefine() {
  const response = yield call(Axios.post, '/api/gipms/v1/common/userCompanyDefine');

  const result = response.getUserCompanyDefine;

  yield put({
    type: constants.GET_USER_COMPANY_DEFINE,
    define: result[0],
  })
}


export default function* pmSheetSaga() {
  yield takeLatest(constants.LOADING_FAB_PARAM_SAGA, loadingFabParam);
  yield takeLatest(constants.LOADING_DEFAULT_PARAM_SAGA, loadingDefaultParam);
  yield takeLatest(constants.LOADING_PARAM_SAGA, loadingParam);
  yield takeLatest(constants.LOADING_TEAMPARAM_SAGA, loadingTeamParam);
  yield takeLatest(constants.LOADING_SDPTPARAM_SAGA, loadingSdptParam);
  yield takeLatest(constants.LOADING_AUARTPARAM_SAGA, loadingAuartParam);
  yield takeLatest(constants.LOADING_PMSHEETLISTSEARCH_SAGA, loadingPmSheetSearchParam);
  yield takeLatest(constants.LOADING_TIDNPARAM_SAGA, loadingTidnParam);
  yield takeLatest(constants.GET_USER_COMPANY_DEFINE_SAGA, getUserDefine);
}
