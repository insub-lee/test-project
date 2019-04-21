import { put, takeLatest, call, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as constants from './constants';
import { Axios } from '../../../utils/AxiosFunc';

export function* getIflBoardDataList(payload) {
  // const uInfo = yield select(state => state.get('auth').get('profile'));
  // 임시 지정(그룹/카테고리)
  // const grSeq = 1501;
  // 해당 그룹 카테고리 가져와 해당 게시글 요청
  const grSeq = [];
  const ctSeq = [];
  for (var i=0; i < payload.cateList.length; i++) {
    grSeq.push(payload.cateList[i].grSeq);
    ctSeq.push(payload.cateList[i].ctSeq);
  }
  const bArray = [];
  for (var i=0; i < ctSeq.length; i++) {
    const bData = yield call(Axios.get,
      `${constants.IFLOW_URL}/api/itf/v1/portalInterface/groups/articles?ctseq=${ctSeq[i]}&grseq=${grSeq[i]}&page=${payload.pageNum}&pagepernum=${payload.count}&keyword=`);
    const articles = [];
    bData.articles.map(item => {
      if (item.arType !== 2) { articles.push(item) };
    });
    bArray.push(articles);
  }
  yield put({ type: constants.SET_IFBOARD_DATA_LIST, payload: fromJS(bArray) });
}

export default function* iFlowSaga() {
  yield takeLatest(constants.GET_IFBOARD_DATA_LIST, getIflBoardDataList);
}