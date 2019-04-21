import { put, takeLatest, call, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { IflowApi } from 'utils/IflowFunc';

import * as constants from './constants';
// import { Axios } from '../../../utils/AxiosFunc';

export function* getIflowDataList(payload) {
  const { pageSnum, pageEnum } = payload;
  const uInfo = yield select(state => state.get('auth').get('profile'));

  // const response = yield call(Axios.get,
  //   `${constants.IFLOW_URL}/api/itf/v1/portalInterface/timeline_articles/${uInfo.EMP_NO}?page=${payload.pageSnum}&pagepernum=${payload.pageEnum}&keyword=`);

  const timelineParam = { page: pageSnum, pagepernum: pageEnum };
  const response = yield call(IflowApi.getTimeline, 'timeline', uInfo.EMP_NO, timelineParam);

  const { dataList } = payload;
  if (response.articles.length > 0) {
    response.articles.map(item =>
      dataList.push({
        arSeq: item.arSeq,
        arTitle: item.arTitle,
        arCtname: item.arCtname,
        empNo: item.empnoRegist,
        empName: item.empName,
        positionName: item.positionName,
        modDt: item.modDt,
      })
    );
  }
  yield put({ type: constants.SET_IFLOW_DATA_LIST, payload: fromJS(dataList) });
}

export default function* iFlowSaga() {
  yield takeLatest(constants.GET_IFLOW_DATA_LIST, getIflowDataList);
}