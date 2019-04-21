import React from 'react';
import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as feed from 'components/Feedback/functions';
import message from 'components/Feedback/message';
import * as treeFunc from 'containers/common/functions/treeFunc';
import MessageContent from 'components/Feedback/message.style2';
// import messages from '../messages';
import * as constants from './constants';
import * as loadingConstants from 'containers/common/Loading/constants';


export function* loadingGridParam(payload) {
  // const data1 = {
  //   param: payload.value,
  // };
  const response1 = yield call(Axios.post, '/api/gipms/v1/pmmodel/pmSheetSpListPopup', payload.value);
  if (response1.list.dataList) {
    yield put({
      type: constants.LOADING_GRID_PARAM,
      MaterialDataList: fromJS(response1.list.dataList),
      ACTIVE: response1.ACTIVE,
    });
  }
}

export function* loadingSaveParam(payload) {
  const data1 = {
    param: payload.value,
  };
  const response1 = yield call(Axios.post, '/api/gipms/v1/pmmodel/PmSheetSaveYn', data1);
  if (response1.dataSet) {
    yield put({
      type: constants.LOADING_SAVE_PARAM,
      save: response1.dataSet[0].REVISION_MAX_YN,
    });
  }
}

export function* loadingModalParam(payload) {
  /* const data1 = {
  param:
  };
 */
  const response1 = yield call(Axios.post, '/api/gipms/v1/pmmodel/EqIdLayerList', payload.value);

  if (response1.list.eqIdList) {
    yield put({
      type: loadingConstants.LOADING_ON,
    });
    const TIDNR = [];
    for (let i = 0; i < response1.list.eqIdList.length; i += 1) {
      TIDNR.push(response1.list.eqIdList[i]);
    }
    yield put({
      type: constants.LOADING_MODAL_PARAM,
      ModalDataList: TIDNR,
    });
    yield put({
      type: loadingConstants.LOADING_OFF,
    });
  }
 
}

export function* loadingSavePmsheetSpParam(payload) {
  // const data1 = {
  //   param: payload.value,
  // };
  const { returnParam } = payload;
  const response1 = yield call(Axios.post, '/api/gipms/v1/pmmodel/SavePmsheetSp', payload.value);
  const { resultCode } = response1;

 
  if (resultCode === '0') {
    message.success(
      <MessageContent>
        저장되었습니다
      </MessageContent>,
      3,
    );

  } else {
    feed.error('저장에 실패하였습니다');
  }
  if (response1.list) {
    yield put({
      type: constants.LOADING_GRID_PARAM_SAGA,
      value: returnParam,
    });
  }
}


export function* LoadingBomList(payload) {
  const response1 = yield call(Axios.post, '/api/gipms/v1/pmmodel/BomTreeParam', payload.value);
  let resultObj = response1.equipmentInfo;
  	// title
		let tidnr = '-';
		let maker = '-';
		let model = '-';
    let serialNo = '-';
    if( resultObj != '' ) {
			if( resultObj.TIDNR != undefined && resultObj.TIDNR != '' ) {
				tidnr = resultObj.TIDNR;
			}
			if( resultObj.HERST != undefined && resultObj.HERST != '' ) {
				maker = resultObj.HERST;
			}
			if( resultObj.EQART_EARTX != undefined && resultObj.EQART_EARTX != '' ) {
				model = resultObj.EQART_EARTX;
			}
			if( resultObj.SERGE != undefined && resultObj.SERGE != '' ) {
				serialNo = resultObj.SERGE;
			}
    }
     let titleStr = tidnr +''+maker+':'+model+ ':'+serialNo;
    // let titleStr = tidnr + titlespan1 + maker + ' : ' + model + ' : ' + serialNo + titlespan1;
  if (response1 && response1.list.ET_STPOX.length !== 0) {
    // yield put({
    //   type: loadingConstants.LOADING_ON,
    // });
    let pmBomTreeList = response1.list.ET_STPOX;
    pmBomTreeList = treeFunc.setFlatDataKey(pmBomTreeList, 'key');
      pmBomTreeList = fromJS(treeFunc.getTreeFromFlatTreeData(pmBomTreeList, pmBomTreeList[0].PRNT_ID));
      yield put({
        type: constants.LOADING_BOM_PARAM,
        pmBomTreeList,
        titleStr,
      });
      // yield put({
      //   type: loadingConstants.LOADING_OFF,
      // });
  } else {
    // yield put({
    //   type: loadingConstants.LOADING_ON,
    // });
    let pmBomTreeList = response1.list.ET_STPOX;
    pmBomTreeList = treeFunc.setFlatDataKey(pmBomTreeList, 'key');
      pmBomTreeList = fromJS(treeFunc.getTreeFromFlatTreeData([], ''));
      yield put({
        type: constants.LOADING_BOM_PARAM,
        pmBomTreeList,
        titleStr,
      });
      // yield put({
      //   type: loadingConstants.LOADING_OFF,
      // });
  }
  // let pmBomTreeList = response1.list.ET_STPOX;
  // pmBomTreeList = treeFunc.setFlatDataKey(pmBomTreeList, 'key');
  //   pmBomTreeList = fromJS(treeFunc.getTreeFromFlatTreeData(pmBomTreeList, pmBomTreeList[0].PRNT_ID));
  //   yield put({
  //     type: constants.LOADING_BOM_PARAM,
  //     pmBomTreeList,
  //   });

  // if (response1.dataSet) {
  //   yield put({
  //     type: constants.LOADING_BOM_PARAM_SAGA,
  //   });
  // }
}

export default function* pmSheetSaga() {
  yield takeLatest(constants.LOADING_GRID_PARAM_SAGA, loadingGridParam);
  yield takeLatest(constants.LOADING_SAVE_PARAM_SAGA, loadingSaveParam);
  yield takeLatest(constants.LOADING_MODAL_PARAM_SAGA, loadingModalParam);
  yield takeLatest(constants.LOADING_SAVE_PMSHEETSPLIST_PARAM_SAGA, loadingSavePmsheetSpParam);
  yield takeLatest(constants.LOADING_BOM_PARAM_SAGA, LoadingBomList);
}
