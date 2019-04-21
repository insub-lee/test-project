import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* loadingUserCompanyDefine(payload) {
  const data = yield call(Axios.post, '/api/gipms/v1/common/userCompanyDefine', payload.param);
  yield put({
    type: constants.LOADING_USERCOMPANYDEFINE,
    list: data.getUserCompanyDefine,
  });
}

export function* sendInterlockPush(payload) {
  const param = {   
    APP_ID: 1103,   
    SITE_ID: 1,   
    UNREAD_CNT:10,   
    COMPANY_CD: "1000",   
    message: {   
      MSG_TYPE: "T",   
      TITLE: "인터락 정보",   
      TITLE_KOR: "인터락 정보", 
      CONTENT:  payload.param.msg,
      CONTENT_KOR: payload.param.msg,   
    },   
    link: {},   
    images: [],   
    buttons: [ ],   
    target: {   
      empNo: [payload.param.sabun]   
    }   
  }

  const resInterlock = yield call(Axios.post, 'http://portaldev.skhynix.com/api/common/v1/notify', param);
}

export default function* commonSaga() {
  yield takeLatest(constants.LOADING_USERCOMPANYDEFINE_SAGA, loadingUserCompanyDefine);
  yield takeLatest(constants.SEND_INTERLOCKPUSH_SAGA, sendInterlockPush);
}
