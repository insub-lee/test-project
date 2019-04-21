import * as constants from './constants';

export const getDefaultList = () => (
  {
    type: constants.GET_DEFAULT,
  }
);

export const projectDtl = (
  nameKor,
  nameChn,
  nameEng,
  bizGrpId,
  managerSetMembers,
  userSetMembers,
  pstnSetMembers,
  deptSetMembers,
  dutySetMembers,
  grpSetMembers,
  history,
  projectName,
  projectExplanation,
  authenticationKey,
  visibility,
  replication,
  use,
  setting,
  divion,
) => (
  {
    type: constants.PROJECT_REG_SAGA,
    nameKor,
    nameChn,
    nameEng,
    bizGrpId,
    managerSetMembers,
    userSetMembers,
    pstnSetMembers,
    deptSetMembers,
    dutySetMembers,
    grpSetMembers,
    history,
    projectName,
    projectExplanation,
    authenticationKey,
    visibility,
    replication,
    use,
    setting,
    divion,
  }
);

// new add
export const dupCheck = (keywordType, keyword) => (
  {
    type: constants.DUP_CHECK_SAGA,
    keywordType,
    keyword,
  }
);

export const loadingParam = () => (
  {
    type: constants.LOADING_PARAM_SAGA,
  }
);

export const getProjectDtl = PARAM => (
  {
    type: constants.LOADING_PROJECT_INFO_SAGA,
    PARAM,
  }
);

export const projectUpdate = param => (
  {
    type: constants.UPDATE_PROJECT_SAGA,
    param,
  }
);

export const projectUpdateFlag = param => (
  {
    type: constants.UPDATE_PROJECT,
    param,
  }
);

