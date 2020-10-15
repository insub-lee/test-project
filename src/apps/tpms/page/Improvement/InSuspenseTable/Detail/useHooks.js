import { useMemo, useRef, useCallback, useState } from 'react';
import moment from 'moment';
import request from 'utils/request';

import alertMessage from '../../../../components/Notification/Alert';

export default ({ info, dpCd = '', callback = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const formRef = useRef();
  const defaultFormData = useMemo(() => {
    const { ctqLabel, yvalLabel, baselinevalLabel, targetvalLabel, remarkLabel } =
      info.PRJ_TYPE === 'W'
        ? {
            ctqLabel: 'FAB',
            yvalLabel: 'Area',
            baselinevalLabel: '피해장수(수량)',
            targetvalLabel: '요인(부서)',
            remarkLabel: '발생일',
          }
        : {
            ctqLabel: '핵심성과지표',
            yvalLabel: '현재 상태',
            baselinevalLabel: '목표',
            targetvalLabel: '적용 대상',
            remarkLabel: '비고',
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
          readOnly: true,
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
          readOnly: true,
        },
        seq: 3,
      },
      {
        type: 'radio-group',
        classname: 'improve_form ex',
        option: {
          label: 'Project Type',
          name: 'PRJ_TYPE',
          values: [
            {
              label: '개별개선',
              value: 'G',
              checked: info.PRJ_TYPE === 'G',
              readOnly: true,
            },
            {
              label: 'TFT',
              value: 'T',
              checked: info.PRJ_TYPE === 'T',
              readOnly: true,
            },
            {
              label: 'Wafer Loss',
              value: 'W',
              checked: info.PRJ_TYPE === 'W',
              readOnly: true,
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
          readOnly: true,
          values: [
            { label: '본부', value: '1', selected: info.PRJ_LEVEL === '1' },
            { label: '담당', value: '2', selected: info.PRJ_LEVEL === '2' },
            { label: '팀', value: '3', selected: info.PRJ_LEVEL === '3' },
            { label: 'Part', value: '4', selected: info.PRJ_LEVEL === '4' },
          ],
        },
        seq: 5,
      },
      {
        type: 'select',
        classname: 'improve_form std width50 frCustom marginNone',
        option: {
          label: 'Performance Type',
          name: 'PERFORM_TYPE',
          disabled: true,
          readOnly: true,
          values: [
            {
              label: 'Cost',
              value: 'C',
              selected: info.PERFORM_TYPE === 'C',
            },
            {
              label: 'Delivery',
              value: 'D',
              selected: info.PERFORM_TYPE === 'D',
            },
            {
              label: 'Morale',
              value: 'M',
              selected: info.PERFORM_TYPE === 'M',
            },
            {
              label: 'Productivity',
              value: 'P',
              selected: info.PERFORM_TYPE === 'P',
            },
            {
              label: 'Quality',
              value: 'Q',
              selected: info.PERFORM_TYPE === 'Q',
            },
            {
              label: 'Safety',
              value: 'S',
              selected: info.PERFORM_TYPE === 'S',
            },
          ],
        },
        seq: 6,
      },
      {
        type: 'textarea',
        classname: 'improve_form width20 flCustom',
        option: {
          label: ctqLabel,
          name: 'CTQ',
          placeholder: '',
          value: info.CTQ,
          required: true,
          maxLength: 450,
          readOnly: true,
        },
        seq: 7,
      },
      {
        type: 'textarea',
        classname: 'improve_form width20 flCustom',
        option: {
          label: yvalLabel,
          name: 'Y_VAL',
          placeholder: '',
          value: info.Y_VAL,
          required: true,
          maxLength: 450,
          readOnly: true,
        },
        seq: 8,
      },
      {
        type: 'textarea',
        classname: 'improve_form width20 flCustom',
        option: {
          label: baselinevalLabel,
          name: 'BASELINE_VAL',
          placeholder: '',
          value: info.BASELINE_VAL,
          required: true,
          maxLength: 450,
          readOnly: true,
        },
        seq: 9,
      },
      {
        type: 'textarea',
        classname: 'improve_form width20 flCustom',
        option: {
          label: targetvalLabel,
          name: 'TARGET_VAL',
          placeholder: '',
          value: info.TARGET_VAL,
          required: true,
          maxLength: 450,
          readOnly: true,
        },
        seq: 10,
      },
      {
        type: 'textarea',
        classname: 'improve_form width20 flCustom marginNone',
        option: {
          label: remarkLabel,
          name: 'REMARK',
          placeholder: '',
          value: info.REMARK,
          required: true,
          maxLength: 450,
          readOnly: true,
        },
        seq: 11,
      },
      {
        type: 'textarea',
        classname: 'improve_form width50 flCustom',
        option: {
          label: '프로젝트를 시작하게 된 배경 ',
          name: 'PRJ_BACK_DESC',
          placeholder: '',
          value: info.PRJ_BACK_DESC,
          required: true,
          maxLength: 450,
          readOnly: true,
        },
        seq: 12,
      },
      {
        type: 'textarea',
        classname: 'improve_form width50 frCustom',
        option: {
          label: '문제점/개선',
          name: 'PROBLEM_DESC',
          placeholder: '',
          value: info.PROBLEM_DESC,
          required: true,
          maxLength: 450,
          readOnly: true,
        },
        seq: 13,
      },
      {
        type: 'textarea',
        classname: 'improve_form width50 flCustom',
        option: {
          label: '해결 방법',
          name: 'HOW_TO_DESC',
          placeholder: '',
          value: info.HOW_TO_DESC,
          required: true,
          maxLength: 450,
          readOnly: true,
        },
        seq: 14,
      },
      {
        type: 'textarea',
        classname: 'improve_form width50 frCustom',
        option: {
          label: '범위',
          name: 'SCOPE_DESC',
          placeholder: '',
          value: info.SCOPE_DESC,
          required: true,
          maxLength: 450,
          readOnly: true,
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
                  name: 'START_DATE',
                  value: info.START_DATE ? moment(info.START_DATE.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYYMMDD') : undefined,
                  readOnly: true,
                },
                {
                  name: 'DEFINE_DUE_DATE',
                  value: info.DEFINE_DUE_DATE ? moment(info.DEFINE_DUE_DATE.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYYMMDD') : undefined,
                  readOnly: true,
                },
              ],
            },
            {
              label: '원인분석',
              type: 'single',
              values: [
                {
                  name: 'MEASURE_DUE_DATE',
                  value: info.MEASURE_DUE_DATE ? moment(info.MEASURE_DUE_DATE.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYYMMDD') : undefined,
                  readOnly: true,
                },
              ],
            },
            {
              label: '대책수립',
              type: 'single',
              values: [
                {
                  name: 'ANALYZE_DUE_DATE',
                  value: info.ANALYZE_DUE_DATE ? moment(info.ANALYZE_DUE_DATE.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYYMMDD') : undefined,
                  readOnly: true,
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
                  readOnly: true,
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
                  readOnly: true,
                },
              ],
            },
          ],
        },
        seq: 16,
      },
    ];

    // 미결 상태에 따른 추가 진행 요소
    if (info.status && info.status.substr(0, 2).includes('Drop')) {
      formData.push({
        type: 'textarea',
        classname: 'improve_form std',
        option: {
          label: 'Drop 사유',
          name: 'DROP_REASON',
          placeholder: '코멘트를 남겨주세요.',
          value: info.DROP_REASON,
          required: true,
          readOnly: true,
        },
        seq: formData.length + 1,
      });
    }
    if (info.status && info.status.substr(0, 2).includes('완료')) {
      formData.push({
        type: 'textarea',
        // classname: 'half mr mb',
        classname: 'improve_form std',
        option: {
          label: '현상파악 리더 코멘트',
          name: 'DEFINE_LEADER_COMMENT',
          placeholder: '코멘트를 남겨주세요.',
          value: info.DEFINE_LEADER_COMMENT,
          required: true,
          readOnly: true,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'single-uploader',
        // classname: 'quater ml mb',
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
        // classname: 'quater ml mb',
        classname: 'improve_form std',
        option: {
          label: '현상파악 완료일자',
          name: 'DEFINE_APPROVAL_DATE',
          value: info.DEFINE_APPROVAL_DATE ? moment(info.DEFINE_APPROVAL_DATE.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD') : undefined,
          readOnly: true,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'textarea',
        // classname: 'half mr mb',
        classname: 'improve_form std',
        option: {
          label: '원인분석 리더 코멘트',
          name: 'MEASURE_LEADER_COMMENT',
          placeholder: '코멘트를 남겨주세요.',
          value: info.MEASURE_LEADER_COMMENT,
          required: true,
          readOnly: true,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'single-uploader',
        // classname: 'quater ml mb',
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
        // classname: 'quater ml mb',
        classname: 'improve_form std',
        option: {
          label: '원인분석 완료일자',
          name: 'MEASURE_APPROVAL_DATE',
          value: info.MEASURE_APPROVAL_DATE ? moment(info.MEASURE_APPROVAL_DATE.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD') : undefined,
          readOnly: true,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'textarea',
        // classname: 'half mr mb',
        classname: 'improve_form std',
        option: {
          label: '대책수립 리더 코멘트',
          name: 'ANALYZE_LEADER_COMMENT',
          placeholder: '코멘트를 남겨주세요.',
          value: info.ANALYZE_LEADER_COMMENT,
          required: true,
          readOnly: true,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'single-uploader',
        // classname: 'quater ml mb',
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
        // classname: 'quater ml mb',
        classname: 'improve_form std',
        option: {
          label: '대책수립 완료일자',
          name: 'ANALYZE_APPROVAL_DATE',
          value: info.ANALYZE_APPROVAL_DATE ? moment(info.ANALYZE_APPROVAL_DATE.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD') : undefined,
          readOnly: true,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'textarea',
        // classname: 'half mr mb',
        classname: 'improve_form std',
        option: {
          label: '개선 리더 코멘트',
          name: 'IMPROVE_LEADER_COMMENT',
          placeholder: '코멘트를 남겨주세요.',
          value: info.IMPROVE_LEADER_COMMENT,
          required: true,
          readOnly: true,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'single-uploader',
        // classname: 'quater ml mb',
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
        // classname: 'quater ml mb',
        classname: 'improve_form std',
        option: {
          label: '개선 완료일자',
          name: 'IMPROVE_APPROVAL_DATE',
          value: info.IMPROVE_APPROVAL_DATE ? moment(info.IMPROVE_APPROVAL_DATE.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD') : undefined,
          readOnly: true,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'textarea',
        // classname: 'half mr mb',
        classname: 'improve_form std',
        option: {
          label: '완료/공유 리더 코멘트',
          name: 'CONTROL_LEADER_COMMENT',
          placeholder: '코멘트를 남겨주세요.',
          value: info.CONTROL_LEADER_COMMENT,
          required: true,
          readOnly: true,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'single-uploader',
        // classname: 'quater ml mb',
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
        // classname: 'quater ml mb',
        classname: 'improve_form std',
        option: {
          label: '완료/공유 완료일자',
          name: 'CONTROL_APPROVAL_DATE',
          value: info.CONTROL_APPROVAL_DATE ? moment(info.CONTROL_APPROVAL_DATE.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD') : undefined,
          readOnly: true,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'textarea',
        // classname: 'mb',
        classname: 'improve_form std',
        option: {
          label: '개선사항',
          name: 'IMPROVE_CONTENT',
          placeholder: '개선사항을 남겨주세요.',
          value: info.IMPROVE_CONTENT,
          required: true,
          readOnly: true,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'textarea',
        // classname: 'mb',
        classname: 'improve_form std',
        option: {
          label: '성공요인',
          name: 'SUCCESS_REASON',
          placeholder: '성공요인을 남겨주세요.',
          value: info.SUCCESS_REASON,
          required: true,
          readOnly: true,
        },
        seq: formData.length + 1,
      });
      formData.push({
        type: 'single-uploader',
        // classname: 'mb',
        classname: 'improve_form std',
        option: {
          label: '완료 파일첨부',
          name: 'ATTACH',
          filePath: info.ATTACH_FILE_PATH,
          fileName: info.ATTACH_FILE,
          readOnly: true,
        },
        seq: formData.length + 1,
      });
    }
    return formData;
  }, [info, dpCd]);

  const updateData = useCallback(async payload => {
    const { response, error } = await request({
      url: '/apigate/v1/portal/sign/task',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'PUT',
      data: payload,
    });
    return { response, error };
  }, []);

  const submitData = useCallback(
    statusCode => {
      const formData = new FormData(formRef.current);
      const formJson = {};
      formData.forEach((value, key) => {
        formJson[key] = value;
      });
      if (formJson.signlinememo.trim() === '') {
        // Alert Message
        alertMessage.alert('의견을 작성해 주십시요.');
      } else {
        const { docno, signno, signlineno, signlinememo, PRJ_TITLE, PRJ_TYPE } = formJson;
        const payload = {
          docno,
          signno,
          signlineno,
          signlinememo,
          signcd: statusCode,
          signtypecd: '01',
          sysid: 'TPMS',
          mnuid: 'TPMS1050',
          PRJ_TITLE,
          PRJ_TYPE,
        };

        setIsLoading(true);
        updateData(payload)
          .then(({ response, error }) => {
            if (response && !error) {
              // Callback 함수 체크후 수행
              if (callback && typeof callback === 'function') callback();
            } else {
              setIsError(true);
              alertMessage.alert('Server Error');
            }
          })
          .catch(() => {
            setIsError(true);
            alertMessage.alert('Server Error');
          });
        setIsLoading(false);
      }
    },
    [formRef],
  );

  const accept = () => {
    console.debug('승인하기');
    submitData('02');
  };

  const reject = () => {
    console.debug('반려하기');
    submitData('03');
  };

  return {
    isLoading,
    isError,
    formRef,
    defaultFormData,
    actions: { accept, reject },
  };
};
