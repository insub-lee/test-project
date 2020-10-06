import React from 'react';
import request from 'utils/request';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

export const ESH_REL_TYPE = 100;

export const getProcessRule = async (PRC_ID, callBack) => {
  const result = await request({
    method: 'POST',
    url: '/api/workflow/v1/common/workprocess/defaultPrcRuleHanlder',
    data: { PARAM: { PRC_ID } },
    json: true,
  });
  return typeof callBack === 'function'
    ? callBack((result.response && result.response.DRAFT_PROCESS) || {})
    : (result.response && result.response.DRAFT_PROCESS) || {};
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

export const saveProcessRule = async (processRule, callBack, messageFlag = true) => {
  const processStep = (processRule && processRule.DRAFT_PROCESS_STEP) || [];
  let msg = '';
  if (!processStep.length) {
    message.info(<MessageContent>결재 정보가 없습니다.</MessageContent>);
    return false;
  }
  const ruleCheckList = processStep.filter(rule => rule.ISREQUIRED === 1);
  ruleCheckList.some(rule => {
    if (rule.APPV_MEMBER.length === 0) {
      msg = `${(rule && rule.RULE_CONFIG && rule.RULE_CONFIG.Label) || rule.NAME_KOR} 단계의 결재를 선택해 주세요`;
    }
    return msg;
  });

  if (msg) {
    message.info(<MessageContent>{msg}</MessageContent>);
    return false;
  }
  const result = await request({
    method: 'POST',
    url: '/api/workflow/v1/common/workprocess/draft',
    data: { DRAFT_PROCESS: { ...processRule, REL_TYPE: ESH_REL_TYPE } },
    json: true,
  }).then(({ response }) => {
    const draftId = (response && response.draftProcess && response.draftProcess.DRAFT_ID) || undefined;
    if (draftId) {
      if (messageFlag) message.info(<MessageContent>결재 요청이 완료되었습니다.</MessageContent>);
      return callBack(draftId);
      // return draftId;
    }
    if (messageFlag) message.info(<MessageContent>결재요청에 실패하였습니다.</MessageContent>);
    return callBack(draftId);
    // return draftId;
  });

  return result;
};
