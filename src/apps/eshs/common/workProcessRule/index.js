import React from 'react';
import request from 'utils/request';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

export const ESH_REL_TYPE = 100;

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

export const saveProcessRule = async processRule => {
  const processStep = (processRule && processRule.DRAFT_PROCESS_STEP) || [];
  let msg = '';
  if (!processStep.length) return message.info(<MessageContent>결재 정보가 없습니다.</MessageContent>);

  const ruleCheckList = processStep.filter(rule => rule.ISREQUIRED === 1);
  ruleCheckList.some(rule => {
    if (rule.APPV_MEMBER.length === 0) {
      msg = `${rule.NAME_KOR} 단계의 결재를 선택해 주세요`;
    }
    return msg;
  });

  if (msg) return message.info(<MessageContent>{msg}</MessageContent>);

  const result = await request({
    method: 'POST',
    url: '/api/workflow/v1/common/workprocess/draft',
    data: { DRAFT_PROCESS: { ...processRule, REL_TYPE: ESH_REL_TYPE } },
    json: true,
  });
  return (result.response && result.response.draftProcess) || {};
};
