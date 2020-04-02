const baseUrl = `/api/eshs/v1/common/safety/`;
export const address = {
  selectAllData: `${baseUrl}fireInspection`,
  generatePositionNo: `${baseUrl}generatePositionNo`,
  afterProcessing: `${baseUrl}afterProcessing`,
  search: `${baseUrl}search`,
};
export const VIEW_TYPE = { INPUT: 'INPUT', VIEW: 'VIEW', MODIFY: 'MODIFY', LIST: 'LIST' };
export const META_SEQ = { MODAL_LIST: 3901, VIEW_BASIC: 3681, VIEW_INSPECTION: 4841, VIEW_ISSUE: 4842, MODIFY_ISSUE: 5121, MODIFY_INSPECTION: 5122 };
export const VIEW_CHANGE_SEQ = {};
export const BUTTON_CATEGORY = { FIRE_EXTINGUISHER_MAIN: 'FIRE_EXTINGUISHER' };

export default 'specify what you want to import.';
