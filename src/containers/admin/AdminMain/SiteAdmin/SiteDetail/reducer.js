import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  siteList: [],
  secListI: [],
  secListV: [],
  siteUdt: [],
  home: [],
  theme: [],
  delList: [],
  nameChk: false,
  nameChk_Kor: false,
  nameChk_Chn: false,
  nameChk_Eng: false,
  urlChk: false,
  menuLayoutList: [],
  menuCompList: [],
});

const SiteInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_SITE_DETAIL:
      return state.set('siteList', action.payload);
    case constants.SET_SITE_NAME_KOR:
      return state.set('nameChk_Kor', action.payload);
    case constants.SET_SITE_NAME_ENG:
      return state.set('nameChk_Eng', action.payload);
    case constants.SET_SITE_NAME_CHN:
      return state.set('nameChk_Chn', action.payload);
    case constants.SET_SITE_URL:
      return state.set('urlChk', action.payload);
    case constants.SET_SITE_SEC_I:
      return state.set('secListI', action.payload);
    case constants.SET_SITE_SEC_V:
      return state.set('secListV', action.payload);
    case constants.SET_SITE_CHECK:
      return state.set('siteList', action.payload);
    case constants.SET_HOME:
      return state.set('home', action.payload);
    case constants.SET_SKIN:
      return state.set('theme', action.payload);
    case constants.SET_SITE_UPDATE:
      return state.set('siteUdt', action.payload);
    case constants.SET_DEL_ROW:
      return state.set('delList', action.payload);
    case constants.SET_MENU_TYPE_LIST:
      return state.set('menuLayoutList', action.menuLayoutList).set('menuCompList', action.menuCompList);
    default:
      return state;
  }
};

export default SiteInfoReducer;
