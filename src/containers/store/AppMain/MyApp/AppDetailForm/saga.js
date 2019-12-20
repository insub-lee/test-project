import { put, takeLatest, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { intlObj } from 'utils/commonUtils';
import * as feed from 'components/Feedback/functions';

import messages from '../messages';

import * as constants from './constants';
import { Axios } from '../../../../../utils/AxiosFunc';

export function* getMyAppDetail(payload) {
  const { history } = payload.payload;
  const params = { ...payload.payload, SITE_ID: -1 };
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/appDetail/', params);

  if (response.managerChk === 0) {
    feed.error(`${intlObj.get(messages.authChk)}`);
    if (response.mod === 1) {
      history.push('/store/appMain/MyApp');
    } else if (response.mod === 2) {
      history.push('/store/appMain/AppOpinion');
    }
  } else {
    const { appinfo } = response;

    const clientType = appinfo.CLIENT_TYPE;
    const clientTypeArr = clientType.split('|');
    const clientTypeArr2 = [];

    clientTypeArr.map(item => (item === 'W' ? clientTypeArr2.push(intlObj.get(messages.web)) : ''));
    clientTypeArr.map(item => (item === 'P' ? clientTypeArr2.push(intlObj.get(messages.pc)) : ''));
    clientTypeArr.map(item => (item === 'M' ? clientTypeArr2.push(intlObj.get(messages.mobile)) : ''));
    appinfo.CLIENT_TYPE = clientTypeArr2.join('/');

    const langList = appinfo.LANG_LIST;
    const langListArr = langList.split('|');
    const langListArr2 = [];

    langListArr.map(item => (item === 'KOR' ? langListArr2.push(intlObj.get(messages.kor)) : ''));
    langListArr.map(item => (item === 'ENG' ? langListArr2.push(intlObj.get(messages.eng)) : ''));
    langListArr.map(item => (item === 'CHN' ? langListArr2.push(intlObj.get(messages.chn)) : ''));
    appinfo.LANG_LIST = langListArr2.join('/');

    yield put({ type: constants.SET_MY_APP_DETAIL, payload: appinfo });

    if (response.process.length > 0) {
      yield put({ type: constants.APP_PROCESS, payload: response.process[0] });
    } else {
      yield put({ type: constants.APP_PROCESS, payload: fromJS([]) });
    }

    if (response.manual.length > 0) {
      yield put({ type: constants.APP_MANUAL, payload: response.manual[0] });
    } else {
      yield put({ type: constants.APP_MANUAL, payload: fromJS([]) });
    }

    yield put({ type: constants.SCREENSHOT_LIST, payload: fromJS(response.screenshotList) });
    yield put({ type: constants.RES_APP_LIST, payload: fromJS(response.reqAppList) });
    yield put({ type: constants.RECOM_APP_LIST, payload: fromJS(response.recomAppList) });

    if (response.systemLink !== null) {
      yield put({ type: constants.SYSTEM_LINK, payload: response.systemLink });
    } else {
      yield put({ type: constants.SYSTEM_LINK, payload: [] });
    }
  }
}

export default function* orgSage() {
  yield takeLatest(constants.GET_MY_APP_DETAIL, getMyAppDetail);
}
