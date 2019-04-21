import { createSelector } from 'reselect';

const selectInfoList = state => state.get('SiteList');

const makeSelectInfoList = () => createSelector(
  selectInfoList,
  //selectInfoState => selectInfoState.get('BcinfoList').toJS(),
  selectInfoState => selectInfoState.get('siteList'),
);

const makeDelRow = () => createSelector(
  selectInfoList,
  delRowState => delRowState.get('delList').toJS(),
);

export {
  selectInfoList,
  makeSelectInfoList,
  makeDelRow
};
