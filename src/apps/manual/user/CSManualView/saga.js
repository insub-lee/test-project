import { fromJS } from 'immutable';
import { takeLatest, call, put, select } from 'redux-saga/effects';

import { Axios } from 'utils/AxiosFunc';

import * as constantTypes from './constants';
import * as actions from './actions';
import selectors from './selectors';

function* getManualView() {
  const mualIdx = yield select(selectors.makeSelectedMualIdx());
  if (mualIdx && mualIdx > 0) {
    yield put(actions.resetManualViewByReducr());
    const response = yield call(Axios.get, `/api/manual/v1/ManualViewHandler/${mualIdx}`);
    const { list } = response;
    if (list && list.length > 0) {
      const maulTabList = list.map(item => ({ ...item, MUAL_TABVIEWINFO: JSON.parse(item.MUAL_TABVIEWINFO), disabled: false }));
      yield put(actions.setManualViewByReducr(fromJS(maulTabList)));
    } else {
      console.debug('tab error');
    }
  } else {
    console.debug('tab error');
  }
}

export default function* watcher() {
  yield takeLatest(constantTypes.GET_MANUAL_VIEW_SAGA, getManualView);
}
