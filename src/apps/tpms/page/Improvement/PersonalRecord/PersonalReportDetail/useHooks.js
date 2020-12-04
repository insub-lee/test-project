import React, { useState, useEffect, useRef } from 'react';
import { fromJS } from 'immutable';
import moment from 'moment';
import download from 'js-file-download';

import request from 'utils/request';

import alertMessage from '../../../../components/Notification/Alert';

import jsonToQueryString from '../../../../utils/jsonToQueryString';

export const useHooks = ({ requestQuery }) => {
  const projectInfoModalRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [pagination, setPagination] = useState(fromJS({ current: 1, pageSize: 10, total: 0 }));
  const [data, setData] = useState(fromJS([]));

  useEffect(() => {
    if (Object.keys(requestQuery).length > 0) {
      fetchTableData();
    }
  }, [requestQuery, pagination]);

  const statusSelectorWithComponent = item => {
    const result = {
      status: '',
      iconComponent: <span />,
    };
    // const statusData = ['regyn', 'saveyn', 'dropyn', 'delayyn', 'progressyn', 'finishyn'];
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

  const handleReportDown = async () => {
    // const { pagination } = this.state;
    const { startDate, endDate, projectType, empNo, fab, area, keyno, model } = requestQuery;

    const curtDate = moment().format('YYYYMMDD');
    const startDt = startDate
      ? startDate.replace(/\./gi, '')
      : moment(curtDate, 'YYYYMMDD')
          .add(-1, 'year')
          .format('YYYYMMDD');
    const endDt = endDate ? endDate.replace(/\./gi, '') : moment(curtDate).format('YYYYMMDD');

    const requestQuery2 = {
      type: 'perlist',
      // currentPage: isInit ? 1 : pagination.get('current'),
      // pageSize: pagination.get('pageSize'),
      mnuId: 'list',
      sysid: 'TPMS',
      sdd: startDt,
      edd: endDt,
      schusrid: empNo,
      prjtype: projectType === '' ? undefined : projectType,
      fab,
      area,
      keyno,
      model,
    };
    const queryString = jsonToQueryString(requestQuery2);
    const { response, error } = await request({
      url: `/apigate/v1/portal/sign/report/down?${queryString}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      responseType: 'blob',
      method: 'GET',
    });
    if (response && !error) {
      console.debug(response);
      const date = moment().format('YYYYMMDDHHmmss');
      // const fileName = `recordReport_${date}_${profile.usrid}`;
      const fileName = `personalReport_${date}`;
      download(response, `${fileName}.xls`);
    } else {
      console.debug(error);
      alertMessage.alert('Server Error');
    }
  };
  const pageHandler = page => {
    setPagination(pagination.set('current', page));
  };

  const pageSizeHandler = e => {
    const pageSize = parseInt(e.target.value, 10);
    setPagination(pagination.set('pageSize', pageSize).set('current', 1));
  };

  const projectInfoModalOpen = prjId => {
    projectInfoModalRef.current.handleOpen(prjId);
  };

  const fetchTableData = async () => {
    const { startDate, endDate, projectType, empNo, fab, area, keyno, model } = requestQuery;

    const curtDate = moment().format('YYYYMMDD');
    const startDt = startDate
      ? startDate.replace(/\./gi, '')
      : moment(curtDate, 'YYYYMMDD')
          .add(-1, 'year')
          .format('YYYYMMDD');
    const endDt = endDate ? endDate.replace(/\./gi, '') : moment(curtDate).format('YYYYMMDD');

    const requestQuery2 = {
      type: 'perlist',
      currentPage: pagination.get('current'),
      pageSize: pagination.get('pageSize'),
      mnuId: 'list',
      sysid: 'TPMS',
      sdd: startDt,
      edd: endDt,
      schusrid: empNo,
      prjtype: projectType === '' ? undefined : projectType,
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
      setPagination(pagination.set('total', response.pagination.total).set('current', pagination.get('current')));
      setIsLoading(false);
    } else {
      console.debug(error);
      alertMessage.alert('Server Error');
    }
  };

  return {
    data,
    pagination,
    isExpanded,
    isLoading,
    projectInfoModalRef,
    action: { setIsExpanded, handleReportDown, pageHandler, pageSizeHandler, projectInfoModalOpen },
  };
};
