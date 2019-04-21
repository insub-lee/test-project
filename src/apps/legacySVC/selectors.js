import { createSelector } from 'reselect';

const selectUserProfile = state => state.get('auth').toJS();

const makeSelectMeta = () => createSelector(
  selectUserProfile,
  metaState => metaState.meta,
);

export {
  makeSelectMeta,
};