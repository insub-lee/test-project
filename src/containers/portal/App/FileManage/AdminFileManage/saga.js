import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as feed from 'components/Feedback/functions';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* getSiteList() {
  const response = yield call(Axios.get, '/api/common/v1/filemanage/getSiteList', {});
  const { list } = response;

  yield put({
    type: constants.SET_SITE_LIST,
    siteList: list ? fromJS(list) : fromJS([]),
  });
}

export function* getAdminMain(payload) {
  const { CALLBACK } = payload;
  const response = yield call(Axios.get, '/api/common/v1/filemanage/getAdminMain', {});
  const { adminMain } = response;
  yield put({
    type: constants.SET_ADMIN_MAIN,
    adminMain: adminMain || {},
  });
  if (typeof CALLBACK === 'function') {
    CALLBACK();
  }
}

export function* getSysFileList(payload) {
  const { SITE_ID, KEYWORD, CURRENT, PAGE_SIZE, CALLBACK } = payload;
  const response = yield call(
    Axios.get,
    `/api/common/v1/filemanage/getSysFileList?${new URLSearchParams({ SITE_ID, KEYWORD, CURRENT, PAGE_SIZE }).toString()}`,
    {},
  );
  const { list, total } = response;
  yield put({
    type: constants.SET_FILE_LIST,
    fileList: list ? fromJS(list) : fromJS([]),
    total: total || 0,
  });
  if (typeof CALLBACK === 'function') {
    CALLBACK();
  }
}

export function* getUserFileList(payload) {
  const { KEYWORD, CURRENT, PAGE_SIZE, CALLBACK } = payload;
  const response = yield call(Axios.get, `/api/common/v1/filemanage/adminUserFile?${new URLSearchParams({ KEYWORD, CURRENT, PAGE_SIZE }).toString()}`, {});
  const { list, code, total } = response;

  if (code === 200) {
    yield put({
      type: constants.SET_FILE_LIST,
      fileList: list ? fromJS(list) : fromJS([]),
      total: total || 0,
    });
  } else {
    feed.error('Invalid Parameter');
    yield put({
      type: constants.SET_FILE_LIST,
      fileList: fromJS([]),
    });
  }
  if (typeof CALLBACK === 'function') {
    CALLBACK();
  }
}

export function* deleteFileShareLink(payload) {
  // TODO 공유 링크리스트가 전부 삭제된후 (n개에서 0개로 ) 상위 리스트 갱신 여부

  const { FILE_SEQ, SHARE_KEY, USER_ID, CALLBACK } = payload;
  const response = yield call(Axios.delete, '/api/common/v1/filemanage/adminFileShareLink', { PARAM_USER_ID: USER_ID, FILE_SEQ, SHARE_KEY });
  const { code } = response;

  if (code === 200) {
    yield put({
      type: constants.GET_LINK_LIST,
      FILE_SEQ,
      KEYWORD: '',
      CALLBACK,
    });
  } else {
    feed.error('Invalid Parameter');
  }
}

export function* getModalFileList(payload) {
  const { USER_ID, TYPE, KEYWORD, CURRENT, PAGE_SIZE, CALLBACK } = payload;
  const ONLY_SHARE = TYPE === 'S' ? 1 : 0;
  const response = yield call(
    Axios.get,
    `/api/common/v1/filemanage/adminUserFile?${new URLSearchParams({ PARAM_USER_ID: USER_ID, ONLY_SHARE, KEYWORD, CURRENT, PAGE_SIZE }).toString()}`,
    {},
  );
  const { list, total } = response;

  yield put({
    type: constants.SET_MODAL_LIST,
    fileList: list ? fromJS(list) : fromJS([]),
    total: total || 0,
  });
  if (typeof CALLBACK === 'function') {
    CALLBACK();
  }
}

export function* getLinkList(payload) {
  const { FILE_SEQ, KEYWORD, CALLBACK } = payload;
  const response = yield call(Axios.get, `/api/common/v1/filemanage/adminFileShareLink?${new URLSearchParams({ FILE_SEQ, KEYWORD }).toString()}`, {});
  const { list } = response;

  yield put({
    type: constants.SET_LINK_LIST,
    linkList: list ? fromJS(list) : fromJS([]),
  });

  if (typeof CALLBACK === 'function') {
    CALLBACK();
  }
}

export function* deleteFile(payload) {
  // { FILE_SEQ || FILE_SEQ_ARRAY }

  const { FILE_SEQ, USER_ID, CALLBACK } = payload;
  const response = yield call(Axios.delete, '/upload/userFile', { FILE_SEQ, PARAM_USER_ID: USER_ID });
  const { code } = response;

  if (code === 200) {
    if (typeof CALLBACK === 'function') {
      CALLBACK();
    }
  } else {
    feed.error('Error');
  }
}

export function* getUserList(payload) {
  const { KEYWORD, CURRENT, PAGE_SIZE, CALLBACK } = payload;
  const response = yield call(Axios.get, `/api/common/v1/filemanage/userFileManage?${new URLSearchParams({ KEYWORD, CURRENT, PAGE_SIZE }).toString()}`, {});
  const { list, total } = response;

  yield put({
    type: constants.SET_FILE_LIST,
    fileList: list ? fromJS(list) : fromJS([]),
    total: total || 0,
  });

  if (typeof CALLBACK === 'function') {
    CALLBACK();
  }
}

export function* updateUser(payload) {
  const { USER_ID, STORAGE_SIZE, UPLOAD_LIMIT_SIZE, KEYWORD, CURRENT, PAGE_SIZE, CALLBACK } = payload;
  const response = yield call(Axios.put, '/api/common/v1/filemanage/userFileManage', { PARAM_USER_ID: USER_ID, STORAGE_SIZE, UPLOAD_LIMIT_SIZE });
  const { code } = response;

  if (code === 200) {
    yield put({
      type: constants.GET_USER_LIST,
      KEYWORD,
      CURRENT,
      PAGE_SIZE,
      CALLBACK,
    });
  } else {
    feed.error('Error');
  }
}
export default function* rootSaga() {
  yield takeLatest(constants.GET_SITE_LIST, getSiteList);
  yield takeLatest(constants.GET_ADMIN_MAIN, getAdminMain);
  yield takeLatest(constants.GET_SYSFILE_LIST, getSysFileList);
  yield takeLatest(constants.GET_USER_FILE_LIST, getUserFileList);
  yield takeLatest(constants.GET_MODAL_FILE_LIST, getModalFileList);
  yield takeLatest(constants.DELETE_FILESHARE_LINK, deleteFileShareLink);
  yield takeLatest(constants.GET_LINK_LIST, getLinkList);
  yield takeLatest(constants.DELETE_FILE, deleteFile);
  yield takeLatest(constants.GET_USER_LIST, getUserList);
  yield takeLatest(constants.UPDATE_USER, updateUser);
}
