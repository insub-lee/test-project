import { fromJS } from 'immutable';
import { takeLatest, call, put, select } from 'redux-saga/effects';

import { Axios } from 'utils/AxiosFunc';
import { makeSelectProfile } from 'containers/common/Auth/selectors';

import * as constantTypes from './constants';
import * as actions from './actions';
import selectors from './selectors';

function* getManualView(action) {
  const { flag, widgetId } = action;
  let mualIdx = yield select(selectors.makeSelectedMualIdxByWidgetId(widgetId));
  const lastVersionYN = flag ? flag.toUpperCase() : yield select(selectors.makeSelectIsLastVersionByWidgetId(widgetId)) || 'Y';

  if (mualIdx && mualIdx > 0) {
    yield put(actions.resetManualViewByReducr(widgetId));
    const profile = yield select(makeSelectProfile());
    const userId = profile && profile.USER_ID ? profile.USER_ID : 0;
    const response = yield call(Axios.get, `/api/manual/v1/ManualViewHandler/${mualIdx}/${lastVersionYN}/${userId}`);
    const { list, historyList, navigationList, defaultMgrMap } = response;
    if (list && list.length > 0) {
      const maulTabList = list.map(item => ({ ...item, MUAL_TABVIEWINFO: JSON.parse(item.MUAL_TABVIEWINFO), disabled: false }));
      yield put(
        actions.setManualViewInfoByReducr(
          fromJS(maulTabList),
          fromJS(historyList),
          fromJS(historyList.filter(node => node.ISBOOKMARK === 'Y')),
          fromJS(defaultMgrMap),
          fromJS(navigationList),
          widgetId,
        ),
      );
      mualIdx = defaultMgrMap.MUAL_IDX;
      let isIndexRelation = false;
      let indexRelationIdxList = [];
      // if (response.componentList.findIndex(find => find.TYPE === 'indexRelation') > -1) {
      if (maulTabList.length > 0) {
        maulTabList.forEach(node => {
          const tempList = node.MUAL_TABVIEWINFO.filter(find => find.TYPE === 'indexRelation') || [];
          if (tempList.length > 0) {
            isIndexRelation = true;
            indexRelationIdxList = indexRelationIdxList.concat(tempList);
          }
        });
      }
      if (isIndexRelation) {
        const indexRelationParam = [];
        indexRelationIdxList.forEach(node => {
          if (node.COMP_OPTION) {
            const { MUAL_ORG_IDX, MUAL_TABCOMP_OIDX } = node.COMP_OPTION;
            if (indexRelationParam.findIndex(find => find.MUAL_TABCOMP_OIDX === MUAL_TABCOMP_OIDX) === -1) {
              indexRelationParam.push({ MUAL_ORG_IDX, MUAL_TABCOMP_OIDX });
            }
          }
        });
        const responseComp = yield call(Axios.post, `/api/manual/v1/IndexRelationComponetHandler/${mualIdx}`, {
          paramList: indexRelationParam,
        });
        if (responseComp) {
          yield put(actions.setViewIndexRelationListByReducr(fromJS(responseComp.list || []), widgetId));
        }
      }
    } else {
      console.debug('tab error');
    }
    const resRelation = yield call(Axios.get, `/api/manual/v1/CSManualRelationHandler/${mualIdx}`);
    if (resRelation) {
      const { relationList } = resRelation;
      yield put(actions.setManualViewRelationListByReducr(fromJS(relationList), widgetId));
    }
  } else {
    console.debug('tab error');
  }
}

function* setManualBookmark(action) {
  const { flag, widgetId } = action;
  const mualIdx = yield select(selectors.makeSelectedMualIdxByWidgetId(widgetId));
  const historyList = yield select(selectors.makeSelectHistoryListByWidgetId(widgetId));
  const selectedIdx = historyList.findIndex(find => find.get('MUAL_IDX') === mualIdx || find.get('MUAL_ORG_IDX') === mualIdx);
  const MUAL_ORG_IDX = historyList.getIn([selectedIdx, 'MUAL_ORG_IDX']);
  if (MUAL_ORG_IDX && MUAL_ORG_IDX > 0) {
    const profile = yield select(makeSelectProfile());
    const userId = profile && profile.USER_ID ? profile.USER_ID : 0;
    const param = {
      MUAL_ORG_LIST: [{ MUAL_ORG_IDX }],
      USER_ID: userId,
      SORTINFO: '',
      ISBOOKMARK: flag,
    };
    yield call(Axios.post, '/api/manual/v1/CSManualViewHistoryHandler', { param });
    const bookmarkList = yield select(selectors.makeSelectBookmarkListByWidgetId(widgetId));
    const bookmarkIdx = bookmarkList.findIndex(find => find.get('MUAL_IDX') === mualIdx || find.get('MUAL_ORG_IDX') === mualIdx);
    yield put(actions.setManualViewHistoryByReducr(historyList.setIn([selectedIdx, 'ISBOOKMARK'], flag), widgetId));
    if (flag === 'N') yield put(actions.setManualBookmarkByReducr(bookmarkList.delete(bookmarkIdx), widgetId));
    else yield put(actions.setManualBookmarkByReducr(bookmarkList.unshift(historyList.get(selectedIdx)), widgetId));
  }
}

function* addManualHistory(action) {
  const { widgetId, mualIdx, mualOrgIdx } = action;
  if (mualOrgIdx && mualOrgIdx > 0) {
    const profile = yield select(makeSelectProfile());
    const userId = profile && profile.USER_ID ? profile.USER_ID : 0;
    const param = {
      MUAL_ORG_LIST: [{ MUAL_ORG_IDX: mualOrgIdx }],
      USER_ID: userId,
      SORTINFO: '',
    };
    yield call(Axios.post, '/api/manual/v1/CSManualViewHistoryHandler', { param });
    yield put(actions.setSelectedMualIdxByReducr(mualIdx, widgetId));
  }
}

export default function* watcher() {
  yield takeLatest(constantTypes.GET_MANUAL_VIEW_SAGA, getManualView);
  yield takeLatest(constantTypes.SET_MANUAL_BOOKMARK_SAGA, setManualBookmark);
  yield takeLatest(constantTypes.ADD_HISTORY_HISTORY_SAGA, addManualHistory);
}
