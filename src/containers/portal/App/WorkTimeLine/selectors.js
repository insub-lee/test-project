import { createSelector } from 'reselect';

const selectWorkTimeLineState = state => state.get('work-time-line');

const makeSelectList = () => createSelector(selectWorkTimeLineState, state => state.get('list').toJS());

const selectUserProfile = state => state.get('auth').toJS();
const makeSelectIflowUrl = () => createSelector(selectUserProfile, userProfileState => userProfileState.profile.iflowUrl);

export { makeSelectList, makeSelectIflowUrl };
