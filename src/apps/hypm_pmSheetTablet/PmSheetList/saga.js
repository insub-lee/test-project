import { takeLatest, call, put } from 'redux-saga/effects';
// import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* loadingTeamParam() {
  const param = {
    PARAM_BEBER: '121',
    comboType: 'COMBO_LOCATION',
  };

  const response = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', param);

  yield put({
    type: constants.LOADING_TEAM_PARAM,
    teamList: response.list.comboList,
  });
}

export function* loadingSdptParam(payload) {
  const param = {
    PARAM_BEBER: '121',
    PARAM_STAND: payload.value,
    comboType: 'COMBO_WORK_CENTER',
  };

  const response = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', param);

  yield put({
    type: constants.LOADING_SDPT_PARAM,
    sdptList: response.list.comboList,
  });
}

export function* loadingData(payload) {
  const response = yield call(Axios.post, '/api/gipms/v1/pmsheet/contractorsPmSheetListSearch', payload.param);
  const data = response.list.ET_LIST;
  const filterData = [];

  data.map((o) => {
    const result = o.STATUS_TX === '송부완료';
    if(result === false) {
      return filterData.push(o);
    }
  });

  yield put({
    type: constants.LOADING_DATA_PARAM,
    dataList: filterData,
  });
}

export function* checkbox(payload) {
  let nofData = [];
  const cloneData = payload.data;
  if (payload.status === true) {
    for (let i = 0; i < payload.data.length; i += 1) {
      const status = payload.data[i].STATUS_TX === '송부완료';
      if (status !== true) {
        nofData.push(payload.data[i]);
      }
    }
    yield put({
      type: constants.LOADING_DATA_PARAM,
      dataList: nofData,
      clonDataList: cloneData,
    });
  } else {
    nofData = payload.data;
    yield put({
      type: constants.LOADING_DATA_PARAM,
      dataList: nofData,
    });
  }
}

export function* loadingDetailData(payload) {
  const response = yield call(Axios.post, '/api/gipms/v1/pmsheet/contractorsPmSheetDetail', payload.param);

  console.log(response);
  yield put({
    type: constants.LOADING_PMSHEET_DETAIL,
    dataDetailList: response,
  });
}

export function* loadingPmCode() {
  const response = yield call(Axios.post, '/api/gipms/v1/pmsheet/pmSheetCodeList');

  yield put({
    type: constants.LOADING_PMSHEET_CODE,
    codeList: response.codeList,
  });
}

export function* savePmCode(payload) {
  const param = {
    REASON: payload.value,
    INSP_LOT: payload.num,
  };

  const response = yield call(Axios.post, '/api/gipms/v1/pmsheet/pmSheetUpdateCodeList', param);
}

export function* saveCorp(payload) {
  const param = {
    CORP: payload.value,
    INSP_LOT: payload.num,
  };

  const response = yield call(Axios.post, '/api/gipms/v1/pmsheet/pmSheetUpdateCorpList', param);
}

export function* getUserDefine() {
  const response = yield call(Axios.post, '/api/gipms/v1/common/userCompanyDefine');

  const result = response.getUserCompanyDefine;

  yield put({
    type: constants.GET_USER_COMPANY_DEFINE,
    define: result,
  })
}

export function* getSdptList() {
  const response = yield call(Axios.post, '/api/gipms/v1/pmsheet/pmSheetSdptList');

  yield put({
    type: constants.LOADING_PMSHEET_SDPT,
    pmSdptList: response.sdptList,
  });
}

export function* savePmStatus(payload) {
  const status = payload.value;
  let num = '';

  if (status === 'R') {
    num = 'I010';
  } else if (status === 'P') {
    num = 'I000'
  } else {
    num = 'I020'
  }

  const param = {
    CO_STATUS: payload.value,
    INSP_LOT_STATUS: num,
    INSP_LOT: payload.num,
  };

  const response = yield call(Axios.post, '/api/gipms/v1/pmsheet/pmSheetUpdateStatus', param);
}

export default function* pmSheetSaga() {
  yield takeLatest(constants.LOADING_TEAM_PARAM_SAGA, loadingTeamParam);
  yield takeLatest(constants.LOADING_SDPT_PARAM_SAGA, loadingSdptParam);
  yield takeLatest(constants.LOADING_DATA_PARAM_SAGA, loadingData);
  yield takeLatest(constants.CHECKBOX_SAGA, checkbox);
  yield takeLatest(constants.LOADING_PMSHEET_DETAIL_SAGA, loadingDetailData);
  yield takeLatest(constants.LOADING_PMSHEET_CODE_SAGA, loadingPmCode);
  yield takeLatest(constants.SAVE_PMSHEET_CODE_SAGA, savePmCode);
  yield takeLatest(constants.GET_USER_COMPANY_DEFINE_SAGA, getUserDefine);
  yield takeLatest(constants.LOADING_PMSHEET_SDPT_SAGA, getSdptList);
  yield takeLatest(constants.SAVE_PMSHEET_CORP_SAGA, saveCorp);
  yield takeLatest(constants.SAVE_PMSHEET_STATUS_SAGA, savePmStatus);
}
