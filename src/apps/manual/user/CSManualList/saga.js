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
    yield put(actions.resetCheckManualByReducr(widgetId));
  }
}

function* getCompareView(action) {
  const { widgetId } = action;
  const checkedMualList = yield select(selectors.makeCheckedManualListByWidgetId(widgetId));
  if (checkedMualList && checkedMualList.size > 0) {
    const response = yield call(Axios.post, '/api/manual/v1/CSManualCompareViewHandler', { checkedMualList: checkedMualList.toJS() });
    if (response && response.compareList.length > 0) {
      let { compareList, templetData } = response;
      compareList = compareList.map(node => ({
        ...node,
        COMPARE_DATA: node.COMPARE_DATA && node.COMPARE_DATA.length > 0 ? JSON.parse(node.COMPARE_DATA) : [],
      }));
      templetData = {
        ...templetData,
        TEMPLET_CONTENT: templetData.TEMPLET_CONTENT && templetData.TEMPLET_CONTENT.length > 0 ? JSON.parse(templetData.TEMPLET_CONTENT) : [],
      };

      let viewData = templetData.TEMPLET_CONTENT;
      const columnData = [{ dataIndex: 'ITEM_NAME', title: '상품명', fixed: 'left', width: 100 }];

      compareList.forEach(node => {
        const columnKey = `compareCol_${node.MUAL_IDX}`;
        columnData.push({ dataIndex: columnKey, title: node.MUAL_NAME, width: 380 });
        node.COMPARE_DATA.forEach(row => {
          const dataIdx = viewData.findIndex(find => find.ITEM_IDX === row.ITEM_IDX);
          if (dataIdx === -1) {
            viewData = viewData.push({ ITEM_IDX: row.ITEM_IDX, ITEM_NAME: row.ITEM_NAME, [columnKey]: row.ITEM_DATA });
          } else {
            viewData[dataIdx][columnKey] = row.ITEM_DATA;
          }
        });
      });
      yield put(actions.setCompareViewByReducr(widgetId, viewData, columnData));
      yield put(actions.setIsCompareViewByReducr(widgetId, true));
    }
  }
}

export default function* initCSManualListSaga() {
  const arg = arguments[0];
  yield takeLatest(constantTypes.GET_TOTALMANUALIST, getTotalManualList);
  yield takeLatest(`${constantTypes.SET_SELECTED_MUAL_ORG_IDX_SAGA}_${arg.item.id}`, setSelectedMualOrgIdx);
  yield takeLatest(`${constantTypes.SET_MULTI_VIEW_SAGA}_${arg.item.id}`, setMultiView);
  yield takeLatest(constantTypes.GET_COMPARE_VIEW_SAGA, getCompareView);
}
