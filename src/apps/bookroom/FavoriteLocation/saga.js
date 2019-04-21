import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import { push } from 'react-router-redux';
import { checkMode } from 'utils/commonUtils'
import * as constants from './constants';

export function* loadingParam() {
  const data = yield call(Axios.post, '/apps/api/v1/bookroom/loadingParam', {searchParam:'comp'});
  
  yield put({
    type: constants.LOADING_PARAM,
    compList: data.compList,
    bldgList: data.bldgList,
    floorList:data.floorList,
  });
}

export function* loadingFavLoc() {
  const data = yield call(Axios.get, '/apps/api/v1/bookroom/loadingFavoriteLocList');

  yield put({
    type: constants.LOADING_FAV_LOC,
    favLocList:data.favLocList,
  });
}

export function* saveFavLoc(payload) {
  const { history } = payload.payload;
  const pathArray = history.location.pathname.split('/');
  const singlePathname = '/sm/bookroom/TimeTable';
  const appsPathname = '/apps/bookroom/TimeTable';
  let data = yield call(Axios.post, '/apps/api/v1/bookroom/saveFavoriteLoc', payload.payload);

  const result = data.result;

  if (result === "success") { 
    if (pathArray[1] === 'sm') { 
      yield put(push({ 
        pathname: singlePathname
      })); 
    } else { 
      yield put(push({ 
        pathname: appsPathname
      })); 
    } 
  }
}


export default function* FavoriteRoomSaga() {
  yield takeLatest(constants.LOADING_PARAM_SAGA, loadingParam);
  yield takeLatest(constants.LOADING_FAV_LOC_SAGA, loadingFavLoc);
  yield takeLatest(constants.SAVE_FAV_LOC_SAGA, saveFavLoc);
}
