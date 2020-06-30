import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  siteList: [],
  sysFileList: [],
  userFolderTreeData: [],
  userFileList: [],
  shareUserList: [],
  shareFileList: [],
  authData: {},
  link: '',
});

const fileManageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SITE_LIST:
      return state.set('siteList', action.siteList);
    case actionTypes.SET_SYSFILE_LIST:
      return state.set('sysFileList', action.sysFileList);
    case actionTypes.SET_USER_FOLDER_TREE:
      return state.set('userFolderTreeData', action.userFolderTreeData);
    case actionTypes.SET_USER_FILE_LIST:
      return state.set('userFileList', action.userFileList);
    case actionTypes.SET_DOWNLOAD_LINK:
      return state.set('link', action.link);
    case actionTypes.SET_SHARE_USER_LIST:
      return state.set('shareUserList', action.shareUserList);
    case actionTypes.SET_SHARE_FILE_LIST:
      return state.set('shareFileList', action.shareFileList);
    case actionTypes.SET_FILE_AUTH:
      return state.set('authData', action.authData);
    default:
      return state;
  }
};

export default fileManageReducer;
