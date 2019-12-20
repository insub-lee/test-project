import React from 'react';
import { put, takeLatest, call, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import { IflowApi } from 'utils/IflowFunc';
import * as treeFunc from 'containers/common/functions/treeFunc';
import { intlObj } from 'utils/commonUtils';
import { Axios } from '../../../../utils/AxiosFunc';
import * as constants from './constants';
import messages from './messages';

export function* getIfBoardCfgGrpList(payload) {
  const uInfo = yield select(state => state.get('auth').get('profile'));
  const param = { empno: uInfo.EMP_NO, keyword: encodeURIComponent(payload.grKeyword) };
  const response = yield call(IflowApi.get, 'groupList', param);

  yield put({ type: constants.SET_IFBOARD_CFG_GRP_LIST, payload: fromJS(response.groups) });
}

export function* getIfBoardCfgCateList(payload) {
  const uInfo = yield select(state => state.get('auth').get('profile'));
  const param = { grseq: payload.grSeq, empno: uInfo.EMP_NO, keyword: encodeURIComponent(payload.ctKeyword) };
  const ctData = yield call(IflowApi.get, 'cateList', param);

  const ctArr = [];
  ctArr.push({
    ctSeq: 1,
    grSeq: 1,
    title: 'root',
    LVL: 0,
    PRNT_ID: -1,
    SORT_SQ: 1,
    // expanded: false,
  });
  ctData.categories.map(item => {
    if (item.ctSeq !== -99) {
      ctArr.push({
        ctSeq: item.ctSeq,
        grSeq: item.grSeq,
        title: item.ctName,
        LVL: item.ctLevel + 1,
        PRNT_ID: item.upCtSeq === -1 ? 1 : item.upCtSeq,
        SORT_SQ: item.ctOrd,
        // expanded: false,
      });
    }
  });

  let categoryData = treeFunc.setFlatDataKey(ctArr, 'ctSeq');
  categoryData = treeFunc.getTreeFromFlatTreeData(categoryData, 1);
  // const categoryFlatData = treeFunc.getFlatMapDataFromTreeData(categoryData);

  yield put({ type: constants.SET_IFBOARD_CFG_CATE_LIST, payload: fromJS(categoryData) });
  yield put({ type: constants.SET_GR_SEQ, payload: payload.grSeq });
}

export function* deleteIfBoardCfg(payload) {
  const { item, widgetId, pageId } = payload;
  const data = {
    PARAM: {
      ITEM: item,
      WIDGETID: widgetId,
      PAGEID: pageId,
    },
  };
  const response = yield call(Axios.post, '/api/portal/v1/page/deleteIfBoardCfg/', data);
  if (response.result === 'success') {
    const resultValue = response.resultValue.ITEM_VALUE;
    message.success(
      <MessageContent>
        {intlObj.get(messages.boardSaveOk)}
        {/* {'게시판 목록이 저장되었습니다.'} */}
      </MessageContent>,
      2,
    );
    yield put({ type: constants.SET_IFBOARD_CFG, item: JSON.parse(resultValue), widgetId: payload.widgetId, pageId: payload.pageId });
  }
}

export function* deleteBizifBoardCfg(payload) {
  const { item, widgetId, pageId } = payload;
  const data = {
    PARAM: {
      ITEM: item,
      WIDGETID: widgetId,
      PAGEID: pageId,
    },
  };
  const response = yield call(Axios.post, '/api/portal/v1/page/deleteBizIfBoardCfg/', data);
  if (response.result === 'success') {
    const resultValue = response.resultValue.ITEM_VALUE;
    message.success(
      <MessageContent>
        {intlObj.get(messages.boardSaveOk)}
        {/* {'게시판 목록이 저장되었습니다.'} */}
      </MessageContent>,
      2,
    );
    yield put({ type: constants.SET_BIZIFBOARD_CFG, item: JSON.parse(resultValue), widgetId: payload.widgetId, pageId: payload.pageId });
  }
}

export default function* ifBoardCfgSaga() {
  yield takeLatest(constants.GET_IFBOARD_CFG_GRP_LIST, getIfBoardCfgGrpList);
  yield takeLatest(constants.GET_IFBOARD_CFG_CATE_LIST, getIfBoardCfgCateList);
  yield takeLatest(constants.DELETE_IFBOARD_CFG, deleteIfBoardCfg);
  yield takeLatest(constants.DELETE_BIZIFBOARD_CFG, deleteBizifBoardCfg);
}
