/* eslint-disable camelcase */
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
  switch (item?.step) {
    // 등록
    case 2:
      result.iconComponent = <span className="icon icon_ing1" />;
      break;
    // 결재 중
    case 1:
    case 0:
    case 9:
    case 10:
    case 11:
    case 20:
    case 21:
      result.iconComponent = <span className="icon icon_ing6" />;
      break;
    // 진행 중
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      result.iconComponent = <span className="icon icon_ing2" />;
      break;
    // 드랍
    case 22:
      result.iconComponent = <span className="icon icon_ing3" />;
      break;
    // todo 지연
    case 30:
      result.iconComponent = <span className="icon icon_ing4" />;
      break;

    // 완료
    case 12:
      result.iconComponent = <span className="icon icon_ing5" />;
      break;
    default:
      result.iconComponent = <span />;
      break;
  }
  return result;
};

export default ({ requestQuery, authInfo, enableFixView = () => {}, disableFixView = () => {} }) => {
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
        url: `/api/tpms/v1/common/searchInfo`,
        method: 'POST',
        data: params,
      });
      return { response, error };
    };

    const { current, pageSize } = pagination;
    const { startDate: startDate_, endDate: endDate_, stdDate: stdDate_, headQuarts: headQuarter, project_type, project_level } = requestQuery;

    const curtDate = moment().format('YYYYMMDD');

    const startDate = startDate_
      ? startDate_.replace(/\./gi, '')
      : moment(curtDate, 'YYYYMMDD')
          .add(-1, 'year')
          .format('YYYYMMDD');
    const endDate = endDate_ ? endDate_.replace(/\./gi, '') : moment(curtDate).format('YYYYMMDD');
    const standardDate = stdDate_ ? stdDate_.replace(/\./gi, '') : moment(curtDate).format('YYYYMMDD');

    const tableRequestQuery = {
      type: 'personalReportList',
      currentPage: (current !== 0 ? current - 1 : 0) * 10,
      pageSize,
      startDate,
      endDate,
      stdDate: standardDate,
      headQuarter,
      project_type,
      project_level,
    };

    // jasfer for url set
    const requestQuery3 = {
      sdd: startDate,
      edd: endDate,
      stdd: standardDate,
      usrid: authInfo?.empNo,
      prjtype: project_type === '' ? undefined : project_type,
      prjlvl: project_level ? project_level.toString() : undefined,
    };
    const queryString3 = jsonToQueryString(requestQuery3);
    setJasperUrl(
      `http://10.100.22.102:4488/jasperserver-pro/rest_v2/reports/organizations/organization_1/reports/RecordList.pdf?j_username=superuser&j_password=superuser&${queryString3}`,
    );

    setIsLoading(true);

    fetchData(tableRequestQuery)
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
          alertMessage.alert('Server Error');
        }
      })
      .catch(() => {
        alertMessage.alert('Server Error');
      });

    setIsLoading(false);
  }, [pagination, requestQuery, authInfo?.empNo]);

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
