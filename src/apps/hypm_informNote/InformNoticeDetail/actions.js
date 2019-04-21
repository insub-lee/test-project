import * as constants from './constants';

export const loadingFabParam = () => (
  {
    type: constants.LOADING_FAB_PARAM_SAGA,
  }
);

export const loadingParam = value => (
  {
    type: constants.LOADING_PARAM_SAGA,
    value,
  }
);

export const loadingSdptParam = value => (
  {
    type: constants.LOADING_SDPTPARAM_SAGA,
    value,
  }
);

export const loadingTeamParam = value => (
  {
    type: constants.LOADING_TEAMPARAM_SAGA,
    value,
  }
);

export const informNoticeSearch = param => (
  {
    type: constants.LOADING_INFORMNOTICE_SAGA,
    param,
  }
);

export const informNoticeDetail = param => (
  {
    type: constants.LOADING_INFORMNOTICEDETAIL_SAGA,
    param,
  }
);

export const informNoticeSave = param => (
  {
    type: constants.SAVE_INFORMNOTICE_SAGA,
    param,
  }
);
