import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as actionType from './constants';
import { Axios } from 'utils/AxiosFunc';

export function* boot(payload) {
  const WIDGET_ID = payload.widgetId;
  const param = payload.param;

  const widgetSettingData = yield Axios.post(`path/${WIDGET_ID}`, param);
  console.log(widgetSettingData, 'widgetSettingData');
}
