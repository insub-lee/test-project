import { put, takeLatest, call, select, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as constants from './constants';
import { Axios } from '../../../utils/AxiosFunc';
import { IflowApi } from 'utils/IflowFunc';

export function* getIflBoardDataList(payload) {
  const grSeq = [];
  const ctSeq = [];
  const catePageList = [];
  for (var i=0; i < payload.cateList.length; i++) {
    grSeq.push(payload.cateList[i].grSeq);
    ctSeq.push(payload.cateList[i].ctSeq);
    catePageList.push({
      grSeq: payload.cateList[i].grSeq,
      ctSeq: payload.cateList[i].ctSeq,
      page: 1,
      totalCount: 0,
      widgetId: payload.widgetId,
    });
  }
  const bArray = [];
  for (var i=0; i < ctSeq.length; i++) {
    const param = { grseq: grSeq[i], ctseq: ctSeq[i], page: payload.page, pagepernum: payload.pagepernum };
    const bData = yield call(IflowApi.get,'articleList', param);

    // // 답글이 아닌 글만 추려냄
    // const articles = [];
    // bData.articles.map(item => {
    //   if (item.arType !== 2) { articles.push(item) };
    // });
    // bArray.push(articles);
    bArray.push(bData.articles);
    catePageList[i].totalCount = bData.totalCount;
    
  }
  yield put({ type: constants.CATE_PAGE_LIST, payload: fromJS(catePageList) });
  yield put({ type: constants.SET_IFBOARD_DATA_LIST, payload: fromJS(bArray) });
}

export function* getIfDetailBoardList(payload) {
  const uInfo = yield select(state => state.get('auth').get('profile'));
  const param = { empno: uInfo.EMP_NO };
  const result = yield call(IflowApi.getDetail, 'detail', payload.num, param);

  yield put({ type: constants.SET_IFCOARD_DETAIL_DATA_LIST, result });
}

export function* boardListPageing(payload) {
  const bArray = payload.boardDataList;
  const page = payload.catePageList[payload.index].page;
  const pagepernum = payload.pagepernum;
  const grseq = payload.catePageList[payload.index].grSeq;
  const ctseq = payload.catePageList[payload.index].ctSeq;

  const param = { grseq, ctseq, page, pagepernum };
  const bData = yield call(IflowApi.get,'articleList', param);

  if ((page - 1) * pagepernum >= bArray[payload.index].length) {
    // 답글이 아닌 글만 추려냄
    const articles = [];
    bData.articles.map(item => {
      // if (item.arType !== 2) { articles.push(item) };
      bArray[payload.index].push(item);
    });

    yield put({ type: constants.CATE_PAGE_LIST, payload: fromJS(payload.catePageList) });
    yield put({ type: constants.SET_IFBOARD_DATA_LIST, payload: fromJS(bArray) });
  }
}

export default function* iFlowSaga() {
  // yield takeLatest(constants.GET_IFBOARD_DATA_LIST, getIflBoardDataList);
  yield takeEvery(constants.GET_IFBOARD_DATA_LIST, getIflBoardDataList);
  yield takeLatest(constants.GET_IFCOARD_DETAIL_DATA_LIST, getIfDetailBoardList);
  yield takeLatest(constants.BOARD_LIST_PAGEING, boardListPageing);

}