import * as constants from './constants';

export const getSiteInfo = SITE_ID => ({
  type: constants.GET_SITE_DETAIL,
  SITE_ID,
});

export const chkName = (keywordType, keyword) => ({
  type: constants.GET_SITE_NAME,
  keywordType,
  keyword,
});

export const chkUrl = (keywordType, keyword) => ({
  type: constants.GET_SITE_URL,
  keywordType,
  keyword,
});

export const updateSite = (
  siteId,
  nameKor,
  nameEng,
  nameChn,
  url,
  bizGrpId,
  homeMenuId,
  themeCd,
  managerSetMembers,
  userSetMembers,
  pstnSetMembers,
  deptSetMembers,
  dutySetMembers,
  grpSetMembers,
  menuLayoutCd,
  menuCompCd,
) => ({
  type: constants.GET_SITE_UPDATE,
  siteId,
  nameKor,
  nameEng,
  nameChn,
  url,
  bizGrpId,
  homeMenuId,
  themeCd,
  managerSetMembers,
  userSetMembers,
  pstnSetMembers,
  deptSetMembers,
  dutySetMembers,
  grpSetMembers,
  menuLayoutCd,
  menuCompCd,
});

export const delSite = (delData, history) => ({
  type: constants.GET_DEL_ROW,
  delData,
  history,
});

export const getSkinList = () => ({
  type: constants.GET_SKIN,
});

export const getHomeList = SITE_ID => ({
  type: constants.GET_HOME,
  SITE_ID,
});
