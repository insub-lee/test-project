import * as actionType from './constants';

export const getSiteList = () => ({
  type: actionType.GET_SITE_LIST,
});
export const getSysFileList = (SITE_ID, KEYWORD) => ({
  type: actionType.GET_SYSFILE_LIST,
  SITE_ID,
  KEYWORD,
});

export const getUserFolderTree = () => ({
  type: actionType.GET_USER_FOLDER_TREE,
});

export const getUserFileList = (KEYWORD, FOLDER_ID) => ({
  type: actionType.GET_USER_FILE_LIST,
  KEYWORD,
  FOLDER_ID,
});

export const getDonwloadLink = FILE_SEQ => ({
  type: actionType.GET_DOWNLOAD_LINK,
  FILE_SEQ,
});

export const getShareUserList = () => ({
  type: actionType.GET_SHARE_USER_LIST,
});

export const getShareFileList = (KEYWORD, SHARE_USER_ID) => ({
  type: actionType.GET_SHARE_FILE_LIST,
  KEYWORD,
  SHARE_USER_ID,
});

// 작업해야함.
export const insertUserFolder = () => ({
  type: actionType.INSERT_USER_FOLDER,
});

export const updateUserFolder = () => ({
  type: actionType.UPDATE_USER_FOLDER,
});

export const deleteUserFolder = () => ({
  type: actionType.DELETE_USER_FOLDER,
});

export const uploadFile = () => ({
  type: actionType.UPLOAD_FILE,
});

export const deleteFile = (FOLDER_ID, FILE_SEQ) => ({
  type: actionType.UPLOAD_FILE,
  FOLDER_ID,
  FILE_SEQ,
});

export const getFileAuth = () => ({
  type: actionType.GET_FILE_AUTH,
});

export const updateFileAuth = () => ({
  type: actionType.UPDATE_FILE_AUTH,
});