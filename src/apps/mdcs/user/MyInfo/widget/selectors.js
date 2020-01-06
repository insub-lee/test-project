import { createSelector } from 'reselect';

const auth = state => state.get('auth');

const userProfile = () => createSelector(auth, state => state.get('profile'));

const myInfo = state => state.get('MyInfoWidget');

const settingData = () => createSelector(myInfo, state => state.get('settingData'));

export { userProfile, settingData };
