const baseUrl = `/api/eshs/v1/common/safety/`;
export const address = {
  selectAllData: `${baseUrl}fireInspection`,
  generatePositionNo: `${baseUrl}generatePositionNo`,
  afterProcessing: `${baseUrl}afterProcessing`,
  search: `${baseUrl}search`,
  registerIssueNote: `${baseUrl}registerIssueNote`,
  registerInspectionResult: `${baseUrl}registerInspectionResult`,
};
export const VIEW_TYPE = { INPUT: 'INPUT', VIEW: 'VIEW', MODIFY: 'MODIFY', LIST: 'LIST' };
export const META_SEQ = {
  MODAL_LIST: 3901,
  VIEW_BASIC: 3681,
  VIEW_INSPECTION_BY_CHIP: 7801,
  VIEW_INSPECTION_BY_POSITON_NO: 7841,
  INPUT_ISSUE_NOTE: 7243,
  MODIFY_INSPECTION: 5122,
  INPUT_INSPECTION: 8765,
  VIEW_STATUS: 8781,
};
export const VIEW_CHANGE_SEQ = {};
export const BUTTON_CATEGORY = { FIRE_EXTINGUISHER_MAIN: 'FIRE_EXTINGUISHER' };

export default 'specify what you want to import.';
