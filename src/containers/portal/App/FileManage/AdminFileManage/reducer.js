import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  siteList: [],
  linkList: [],
  modalFileList: [],
  modalTotal: 0,
  adminMain: {},
  sysFileList: [],
  sysFileListTotal: 0,
  userFileList: [],
  userFileListTotal: 0,
  userList: [],
  userListTotal: 0,
});

const adminFilemanageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SITE_LIST:
      return state.set('siteList', action.siteList);
    case actionTypes.SET_ADMIN_MAIN:
      return state.set('adminMain', action.adminMain);
    case actionTypes.SET_SYSFILE_LIST:
      return state.set('sysFileList', action.fileList).set('sysFileListTotal', action.total);
    case actionTypes.SET_USER_FILE_LIST:
      return state.set('userFileList', action.fileList).set('userFileListTotal', action.total);
    case actionTypes.SET_USER_LIST:
      return state.set('userList', action.fileList).set('userListTotal', action.total);
    case actionTypes.SET_LINK_LIST:
      return state.set('linkList', action.linkList);
    case actionTypes.SET_MODAL_LIST:
      return state.set('modalFileList', action.fileList).set('modalTotal', action.total);
    default:
      return state;
  }
};

export default adminFilemanageReducer;
