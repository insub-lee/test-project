import { put, takeLatest, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import message from 'components/Feedback/message';
import { intlObj } from 'utils/commonUtils';
import * as constants from './constants';
import { Axios } from '../../../../../utils/AxiosFunc';
import messages from '../messages';

export function* getNotifyList(payload) {
  // console.log('getNotifyList_saga', payload.payload);
  // const { notifyList } = payload.payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/notifyadminlist', payload.payload);

  // if (response.notifyList.length > 0) {
  //   response.notifyList.map(item => (
  //     notifyList.push({
  //       SEQ: item.SEQ,
  //       MSG_ID: item.MSG_ID,
  //       SYSTEM: item.SYSTEM,
  //       SITE_ID: item.SITE_ID,
  //       SITE_NAME_KOR: item.SITE_NAME_KOR,
  //       SITE_NAME_ENG: item.SITE_NAME_ENG,
  //       SITE_NAME_CHN: item.SITE_NAME_CHN,
  //       SITE_NAME_JPN: item.SITE_NAME_JPN,
  //       SITE_NAME_ETC: item.SITE_NAME_ETC,
  //       MSG_TYPE: item.MSG_TYPE,
  //       START_DTTM: item.START_DTTM,
  //       END_DTTM: item.END_DTTM,
  //       CODE_NAME_KOR: item.CODE_NAME_KOR,
  //       CODE_NAME_ENG: item.CODE_NAME_ENG,
  //       CODE_NAME_CHN: item.CODE_NAME_CHN,
  //       CODE_NAME_JPN: item.CODE_NAME_JPN,
  //       CODE_NAME_ETC: item.CODE_NAME_ETC,
  //       OPEN_YN: item.OPEN_YN,
  //       TITLE_KOR: item.TITLE_KOR,
  //       TITLE_ENG: item.TITLE_ENG,
  //       TITLE_CHN: item.TITLE_CHN,
  //       TITLE_JPN: item.TITLE_JPN,
  //       TITLE_ETC: item.TITLE_ETC,
  //       URL: item.URL,
  //       METHOD: item.METHOD,
  //       PARAM: item.PARAM,
  //       TOT_CNT: item.TOT_CNT,
  //       RECV_CNT: item.RECV_CNT,
  //     })
  //   ));
  // }
  yield put({ type: constants.SET_NOTIFY_LIST, payload: fromJS(response.notifyList) });
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
