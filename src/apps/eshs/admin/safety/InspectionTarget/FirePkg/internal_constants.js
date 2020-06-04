const baseUrl = `/api/eshs/v1/common/safety/firePkg/`;
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
  MODAL_LIST: 10081, // 신규등록 MODAL_LIST (목록PAGE)
  VIEW_BASIC: 9944, // 조회 basic
  VIEW_INSPECTION_BY_POSITON_NO: 10041, // 조회 HistoryByPositionNo
  VIEW_INSPECTION_BY_CHIP: 10061, // 조회 HistoryByChipNo
  INPUT_ISSUE_NOTE: 10001, // 이슈등록 페이지
  INPUT_INSPECTION: 10021, // 점검결과 등록
  LIST_USAGE_SEARCH: 10082, // 미사용 등록
};
export const VIEW_CHANGE_SEQ = {};
export const BUTTON_CATEGORY = { FIRE_EXTINGUISHER_MAIN: '' };

export default 'specify what you want to import.';
