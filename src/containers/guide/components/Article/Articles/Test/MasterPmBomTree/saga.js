import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import { fromJS } from 'immutable';
import * as treeFunc from 'containers/common/functions/treeFunc';
import * as constants from './constants';

export function* getMasterPmBom(payload) {
  const { param } = payload;

  const resJson = yield call(Axios.post, '/api/gipms/v1/guide/masterPmBom', param);
  let pmBomTreeList = resJson.list.ET_STPOX;
  pmBomTreeList = treeFunc.setFlatDataKey(pmBomTreeList, 'key');
  pmBomTreeList = fromJS(treeFunc.getTreeFromFlatTreeData(pmBomTreeList, pmBomTreeList[0].PRNT_ID));

  yield put({
    type: constants.SET_MASTER_PMBOM,
    pmBomTreeList,
  });
}

export default function* pmSheetSaga() {
  yield takeLatest(constants.GET_MASTER_PMBOM, getMasterPmBom);
}
