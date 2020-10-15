import { useMemo } from 'react';
import moment from 'moment';

/** !!!! Danger!!!!! * */
export default ({ info, dpCd = '' }) => {
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
    return [
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
          maxLength: 200,
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
          onChange: this.selectSelectors,
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
          exLabel: 'FAB',
          name: 'CTQ',
          placeholder: '',
          value: info.CTQ,
          required: true,
          readOnly: true,
          maxLength: 450,
        },
        seq: 7,
      },
      {
        type: 'textarea',
        classname: 'improve_form width20 flCustom',
        option: {
          label: yvalLabel,
          exLabel: 'Area',
          name: 'Y_VAL',
          placeholder: '',
          value: info.Y_VAL,
          required: true,
          readOnly: true,
          maxLength: 450,
        },
        seq: 8,
      },
      {
        type: 'textarea',
        classname: 'improve_form width20 flCustom',
        option: {
          label: baselinevalLabel,
          exLabel: '피해장수(수량)',
          name: 'BASELINE_VAL',
          placeholder: '',
          value: info.BASELINE_VAL,
          required: true,
          readOnly: true,
          maxLength: 450,
        },
        seq: 9,
      },
      {
        type: 'textarea',
        classname: 'improve_form width20 flCustom',
        option: {
          label: targetvalLabel,
          exLabel: '요인(부서)',
          name: 'TARGET_VAL',
          placeholder: '',
          value: info.TARGET_VAL,
          required: true,
          readOnly: true,
          maxLength: 450,
        },
        seq: 10,
      },
      {
        type: 'textarea',
        classname: 'improve_form width20 flCustom marginNone',
        option: {
          label: remarkLabel,
          exLabel: '발생일',
          name: 'REMARK',
          placeholder: '',
          value: info.REMARK,
          required: true,
          readOnly: true,
          maxLength: 450,
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
          readOnly: true,
          maxLength: 450,
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
          readOnly: true,
          maxLength: 450,
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
          readOnly: true,
          maxLength: 450,
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
          readOnly: true,
          maxLength: 450,
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
      {
        type: 'employee-selector',
        classname: 'improve_form ex width50 frCustom customColorDiv02',
        option: {
          label: 'Member',
          values: [
            {
              key: 0,
              label: '1차결재권자',
              values:
                info.signLineTempListInfo
                  .filter(item => item.seq === 1)
                  .map(item => ({
                    emrno: item.usrid,
                    usrnm: item.usrnm,
                    jgnm: item.jgnm,
                  })) || [],
              type: 'SINGLE',
            },
            {
              key: 1,
              label: '최종결재권자',
              values:
                info.signLineTempListInfo
                  .filter(item => item.seq === 2)
                  .map(item => ({
                    emrno: item.usrid,
                    usrnm: item.usrnm,
                    jgnm: item.jgnm,
                  })) || [],
              type: 'SINGLE',
            },
            {
              key: 3,
              label: '팀원',
              values:
                info.signReferTempListInfo.map(item => ({
                  emrno: item.usrid,
                  usrnm: item.usrnm,
                  jgnm: item.jgnm,
                })) || [],
              type: 'MULTI',
            },
          ],
        },
        seq: 17,
      },
    ];
  }, [info, dpCd]);

  return {
    defaultFormData,
  };
};
