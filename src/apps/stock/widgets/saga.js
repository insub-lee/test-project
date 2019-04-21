import { call, put, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from '../../../utils/AxiosFunc';
import * as constants from './constants';

export function* getStockList(payload) {

  if (payload) {
    const response = yield call(Axios.post, '/apps/api/v1/stock/stockList', payload);
    const stockLists = response.stockList;

    if (stockLists !== undefined) {
      const DailyStock = stockLists.DailyStock;
      const StockInfo = stockLists.stockInfo;

      yield put({
        type: constants.SET_STOCKLIST_SAGA,
        payload: fromJS(DailyStock),
      });
      yield put({ type: constants.SET_STOCKINFO_SAGA,
        payload: fromJS(StockInfo),
      });
    } else {
      yield put({
        type: constants.SET_STOCKLIST_SAGA,
        payload: fromJS([]),
      });
      yield put({ type: constants.SET_STOCKINFO_SAGA,
        payload: fromJS([]),
      });
    }
  }
}

export default function* stockSaga() {
  yield takeLatest(constants.GET_STOCKLIST_SAGA, getStockList);
}
