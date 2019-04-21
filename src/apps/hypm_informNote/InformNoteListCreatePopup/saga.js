import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* loadingParam(payload) {
  const data1 = { // SDPT
    comboType: 'COMBO_WORK_CENTER',
    PARAM_BEBER: payload.param.PARAM_BEBER,
    PARAM_STAND: payload.param.PARAM_STAND,
  };
  const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data1);
    yield put({
    type: constants.LOADING_PARAM,
    sdptList: response1.list.comboList,
  });
}

export function* loadingSdptParam(payload) {
  const data1 = { // Model
    comboType: 'COMBO_OBJECT_TYPE',
    PARAM_ARBPL: payload.value,
  };
  const response2 = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', data1);
  yield put({
    type: constants.LOADING_SDPT_PARAM,
    modelList: response2.list.comboList,
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


export function* TotalTimeInformNotePopup(payload) { 
  const { history } = payload;
  console.log('#####################[TotalTimeInformNotePopup]#######################');
  const data = yield call(Axios.post, '/api/gipms/v1/informNote/TotalTimeInformNotePopup',  payload);
  
  console.log('#####################[Saga------>TotalTimeInformNotePopup]#######################'+fromJS(data));
  console.log('#####################[Saga------>data.TotalTimeCal]#######################'+data.TotalTimeCal);
  if (data.TotalTimeCal !== null) {

        yield put({
          type: constants.SET_TOTALTIME_CREATE_INFORM_NOTE_POPUP,
          TotalTimeCal: data.TotalTimeCal,
                        
        })
        } else {
        yield put({
          type: constants.SET_TOTALTIME_CREATE_INFORM_NOTE_POPUP,
          payload: fromJS([]),
        });
      }
}

export function* loadingUnitParam(payload) {
  const unitCombo = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', payload.value);
  yield put({
    type: constants.LOADING_UNIT_PARAM,
    unitList: unitCombo.list.comboList,
    versionList: [],
    signStatusList: [],
  });
}

export function* loadingTypeParam(payload) {
  const unitCombo = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', payload.value);
  yield put({
    type: constants.LOADING_TYPE_PARAM,
    typeList: unitCombo.list.comboList,
    versionList: [],
    signStatusList: [],
  });
}

export function* loadingCauseParam(payload) {
  const unitCombo = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', payload.value);
  yield put({
    type: constants.LOADING_CAUSE_PARAM,
    causeList: unitCombo.list.comboList,
    versionList: [],
    signStatusList: [],
  });
}

export function* loadingPartParam(payload) {
  const unitCombo = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', payload.value);
  yield put({
    type: constants.LOADING_PART_PARAM,
    partList: unitCombo.list.comboList,
    versionList: [],
    signStatusList: [],
  });
}

export function* InsertInformNoteListCreatePopup(payload) {
  const { history } = payload;
  let data = yield call(Axios.post, '/api/gipms/v1/informNote/InsertInformNoteListCreatePopup', payload);
  const result = data.result;
  const result2 = data.result2;
  
  console.log('#####################[InsertInformNoteListCreatePopup 결과값]#######################'+result);
  console.log('#####################[InsertInformNoteListCreatePopup 결과값2]#######################'+result2);

  if (result === "success") {
                           // yield put({ type: constants.SET_CODE_RFC_CD, payload: true });
                            message.success(`저장이 완료 되었습니다.`, 5);
    } else {
                           // yield put({ type: constants.SET_CODE_RFC_CD, payload: false });
                            message.error(`저장에 실패하였습니다.`, 5);
    }
}

export default function* InformNoteListCreatePopupSaga() {
        yield takeLatest(constants.LOADING_PARAM_SAGA, loadingParam);
        //  yield takeLatest(constants.LOADING_SDPT_PARAM_SAGA, loadingSdptParam);
        yield takeLatest(constants.LOADING_DOWNPARAM_SAGA, loadingDownParam);
        yield takeLatest(constants.LOADING_DOWNTYPEPARAM_SAGA, loadingDownTypeParam);
        yield takeLatest(constants.GET_TOTALTIME_CREATE_INFORM_NOTE_POPUP, TotalTimeInformNotePopup);  
        yield takeLatest(constants.LOADING_UNIT_PARAM_SAGA, loadingUnitParam);
        yield takeLatest(constants.LOADING_TYPE_PARAM_SAGA, loadingTypeParam);
        yield takeLatest(constants.LOADING_CAUSE_PARAM_SAGA, loadingCauseParam);
        yield takeLatest(constants.LOADING_PART_PARAM_SAGA, loadingPartParam);
        yield takeLatest(constants.INSERT_CREATE_INFORM_NOTE_POPUP, InsertInformNoteListCreatePopup);
}

 