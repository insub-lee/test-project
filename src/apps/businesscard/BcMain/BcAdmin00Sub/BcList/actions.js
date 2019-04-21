import * as constants from './constants';

export const getList = (num, 
  sortColumn, 
  sortDirection, 
  keywordType, 
  keyword,
  oneDate,
  startDate,
  endDate,
  std130Val,
  end130Val,
  reqstKorNm,
  agentNm,
  cardReqstNo,
  reqstId,
  cardRcvCd,
  cardTypeCd,
) => (

  {
    type: constants.GET_INFO_LIST,
    num,
    sortColumn,
    sortDirection,
    keywordType,
    keyword,
    oneDate,
    startDate,
    endDate,    
    std130Val,
    end130Val,
    reqstKorNm,
    agentNm,
    cardReqstNo,
    reqstId,
    cardRcvCd,
    cardTypeCd,
  }
);

export const delRow = delData => (
  {
    type: constants.GET_DEL_ROW,
    delData,
  }
);
