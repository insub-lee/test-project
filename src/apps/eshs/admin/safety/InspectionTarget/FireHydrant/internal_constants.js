const baseUrl = `/api/eshs/v1/common/safety/fireHydrant/`;
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
  MODAL_LIST: 9281, // 신규등록 MODAL_LIST (목록PAGE)
  VIEW_BASIC: 9183, // 조회 basic
  VIEW_INSPECTION_BY_CHIP: 9461, // 조회 HistoryByChipNo
  VIEW_INSPECTION_BY_POSITON_NO: 9441, // 조회 HistoryByPositionNo
  INPUT_ISSUE_NOTE: 9504, // 이슈등록 페이지
  INPUT_INSPECTION: 9481, // 점검결과 등록
  LIST_USAGE_SEARCH: 9541, // 미사용 등록
  // MODIFY_INSPECTION: 5122,
  // VIEW_STATUS: 8781, 현황없음
};
export const VIEW_CHANGE_SEQ = {};

export default 'specify what you want to import.';
