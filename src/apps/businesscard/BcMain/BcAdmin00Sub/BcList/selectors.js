import { createSelector } from 'reselect';

const selectInfoList = state => state.get('SiteListAll');

const makeSelectInfoList = () => createSelector(
  selectInfoList,
  selectInfoState => selectInfoState.get('siteListAll').toJS(),
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
