const baseUrl = `/api/eshs/v1/common/safety/fireEbShower/`;
export const address = {
  selectAllData: `${baseUrl}fireInspection`,
  generatePositionNo: `${baseUrl}generatePositionNo`,
  afterProcessing: `${baseUrl}afterProcessing`,
  search: `${baseUrl}search`,
  registerIssueNote: `${baseUrl}registerIssueNote`,
  registerInspectionResult: `${baseUrl}registerInspectionResult`,
};
export const FIRE_CODE = 'fireEbShower';
export const VIEW_TYPE = { INPUT: 'INPUT', VIEW: 'VIEW', MODIFY: 'MODIFY', LIST: 'LIST' };
export const META_SEQ = {
  MODAL_LIST: 11821, // 신규등록 MODAL_LIST (목록PAGE)
  VIEW_BASIC: 11635, // 조회 basic
  VIEW_INSPECTION_BY_POSITON_NO: 11781, // 조회 HistoryByPositionNo
  VIEW_INSPECTION_BY_CHIP: 11782, // 조회 HistoryByChipNo
  INPUT_ISSUE_NOTE: 11741, // 이슈등록 페이지
  INPUT_INSPECTION: 11701, // 점검결과 등록
  LIST_USAGE_SEARCH: 11801, // 미사용 등록
  ISSUE_NOTE: 9999,
};
export const VIEW_CHANGE_SEQ = {};

export default 'specify what you want to import.';
