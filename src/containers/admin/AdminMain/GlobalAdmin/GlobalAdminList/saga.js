import { put, takeLatest, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import message from 'components/Feedback/message';
import { intlObj } from 'utils/commonUtils';
import * as constants from './constants';
import { Axios } from '../../../../../utils/AxiosFunc';
import messages from '../messages';

export function* getGlobalMsgList(payload) {
  const { globalMsgList: prevList } = payload.payload;
  const param = payload.payload;
  delete param.globalMsgList;

  const response = yield call(Axios.post, '/api/admin/v1/common/globaladminlist', payload.payload);
  const globalMsgList = prevList.length > 0 ? prevList.concat(response.globalMsgList) : response.globalMsgList;
  yield put({ type: constants.SET_GLOBAL_MSG_LIST, payload: fromJS(globalMsgList) });
}

export function* delGlobalMsgList(payload) {
  const response = yield call(Axios.post, '/api/admin/v1/common/delglobalmsg', payload);
  const { code } = response;
  const { sNum, eNum, sortColumn, sortDirection, searchType, searchKeyword } = payload;

  if (code === 200) {
    message.success(`${intlObj.get(messages.delComplete)}`, 2);
    yield put({
      type: constants.GET_GLOBAL_MSG_LIST,
      payload: {
        sNum,
        eNum,
        sortColumn,
        sortDirection,
        searchType,
        searchKeyword,
        globalMsgList: [],
      },
    });
  } else if (code === 500) {
    message.error(`${intlObj.get(messages.delError)}`, 2);
  }
}

export default function* orgSage() {
  yield takeLatest(constants.GET_GLOBAL_MSG_LIST, getGlobalMsgList);
  yield takeLatest(constants.DEL_GLOBAL_MSG, delGlobalMsgList);
}
