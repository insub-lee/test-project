import { put, takeLatest, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Cookies } from 'react-cookie';
// import { ifUrl } from 'utils/commonUtils';
import * as actionTypes from 'containers/common/Routes/constants';
import { delay } from 'redux-saga';

import { Axios } from 'utils/AxiosFunc';
import { IflowApi } from 'utils/IflowFunc';
import * as constants from './constants';

const cookies = new Cookies();
const LASTUSER = cookies.get('LASTUSER');
/* eslint-disable */
export function* initQnaList(payload) {
  const { page, pagepernum, t2, t3 } = payload.payload;

  const qnaResult = yield call(IflowApi.get, 'qnaList', payload.payload);

  if (qnaResult.totalCount > 0) {
    yield put({ type: constants.SET_QNA_LIST, payload: fromJS(qnaResult.articles) });
    yield put({ type: constants.QNA_TOT_COUNT, payload: qnaResult.totalCount });
  } else {
    yield put({ type: constants.SET_QNA_LIST, payload: fromJS([]) });
    yield put({ type: constants.QNA_TOT_COUNT, payload: 0 });
  }

  // const faqParam = { page, pagepernum };
  const faqResult = yield call(IflowApi.get, 'faqList', payload.payload);

  if (faqResult.totalCount > 0) {
    yield put({ type: constants.SET_FAQ_LIST, payload: fromJS(faqResult.articles) });
    yield put({ type: constants.FAQ_TOT_COUNT, payload: faqResult.totalCount });
  } else {
    yield put({ type: constants.SET_FAQ_LIST, payload: fromJS([]) });
    yield put({ type: constants.FAQ_TOT_COUNT, payload: 0 });
  }

  const myqnaParam = {
    page,
    pagepernum,
    t2,
    t3,
    empnoregist: LASTUSER,
  };
  const myqnaResult = yield call(IflowApi.get, 'qnaList', myqnaParam);

  if (myqnaResult.totalCount > 0) {
    yield put({ type: constants.SET_MYQNA_LIST, payload: fromJS(myqnaResult.articles) });
    yield put({ type: constants.MYQNA_TOT_COUNT, payload: myqnaResult.totalCount });
  } else {
    yield put({ type: constants.SET_MYQNA_LIST, payload: fromJS([]) });
    yield put({ type: constants.MYQNA_TOT_COUNT, payload: 0 });
  }

  const appManagerChkParam = {
    page,
    pagepernum,
    appId: t2,
    gubun: t3,
  };

  const response = yield call(Axios.post, '/api/bizstore/v1/store/appManagerChk/', appManagerChkParam);
  yield put({ type: constants.APP_MANAGER_CHK, payload: response.appManagerChk });

  const qnaWriteUrl = yield call(IflowApi.getUrl, 'qna', t2, t3);
  yield put({ type: constants.QNA_WRITE_URL, payload: qnaWriteUrl });

  const faqWriteUrl = yield call(IflowApi.getUrl, 'faq', t2, t3);
  yield put({ type: constants.FAQ_WRITE_URL, payload: faqWriteUrl });

  const qnaEditUrl = yield call(IflowApi.getUrl, 'qnaEdit', t2, t3);
  yield put({ type: constants.QNA_EDIT_URL, payload: qnaEditUrl });
}

export function* getQnaList(payload) {
  const { page, pagepernum, qnaList, t2, t3 } = payload.payload;

  const qnaParam = {
    page,
    pagepernum,
    t2,
    t3,
  };
  const qnaResult = yield call(IflowApi.get, 'qnaList', qnaParam);

  if (qnaResult.totalCount > 0) {
    qnaResult.articles.map(item =>
      qnaList.push({
        key: item.key,
        APP_ID: item.APP_ID,
        arTitle: item.arTitle,
        arText: item.arText,
        empNo: item.empNo,
        empName: item.empName,
        deptName: item.deptName,
        positionName: item.positionName,
        regDt: item.regDt,
        replyList: item.replyList,
        t1: item.t1,
        empnoRegist: item.empnoRegist,
        arSeq: item.arSeq,
      }),
    );
    yield put({ type: constants.SET_QNA_LIST, payload: fromJS(qnaList) });
    yield put({ type: constants.QNA_TOT_COUNT, payload: qnaResult.totalCount });
  } else {
    yield put({ type: constants.SET_QNA_LIST, payload: fromJS([]) });
    yield put({ type: constants.QNA_TOT_COUNT, payload: 0 });
  }
}

export function* getFaqList(payload) {
  const { page, pagepernum, faqList } = payload.payload;
  const faqParam = { page, pagepernum };
  const faqResult = yield call(IflowApi.get, 'faqList', faqParam);

  if (faqResult.totalCount > 0) {
    faqResult.articles.map(item =>
      faqList.push({
        key: item.key,
        APP_ID: item.APP_ID,
        arTitle: item.arTitle,
        arText: item.arText,
        empNo: item.empNo,
        empName: item.empName,
        deptName: item.deptName,
        positionName: item.positionName,
        regDt: item.regDt,
        arSeq: item.arSeq,
      }),
    );
    yield put({ type: constants.SET_FAQ_LIST, payload: fromJS(faqList) });
    yield put({ type: constants.FAQ_TOT_COUNT, payload: faqResult.totalCount });
  } else {
    yield put({ type: constants.SET_FAQ_LIST, payload: fromJS([]) });
    yield put({ type: constants.FAQ_TOT_COUNT, payload: 0 });
  }
}

export function* getMyqnaList(payload) {
  const { page, pagepernum, myqnaList, t2, t3 } = payload.payload;

  const myqnaParam = {
    page,
    pagepernum,
    t2,
    t3,
    empnoregist: LASTUSER,
  };
  const myqnaResult = yield call(IflowApi.get, 'qnaList', myqnaParam);

  if (myqnaResult.totalCount > 0) {
    myqnaResult.articles.map(item =>
      myqnaList.push({
        key: item.key,
        APP_ID: item.APP_ID,
        arTitle: item.arTitle,
        arText: item.arText,
        empNo: item.empNo,
        empName: item.empName,
        deptName: item.deptName,
        positionName: item.positionName,
        regDt: item.regDt,
        replyList: item.replyList,
        t1: item.t1,
        arSeq: item.arSeq,
        empnoRegist: item.empnoRegist,
      }),
    );
    yield put({ type: constants.SET_MYQNA_LIST, payload: fromJS(myqnaList) });
    yield put({ type: constants.MYQNA_TOT_COUNT, payload: myqnaResult.totalCount });
  } else {
    yield put({ type: constants.SET_MYQNA_LIST, payload: fromJS([]) });
    yield put({ type: constants.MYQNA_TOT_COUNT, payload: 0 });
  }
}

export function* commonNotification(action) {
  const param = {
    page: 1,
    pagepernum: 2,
    t2: String(action.APP_ID),
    t3: action.APP_GUBUN,
  };
  yield call(delay, 2000);
  yield put({ type: constants.INIT_QNA_LIST, payload: param });
}

export default function* orgSage() {
  yield takeLatest(constants.INIT_QNA_LIST, initQnaList);
  yield takeLatest(constants.GET_QNA_LIST, getQnaList);
  yield takeLatest(constants.GET_FAQ_LIST, getFaqList);
  yield takeLatest(constants.GET_MYQNA_LIST, getMyqnaList);
  yield takeLatest(actionTypes.COMMON_NOTIFY, commonNotification);
}
