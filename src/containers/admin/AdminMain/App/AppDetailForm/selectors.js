import { createSelector } from 'reselect';

const selectMyAppDetail = state => state.get('admin/AdminMain/App/AppDetailForm');

const makeSelectMyAppDetail = () => createSelector(selectMyAppDetail, myAppDetailState => myAppDetailState.get('appDetail'));
const makeSelectProcess = () => createSelector(selectMyAppDetail, myAppDetailState => myAppDetailState.get('appProcess'));
const makeSelectManual = () => createSelector(selectMyAppDetail, myAppDetailState => myAppDetailState.get('appManual'));
const makeSelectScreenshotList = () => createSelector(selectMyAppDetail, myAppDetailState => myAppDetailState.get('screenshotList').toJS());
const makeSelectReqAppList = () => createSelector(selectMyAppDetail, myAppDetailState => myAppDetailState.get('reqAppList').toJS());
const makeSelectRecomAppList = () => createSelector(selectMyAppDetail, myAppDetailState => myAppDetailState.get('recomAppList').toJS());
const makeSelectSystemLink = () => createSelector(selectMyAppDetail, myAppDetailState => myAppDetailState.get('systemLink'));

export {
  selectMyAppDetail,
  makeSelectMyAppDetail,
  makeSelectProcess,
  makeSelectManual,
  makeSelectScreenshotList,
  makeSelectReqAppList,
  makeSelectRecomAppList,
  makeSelectSystemLink,
};
