import * as constants from './constants';

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

export const test = list => ({
  type: constants.TEST,
  payload: { list },
});

export const registSite = (
  nameKor,
  nameChn,
  nameEng,
  url,
  bizGrpId,
  themeCd,
  managerSetMembers,
  userSetMembers,
  pstnSetMembers,
  deptSetMembers,
  dutySetMembers,
  grpSetMembers,
  history,
  menuLayoutCd,
  menuCompCd,
) => ({
  type: constants.GET_SITE_DETAIL,
  nameKor,
  nameChn,
  nameEng,
  url,
  bizGrpId,
  themeCd,
  managerSetMembers,
  userSetMembers,
  pstnSetMembers,
  deptSetMembers,
  dutySetMembers,
  grpSetMembers,
  history,
  menuLayoutCd,
  menuCompCd,
});

export const skincheck = value => ({
  type: constants.SKIN_CHANGE_SAGA,
  payload: {
    value,
  },
});

export const getSkinList = () => ({
  type: constants.GET_SKIN,
});

export const getHomeList = () => ({
  type: constants.GET_HOME,
});

export const getDefaultList = () => ({
  type: constants.GET_DEFAULT,
});

export const loadLang = () => ({
  type: constants.GET_LANG,
});

// export const onSaveMessage = data => (
//   {
//     type: SET_MESSAGE_LIST,
//     data,
//   }
// );

export const onSaveSkin = value => ({
  type: constants.SET_SKIN,
  value,
});

export const onSaveLang = value => ({
  type: constants.SET_LANG,
  value,
});
