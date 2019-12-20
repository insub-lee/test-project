import { createSelector } from 'reselect';

const selectAppDetail = state => state.get('admin/AdminMain/AppDetail/AppRating');

const makeSelectAppRatingInfo = () => createSelector(selectAppDetail, appRatingState => appRatingState.get('appRatingInfo'));

const makeSelectAppRatingList = () => createSelector(selectAppDetail, appRatingState => appRatingState.get('appRatingList').toJS());

const makeSelectMyAppRating = () => createSelector(selectAppDetail, appRatingState => appRatingState.get('myAppRating'));

const makeSelectRtheiFlog = () => createSelector(selectAppDetail, appRatingState => appRatingState.get('rtheiFlog'));

const makeSelectAppRatingListSize = () => createSelector(selectAppDetail, appRatingState => appRatingState.get('appRatingListSize'));

const selectView = state => state.get('common');

const currentView = () => createSelector(selectView, viewState => viewState.get('view'));

export {
  selectAppDetail,
  makeSelectAppRatingInfo,
  makeSelectAppRatingList,
  makeSelectMyAppRating,
  makeSelectRtheiFlog,
  makeSelectAppRatingListSize,
  currentView,
};
