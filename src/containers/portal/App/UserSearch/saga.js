import { select, call, put, takeLatest } from 'redux-saga/effects';
import { sortBy } from 'utils/commonUtils';
import * as actionType from './constants';
import * as orgActionType from '../UserProfileOrg/constants';
import { Axios } from '../../../../utils/AxiosFunc';
import * as memberAction from '../../../../apps/members/widgets/constants';

// User Search 함수
export function* getUserByValue(action) {
  const data = {
    PARAM: {
      KEYWORD: action.payload.value,
    },
  };

  const response = yield call(Axios.post, '/api/common/v1/account/userSearch', data);

  const results = JSON.parse(response.list);
  console.log('response.list.leng', results);
  if (results.length > 0) {
    yield put({ type: actionType.USER_SUCCESS_GET_RESULT, payload: results });
  } else {
    yield put({ type: actionType.USER_DISABLE_SEARCH_RESULT_VIEW });
  }
}

// User History Select 함수
export function* getUserHistoryByValue() {
  const response = yield call(Axios.post, '/api/common/v1/account/userSearchHistory/');
  const historyList = response.list;

  historyList.sort(sortBy('NAME_KOR', false, function (a) { return a.toUpperCase() })); //eslint-disable-line

  if (historyList.length > 0) {
    yield put({ type: actionType.USER_HISTORY_SUCCESS_GET_RESULT, payload: historyList });
  } else {
    yield put({ type: actionType.USER_HISTORY_FAIL_GET_RESULT });
  }
}

// History 개별 삭제 함수
export function* deleteUserHistoryByValue(action) {
  const srchedUserIdList = yield select(state => state.get('userSearch'));
  const srchedUserIdList2 = srchedUserIdList.search.searchedUserHistory;
  const response = yield call(Axios.post, '/api/common/v1/account/DeleteUserSrchHistory/', { SRCH_USER_ID: action.payload.history.SRCH_USER_ID });

  const resultValue = response.result;

  if (resultValue === 'success') {
    const delIndexNum = srchedUserIdList2.findIndex(searhApp => searhApp.SRCH_USER_ID === action.payload.history.SRCH_USER_ID); //eslint-disable-line
    const delList = srchedUserIdList2.splice(delIndexNum, 1);
    // feed.success('히스토리가 삭제 되었습니다.');
    yield put({ type: actionType.USER_HISTORY_DELETE_SUCCESS, delList });
    yield put({ type: memberAction.LOADING_MEMBERS_SAGA });
  } else {
    // 추후 처리 예정
  }
}

// History 전체 삭제 함수
export function* deleteAllUserHistoryByValue() {
  const response = yield call(Axios.post, '/api/common/v1/account/DeleteAllUserSrchHistory/');
  const resultValue = response.result;

  if (resultValue === 'success') {
    // feed.success('히스토리가 전체 삭제 되었습니다.');
    yield put({ type: actionType.USER_HISTORY_DELETEALL_SUCCESS });
    yield put({ type: memberAction.LOADING_MEMBERS_SAGA });
  }
}

// History 추가 함수
export function* insertUserHistoryByValue(action) {
  const searChresponse = yield call(Axios.post, '/api/common/v1/account/userSearchHistory/');

  const isList = searChresponse.list.filter(function (item) { //eslint-disable-line
    return item.SRCH_USER_ID === action.payload.user.USER_ID;
  });

  if (isList.length !== 0) {
    // 이미 추가된 히스토리 유저입니다. 알람 정보
    const updateResponse = yield call(Axios.post, '/api/common/v1/account/UpdateUserSrchHistory/', { SRCH_USER_ID: action.payload.user.USER_ID });
    const udpateResultValue = updateResponse.result;
    if (udpateResultValue === 'success') {
      yield put({ type: actionType.USER_HISTORY_UPDATE_SUCCESS });
      yield put({ type: memberAction.LOADING_MEMBERS_SAGA });
    } else {
      yield put({ type: actionType.USER_HISTORY_INSERT_FAIL });
    }
  } else {
    // eslint-diasble-next-line
    const response = yield call(Axios.post, '/api/common/v1/account/InsertUserSrchHistory/', { SRCH_USER_ID: action.payload.user.USER_ID });
    const resultValue = response.result;
    if (resultValue === 'success') {
      yield put({ type: actionType.USER_HISTORY_INSERT_SUCCESS });
      yield put({ type: memberAction.LOADING_MEMBERS_SAGA });
    }
  }
}

export function* getProfileData(action) {
  const ID = action.userId;
  const data = {
    PARAM: {
      USERID: ID,
    },
  };
  const response = yield call(Axios.post, '/api/common/v1/account/appProfileLoad/', data);
  const result = response.profile[0];
  yield put({ type: orgActionType.SET_PROFILE_DATA, result, selectedIndex: result.DEPT_ID });
}

export default function* userSearchSaga() {
  yield takeLatest(actionType.USER_SEARCH_SAGA, getUserByValue);
  yield takeLatest(actionType.USER_SEARCH_HISTORY_SAGA, getUserHistoryByValue);
  yield takeLatest(actionType.USER_HISTORY_DELETE_SAGA, deleteUserHistoryByValue);
  yield takeLatest(actionType.USER_HISTORY_DELETEALL_SAGA, deleteAllUserHistoryByValue);
  yield takeLatest(actionType.USER_HISTORY_INSERT_SAGA, insertUserHistoryByValue);
  yield takeLatest(actionType.USER_PROFILE_DATA_SAGA, getProfileData);
}
