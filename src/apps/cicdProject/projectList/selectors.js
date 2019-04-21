import { createSelector } from 'reselect';

const selectProjectList = state => state.get('ProjectList');

const makeProjectListSearch = () => createSelector(
  selectProjectList,
  params => params.get('projectListSearch').toJS(),
);

const makeProjectCountInfo = () => createSelector(
  selectProjectList,
  params => params.get('projectCountInfo'),
);

export {
  makeProjectListSearch,
  makeProjectCountInfo,
};
