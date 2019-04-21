import { put, takeLatest, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import message from 'components/Feedback/message';
import { intlObj } from 'utils/commonUtils';
import * as constants from './constants';
import { Axios } from '../../../../../utils/AxiosFunc';
import messages from '../messages';
// import actions from './actions';

export function* getCodeAdminDtl(payload) {
  const response = yield call(Axios.post, '/api/admin/v1/common/codeadmindtl', payload);
  // console.log('reponse_codeadmin', response.codeadmin);
  yield put({ type: constants.SET_CODE_ADMIN, payload: response.codeadmin });
  yield put({ type: constants.SET_CODE_ADMIN_DTL, payload: fromJS(response.codeadmindtl) });
}

export function* registerCodeAdmin(payload) {
  // console.log('saga_registerCodeAdmin', payload);
  const response = yield call(Axios.post, '/api/admin/v1/common/registercodeadmin', payload);
  const { code } = response;

  if (code === 200) {
    message.success(`${intlObj.get(messages.registerSuccess)}`, 3);
    yield put({
      type: constants.GET_CODE_ADMIN_DTL,
      codeGrpCd: payload.codeGrpCd,
      keyword: '',
      keywordType: '',
    });
  } else {
    message.error(`${intlObj.get(messages.registerFail)}`, 3);
  }
}

export function* delCodeAdmin(payload) {
  // console.log('saga_delCodeAdmin', payload);
  const { history } = payload;
  const reponse = yield call(Axios.post, '/api/admin/v1/common/delcodeadmin', payload);
  const { code } = reponse;

  if (code === 200) {
    message.success(`${intlObj.get(messages.delComplete)}`, 3);
    history.push('/admin/adminmain/codeadmin');
  } else {
    message.error(`${intlObj.get(messages.delError)}`, 3);
  }
}

export function* udtCodeAdmin(payload) {
  // console.log('sage_udtCodeAdmin', payload);
  const response = yield call(Axios.post, '/api/admin/v1/common/udtcodeadmin', payload);
  const { code } = response;

  if (code === 200) {
    message.success(`${intlObj.get(messages.udtComplete)}`, 3);
    yield put({
      type: constants.GET_CODE_ADMIN_DTL,
      codeGrpCd: payload.codeGrpCd,
      keyword: payload.keyword,
      keywordType: payload.keywordType,
    });
  } else {
    message.error(`${intlObj.get(messages.udtFail)}`, 3);
  }
}

export function* getCodeGrpCd(payload) {
  const response = yield call(Axios.post, '/api/admin/v1/common/getcodegrpcd', payload);
  if (response.codeGrpCd !== null) {
    yield put({ type: constants.SET_CODE_GRP_CD, payload: true });
  } else {
    yield put({ type: constants.SET_CODE_GRP_CD, payload: false });
  }
}

export default function* codeAdminSag() {
  yield takeLatest(constants.GET_CODE_ADMIN_DTL, getCodeAdminDtl);
  yield takeLatest(constants.REGISTER_CODE_ADMIN, registerCodeAdmin);
  yield takeLatest(constants.DEL_CODE_ADMIN, delCodeAdmin);
  yield takeLatest(constants.UDT_CODE_ADMIN, udtCodeAdmin);
  yield takeLatest(constants.GET_CODE_GRP_CD, getCodeGrpCd);
}
