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
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/appUser/', params);

  if (response.managerChk === 0) {
    feed.error(`${intlObj.get(messages.authChk)}`);
    if (response.mod === 1) {
      history.push('/admin/adminmain/sysapp');
    } else if (response.mod === 2) {
      history.push('/store/appMain/AppOpinion');
    }
  } else {
    yield put({ type: constants.APP_MANAGER_LIST, payload: fromJS(response.appmanager) });

    const userList = [];
    const dutyList = [];
    const pstnList = [];
    const grpList = [];
    const deptList = [];

    response.appSecList.map(item => (
      item.ACNT_TYPE === 'U' ? userList.push(item) : ''
    ));
    response.appSecList.map(item => (
      item.ACNT_TYPE === 'T' ? dutyList.push(item) : ''
    ));
    response.appSecList.map(item => (
      item.ACNT_TYPE === 'P' ? pstnList.push(item) : ''
    ));
    response.appSecList.map(item => (
      item.ACNT_TYPE === 'V' ? grpList.push(item) : ''
    ));
    response.appSecList.map(item => (
      item.ACNT_TYPE === 'D' ? deptList.push(item) : ''
    ));
    yield put({ type: constants.USER_LIST, payload: fromJS(userList) });
    yield put({ type: constants.DUTY_LIST, payload: fromJS(dutyList) });
    yield put({ type: constants.PSTN_LIST, payload: fromJS(pstnList) });
    yield put({ type: constants.GRP_LIST, payload: fromJS(grpList) });
    yield put({ type: constants.DEPT_LIST, payload: fromJS(deptList) });
  }
}

export default function* orgSage() {
  yield takeLatest(constants.GET_MY_APP_DETAIL, getMyAppDetail);
}
