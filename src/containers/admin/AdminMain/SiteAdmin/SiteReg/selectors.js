import { createSelector } from 'reselect';

const selectSiteReg = state => state.get('SiteReg');

const makeNameCheckK = () => createSelector(
  selectSiteReg,
  selectSiteRegState => selectSiteRegState.get('nameChk_kor'),
);

const makeNameCheckC = () => createSelector(
  selectSiteReg,
  selectSiteRegState => selectSiteRegState.get('nameChk_chn'),
);

const makeNameCheckE = () => createSelector(
  selectSiteReg,
  selectSiteRegState => selectSiteRegState.get('nameChk_eng'),
);

const makeUrlCheck = () => createSelector(
  selectSiteReg,
  selectSiteRegState => selectSiteRegState.get('urlChk'),
);

const makeRegistSite = () => createSelector(
  selectSiteReg,
  selectSiteRegState => selectSiteRegState.get('siteReg').toJS(),
);

const makeHomeList = () => createSelector(
  selectSiteReg,
  selectSiteRegState => selectSiteRegState.get('home').toJS(),
  // selectSiteRegState => selectSiteRegState.get('theme'),

);

const makeSkinList = () => createSelector(
  selectSiteReg,
  selectSiteRegState => selectSiteRegState.get('theme').toJS(),
  // selectSiteRegState => selectSiteRegState.get('theme'),

);

const makeDefaultList = () => createSelector(
  selectSiteReg,
  selectSiteRegState => selectSiteRegState.get('defaultList').toJS(),
  // selectSiteRegState => selectSiteRegState.get('theme'),

);

const mySkin = () => createSelector(
  selectSiteReg,
  selectSiteRegState => selectSiteRegState.get('mySkin'),
);

const myHome = () => createSelector(
  selectSiteReg,
  selectSiteRegState => selectSiteRegState.get('myHome'),
);

const loadLang = () => createSelector(
  selectSiteReg,
  selectSiteRegState => selectSiteRegState.get('langcheck'),
);

const myLang = () => createSelector(
  selectSiteReg,
  selectSiteRegState => selectSiteRegState.get('myLang'),
);

export {
  selectSiteReg,
  makeNameCheckK,
  makeNameCheckC,
  makeNameCheckE,
  makeUrlCheck,
  makeRegistSite,
  makeHomeList,
  makeSkinList,
  makeDefaultList,
  mySkin,
  myHome,
  loadLang,
  myLang,
};
