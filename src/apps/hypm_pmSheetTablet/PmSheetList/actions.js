import * as constants from './constants';

export const loadingTeamParam = value => (
  {
    type: constants.LOADING_TEAM_PARAM_SAGA,
    value,
  }
);

export const loadingSdptParam = value => (
  {
    type: constants.LOADING_SDPT_PARAM_SAGA,
    value,
  }
);

export const loadingData = param => (
  {
    type: constants.LOADING_DATA_PARAM_SAGA,
    param,
  }
);

export const checkbox = (status, data) => (
  {
    type: constants.CHECKBOX_SAGA,
    status,
    data,
  }
);

export const checked = status => (
  {
    type: constants.CHEKCBOX,
    status,
  }
);

export const sdptId = value => (
  {
    type: constants.SDPTID,
    value,
  }
);

export const loadingDetailData = param => (
  {
    type: constants.LOADING_PMSHEET_DETAIL_SAGA,
    param,
  }
);

export const loadingPmCode = () => (
  {
    type: constants.LOADING_PMSHEET_CODE_SAGA,
  }
);

export const savePmCode = (value, num) => (
  {
    type: constants.SAVE_PMSHEET_CODE_SAGA,
    value,
    num,
  }
);

export const getUserCompanyDefine = () => (
  {
    type: constants.GET_USER_COMPANY_DEFINE_SAGA,
  }
);

export const saveInformID = id => (
  {
    type: constants.SAVE_PMSHEET_INFORMNOTE_ID,
    id,
  }
);

export const getPmSheetSdptList = () => (
  {
    type: constants.LOADING_PMSHEET_SDPT_SAGA,
  }
);

export const saveCorpList = (value, num) => (
  {
    type: constants.SAVE_PMSHEET_CORP_SAGA,
    value,
    num,
  }
);

export const savePmStatus = (value, num) => (
  {
    type: constants.SAVE_PMSHEET_STATUS_SAGA,
    value,
    num,
  }
);
