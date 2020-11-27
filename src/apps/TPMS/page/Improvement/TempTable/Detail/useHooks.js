/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import moment from 'moment';

import request from 'utils/request';
import { getProcessRule, fillWorkFlowData } from '../../../../hooks/useWorkFlow';
import alertMessage from '../../../../components/Notification/Alert';

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

/** !!!! Danger!!!!! * */
export default ({ info, usrid = '', usrnm, deptId = '', callback = () => {} }) => {
  const [isRedirect, setIsRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLvl3, setIsLvl3] = useState(false);
  const [positionLeader, setPositionLeader] = useState({});
  const [savedTemp, setSavedTemp] = useState(false);
  const [currentPrjType, setCurrentPrjType] = useState('');
  const formRef = useRef(null);

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
    return [
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
          maxLength: 200,
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
          readOnly: false,
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
          values: [
            {
              label: '개별개선',
              value: 'G',
              checked: info?.project_type === 'G',
              readOnly: false,
            },
            {
              label: 'TFT',
              value: 'T',
              checked: info?.project_type === 'T',
              readOnly: false,
            },
            {
              label: 'Wafer Loss',
              value: 'W',
              checked: info?.project_type === 'W',
              readOnly: false,
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
          disabled: false,
          readOnly: false,
          values: [
            { label: '본부', value: 1, selected: info?.project_level == 1 },
            { label: '담당', value: 2, selected: info?.project_level == 2 },
            { label: '팀', value: 3, selected: info?.project_level == 3 },
            { label: 'Part', value: 4, selected: info?.project_level == 4 },
          ],
          // onChange: selectSelectors,
        },
        seq: 5,
      },
      {
        type: 'select',
        classname: 'improve_form std width50 frCustom marginNone',
        option: {
          label: 'Performance Type',
          name: 'performance_type',
          disabled: false,
          readOnly: false,
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
          exLabel: 'FAB',
          name: 'key_performance_indicators',
          placeholder: '',
          value: info?.key_performance_indicators,
          required: true,
          readOnly: false,
          maxLength: 450,
        },
        seq: 7,
      },
      {
        type: 'textarea',
        classname: 'improve_form width20 flCustom',
        option: {
          label: current_status,
          exLabel: 'Area',
          name: 'current_status',
          placeholder: '',
          value: info?.current_status,
          required: true,
          readOnly: false,
          maxLength: 450,
        },
        seq: 8,
      },
      {
        type: 'textarea',
        classname: 'improve_form width20 flCustom',
        option: {
          label: goal,
          exLabel: '피해장수(수량)',
          name: 'goal',
          placeholder: '',
          value: info?.goal,
          required: true,
          readOnly: false,
          maxLength: 450,
        },
        seq: 9,
      },
      {
        type: 'textarea',
        classname: 'improve_form width20 flCustom',
        option: {
          label: apply_target,
          exLabel: '요인(부서)',
          name: 'apply_target',
          placeholder: '',
          value: info?.apply_target,
          required: true,
          readOnly: false,
          maxLength: 450,
        },
        seq: 10,
      },
      {
        type: 'textarea',
        classname: 'improve_form width20 flCustom marginNone',
        option: {
          label: note,
          exLabel: '발생일',
          name: 'note',
          placeholder: '',
          value: info?.note,
          required: true,
          readOnly: false,
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
          value: info?.project_reason,
          required: true,
          readOnly: false,
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
          value: info?.problem_improvement,
          required: true,
          readOnly: false,
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
          value: info?.solution,
          required: true,
          readOnly: false,
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
          value: info?.scope,
          required: true,
          readOnly: false,
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
                  value: info?.situation_analyze_start_date
                    ? moment(info?.situation_analyze_start_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYYMMDD')
                    : undefined,
                  readOnly: false,
                },
                {
                  name: 'situation_analyze_end_date',
                  value: info?.situation_analyze_end_date
                    ? moment(info?.situation_analyze_end_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYYMMDD')
                    : undefined,
                  readOnly: false,
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
              values: JSON.parse(info?.first_approver || '[]'),
              type: 'SINGLE',
            },
            {
              key: 1,
              label: '최종결재권자',
              values: JSON.parse(info?.final_approver || '[]'),
              type: 'SINGLE',
            },
            {
              key: 3,
              label: '팀원',
              values: JSON.parse(info?.team_member || '[]'),
              type: 'MULTI',
            },
          ],
        },
        seq: 17,
      },
    ];
  }, [info, deptId]);

  // const getPositionLeader = useCallback(async () => {
  //   const url = '/apigate/v1/portal/sign/task';
  //   const requestQuery = {
  //     mnuId: 'lvlsignusr',
  //     sysId: 'TPMS',
  //   };
  //   const { response, error } = await request({
  //     url,
  //     method: 'GET',
  //     params: requestQuery,
  //   });

  //   return { response, error };
  // }, []);
  // const selectSelectors = value => {
  //   if (value?.toString() === '3') {
  //     setPositionLeader({});
  //     getPositionLeader()
  //       .then(({ response, error }) => {
  //         if (response && !error) {
  //           const { signUserInfo } = response;
  //           setPositionLeader(signUserInfo || {});
  //         } else {
  //           setIsError(true);
  //         }
  //       })
  //       .catch(() => {
  //         setIsError(true);
  //       });
  //   }
  // };
  // const selectSelectors = value => setProjectLevel(value);

  const selectCurrentPrjType = value => setCurrentPrjType(value);

  const getCurrentFormJson = () =>
    defaultFormData.map(item => {
      if (item.option.label === 'Member') {
        console.debug(isLvl3, positionLeader.user_id, '@@@', isLvl3 && !!positionLeader.user_id);
        return {
          ...item,
          option: {
            ...item.option,
            values: [
              { ...item.option.values[0], initdpcd: deptId },
              {
                ...item.option.values[1],
                // values: positionLeader.user_id ? [{ ...positionLeader, user_id: positionLeader.user_id }] : [],
                // fixed: isLvl3 && !!positionLeader.user_id,
              },
              { ...item.option.values[2] },
            ],
          },
        };
      }
      if (item.option.label === 'Level') {
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
      if (currentPrjType === 'W' && ['key_performance_indicators', 'current_status', 'goal', 'apply_target', 'note'].includes(item.option.name)) {
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

  const sendData = useCallback(async options => {
    const { response, error } = await request(options);
    return { response, error };
  }, []);

  // 등록
  const submitForm = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });

    // 제출 시에는 prjID 중복문제로 삭제
    // delete payload.task_seq;

    if (!payload.project_type) {
      alertMessage.alert('Project Type을 선택해주십시오.');
      return;
    }

    const equipment_model = JSON.parse(payload.equipment_model).map(equip => `${equip.fab}:${equip.area}:${equip.keyno}:${equip.model}`);
    if (equipment_model.length < 1) {
      alertMessage.alert('선택된 장비가 없습니다.');
      return;
    }
    if (
      !payload.situation_analyze_start_date ||
      !payload.situation_analyze_end_date ||
      !payload.measure_due_date ||
      !payload.cause_analyze_due_date ||
      !payload.improvement_due_date ||
      !payload.completion_due_date
    ) {
      alertMessage.alert('스케줄 날짜가 미설정 되었습니다.');
      return;
    }

    // 기간 설정에 대한 체크
    const { situation_analyze_end_date, measure_due_date, cause_analyze_due_date, improvement_due_date, completion_due_date } = payload;
    const dueDates = [
      moment(situation_analyze_end_date, 'YYYY.MM.DD'),
      moment(measure_due_date, 'YYYY.MM.DD'),
      moment(cause_analyze_due_date, 'YYYY.MM.DD'),
      moment(improvement_due_date, 'YYYY.MM.DD'),
      moment(completion_due_date, 'YYYY.MM.DD'),
    ];
    const validatedDueDates = dateValidateChecker(dueDates);
    if (!validatedDueDates.result) {
      alertMessage.alert(validatedDueDates.message);
      return;
    }

    const preferSignLine = [];
    preferSignLine.push(JSON.parse(payload.user_selector_0));
    preferSignLine.push(JSON.parse(payload.user_selector_1));
    if (preferSignLine[0].length < 1 || preferSignLine[1].length < 1) {
      alertMessage.alert('최종결재권자 또는 1차결재권자가 미설정되었습니다.');
    } else if (preferSignLine[0][0].user_id === preferSignLine[1][0].user_id) {
      alertMessage.alert('최종결재권자와 1차결재권자가 동일합니다.');
    } else if (preferSignLine[0][0].user_id === usrid || preferSignLine[1][0].user_id === usrid) {
      alertMessage.alert('기안자와 결재권자가 동일합니다.');
    } else {
      const first_approver = JSON.stringify([preferSignLine[0][0]]);
      const final_approver = JSON.stringify([preferSignLine[1][0]]);
      const team_member = JSON.parse(payload.user_selector_2 || '[]').map(user => user);

      if (team_member.length < 1) {
        alertMessage.alert('팀원이 미설정 되었습니다.');
        return;
      }

      if (team_member.includes(usrid)) {
        alertMessage.alert('자신을 팀원으로 설정 할 수 없습니다.');
        return;
      }

      if (team_member.includes(preferSignLine[0][0].usrid)) {
        alertMessage.alert('1차결재권자를 팀원으로 설정 할 수 없습니다.');
        return;
      }

      if (team_member.includes(preferSignLine[1][0].usrid)) {
        alertMessage.alert('최종결재권자를 팀원으로 설정 할 수 없습니다.');
        return;
      }

      /* Change Format */
      payload.situation_analyze_start_date = moment(payload.situation_analyze_start_date, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00');
      payload.situation_analyze_end_date = moment(payload.situation_analyze_end_date, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00');
      payload.measure_due_date = moment(payload.measure_due_date, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00');
      payload.cause_analyze_due_date = moment(payload.cause_analyze_due_date, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00');
      payload.improvement_due_date = moment(payload.improvement_due_date, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00');
      payload.completion_due_date = moment(payload.completion_due_date, 'YYYY.MM.DD').format('YYYY-MM-DD 00:00:00');

      payload.equipment_model = JSON.stringify(equipment_model);
      payload.user_selector_0 = undefined;
      payload.user_selector_1 = undefined;
      payload.user_selector_2 = undefined;
      payload.user_selector_3 = undefined;
      payload.first_approver = first_approver;
      payload.final_approver = final_approver;
      payload.team_member = JSON.stringify(team_member);
      const { project_level, task_seq } = payload;
      payload.project_level = parseInt(project_level || 0, 10);
      payload.task_seq = parseInt(task_seq || 0, 10);
      payload.is_temp = 0;

      const options = {
        url: `/api/tpms/v1/common/approval`,
        method: 'PUT',
        data: payload,
      };
      setIsLoading(true);
      sendData(options)
        .then(({ response }) => {
          const { result, req, error } = response;
          if (result && !error) {
            getProcessRule(118, {}).then(ee => {
              fillWorkFlowData(ee, req).then(() => {
                alertMessage.notice('개선활동을 신규 등록하였습니다.');
                setIsRedirect(true);
              });
            });
          } else {
            alertMessage.alert('개선활등을 신규 등록에 실패했습니다.');
            setIsError(true);
            setIsLoading(false);
          }
        })
        .catch(() => {
          alertMessage.alert('개선활등을 신규 등록에 실패했습니다.');
          setIsError(true);
          setIsLoading(false);
        });
    }
  };

  // 임시저장
  const saveTemp = () => {
    const formData = new FormData(formRef.current);
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });

    let first_approver;
    let final_approver;
    if (payload.user_selector_0) {
      const tempSignLine = JSON.parse(payload.user_selector_0 || '[]');
      if (tempSignLine.length > 0) {
        first_approver = JSON.stringify([tempSignLine[0]]);
      }
    }
    if (payload.user_selector_1) {
      const tempSignLine = JSON.parse(payload.user_selector_1 || '[]');
      if (tempSignLine.length > 0) {
        final_approver = JSON.stringify([tempSignLine[0]]);
      }
    }

    const team_member = JSON.parse(payload.user_selector_2 || '[]').map(user => user);

    const equipment_model = JSON.parse(payload.equipment_model).map(equip => `${equip.fab}:${equip.area}:${equip.keyno}:${equip.model}`);
    payload.equipment_model = JSON.stringify(equipment_model);
    payload.user_selector_0 = undefined;
    payload.user_selector_1 = undefined;
    payload.user_selector_2 = undefined;
    payload.user_selector_3 = undefined;
    payload.first_approver = first_approver;
    payload.final_approver = final_approver;
    payload.team_member = JSON.stringify(team_member);
    const { project_level, task_seq } = payload;
    payload.project_level = parseInt(project_level || 0, 10);
    payload.task_seq = parseInt(task_seq || 0, 10);
    payload.is_temp = 1;

    const options = {
      url: `/api/tpms/v1/common/approval`,
      method: 'PUT',
      data: payload,
    };

    setIsLoading(true);

    sendData(options)
      .then(({ response }) => {
        const { result, error } = response;
        if (result && !error) {
          alertMessage.notice('임시 저장 했습니다.');
          callback();
        } else {
          setIsError(true);
          alertMessage.alert('임시 저장이 실패했습니다.');
        }
      })
      .catch(() => {
        setIsError(true);
        alertMessage.alert('임시 저장이 실패했습니다.');
        setIsLoading(false);
      });
  };

  // 임시저장 삭제
  const deleteTemp = () => {
    const options = {
      url: '/api/tpms/v1/common/approval',
      method: 'DELETE',
      data: {
        task_seq: info?.task_seq,
      },
    };
    sendData(options)
      .then(({ response }) => {
        const { result, error } = response;
        if (result && !error) {
          alertMessage.alert('삭제되었습니다.');
          callback();
        } else {
          alertMessage.alert('삭제가 실패되었습니다.');
          setIsError(true);
          callback();
        }
      })
      .catch(() => {
        alertMessage.alert('삭제가 실패되었습니다.');
        setIsError(true);
        callback();
      });
  };

  // Init Default Position Leader
  useEffect(() => {
    if (info?.project_level?.toString() === '3') {
      setIsLvl3(true);
    }

    // const targetList = signLineTempListinfo?.filter(item => item.seq === 2) || [];
    // if (targetList.length > 0) {
    // return setPositionLeader({ ...targetList[0] });
    // }
    // return setPositionLeader({});
  }, []);

  return {
    isLoading,
    isError,
    isRedirect,
    formRef,
    savedTemp,
    formData: getCurrentFormJson(),
    actions: { submitForm, saveTemp, deleteTemp },
  };
};
