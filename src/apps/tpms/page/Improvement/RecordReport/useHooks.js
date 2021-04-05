/* eslint-disable camelcase */
import { useState, useEffect, useMemo } from 'react';
import moment from 'moment';

import request from 'utils/request';
import alertMessage from '../../../components/Notification/Alert';
import initReportFormData from './reportFormData';

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [requestQuery, setRequestQuery] = useState({});
  const [headQuartsLabel, setHeadQuartsLabel] = useState('');
  const [headQuartsValue, setHeadQuartsValue] = useState('');
  const startDate = useMemo(
    () =>
      moment()
        .add(-1, 'year')
        .format('YYYY.MM.DD'),
    [],
  );
  const endDate = useMemo(() => moment().format('YYYY.MM.DD'), []);
  const stdDate = useMemo(() => moment().format('YYYY.MM.DD'), []);

  const submitData = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const query = {};
    let project_level_lable = '';
    let project_level = '';
    let project_type_label = '';
    let headQuarterLabel = '';
    let headQuarterValue = '';
    data.forEach((value, key) => {
      query[key] = value;
      if (key.includes('project_level')) {
        project_level_lable = document.querySelector(`input[name=${key}]`).parentElement.innerText;
        project_level = value;
      } else if (key === 'project_type') {
        project_type_label = document.querySelector(`input[name=${key}]:checked`).parentElement.innerText;
      } else if (key === 'headQuarts') {
        headQuarterLabel = document.querySelector(`select[name=${key}]`).firstElementChild.innerText;
        headQuarterValue = value;
      }
    });

    query.project_level_lable = project_level_lable;
    query.project_type_label = project_type_label;
    query.project_level = project_level;
    query.headQuarterLabel = headQuarterLabel;
    query.headQuarterValue = headQuarterValue;
    setRequestQuery(query);
    setShowDetail(true);
  };

  const reportFormData = () => {
    const formData = initReportFormData;
    delete formData[0].option;
    delete formData[1].option;
    delete formData[2].option;
    formData[0].option = {
      label: '등록기간',
      values: [
        { name: 'startDate', value: startDate },
        { name: 'endDate', value: endDate },
      ],
    };
    formData[1].option = {
      label: '기준일자',
      values: [{ name: 'stdDate', value: stdDate }],
    };
    formData[2].option = {
      label: '본부',
      name: 'headQuarts',
      values: [
        {
          label: headQuartsLabel,
          value: headQuartsValue,
        },
      ],
    };
    return formData;
  };

  useEffect(() => {
    const fetchInitData = async () => {
      const { response } = await request({
        url: '/api/tpms/v1/common/searchInfo?type=headquarter',
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      return { response };
    };

    setIsLoading(true);

    fetchInitData()
      .then(({ response, error }) => {
        if (response && !error) {
          const { list } = response;
          if (list.length > 0) {
            const { dpnm, dpcd } = list[0];
            setHeadQuartsLabel(dpnm);
            setHeadQuartsValue(dpcd);
          } else {
            // alertMessage.alert('Server Error');
          }
        } else {
          alertMessage.alert('Server Error');
        }
      })
      .catch(() => {
        alertMessage.alert('Server Error');
      });

    setIsLoading(false);

    return () => {
      const prjlvl = initReportFormData[4].option.values;
      prjlvl[0].checked = false;
      prjlvl[1].checked = false;
      prjlvl[2].checked = false;
      prjlvl[3].checked = false;
    };
  }, []);

  return {
    isLoading,
    showDetail,
    startDate,
    endDate,
    stdDate,
    requestQuery,
    headQuartsLabel,
    headQuartsValue,
    reportFormData: reportFormData(),
    actions: {
      submitData,
    },
  };
};
