import { takeLatest, call, put } from 'redux-saga/effects';
import message from 'components/Feedback/message';
import { fromJS } from 'immutable';
// import { intlObj } from 'utils/commonUtils';
import * as constants from './constants';
import { Axios } from '../../../../../utils/AxiosFunc';
// import messages from '../messages';

export function* regNotify(payload) {
  console.log('regNotify_saga', payload);
  const response = yield call(Axios.post, '/api/admin/v1/common/regnotifyadmin', payload);
  const { code } = response;

  if (code === 200) {
    // message.success('등록에 성공하였습니다', 2);
    yield put({ type: constants.SET_NOTIFY, payload: response.msgId });
  } else {
    message.error('등록에 실패하였습니다.', 2);
    yield put({ type: constants.SET_NOTIFY, payload: '' });
  }
}

export function* getSiteCombo() {
  const response = yield call(Axios.get, '/api/common/v1/account/organizationGrpList', { data: 'temp' });
  if (response.list.length > 0) {
    yield put({ type: constants.SET_SITE_COMBO, payload: fromJS(response.list) });
  }
}


export default function* notifyAdminRegSaga() {
  yield takeLatest(constants.REG_NOTIFY, regNotify);
  yield takeLatest(constants.GET_SITE_COMBO, getSiteCombo);
}
