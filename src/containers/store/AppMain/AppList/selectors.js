import { createSelector } from 'reselect';

const selectOrg = state => state.get('appList');

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

const selectView = state => state.get('common');

const currentView = () => createSelector(
  selectView,
  viewState => viewState.get('view'),
);

export {
  selectOrg,
  makeInitType,
  makeMapList,
  makeSearchword,
  currentView,
};
