import { createSelector } from 'reselect';

const selectPmsheet = state => state.get('mobileCollaborator');

const collaboratorList = () => createSelector(
  selectPmsheet,
  params => params.get('collaboratorList'),
);

export {
  collaboratorList,
};
