import { createSelector } from 'reselect';

const selectOrg = state => state.get('bizDetail');

const makeMapList = () => createSelector(
  selectOrg,
  org => org.get('mapList').toJS(),
);

const makgeBizMenuData = () => createSelector(
  selectOrg,
  org => org.get('bizMenuData').toJS(),
);


const makeSelectedIndex = () => createSelector(
  selectOrg,
  org => org.get('selectedIndex'),
);

export {
  selectOrg,
  makeMapList,
  makgeBizMenuData,
  makeSelectedIndex,
};
