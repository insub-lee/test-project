import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  siteList: [],
  fileList: [],
  linkList: [],
  total: 0,
  modalFileList: [],
  modalTotal: 0,
  adminMain: {},
});

const adminFilemanageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SITE_LIST:
      return state.set('siteList', action.siteList);
    case actionTypes.SET_ADMIN_MAIN:
      return state.set('adminMain', action.adminMain);
    case actionTypes.SET_FILE_LIST:
      return state.set('fileList', action.fileList).set('total', action.total);
    case actionTypes.SET_LINK_LIST:
      return state.set('linkList', action.linkList);
    case actionTypes.SET_MODAL_LIST:
      return state.set('modalFileList', action.fileList).set('modalTotal', action.total);
    default:
      return state;
  }
};

export default adminFilemanageReducer;
