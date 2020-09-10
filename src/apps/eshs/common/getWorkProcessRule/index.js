import request from 'utils/request';

export const getProcessRule = async PRC_ID => {
  const result = await request({
    method: 'POST',
    url: '/api/workflow/v1/common/workprocess/defaultPrcRuleHanlder',
    data: { PARAM: { PRC_ID } },
    json: true,
  });
  return (result.response && result.response.DRAFT_PROCESS) || {};
};

export const getDraftProcessRule = async DRAFT_ID => {
  const result = await request({
    method: 'POST',
    url: '/api/workflow/v1/common/workprocess/draftPrcRuleHanlder',
    data: { PARAM: { DRAFT_ID } },
    json: true,
  });
  return (result.response && result.response.draftPrcRule) || {};
};

// export const eshsRelType = 100;

/* REL_KEY ---start---*/

// // 폐기물 처리요청
// export const WMTB_SUB_RESOURCE_DISP_REQ_REL_KEY = 100;

// // 보호구
// export const WBT_HITEM_REQ_REL_KEY = 101;

// // 안전작업허가
// export const EHS_SWTB_SAFETY_WORK_REL_KEY = 102;

export const ESHS_REL_TYPE = 100;

/* REL_KEY ---end---*/
