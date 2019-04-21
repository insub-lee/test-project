import * as constants from './constants';

export const loadingParam = value => (
  {
    type: constants.LOADING_PARAM_SAGA,
    value,
  }
);

export const handleInit = value => (
  {
    type: constants.LOADING_INIT_SAGA,
    value,
  }
);

export const handleMergeDefine = value => (
  {
    type: constants.LOADING_MERGE_DEFINE_SAGA,
    value,
  }
);

export const handleDeleteDefine = value => (
  {
    type: constants.LOADING_DELETE_DEFINE_SAGA,
    value,
  }
);

export const handleDefineGet = param => (
  {
    type: constants.LOADING_DEFINE_GET_SAGA,
    param,
  }
);

export const handleDefineDetialGet = param => (
  {
    type: constants.LOADING_DEFINE_DETAIL_GET_SAGA,
    param,
  }
);

export const loadingTidnParam = param => (
  {
    type: constants.LOADING_TIDNPARAM_SAGA,
    param,
  }
);