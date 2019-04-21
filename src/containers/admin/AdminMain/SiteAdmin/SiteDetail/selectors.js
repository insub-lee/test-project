import { createSelector } from 'reselect';

const selectSiteInfo = state => state.get('SiteInfo');

const makeSelectSiteInfo = () => createSelector(
  selectSiteInfo,
  selectSiteState => selectSiteState.get('siteList'),
);

const makeSelectSiteSecI = () => createSelector(
  selectSiteInfo,
  selectSecIState => selectSecIState.get('secListI').toJS(),
);

const makeSelectSiteSecV = () => createSelector(
  selectSiteInfo,
  selectSecVState => selectSecVState.get('secListV').toJS(),
);

const makeHomeList = () => createSelector(
  selectSiteInfo,
  selectSiteHomeList => selectSiteHomeList.get('home').toJS(),
  // selectSiteRegState => selectSiteRegState.get('theme'),

);

const makeSkinList = () => createSelector(
  selectSiteInfo,
  selectSiteRegState => selectSiteRegState.get('theme').toJS(),
  // selectSiteRegState => selectSiteRegState.get('theme'),

);

const makeDelRow = () => createSelector(
  selectSiteInfo,
  delRowState => delRowState.get('delList').toJS(),
);

const makeNameCheck = () => createSelector(
  selectSiteInfo,
  selectSiteRegState => selectSiteRegState.get('nameChk'),
);

const makeNameCheckK = () => createSelector(
  selectSiteInfo,
  selectSiteRegState => selectSiteRegState.get('nameChk_Kor'),
);

const makeNameCheckC = () => createSelector(
  selectSiteInfo,
  selectSiteRegState => selectSiteRegState.get('nameChk_Chn'),
);

const makeNameCheckE = () => createSelector(
  selectSiteInfo,
  selectSiteRegState => selectSiteRegState.get('nameChk_Eng'),
);

const makeUrlCheck = () => createSelector(
  selectSiteInfo,
  selectSiteState => selectSiteState.get('urlChk'),
);

export {
  selectSiteInfo,
  makeSelectSiteInfo,
  makeSelectSiteSecI,
  makeSelectSiteSecV,
  makeHomeList,
  makeSkinList,
  makeDelRow,
  makeNameCheck,
  makeNameCheckK,
  makeNameCheckC,
  makeNameCheckE,
  makeUrlCheck,
};
