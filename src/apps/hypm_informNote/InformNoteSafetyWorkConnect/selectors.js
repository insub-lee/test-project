import { createSelector } from 'reselect';

const selectInformNote = state => state.get('gridsheet');
const selectAuth = state => state.get('auth');

const makeConnectSearch = () => createSelector(
  selectInformNote,
  params => params.get('connectSearch'),
);

const makeSelectProfile = () => createSelector(
  selectAuth,
  authState => authState.get('profile'),
);

export {
  makeConnectSearch,
  makeSelectProfile,
};
