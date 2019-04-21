import { fromJS } from 'immutable';
import * as constants from './constants';

export const getCodeAdminDtl = (keywordType, keyword, codeGrpCd) => ({
  type: constants.GET_CODE_ADMIN_DTL,
  keywordType,
  keyword,
  codeGrpCd,
});

export const updateGrid = rows => ({
  type: constants.UPDATE_GRID,
  payload: fromJS(rows),
});

export const registerCodeAdmin = (
  codeGrpCd,
  codeNameKor,
  codeNameEng,
  codeNameChn,
  codeNameJpn,
  codeNameEtc,
  codeList,
) => ({
  type: constants.REGISTER_CODE_ADMIN,
  codeGrpCd,
  codeNameKor,
  codeNameEng,
  codeNameChn,
  codeNameJpn,
  codeNameEtc,
  codeList,
});

export const delCodeAdmin = (delGrpCode, delCode, history) => ({
  type: constants.DEL_CODE_ADMIN,
  delGrpCode,
  delCode,
  history,
});

export const udtCodeAdmin = (
  codeGrpCd,
  codeNameKor,
  codeNameEng,
  codeNameChn,
  codeNameJpn,
  codeNameEtc,
  codeList,
  keywordType,
  keyword,
) => ({
  type: constants.UDT_CODE_ADMIN,
  codeGrpCd,
  codeNameKor,
  codeNameEng,
  codeNameChn,
  codeNameJpn,
  codeNameEtc,
  codeList,
  keywordType,
  keyword,
});

export const getCodeGrpCd = codeGrpCd => ({
  type: constants.GET_CODE_GRP_CD,
  codeGrpCd,
});
