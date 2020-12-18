import { useState, useEffect } from 'react';
import request from 'utils/request';
import moment from 'moment';
import alertMessage from '../../../components/Notification/Alert';

const colorPalette = [
  `#ffc1ff`,
  '#ffc164',
  '#ffff64',
  '#00ca64',
  '#ff6364',
  '#00caca',
  '#ff63c1',
  'purple',
  'silver',
  'violet',
  'black',
  'blue',
  '#1fb5ad',
  '#7d783d',
  '#61235a',
  '#ea3b3b',
  '#186465',
];
const type = [
  { value: '', text: '선택하세요' },
  { value: 'action', text: '조치현황' },
  { value: 'registration', text: '등록건수현황' },
];
const useHooks = () => {
  const [location, setLocation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(() =>
    moment()
      .add(-1, 'year')
      .format('YYYY.MM.DD'),
  );
  const [endDate, setEndDate] = useState(() => moment().format('YYYY.MM.DD'));
  const [viewType, setViewType] = useState('');
  const [viewFilter, setViewFilter] = useState('');

  useEffect(async () => {
    const { response, error } = await request({
      url: `/api/tpms/v1/common/searchInfo?type=typeList`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    });
    const { list } = response;
    if (list instanceof Array && list.length > 0) {
      setLocation(list.map(e => ({ value: e, text: e })));
    }
  }, []);

  const [actionData, setActionData] = useState([]);
  const [actionTrendInfo, setActionTrendInfo] = useState({ isLoaded: false, labels: [], datasets: [] });
  const [registData, setRegistData] = useState([]);
  const [total, setTotal] = useState({
    key: '',
    labels: [],
    data: [],
  });
  const [registTrendInfo, setRegistTrendInfo] = useState({ isLoaded: false, labels: [], datasets: [] });
  const optionTerm = {
    label: '등록기간',
    values: [
      { name: 'startDate', value: startDate },
      { name: 'endDate', value: endDate },
    ],
  };
  const handleReportDown = () => {};

  const enableExpandedView = () => {};

  const disableExpandedView = () => {};

  const submitData = async e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const requestQuery = {};

    data.forEach((value, key) => {
      requestQuery[key] = value;
    });

    const { location: area, type, startDate, endDate } = requestQuery;

    if (type === '') {
      alertMessage.notice('분류가 미선택되었습니다.');
      return;
    }
    if (type === 'action') {
      const { response, error } = await request({
        url: `/api/tpms/v1/common/searchInfo`,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        method: 'POST',
        data: {
          type: 'stackedBarChartByActionAndType',
          area,
          startDate,
          endDate,
        },
      });
      const { response: response2, error: error2 } = await request({
        url: `/api/tpms/v1/common/searchInfo`,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        method: 'POST',
        data: {
          type: 'tableDataByType',
          area,
          list: area === '' ? location.map(({ text }) => text) : null,
          startDate,
          endDate,
        },
      });

      const { list: list2 } = response2;
      setActionData(list2 || []);

      const { list } = response;
      if (list instanceof Array && list.length > 0) {
        setActionTrendInfo({
          isLoaded: true,
          data: {
            labels: list.map(ee => ee.draftdt),

            datasets: [
              {
                label: '조치중',
                data: list.map(ee => ee.measurecnt),
                backgroundColor: 'rgb(255, 99, 132)',
              },
              {
                label: '완료',
                data: list.map(ee => ee.completioncnt),

                backgroundColor: 'rgb(54, 162, 235)',
              },
              {
                label: '불가',
                data: list.map(ee => ee.rejectcnt),

                backgroundColor: 'rgb(75, 192, 192)',
              },
            ],
          },
        });
      }
    }

    if (type === 'registration') {
      const { response } = await request({
        url: `/api/tpms/v1/common/searchInfo`,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        method: 'POST',
        data: {
          type: 'stackedBarChartByType',
          area,
          list: area === '' ? location.map(({ text }) => text) : null,
          startDate,
          endDate,
        },
      });

      const { list } = response;
      const labels = [];
      const datasets = [];

      list.forEach(each => {
        labels.push(each?.draftdt);
      });

      location.forEach(({ text }, idx) => {
        let isOkayToPush = false;
        const tempData = [];

        list.forEach(l => {
          const key = Object.keys(l).filter(k => k === text);
          if (l[key] !== undefined) {
            isOkayToPush = true;
            tempData.push(l[key]);
          }
        });
        if (isOkayToPush) {
          datasets.push({ label: text, data: tempData, backgroundColor: colorPalette[idx] });
        }
      });

      const tempArea = Object.keys(list[0]).filter(eachKey => eachKey !== 'draftdt');

      setRegistData({
        labels: tempArea,
        datasets: list,
      });

      setRegistTrendInfo({
        isLoaded: true,
        data: {
          labels,
          datasets,
        },
      });
    }

    setViewType(requestQuery?.type);
    setStartDate(requestQuery?.startDate);
    setEndDate(requestQuery?.endDate);
    setViewFilter(requestQuery?.location);
  };

  return {
    isLoading,
    location,
    type,
    optionTerm,
    viewType,
    viewFilter,
    actionData,
    actionTrendInfo,
    registData,
    total,
    registTrendInfo,
    action: {
      handleReportDown,
      enableExpandedView,
      disableExpandedView,
      submitData,
    },
  };
};

export default useHooks;
