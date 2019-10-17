import { takeLatest, put, call, takeEvery, select } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constantTypes from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

function* getDraftDetail({ payload, setDraftDetail }) {
  const response = yield call(Axios.get, `/api/workflow/v1/common/draft/detail?draftId=${payload.DRAFT_ID}&queId=${payload.QUE_ID}`);
  const { detail, signline, draftHistory } = response;
  yield put(actions.setDraftDetail(detail, signline, draftHistory));

  if (typeof setDraftDetail === 'function') {
    setDraftDetail(detail);
  }
}

function* requestApproval({ payload, callbackFunc }) {
  const response = yield call(Axios.put, `/api/workflow/v1/common/draft/detail`, payload);
  const { code } = response;
  if (code === 200) {
    // yield put(actions.setIsRedirect(true));
    yield put(actions.setVisibleOpinionModal(false));
    // yield put(draftListActions.setSelectedDraft({}, false));
    if (typeof callbackFunc === 'function') {
      callbackFunc();
    }
  } else {
    alert('결재요청 실패!!!!');
  }
}

function* requestReject({ payload, callbackFunc }) {
  const response = yield call(Axios.put, `/api/workflow/v1/common/draft/detail`, payload);
  const { code } = response;
  if (code === 200) {
    // yield put(actions.setIsRedirect(true));
    yield put(actions.setVisibleOpinionModal(false));
    // yield put(draftListActions.setSelectedDraft({}, false));
    if (typeof callbackFunc === 'function') {
      callbackFunc();
    }
  } else {
    alert('결재요청 실패!!!!');
  }
}

function* getExtraApiData({ step, apiArr }) {
  if (apiArr && apiArr.length > 0) {
    for (let i = 0; i < apiArr.length; i += 1) {
      let response = {};
      const apiInfo = apiArr[i];
      if (apiInfo && apiInfo.url && apiInfo.url !== '') {
        if (apiInfo.type.toUpperCase() === 'GET') {
          response = yield call(Axios.get, apiInfo.url);
        } else if (apiInfo.type.toUpperCase() === 'POST') {
          response = yield call(Axios.post, apiInfo.url, apiInfo.params);
        }
      }
      yield put(actions.setExtraApiData(step, apiInfo.key, response));
    }
  }
}

function* getProcessData({ prcId }) {
  const response = yield call(Axios.get, `/api/workflow/v1/common/process?prcId=${prcId}`);
  const { processInfo, processStep } = response;
  yield put(actions.setProcessDataByReducr(processInfo, processStep));
}

function* addDraftLine({ REL_TYPE, REL_KEY, PRC_ID, TITLE }) {
  const stepLine = yield select(selectors.makeStepLine());
  const processStep = [];
  const keySet = Object.keys(stepLine);
  keySet.forEach(node => {
    processStep.push({ ...stepLine[node], STEP_USERS: stepLine[node].DRAFT_IDS ? stepLine[node].DRAFT_IDS.map(subNode => ({ ID: subNode.DRAFT_ID })) : [] });
  });
  const payload = { REL_TYPE, REL_KEY, PRC_ID, TITLE, processStep };
  const response = yield call(Axios.post, '/api/workflow/v1/common/draft/init', { PARAM: payload });
}

function* getDraftStepInfo({ stepInfo, apiInfo }) {
  let response = {};
  if (apiInfo && apiInfo.url && apiInfo.url !== '') {
    if (apiInfo.type.toUpperCase() === 'GET') {
      response = yield call(Axios.get, apiInfo.url);
    } else if (apiInfo.type.toUpperCase() === 'POST') {
      response = yield call(Axios.post, apiInfo.url, apiInfo.params);
    }
  }
  if (response && response[apiInfo.key] && response[apiInfo.key].length > 0)
    yield put(actions.setDraftStepInfoByReducr(stepInfo.STEP, { DRAFT_IDS: response[apiInfo.key], STEP: stepInfo.STEP, NODE_ID: stepInfo.NODE_ID }));
}

export default function* watcher() {
  // const arg = arguments[0];
  // console.debug(arguments);
  yield takeLatest(constantTypes.GET_DRAFT_DETAIL, getDraftDetail);
  yield takeLatest(constantTypes.REQ_APPROVAL, requestApproval);
  yield takeLatest(constantTypes.GET_PROCESS_DATA_BY_SAGA, getProcessData);
  yield takeLatest(constantTypes.ADD_DRAFT_LINE_BY_SAGA, addDraftLine);
  yield takeLatest(constantTypes.REQ_REJECT_BY_SAGA, requestReject);
  yield takeEvery(constantTypes.GET_EXTRA_API_DATA, getExtraApiData);
  yield takeEvery(constantTypes.GET_DRAFT_STEP_INFO_BY_SAGA, getDraftStepInfo);
}
