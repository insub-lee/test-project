import { call, put, takeLatest } from 'redux-saga/effects';
// import { fromJS } from 'immutable';
import * as actionType from './constants';
import * as constantsCommon from '../../../containers/common/constants';
import { Axios } from '../../../utils/AxiosFunc';
import * as feed from '../../../components/Feedback/functions';

export function* getBannerList(payload) {
  // const emptyItem = {}

  // emptyItem["data"] = {};
  // emptyItem.data["body"] = [];
  // emptyItem["widgetID"] = "123";
  // emptyItem["viewType"] = "0";

  // const itemValue = JSON.stringify(emptyItem);

  const data = {
    PARAM: {
      WIDGETID: payload.id,
      // ITEMVALUE: itemValue
    },
  };
  const response = yield call(Axios.post, '/api/portal/v1/page/getBannerList/', data);
  const result = JSON.parse(response.list.ITEM_VALUE);
  const resultValue = result.data.body;

  for (let i = 0; i < resultValue.length; i += 1) {
    Object.assign(resultValue[i], { SEQNO: `${i}` });
  }

  if (resultValue) {
    yield put({
      type: actionType.SET_BANNERLIST,
      resultValue,
      result,
    });
  }
}

export function* deleteBanner(payload) {
  const { item, widgetId, pageId } = payload;
  const data = {
    PARAM: {
      ITEM: item,
      WIDGETID: widgetId,
      PAGEID: pageId,
    },
  };

  const response = yield call(Axios.post, '/api/portal/v1/page/deleteBanner/', data);
  if (response.result === 'success') {
    const resultValue = response.resultValue.ITEM_VALUE;
    feed.success('배너가 적용 되었습니다.');
    yield put({ type: actionType.SET_BANNERLIST_SUCCESS, item: JSON.parse(resultValue), widgetId: payload.widgetId, pageId: payload.pageId });
  }
}

export function* resetWidget(payload) {
  const { widget } = payload;
  if (widget) {
    yield put({ type: actionType.SET_BANNERLIST, item: JSON.parse(widget) });
  }
}

export function* deleteBizBanner(payload) {
  const { item, widgetId, pageId } = payload;
  const data = {
    PARAM: {
      ITEM: item,
      WIDGETID: widgetId,
      PAGEID: pageId,
    },
  };

  const response = yield call(Axios.post, '/api/portal/v1/page/deleteBizBanner/', data);
  if (response.result === 'success') {
    const resultValue = response.resultValue.ITEM_VALUE;
    feed.success('배너가 적용 되었습니다.');
    yield put({ type: actionType.SET_BIZBANNERLIST_SUCCESS, item: JSON.parse(resultValue), widgetId: payload.widgetId, pageId: payload.pageId });
  }
}

export default function* bannerSaga() {
  yield takeLatest(actionType.GET_BANNERLIST_SAGA, getBannerList);
  yield takeLatest(actionType.DELETE_BANNER_SAGA, deleteBanner);
  yield takeLatest(constantsCommon.RESET_MYMENU_WIDGET, resetWidget);
  yield takeLatest(actionType.DELETE_BIZBANNER_SAGA, deleteBizBanner);
}
