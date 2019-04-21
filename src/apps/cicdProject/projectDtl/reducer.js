import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  nameChk_kor: false,
  nameChk_chn: false,
  nameChk_eng: false,
  projectDtl: [],
  defaultList: [],
  // new add
  // dupCheckFlag: 'N',
  divionListCombo: [],
});

const ProjectDtlReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_SITE_NAME_KOR:
      return state.set('nameChk_kor', action.payload);
    case constants.SET_SITE_NAME_CHN:
      return state.set('nameChk_chn', action.payload);
    case constants.SET_SITE_NAME_ENG:
      return state.set('nameChk_eng', action.payload);
    case constants.SET_DEFAULT:
      return state.set('defaultList', action.payload);
    // new add
    case constants.DUP_CHECK:
      return state.set('dupCheckFlag', action.dupCheckFlag);
    case constants.LOADING_PARAM:
      return state.set('divionListCombo', action.divionListCombo);
    case constants.LOADING_PROJECT_INFO:
      return state.set('projectData', action.projectData);
    case constants.UPDATE_PROJECT:
      return state.set('updateCheck', action.updateCheck);
    default:
      return state;
  }
};

export default ProjectDtlReducer;
