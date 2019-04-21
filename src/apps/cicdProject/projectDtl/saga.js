import React from 'react';
import { takeLatest, call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { intlObj } from 'utils/commonUtils';
// import * as feed from 'components/Feedback/functions';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import messages from '../messages';

import * as constants from './constants';
import { Axios } from '../AxiosFunc';

export function* getDefaultList() {
  const response = yield call(Axios.post, '/apps/api/v1/cicd/getDefault');

  if (response.defaultList.length > 0) {
    if (response.code === 200) {
      yield put({ type: constants.SET_DEFAULT, payload: fromJS(response.defaultList) });
    } else {
      yield put({ type: constants.SET_DEFAULT, payload: fromJS([]) });
    }
  }
}

// new add start
// projectReg(git, jenkins)
export function* projectDtl(payload) {
  const { history } = payload;
  const response = yield call(Axios.post, '/apps/api/v1/cicd/projectDtl', payload);

  // 성공
  message.success(
    <MessageContent>
      {intlObj.get(messages.regComplete)}
    </MessageContent>,
    3,
  );
  history.push({ pathname: '/apps/cicdProject/projectList', search: 'D', state: { SITE_ID: parseInt(response.SITE_ID, 10) } });
}

// projectName dupCheck
export function* dupCheck(payload) {
  const response = yield call(Axios.post, '/apps/api/v1/cicd/projectDuplicateCheck', payload);
  const resultValue = response.result;

  yield put({
    type: constants.DUP_CHECK,
    dupCheckFlag: resultValue,
  });
}

// 프로젝트 구분 selectbox
export function* loadingParam(payload) {
  const data = {
    param: {
      comboType: 'DIVION_COMBO',
      PARAM_BEBER: payload.value,
    },
  };

  const response = yield call(Axios.post, '/apps/api/v1/cicd/CommonCombo', data);

  yield put({
    type: constants.LOADING_PARAM,
    divionListCombo: fromJS(response.comboList),
  });
}

// PROJECT INFO 가져오기
export function* projectInfo(payload) {
  const response = yield call(Axios.post, '/apps/api/v1/cicd/projectInfo', payload);
  yield put({
    type: constants.LOADING_PROJECT_INFO,
    projectData: response.projectInfo,
  });
}

// PROJECT INFO 수정
export function* projectUpdate(payload) {
  const data = yield call(Axios.post, '/apps/api/v1/cicd/projectUpdate', payload);
  yield put({
    type: constants.UPDATE_PROJECT,
    updateCheck: data.result,
  });
}

export default function* orgSage() {
  yield takeLatest(constants.GET_DEFAULT, getDefaultList);
  // new add
  yield takeLatest(constants.PROJECT_REG_SAGA, projectDtl);
  yield takeLatest(constants.DUP_CHECK_SAGA, dupCheck);
  yield takeLatest(constants.LOADING_PARAM_SAGA, loadingParam);
  yield takeLatest(constants.LOADING_PROJECT_INFO_SAGA, projectInfo);
  yield takeLatest(constants.UPDATE_PROJECT_SAGA, projectUpdate);
}
