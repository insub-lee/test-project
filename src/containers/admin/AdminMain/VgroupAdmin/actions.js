import * as constants from './constants';

export const getVgroupTreeList = (searchKeyword, SITE_ID) => ({
  type: constants.GET_VGROUP_TREE_LIST,
  searchKeyword,
  SITE_ID,
});

export const getVgroupComboList = () => ({
  type: constants.GET_VGROUP_COMBO_LIST,
});

export const getVgroupDtlInfo = (grpId, SITE_ID) => ({
  type: constants.GET_VGROUP_DTL_INFO,
  grpId,
  SITE_ID,
});

export const vgroupInfoInsert = (SITE_ID, GRP_ID, PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN) => ({
  type: constants.INSERT_VGROUP_INFO,
  SITE_ID,
  GRP_ID,
  PRNT_ID,
  NAME_KOR,
  NAME_ENG,
  NAME_CHN,
});

export const vgroupInfoDelete = (SITE_ID, GRP_ID) => ({
  type: constants.DELETE_VGROUP_INFO,
  SITE_ID,
  GRP_ID,
});

export const vgroupInfoUpdate = (SITE_ID, GRP_ID, NAME_KOR, NAME_ENG, NAME_CHN) => ({
  type: constants.UPDATE_VGROUP_INFO,
  SITE_ID,
  GRP_ID,
  NAME_KOR,
  NAME_ENG,
  NAME_CHN,
});

export const vgroupMemberUpdate = (SITE_ID, GRP_ID, managerSetMembers, userSetMembers, deptSetMembers) => ({
  type: constants.UPDATE_VGROUP_MEMBER,
  SITE_ID,
  GRP_ID,
  managerSetMembers,
  userSetMembers,
  deptSetMembers,
});

export const moveVgroup = (SITE_ID, treeData) => ({
  type: constants.MOVE_VGROUP,
  SITE_ID,
  treeData,
});
