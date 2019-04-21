import { takeLatest, put, call, select } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';


export function* loadingParam() { 
  const data = yield call(Axios.post, '/apps/api/v1/bookroom/loadingParam', {searchParam:'comp'});
  
  yield put({
    type: constants.LOADING_PARAM,
    compList: data.compList,
    bldgList: data.bldgList,
    floorList: data.floorList,

  });
}

export function* loadingMeetRoom() { 
  const data = yield call(Axios.post, '/apps/api/v1/bookroom/loadingParam', {searchParam:'meetRoom'});

  yield put({
    type: constants.LOADING_MEET_ROOM,
    detailMeetRoomList: data.detailMeetRoomList,

  });
}




export default function* FavoriteRoomSaga() {
  yield takeLatest(constants.LOADING_PARAM_SAGA, loadingParam);
  yield takeLatest(constants.LOADING_MEET_ROOM_SAGA, loadingMeetRoom);
}
