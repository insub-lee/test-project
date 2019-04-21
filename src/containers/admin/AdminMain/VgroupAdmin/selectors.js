import { createSelector } from 'reselect';

const selectVgroupAdmin = state => state.get('VgroupAdmin');

const makeSelectVgroupTreeList = () => createSelector(
  selectVgroupAdmin,
  vgroupAdminState => vgroupAdminState.get('vgroupTreeList').toJS(),
);

const makeSelectVgroupComboList = () => createSelector(
  selectVgroupAdmin,
  vgroupAdminState => vgroupAdminState.get('vgroupComboList').toJS(),
);

const makeSelectVgroupManagerList = () => createSelector(
  selectVgroupAdmin,
  vgroupManagerState => vgroupManagerState.get('managerList').toJS(),
);

const makeSelectVgroupMemberUList = () => createSelector(
  selectVgroupAdmin,
  vgroupMemberUState => vgroupMemberUState.get('memberUList').toJS(),
);

const makeSelectVgroupMemberDList = () => createSelector(
  selectVgroupAdmin,
  vgroupMemberDState => vgroupMemberDState.get('memberDList').toJS(),
);

export {
  selectVgroupAdmin,
  makeSelectVgroupTreeList,
  makeSelectVgroupComboList,
  makeSelectVgroupManagerList,
  makeSelectVgroupMemberUList,
  makeSelectVgroupMemberDList,
};
