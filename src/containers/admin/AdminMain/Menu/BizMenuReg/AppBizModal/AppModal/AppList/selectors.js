import { createSelector } from 'reselect';

const selectOrg = state => state.get('admin/AdminMain/Menu/BizMenuReg/AppBizModal/AppModal/AppList');

const makeInitType = () =>
  createSelector(
    selectOrg,
    org => org.get('initType'),
  );

const makeMapList = () =>
  createSelector(
    selectOrg,
    org => org.get('mapList').toJS(),
  );

const makeSearchword = () =>
  createSelector(
    selectOrg,
    org => org.get('searchword'),
  );

export { selectOrg, makeInitType, makeMapList, makeSearchword };
