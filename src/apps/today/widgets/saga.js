import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionType from './constants';
import { Axios } from '../../../utils/AxiosFunc';
import message from 'components/Feedback/message';
// import fakeData from './fakeData';

let startDate = null;
let endDate = null;

// const { tempTodayList } = fakeData;

export function* getTodayList(payload) {

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
    const startDate = sYear + sMonth + sDate;
    const endDate = eYear + eMonth + eDate;
    const PARAM = {
      startDate: startDate,
      endDate: endDate,
      pageSize: pageSize,
      pageNum: pageNum,
    }

    yield call(Axios.post, '/apps/api/v1/todo/todoList', {PARAM} );
  }

  // //test
  // const startDate = sYear + '-' + sMonth + '-' + sDate;
  // const endDate = eYear + '-' + eMonth + '-' + eDate;
  // const resultValue = tempTodayList.slice().toJS();

  // console.log('resultValue', resultValue);

  // const test1 = resultValue.map(data=> data.STARTDATE);
  // const test2 = resultValue.map(data=> data.ENDDATE);

  // const filteredData = resultValue.filter(data =>
  //   // new Date(startDate).getTime() >= new Date(data.STARTDATE).getTime() &&
  //   new Date(endDate).getTime() >= new Date(data.ENDDATE).getTime()
  // );

  // console.log('filteredData', filteredData);

  // yield put({
  //   type: actionType.SET_WEEK_TODAYLIST,
  //   payload: filteredData,
  //   tp: 'notify/TOD00100',
  // });
}

export function* todayList(payload) {
  if (payload) {
    yield put({
      type: actionType.SET_WEEK_TODAYLIST,
      payload: payload.resultArray,
      tp: 'notify/TOD00100',
    });
  } else {
    yield put({
      type: actionType.SET_WEEK_TODAYLIST,
      payload: [],
      tp: '',
    });
  }
}

export function* udtCompleteToday(payload) {
  startDate = payload.startDate;
  endDate = payload.endDate;

  yield call(Axios.post, '/apps/api/v1/todo/udtcompletetoday', payload);
}

export function* udtResultToday(payload) {
  if(payload){
    if(payload.code === 200) {
      yield put({
        type: actionType.GET_TODAYLIST_SAGA,
        startDate,
        endDate,
      });
    } else {
      message.error('완료처리중 오류가 발생하였습니다.', 2);
    }
  }
}

export default function* todaySaga() {
  yield takeLatest(actionType.GET_TODAYLIST_SAGA, getTodayList);
  yield takeLatest('notify/TOD00100', todayList);
  yield takeLatest(actionType.UDT_COMPLETE_TODAY, udtCompleteToday);
  yield takeLatest('notify/TOD00101', udtResultToday);
}
