import { useState, useEffect, useMemo } from 'react';
import moment from 'moment';

import request from 'utils/request';
import alertMessage from '../../../components/Notification/Alert';
import initListFormData from './listFormData';

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
    const prjLvlLabels = [];
    const prjLvValues = [];
    let prjTypeLabel = '';
    let headerLabel = '';
    data.forEach((value, key) => {
      query[key] = value;
      let label = '';
      if (key.includes('projectLevel')) {
        label = document.querySelector(`input[name=${key}]`).parentElement.innerText;
        prjLvlLabels.push(label);
        prjLvValues.push(value);
      } else if (key === 'projectType') {
        label = document.querySelector(`input[name=${key}]:checked`).parentElement.innerText;
        prjTypeLabel = label;
      } else if (key === 'headQuarts') {
        label = document.querySelector(`select[name=${key}]`).firstElementChild.innerText;
        headerLabel = label;
      }
    });
    query.prjLvlLabels = prjLvlLabels.join(',');
    query.prjTypeLabel = prjTypeLabel;
    query.headQuartsLabel = headerLabel;
    query.prjLvValues = prjLvValues.join(',');
    setRequestQuery(query);
    setShowDetail(true);
  };

  const listFormData = () => {
    const formData = initListFormData;

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
      const { response, error } = await request({
        url: '/apigate/v1/portal/sign/report',
        method: 'GET',
        params: {
          type: 'usrIdDeptInfo',
        },
      });
      return { response, error };
    };

    setIsLoading(true);

    fetchInitData()
      .then(({ response, error }) => {
        if (response && !error) {
          const {
            deptInfo: { dpnm, dpcd },
          } = response;
          setHeadQuartsLabel(dpnm);
          setHeadQuartsValue(dpcd);
        } else {
          alertMessage.alert('Server Error');
        }
      })
      .catch(() => {
        alertMessage.alert('Server Error');
      });

    setIsLoading(false);

    return () => {
      const prjlvl = initListFormData[4].option.values;
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
    listFormData: listFormData(),
    actions: {
      submitData,
    },
  };
};
