import { createSelector } from 'reselect';

const selectmyappUpdate = state => state.get('admin/AdminMain/App/AppUpdateForm');

const makeSelectLinkTypeList = () => createSelector(selectmyappUpdate, myappRegis => myappRegis.get('linkTypeList').toJS());
const makeSelectMethodList = () => createSelector(selectmyappUpdate, myappRegis => myappRegis.get('methodList').toJS());
const makeSelectWedgetColorList = () => createSelector(selectmyappUpdate, myappRegis => myappRegis.get('wedgetColorList').toJS());

const makeSelectMyAppDetail = () => createSelector(selectmyappUpdate, myAppDetailState => myAppDetailState.get('appDetail'));
const makeSelectProcess = () => createSelector(selectmyappUpdate, myAppDetailState => myAppDetailState.get('appProcess'));
const makeSelectManual = () => createSelector(selectmyappUpdate, myAppDetailState => myAppDetailState.get('appManual'));
const makeSelectScreenshotList = () => createSelector(selectmyappUpdate, myAppDetailState => myAppDetailState.get('screenshotList').toJS());
const makeSelectReqAppList = () => createSelector(selectmyappUpdate, myAppDetailState => myAppDetailState.get('reqAppList').toJS());
const makeSelectRecomAppList = () => createSelector(selectmyappUpdate, myAppDetailState => myAppDetailState.get('recomAppList').toJS());
const makeSelectSystemLink = () => createSelector(selectmyappUpdate, myAppDetailState => myAppDetailState.get('systemLink'));
const makeSelectAppIconArr = () => createSelector(selectmyappUpdate, myAppDetailState => myAppDetailState.get('appIconArr').toJS());
const makeSelectAppWorkArrr = () => createSelector(selectmyappUpdate, myAppDetailState => myAppDetailState.get('appWorkArr').toJS());
const makeSelectAppManualArr = () => createSelector(selectmyappUpdate, myAppDetailState => myAppDetailState.get('appManualArr').toJS());
export {
  selectmyappUpdate,
  makeSelectLinkTypeList,
  makeSelectMethodList,
  makeSelectWedgetColorList,
  makeSelectMyAppDetail,
  makeSelectProcess,
  makeSelectManual,
  makeSelectScreenshotList,
  makeSelectReqAppList,
  makeSelectRecomAppList,
  makeSelectSystemLink,
  makeSelectAppIconArr,
  makeSelectAppWorkArrr,
  makeSelectAppManualArr,
};
