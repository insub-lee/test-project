import { put, takeLatest, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from '../../../../../utils/AxiosFunc';

import * as constants from './constants';

export function* getMyAppList(payload) {
  const { setMyAppList } = payload.payload;
  const params = { ...payload.payload, SITE_ID: -1 };
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/myapplist/', params);

  if (response.myappList.length > 0) {
    response.myappList.map(item =>
      setMyAppList.push({
        RNUM: item.RNUM,
        APP_ID: item.APP_ID,
        VER: item.VER,
        NAME_KOR: item.NAME_KOR,
        NAME_ENG: item.NAME_ENG,
        NAME_CHN: item.NAME_CHN,
        NAME_JPN: item.NAME_JPN,
        NAME_ETC: item.NAME_ETC,
        CATE_KOR: item.CATE_KOR,
        CATE_ENG: item.CATE_ENG,
        CATE_CHN: item.CATE_CHN,
        CATE_JPN: item.CATE_JPN,
        CATE_ETC: item.CATE_ETC,
        MENU_SVC_YN: item.MENU_SVC_YN,
        WIDGET_SVC_YN: item.WIDGET_SVC_YN,
        APV_STATUS_KOR: item.APV_STATUS_KOR,
        APV_STATUS_ENG: item.APV_STATUS_ENG,
        APV_STATUS_CHN: item.APV_STATUS_CHN,
        APV_STATUS_JPN: item.APV_STATUS_JPN,
        APV_STATUS_ETC: item.APV_STATUS_ETC,
        APV_STATUS_CODE: item.APV_STATUS_CODE,
        APV_STATUS_ORDERBY: item.APV_STATUS_ORDERBY,
        UPD_DTTM: item.UPD_DTTM,
      }),
    );
  }

  yield put({ type: constants.SET_MY_APP_LIST, payload: fromJS(setMyAppList) });
  yield put({ type: constants.SET_SEARCH_TYPE_LIST, payload: fromJS(response.searchTypeList) });
}

export default function* orgSage() {
  yield takeLatest(constants.GET_MY_APP_LIST, getMyAppList);
}
