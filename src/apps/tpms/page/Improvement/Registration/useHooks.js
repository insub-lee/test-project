/* eslint-disable camelcase */
import { useEffect, useState, useCallback, useRef } from 'react';
import moment from 'moment';

import request from 'utils/request';
import { getProcessRule, fillWorkFlowData } from '../../../hooks/useWorkFlow';

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

const defaultFormData = () => [
  {
    type: 'text',
    classname: 'improve_form std width50 flCustom',
    option: {
      label: 'Project 명',
      name: 'title',
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
      name: 'project_leader',
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
      name: 'project_type',
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
      name: 'project_level',
      values: [
        { label: '본부', value: 1 },
        { label: '담당', value: 2 },
        { label: '팀', value: 3 },
        { label: 'Part', value: 4 },
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
      name: 'key_performance_indicators',
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
      name: 'current_status',
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
      name: 'goal',
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
      name: 'apply_target',
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
      name: 'note',
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
      name: 'project_reason',
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
      name: 'problem_improvement',
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
      name: 'solution',
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
      name: 'scope',
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
              name: 'situation_analyze_start_date',
              value: '',
              placeholder: 'Start Date',
              required: true,
              minDate: new Date(),
            },
            {
              name: 'situation_analyze_end_date',
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
              name: 'cause_analyze_due_date',
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
              name: 'measure_due_date',
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
              name: 'improvement_due_date',
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
              name: 'completion_due_date',
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
    // TODO 팀원 선택 이력이 남아있는 버그가 있음.
    type: 'employee-selector',
    classname: 'improve_form ex width50 frCustom customColorDiv02',
    option: {
      label: 'Member',
      values: [
        { key: 0, label: '1차결재권자', values: [], type: 'SINGLE' },
        { key: 1, label: '최종결재권자', values: [], type: 'SINGLE' },
        { key: 2, label: '팀원', values: [], type: 'MULTI' },
      ],
    },
    seq: 17,
  },
];

export default ({ originEmpNo, usrnm, dpcd }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [realSubmit, setRealSubmit] = useState(false);
  const [tempSubmit, setTempSubmit] = useState(false);
  const [darftData, setDraftData] = useState({});

  const [isRedirect, setIsRedirect] = useState(false);
  const [savedTemp, setSavedTemp] = useState(false);
  const [currentProjectType, setCurrentProjectType] = useState('');
  const formRef = useRef(null);

  const postTask = useCallback(async payload => {
    const { response, error } = await request({
      url: `/api/tpms/v1/common/approval`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'POST',
      data: payload,
    });

    return { response, error };
  }, []);

  // const getPositionLeaders = useCallback(async () => {
  //   const params = {
  //     mnuId: 'lvlsignusr',
  //     sysId: 'TPMS',
  //   };
  //   const { response, error } = await request({
  //     url: `/apigate/v1/portal/sign/task`,
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //     method: 'GET',
  //     params,
  //   });
  //   return { response, error };
  // }, []);

  const selectCurrentPrjType = type => setCurrentProjectType(type);

  // const selectSelectors = lvl => {
  //   if (lvl?.toString() === '3') {
  //     setIsLoading(true);
  //     getPositionLeaders()
  //       .then(({ response, error }) => {
  //         if (response && !error) {
  //           const { signUserInfo } = response;
  //           setCurrentPositionLeader(signUserInfo);
  //         } else {
  //           console.debug(error);
  //           alertMessage.alert('네트워크 에러가 발생했습니다.');
  //         }
  //       })
  //       .catch(e => {
  //         console.debug(e);
  //         alertMessage.alert('네트워크 에러가 발생했습니다.');
  //       });
  //     setIsLoading(false);
  //   } else {
  //     setCurrentPositionLeader({});
  //   }
  // };

  const currentFormJson = () =>
    defaultFormData().map(item => {
      if (item.option.name === 'project_leader') {
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
                // values: currentPositionLeader.user_id ? [{ ...currentPositionLeader, emp_no: currentPositionLeader.user_id }] : [],
                // fixed: !!currentPositionLeader.user_id,
                initdpcd: dpcd || '',
              },
              { ...item.option.values[2], initdpcd: dpcd || '' },
            ],
          },
        };
      }
      if (item.option.label === 'project_level') {
        return {
          ...item,
          option: {
            ...item.option,
            // onChange: selectSelectors,
          },
        };
      }
      if (item.option.name === 'project_type') {
        return {
          ...item,
          option: {
            ...item.option,
            onChange: selectCurrentPrjType,
          },
        };
      }
      /* If PRJ_TYPE Value is W... */
      if (currentProjectType === 'W' && ['key_performance_indicators', 'current_status', 'goal', 'apply_target', 'note'].includes(item.option.name)) {
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
    const { debug } = console;
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });

    if (!payload.project_type) {
      alertMessage.alert('Project Type을 선택해주십시오.');
      return;
    }

    const equipment_model = JSON.parse(payload?.equipment_model).map(equip => `${equip.fab}:${equip.area}:${equip.keyno}:${equip.model}`);
    if (equipment_model.length < 1) {
      alertMessage.alert('선택된 장비가 없습니다.');
      debug('선택된 장비가 없습니다.');

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

    /* 기간 설정에 대한 체크
    현-원-대-개-완 순서대로 들어가야함.
*/

    const {
      situation_analyze_start_date,
      situation_analyze_end_date,
      cause_analyze_due_date,
      measure_due_date,
      improvement_due_date,
      completion_due_date,
    } = payload;
    const dueDates = [
      moment(situation_analyze_start_date, 'YYYY.MM.DD'),
      moment(situation_analyze_end_date, 'YYYY.MM.DD'),
      moment(cause_analyze_due_date, 'YYYY.MM.DD'),
      moment(measure_due_date, 'YYYY.MM.DD'),
      moment(improvement_due_date, 'YYYY.MM.DD'),
      moment(completion_due_date, 'YYYY.MM.DD'),
    ];
    const validatedDueDates = dateValidateChecker(dueDates);
    if (!validatedDueDates.result) {
      alertMessage.alert(validatedDueDates.message);
      debug(validatedDueDates.message);
      return;
    }

    const first_approver = JSON.parse(payload.user_selector_0 || '[]');
    const final_approver = JSON.parse(payload.user_selector_1 || '[]');
    if (first_approver.length < 1 || final_approver.length < 1) {
      alertMessage.alert('최종결재권자 또는 1차결재권자가 미설정되었습니다.');
    } else if (first_approver[0].emp_no === final_approver[0].emp_no) {
      alertMessage.alert('최종결재권자와 1차결재권자가 동일합니다.');
    } else if (first_approver[0].emp_no === originEmpNo || final_approver[0].emp_no === originEmpNo) {
      alertMessage.alert('기안자와 결재권자가 동일합니다.');
    } else {
      // todo

      const team_member = JSON.parse(payload.user_selector_2 || '[]');

      if (team_member.length < 1) {
        alertMessage.alert('팀원이 미설정 되었습니다.');
        return;
      }

      if (payload?.user_selector_2.includes(originEmpNo)) {
        alertMessage.alert('자신을 팀원으로 설정 할 수 없습니다.');
        return;
      }

      if (payload?.user_selector_2.includes(first_approver[0].emp_no)) {
        alertMessage.alert('1차결재권자를 팀원으로 설정 할 수 없습니다.');
        return;
      }

      if (payload?.user_selector_2.includes(final_approver[0].emp_no)) {
        alertMessage.alert('최종결재권자를 팀원으로 설정 할 수 없습니다.');
        return;
      }

      /* Change Format */
      payload.situation_analyze_start_date = moment(payload.situation_analyze_start_date).format('YYYYMMDD');
      payload.situation_analyze_end_date = moment(payload.situation_analyze_end_date).format('YYYYMMDD');
      payload.measure_due_date = moment(payload.measure_due_date).format('YYYYMMDD');
      payload.cause_analyze_due_date = moment(payload.cause_analyze_due_date).format('YYYYMMDD');
      payload.improvement_due_date = moment(payload.improvement_due_date).format('YYYYMMDD');
      payload.completion_due_date = moment(payload.completion_due_date).format('YYYYMMDD');

      payload.equipment_model = JSON.stringify(equipment_model);
      payload.first_approver = JSON.stringify(first_approver);
      payload.final_approver = JSON.stringify(final_approver);
      payload.team_member = JSON.stringify(team_member);
      payload.user_selector_0 = undefined;
      payload.user_selector_1 = undefined;
      payload.user_selector_2 = undefined;
      payload.user_selector_3 = undefined;
      const date = new Date();
      payload.project_id = `${date.getFullYear()}${date.getMonth()}`;
      const { reg_dept_id, project_level } = payload;
      payload.reg_dept_id = parseInt(reg_dept_id || 0, 10);
      payload.project_level = parseInt(project_level || 0, 10);
      payload.reg_user_id = originEmpNo;
      payload.reg_user_name = usrnm;
      payload.is_temp = 0;
      payload.step = 0;

      setIsLoading(true);
      setRealSubmit(true);
      setDraftData(payload);
    }
  };

  const saveTemp = () => {
    const formData = new FormData(formRef.current);
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });
    // member 추가
    let first_approver;
    let final_approver;
    if (payload.user_selector_0) {
      first_approver = JSON.parse(payload.user_selector_0 || '[]');
    }

    if (payload.user_selector_1) {
      final_approver = JSON.parse(payload.user_selector_1 || '[]');
    }
    const team_member = JSON.parse(payload.user_selector_2 || '[]');
    const equipment_model = JSON.parse(payload.equipment_model || '[]').map(equip => `${equip.fab}:${equip.area}:${equip.keyno}:${equip.model}`);
    payload.equipment_model = JSON.stringify(equipment_model);
    payload.first_approver = JSON.stringify(first_approver);
    payload.final_approver = JSON.stringify(final_approver);
    payload.user_selector_0 = undefined;
    payload.user_selector_1 = undefined;
    payload.user_selector_2 = undefined;
    payload.user_selector_3 = undefined;
    payload.team_member = JSON.stringify(team_member);
    payload.is_temp = 1;
    const date = new Date();
    payload.project_id = `${date.getFullYear()}${date.getMonth()}`;
    const { reg_dept_id, project_level } = payload;
    payload.reg_dept_id = parseInt(reg_dept_id || 0, 10);
    payload.project_level = parseInt(project_level || 0, 10);
    payload.reg_user_id = originEmpNo;
    payload.reg_user_name = usrnm;
    payload.step = 0;

    setIsLoading(true);
    setTempSubmit(true);
    setDraftData(payload);
  };

  useEffect(() => {
    if (darftData !== {}) {
      if (realSubmit && isLoading) {
        postTask(darftData)
          .then(({ response }) => {
            const { result, req, error } = response;
            if (result && !error) {
              getProcessRule().then(ee => {
                // rel_type 비명시시 작동불가 , 1차 등록의 rel_type은 200
                fillWorkFlowData(ee, { ...req, rel_type: 200 });
                alertMessage.notice('개선활동을 신규 등록하였습니다.');
                setIsRedirect(true);
              });
            } else {
              alertMessage.alert('개선활등을 신규 등록에 실패했습니다.');
              setIsLoading(false);
              setRealSubmit(false);
            }
          })
          .catch(() => {
            alertMessage.alert('개선활등을 신규 등록에 실패했습니다.');
            setIsLoading(false);
            setRealSubmit(false);
          });
      } else if (tempSubmit && isLoading) {
        postTask(darftData)
          .then(({ response }) => {
            const { result, error } = response;
            if (result && !error) {
              setSavedTemp(true);
              alertMessage.notice('임시 저장 했습니다.');
            } else {
              setIsLoading(false);
              setTempSubmit(false);
              alertMessage.alert('임시 저장이 실패했습니다.');
            }
          })
          .catch(() => {
            alertMessage.alert('임시 저장이 실패했습니다.');
            setIsLoading(false);
            setTempSubmit(false);
          });
      }
    }
  }, [realSubmit, tempSubmit, isLoading, darftData]);

  return {
    isLoading,
    isRedirect,
    savedTemp,
    formRef,
    formJson: currentFormJson(),
    actions: {
      submitForm,
      saveTemp,
    },
  };
};
