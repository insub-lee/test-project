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

export function* getSysFileList(payload) {
  const { SITE_ID, KEYWORD } = payload;
  const response = yield call(Axios.get, `/api/common/v1/filemanage/getSysFileList?${new URLSearchParams({ SITE_ID, KEYWORD }).toString()}`, {});
  const { list } = response;

  yield put({
    type: constants.SET_SYSFILE_LIST,
    sysFileList: list ? fromJS(list) : fromJS([]),
  });
}

export function* getUserFolderTree() {
  const response = yield call(Axios.get, '/api/common/v1/filemanage/getUserFolderTree', {});
  const { result } = response;
  const treeData = JSON.parse(`[${result.join('')}]`);

  yield put({
    type: constants.SET_USER_FOLDER_TREE,
    userFolderTreeData: treeData ? fromJS(treeData) : fromJS([]),
  });
}

export function* getUserFileList(payload) {
  const { KEYWORD, FOLDER_ID } = payload;
  const response = yield call(Axios.get, `/api/common/v1/filemanage/getUserFileList?${new URLSearchParams({ KEYWORD, FOLDER_ID }).toString()}`, {});
  const { list, code } = response;

  if (code === 200) {
    yield put({
      type: constants.SET_USER_FILE_LIST,
      userFileList: list ? fromJS(list) : fromJS([]),
    });
  } else {
    feed.error('Invalid FOLDER ID');
    yield put({
      type: constants.SET_USER_FILE_LIST,
      userFileList: [],
    });
  }
}

export function* getDonwloadLink(payload) {
  const { FILE_SEQ } = payload;
  const response = yield call(Axios.post, '/api/common/v1/filemanage/getDownloadLink', { FILE_SEQ });
  const { link, code } = response;

  if (code === 200) {
    yield put({
      type: constants.SET_DOWNLOAD_LINK,
      link,
    });
  } else {
    feed.error('Invalid FILE SEQ');
    yield put({
      type: constants.SET_DOWNLOAD_LINK,
      link: '',
    });
  }
}

export function* getShareUserList() {
  const response = yield call(Axios.get, '/api/common/v1/filemanage/getShareUserList', {});
  const { list } = response;

  yield put({
    type: constants.SET_SHARE_USER_LIST,
    shareUserList: list ? fromJS(list) : fromJS([]),
  });
}

export function* getShareFileList(payload) {
  const { KEYWORD, SHARE_USER_ID } = payload;
  const response = yield call(Axios.get, `/api/common/v1/filemanage/getShareFileList?${new URLSearchParams({ KEYWORD, SHARE_USER_ID }).toString()}`, {});
  const { list } = response;

  yield put({
    type: constants.SET_SHARE_USER_LIST,
    shareFileList: list ? fromJS(list) : fromJS([]),
  });
}

// 작업해야함.
export function* insertUserFolder(payload) {
  const response = yield call(Axios.post, '/api/common/v1/filemanage/userFolder ', {});
  const { code } = response;

  if (code === 200) {
    yield put({
      type: constants.GET_USER_FOLDER_TREE,
    });
  } else {
    feed.error('error insertUserFolder');
  }
}

export function* updateUserFolder(payload) {
  const response = yield call(Axios.put, '/api/common/v1/filemanage/userFolder ', {});
  const { code } = response;

  if (code === 200) {
    yield put({
      type: constants.GET_USER_FOLDER_TREE,
    });
  } else {
    feed.error('error updateUserFolder');
  }
}

export function* deleteUserFolder(payload) {
  const response = yield call(Axios.delete, '/api/common/v1/filemanage/userFolder ', {});
  const { code } = response;

  if (code === 200) {
    yield put({
      type: constants.GET_USER_FOLDER_TREE,
    });
  } else {
    feed.error('error deleteUserFolder');
  }
}

export function* uploadFile(payload) {
  const { FOLDER_ID } = payload;
  const response = yield call(Axios.get, '/api/common/v1/filemanage/uploadFile', {});
  const { code } = response;

  if (code === 200) {
    yield put({
      type: constants.GET_USER_FILE_LIST,
      KEYWORD: '',
      FOLDER_ID,
    });
  } else {
    feed.error('error uploadFile');
  }
}

export function* deleteFile(payload) {
  const { FOLDER_ID, FILE_SEQ } = payload;
  const response = yield call(Axios.get, '/api/common/v1/filemanage/deleteFile', {});
  const { code } = response;

  if (code === 200) {
    yield put({
      type: constants.GET_USER_FILE_LIST,
      KEYWORD: '',
      FOLDER_ID,
    });
  } else {
    feed.error('error uploadFile');
  }
}

export function* getFileAuth(payload) {
  const { FILE_SEQ } = payload;
  const response = yield call(Axios.get, `/api/common/v1/filemanage/userFileAuth?${new URLSearchParams({ FILE_SEQ }).toString()}`, {});
  const { code } = response;

  if (code === 200) {
    yield put({
      type: constants.SET_FILE_AUTH,
    });
  } else {
    feed.error('error getFileAuth');
  }
}

export function* updateFileAuth(payload) {
  const { FILE_SEQ } = payload;
  const response = yield call(Axios.post, '/api/common/v1/filemanage/userFileAuth', {});
  const { code } = response;

  if (code === 200) {
    yield put({
      type: constants.GET_FILE_AUTH,
      FILE_SEQ,
    });
  } else {
    feed.error('error updateFileAuth');
  }
}

export default function* rootSaga() {
  yield takeLatest(constants.GET_SITE_LIST, getSiteList);
  yield takeLatest(constants.GET_SYSFILE_LIST, getSysFileList);
  yield takeLatest(constants.GET_USER_FOLDER_TREE, getUserFolderTree);
  yield takeLatest(constants.GET_USER_FILE_LIST, getUserFileList);
  yield takeLatest(constants.GET_DOWNLOAD_LINK, getDonwloadLink);
  yield takeLatest(constants.GET_SHARE_USER_LIST, getShareUserList);
  yield takeLatest(constants.GET_SHARE_FILE_LIST, getShareFileList);
  yield takeLatest(constants.INSERT_USER_FOLDER, insertUserFolder);
  yield takeLatest(constants.UPDATE_USER_FOLDER, updateUserFolder);
  yield takeLatest(constants.DELETE_USER_FOLDER, deleteUserFolder);
  yield takeLatest(constants.UPLOAD_FILE, uploadFile);
  yield takeLatest(constants.DELETE_FILE, deleteFile);
  yield takeLatest(constants.GET_FILE_AUTH, getFileAuth);
  yield takeLatest(constants.UPDATE_FILE_AUTH, updateFileAuth);
}
