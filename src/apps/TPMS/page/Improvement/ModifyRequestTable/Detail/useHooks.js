/* eslint-disable camelcase */
import { useState, useMemo, useCallback } from 'react';
import moment from 'moment';

import request from 'utils/request';

import alertMessage from '../../../../components/Notification/Alert';
import parseFiles from '../../../../utils/parseFiles';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
          name: 'PRJ_TITLE',
          placeholder: '',
          value: info.PRJ_TITLE,
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
          name: 'PRJ_LEADER_NAME',
          placeholder: '',
          value: info.PRJ_LEADER_NAME,
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
            info.EQUIPMENTS.map(item => {
              const itemValues = item.itemvalue.split(':');
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
          name: 'PRJ_TYPE',
          readOnly: true,
          values: [
            {
              label: '개별개선',
              value: 'G',
              readOnly: true,
              checked: info.PRJ_TYPE === 'G',
            },
            {
              label: 'TFT',
              value: 'T',
              readOnly: true,
              checked: info.PRJ_TYPE === 'T',
            },
            {
              label: 'Wafer Loss',
              value: 'W',
              readOnly: true,
              checked: info.PRJ_TYPE === 'W',
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
          name: 'PRJ_LEVEL',
          disabled: true,
          values: [
            { label: '본부', value: 1, selected: info?.project_type === 1 },
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
                  value: info?.cause_analyze_due_date ? moment(info?.cause_analyze_due_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYYMMDD') : undefined,
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
                  name: 'IMPROVE_DUE_DATE',
                  value: info.IMPROVE_DUE_DATE ? moment(info.IMPROVE_DUE_DATE.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYYMMDD') : undefined,
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
                  name: 'CONTROL_DUE_DATE',
                  value: info.CONTROL_DUE_DATE ? moment(info.CONTROL_DUE_DATE.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYYMMDD') : undefined,
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
    if (info.phase > 1 || info.status.substr(0, 2) === '완료') {
      formData.push({
        type: 'textarea',
        classname: 'improve_form std',
        option: {
          label: '현상파악 리더 코멘트',
          name: 'DEFINE_LEADER_COMMENT',
          placeholder: '코멘트를 남겨주세요.',
          value: info.DEFINE_LEADER_COMMENT,
          required: true,
          readOnly: true,
          maxLength: 450,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'single-uploader',
        classname: 'improve_form std',
        option: {
          label: '현상파악 파일첨부',
          name: 'DEFINE_ATTACH',
          filePath: info.DEFINE_ATTACH_FILE_PATH,
          fileName: info.DEFINE_ATTACH_FILE,
          readOnly: true,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'text',
        classname: 'improve_form std',
        option: {
          label: '현상파악 완료일자',
          name: 'DEFINE_APPROVAL_DATE',
          value: info.DEFINE_APPROVAL_DATE ? moment(info.DEFINE_APPROVAL_DATE.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD') : '',
          readOnly: true,
        },
        seq: formData.length + 1,
      });
    }
    if (info.phase > 2 || info.status.substr(0, 2) === '완료') {
      formData.push({
        type: 'textarea',
        classname: 'improve_form std',
        option: {
          label: '원인분석 리더 코멘트',
          name: 'MEASURE_LEADER_COMMENT',
          placeholder: '코멘트를 남겨주세요.',
          value: info.MEASURE_LEADER_COMMENT,
          required: true,
          readOnly: true,
          maxLength: 450,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'single-uploader',
        classname: 'improve_form std',
        option: {
          label: '원인분석 파일첨부',
          name: 'MEASURE_ATTACH',
          filePath: info.MEASURE_ATTACH_FILE_PATH,
          fileName: info.MEASURE_ATTACH_FILE,
          readOnly: true,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'text',
        classname: 'improve_form std',
        option: {
          label: '원인분석 완료일자',
          name: 'MEASURE_APPROVAL_DATE',
          value: info.MEASURE_APPROVAL_DATE ? moment(info.MEASURE_APPROVAL_DATE.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD') : '',
          readOnly: true,
        },
        seq: formData.length + 1,
      });
    }
    if (info.phase > 3 || info.status.substr(0, 2) === '완료') {
      formData.push({
        type: 'textarea',
        classname: 'improve_form std',
        option: {
          label: '대책수립 리더 코멘트',
          name: 'ANALYZE_LEADER_COMMENT',
          placeholder: '코멘트를 남겨주세요.',
          value: info.ANALYZE_LEADER_COMMENT,
          required: true,
          readOnly: true,
          maxLength: 450,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'single-uploader',
        classname: 'improve_form std',
        option: {
          label: '대책수립 파일첨부',
          name: 'ANALYZE_ATTACH',
          filePath: info.ANALYZE_ATTACH_FILE_PATH,
          fileName: info.ANALYZE_ATTACH_FILE,
          readOnly: true,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'text',
        classname: 'improve_form std',
        option: {
          label: '대책수립 완료일자',
          name: 'ANALYZE_APPROVAL_DATE',
          value: info.ANALYZE_APPROVAL_DATE ? moment(info.ANALYZE_APPROVAL_DATE.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD') : '',
          readOnly: true,
        },
        seq: formData.length + 1,
      });
    }
    if (info.phase > 4 || info.status.substr(0, 2) === '완료') {
      formData.push({
        type: 'textarea',
        classname: 'improve_form std',
        option: {
          label: '개선 리더 코멘트',
          name: 'IMPROVE_LEADER_COMMENT',
          placeholder: '코멘트를 남겨주세요.',
          value: info.IMPROVE_LEADER_COMMENT,
          required: true,
          readOnly: true,
          maxLength: 450,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'single-uploader',
        classname: 'improve_form std',
        option: {
          label: '개선 파일첨부',
          name: 'IMPROVE_ATTACH',
          filePath: info.IMPROVE_ATTACH_FILE_PATH,
          fileName: info.IMPROVE_ATTACH_FILE,
          readOnly: true,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'text',
        classname: 'improve_form std',
        option: {
          label: '개선 완료일자',
          name: 'IMPROVE_APPROVAL_DATE',
          value: info.IMPROVE_APPROVAL_DATE ? moment(info.IMPROVE_APPROVAL_DATE.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD') : '',
          readOnly: true,
        },
        seq: formData.length + 1,
      });
    }
    if (info.status.substr(0, 2) === '완료') {
      formData.push({
        type: 'textarea',
        classname: 'improve_form std',
        option: {
          label: '완료/공유 리더 코멘트',
          name: 'CONTROL_LEADER_COMMENT',
          placeholder: '코멘트를 남겨주세요.',
          value: info.CONTROL_LEADER_COMMENT,
          required: true,
          readOnly: true,
          maxLength: 450,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'single-uploader',
        classname: 'improve_form std',
        option: {
          label: '완료/공유 파일첨부',
          name: 'CONTROL_ATTACH',
          filePath: info.CONTROL_ATTACH_FILE_PATH,
          fileName: info.CONTROL_ATTACH_FILE,
          readOnly: true,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'text',
        classname: 'improve_form std',
        option: {
          label: '완료/공유 완료일자',
          name: 'CONTROL_APPROVAL_DATE',
          value: info.CONTROL_APPROVAL_DATE ? moment(info.CONTROL_APPROVAL_DATE.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD') : '',
          readOnly: true,
        },
        seq: formData.length + 1,
      });
    }
    if (info.status.substr(0, 2) === '완료') {
      formData.push({
        type: 'textarea',
        classname: 'improve_form std',
        option: {
          label: '개선사항',
          name: 'IMPROVE_CONTENT',
          placeholder: '개선사항을 남겨주세요.',
          value: info.IMPROVE_CONTENT,
          readOnly: false,
          required: true,
          maxLength: 450,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'textarea',
        classname: 'improve_form std',
        option: {
          label: '성공요인',
          name: 'SUCCESS_REASON',
          placeholder: '성공요인을 남겨주세요.',
          value: info.SUCCESS_REASON,
          readOnly: false,
          required: true,
          maxLength: 450,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'single-uploader',
        classname: 'improve_form std',
        option: {
          label: '완료 파일첨부',
          name: 'ATTACH',
          filePath: info.ATTACH_FILE_PATH,
          fileName: info.ATTACH_FILE,
          readOnly: false,
        },
        seq: formData.length + 1,
      });
    }

    return formData;
  }, [info, dpCd]);

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
              values: (info.member || []).map(item => ({
                emrno: item.usrid,
                usrnm: item.usrnm,
                jgnm: item.jgnm || '',
                usrid: item.usrid,
              })),
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
    const url = '/apigate/v1/portal/sign/task';
    const { response, error } = request({
      url,
      method: 'POST',
      data: payload,
    });

    return { response, error };
  }, []);

  const submitData = e => {
    e.preventDefault();
    e.stopPropagation();

    console.debug('@@@ submitData ???');

    const formData = new FormData(e.target);
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });

    const { DEFINE_DUE_DATE, MEASURE_DUE_DATE, ANALYZE_DUE_DATE, IMPROVE_DUE_DATE, CONTROL_DUE_DATE } = payload;
    const dueDates = [
      moment(moment(DEFINE_DUE_DATE, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00')),
      moment(moment(MEASURE_DUE_DATE, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00')),
      moment(moment(ANALYZE_DUE_DATE, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00')),
      moment(moment(IMPROVE_DUE_DATE, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00')),
      moment(moment(CONTROL_DUE_DATE, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00')),
    ];
    const signref = JSON.parse(formData.user_selector_0 || '[]').map(user => user.usrid);
    const { files } = parseFiles(formData);
    const items = JSON.parse(payload.equip_selector).map(equip => `${equip.fab}:${equip.area}:${equip.keyno}:${equip.model}`);
    if (items.length < 1) {
      alertMessage.alert('선택된 장비가 없습니다.');
      return;
    }
    if (
      !payload.START_DATE ||
      !payload.DEFINE_DUE_DATE ||
      !payload.MEASURE_DUE_DATE ||
      !payload.ANALYZE_DUE_DATE ||
      !payload.IMPROVE_DUE_DATE ||
      !payload.CONTROL_DUE_DATE
    ) {
      alertMessage.alert('스케줄 날짜가 미설정 되었습니다.');
      return;
    }

    const validatedDueDates = dateValidateChecker(dueDates);
    if (!validatedDueDates.result) {
      alertMessage.alert(validatedDueDates.message);
      return;
    }

    payload.items = items;
    payload.mnuid = 'TPMS1040';
    payload.signref = signref;
    payload.files = files;

    setIsLoading(true);

    postData(payload)
      .then(({ response, error }) => {
        if (response && !error) {
          const { insertyn } = response;
          if (insertyn && callback) {
            callback();
          }
          alertMessage.notice('등록하였습니다.');
        } else {
          setIsError(true);
          alertMessage.alert('등록이 실패했습니다.');
        }
      })
      .catch(() => {
        setIsError(true);
      });

    setIsLoading(false);
  };

  return {
    isLoading,
    isError,
    defaultFormData,
    sharingSelector,
    actions: {
      submitData,
    },
  };
};
