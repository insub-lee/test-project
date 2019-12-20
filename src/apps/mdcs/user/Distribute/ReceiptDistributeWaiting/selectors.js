import { createSelector } from 'reselect';

const selectAuth = state => state.get('auth');

const makeSelectIdToken = () => createSelector(selectAuth, authState => authState.get('uuid') !== null);

const makeSelectProfile = () => createSelector(selectAuth, authState => authState.get('profile'));

const makeSelectHNotiCnt = () => createSelector(selectAuth, authState => authState.myHNotiCnt);

const makeSMSESSION = () => createSelector(selectAuth, authState => authState.get('SMSESSION'));

export { selectAuth, makeSelectIdToken, makeSelectProfile, makeSelectHNotiCnt, makeSMSESSION };
