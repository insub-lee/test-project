import { createSelector } from 'reselect';

const selectOrg = state => state.get('bizmenuList');

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

export {
  selectOrg,
  makeInitType,
  makeMapList,
  makeSearchword,
};
