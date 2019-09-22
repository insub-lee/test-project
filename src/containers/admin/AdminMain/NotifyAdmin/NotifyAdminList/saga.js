import { put, takeLatest, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import message from 'components/Feedback/message';
import { intlObj } from 'utils/commonUtils';
import * as constants from './constants';
import { Axios } from '../../../../../utils/AxiosFunc';
import messages from '../messages';

export function* getNotifyList(payload) {
  const { notifyList: prevList } = payload.payload;
  const param = payload.payload;
  delete param.notifyList;
  
  const response = yield call(Axios.post, '/api/admin/v1/common/notifyadminlist', param);
  const notifyList = prevList.length > 0 ? prevList.concat(response.notifyList) : response.notifyList;

  yield put({ type: constants.SET_NOTIFY_LIST, payload: fromJS(notifyList) });
}

export function* udtPostState(payload) {
  const response = yield call(Axios.post, '/api/admin/v1/common/udtpoststate', payload);
  const { code } = response;

  if (code === 200) {
    yield put({
      type: constants.GET_NOTIFY_LIST,
      payload: {
        sNum: payload.payload.sNum,
        eNum: payload.payload.eNum,
        notifyList: payload.payload.notifyList,
        sortColumn: payload.payload.sortColumn,
        sortDirection: payload.payload.sortDirection,
        searchType: payload.payload.searchType,
        searchKeyword: payload.payload.searchKeyword,
        oneDate: payload.payload.oneDate,
        startDate: payload.payload.startDate,
        endDate: payload.payload.endDate,
        searchSite: payload.payload.searchSite,
      },
    });
  } else {
    message.error(`${intlObj.get(messages.udtError)}`, 2);
  }
}

export function* getSiteCombo() {
  const response = yield call(Axios.get, '/api/common/v1/account/organizationGrpList', { data: 'temp' });
  if (response.list.length > 0) {
    yield put({ type: constants.SET_SITE_COMBO, payload: fromJS(response.list) });
  }
}

export default function* orgSage() {
  yield takeLatest(constants.GET_NOTIFY_LIST, getNotifyList);
  yield takeLatest(constants.UDT_POST_STATE, udtPostState);
  yield takeLatest(constants.GET_SITE_COMBO, getSiteCombo);
}
