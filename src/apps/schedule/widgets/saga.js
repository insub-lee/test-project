import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionType from './constants';
import { Axios } from '../../../utils/AxiosFunc';
import moment from 'moment';

export function* getScheduleList(payload) {
  const sTempDate = payload.startDate;
  const sTimestamp = new Date(sTempDate).getTime();
  const sDate = ('00'.concat(new Date(sTimestamp).getDate())).slice(-2);
  const sMonth = ('00'.concat(new Date(sTimestamp).getMonth() + 1)).slice(-2);
  const sYear = new Date(sTimestamp).getFullYear();

  const eTempDate = payload.endDate;
  const eTimestamp = new Date(eTempDate).getTime();
  const eDate = ('00'.concat(new Date(eTimestamp).getDate())).slice(-2);
  const eMonth = ('00'.concat(new Date(eTimestamp).getMonth() + 1)).slice(-2);
  const eYear = new Date(eTimestamp).getFullYear();

  const pageSize = 100;
  const pageNum = 1;

  if (payload) {
    const startDate = sYear + '-' + sMonth + '-' + sDate;
    const endDate = eYear + '-' + eMonth + '-' + eDate;
    const PARAM = {
      date: startDate,
      endDate: endDate,
      pageSize: pageSize,
      pageNum: pageNum,
    }
    yield call(Axios.post, '/apps/api/v1/calendar/calendarList', {PARAM} );
  }
}

export function* scheduleList(payload) {
  if (payload) {
    const udtArray = payload.resultArray.map(item => item.endTime.substr(-8,8) === '00:00:00'
      ? ({ ...item, endTime: moment(new Date(item.endTime)).add('seconds', -1).format('YYYY-MM-DD HH:mm:ss') }): item);
    yield put({
      type: actionType.SET_WEEK_SCHEDULELIST,
      payload: udtArray,
      tp: 'notify/CAL0064',
    });
  } else {
    yield put({
      type: actionType.SET_WEEK_SCHEDULELIST,
      payload: [],
      tp: '',
    });
  }
}

export default function* scheduleSaga() {
  yield takeLatest(actionType.GET_SCHEDULELIST_SAGA, getScheduleList);
  yield takeLatest('notify/CAL0064', scheduleList);
}
