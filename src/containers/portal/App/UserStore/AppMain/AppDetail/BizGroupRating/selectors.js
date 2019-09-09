import { createSelector } from 'reselect';

const selectAppDetail = state => state.get('groupRating');

const makeSelectAppRatingInfo = () =>
  createSelector(
    selectAppDetail,
    appRatingState => appRatingState.get('appRatingInfo'),
  );

const makeSelectappRatingList = () =>
  createSelector(
    selectAppDetail,
    appRatingState => appRatingState.get('appRatingList').toJS(),
  );

const makeSelectMyAppRating = () =>
  createSelector(
    selectAppDetail,
    appRatingState => appRatingState.get('myAppRating'),
  );

const makeSelectRtheiFlog = () =>
  createSelector(
    selectAppDetail,
    appRatingState => appRatingState.get('rtheiFlog'),
  );

const makeSelectappRatingListSize = () =>
  createSelector(
    selectAppDetail,
    appRatingState => appRatingState.get('appRatingListSize'),
  );

const selectView = state => state.get('common');

const currentView = () =>
  createSelector(
    selectView,
    viewState => viewState.get('view'),
  );

export {
  selectAppDetail,
  makeSelectAppRatingInfo,
  makeSelectappRatingList,
  makeSelectMyAppRating,
  makeSelectRtheiFlog,
  makeSelectappRatingListSize,
  currentView,
};
