import { fromJS } from 'immutable';
import { takeLatest, put, call, select } from 'redux-saga/effects';

import { Axios } from 'utils/AxiosFunc';
import { makeSelectProfile } from 'containers/common/Auth/selectors';

import * as constantTypes from './constants';
import * as actions from './actions';
import selectors from './selectors';

function* getTotalManualList(action) {
  const { categoryIdx, widgetId } = action;
  const response = yield call(Axios.get, `/api/manual/v1/CSManualListHandler/${categoryIdx}`);
  const { totalManualList } = response;
  yield put(actions.setTotalManualList(fromJS(totalManualList), widgetId));
}

function* setSelectedMualOrgIdx(action) {
  const { mualIdx, widgetId, orgIdxList } = action;
  if (orgIdxList && orgIdxList > 0) {
    const profile = yield select(makeSelectProfile());
    const userId = profile && profile.USER_ID ? profile.USER_ID : 0;
    const param = {
      MUAL_ORG_LIST: [{ MUAL_ORG_IDX: orgIdxList }],
      USER_ID: userId,
      SORTINFO: '',
    };
    yield call(Axios.post, '/api/manual/v1/CSManualViewHistoryHandler', { param });
    yield put(actions.setSelectedMualIdxByReducr(mualIdx, widgetId));
  }
}

function* setMultiView(action) {
  const { widgetId } = action;
  const checkedMualList = yield select(selectors.makeCheckedManualListByWidgetId(widgetId));
  if (checkedMualList && checkedMualList.size > 0) {
    const mualIdx = checkedMualList.getIn([0, 'mualIdx']);
    const profile = yield select(makeSelectProfile());
    const userId = profile && profile.USER_ID ? profile.USER_ID : 0;
    const param = {
      MUAL_ORG_LIST: checkedMualList
        .reverse()
        .toJS()
        .map(item => ({ MUAL_ORG_IDX: item.mualOrgIdx })),
      USER_ID: userId,
      SORTINFO: '',
    };
    yield call(Axios.post, '/api/manual/v1/CSManualViewHistoryHandler', { param });
    yield put(actions.setSelectedMualIdxByReducr(mualIdx, widgetId));
    yield put(actions.setIsViewContentsByReducr(true, widgetId));
  }
}

export default function* initCSManualListSaga() {
  yield takeLatest(constantTypes.GET_TOTALMANUALIST, getTotalManualList);
  yield takeLatest(constantTypes.SET_SELECTED_MUAL_ORG_IDX_SAGA, setSelectedMualOrgIdx);
  yield takeLatest(constantTypes.SET_MULTI_VIEW_SAGA, setMultiView);
}
