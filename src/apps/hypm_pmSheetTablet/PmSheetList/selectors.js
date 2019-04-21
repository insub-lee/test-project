import { createSelector } from 'reselect';

const selectPmsheet = state => state.get('mobilepm');
const selectAuth = state => state.get('auth');

const makeSelectProfile = () => createSelector(
  selectAuth,
  authState => authState.get('profile'),
);

const makeTeamList = () => createSelector(
  selectPmsheet,
  params => params.get('teamList'),
);

const makeSdptList = () => createSelector(
  selectPmsheet,
  params => params.get('sdptList'),
);

const makeDataList = () => createSelector(
  selectPmsheet,
  params => params.get('dataList'),
);

const makeCloneDataList = () => createSelector(
  selectPmsheet,
  params => params.get('clonDataList'),
);

const makeChecked = () => createSelector(
  selectPmsheet,
  params => params.get('checked'),
);

const makesdptId = () => createSelector(
  selectPmsheet,
  params => params.get('sdptId'),
);

const detailData = () => createSelector(
  selectPmsheet,
  params => params.get('detailData'),
);

const codePmList = () => createSelector(
  selectPmsheet,
  params => params.get('codePmList'),
);

const userDefine = () => createSelector(
  selectPmsheet,
  params => params.get('userDefine'),
);

const informId = () => createSelector(
  selectPmsheet,
  params => params.get('informId'),
);

const pmSheetSdptList = () => createSelector(
  selectPmsheet,
  params => params.get('pmSdptList'),
);

export {
  makeSelectProfile,
  makeTeamList,
  makeSdptList,
  makeDataList,
  makeCloneDataList,
  makeChecked,
  makesdptId,
  detailData,
  codePmList,
  userDefine,
  informId,
  pmSheetSdptList
};
