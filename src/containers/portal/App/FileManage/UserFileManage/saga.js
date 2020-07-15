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
  const { SITE_ID, KEYWORD, CURRENT, PAGE_SIZE, CALLBACK } = payload;
  const response = yield call(
    Axios.get,
    `/api/common/v1/filemanage/getSysFileList?${new URLSearchParams({ SITE_ID, KEYWORD, CURRENT, PAGE_SIZE }).toString()}`,
    {},
  );
  const { list, total } = response;

  /*
  yield put({
    type: constants.SET_SYSFILE_LIST,
    sysFileList: list ? fromJS(list) : fromJS([]),
  });
  */
  yield put({
    type: constants.SET_FILE_LIST,
    fileList: list ? fromJS(list) : fromJS([]),
    total: total || 0,
  });
  if (typeof CALLBACK === 'function') {
    CALLBACK();
  }
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
  const { KEYWORD, FOLDER_ID, CURRENT, PAGE_SIZE, CALLBACK } = payload;
  const response = yield call(
    Axios.get,
    `/api/common/v1/filemanage/userFile?${new URLSearchParams({ KEYWORD, FOLDER_ID, CURRENT, PAGE_SIZE }).toString()}`,
    {},
  );
  const { list, code, total } = response;

  if (code === 200) {
    /*
    yield put({
      type: constants.SET_USER_FILE_LIST,
      userFileList: list ? fromJS(list) : fromJS([]),
    });
    */
    yield put({
      type: constants.SET_FILE_LIST,
      fileList: list ? fromJS(list) : fromJS([]),
      total: total || 0,
    });
  } else {
    feed.error('Invalid FOLDER ID');
    /*
    yield put({
      type: constants.SET_USER_FILE_LIST,
      userFileList: fromJS([]),
    });
    */
    yield put({
      type: constants.SET_FILE_LIST,
      fileList: fromJS([]),
    });
  }
  if (typeof CALLBACK === 'function') {
    CALLBACK();
  }
}

export function* getFileShareLink(payload) {
  const { FILE_ARRAY, EXPIRE_DAY, LIMIT_CNT, CALLBACK } = payload;
  const response = yield call(Axios.post, '/api/common/v1/filemanage/fileShareLink', { FILE_ARRAY, EXPIRE_DAY, LIMIT_CNT });
  const { link, code } = response;

  if (code === 500) {
    feed.error('Invalid Parameter');
  }
  if (typeof CALLBACK === 'function') {
    CALLBACK(link);
  }
}

export function* deleteFileShareLink(payload) {
  // TODO 공유 링크리스트가 전부 삭제된후 (n개에서 0개로 ) 상위 리스트 갱신 여부

  const { FILE_SEQ, SHARE_KEY, CALLBACK } = payload;
  const response = yield call(Axios.delete, '/api/common/v1/filemanage/fileShareLink', { FILE_SEQ, SHARE_KEY });
  const { code } = response;

  if (code === 200) {
    yield put({
      type: constants.GET_LINK_LIST,
      FILE_SEQ,
      KEYWORD: '',
      CALLBACK,
    });

    if (typeof CALLBACK === 'function') {
      CALLBACK();
    }
  } else {
    feed.error('Invalid Parameter');
  }
}

export function* getLinkList(payload) {
  const { FILE_SEQ, KEYWORD, CALLBACK } = payload;
  const response = yield call(Axios.get, `/api/common/v1/filemanage/fileShareLink?${new URLSearchParams({ FILE_SEQ, KEYWORD }).toString()}`, {});
  const { list } = response;

  yield put({
    type: constants.SET_LINK_LIST,
    linkList: list ? fromJS(list) : fromJS([]),
  });

  if (typeof CALLBACK === 'function') {
    CALLBACK();
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
  const { KEYWORD, SHARE_USER_ID, CURRENT, PAGE_SIZE, CALLBACK } = payload;
  const response = yield call(
    Axios.get,
    `/api/common/v1/filemanage/getShareFileList?${new URLSearchParams({ KEYWORD, SHARE_USER_ID, CURRENT, PAGE_SIZE }).toString()}`,
    {},
  );
  const { list, total } = response;
  /*
  yield put({
    type: constants.SET_SHARE_FILE_LIST,
    shareFileList: list ? fromJS(list) : fromJS([]),
  });
  */
  yield put({
    type: constants.SET_FILE_LIST,
    fileList: list ? fromJS(list) : fromJS([]),
    total: total || 0,
  });
  if (typeof CALLBACK === 'function') {
    CALLBACK();
  }
}

export function* insertUserFolder(payload) {
  const { PRNT_FOLDER_ID, FOLDER_NAME, CALLBACK } = payload;
  const response = yield call(Axios.post, '/api/common/v1/filemanage/userFolder ', { PRNT_FOLDER_ID, FOLDER_NAME });
  const { code, FOLDER_ID } = response;

  if (code === 200) {
    yield put({
      type: constants.GET_USER_FOLDER_TREE,
    });
    if (typeof CALLBACK === 'function') {
      CALLBACK();
    }
  } else {
    feed.error('Error');
  }
}

export function* updateUserFolder(payload) {
  const { FOLDER_ID, FOLDER_NAME, CALLBACK } = payload;
  const response = yield call(Axios.put, '/api/common/v1/filemanage/userFolder ', { FOLDER_ID, FOLDER_NAME });
  const { code } = response;

  if (code === 200) {
    yield put({
      type: constants.GET_USER_FOLDER_TREE,
    });
    if (typeof CALLBACK === 'function') {
      CALLBACK();
    }
  } else {
    feed.error('Error');
  }
}

export function* deleteUserFolder(payload) {
  const { FOLDER_ID, PARENT_NODE, CALLBACK } = payload;
  const response = yield call(Axios.delete, '/api/common/v1/filemanage/userFolder ', { FOLDER_ID });
  const { code } = response;

  if (code === 200) {
    yield put({
      type: constants.GET_USER_FOLDER_TREE,
    });
    if (typeof CALLBACK === 'function') {
      CALLBACK(PARENT_NODE);
    }
  } else {
    feed.error('Error');
  }
}

export function* uploadFile(payload) {
  const { FOLDER_ID, FILE_ARRAY, TYPE, CALLBACK } = payload;
  const response = yield call(Axios.post, '/upload/moveUserFileToReal', { PARAM: { DETAIL: FILE_ARRAY } });
  const { code, message, DETAIL } = response;

  if (code === 200) {
    const FILE_SEQ_ARRAY = DETAIL.map(e => Number(e.seq));
    const response2 = yield call(Axios.post, '/api/common/v1/filemanage/userFile', { FOLDER_ID, FILE_SEQ_ARRAY });
    const { code: code2 } = response2;
    if (code2 === 200) {
      if (typeof CALLBACK === 'function') {
        if (TYPE === 'QUICK') {
          const UPLOADED_FILE_ARRAY = DETAIL.map(e => ({ ...e, SEQ: Number(e.seq) }));
          CALLBACK(UPLOADED_FILE_ARRAY);
        } else {
          CALLBACK();
        }
      }
    } else {
      feed.error('Error');
    }
  } else if (code === 413) {
    feed.error('파일 저장 용량이 초과 되었습니다.');
  } else {
    feed.error(message || 'Error');
  }
}

export function* renameFile(payload) {
  const { FILE_SEQ, FILE_NAME, CALLBACK } = payload;
  const response = yield call(Axios.put, '/upload/userFile', { FILE_SEQ, FILE_NAME });
  const { code } = response;

  if (code === 200) {
    if (typeof CALLBACK === 'function') {
      CALLBACK();
    }
  } else {
    feed.error('Error');
  }
}

export function* deleteFile(payload) {
  // { FILE_SEQ || FILE_SEQ_ARRAY }

  const { FILE_SEQ, CALLBACK } = payload;
  const response = yield call(Axios.delete, '/upload/userFile', { FILE_SEQ });
  const { code } = response;

  if (code === 200) {
    if (typeof CALLBACK === 'function') {
      CALLBACK();
    }
  } else {
    feed.error('Error');
  }
}

export function* getUserFileManage() {
  const response = yield call(Axios.get, '/api/common/v1/filemanage/getUserFileManage', {});
  const { userFileManage } = response;

  yield put({
    type: constants.SET_USER_FILE_MANAGE,
    userFileManage: userFileManage || {},
  });
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
    feed.error('Error');
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
    feed.error('Error');
  }
}

export default function* rootSaga() {
  yield takeLatest(constants.GET_SITE_LIST, getSiteList);
  yield takeLatest(constants.GET_SYSFILE_LIST, getSysFileList);
  yield takeLatest(constants.GET_USER_FOLDER_TREE, getUserFolderTree);
  yield takeLatest(constants.GET_USER_FILE_LIST, getUserFileList);
  yield takeLatest(constants.GET_FILESHARE_LINK, getFileShareLink);
  yield takeLatest(constants.DELETE_FILESHARE_LINK, deleteFileShareLink);
  yield takeLatest(constants.GET_LINK_LIST, getLinkList);
  yield takeLatest(constants.GET_SHARE_USER_LIST, getShareUserList);
  yield takeLatest(constants.GET_SHARE_FILE_LIST, getShareFileList);
  yield takeLatest(constants.INSERT_USER_FOLDER, insertUserFolder);
  yield takeLatest(constants.UPDATE_USER_FOLDER, updateUserFolder);
  yield takeLatest(constants.DELETE_USER_FOLDER, deleteUserFolder);
  yield takeLatest(constants.UPLOAD_FILE, uploadFile);
  yield takeLatest(constants.RENAME_FILE, renameFile);
  yield takeLatest(constants.DELETE_FILE, deleteFile);
  yield takeLatest(constants.GET_USER_FILE_MANAGE, getUserFileManage);
  yield takeLatest(constants.GET_FILE_AUTH, getFileAuth);
  yield takeLatest(constants.UPDATE_FILE_AUTH, updateFileAuth);
}
