import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* loadingFabParamTest(payload) {
  const param = { // 워크오더 COMBO_UPTDAT 공통
    uptcd: 'RT',
    comboType: 'COMBO_UPTDAT',
  };
  const param1 = { // 워크오더
    IV_AUFNR: payload.value,
  };
  const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', param);
  const responsetest = yield call(Axios.post, '/api/gipms/v1/informNote/fabWorkOrderDetail', param1);
  const materialList = responsetest.list.ET_COMPONENTS_M;

  const materialDispList = []; // 삭제 아닌 리스트
  // const materialDispIdx = -1;
  if (materialList != null && materialList.length > 0) {
    for (let i = 0; i < materialList.length; i += 1) {
      if (materialList[i].WAERS === 'KRW' || materialList[i].WAERS === 'JPY') {
        materialList[i].PRICE = Math.round((materialList[i].PRICE * 100));
      }
      if (!(materialList[i].XLOEK === 'X' && materialList[i].STAT === 'I0013')) {
        materialDispList.push(materialList[i]);
        // materialDispList[materialDispIdx] = (materialList[i].SAKNR === '717107' && materialList[i].SORTP === 'L') ? '717107' : materialList[i].SORTP;
      }
    }
    for (let f = 0; f < materialDispList.length; f += 1) { // 맞는 키 값 찾으려고 충첩포문 사용
      for (let i = 0; i < response1.list.comboList.length; i += 1) {
        if (materialDispList[f].RPAIR === response1.list.comboList[i].CODE) {
          materialDispList[f].RPAIR += response1.list.comboList[i].NAME;
        }
      }
    }
  } else {
    alert('조회된 데이터가 없습니다.');
    window.close();
  }
  yield put({
    type: constants.LOADING_FAB_PARAMTEST,
    workOrderDetail: responsetest.list.ES_HEADER,
    workOrderEtTaskDetail: responsetest.list.ET_TASKLISTS,
    startDate: responsetest.startDate,
    contractorGrid: materialDispList,
  });
}
export default function* pmSheetSaga() {
  yield takeLatest(constants.LOADING_FAB_PARAMTEST_SAGA, loadingFabParamTest);
  // yield takeLatest(constants.LOADING_FAB_DANGER_SAGA, getRepairTypeList);
}
