import { createSelector } from 'reselect';

const selectInfoList = state => state.get('SiteList04');

const makeSelectInfoList = () => createSelector(
  selectInfoList,
  selectInfoState => selectInfoState.get('siteList04').toJS(),
);

const makeDelRow = () => createSelector(
  selectInfoList,
  delRowState => delRowState.get('delList').toJS(),
);

const makeDelRow100 = () => createSelector(
  selectInfoList,
  delRowState100 => delRowState100.get('List100').toJS(),
);

export {
  selectInfoList,
  makeSelectInfoList,
  makeDelRow,
  makeDelRow100
};

