import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';

import request from 'utils/request';

import download from 'js-file-download';
import alertMessage from '../../../../components/Notification/Alert';
import jsonToQueryString from '../../../../utils/jsonToQueryString';

const statusSelectorWithComponent = item => {
  const result = {
    status: '',
    iconComponent: <span />,
  };
  const statusData = ['finishyn', 'dropyn', 'progresslistyn', 'saveyn', 'regyn'];
  statusData.some(status => {
    const check = item[status] === 'Y';
    result.status = check ? status : '';
    return check;
  });
  switch (result.status) {
    case 'regyn':
      result.iconComponent = <span className="icon icon_ing1" />;
      break;
    case 'saveyn':
      result.iconComponent = <span className="icon icon_ing1" />;
      break;
    case 'progresslistyn':
      result.iconComponent = <span className="icon icon_ing2" />;
      break;
    case 'dropyn':
      result.iconComponent = <span className="icon icon_ing3" />;
      result.colorCode = '#ff5d5d';
      break;
    case 'finishyn':
      result.iconComponent = <span className="icon icon_ing5" />;
      result.colorCode = '#0000ff';
      break;
    default:
      result.iconComponent = <span />;
      break;
  }
  return result;
};

export default ({ requestQuery, userid, enableFixView = () => {}, disableFixView = () => {} }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [jasperUrl, setJasperUrl] = useState('');

  useEffect(() => {
    if (isExpanded) {
      enableFixView();
    } else {
      disableFixView();
    }
  }, [isExpanded, enableFixView, disableFixView]);

  // Init Data
  useEffect(() => {
    const fetchData = async params => {
      const { response, error } = await request({
        url: '/apigate/v1/portal/sign/report',
        method: 'GET',
        params,
      });
      return { response, error };
    };

    const { current, pageSize } = pagination;
    const {
      startDate,
      endDate,
      stdDate,
      // headQuarts,
      projectType,
      prjLvValues,
    } = requestQuery;

    const curtDate = moment().format('YYYYMMDD');

    const startDt = startDate
      ? startDate.replace(/\./gi, '')
      : moment(curtDate, 'YYYYMMDD')
          .add(-1, 'year')
          .format('YYYYMMDD');
    const endDt = endDate ? endDate.replace(/\./gi, '') : moment(curtDate).format('YYYYMMDD');
    const stdDt = stdDate ? stdDate.replace(/\./gi, '') : moment(curtDate).format('YYYYMMDD');

    const requestQuery2 = {
      type: 'list',
      currentPage: current,
      pageSize,
      sdd: startDt,
      edd: endDt,
      stdd: stdDt,
      // headQuarts,
      prjtype: projectType === '' ? undefined : projectType,
      prjlvl: prjLvValues ? prjLvValues.toString() : undefined,
    };

    // jasfer for url set
    const requestQuery3 = {
      sdd: startDt,
      edd: endDt,
      stdd: stdDt,
      usrid: userid,
      prjtype: projectType === '' ? undefined : projectType,
      prjlvl: prjLvValues ? prjLvValues.toString() : undefined,
    };
    const queryString3 = jsonToQueryString(requestQuery3);
    setJasperUrl(
      `http://10.100.22.102:4488/jasperserver-pro/rest_v2/reports/organizations/organization_1/reports/RecordList.pdf?j_username=superuser&j_password=superuser&${queryString3}`,
    );

    setIsLoading(true);

    fetchData(requestQuery2)
      .then(({ response, error }) => {
        if (response && !error) {
          // if (this.mounted) {
          const {
            list,
            pagination: { total: responseTotal },
          } = response;

          const nextList = list.map(item => ({
            ...item,
            status: statusSelectorWithComponent(item),
            contents: [],
            loaded: false,
          }));

          setData(nextList);
          setTotal(responseTotal);
        } else {
          console.debug(error);
          alertMessage.alert('Server Error');
        }
      })
      .catch(() => {
        alertMessage.alert('Server Error');
      });

    setIsLoading(false);
  }, [pagination, requestQuery, userid]);

  const pageSizeHandler = useCallback(e => {
    const pageSize = parseInt(e.target.value, 10);
    setPagination(prevState => ({ ...prevState, current: 1, pageSize }));
  }, []);

  const pageHandler = useCallback(value => {
    setPagination(prevState => ({ ...prevState, current: value }));
  }, []);

  const getReport = useCallback(async params => {
    const url = '/apigate/v1/portal/sign/report/down';
    const { response, error } = request({
      url,
      method: 'GET',
      responseType: 'blob',
      params,
    });
    return { response, error };
  }, []);

  const handleReportDown = () => {
    const { startDate, endDate, stdDate, projectType, prjLvValues } = requestQuery;

    const curtDate = moment().format('YYYYMMDD');

    const startDt = startDate
      ? startDate.replace(/\./gi, '')
      : moment(curtDate, 'YYYYMMDD')
          .add(-1, 'year')
          .format('YYYYMMDD');
    const endDt = endDate ? endDate.replace(/\./gi, '') : moment(curtDate).format('YYYYMMDD');
    const stdDt = stdDate ? stdDate.replace(/\./gi, '') : moment(curtDate).format('YYYYMMDD');

    const requestQuery2 = {
      type: 'list',
      sdd: startDt,
      edd: endDt,
      stdd: stdDt,
      prjtype: projectType === '' ? undefined : projectType,
      prjlvl: prjLvValues ? prjLvValues.toString() : undefined,
    };

    getReport(requestQuery2)
      .then(({ response, error }) => {
        if (response && !error) {
          const date = moment().format('YYYYMMDDHHmmss');
          const fileName = `recordList_${date}`;
          download(response, `${fileName}.xls`);
        } else {
          alertMessage.alert('Server Error');
        }
      })
      .catch(() => {
        alertMessage.alert('Server Error');
      });
  };

  const toggleExpanded = () => {
    setIsExpanded(prevState => !prevState);
  };

  return {
    isLoading,
    isExpanded,
    pagination: {
      ...pagination,
      total,
    },
    data,
    jasperUrl,
    actions: {
      pageHandler,
      pageSizeHandler,
      handleReportDown,
      toggleExpanded,
    },
  };
};
