import { createSelector } from 'reselect';

const selectIfBoardData = state => state.get('IfBoard');

const makeIfBoardDataList = () => createSelector(selectIfBoardData, iFBoardState => iFBoardState.get('getIfBoardDataList').toJS());

const makeIfDetailBoardData = () => createSelector(selectIfBoardData, iFBoardState => iFBoardState.get('getDetailBoardData'));

const makeCatePageList = () => createSelector(selectIfBoardData, iFBoardState => iFBoardState.get('catePageList').toJS());

const selectUserProfile = state => state.get('auth').toJS();
const makeSelectIflowUrl = () => createSelector(selectUserProfile, userProfileState => userProfileState.profile.iflowUrl);

export { selectIfBoardData, makeIfBoardDataList, makeIfDetailBoardData, makeSelectIflowUrl, makeCatePageList };
