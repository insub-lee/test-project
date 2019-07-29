import { createSelector } from 'reselect';

const selectOrg = state => state.get('bizCardTopMenu');

const makgeBizInfo = () =>
  createSelector(
    selectOrg,
    org => org.get('bizInfo'),
  );

const makgeBizManagerList = () =>
  createSelector(
    selectOrg,
    org => org.get('bizManagerList').toJS(),
  );

const selectView = state => state.get('hynix.common');

const currentView = () =>
  createSelector(
    selectView,
    viewState => viewState.get('view'),
  );

export { selectOrg, makgeBizInfo, makgeBizManagerList, currentView };
