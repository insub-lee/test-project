/* eslint-disable camelcase */
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
      // todo
      // 지연
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
      const date = moment().format('YYYYMMDDHHmmss');
      // const fileName = `recordReport_${date}_${profile.usrid}`;
      const fileName = `personalReport_${date}`;
      download(response, `${fileName}.xls`);
    } else {
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
    const { startDate: startDate_, endDate: endDate_, project_type, empNo, fab, area, keyno, model } = requestQuery;

    const curtDate = moment().format('YYYYMMDD');
    const startDate = startDate_
      ? startDate_.replace(/\./gi, '')
      : moment(curtDate, 'YYYYMMDD')
          .add(-1, 'year')
          .format('YYYYMMDD');
    const endDate = endDate_ ? endDate_.replace(/\./gi, '') : moment(curtDate).format('YYYYMMDD');

    const tempRequestQuery = {
      type: 'personal',
      currentPage: (pagination.get('current') !== 0 ? pagination.get('current') - 1 : 0) * 10,
      pageSize: pagination.get('pageSize'),
      startDate,
      endDate,
      reg_user_id: empNo,
      project_type,
      fab: fab === 'all' ? undefined : fab,
      area: area === 'all' ? undefined : area,
      keyno: keyno === 'all' ? undefined : keyno,
      model: model === 'all' ? undefined : model,
    };
    const { response, error } = await request({
      url: `/api/tpms/v1/common/searchInfo`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'POST',
      data: tempRequestQuery,
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
