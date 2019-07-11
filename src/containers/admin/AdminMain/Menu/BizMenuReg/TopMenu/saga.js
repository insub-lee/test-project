import { takeLatest, put, call, select } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
// import * as feed from 'components/Feedback/functions';
import { intlObj } from 'utils/commonUtils';
import { fromJS } from 'immutable';
import * as treeFunc from 'containers/common/functions/treeFunc';
import message from 'components/Feedback/message';
import messages from './messages';
import * as constants from './constants';
import * as constantsBizManage from '../../constants';

export function* getBizInfo(payload) {
  const { BIZGRP_ID } = payload;
  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/info', { BIZGRP_ID: Number(BIZGRP_ID) });

  if (response.result !== undefined) {
    yield put({
      type: constants.SET_BIZ_INFO,
      bizInfo: response.result,
    });
  }
}

export function* confirmBizGroup(payload) {
  const { history, BIZGRP_ID } = payload;
  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/confirmBizgroup', { BIZGRP_ID: Number(BIZGRP_ID) });
  const { code, result } = response;
  if (code === 200) {
    // console.log(result);
    message.success(intlObj.get(messages.completeConfirm), 2);

    yield put({
      type: constants.SET_BIZ_INFO,
      bizInfo: result,
    });

    if (result.DEL_YN === 'Y') {
      const bizmanage = yield select(state => state.get('bizmanage'));
      const rowInfo = bizmanage.get('tempRowInfo');

      if (rowInfo) {
        const newCategoryData = treeFunc.deleteNode(rowInfo, bizmanage.get('categoryData').toJS());

        yield put({
          type: constantsBizManage.SET_CATEGORY_DATA,
          categoryData: fromJS(newCategoryData),
        });
      } else {
        yield put({
          type: constantsBizManage.INIT_CATEGORY_DATA,
        });
      }

      // history.push('/store/appMain/bizManage');
      history.push('/admin/adminmain/menu');
    } else {
      yield put({
        type: constantsBizManage.UPDATE_TREENODE,
        key: BIZGRP_ID,
        newNode: { CHG_YN: 'N' },
      });
    }
  }
}

export function* execApps(payload) {
  const { node } = payload;
  const PAGE_ID = node.PAGE_ID; //eslint-disable-line
  const response = yield call(Axios.post, '/api/portal/v1/page/executeApps/', { PAGE_ID });

  const resultValue = JSON.parse(response.list);

  const myObject = yield select(state => state.get('auth').get('UNREAD_CNT'));
  const myObjectVal = Object.values(myObject);
  const notiVal = JSON.parse(`[${myObjectVal}]`);
  if (notiVal !== null) {
    for (let a = 0; a < resultValue.length; a += 1) {
      for (let b = 0; b < notiVal.length; b += 1) {
        if (resultValue[a].APP_ID === notiVal[b].APP_ID) {
          Object.assign(resultValue[a], { UNREAD_CNT: notiVal[b].UNREAD_CNT }); // eslint-disable-line
        }
      }
    }
    yield put({ type: constants.EXEC_APPS_SUCCESS, resultValue, node });
  }
}

export default function* rootSaga() {
  yield takeLatest(constants.GET_BIZ_INFO, getBizInfo);
  yield takeLatest(constants.CONFIRM_BIZGROUP, confirmBizGroup);
  yield takeLatest(constants.EXEC_APPS_SAGA, execApps);
}
