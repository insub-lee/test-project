import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import { push } from 'react-router-redux';
import { checkMode } from 'utils/commonUtils'
import * as constants from './constants';
import * as loadingConstants from 'containers/common/Loading/constants';

export function* loadingBookedRooms(payload) {
  yield put({
    type: loadingConstants.LOADING_ON,
  });

  const data = yield call(Axios.post, '/apps/api/v1/bookroom/loadingBookedRoom', payload.payload );

  if(data){
    yield [put({
      type: constants.LOADING_BOOKED_ROOMS,
      allBookedRoomList: data.allBookedRoomList,
      avbMeetRoomList: data.avbMeetRoomList,
      expMeetRoomList: data.expMeetRoomList,
      wholeMeetRoomList: data.wholeMeetRoomList,
    }),
    put({
      type: loadingConstants.LOADING_OFF,
    })];
  }
}

export function* loadingParam() {
  const data = yield call(Axios.post, '/apps/api/v1/bookroom/loadingParam', {searchParam:'comp'});
  yield put({
    type: constants.LOADING_PARAM,
    compList: data.compList,
    bldgList: data.bldgList,
    floorList:data.floorList,
  });
}

export function* loadingMeetRoom() {
  const data = yield call(Axios.post, '/apps/api/v1/bookroom/loadingParam', {searchParam:'meetRoom'});

  yield put({
    type: constants.LOADING_MEET_ROOM,
    detailMeetRoomList:data.detailMeetRoomList,

  });
}

export function* loadingFavoriteLocList(payload) {
  const { history } = payload.payload;

  const pathArray = history.location.pathname.split('/');
  const singlePathname = '/sm/bookroom/FavoriteLocation';
  const appsPathname = '/apps/bookroom/FavoriteLocation';

  const data = yield call(Axios.get, '/apps/api/v1/bookroom/loadingFavoriteLocList');
  const chk= data.favLocList.length === 0 ? 'N' : 'Y';

    if(data.favLocList.length > 0) {
      yield put({
        type: constants.LOADING_FAVORITE_LOC_LIST,
        favLocList:data.favLocList,
        favCheck: chk,
      });
    }

    if(data.favLocList.length === 0){
      // yield put (checkMode(history, pathArray, singlePathname, appsPathname));
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

export default function* bookedRoomSaga() {
  yield takeLatest(constants.LOADING_BOOKED_ROOMS_SAGA, loadingBookedRooms);
  yield takeLatest(constants.LOADING_PARAM_SAGA, loadingParam);
  yield takeLatest(constants.LOADING_MEET_ROOM_SAGA, loadingMeetRoom);
  yield takeLatest(constants.LOADING_FAVORITE_LOC_LIST_SAGA, loadingFavoriteLocList);
}
