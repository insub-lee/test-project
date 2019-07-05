import { createSelector } from 'reselect';

const selectAppDetail = state => state.get('appQna');

const makeSelectQnaList = () => createSelector(
  selectAppDetail,
  appQnaState => appQnaState.get('qnaList').toJS(),
);

const makeSelectFaqList = () => createSelector(
  selectAppDetail,
  appQnaState => appQnaState.get('faqList').toJS(),
);

const makeSelectMyqnaList = () => createSelector(
  selectAppDetail,
  appQnaState => appQnaState.get('myqnaList').toJS(),
);

const makeSelectQnaTotCnt = () => createSelector(
  selectAppDetail,
  appQnaState => appQnaState.get('qnaTotCnt'),
);

const makeSelectFaqTotCnt = () => createSelector(
  selectAppDetail,
  appQnaState => appQnaState.get('faqTotCnt'),
);

const makeSelectMyqnaTotCnt = () => createSelector(
  selectAppDetail,
  appQnaState => appQnaState.get('myqnaTotCnt'),
);

const makeSelectAppManagerChk = () => createSelector(
  selectAppDetail,
  appQnaState => appQnaState.get('appManagerChk'),
);

const makeSelectQnaWriteUrl = () => createSelector(
  selectAppDetail,
  appQnaState => appQnaState.get('qnaWriteUrl'),
);

const makeSelectFaqWriteUrl = () => createSelector(
  selectAppDetail,
  appQnaState => appQnaState.get('faqWriteUrl'),
);

const makeSelectQnaEditUrl = () => createSelector(
  selectAppDetail,
  appQnaState => appQnaState.get('qnaEditUrl'),
);

const selectView = state => state.get('hynix.common');

const currentView = () => createSelector(
  selectView,
  viewState => viewState.get('view'),
);

const selectUserProfile = state => state.get('auth').toJS();

const makeSelectIflowToken = () => createSelector(
  selectUserProfile,
  userProfileState => userProfileState.profile.IFLOW_TOKEN,
);

const makeSelectIflowUrl = () => createSelector(
  selectUserProfile,
  userProfileState => userProfileState.profile.iflowUrl,
);
export {
  selectAppDetail,
  makeSelectQnaList,
  makeSelectFaqList,
  makeSelectMyqnaList,
  makeSelectQnaTotCnt,
  makeSelectFaqTotCnt,
  makeSelectMyqnaTotCnt,
  makeSelectAppManagerChk,
  currentView,
  makeSelectIflowToken,
  makeSelectQnaWriteUrl,
  makeSelectFaqWriteUrl,
  makeSelectIflowUrl,
  makeSelectQnaEditUrl,
};
