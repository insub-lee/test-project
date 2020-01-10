import { takeLatest, call, put } from 'redux-saga/effects';
// import { fromJS } from 'immutable';
import message from 'components/Feedback/message';
import { intlObj } from 'utils/commonUtils';
import * as constants from './constants';
import { Axios } from '../../../../../utils/AxiosFunc';
import messages from '../messages';

export function* getGlobalMsg(payload) {
  const response = yield call(Axios.post, '/api/admin/v1/common/getglobalmsg', payload);
  if (response.globalMsg !== null) {
    // yield put({ type: constants.SET_GLOBAL_MSG_RES, payload: fromJS(response.globalMsg) });
    yield put({ type: constants.SET_GLOBAL_MSG_RES, payload: true });
  } else {
    yield put({ type: constants.SET_GLOBAL_MSG_RES, payload: false });
  }
}

export function* registGlobalMsg(payload) {
  // const { history } = payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/registglobalmsg', payload);
  const { code } = response;
  if (code === 200) {
    message.success(`${intlObj.get(messages.regComplete)}`, 2);
  } else {
    message.error(`${intlObj.get(messages.regFail)}`, 2);
  }
}

export function* delGlobalMsg(payload) {
  const { history } = payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/delglobalmsg', payload);
  const { code } = response;

  if (code === 200) {
    history.push('/admin/AdminMain/GlobalAdmin');
    message.success(`${intlObj.get(messages.delComplete)}`, 2);
  } else if (code === 500) {
    message.error(`${intlObj.get(messages.delError)}`, 2);
  }
}

export function* udtGlobalMsg(payload) {
  // const { history } = payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/updateglobalmsg', payload);
  const { code } = response;
  if (code === 200) {
    message.success(`${intlObj.get(messages.udtComplete)}`, 2);
  } else {
    message.error(`${intlObj.get(messages.udtFail)}`, 2);
  }
}

export default function* orgSage() {
  yield takeLatest(constants.GET_GLOBAL_MSG, getGlobalMsg);
  yield takeLatest(constants.REG_GLOBAL_MSG, registGlobalMsg);
  yield takeLatest(constants.DEL_GLOBAL_MSG, delGlobalMsg);
  yield takeLatest(constants.UDT_GLOBAL_MSG, udtGlobalMsg);
}
