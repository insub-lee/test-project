import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';
import * as feed from '../../../components/Feedback/functions';

export function* loadingParam() {
  // const { param } = payload;
  const response = yield call(Axios.post, '/api/gipms/v1/common/commonHotPopUserDefineList');
  if (response.list.hotPopDataList) {
    yield put({
      type: constants.LOADING_PARAM,
      hotPopDataList: response.list.hotPopDataList,
    });
  }
}
export function* Init() {
  const list = [
  ];
  yield put({
    type: constants.LOADING_INIT,
    hotPopDataDetailList: list,
  });
}
export function* mergeDefine(payload) {
  const response1 = yield call(Axios.post, '/api/gipms/v1/common/commonHotPopUserDefineSave', payload.value);
  if (response1.errCode > 0) {
    feed.success('저장이 완료 되었습니다.');
  } else {
    feed.error('저장에 실패하였습니다.');
  }
}
export function* deleteDefine(payload) {
  const response = yield call(Axios.post, '/api/gipms/v1/common/commonHotPopUserDefineRemove', payload.value);
  if (response.errCode > 0) {
    feed.success('저장이 완료 되었습니다.');
  } else {
    feed.error('저장에 실패하였습니다.');
  }
}
export function* defineGet(payload) {
  const dataFab = {
    comboType: 'COMBO_PLANT_SECTION',
    MULTI_PARAM_BEBER: payload.param.PARAM_FAB,
  };
  const resFab = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataFab);
  const dataTeam = {
    comboType: 'COMBO_LOCATION',
    SESSION_STAND: payload.param.PARAM_TEAM,
  };
  const resTeam = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataTeam);
  const dataSdpt = {
    comboType: 'COMBO_WORK_CENTER',
    PARAM_BEBER: payload.param.PARAM_FAB,
    PARAM_HFLIST: payload.param.PARAM_SDPT,
  };
  const resSdpt = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataSdpt);
  console.log(222222);
  console.log(resSdpt);
  let sdpt = '';
  for(let i = 0; i < resSdpt.list.comboList.length; i++){
    if(i === 0){;
      sdpt += resSdpt.list.comboList[i].CODE;
    }else{
      sdpt += ', ';
      sdpt += resSdpt.list.comboList[i].CODE;
    }
  }
  const dataFl = {
    comboType: 'COMBO_FUNCTIONAL_LOCATION', 
    PARAM_BEBER: payload.param.PARAM_FAB,
    PARAM_STAND: payload.param.PARAM_TEAM,
  };
  const resFl = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataFl);
  let fl = '';
  for(let i = 0; i < resFl.list.comboList.length; i++){
    if(i === 0){;
      fl += resFl.list.comboList[i].CODE;
    }else{
      fl += ', ';
      fl += resFl.list.comboList[i].CODE;
    }
  }
  const dataModel = {
    comboType: 'COMBO_OBJECT_TYPE_MULTI',
    PARAM_ARBPL: payload.param.PARAM_SDPT,
  };
  const resModel = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataModel);
  let model = '';
  for(let i = 0; i < resModel.list.comboList.length; i++){
    if(i === 0){;
      model += resModel.list.comboList[i].CODE;
    }else{
      model += ', ';
      model += resModel.list.comboList[i].CODE;
    }
  }
  const list = [
    { no: '1', tab: '-', item: 'FAB', key: resFab.list.comboList[0].NAME, value: payload.param.PARAM_FAB },
    { no: '2', tab: '-', item: 'Team', key: resTeam.list.comboList[0].NAME, value: payload.param.PARAM_TEAM },
    { no: '3', tab: '-', item: 'SDPT', key: resSdpt.list.comboList.length + ' selected', value: sdpt },
    { no: '4', tab: '-', item: 'F/L', key: resFl.list.comboList.length + ' selected', value: fl },
    { no: '5', tab: '-', item: 'Model', key: resModel.list.comboList.length + ' selected', value: model },
    { no: '6', tab: '-', item: 'EQ ID', key: payload.param.PARAM_EQID, value: payload.param.PARAM_EQID },
  ];
  yield put({
    type: constants.LOADING_DEFINE_GET,
    hotPopDataDetailList: list,
  });
}
export function* defineDetailGet(payload) {
  const response = yield call(Axios.post, '/api/gipms/v1/common/commonHotPopUserDefineDetail', payload.param);
  const dataFab = {
    comboType: 'COMBO_PLANT_SECTION',
    MULTI_PARAM_BEBER: response.list.hotPopDataDetailList[0].ITEM_VALUE,
  };
  const resFab = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataFab);
  const dataTeam = {
    comboType: 'COMBO_LOCATION',
    MULTI_PARAM_BEBER: response.list.hotPopDataDetailList[0].ITEM_VALUE,
    SESSION_STAND: payload.param.PARAM_TEAM,
  };
  const resTeam = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataTeam);
  const dataSdpt = {
    comboType: 'COMBO_WORK_CENTER',
    PARAM_BEBER: response.list.hotPopDataDetailList[0].ITEM_VALUE,
    PARAM_HFLIST: response.list.hotPopDataDetailList[2].ITEM_VALUE,
  };
  const resSdpt = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataSdpt);
  const dataFl = {
    comboType: 'COMBO_FUNCTIONAL_LOCATION',
    PARAM_BEBER: response.list.hotPopDataDetailList[0].ITEM_VALUE,
    PARAM_STAND: payload.param.PARAM_TEAM,
  };
  const resFl = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataFl);
  let fl = '';
  for(let i = 0; i < resFl.list.comboList.length; i++){
    if(i === 0){;
      fl += resFl.list.comboList[i].CODE;
    }else{
      fl += ', ';
      fl += resFl.list.comboList[i].CODE;
    }
  }
  const dataModel = {
    comboType: 'COMBO_OBJECT_TYPE_MULTI',
    PARAM_ARBPL: response.list.hotPopDataDetailList[2].ITEM_VALUE,
  };
  const resModel = yield call(Axios.post, '/api/gipms/v1/common/commonCombo', dataModel);
  let model = '';
  for(let i = 0; i < resModel.list.comboList.length; i++){
    if(i === 0){;
      model += resModel.list.comboList[i].CODE;
    }else{
      model += ', ';
      model += resModel.list.comboList[i].CODE;
    }
  }
  const list = [];
  if(response.list.hotPopDataDetailList.length===0){
    list.push(
      { no: '1', tab: '-', item: 'FAB', key:'', value: '' },
      { no: '2', tab: '-', item: 'Team', key:'', value: '' },
      { no: '3', tab: '-', item: 'SDPT', key:'', value: '' },
      { no: '4', tab: '-', item: 'F/L', key:'', value: '' },
      { no: '5', tab: '-', item: 'Model', key:'', value: '' },
      { no: '6', tab: '-', item: 'EQ ID', key:'', value: '' },
    ) 
  } else {
    list.push(  
      { no: '1', tab: '-', item: 'FAB', key: resFab.list.comboList[0].NAME, value:  response.list.hotPopDataDetailList[0].ITEM_VALUE === undefined ? '' : response.list.hotPopDataDetailList[0].ITEM_VALUE },
      { no: '2', tab: '-', item: 'Team', key: resTeam.list.comboList[0].NAME, value: response.list.hotPopDataDetailList[1].ITEM_VALUE === undefined ? '' : response.list.hotPopDataDetailList[1].ITEM_VALUE },
      { no: '3', tab: '-', item: 'SDPT', key: resSdpt.list.comboList.length + ' selected', value: response.list.hotPopDataDetailList[2].ITEM_VALUE === undefined ? '' : response.list.hotPopDataDetailList[2].ITEM_VALUE },
      { no: '4', tab: '-', item: 'F/L', key: resFl.list.comboList.length + ' selected', value: fl },
      { no: '5', tab: '-', item: 'Model', key: resModel.list.comboList.length + ' selected', value: model},
      { no: '6', tab: '-', item: 'EQ ID', key: response.list.hotPopDataDetailList[5].ITEM_VALUE === undefined ? '' : response.list.hotPopDataDetailList[5].ITEM_VALUE, value: response.list.hotPopDataDetailList[5].ITEM_VALUE === undefined ? '' : response.list.hotPopDataDetailList[5].ITEM_VALUE },
    )
  }
  yield put({
    type: constants.LOADING_DEFINE_DETAIL_GET,
    hotPopDataDetailList: list,
  });
}
export function* loadingTidnParam(payload) {
  const data = yield call(Axios.post, '/api/gipms/v1/informNote/loadingTidnParam', payload.param);
  const tidnData = data.list.tidnList;
  for (let i = 0; i < tidnData.length; i += 1) {
    tidnData[i].key = i.toString();
    tidnData[i].title = tidnData[i].CODE;
    tidnData[i].description = '';
    tidnData[i].chosen = '';
  }
  yield put({
    type: constants.LOADING_TIDNPARAM,
    tidnList: tidnData,
  });
}
export default function* hotPopSaga() {
  yield takeLatest(constants.LOADING_PARAM_SAGA, loadingParam);
  yield takeLatest(constants.LOADING_INIT_SAGA, Init);
  yield takeLatest(constants.LOADING_MERGE_DEFINE_SAGA, mergeDefine);
  yield takeLatest(constants.LOADING_DELETE_DEFINE_SAGA, deleteDefine);
  yield takeLatest(constants.LOADING_DEFINE_GET_SAGA, defineGet);
  yield takeLatest(constants.LOADING_DEFINE_DETAIL_GET_SAGA, defineDetailGet);
  yield takeLatest(constants.LOADING_TIDNPARAM_SAGA, loadingTidnParam);
}

