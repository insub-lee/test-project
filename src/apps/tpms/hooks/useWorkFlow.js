/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import React from 'react';
import request from 'utils/request';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

export const useWorkFlow = () => {};

export const stepChanger = async (task_seq, step, payload) => {
  const response = await request({
    method: 'POST',
    url: '/api/tpms/v1/common/approvalSide',
    data: { ...payload, task_seq, step, type: 'step' },
    type: 'step',
  });
  const { result, error, req } = response?.response;
  return { result, error, req };
};

export const submitDraft = async (data, APPV_STATUS, OPINION) => {
  const payload = {
    ISFORMDATA: false,
    QUE_ID: data?.QUE_ID,
    APPV_STATUS,
    QUE_DATA: { QUE_ID: data?.QUE_ID, PRC_ID: data?.PRC_ID, OPINION, APPV_STATUS, DRAFT_DATA: { data, ISWAIT: '0' } },
    FORM_DATA: data,
  };
  const result = await request({
    method: 'POST',
    url: '/api/workflow/v1/common/workprocess/draftApprove',
    data: { PARAM: { ...payload } },
    json: true,
  });
  return result?.response;
};

export const getProcessRule = async () => {
  const tpms_prc_id = 118;
  const result = await request({
    method: 'POST',
    url: '/api/workflow/v1/common/workprocess/defaultPrcRuleHanlder',
    data: { PARAM: { PRC_ID: tpms_prc_id } },
    json: true,
  });
  return result?.response?.DRAFT_PROCESS || {};
};

export const saveProcessRule = async (processRule, messageFlag = true) => {
  const processStep = processRule?.DRAFT_PROCESS_STEP || [];
  let msg = '';
  if (!processStep.length) {
    message.info(<MessageContent>결재 정보가 없습니다.</MessageContent>);
    return false;
  }

  if (msg) {
    message.info(<MessageContent>{msg}</MessageContent>);
    return false;
  }
  /* process에서 결재 불필요로 체크, 결재자정보가 없을경우 결재STEP에서 제외 로직 */
  /* 결재 필수체크(0) 불필요이고 결재자정보가 없고 NODE_ID(ESHS결재자(135), 프로세스 종료(113))가 아닐경우 STEP에서 제외 */
  //   const processStepWithOutNullApprover = processStep
  //     .filter(step => !(step.ISREQUIRED === 0 && !(0 in step?.APPV_MEMBER) && step.NODE_ID !== 135 && step.NODE_ID !== 113))
  //     .map((step, index, filterArray) => {
  //       if (step.NODE_ID === 135) return step; // ESHS결재자 노드일경우 STEP정보 그대로
  //       return { ...step, STEP: index + 1, PARENT_PRC_RULE_ID: filterArray[index - 1].PRC_RULE_ID };
  //     });

  const result = await request({
    method: 'POST',
    url: '/api/workflow/v1/common/workprocess/draft',
    data: { DRAFT_PROCESS: { ...processRule } },
    json: true,
  }).then(({ response }) => {
    const draftId = response?.draftProcess?.DRAFT_ID;
    if (draftId) {
      if (messageFlag) message.info(<MessageContent>결재 요청이 완료되었습니다.</MessageContent>);
      return true;
      // return draftId;
    }
    if (messageFlag) message.info(<MessageContent>결재요청에 실패하였습니다.</MessageContent>);
    return false;
    // return draftId;
  });

  return result;
};

export const fillWorkFlowData = async (prcRule, payload) => {
  const first_approver = JSON.parse(payload?.first_approver, '[]');
  const final_approver = JSON.parse(payload?.final_approver, '[]');
  if (prcRule?.DRAFT_PROCESS_STEP && first_approver.length > 0 && final_approver.length > 0) {
    prcRule?.DRAFT_PROCESS_STEP.forEach((step, index) => {
      switch (index) {
        case 1: {
          if (first_approver[0]?.user_id) {
            const {
              user_id: USER_ID,
              dept_id: DEPT_ID,
              pstn_name_kor: PSTN_NAME_KOR,
              dept_name_kor: DEPT_NAME_KOR,
              name_kor: NAME_KOR,
              emp_no: EMP_NO,
            } = first_approver[0];
            step.APPV_MEMBER = [
              {
                USER_ID,
                DEPT_ID,
                DEPT_NAME_KOR,
                NAME_KOR,
                PSTN_NAME_KOR,
                EMP_NO,
              },
            ];
          }
          break;
        }
        case 2:
          if (final_approver[0]?.user_id) {
            const {
              user_id: USER_ID,
              dept_id: DEPT_ID,
              pstn_name_kor: PSTN_NAME_KOR,
              dept_name_kor: DEPT_NAME_KOR,
              name_kor: NAME_KOR,
              emp_no: EMP_NO,
            } = final_approver[0];
            step.APPV_MEMBER = [
              {
                USER_ID,
                DEPT_ID,
                DEPT_NAME_KOR,
                NAME_KOR,
                PSTN_NAME_KOR,
                EMP_NO,
              },
            ];
          }
          break;
        default: {
          break;
        }
      }
    });

    return saveProcessRule({
      ...prcRule,
      WORK_SEQ: payload?.work_seq,
      TASK_SEQ: payload?.task_seq,
      REL_KEY: 'TPMS',
      REL_TYPE: payload?.rel_type,
      DRAFT_DATA: {},
      DRAFT_TITLE: `${payload?.title}`,
    });
  }
  return false;
};
