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

/*
export const delRow = delData => (
  {
    type: constants.GET_DEL_ROW,
    delData,
  }
);

*/
export const delRow100 = CardStdCd_Id => (
  {
    type: constants.GET_STD_ROW100,
    CardStdCd_Id,
  }
);

export const delRow126 = CardStdCd_Id => (
  {
    type: constants.GET_STD_ROW126,
    CardStdCd_Id,
  }
);

export const delRow125 = CardStdCd_Id => (
  {
    type: constants.GET_STD_ROW125,
    CardStdCd_Id,
  }
);

export const delRow130 = CardStdCd_Id => (
  {
    type: constants.GET_STD_ROW130,
    CardStdCd_Id,
  }
);

export const delRow140 = CardStdCd_Id => (
  {
    type: constants.GET_STD_ROW140,
    CardStdCd_Id,
  }
);

