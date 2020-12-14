/* eslint-disable camelcase */
import { useState, useMemo, useCallback, useEffect } from 'react';
import moment from 'moment';

import request from 'utils/request';

import alertMessage from '../../../../components/Notification/Alert';
import { getProcessRule, fillWorkFlowData, relTypeHandler, stepHandler } from '../../../../hooks/useWorkFlow';

// import parseFiles from '../../../../utils/parseFiles';

const dateValidateChecker = momentDates => {
  let result = false;
  const message = '스케줄을 확인하세요. (이전 스케줄 날짜보다 빠를 수 없습니다.)';
  result = !momentDates.some((momentDate, index) => {
    if (index === 0) {
      return false;
    }
    return momentDate.diff(momentDates[index - 1]) < 0;
  });
  return { result, message };
};

export default ({ info, dpCd = '', callback = () => {} }) => {
  const [isRedirect, setIsRedirect] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [draftData, setDraftData] = useState({});

  const defaultFormData = useMemo(() => {
    const { key_performance_indicators, current_status, goal, apply_target, note } =
      info?.project_type === 'W'
        ? {
            key_performance_indicators: 'FAB',
            current_status: 'Area',
            goal: '피해장수(수량)',
            apply_target: '요인(부서)',
            note: '발생일',
          }
        : {
            key_performance_indicators: '핵심성과지표',
            current_status: '현재 상태',
            goal: '목표',
            apply_target: '적용 대상',
            note: '비고',
          };

    const formData = [
      {
        type: 'text',
        classname: 'improve_form std width50 flCustom',
        option: {
          label: 'Project 명',
          name: 'title',
          placeholder: '',
          value: info?.title,
          required: true,
          readOnly: false,
        },
        seq: 1,
      },
      {
        type: 'text',
        classname: 'improve_form std width50 frCustom',
        option: {
          label: 'Project Leader',
          name: 'project_leader',
          placeholder: '',
          value: info?.project_leader,
          required: true,
          readOnly: true,
        },
        seq: 2,
      },
      {
        type: 'equip-selector',
        classname: 'improve_form std customColorDiv',
        option: {
          label: '장비모델명',
          values:
            JSON.parse(info?.equipment_model || '[]').map(item => {
              const itemValues = JSON.stringify(item)
                .replaceAll('"', '')
                .split(':');
              return {
                fab: itemValues[0],
                area: itemValues[1],
                keyno: itemValues[2],
                model: itemValues[3],
              };
            }) || [],
          readOnly: false,
        },
        seq: 3,
      },
      {
        type: 'radio-group',
        classname: 'improve_form ex',
        option: {
          label: 'Project Type',
          name: 'project_type',
          readOnly: true,
          values: [
            {
              label: '개별개선',
              value: 'G',
              readOnly: true,
              checked: info?.project_type === 'G',
            },
            {
              label: 'TFT',
              value: 'T',
              readOnly: true,
              checked: info?.project_type === 'T',
            },
            {
              label: 'Wafer Loss',
              value: 'W',
              readOnly: true,
              checked: info?.project_type === 'W',
            },
          ],
        },
        seq: 4,
      },
      {
        type: 'select',
        classname: 'improve_form std width50 flCustom',
        option: {
          label: 'Level',
          name: 'project_level',
          disabled: true,
          values: [
            { label: '본부', value: 1, selected: info?.project_level === 1 },
            { label: '담당', value: 2, selected: info?.project_level === 2 },
            { label: '팀', value: 3, selected: info.project_level === 3 },
            { label: 'Part', value: 4, selected: info?.project_level === 4 },
          ],
        },
        seq: 5,
      },
      {
        type: 'select',
        classname: 'improve_form std width50 frCustom marginNone',
        option: {
          label: 'Performance Type',
          name: 'performance_type',
          disabled: true,
          values: [
            {
              label: 'Cost',
              value: 'C',
              selected: info?.performance_type === 'C',
            },
            {
              label: 'Delivery',
              value: 'D',
              selected: info?.performance_type === 'D',
            },
            {
              label: 'Morale',
              value: 'M',
              selected: info?.performance_type === 'M',
            },
            {
              label: 'Productivity',
              value: 'P',
              selected: info?.performance_type === 'P',
            },
            {
              label: 'Quality',
              value: 'Q',
              selected: info?.performance_type === 'Q',
            },
            {
              label: 'Safety',
              value: 'S',
              selected: info?.performance_type === 'S',
            },
          ],
        },
        seq: 6,
      },
      {
        type: 'textarea',
        classname: 'improve_form width20 flCustom',
        option: {
          label: key_performance_indicators,
          name: 'key_performance_indicators',

          placeholder: '',
          value: info?.key_performance_indicators,
          required: true,
          maxLength: 450,
          readOnly: false,
        },
        seq: 7,
      },
      {
        type: 'textarea',
        classname: 'improve_form width20 flCustom',
        option: {
          label: current_status,
          name: 'current_status',
          placeholder: '',
          value: info?.current_status,
          required: true,
          maxLength: 450,
          readOnly: false,
        },
        seq: 8,
      },
      {
        type: 'textarea',
        classname: 'improve_form width20 flCustom',
        option: {
          label: goal,
          name: 'goal',
          placeholder: '',
          value: info?.goal,
          required: true,
          maxLength: 450,
          readOnly: false,
        },
        seq: 9,
      },
      {
        type: 'textarea',
        classname: 'improve_form width20 flCustom',
        option: {
          label: apply_target,
          name: 'apply_target',
          placeholder: '',
          value: info?.apply_target,
          required: true,
          maxLength: 450,
          readOnly: false,
        },
        seq: 10,
      },
      {
        type: 'textarea',
        classname: 'improve_form width20 flCustom marginNone',
        option: {
          label: note,
          name: 'note',
          placeholder: '',
          value: info?.note,
          required: true,
          maxLength: 450,
          readOnly: false,
        },
        seq: 11,
      },
      {
        type: 'textarea',
        classname: 'improve_form width50 flCustom',
        option: {
          label: '프로젝트를 시작하게 된 배경 ',
          name: 'project_reason',
          placeholder: '',
          value: info?.problem_improvement,
          required: true,
          maxLength: 450,
          readOnly: false,
        },
        seq: 12,
      },
      {
        type: 'textarea',
        classname: 'improve_form width50 frCustom',
        option: {
          label: '문제점/개선',
          name: 'problem_improvement',
          placeholder: '',
          value: info?.problem_improvement,
          required: true,
          maxLength: 450,
          readOnly: false,
        },
        seq: 13,
      },
      {
        type: 'textarea',
        classname: 'improve_form width50 flCustom',
        option: {
          label: '해결 방법',
          name: 'solution',
          placeholder: '',
          value: info?.solution,
          required: true,
          maxLength: 450,
          readOnly: false,
        },
        seq: 14,
      },
      {
        type: 'textarea',
        classname: 'improve_form width50 frCustom',
        option: {
          label: '범위',
          name: 'scope',
          placeholder: '',
          value: info?.scope,
          required: true,
          maxLength: 450,
          readOnly: false,
        },
        seq: 15,
      },
      {
        type: 'date-picker-group',
        classname: 'improve_form ex width50 flCustom',
        option: {
          label: '스케줄',
          items: [
            {
              label: '현상파악',
              type: 'range',
              values: [
                {
                  name: 'situation_analyze_start_date',
                  value: info?.situation_analyze_start_date
                    ? moment(info?.situation_analyze_start_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD')
                    : undefined,
                  readOnly: false,
                  required: true,
                },
                {
                  name: 'situation_analyze_end_date',
                  value: info?.situation_analyze_end_date
                    ? moment(info?.situation_analyze_end_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD')
                    : undefined,
                  readOnly: false,
                  required: true,
                },
              ],
            },
            {
              label: '원인분석',
              type: 'single',
              values: [
                {
                  name: 'cause_analyze_due_date',
                  value: info?.cause_analyze_due_date ? moment(info?.cause_analyze_due_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYYMMDD') : undefined,
                  readOnly: false,
                  required: true,
                },
              ],
            },
            {
              label: '대책수립',
              type: 'single',
              values: [
                {
                  name: 'measure_due_date',
                  value: info?.measure_due_date ? moment(info?.measure_due_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYYMMDD') : undefined,
                  readOnly: false,
                  required: true,
                },
              ],
            },
            {
              label: '개선',
              type: 'single',
              values: [
                {
                  name: 'improvement_due_date',
                  value: info?.improvement_due_date ? moment(info?.improvement_due_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYYMMDD') : undefined,
                  readOnly: false,
                  required: true,
                },
              ],
            },
            {
              label: '완료/공유',
              type: 'single',
              values: [
                {
                  name: 'completion_due_date',
                  value: info?.completion_due_date ? moment(info?.completion_due_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYYMMDD') : undefined,
                  readOnly: false,
                  required: true,
                },
              ],
            },
          ],
        },
        seq: 16,
      },
    ];

    // Status값에 따른 추가 Form 정보
    if (info.step_one_complete_date !== null) {
      formData.push({
        type: 'textarea',
        classname: 'improve_form std',
        option: {
          label: '현상파악 리더 코멘트',
          name: 'step_one_comment',
          placeholder: '코멘트를 남겨주세요.',
          value: info?.step_one_comment,
          required: false,
          readOnly: false,
          maxLength: 450,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'single-uploader',
        classname: 'improve_form std',
        option: {
          label: '현상파악 파일첨부',
          name: 'step_one_attach',
          filePath: info?.step_one_file_path,
          fileName: info?.step_one_file_name,
          readOnly: false,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'text',
        classname: 'improve_form std',
        option: {
          label: '현상파악 완료일자',
          name: 'step_one_complete_date',
          value: info?.step_one_complete_date ? moment(info?.step_one_complete_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD') : '',
          readOnly: true,
        },
        seq: formData.length + 1,
      });
    }
    if (info.step_two_complete_date !== null) {
      formData.push({
        type: 'textarea',
        classname: 'improve_form std',
        option: {
          label: '원인분석 리더 코멘트',
          name: 'step_two_comment',
          placeholder: '코멘트를 남겨주세요.',
          value: info?.step_two_comment,
          required: false,
          readOnly: false,
          maxLength: 450,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'single-uploader',
        classname: 'improve_form std',
        option: {
          label: '원인분석 파일첨부',
          name: 'step_two_attach',
          filePath: info?.step_two_file_path,
          fileName: info?.step_two_file_name,
          readOnly: false,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'text',
        classname: 'improve_form std',
        option: {
          label: '원인분석 완료일자',
          name: 'step_two_complete_date',
          value: info?.step_two_complete_date ? moment(info?.step_two_complete_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD') : '',
          readOnly: true,
        },
        seq: formData.length + 1,
      });
    }

    if (info.step_three_complete_date !== null) {
      formData.push({
        type: 'textarea',
        classname: 'improve_form std',
        option: {
          label: '대책수립 리더 코멘트',
          name: 'step_three_comment',
          placeholder: '코멘트를 남겨주세요.',
          value: info?.step_three_comment,
          required: false,
          readOnly: false,
          maxLength: 450,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'single-uploader',
        classname: 'improve_form std',
        option: {
          label: '대책수립 파일첨부',
          name: 'step_three_attach',
          filePath: info?.step_three_file_path,
          fileName: info?.step_three_file_name,
          readOnly: false,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'text',
        classname: 'improve_form std',
        option: {
          label: '대책수립 완료일자',
          name: 'step_three_complete-date',
          value: info?.step_three_complete_date ? moment(info?.step_three_complete_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD') : '',
          readOnly: true,
        },
        seq: formData.length + 1,
      });
    }

    if (info.step_four_complete_date !== null) {
      formData.push({
        type: 'textarea',
        classname: 'improve_form std',
        option: {
          label: '개선 리더 코멘트',
          name: 'step_four_comment',
          placeholder: '코멘트를 남겨주세요.',
          value: info?.step_four_comment,
          required: false,
          readOnly: false,
          maxLength: 450,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'single-uploader',
        classname: 'improve_form std',
        option: {
          label: '개선 파일첨부',
          name: 'step_four_attach',
          filePath: info?.step_four_file_path,
          fileName: info?.step_four_file_name,
          readOnly: false,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'text',
        classname: 'improve_form std',
        option: {
          label: '개선 완료일자',
          name: 'step_four_complete_date',
          value: info?.step_four_complete_date ? moment(info?.step_four_complete_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD') : '',
          readOnly: true,
        },
        seq: formData.length + 1,
      });
    }

    if (info.step_five_complete_date !== null) {
      formData.push({
        type: 'textarea',
        classname: 'improve_form std',
        option: {
          label: '완료/공유 리더 코멘트',
          name: 'step_five_comment',
          placeholder: '코멘트를 남겨주세요.',
          value: info?.step_five_comment,
          required: false,
          readOnly: false,
          maxLength: 450,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'single-uploader',
        classname: 'improve_form std',
        option: {
          label: '완료/공유 파일첨부',
          name: 'step_five_attach',
          filePath: info?.step_five_file_path,
          fileName: info?.step_five_file_name,
          readOnly: false,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'text',
        classname: 'improve_form std',
        option: {
          label: '완료/공유 완료일자',
          name: 'step_five_complete_date',
          value: info.step_five_complete_date ? moment(info?.step_five_complete_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD') : '',
          readOnly: true,
        },
        seq: formData.length + 1,
      });
    }

    if (info.improvement_point !== null) {
      formData.push({
        type: 'textarea',
        classname: 'improve_form std',
        option: {
          label: '개선사항',
          name: 'improvement_point',
          placeholder: '개선사항을 남겨주세요.',
          value: info?.improvement_point,
          readOnly: false,
          required: false,
          maxLength: 450,
        },
        seq: formData.length + 1,
      });
    }
    if (info.success_point !== null) {
      formData.push({
        type: 'textarea',
        classname: 'improve_form std',
        option: {
          label: '성공요인',
          name: 'success_point',
          placeholder: '성공요인을 남겨주세요.',
          value: info?.success_point,
          readOnly: false,
          required: false,
          maxLength: 450,
        },
        seq: formData.length + 1,
      });
    }
    if (info.real_complete_file_name !== null) {
      formData.push({
        type: 'single-uploader',
        classname: 'improve_form std',
        option: {
          label: '완료 파일첨부',
          name: 'ATTACH',
          filePath: info?.real_complete_file_path,
          fileName: info?.real_complete_file_name,
          readOnly: false,
        },
        seq: formData.length + 1,
      });
    }
    return formData;
  }, [info]);

  const sharingSelector = useMemo(
    () => [
      {
        type: 'employee-selector',
        option: {
          label: 'Sharing',
          onlySingle: true,
          values: [
            {
              key: 1,
              label: '',
              values: info?.sharer || [],
              type: 'MULTI',
            },
          ],
        },
        seq: 1,
      },
    ],
    [info],
  );

  const postData = useCallback(async payload => {
    // const url = '/apigate/v1/portal/sign/task';

    const { response } = await request({
      url: `/api/tpms/v1/common/approval`,
      method: 'PUT',
      data: payload,
    });

    const { result, req, error } = response;
    return { result, req, error };
  }, []);

  const submitData = e => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.target);
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });

    const {
      situation_analyze_start_date,
      situation_analyze_end_date,
      cause_analyze_due_date,
      measure_due_date,
      improvement_due_date,
      completion_due_date,
    } = payload;
    const dueDates = [
      moment(moment(situation_analyze_start_date, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00')),
      moment(moment(situation_analyze_end_date, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00')),
      moment(moment(cause_analyze_due_date, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00')),
      moment(moment(measure_due_date, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00')),
      moment(moment(improvement_due_date, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00')),
      moment(moment(completion_due_date, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00')),
    ];
    const equipment_model = JSON.parse(payload.equipment_model).map(equip => `${equip.fab}:${equip.area}:${equip.keyno}:${equip.model}`);

    if (equipment_model.length < 1) {
      alertMessage.alert('선택된 장비가 없습니다.');
      return;
    }
    if (
      !payload.situation_analyze_start_date ||
      !payload.situation_analyze_end_date ||
      !payload.cause_analyze_due_date ||
      !payload.measure_due_date ||
      !payload.improvement_due_date ||
      !payload.completion_due_date
    ) {
      alertMessage.alert('스케줄 날짜가 미설정 되었습니다.');
      return;
    }

    const validatedDueDates = dateValidateChecker(dueDates);
    if (!validatedDueDates.result) {
      alertMessage.alert(validatedDueDates.message);
      return;
    }

    payload.equipment_model = JSON.stringify(equipment_model);

    setIsLoading(true);
    setIsSubmit(true);
    setDraftData(payload);
  };

  useEffect(() => {
    if (isLoading && isSubmit) {
      getProcessRule().then(prcRule => {
        fillWorkFlowData(prcRule, { ...info, ...draftData, rel_type: relTypeHandler({ step: info?.step }) }).then(submitResult => {
          if (submitResult) {
            postData({ ...info, ...draftData, step: stepHandler({ step: info?.step }) })
              .then(({ result, req, error }) => {
                if (result && !error) {
                  alertMessage.notice('제출 완료');
                  setIsRedirect(true);
                  setIsLoading(false);
                  callback();
                } else {
                  setIsError(true);
                  setIsLoading(false);
                  alertMessage.alert('Server Error');
                  callback();
                }
              })
              .catch(() => {
                alertMessage.alert('Server Error');
                setIsLoading(false);
                setIsError(true);
                callback();
              });
          }
        });
      });
    }
  }, [isLoading, isSubmit, draftData]);

  return {
    isLoading,
    isError,
    defaultFormData,
    sharingSelector,
    isRedirect,
    actions: {
      submitData,
    },
  };
};
