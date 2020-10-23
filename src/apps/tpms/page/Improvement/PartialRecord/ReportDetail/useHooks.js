import React, { useState, useEffect } from 'react';
import { fromJS } from 'immutable';
import moment from 'moment';

import alertMessage from 'apps/tpms/components/Notification/Alert';

import request from 'utils/request';
import jsonToQueryString from 'apps/tpms/utils/jsonToQueryString';

export const useHooks = ({ requestQuery }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pagination, setPagination] = useState(fromJS({ current: 1, pageSize: 10, total: 0 }));
  const [data, setData] = useState(fromJS([]));

  useEffect(() => {
    fetchTableData();
  }, []);

  const statusSelectorWithComponent = item => {
    const result = {
      status: '',
      iconComponent: <span />,
    };
    const statusData = ['regyn', 'saveyn', 'dropyn', 'delayyn', 'progressyn', 'finishyn'];
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
        result.iconComponent = <span className="icon icon_ing6" />;
        break;
      case 'progressyn':
        result.iconComponent = <span className="icon icon_ing2" />;
        break;
      case 'dropyn':
        result.iconComponent = <span className="icon icon_ing3" />;
        break;
      case 'delayyn':
        result.iconComponent = <span className="icon icon_ing4" />;
        break;
      case 'finishyn':
        result.iconComponent = <span className="icon icon_ing5" />;
        break;
      default:
        result.iconComponent = <span />;
        break;
    }
    return result;
  };

  const fetchTableData = async (isInit, brdId) => {
    const { startDate, endDate, projectType, prjLvValues, part, team, status, fab, area, keyno, model } = requestQuery;

    const curtDate = moment().format('YYYYMMDD');
    const startDt = startDate
      ? startDate.replace(/\./gi, '')
      : moment(curtDate, 'YYYYMMDD')
          .add(-1, 'year')
          .format('YYYYMMDD');
    const endDt = endDate ? endDate.replace(/\./gi, '') : moment(curtDate).format('YYYYMMDD');

    const requestQuery2 = {
      type: 'departlist',
      currentPage: isInit ? 1 : pagination.get('current'),
      pageSize: pagination.get('pageSize'),
      mnuId: 'list',
      sysid: 'TPMS',
      sdd: startDt,
      edd: endDt,
      prjtype: projectType === '' ? undefined : projectType,
      prjlvl: prjLvValues,
      partcd: part === 'all' ? undefined : part,
      teamcd: team === 'all' ? undefined : team,
      status: status === 'all' ? undefined : status,
      fab,
      area,
      keyno,
      model,
    };
    const queryString = jsonToQueryString(requestQuery2);
    const { response, error } = await request({
      url: `/apigate/v1/portal/sign/report?${queryString}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    });

    if (response && !error) {
      const { list } = response;
      const nextList = list.map(item => ({
        ...item,
        status: statusSelectorWithComponent(item),
        contents: [],
        loaded: false,
      }));
      setData(fromJS(nextList));
      setPagination(pagination.set('total', response.pagination.total));
    } else {
      console.debug(error);
      alertMessage.alert('Server Error');
    }
  };

  return { isExpanded, pagination, data, action: { setIsExpanded } };
};
