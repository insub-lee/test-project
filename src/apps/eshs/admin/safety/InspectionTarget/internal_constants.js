const baseUrl = `/api/eshs/v1/common/safety/`;
export const address = {
  selectAllData: `${baseUrl}fireInspection`,
  generatePositionNo: `${baseUrl}generatePositionNo`,
  afterProcessing: `${baseUrl}afterProcessing`,
};
export const VIEW_TYPE = { INPUT: 'INPUT', VIEW: 'VIEW', MODIFY: 'MODIFY', LIST: 'LIST' };
export const META_SEQ = { MODAL_LIST: 3901, VIEW_BASIC: 3681, INSPECTION: 4841, ISSUE: 4842 };
export const BUTTON_CATEGORY = { FIRE_EXTINGUISHER_MAIN: 'FIRE_EXTINGUISHER' };

export default 'specify what you want to import.';
