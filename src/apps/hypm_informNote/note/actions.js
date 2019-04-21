import * as constants from './constants';

export const loadingUnitParam = value => (
  {
    type: constants.LOADING_UNIT_PARAM_SAGA,
    value,
  }
);

export const loadingTypeParam = value => (
  {
    type: constants.LOADING_TYPE_PARAM_SAGA,
    value,
  }
);

export const loadingCauseParam = value => (
  {
    type: constants.LOADING_CAUSE_PARAM_SAGA,
    value,
  }
);

export const loadingPartParam = value => (
  {
    type: constants.LOADING_PART_PARAM_SAGA,
    value,
  }
);

export const loadingSetUnitCode = value => (
  {
    type: constants.LOADING_UNIT_CODE,
    value,
  }
);

export const loadingSetTypeCode = value => (
  {
    type: constants.LOADING_TYPE_CODE,
    value,
  }
);

export const loadingSetCauseCode = value => (
  {
    type: constants.LOADING_CAUSE_CODE,
    value,
  }
);

export const loadingSetPartCode = value => (
  {
    type: constants.LOADING_PART_CODE,
    value,
  }
);

export const updateRepairList = value => (
  {
    type: constants.UPDATE_REPAIR_LIST,
    value,
  }
);

export const updateRepairListDelete = value => (
  {
    type: constants.UPDATE_REPAIR_LIST_DELETE,
    value,
  }
);

export const deleteRepair = value => (
  {
    type: constants.DELETE_REPAIR_LIST,
    value,
  }
);

export const updateTechSafeList = value => (
  {
    type: constants.UPDATE_TECHSAFE_LIST,
    value,
  }
);

export const updateTechSafeListDelete = value => (
  {
    type: constants.UPDATE_TECHSAFE_LIST_DELETE,
    value,
  }
);

export const deleteTechSafe = value => (
  {
    type: constants.DELETE_TECHSAFE_LIST,
    value,
  }
);

export const updateSafeWorkList = value => (
  {
    type: constants.UPDATE_SAFEWORK_LIST,
    value,
  }
);

export const updateSafeWorkListDelete = value => (
  {
    type: constants.UPDATE_SAFEWORK_LIST_DELETE,
    value,
  }
);

export const deleteSafeWork = value => (
  {
    type: constants.DELETE_SAFEWORK_LIST,
    value,
  }
);

export const resetUnitList = value => (
  {
    type: constants.LOADING_UNIT_PARAM,
    unitList: value,
  }
);

export const resetTypeList = value => (
  {
    type: constants.LOADING_TYPE_PARAM,
    typeList: value,
  }
);

export const resetCauseList = value => (
  {
    type: constants.LOADING_CAUSE_PARAM,
    causeList: value,
  }
);

export const resetPartList = value => (
  {
    type: constants.LOADING_PART_PARAM,
    partList: value,
  }
);

export const searchUnitList = value => (
  {
    type: constants.SEARCH_UNIT_PARAM,
    value,
  }
);

export const searchTypeList = value => (
  {
    type: constants.SEARCH_TYPE_PARAM,
    value,
  }
);

export const searchCauseList = value => (
  {
    type: constants.SEARCH_CAUSE_PARAM,
    value,
  }
);

export const searchPartList = value => (
  {
    type: constants.SEARCH_PART_PARAM,
    value,
  }
);

export const safeWorkPopData = value => (
  {
    type: constants.SAVE_SAFEWORK_POPUP_DATA,
    value,
  }
);

export const saveBtnType = value => (
  {
    type: constants.SAVE_BTN_TYPE,
    value,
  }
);
