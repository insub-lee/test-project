import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';
import * as loadingConstants from 'containers/common/Loading/constants';

export function* loadingFabParam() {
  const dataFab = { // FAB
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
export function* loadingHotParam(payload) {
  const resHot = yield call(Axios.post, '/api/gipms/v1/common/commonHotPopUserDefineList', payload.value);
  yield put({
    type: constants.LOADING_HOT_PARAM,
    hotList: resHot.list.hotPopDataList,
  });
}
export function* loadingTeamParam(payload) {
  const dataTeam = {
    comboType: 'COMBO_LOCATION',
    PARAM_BEBER: payload.value,
  };
  const resTeam = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataTeam);
  yield put({
    type: constants.LOADING_TEAMPARAM,
    teamList: resTeam.list.comboList,
  });
}
export function* loadingSdptParam(payload) {
  const dataSdpt = {
    comboType: 'COMBO_WORK_CENTER',
    PARAM_BEBER: payload.value.fab,
    PARAM_STAND: payload.value.loc,
  };
  const resSdpt = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataSdpt);
  yield put({
    type: constants.LOADING_SDPTPARAM,
    sdptList: resSdpt.list.comboList,
  });
}
export function* loadingFlParam(payload) {
  const dataFl = { // MODEL
    comboType: 'COMBO_FUNCTIONAL_LOCATION',
    PARAM_BEBER: payload.value.fab,
    PARAM_STAND: payload.value.loc,
  };
  const resFl = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataFl);
  yield put({
    type: constants.LOADING_FLPARAM,
    flList: resFl.list.comboList,
  });
}
export function* loadingDownParam() {
  const dataDown = {
    MULTI_PARAM_QMART: "'N', 'C', 'M'",
    comboType: 'COMBO_NOTI_TYPE_INFORMNOTE',
  };
  const resDown = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataDown);
  yield put({
    type: constants.LOADING_DOWNPARAM,
    downList: resDown.list.comboList,
  });
}
export function* loadingDownTypeParam(payload) {
  const dataDownType = {
    MULTI_PARAM_CODEGRUPPE: payload.value,
    PARAM_KATALOGART: 'D',
    comboType: 'COMBO_CODING_TYPE2',
  };
  const resDownType = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataDownType);
  yield put({
    type: constants.LOADING_DOWNTYPEPARAM,
    downTypeList: resDownType.list.comboList,
  });
}
export function* loadingPmSheetSearchParam(payload) {
  const data1 = {
    param: payload.param,
  };
  const response1 = yield call(Axios.post, '/api/gipms/v1/informNote/loadingInformNewSearchList', data1);
  if (response1.dataList) {
    yield put({
      type: constants.LOADING_PMSHEETSEARCH,
      pmSheetDataList: fromJS(response1.dataList),
    });
  }
}
export function* loadingLclassParam(payload) {
  // const dataModel = {
  //   PARAM_ARBPL: payload.value,
  //   comboType: 'COMBO_PROCESS_GROUP',
  // };
  const resLclass = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', payload.value);
  yield put({
    type: constants.LOADING_LCLASSPARAM,
    lclassList: resLclass.list.comboList,
  });
}
export function* loadingMclassParam(payload) {
  // const dataModel = {
  //   PARAM_ARBPL: payload.value,
  //   comboType: 'COMBO_PROCESS_GROUP',
  // };
  const resMclass = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', payload.value);
  yield put({
    type: constants.LOADING_MCLASSPARAM,
    mclassList: resMclass.list.comboList,
  });
}
export function* loadingSclassParam(payload) {
  // const dataModel = {
  //   PARAM_ARBPL: payload.value,
  //   comboType: 'COMBO_PROCESS_GROUP',
  // };
  const resSclass = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', payload.value);
  yield put({
    type: constants.LOADING_SCLASSPARAM,
    sclassList: resSclass.list.comboList,
  });
}
export function* loadingModelParam(payload) {
  const dataModel = {
    PARAM_ARBPL: payload.value,
    comboType: 'COMBO_OBJECT_TYPE_MULTI',
  };
  const resModel = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataModel);
  yield put({
    type: constants.LOADING_MODELPARAM,
    modelList: resModel.list.comboList,
  });
}

export function* loadingShiftParam(payload) {
  const dataShift = {
    PARAM_BEBER: payload.param,
    PARAM_WERKS: '1010',
    comboType: 'COMBO_SHIFT_TIME',
  };
  const resShift = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataShift);
  yield put({
    type: constants.LOADING_SHIFTPARAM,
    shiftList: resShift.list.comboList,
  });
}

export function* fabInformNoteListSearchNew(payload) {
  yield put({
    type: loadingConstants.LOADING_ON,
  });
  const response1 = yield call(Axios.post, '/api/gipms/v1/informNote/fabInformNoteListSearchNew', payload.param);
  if (response1) {
    yield [
      put({
        type: constants.LOADING_FABINFORMNOTELISTSEARCHNEW_SAGA,
        informNoteList: response1.list,
        param: payload.param,
      }),
      put({
        type: loadingConstants.LOADING_OFF,
      })];
  }
}

export function* loadingTidnParam(payload) {
  const data = yield call(Axios.post, '/api/gipms/v1/informNote/loadingTidnParam', payload.param);
  const tidnData = data.list.tidnList;
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

export function* loadingDangerTask(payload) {
  var param = {
    PARAM_TYPE: "FAB",
    comboType: "COMBO_DANGER_TASK"
  };
  const response = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', param);
  if ( response ) {
    const { list } = response;
    yield put({
      type: constants.LOADING_DANGERTASK,
      dangerTaskList: response.list,
    });
  }
}

export function* fabInformNoteEditDetail(payload) {
  console.log(payload);
  const response = yield call(Axios.post, '/api/gipms/v1/informNote/fabInformNoteEditDetail', payload.param);
  if (response) {
    yield put({
      type: constants.LOADING_FABINFORMNOTEEDITDETAIL,
      list: response.list,
      method: payload.method,
    });
  }
}

export function* gridColumnSearch(payload) {
  const data = yield call(Axios.post, '/api/gipms/v1/common/fabInformNoteListGridColumnSetSearch', payload.param);
  yield put({
    type: constants.LOADING_GRIDCOLUMN_SEARCH,
    userGridDefineList: data.list.userGridDefineList,

  });
}

export function* fabInformNoteListExcel(payload) {
  yield put({
    type: loadingConstants.LOADING_ON,
  });
  const resExcel = yield call(Axios.post, '/api/gipms/v1/informNote/fabInformNoteListExcel', payload.param);
  if (resExcel) {
    yield [
      put({
        type: constants.LOADING_FABINFORMNOTELISTEXCEL_SAGA,
        informNoteList: resExcel.list,
        // param: payload.param,
      }),
      put({
        type: loadingConstants.LOADING_OFF,
      })];
  }
}

export default function* informNoteSaga() {
  yield takeLatest(constants.LOADING_FAB_PARAM_SAGA, loadingFabParam);
  yield takeLatest(constants.LOADING_HOT_PARAM_SAGA, loadingHotParam);
  yield takeLatest(constants.LOADING_TEAMPARAM_SAGA, loadingTeamParam);
  yield takeLatest(constants.LOADING_SDPTPARAM_SAGA, loadingSdptParam);
  yield takeLatest(constants.LOADING_MODELPARAM_SAGA, loadingModelParam);
  yield takeLatest(constants.LOADING_PMSHEETSEARCH_SAGA, loadingPmSheetSearchParam);
  yield takeLatest(constants.LOADING_DOWNPARAM_SAGA, loadingDownParam);
  yield takeLatest(constants.LOADING_DOWNTYPEPARAM_SAGA, loadingDownTypeParam);
  yield takeLatest(constants.LOADING_FLPARAM_SAGA, loadingFlParam);
  yield takeLatest(constants.LOADING_FABINFORMNOTELISTSEARCHNEW, fabInformNoteListSearchNew);
  yield takeLatest(constants.LOADING_TIDNPARAM_SAGA, loadingTidnParam);
  yield takeLatest(constants.LOADING_LCLASSPARAM_SAGA, loadingLclassParam);
  yield takeLatest(constants.LOADING_MCLASSPARAM_SAGA, loadingMclassParam);
  yield takeLatest(constants.LOADING_SCLASSPARAM_SAGA, loadingSclassParam);
  yield takeLatest(constants.LOADING_DANGERTASK_SAGA, loadingDangerTask);
  yield takeLatest(constants.LOADING_SHIFTPARAM_SAGA, loadingShiftParam);
  yield takeLatest(constants.LOADING_FABINFORMNOTEEDITDETAIL_SAGA, fabInformNoteEditDetail);
  yield takeLatest(constants.LOADING_GRIDCOLUMN_SEARCH_SAGA, gridColumnSearch);
  yield takeLatest(constants.LOADING_FABINFORMNOTELISTEXCEL, fabInformNoteListExcel);
}
