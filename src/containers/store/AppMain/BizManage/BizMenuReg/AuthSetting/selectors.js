import { createSelector } from 'reselect';

const selectOrg = state => state.get('bizmenuAuthsetting');

const makeCategoryData = () => createSelector(
  selectOrg,
  org => org.get('categoryData').toJS(),
);

const makeBizGroupInfo = () => createSelector(
  selectOrg,
  org => org.get('bizGroupInfo').toJS(),
);

const makeAuthArr = () => createSelector(
  selectOrg,
  org => org.get('authArr').toJS(),
);

const makeBizMenuSecKeyList = () => createSelector(
  selectOrg,
  org => org.get('bizMenuSecKeyList').toJS(),
);

export {
  selectOrg,
  makeCategoryData,
  makeBizGroupInfo,
  makeAuthArr,
  makeBizMenuSecKeyList,
};
