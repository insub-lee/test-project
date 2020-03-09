import { createSelector } from 'reselect';

const selectSiteInfo = state => state.get('SiteInfo');

const makeSelectSiteInfo = () => createSelector(selectSiteInfo, selectSiteState => selectSiteState.get('siteList'));

const makeSelectSiteSecI = () => createSelector(selectSiteInfo, selectSecIState => selectSecIState.get('secListI').toJS());

const makeSelectSiteSecV = () => createSelector(selectSiteInfo, selectSecVState => selectSecVState.get('secListV').toJS());

const makeGrpList = () => createSelector(selectSiteInfo, selectSiteHomeList => selectSiteHomeList.get('bizGrpList').toJS());
const makeHomeList = () => createSelector(selectSiteInfo, selectSiteHomeList => selectSiteHomeList.get('bizHomeList').toJS());

const makeSkinList = () =>
  createSelector(
    selectSiteInfo,
    selectSiteRegState => selectSiteRegState.get('theme').toJS(),
    // selectSiteRegState => selectSiteRegState.get('theme'),
  );

const makeDelRow = () => createSelector(selectSiteInfo, delRowState => delRowState.get('delList').toJS());

const makeNameCheck = () => createSelector(selectSiteInfo, selectSiteRegState => selectSiteRegState.get('nameChk'));

const makeNameCheckK = () => createSelector(selectSiteInfo, selectSiteRegState => selectSiteRegState.get('nameChk_Kor'));

const makeNameCheckC = () => createSelector(selectSiteInfo, selectSiteRegState => selectSiteRegState.get('nameChk_Chn'));

const makeNameCheckE = () => createSelector(selectSiteInfo, selectSiteRegState => selectSiteRegState.get('nameChk_Eng'));

const makeUrlCheck = () => createSelector(selectSiteInfo, selectSiteState => selectSiteState.get('urlChk'));

const makeMenuLayoutList = () => createSelector(selectSiteInfo, selectSiteState => selectSiteState.get('menuLayoutList'));
const makeMenuCompList = () => createSelector(selectSiteInfo, selectSiteState => selectSiteState.get('menuCompList'));

export {
  selectSiteInfo,
  makeSelectSiteInfo,
  makeSelectSiteSecI,
  makeSelectSiteSecV,
  makeGrpList,
  makeHomeList,
  makeSkinList,
  makeDelRow,
  makeNameCheck,
  makeNameCheckK,
  makeNameCheckC,
  makeNameCheckE,
  makeUrlCheck,
  makeMenuLayoutList,
  makeMenuCompList,
};
