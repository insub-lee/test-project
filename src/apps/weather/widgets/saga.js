import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import * as actionType from './constants';
import * as constantsCommon from '../../../containers/common/constants';
import { Axios } from '../../../utils/AxiosFunc';
import * as feed from '../../../components/Feedback/functions';

export function* deleteWeather(payload) {
  const { item, widgetId, pageId } = payload;
  const data = {
    PARAM: {
      ITEM: item,
      WIDGETID: widgetId,
      PAGEID: pageId,
    },
  };

  const response = yield call(Axios.post, '/api/portal/v1/page/deleteWeather/', data);
  if (response.result === 'success') {
    const resultValue = response.resultValue.ITEM_VALUE;
    message.success(
      <MessageContent>
        {/* {intlObj.get(messages.reviewRegistOk)}  */}
        {'지역이 적용 되었습니다.'}
      </MessageContent>,
      2,
    );

    // console.log(response, 'test');
    // feed.success('지역이 적용 되었습니다.');
    yield put({ type: actionType.SET_WEATHERLIST_SUCCESS, item: JSON.parse(resultValue), widgetId: payload.widgetId, pageId: payload.pageId });
  }
}

export function* deleteBizWeather(payload) {
  const { item, widgetId, pageId } = payload;
  const data = {
    PARAM: {
      ITEM: item,
      WIDGETID: widgetId,
      PAGEID: pageId,
    },
  };

  const response = yield call(Axios.post, '/api/portal/v1/page/deleteBizWeather/', data);
  if (response.result === 'success') {
    const resultValue = response.resultValue.ITEM_VALUE;
    message.success(
      <MessageContent>
        {/* {intlObj.get(messages.reviewRegistOk)}  */}
        {'지역이 적용 되었습니다.'}
      </MessageContent>,
      2,
    );
    // console.log(response, 'test');
    // feed.success('지역이 적용 되었습니다.');
    yield put({ type: actionType.SET_BIZWEATHERLIST_SUCCESS, item: JSON.parse(resultValue), widgetId: payload.widgetId, pageId: payload.pageId });
  }
}

export default function* weatherSaga() {
  yield takeLatest(actionType.DELETE_WEATHER_SAGA, deleteWeather);
  yield takeLatest(actionType.DELETE_BIZWHEATHER_SAGA, deleteBizWeather);
}
