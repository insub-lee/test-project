import { createSelector } from 'reselect';

const selectmyappUpdate = state => state.get('admin/AdminMain/App/AppUserForm');

const makeSelectAppManagerList = () => createSelector(selectmyappUpdate, myAppDetailState => myAppDetailState.get('appManagerList').toJS());

const makeSelectUserList = () => createSelector(selectmyappUpdate, myAppDetailState => myAppDetailState.get('userList').toJS());
const makeSelectDutyList = () => createSelector(selectmyappUpdate, myAppDetailState => myAppDetailState.get('dutyList').toJS());
const makeSelectPstnList = () => createSelector(selectmyappUpdate, myAppDetailState => myAppDetailState.get('pstnList').toJS());
const makeSelectGrpList = () => createSelector(selectmyappUpdate, myAppDetailState => myAppDetailState.get('grpList').toJS());
const makeSelectDeptList = () => createSelector(selectmyappUpdate, myAppDetailState => myAppDetailState.get('deptList').toJS());

export { selectmyappUpdate, makeSelectAppManagerList, makeSelectUserList, makeSelectDutyList, makeSelectPstnList, makeSelectGrpList, makeSelectDeptList };
