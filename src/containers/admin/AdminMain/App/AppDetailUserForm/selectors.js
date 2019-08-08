import { createSelector } from 'reselect';

const selectMyAppDetail = state => state.get('admin/AdminMain/App/AppDetailUserForm');

const makeSelectAppManagerList = () => createSelector(
  selectMyAppDetail,
  myAppDetailState => myAppDetailState.get('appManagerList').toJS(),
);
const makeSelectUserList = () => createSelector(
  selectMyAppDetail,
  myAppDetailState => myAppDetailState.get('userList').toJS(),
);
const makeSelectDutyList = () => createSelector(
  selectMyAppDetail,
  myAppDetailState => myAppDetailState.get('dutyList').toJS(),
);
const makeSelectPstnList = () => createSelector(
  selectMyAppDetail,
  myAppDetailState => myAppDetailState.get('pstnList').toJS(),
);
const makeSelectGrpList = () => createSelector(
  selectMyAppDetail,
  myAppDetailState => myAppDetailState.get('grpList').toJS(),
);
const makeSelectDeptList = () => createSelector(
  selectMyAppDetail,
  myAppDetailState => myAppDetailState.get('deptList').toJS(),
);
export {
  selectMyAppDetail,
  makeSelectAppManagerList,
  makeSelectUserList,
  makeSelectDutyList,
  makeSelectPstnList,
  makeSelectGrpList,
  makeSelectDeptList,
};
