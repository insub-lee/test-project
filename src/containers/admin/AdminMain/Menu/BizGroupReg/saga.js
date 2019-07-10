import { takeLatest, select, call, put } from 'redux-saga/effects';
// import { fromJS } from 'immutable';
import _ from 'lodash';
import { Axios } from 'utils/AxiosFunc';
import { intlObj, lang } from 'utils/commonUtils';
import { fromJS } from 'immutable';
import message from 'components/Feedback/message';
import * as treeFunc from 'containers/common/functions/treeFunc';
import * as constantsLoading from 'containers/common/Loading/constants';

import messages from '../messages';
import * as constants from './constants';
import * as constantsBizManage from '../constants';

export function* getBizGroupInfo(payload) {
  const { BIZGRP_ID } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/info', { BIZGRP_ID });
  const { code, result } = response;

  if (code === 200) {
    yield put({
      type: constants.SET_DATA,
      data: fromJS(result),
    });

    yield put({
      type: constantsBizManage.SET_SELECTED_INDEX,
      selectedIndex: result.BIZGRP_ID,
    });
  }

  yield put({
    type: constantsLoading.LOADING_OFF,
  });
}

export function* updateBizGroup(payload) {
  const { data, history } = payload;

  const bizmanage = yield select(state => state.get('bizmanage'));
  const { node } = bizmanage.get('tempRowInfo');

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/updateBizgroup', { data });
  const { code } = response;

  if (code === 200) {
    if (node) {
      const newNode = {
        ...node,
        ...data,
        title: lang.get('NAME', data),
        CHG_YN: 'Y',
      }; // 병합
      const rowInfo = { node: newNode, path: _.drop(node.path, 1) };
      const newCategoryData = treeFunc.editNodeByKey(rowInfo, bizmanage.get('categoryData').toJS());

      yield put({
        type: constantsBizManage.SET_CATEGORY_DATA,
        categoryData: fromJS(newCategoryData),
        // categoryFlatData: treeFunc.generateListBizManage(fromJS(newCategoryData)),
      });
    }

    message.success(`${intlObj.get(messages.successSave)}`);

    if (data.MENU_EXIST_YN === 'Y') {
      history.push(`/admin/adminmain/menu/bizMenuReg/info/${data.BIZGRP_ID}`);
    }
  }
}

export default function* rootSaga() {
  yield takeLatest(constants.UPDATE_BIZGROUP, updateBizGroup);
  yield takeLatest(constants.GET_BIZGROUP_INFO, getBizGroupInfo);
}
