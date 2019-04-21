import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* loadingFabParamTest(payload) {
  const param = {
    PARAM_U_ID: payload.value,
    PARAM_BEBER: '', // 자바에서 널값이라 오류나서 일단 빈값처리
  };
  const responsetest = yield call(Axios.post, '/api/gipms/v1/informNote/loadingInformNoteSearchPopup', param);
  console.log(responsetest.list.informNoteList);
  // console.log(responsetest.list.informNoteList.length);
  if (responsetest.list.informNoteList.length === 0) {
    alert('검색된 내용이 없습니다.');
    window.close();
  } else {
    yield put({
      type: constants.LOADING_FAB_PARAMTEST,
      informDetail: responsetest.list.informNoteList,
    });
  }
}

export function* loadingDangerTaskCombo() {
  const param = {
    PARAM_MENU: 'FAB',
    comboType: 'COMBO_DANGER_TASK',
  };
  const responsedanger = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', param);
  yield put({
    type: constants.LOADING_FAB_DANGER,
    dangerTaskList: responsedanger.list.comboList,
  });
}

export default function* pmSheetSaga() {
  yield takeLatest(constants.LOADING_FAB_PARAMTEST_SAGA, loadingFabParamTest);
  yield takeLatest(constants.LOADING_FAB_DANGER_SAGA, loadingDangerTaskCombo);
}
