import React from 'react';
import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as feed from 'components/Feedback/functions';
import { Axios } from 'utils/AxiosFunc';
import MessageContent from 'components/Feedback/message.style2';
import message from 'components/Feedback/message';
import * as loadingConstants from 'containers/common/Loading/constants';

import * as constants from './constants';

// import fakeData from './fakeData.js';

export function* loadingFabParam() {
  const data1 = {
    PARAM_MENU: 'FAB',
    comboType: 'COMBO_PLANT_SECTION',
  };

  const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data1);

  const data2 = {
    IV_GUBUN: 'F',
    IV_LANG: 'EN',
    IV_MODE: '1',
    comboSessionWhereAble: 'false',
    comboType: 'COMBO_TASKLIST_RELATION_CODE',
  };

  const response2 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data2);

  const data3 = {
    IV_GUBUN: 'F',
    IV_LANG: 'EN',
    IV_MODE: '2',
    comboSessionWhereAble: 'false',
    comboType: 'COMBO_TASKLIST_RELATION_CODE',
  };

  const response3 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data3);

  const stratCombo = [];
  if (response3.result === '00000') {
    for (let i = 0; i < response3.list.IT_LIST.length; i += 1) {
      if (response3.list.IT_LIST[i].CODE === 'F040') {
        stratCombo.push({
          CODE: response3.list.IT_LIST[i].CODE,
          TEXT: 'FAB&RND TBM(30 Day under - Fix)',
        });
      } else if (response3.list.IT_LIST[i].CODE === 'F010') {
        stratCombo.push({
          CODE: response3.list.IT_LIST[i].CODE,
          TEXT: 'FAB&RND TBM(30 Day - Shift)',
        });
      } else if (response3.list.IT_LIST[i].CODE === 'F020') {
        stratCombo.push({
          CODE: response3.list.IT_LIST[i].CODE,
          TEXT: 'FAB&RND TBM(28 Day - Shift)',
        });
      } else {
        stratCombo.push({
          CODE: response3.list.IT_LIST[i].CODE,
          TEXT: response3.list.IT_LIST[i].TEXT,
        });
      }
    }
  }

  yield put({
    type: constants.LOADING_FAB_PARAM,
    fabList: response1.list.comboList,
    pmTypeCombo: response2.list.IT_LIST,
    stratCombo: fromJS(stratCombo),
  });
}

export function* loadingParam(payload) {
  const data1 = { // TEAM
    comboType: 'COMBO_LOCATION',
    PARAM_BEBER: payload.value,
  };
  const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data1);

  yield put({
    type: constants.LOADING_PARAM,
    teamList: response1.list.comboList,
  });
}

export function* loadingTeamParam(payload) {
  const data1 = { // SDPT
    comboType: 'COMBO_WORK_CENTER',
    PARAM_STAND: payload.value,
  };
  const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data1);

  yield put({
    type: constants.LOADING_TEAMPARAM,
    sdptList: response1.list.comboList,
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
    modelList: response1.list.comboList,
  });
}

export function* loadingPmSheetSearchParam(payload) {
  yield put({
    type: loadingConstants.LOADING_ON,
  });
  // const MULTI_PARAM_EQART = payload.param.MULTI_PARAM_EQART.map(eqartKey => `'${eqartKey.value}',`).join('').slice(1, -2);
  const MULTI_PARAM_EQART = [];

  payload.param.MULTI_PARAM_EQART.map(eqartKey => MULTI_PARAM_EQART.push(eqartKey.value));

  const data1 = {
    PARAM_ARBPL: payload.param.PARAM_ARBPL,
    PARAM_BEBER: payload.param.PARAM_BEBER,
    PARAM_STORT: payload.param.PARAM_STORT,
    PARAM_TXT: payload.param.PARAM_TXT,
    PARAM_VERSION: payload.param.PARAM_VERSION,
    tabGubun: payload.param.tabGubun,
    MULTI_PARAM_EQART,
  };

  const response1 = yield call(Axios.post, '/api/gipms/v1/pmmodel/masterPmSheetSearch', data1);
  if (response1.result === '00000') {
    yield put({
      type: constants.LOADING_PMSHEETSEARCH,
      pmSheetDataList: fromJS(response1.list.dataList),
      searchSuccess: true,
    });
  }
  yield put({
    type: loadingConstants.LOADING_OFF,
  });
}

export function* gridSave(payload) {
  const { returnParam } = payload;
  const response1 = yield call(Axios.post, '/api/gipms/v1/pmmodel/masterPmSheetSave', payload.param);
  const { result, resultCode } = response1;

  if (result === '00000') {
    if(resultCode === '0') {
      message.success(
        <MessageContent>
          저장되었습니다
        </MessageContent>,
        3,
      );
  } else {
    message.success(
      <MessageContent>
        삭제되었습니다
      </MessageContent>,
      3,
    );
  }
  yield put({
    type: constants.LOADING_PMSHEETSEARCH_SAGA,
    param: returnParam,
  });
  } else {
    feed.error('저장에 실패하였습니다');
  }
}

// export function* masterPmSheetDelNoticeToSAP(payload) {
//   // const { _paramJson } = payload._paramJson;
//   const response1 = yield call(Axios.post, '/api/gipms/v1/pmmodel/masterPmSheetDelNoticeToSAP', payload.params);
//   console.log('response1', response1);
//   // const { result } = response1;

//   if (result === '00000') {
//   //   message.success(
//   //     <MessageContent>
//   //       저장되었습니다
//   //     </MessageContent>,
//   //     3,
//   //   );
  
//   yield put({
//     type: constants.EV_SUBRC,
//     EV_SUBRC: result.EV_SUBRC,
//   });
    
//   } else {
//     feed.error('처리중 오류가 발생하였습니다. 확인바랍니다.');
//   }
// }

export function* getCopySdptCombe(payload) {
  const data1 = { // TEAM
    comboType: 'COMBO_WORK_CENTER',
    PARAM_BEBER: payload.param,
  };
  const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data1);

  yield put({
    type: constants.COPY_SDPT_COMBO,
    comboList: response1.list.comboList,
  });
}

export function* getCopyModelCombe(payload) {
  const data1 = { // TEAM
    comboType: 'COMBO_OBJECT_TYPE',
    PARAM_ARBPL: payload.param,
  };
  const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data1);

  yield put({
    type: constants.COPY_MODEL_COMBO,
    comboList: response1.list.comboList,
  });
}

export function* masterPmSheetCopy(payload) {
  const { returnParam } = payload;
  const response1 = yield call(Axios.post, '/api/gipms/v1/pmmodel/masterPmSheetCopy', payload.param);
  const { result, resultCode } = response1;

  if (result === '00000') {
    message.success(
      <MessageContent>
        저장되었습니다
      </MessageContent>,
      3,
    );
  yield put({
    type: constants.LOADING_PMSHEETSEARCH_SAGA,
    param: returnParam,
  });
  } else {
    feed.error('처리중 오류가 발생하였습니다.');
  }
}

export default function* pmSheetSaga() {
  yield takeLatest(constants.LOADING_FAB_PARAM_SAGA, loadingFabParam);
  yield takeLatest(constants.LOADING_PARAM_SAGA, loadingParam);
  yield takeLatest(constants.LOADING_TEAMPARAM_SAGA, loadingTeamParam);
  yield takeLatest(constants.LOADING_SDPTPARAM_SAGA, loadingSdptParam);
  yield takeLatest(constants.LOADING_PMSHEETSEARCH_SAGA, loadingPmSheetSearchParam);
  yield takeLatest(constants.GRID_SAVE, gridSave);
  yield takeLatest(constants.GET_COPY_SDPT_COMBO, getCopySdptCombe);
  yield takeLatest(constants.GET_COPY_MODEL_COMBO, getCopyModelCombe);
  yield takeLatest(constants.MASTERPM_PM_SHEET_COPY, masterPmSheetCopy);

  
}
