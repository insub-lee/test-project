import * as actionType from './constants';

export const getSiteList = () => ({
  type: actionType.GET_SITE_LIST,
});

export const getAdminMain = CALLBACK => ({
  type: actionType.GET_ADMIN_MAIN,
  CALLBACK,
});

export const getSysFileList = (SITE_ID, KEYWORD, CURRENT, PAGE_SIZE, CALLBACK) => ({
  type: actionType.GET_SYSFILE_LIST,
  SITE_ID,
  KEYWORD,
  CURRENT,
  PAGE_SIZE,
  CALLBACK,
});

export const getUserFileList = (KEYWORD, CURRENT, PAGE_SIZE, CALLBACK) => ({
  type: actionType.GET_USER_FILE_LIST,
  KEYWORD,
  CURRENT,
  PAGE_SIZE,
  CALLBACK,
});

export const getModalFileList = (USER_ID, TYPE, KEYWORD, CURRENT, PAGE_SIZE, CALLBACK) => ({
  type: actionType.GET_MODAL_FILE_LIST,
  USER_ID,
  TYPE,
  KEYWORD,
  CURRENT,
  PAGE_SIZE,
  CALLBACK,
});

export const getUserList = (KEYWORD, CURRENT, PAGE_SIZE, CALLBACK) => ({
  type: actionType.GET_USER_LIST,
  KEYWORD,
  CURRENT,
  PAGE_SIZE,
  CALLBACK,
});

export const updateUser = (USER_ID, STORAGE_SIZE, UPLOAD_LIMIT_SIZE, KEYWORD, CURRENT, PAGE_SIZE, CALLBACK) => ({
  type: actionType.UPDATE_USER,
  USER_ID,
  STORAGE_SIZE,
  UPLOAD_LIMIT_SIZE,
  KEYWORD,
  CURRENT,
  PAGE_SIZE,
  CALLBACK,
});

export const deleteFileShareLink = (FILE_SEQ, SHARE_ID, USER_ID, CALLBACK) => ({
  type: actionType.DELETE_FILESHARE_LINK,
  FILE_SEQ,
  SHARE_ID,
  USER_ID,
  CALLBACK,
});

export const getLinkList = (FILE_SEQ, KEYWORD, CALLBACK) => ({
  type: actionType.GET_LINK_LIST,
  FILE_SEQ,
  KEYWORD,
  CALLBACK,
});

export const deleteFile = (FILE_SEQ, USER_ID, CALLBACK) => ({
  type: actionType.DELETE_FILE,
  FILE_SEQ,
  USER_ID,
  CALLBACK,
});
