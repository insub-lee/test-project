import { takeLatest, call, put } from 'redux-saga/effects';
import message from 'components/Feedback/message';
import { intlObj } from 'utils/commonUtils';
import * as constants from './constants';
import { Axios } from '../../../../../utils/AxiosFunc';
import messages from '../messages';

export function* getNotifyMsg(payload) {
  const response = yield call(Axios.post, '/api/admin/v1/common/getnotifymsg', payload);
  if (response.notifyMsg !== null) {
    // console.log('!!!!!!!!', response.notifyMsg);
    yield put({ type: constants.SET_NOTIFY_MSG, payload: response.notifyMsg });
    yield put({ type: constants.SET_NOTIFY_RECEIVER, payload: response.notifyReceiverList });
  } else {
    yield put({ type: constants.SET_NOTIFY_MSG, payload: [] });
    yield put({ type: constants.SET_NOTIFY_RECEIVER, payload: [] });
  }
}

export function* udtPostState(payload) {
  const response = yield call(Axios.post, '/api/admin/v1/common/udtpoststate', payload);
  const { code } = response;

  if (code === 500) {
    message.error(`${intlObj.get(messages.udtError)}`, 2);
  }
}

export default function* orgSage() {
  yield takeLatest(constants.GET_NOTIFY_MSG, getNotifyMsg);
  yield takeLatest(constants.UDT_POST_STATE, udtPostState);
}
