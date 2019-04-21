import React from 'react';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import * as feed from 'components/Feedback/functions';
import { put, takeLatest, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';
import * as loadingConstants from 'containers/common/Loading/constants';

// import messages from '../messages';

// export function* loadingFabParam() {
//   const data1 = { // TEAM
//     param: {
//       PARAM_MENU: 'FAB',
//       comboType: 'COMBO_PLANT_SECTION',
//     },
//   };

//   // const param = {
//   //   FACTORY: 'factory',
//   //   VERSION: 'Version',
//   //   SIGNSTATUS: 'signStatus',
//   // };
//   const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data1);
//   yield put({
//     type: constants.LOADING_FAB_PARAM,
//     fabList: response1.comboList,
//     versionList: [],
//     signStatusList: [],
//   });
// }

export function* loadingParam(payload) {
  yield put({
    type: loadingConstants.LOADING_ON,
  });
  const data1 = { // TEAM
    param: {
      // PARAM_PLNAL: '03',
      // PARAM_PLNNR: 'F01793',
      // // PARAM_REVISION: 'AAC',
      // PARAM_VORNR: '0030',
      // 파라미터 추가
      PARAM_PLNAL: payload.value.plnal,
      PARAM_PLNNR: payload.value.plnnr,
      PARAM_VORNR: payload.value.vornr,
      PARAM_REVISION: payload.value.revision,
      PARAM_EQKTX: payload.value.eqktx,
      PARAM_BEBER: payload.value.beber,
      PARAM_LTXA1: payload.value.ltxa1,
      PARAM_KTEX1: payload.value.ktex1,
    },
  };
  const response = yield call(Axios.post, '/api/gipms/v1/pmmodel/masterPmSheetMicQualSearch', data1);
  const data2 = {
    IV_MODE: '4',
    comboType: 'COMBO_TASKLIST_RELATION_CODE',
  };

  const data3 = {
    IV_MODE: '5',
    comboType: 'COMBO_TASKLIST_RELATION_CODE',
  };

  const responseCommonCombo1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data2);
  const IT_LIST = [];
  console.log('check1 : ', responseCommonCombo1);
  responseCommonCombo1.list.IT_LIST.map(item => (
    IT_LIST.push({
      CODE: item.CODE,
      NAME: item.TEXT,
    })
  ));
  console.log('check2 : ', fromJS(IT_LIST));
  console.log('check3 : ', IT_LIST);

  const responseCommonCombo2 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data3);

  yield put({
    type: constants.LOADING_PARAM,
    value: fromJS(response.dataSet),
    pmTypeCombo: IT_LIST,
    masseinhswGridCombo: responseCommonCombo2.list.IT_LIST,
  });
  yield put({
    type: loadingConstants.LOADING_OFF,
  });
}

export function* loadingMicQualListsave(payload) {
  console.log(' --------  saga -------');
  console.log('payload : ', payload);
  console.log('payloadvalue : ', payload.value);
  console.log('payloadvalue : ', payload.param);
  const { returnParam } = payload;
  console.log(returnParam);

  // const data1 = {
  //   param: payload.value,
  // };
  const response1 = yield call(Axios.post, '/api/gipms/v1/pmmodel/pmSheetMicQualListsave', payload.param);
  console.log('code : ', response1.code);
  if (response1.code === '200') {
    // 성공
    message.success(
      <MessageContent>
      저장되었습니다
      </MessageContent>,
      3,
    );
    yield put({
      type: constants.LOADING_PARAM_SAGA,
      value: returnParam,
      // type: constants.LOADING_PARAM_SAGA,
      // value: fromJS(response1.dataSet),
    });
  } else if (response1.code === '0') {
    feed.error('저장에 실패하였습니다');
  }
}

// export function* loadingParam(payload) {
//   const param = {
//     factoryValue: payload.value,
//   };
//   const data = yield call(Axios.post, '/api/gipms/v1/pmsheet/loadingParam', param);
//   yield put({
//     type: constants.LOADING_PARAM,
//     // detailFactoryList: data.detailFactoryList,
//     sdptList: data.sdptList,
//     teamList: data.sdptList,
//     flList: data.sdptList,
//     modelList: data.sdptList,
//   });
// }

// export function* loadingTeamParam(payload) {
//   // const param = {
//   //   sdptValue: payload.value,
//   // };
//   // const data = yield call(Axios.post, '/api/gipms/v1/pmsheet/loadingSdptParam', param);
//   const data1 = { // SDPT
//     param: {
//       comboType: 'COMBO_WORK_CENTER',
//       PARAM_STAND: payload.value,
//     },
//   };
//   const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data1);

//   const data2 = { // F/L
//     param: {
//       comboType: 'COMBO_FUNCTIONAL_LOCATION',
//       PARAM_STAND: payload.value,
//     },
//   };
//   const response2 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data2);

//   yield put({
//     type: constants.LOADING_TEAMPARAM,
//     sdptList: response1.comboList,
//     flList: response2.comboList,
//     // modelList: data.sdptList,
//   });
// }


// export function* loadingSdptParam(payload) {
//   const data1 = { // MODEL
//     param: {
//       comboType: 'COMBO_OBJECT_TYPE',
//       PARAM_ARBPL: payload.value,
//     },
//   };
//   const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data1);
//   yield put({
//     type: constants.LOADING_SDPTPARAM,
//     modelList: response1.comboList,
//   });
// }

// export function* loadingPmSheetSearchParam(payload) {
//   const data1 = {
//     param: payload.param,
//   };
//   console.log('%c%s', 'color:yellow;', 'handlePmSheetSearch : ', payload);
//   const response1 = yield call(Axios.post, '/api/gipms/v1/pmmodel/loadingPmModelSearchParam', data1);
//   console.log('%c%s', 'color:yellow;', 'handlePmSheetSearch-return : ', response1);
//   if (response1.dataList) {
//     yield put({
//       type: constants.LOADING_PMSHEETSEARCH,
//       pmSheetDataList: fromJS(response1.dataList),
//     });
//   }
// }

export default function* pmSheetSaga() {
  // yield takeLatest(constants.LOADING_FAB_PARAM_SAGA, loadingFabParam);
  yield takeLatest(constants.LOADING_PARAM_SAGA, loadingParam);
  yield takeLatest(constants.LOADING_PMSHEETSLIST_SAGA, loadingMicQualListsave);
  // yield takeLatest(constants.LOADING_SDPTPARAM_SAGA, loadingSdptParam);
  // yield takeLatest(constants.LOADING_PMSHEETSEARCH_SAGA, loadingPmSheetSearchParam);
}
