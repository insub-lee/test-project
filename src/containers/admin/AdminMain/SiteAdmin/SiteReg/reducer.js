import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  nameChk_kor: false,
  nameChk_chn: false,
  nameChk_eng: false,
  urlChk: false,
  siteReg: [],
  home: [],
  theme: [],
  defaultList: [],
  mySkin: '',
  langcheck: '',
  myLang: '',
});

const SiteRegReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_SITE_NAME_KOR:
      return state.set('nameChk_kor', action.payload);
    case constants.SET_SITE_NAME_CHN:
      return state.set('nameChk_chn', action.payload);
    case constants.SET_SITE_NAME_ENG:
      return state.set('nameChk_eng', action.payload);
    case constants.SET_SITE_URL:
      return state.set('urlChk', action.payload);
    case constants.SET_HOME:
      return state.set('home', action.payload);
    case constants.SET_SKIN:
      return state.set('theme', action.payload);
    case constants.SET_DEFAULT:
      return state.set('defaultList', action.payload);
    // .set('mySkin', action.resultValue.settingList[0]);
    case constants.SET_LANG:
      return state.set('langcheck', action.resultValue.lang)
        .set('myLang', action.resultValue.settingList[0]);
    default:
      return state;
  }
};

export default SiteRegReducer;
