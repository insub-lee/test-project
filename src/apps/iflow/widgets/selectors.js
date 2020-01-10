import { createSelector } from 'reselect';

const selectIflowData = state => state.get('Iflow');

const makeIflowDataList = () => createSelector(selectIflowData, iFlowState => iFlowState.get('dataList').toJS());

const selectUserProfile = state => state.get('auth').toJS();
const makeSelectIflowUrl = () => createSelector(selectUserProfile, userProfileState => userProfileState.profile.iflowUrl);

export { selectIflowData, makeIflowDataList, makeSelectIflowUrl };
