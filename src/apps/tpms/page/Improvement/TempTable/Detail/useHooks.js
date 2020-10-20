import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import moment from 'moment';

import request from 'utils/request';
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
export default ({ info, usrid = '', dpcd = '', callback = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLvl3, setIsLvl3] = useState(false);
  const [positionLeader, setPositionLeader] = useState({});
  const [currentPrjType, setCurrentPrjType] = useState('');
  const formRef = useRef(null);

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
          onChange: selectSelectors,
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
  }, [info, dpcd]);

  const getPositionLeader = useCallback(async () => {
    const url = '/apigate/v1/portal/sign/task';
    const requestQuery = {
      mnuId: 'lvlsignusr',
      sysId: 'TPMS',
    };
    const { response, error } = await request({
      url,
      method: 'GET',
      params: requestQuery,
    });

    return { response, error };
  }, []);

  const selectSelectors = value => {
    if (value?.toString() === '3') {
      setPositionLeader({});
      getPositionLeader()
        .then(({ response, error }) => {
          if (response && !error) {
            const { signUserInfo } = response;
            setPositionLeader(signUserInfo || {});
          } else {
            setIsError(true);
          }
        })
        .catch(() => {
          setIsError(true);
        });
    }
  };

  const selectCurrentPrjType = value => setCurrentPrjType(value);

  const getCurrentFormJson = () =>
    defaultFormData.map(item => {
      if (item.option.label === 'Member') {
        console.debug(isLvl3, positionLeader.usrid, '@@@', isLvl3 && !!positionLeader.usrid);
        return {
          ...item,
          option: {
            ...item.option,
            values: [
              { ...item.option.values[0], initdpcd: dpcd },
              {
                ...item.option.values[1],
                values: positionLeader.usrid ? [{ ...positionLeader, emrno: positionLeader.usrid }] : [],
                fixed: isLvl3 && !!positionLeader.usrid,
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
      if (currentPrjType === 'W' && ['CTQ', 'Y_VAL', 'BASELINE_VAL', 'TARGET_VAL', 'REMARK'].includes(item.option.name)) {
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
    delete payload.PRJ_ID;

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
      moment(DEFINE_DUE_DATE, 'YYYY.MM.DD'),
      moment(MEASURE_DUE_DATE, 'YYYY.MM.DD'),
      moment(ANALYZE_DUE_DATE, 'YYYY.MM.DD'),
      moment(IMPROVE_DUE_DATE, 'YYYY.MM.DD'),
      moment(CONTROL_DUE_DATE, 'YYYY.MM.DD'),
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
    } else if (preferSignLine[0][0].emrno === preferSignLine[1][0].emrno) {
      alertMessage.alert('최종결재권자와 1차결재권자가 동일합니다.');
    } else if (preferSignLine[0][0].emrno === usrid || preferSignLine[1][0].emrno === usrid) {
      alertMessage.alert('기안자와 결재권자가 동일합니다.');
    } else {
      const signline = [];
      signline.push({
        signtypecd: '01',
        usrid: preferSignLine[0][0].emrno,
        seq: 1,
      });
      signline.push({
        signtypecd: '01',
        usrid: preferSignLine[1][0].emrno,
        seq: 2,
      });
      const signref = JSON.parse(payload.user_selector_2 || '[]').map(user => user.emrno);

      if (signref.length < 1) {
        alertMessage.alert('팀원이 미설정 되었습니다.');
        return;
      }

      if (signref.includes(usrid)) {
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
      payload.tempyn = 'N';
      payload.sysid = 'TPMS';
      payload.mnuid = 'TPMS1010';

      const options = {
        url: '/apigate/v1/portal/sign/task',
        method: 'POST',
        data: payload,
      };

      setIsLoading(true);

      sendData(options)
        .then(({ response, error }) => {
          if (response && !error) {
            const { insertyn } = response;
            if (insertyn) {
              callback();
              alertMessage.notice('개선활동을 신규 등록하였습니다.');
            }
          } else {
            alertMessage.alert('개선활등을 신규 등록에 실패했습니다.');
            setIsError(true);
          }
        })
        .catch(() => {
          alertMessage.alert('개선활등을 신규 등록에 실패했습니다.');
          setIsError(true);
        });

      setIsLoading(false);
    }
  };

  // 임시저장
  const saveTemp = () => {
    const formData = new FormData(formRef.current);
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });
    const signline = [];
    if (payload.user_selector_0) {
      const tempSignLine = JSON.parse(payload.user_selector_0 || '[]');
      if (tempSignLine.length > 0) {
        signline.push({
          signtypecd: '01',
          usrid: tempSignLine[0].emrno,
          seq: 1,
        });
      }
    }
    if (payload.user_selector_1) {
      const tempSignLine = JSON.parse(payload.user_selector_1 || '[]');
      if (tempSignLine.length > 0) {
        signline.push({
          signtypecd: '01',
          usrid: tempSignLine[0].emrno,
          seq: 2,
        });
      }
    }

    const signref = JSON.parse(payload.user_selector_2 || '[]').map(user => ({
      ...user,
      usrid: user.emrno,
    }));

    const items = JSON.parse(payload.equip_selector).map(equip => `${equip.fab}:${equip.area}:${equip.keyno}:${equip.model}`);

    payload.user_selector_0 = undefined;
    payload.user_selector_1 = undefined;
    payload.user_selector_2 = undefined;
    payload.user_selector_3 = undefined;
    payload.signline = signline;
    payload.signref = signref;
    payload.items = items;
    payload.tempyn = 'Y';
    payload.sysid = 'TPMS';
    payload.mnuid = 'TPMS1020';

    const options = {
      url: '/apigate/v1/portal/sign/task',
      method: 'PUT',
      data: payload,
    };

    setIsLoading(true);

    sendData(options)
      .then(({ response, error }) => {
        if (response && !error) {
          const { updateyn } = response;
          if (updateyn) {
            callback();
            alertMessage.notice('임시 저장 했습니다.');
          }
        } else {
          setIsError(true);
          alertMessage.alert('임시 저장이 실패했습니다.');
        }
      })
      .catch(() => {
        setIsError(true);
        alertMessage.alert('임시 저장이 실패했습니다.');
      });

    setIsLoading(false);
  };

  // 임시저장 삭제
  const deleteTemp = () => {
    const { tempid } = info;
    const options = {
      url: '/apigate/v1/portal/sign/task',
      method: 'DELETE',
      data: {
        tempid,
      },
    };
    sendData(options)
      .then(({ response, error }) => {
        if (response && !error) {
          const { deleteyn } = response;
          if (deleteyn) {
            callback();
            alertMessage.alert('삭제되었습니다.');
          }
        } else {
          alertMessage.alert('삭제가 실패되었습니다.');
          setIsError(true);
        }
      })
      .catch(() => {
        alertMessage.alert('삭제가 실패되었습니다.');
        setIsError(true);
      });
  };

  // Init Default Position Leader
  useEffect(() => {
    const { PRJ_LEVEL, signLineTempListInfo } = info;
    if (PRJ_LEVEL?.toString() === '3') {
      setIsLvl3(true);
    }

    const targetList = signLineTempListInfo.filter(item => item.seq === 2) || [];
    if (targetList.length > 0) {
      return setPositionLeader({ ...targetList[0] });
    }
    return setPositionLeader({});
  }, []);

  return {
    isLoading,
    isError,
    formRef,
    formData: getCurrentFormJson(),
    actions: { submitForm, saveTemp, deleteTemp },
  };
};
