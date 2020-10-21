import React, { useState, useEffect, useCallback, useMemo } from 'react';
import moment from 'moment';
import download from 'js-file-download';
import { Modal } from 'antd';

import request from 'utils/request';

import jsonToQueryString from '../../../../utils/jsonToQueryString';
import alertMessage from '../../../../components/Notification/Alert';

export default ({ usrid, requestQuery, enableFixView, disableFixView }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState(0);
  const [tooltipList, setTooltipList] = useState([]);
  const [jasperUrl, setJasperUrl] = useState('');

  useEffect(() => {
    if (isExpanded) {
      enableFixView();
    } else {
      disableFixView();
    }
  }, [isExpanded, enableFixView, disableFixView]);

  useEffect(() => {
    const fetchTableData = async params => {
      const { response, error } = await request({
        url: '/apigate/v1/portal/sign/report',
        method: 'GET',
        params,
      });
      return { response, error };
    };

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
      type: 'devlist',
      sdd: startDt,
      edd: endDt,
      stdd: stdDt,
      prjtype: projectType === '' ? undefined : projectType,
      prjlvl: prjLvValues ? prjLvValues.toString() : undefined,
    };

    const requestQuery3 = {
      sdd: startDt,
      edd: endDt,
      stdd: stdDt,
      prjtype: projectType === '' ? undefined : projectType,
      prjlvl: prjLvValues ? prjLvValues.toString() : undefined,
      sdd1: startDt,
      edd1: endDt,
      stdd1: stdDt,
      prjtype1: projectType === '' ? undefined : projectType,
      prjlvl1: prjLvValues ? prjLvValues.toString() : undefined,
      userid1: usrid || '',
      sdd2: startDt,
      edd2: endDt,
      stdd2: stdDt,
      prjtype2: projectType === '' ? undefined : projectType,
      prjlvl2: prjLvValues ? prjLvValues.toString() : undefined,
      userid2: usrid || '',
      sdd3: startDt,
      edd3: endDt,
      stdd3: stdDt,
      prjtype3: projectType === '' ? undefined : projectType,
      prjlvl3: prjLvValues ? prjLvValues.toString() : undefined,
      userid3: usrid || '',
    };

    setJasperUrl(
      `http://10.100.22.102:4488/jasperserver-pro/dashboard/viewer.html?j_username=jasperuser&j_password=jasperuser&${jsonToQueryString(
        requestQuery3,
      )}&viewAsDashboardFrame=true#/public/Samples/Dashboards/RecordReports_1`,
    );

    setIsLoading(true);

    fetchTableData(requestQuery2)
      .then(({ response, error }) => {
        if (response && !error) {
          if (response && !error) {
            const { list: resonseList, pagination: reponsePagination } = response;
            const nextList = resonseList.map(item => {
              let schCompletePerCnt = ((item.progresscnt / (item.progresscnt + item.delaycnt)) * 100).toFixed(2);
              let finishPerCnt = ((item.finishcnt / item.regcnt) * 100).toFixed(2);
              schCompletePerCnt = schCompletePerCnt === 'Infinity' ? 0 : schCompletePerCnt;
              finishPerCnt = finishPerCnt === 'Infinity' ? 0 : finishPerCnt;
              return {
                ...item,
                counts: [
                  { key: 'regcnt', value: item.regcnt, dpcd: item.dpcd },
                  { key: 'savecnt', value: item.savecnt, dpcd: item.dpcd },
                  { key: 'dropcnt', value: item.dropcnt, dpcd: item.dpcd },
                  { key: 'delaycnt', value: item.delaycnt, dpcd: item.dpcd },
                  { key: 'progresscnt', value: item.progresscnt, dpcd: item.dpcd },
                  { key: 'finishcnt', value: item.finishcnt, dpcd: item.dpcd },
                  {
                    key: 'schCompletePer',
                    value: isNaN(schCompletePerCnt) ? '0 %' : `${schCompletePerCnt} %`,
                    dpcd: item.dpcd,
                  },
                  {
                    key: 'finishPer',
                    value: isNaN(finishPerCnt) ? '0 %' : `${finishPerCnt} %`,
                    dpcd: item.dpcd,
                  },
                  { key: 'regfinishcnt', value: item.regfinishcnt, dpcd: item.dpcd },
                  { key: 'progress_step1_cnt', value: item.progress_step1_cnt, dpcd: item.dpcd },
                  { key: 'progress_step2_cnt', value: item.progress_step2_cnt, dpcd: item.dpcd },
                  { key: 'progress_step3_cnt', value: item.progress_step3_cnt, dpcd: item.dpcd },
                  { key: 'progress_step4_cnt', value: item.progress_step4_cnt, dpcd: item.dpcd },
                  { key: 'progress_step5_cnt', value: item.progress_step5_cnt, dpcd: item.dpcd },
                ],
              };
            });

            console.debug('@@@', nextList);
            setList(nextList);
            setPagination(reponsePagination);
            setTooltipList(
              nextList.map(() => [
                { list: [], checked: false, isLoading: false },
                { list: [], checked: false, isLoading: false },
                { list: [], checked: false, isLoading: false },
                { list: [], checked: false, isLoading: false },
                { list: [], checked: false, isLoading: false },
                { list: [], checked: false, isLoading: false },
                { list: [], checked: false, isLoading: false },
                { list: [], checked: false, isLoading: false },
                { list: [], checked: false, isLoading: false },
                { list: [], checked: false, isLoading: false },
                { list: [], checked: false, isLoading: false },
              ]),
            );
          } else {
            alertMessage.alert('Server Error');
          }
        }
      })
      .catch(() => {
        alertMessage.alert('Server Error');
      });

    setIsLoading(false);
  }, [requestQuery]);

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
      type: 'devlist',
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
          const fileName = `recordReport_${date}`;
          download(response, `${fileName}.xls`);
        } else {
          alertMessage.alert('Server Error');
        }
      })
      .catch(() => {
        alertMessage.alert('Server Error');
      });
  };

  const downloadAll = () => {
    if (jasperUrl) window.open(jasperUrl);
  };

  const toggleExpanded = () => {
    setIsExpanded(prevState => !prevState);
  };

  const fetchTooltipData = useCallback(async params => {
    const url = '/apigate/v1/portal/sign/report';
    const { response, error } = await request({
      url,
      method: 'GET',
      params,
    });
    return { response, error };
  }, []);

  const handleTooltip = (cntdiv, dpcd, rowIndex, colIndex) => {
    setTooltipList(prevState => {
      const nextTooltipList = [...prevState];
      if (colIndex > 8) {
        nextTooltipList[rowIndex][colIndex - 3].isLoading = true;
      } else {
        nextTooltipList[rowIndex][colIndex].isLoading = true;
      }
      return nextTooltipList;
    });

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
      type: 'devprjlist',
      sdd: startDt,
      edd: endDt,
      stdd: stdDt,
      prjtype: projectType === '' ? undefined : projectType,
      prjlvl: prjLvValues ? prjLvValues.toString() : undefined,
      cntdiv,
      dpcd,
    };

    fetchTooltipData(requestQuery2)
      .then(({ response, error }) => {
        if (response && !error) {
          const { list: responseList } = response;
          setTooltipList(prevState => {
            const nextList = [...prevState];
            console.debug('@@@@ Check : ', nextList);
            if (colIndex > 8) {
              nextList[rowIndex][colIndex - 3].checked = true;
              nextList[rowIndex][colIndex - 3].isLoading = false;
              nextList[rowIndex][colIndex - 3].list = responseList;
            } else {
              nextList[rowIndex][colIndex].checked = true;
              nextList[rowIndex][colIndex].isLoading = false;
              nextList[rowIndex][colIndex].list = responseList;
            }
            return { nextList };
          });
        } else {
          setTooltipList(prevState => {
            const nextList = [...prevState];
            if (colIndex > 8) {
              nextList[rowIndex][colIndex - 3].checked = false;
              nextList[rowIndex][colIndex - 3].isLoading = false;
              nextList[rowIndex][colIndex - 3].list = [];
            } else {
              nextList[rowIndex][colIndex].checked = false;
              nextList[rowIndex][colIndex].isLoading = false;
              nextList[rowIndex][colIndex].list = [];
            }
            return { nextList };
          });
          alertMessage.alert('Server Error');
        }
      })
      .catch(() => {
        alertMessage.alert('Server Error');
      });
  };

  const count = useMemo(() => {
    const initCounter = {
      totRegcnt: 0,
      totSavecnt: 0,
      totDropcnt: 0,
      totDelaycnt: 0,
      totProgresscnt: 0,
      totFinishcnt: 0,
      totRegfinishcnt: 0,
      totProgress1: 0,
      totProgress2: 0,
      totProgress3: 0,
      totProgress4: 0,
      totProgress5: 0,
    };

    return list.reduce((acc, cur) => {
      const {
        totRegcnt,
        totSavecnt,
        totDropcnt,
        totDelaycnt,
        totProgresscnt,
        totFinishcnt,
        totRegfinishcnt,
        totProgress1,
        totProgress2,
        totProgress3,
        totProgress4,
        totProgress5,
      } = acc;
      return {
        totRegcnt: totRegcnt + (cur.regcnt || 0),
        totSavecnt: totSavecnt + (cur.savecnt || 0),
        totDropcnt: totDropcnt + (cur.dropcnt || 0),
        totDelaycnt: totDelaycnt + (cur.delaycnt || 0),
        totProgresscnt: totProgresscnt + (cur.progresscnt || 0),
        totFinishcnt: totFinishcnt + (cur.finishcnt || 0),
        totRegfinishcnt: totRegfinishcnt + (cur.regfinishcnt || 0),
        totProgress1: totProgress1 + (cur.progress_step1_cnt || 0),
        totProgress2: totProgress2 + (cur.progress_step2_cnt || 0),
        totProgress3: totProgress3 + (cur.progress_step3_cnt || 0),
        totProgress4: totProgress4 + (cur.progress_step4_cnt || 0),
        totProgress5: totProgress5 + (cur.progress_step5_cnt || 0),
      };
    }, initCounter);
  }, [list]);

  const loadModal = (cntdiv, dpcd, rowIndex, colIndex) => {
    fetchTooltipData({ cntdiv, dpcd, rowIndex, colIndex })
      .then(({ response, error }) => {
        if (response && !error) {
          const { list: responseList } = response;
          Modal.info({
            title: null,
            width: 750,
            content: (
              <div style={{ maxHeight: 500, overflowY: 'auto' }}>
                <dl style={{ minHeight: 50, textAlign: 'left' }}>
                  {responseList.map(tooltip => (
                    <li key={tooltip.project_id}>{`${tooltip.project_id} :: ${tooltip.project_title}`}</li>
                  ))}
                  {responseList.length < 1 && <li>조회 가능한 데이터가 없습니다.</li>}
                </dl>
              </div>
            ),
            icon: null,
            okText: '닫기',
            onOk() {},
          });
        } else {
          alertMessage.alert('Server Error');
        }
      })
      .catch(() => {
        alertMessage.alert('Server Error');
      });
  };

  return {
    isLoading,
    isExpanded,
    list,
    pagination,
    tooltipList,
    jasperUrl,
    count,
    actions: {
      handleReportDown,
      downloadAll,
      toggleExpanded,
      handleTooltip,
      loadModal,
    },
  };
};
