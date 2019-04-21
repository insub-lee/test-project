import { createSelector } from 'reselect';

const selectOrg = state => state.get('bizList');

const makeInitType = () => createSelector(
  selectOrg,
  org => org.get('initType'),
);

const makeMapList = () => createSelector(
  selectOrg,
  org => org.get('mapList').toJS(),
);

const makeSearchword = () => createSelector(
  selectOrg,
  org => org.get('searchword'),
);

// const makgeBizMenuData = () => createSelector(
//   selectOrg,
//   org => org.get('bizMenuData').toJS(),
// );

export {
  selectOrg,
  makeInitType,
  makeMapList,
  makeSearchword,

  // makgeBizMenuData,
};
