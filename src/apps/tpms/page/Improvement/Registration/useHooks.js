import { useState, useCallback } from 'react';
import moment from 'moment';

import request from 'utils/request';

import alertMessage from '../../../components/Notification/Alert';

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

const defaultFormData = [
  {
    type: 'text',
    classname: 'improve_form std width50 flCustom',
    option: {
      label: 'Project 명',
      name: 'PRJ_TITLE',
      placeholder: '',
      value: '',
      required: true,
      maxLength: 100,
      noTwoBind: true,
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
      value: '',
      required: true,
    },
    seq: 2,
  },
  {
    type: 'equip-selector',
    classname: 'improve_form std customColorDiv',
    option: {
      label: '장비모델명',
      values: [],
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
        { label: '개별개선', value: 'G', checked: false },
        { label: 'TFT', value: 'T' },
        { label: 'Wafer Loss', value: 'W' },
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
      values: [
        { label: '본부', value: '1' },
        { label: '담당', value: '2' },
        { label: '팀', value: '3' },
        { label: 'Part', value: '4' },
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
      values: [
        { label: 'Cost', value: 'C' },
        { label: 'Delivery', value: 'D' },
        { label: 'Morale', value: 'M' },
        { label: 'Productivity', value: 'P' },
        { label: 'Quality', value: 'Q' },
        { label: 'Safety', value: 'S' },
      ],
    },
    seq: 6,
  },
  {
    type: 'textarea',
    classname: 'improve_form width20 flCustom',
    option: {
      label: '핵심성과지표',
      exLabel: 'FAB',
      name: 'CTQ',
      placeholder: '',
      value: '',
      required: true,
      maxLength: 450,
    },
    seq: 7,
  },
  {
    type: 'textarea',
    classname: 'improve_form width20 flCustom',
    option: {
      label: '현재 상태',
      exLabel: 'Area',
      name: 'Y_VAL',
      placeholder: '',
      value: '',
      required: true,
      maxLength: 450,
    },
    seq: 8,
  },
  {
    type: 'textarea',
    classname: 'improve_form width20 flCustom',
    option: {
      label: '목표',
      exLabel: '피해장수(수량)',
      name: 'BASELINE_VAL',
      placeholder: '',
      value: '',
      required: true,
      maxLength: 450,
    },
    seq: 9,
  },
  {
    type: 'textarea',
    classname: 'improve_form width20 flCustom',
    option: {
      classname: 'improve_form',
      label: '적용 대상',
      exLabel: '요인(부서)',
      name: 'TARGET_VAL',
      placeholder: '',
      value: '',
      required: true,
      maxLength: 450,
    },
    seq: 10,
  },
  {
    type: 'textarea',
    classname: 'improve_form width20 flCustom marginNone',
    option: {
      label: '비고',
      exLabel: '발생일',
      name: 'REMARK',
      placeholder: '',
      value: '',
      required: true,
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
      value: '',
      required: true,
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
      value: '',
      required: true,
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
      value: '',
      required: true,
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
      value: '',
      required: true,
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
              value: '',
              placeholder: 'Start Date',
              required: true,
              minDate: new Date(),
            },
            {
              name: 'DEFINE_DUE_DATE',
              value: '',
              placeholder: 'Due Date',
              required: true,
              minDate: new Date(),
            },
          ],
        },
        {
          label: '원인분석',
          type: 'single',
          values: [
            {
              name: 'MEASURE_DUE_DATE',
              value: '',
              placeholder: 'Due Date',
              required: true,
              minDate: new Date(),
            },
          ],
        },
        {
          label: '대책수립',
          type: 'single',
          values: [
            {
              name: 'ANALYZE_DUE_DATE',
              value: '',
              placeholder: 'Due Date',
              required: true,
              minDate: new Date(),
            },
          ],
        },
        {
          label: '개선',
          type: 'single',
          values: [
            {
              name: 'IMPROVE_DUE_DATE',
              value: '',
              placeholder: 'Due Date',
              required: true,
              minDate: new Date(),
            },
          ],
        },
        {
          label: '완료/공유',
          type: 'single',
          values: [
            {
              name: 'CONTROL_DUE_DATE',
              value: '',
              placeholder: 'Due Date',
              required: true,
              minDate: new Date(),
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
        { key: 0, label: '1차결재권자', values: [], type: 'SINGLE' },
        { key: 1, label: '최종결재권자', values: [], type: 'SINGLE' },
        { key: 3, label: '팀원', values: [], type: 'MULTI' },
      ],
    },
    seq: 17,
  },
];

export default ({ usrnm, dpcd }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const [savedTemp, setSavedTemp] = useState(false);
  const [currentPositionLeader, setCurrentPositionLeader] = useState('');
  const [currentProjectType, setCurrentProjectType] = useState('');

  const postTask = useCallback(async payload => {
    const { response, error } = await request({
      url: '/apigate/v1/portal/sign/task',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'POST',
      data: payload,
    });

    return { response, error };
  }, []);

  const getPositionLeaders = useCallback(async () => {
    const params = {
      mnuId: 'lvlsignusr',
      sysId: 'TPMS',
    };
    const { response, error } = await request({
      url: `/apigate/v1/portal/sign/task`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
      params,
    });
    return { response, error };
  }, []);

  const selectCurrentPrjType = type => setCurrentProjectType(type);

  const selectSelectors = lvl => {
    if (lvl.toString() === '3') {
      setIsLoading(true);
      getPositionLeaders()
        .then(({ response, error }) => {
          if (response && !error) {
            const { signUserInfo } = response;
            setCurrentPositionLeader(signUserInfo);
          } else {
            console.debug(error);
            alertMessage.alert('네트워크 에러가 발생했습니다.');
          }
        })
        .catch(e => {
          console.debug(e);
          alertMessage.alert('네트워크 에러가 발생했습니다.');
        });
      setIsLoading(false);
    } else {
      setCurrentPositionLeader({});
    }
  };

  const currentFormJson = () =>
    defaultFormData.map(item => {
      if (item.option.name === 'PRJ_LEADER_NAME') {
        return {
          ...item,
          option: {
            ...item.option,
            value: usrnm,
            readOnly: true,
          },
        };
      }
      if (item.option.label === 'Member') {
        return {
          ...item,
          option: {
            ...item.option,
            values: [
              { ...item.option.values[0], initdpcd: dpcd || '' },
              {
                ...item.option.values[1],
                values: currentPositionLeader.usrid ? [{ ...currentPositionLeader, emrno: currentPositionLeader.usrid }] : [],
                fixed: !!currentPositionLeader.usrid,
                initdpcd: dpcd || '',
              },
              { ...item.option.values[2], initdpcd: dpcd || '' },
            ],
          },
        };
      }
      if (item.option.label === 'Level') {
        return {
          ...item,
          option: {
            ...item.option,
            onChange: selectSelectors,
          },
        };
      }
      if (item.option.name === 'PRJ_TYPE') {
        return {
          ...item,
          option: {
            ...item.option,
            onChange: selectCurrentPrjType,
          },
        };
      }
      /* If PRJ_TYPE Value is W... */
      if (currentProjectType === 'W' && ['CTQ', 'Y_VAL', 'BASELINE_VAL', 'TARGET_VAL', 'REMARK'].includes(item.option.name)) {
        return {
          ...item,
          option: {
            ...item.option,
            label: item.option.exLabel,
          },
        };
      }
      return { ...item };
    });

  const submitForm = e => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });

    if (!payload.PRJ_TYPE) {
      alertMessage.alert('Project Type을 선택해주십시오.');
      return;
    }

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

    // 기간 설정에 대한 체크
    const { DEFINE_DUE_DATE, MEASURE_DUE_DATE, ANALYZE_DUE_DATE, IMPROVE_DUE_DATE, CONTROL_DUE_DATE } = payload;
    const dueDates = [
      moment(moment(DEFINE_DUE_DATE, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00')),
      moment(moment(MEASURE_DUE_DATE, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00')),
      moment(moment(ANALYZE_DUE_DATE, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00')),
      moment(moment(IMPROVE_DUE_DATE, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00')),
      moment(moment(CONTROL_DUE_DATE, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00')),
    ];
    const validatedDueDates = dateValidateChecker(dueDates);
    if (!validatedDueDates.result) {
      alertMessage.alert(validatedDueDates.message);
      return;
    }

    const preferSignLine = [];
    preferSignLine.push(JSON.parse(payload.user_selector_0 || '[]'));
    preferSignLine.push(JSON.parse(payload.user_selector_1 || '[]'));
    const { profile } = this.props;
    if (preferSignLine[0].length < 1 || preferSignLine[1].length < 1) {
      alertMessage.alert('최종결재권자 또는 1차결재권자가 미설정되었습니다.');
    } else if (preferSignLine[0][0].emrno === preferSignLine[1][0].emrno) {
      alertMessage.alert('최종결재권자와 1차결재권자가 동일합니다.');
    } else if (preferSignLine[0][0].emrno === profile.usrid || preferSignLine[1][0].emrno === profile.usrid) {
      alertMessage.alert('기안자와 결재권자가 동일합니다.');
    } else {
      const signline = [];
      signline.push({
        signtypecd: '01',
        usrid: preferSignLine[0][0].usrid,
        seq: 1,
      });
      signline.push({
        signtypecd: '01',
        usrid: preferSignLine[1][0].usrid,
        seq: 2,
      });

      const signref = JSON.parse(payload.user_selector_2 || '[]').map(user => user.usrid);
      if (signref.length < 1) {
        alertMessage.alert('팀원이 미설정 되었습니다.');
        return;
      }

      if (signref.includes(profile.usrid)) {
        alertMessage.alert('자신을 팀원으로 설정 할 수 없습니다.');
        return;
      }

      if (signref.includes(preferSignLine[0][0].usrid)) {
        alertMessage.alert('1차결재권자를 팀원으로 설정 할 수 없습니다.');
        return;
      }

      if (signref.includes(preferSignLine[1][0].usrid)) {
        alertMessage.alert('최종결재권자를 팀원으로 설정 할 수 없습니다.');
        return;
      }

      /* Change Format */
      payload.START_DATE = moment(payload.START_DATE, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00');
      payload.DEFINE_DUE_DATE = moment(payload.DEFINE_DUE_DATE, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00');
      payload.MEASURE_DUE_DATE = moment(payload.MEASURE_DUE_DATE, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00');
      payload.ANALYZE_DUE_DATE = moment(payload.ANALYZE_DUE_DATE, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00');
      payload.IMPROVE_DUE_DATE = moment(payload.IMPROVE_DUE_DATE, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00');
      payload.CONTROL_DUE_DATE = moment(payload.CONTROL_DUE_DATE, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00');

      payload.user_selector_0 = undefined;
      payload.user_selector_1 = undefined;
      payload.user_selector_2 = undefined;
      payload.user_selector_3 = undefined;
      payload.signline = signline;
      payload.signref = signref;
      payload.items = items;
      payload.sysid = 'TPMS';
      payload.mnuid = 'TPMS1010';

      setIsLoading(true);
      postTask(payload)
        .then(({ response, error }) => {
          if (response && !error) {
            alertMessage.notice('개선활동을 신규 등록하였습니다.');
            setIsRedirect(true);
          } else {
            alertMessage.alert('개선활등을 신규 등록에 실패했습니다.');
            console.debug(error);
          }
        })
        .catch(() => {
          alertMessage.alert('개선활등을 신규 등록에 실패했습니다.');
        });
      setIsLoading(false);
    }
  };

  const saveTemp = tempyn => {
    const formData = new FormData(this.formRef.current);
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });

    // member 추가
    const signline = [];
    if (payload.user_selector_0) {
      const tempSignLine = JSON.parse(payload.user_selector_0 || '[]');
      if (tempSignLine.length > 0) {
        signline.push({
          signtypecd: '01',
          usrid: tempSignLine[0].usrid,
          seq: 1,
        });
      }
    }
    if (payload.user_selector_1) {
      const tempSignLine = JSON.parse(payload.user_selector_1 || '[]');
      if (tempSignLine.length > 0) {
        signline.push({
          signtypecd: '01',
          usrid: tempSignLine[0].usrid,
          seq: 2,
        });
      }
    }

    const signref = JSON.parse(payload.user_selector_2 || '[]');
    const items = JSON.parse(payload.equip_selector).map(equip => `${equip.fab}:${equip.area}:${equip.keyno}:${equip.model}`);

    payload.user_selector_0 = undefined;
    payload.user_selector_1 = undefined;
    payload.user_selector_2 = undefined;
    payload.user_selector_3 = undefined;
    payload.signline = signline;
    payload.signref = signref;
    payload.items = items;
    payload.tempyn = tempyn;
    payload.sysid = 'TPMS';
    payload.mnuid = 'TPMS1010';

    setIsLoading(true);
    postTask(payload)
      .then(({ response, error }) => {
        if (response && !error) {
          alertMessage.notice('임시 저장 했습니다.');
          setSavedTemp(true);
        } else {
          alertMessage.alert('임시 저장이 실패했습니다.');
          console.debug(error);
        }
      })
      .catch(() => {
        alertMessage.alert('임시 저장이 실패했습니다.');
      });
    setIsLoading(false);
  };

  return {
    isLoading,
    isRedirect,
    savedTemp,
    formJson: currentFormJson(),
    actions: {
      submitForm,
      saveTemp,
    },
  };
};
