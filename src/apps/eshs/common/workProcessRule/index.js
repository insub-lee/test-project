import React from 'react';
import request from 'utils/request';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

export const ESH_REL_TYPE = 100;

const getStatusName = status => {
  switch (status) {
    case 2:
      return '승';
    case 9:
      return '부';
    default:
      return '';
  }
};
export const getProcessRule = async (PRC_ID, callBack) => {
  const result = await request({
    method: 'POST',
    url: '/api/workflow/v1/common/workprocess/defaultPrcRuleHanlder',
    data: { PARAM: { PRC_ID } },
    json: true,
  });
  return typeof callBack === 'function' ? callBack(result?.response?.DRAFT_PROCESS || {}) : result?.response?.DRAFT_PROCESS || {};
};

export const getDraftProcessRule = async (DRAFT_ID, callBack) => {
  const result = await request({
    method: 'POST',
    url: '/api/workflow/v1/common/workprocess/draftPrcRuleHanlder',
    data: { PARAM: { DRAFT_ID } },
    json: true,
  });
  return typeof callBack === 'function' ? callBack(result?.response?.draftPrcRule || {}) : result?.response?.draftPrcRule || {};
};

export const getAppLineText = async (DRAFT_ID, callBack) => {
  if (!DRAFT_ID) {
    return typeof callBack === 'function' ? callBack('') : '';
  }
  const result = await request({
    method: 'POST',
    url: '/api/workflow/v1/common/workprocess/draftPrcRuleHanlder',
    data: { PARAM: { DRAFT_ID } },
    json: true,
  });

  const users = result?.response?.draftPrcRule?.processStepUsers || [];
  let appLineText = '';
  if (0 in users) {
    users.forEach((user, index) => {
      if (index) {
        appLineText += `, ${user?.RULE_CONFIG?.Label || ''}:${user?.USER_INFO?.NAME_KOR || ''}(${getStatusName(user?.APPV_STATUS)})`;
      } else {
        appLineText += `${user?.RULE_CONFIG?.Label || ''}:${user?.USER_INFO?.NAME_KOR || ''}(${getStatusName(user?.APPV_STATUS)})`;
      }
    });
  }

  return typeof callBack === 'function' ? callBack(appLineText) : appLineText;
};

export const saveProcessRule = async (processRule, callBack = () => {}, messageFlag = true) => {
  const processStep = processRule?.DRAFT_PROCESS_STEP || [];
  let msg = '';
  if (!processStep.length) {
    message.info(<MessageContent>결재자 정보가 없습니다.</MessageContent>);
    return false;
  }
  processStep
    .filter(step => step.ISREQUIRED === 1)
    .some(step => {
      if (!(0 in step?.APPV_MEMBER)) {
        msg = `${step?.RULE_CONFIG?.Label || step.NAME_KOR} 단계의 결재를 선택해 주세요`;
      }
      return msg;
    });

  if (msg) {
    message.info(<MessageContent>{msg}</MessageContent>);
    return false;
  }
  /* process에서 결재 불필요로 체크, 결재자정보가 없을경우 결재STEP에서 제외 로직 */
  /* 결재 필수체크(0) 불필요이고 결재자정보가 없고 NODE_ID(ESHS결재자(135), 프로세스 종료(113))가 아닐경우 STEP에서 제외 */
  const processStepWithOutNullApprover = processStep
    .filter(step => !(step.ISREQUIRED === 0 && !(0 in step?.APPV_MEMBER) && step.NODE_ID !== 135 && step.NODE_ID !== 113))
    .map((step, index, filterArray) => {
      if (step.NODE_ID === 135) return step; // ESHS결재자 노드일경우 STEP정보 그대로
      return { ...step, STEP: index + 1, PARENT_PRC_RULE_ID: filterArray[index - 1].PRC_RULE_ID };
    });

  const result = await request({
    method: 'POST',
    url: '/api/workflow/v1/common/workprocess/draft',
    data: { DRAFT_PROCESS: { ...processRule, DRAFT_PROCESS_STEP: processStepWithOutNullApprover, REL_TYPE: ESH_REL_TYPE } },
    json: true,
  }).then(({ response }) => {
    const draftId = response?.draftProcess?.DRAFT_ID;
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
