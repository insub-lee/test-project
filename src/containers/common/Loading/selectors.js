import { createSelector } from 'reselect';

const selectLoading = state => state.get('loading');

const makeIsLoading = () =>
  createSelector(
    selectLoading,
    authState => authState.get('isLoading'),
  );

const makeIsLoading2 = () =>
  createSelector(
    selectLoading,
    authState => authState.get('isLoading'),
  );

export { makeIsLoading, makeIsLoading2 };
