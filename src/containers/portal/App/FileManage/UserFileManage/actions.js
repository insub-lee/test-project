import * as actionType from './constants';

export const getSiteList = () => ({
  type: actionType.GET_SITE_LIST,
});
export const getSysFileList = (SITE_ID, KEYWORD, CURRENT, PAGE_SIZE, CALLBACK) => ({
  type: actionType.GET_SYSFILE_LIST,
  SITE_ID,
  KEYWORD,
  CURRENT,
  PAGE_SIZE,
  CALLBACK,
});

export const getUserFolderTree = () => ({
  type: actionType.GET_USER_FOLDER_TREE,
});

export const getUserFileList = (FOLDER_ID, KEYWORD, CURRENT, PAGE_SIZE, CALLBACK) => ({
  type: actionType.GET_USER_FILE_LIST,
  FOLDER_ID,
  KEYWORD,
  CURRENT,
  PAGE_SIZE,
  CALLBACK,
});

export const getFileShareLink = (FILE_ARRAY, EXPIRE_DAY, LIMIT_CNT, CALLBACK) => ({
  type: actionType.GET_FILESHARE_LINK,
  FILE_ARRAY,
  EXPIRE_DAY,
  LIMIT_CNT,
  CALLBACK,
});

export const deleteFileShareLink = (FILE_SEQ, SHARE_KEY, CALLBACK) => ({
  type: actionType.DELETE_FILESHARE_LINK,
  FILE_SEQ,
  SHARE_KEY,
  CALLBACK,
});

export const getLinkList = (FILE_SEQ, KEYWORD, CALLBACK) => ({
  type: actionType.GET_LINK_LIST,
  FILE_SEQ,
  KEYWORD,
  CALLBACK,
});

export const getShareUserList = () => ({
  type: actionType.GET_SHARE_USER_LIST,
});

export const getShareFileList = (SHARE_USER_ID, KEYWORD, CURRENT, PAGE_SIZE, CALLBACK) => ({
  type: actionType.GET_SHARE_FILE_LIST,
  SHARE_USER_ID,
  KEYWORD,
  CURRENT,
  PAGE_SIZE,
  CALLBACK,
});

// 작업해야함.
export const insertUserFolder = (PRNT_FOLDER_ID, FOLDER_NAME, CALLBACK) => ({
  type: actionType.INSERT_USER_FOLDER,
  PRNT_FOLDER_ID,
  FOLDER_NAME,
  CALLBACK,
});

export const updateUserFolder = (FOLDER_ID, FOLDER_NAME, CALLBACK) => ({
  type: actionType.UPDATE_USER_FOLDER,
  FOLDER_ID,
  FOLDER_NAME,
  CALLBACK,
});

export const deleteUserFolder = (FOLDER_ID, PARENT_NODE, CALLBACK) => ({
  type: actionType.DELETE_USER_FOLDER,
  FOLDER_ID,
  PARENT_NODE,
  CALLBACK,
});

export const uploadFile = (FOLDER_ID, FILE_ARRAY, TYPE, CALLBACK) => ({
  type: actionType.UPLOAD_FILE,
  FOLDER_ID,
  FILE_ARRAY,
  TYPE,
  CALLBACK,
});

export const renameFile = (FILE_SEQ, FILE_NAME, CALLBACK) => ({
  type: actionType.RENAME_FILE,
  FILE_SEQ,
  FILE_NAME,
  CALLBACK,
});

export const deleteFile = (FILE_SEQ, CALLBACK) => ({
  type: actionType.DELETE_FILE,
  FILE_SEQ,
  CALLBACK,
});

export const getUserFileManage = CALLBACK => ({
  type: actionType.GET_USER_FILE_MANAGE,
  CALLBACK,
});

export const getFileAuth = () => ({
  type: actionType.GET_FILE_AUTH,
});

export const updateFileAuth = () => ({
  type: actionType.UPDATE_FILE_AUTH,
});
