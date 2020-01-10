import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as actionType from './constants';

export function* boot(payload) {
  const WIDGET_ID = payload.widgetId;
  const { param } = payload;

  const widgetSettingData = yield Axios.post(`path/${WIDGET_ID}`, param);
  console.log(widgetSettingData, 'widgetSettingData');
}
