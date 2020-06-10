const baseUrl = `/api/eshs/v1/common/safety/fireAirLineMask/`;
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
  MODAL_LIST: 12101, // 신규등록 MODAL_LIST (목록PAGE)
  VIEW_BASIC: 11875, // 조회 basic
  VIEW_INSPECTION_BY_POSITON_NO: 11961, // 조회 HistoryByPositionNo
  VIEW_INSPECTION_BY_CHIP: 12001, // 조회 HistoryByChipNo
  INPUT_ISSUE_NOTE: 11941, // 이슈등록 페이지
  INPUT_INSPECTION: 11932, // 점검결과 등록
  LIST_USAGE_SEARCH: 12121, // 미사용 등록
};
export const VIEW_CHANGE_SEQ = {};

export default 'specify what you want to import.';
