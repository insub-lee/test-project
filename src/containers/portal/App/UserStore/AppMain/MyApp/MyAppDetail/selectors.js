import { createSelector } from 'reselect';

const selectMyAppDetail = state => state.get('MyAppDetail');

const makeSelectAppinfo = () => createSelector(selectMyAppDetail, myAppDetailState => myAppDetailState.get('appinfo'));

const makeSelectServiceStopCodeList = () => createSelector(selectMyAppDetail, myAppDetailState => myAppDetailState.get('serviceStopCodeList').toJS());

// const makeSelectServiceServiceStopOk = () => createSelector(
//   selectMyAppDetail,
//   myAppDetailState => myAppDetailState.get('serviceStopOk'),
// );

export {
  selectMyAppDetail,
  makeSelectAppinfo,
  makeSelectServiceStopCodeList,
  // makeSelectServiceServiceStopOk,
};
