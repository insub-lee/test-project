import { fromJS } from 'immutable';
import { takeLatest, call, put, select } from 'redux-saga/effects';

import { Axios } from 'utils/AxiosFunc';

import * as constantTypes from './constants';
import * as actions from './actions';
import selectors from './selectors';

function* getManualView(action) {
  const { flag, widgetId } = action;
  const mualIdx = yield select(selectors.makeSelectedMualIdxByWidgetId(widgetId));

  if (mualIdx && mualIdx > 0) {
    yield put(actions.resetManualViewByReducr(widgetId));
    const response = yield call(Axios.get, `/api/manual/v1/ManualViewHandler/${mualIdx}`);
    const { list } = response;
    if (list && list.length > 0) {
      const maulTabList = list.map(item => ({ ...item, MUAL_TABVIEWINFO: JSON.parse(item.MUAL_TABVIEWINFO), disabled: false }));
      yield put(actions.setManualViewByReducr(fromJS(maulTabList), widgetId));
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
