const baseUrl = `/api/eshs/v1/common/safety/fireDpump/`;
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
  MODAL_LIST: 11281, // 신규등록 MODAL_LIST (목록PAGE)
  VIEW_BASIC: 11183, // 조회 basic
  VIEW_INSPECTION_BY_POSITON_NO: 11241, // 조회 HistoryByPositionNo
  VIEW_INSPECTION_BY_CHIP: 11261, // 조회 HistoryByChipNo
  INPUT_ISSUE_NOTE: 11233, // 이슈등록 페이지
  INPUT_INSPECTION: 11232, // 점검결과 등록
  LIST_USAGE_SEARCH: 11282, // 미사용 등록
};
export const VIEW_CHANGE_SEQ = {};

export default 'specify what you want to import.';
