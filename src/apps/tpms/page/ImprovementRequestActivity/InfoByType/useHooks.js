import { useState } from 'react';
import moment from 'moment';

const location = [
  { value: 'ALL', text: 'ALL' },
  { value: 'PHOTO', text: 'PHOTO' },
  { value: 'ETCH', text: 'ETCH' },
  { value: 'DIFF', text: 'DIFF' },
  { value: 'IMP', text: 'IMP' },
  { value: 'CVD', text: 'CVD' },
  { value: 'END', text: 'END' },
  { value: 'FQC', text: 'FQC' },
];

const type = [
  { value: 'none', text: '선택하세요' },
  { value: 'action', text: '조치현황' },
  { value: 'registration', text: '등록건수현황' },
];
const useHooks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(() =>
    moment()
      .add(-1, 'year')
      .format('YYYY.MM.DD'),
  );
  const [endDate, setEndDate] = useState(() => moment().format('YYYY.MM.DD'));
  const [viewType, setViewType] = useState('none');
  const [viewFilter, setViewFilter] = useState('ALL');
  const [actionData, setActionData] = useState([
    { key: 'PHOTO', value1: 0, value2: 0, value3: 0, value4: 0, avg: 0 },
    { key: 'ETCH', value1: 0, value2: 0, value3: 0, value4: 0, avg: 0 },
    { key: 'DIFF', value1: 0, value2: 0, value3: 0, value4: 0, avg: 0 },
    { key: 'IMP', value1: 0, value2: 0, value3: 0, value4: 0, avg: 0 },
    { key: 'CVD', value1: 0, value2: 0, value3: 0, value4: 0, avg: 0 },
    { key: 'END', value1: 0, value2: 0, value3: 0, value4: 0, avg: 0 },
    { key: 'FQC', value1: 0, value2: 0, value3: 0, value4: 0, avg: 0 },
  ]);
  const [actionTrendInfo, setActionTrendInfo] = useState({ isLoaded: false, labels: [], datasets: [] });
  const [registData, setRegistData] = useState([
    {
      key: 'PHOTO',
      data: [
        { regcnt: 0, draftdt: '201801' },
        { regcnt: 0, draftdt: '201802' },
        { regcnt: 0, draftdt: '201803' },
        { regcnt: 0, draftdt: '201804' },
        { regcnt: 0, draftdt: '201805' },
        { regcnt: 0, draftdt: '201806' },
        { regcnt: 0, draftdt: '201807' },
        { regcnt: 0, draftdt: '201808' },
        { regcnt: 0, draftdt: '201809' },
        { regcnt: 0, draftdt: '201810' },
        { regcnt: 0, draftdt: '201811' },
        { regcnt: 0, draftdt: '201812' },
      ],
    },
    {
      key: 'ETCH',
      data: [
        { regcnt: 0, draftdt: '201801' },
        { regcnt: 0, draftdt: '201802' },
        { regcnt: 0, draftdt: '201803' },
        { regcnt: 0, draftdt: '201804' },
        { regcnt: 0, draftdt: '201805' },
        { regcnt: 0, draftdt: '201806' },
        { regcnt: 0, draftdt: '201807' },
        { regcnt: 0, draftdt: '201808' },
        { regcnt: 0, draftdt: '201809' },
        { regcnt: 0, draftdt: '201810' },
        { regcnt: 0, draftdt: '201811' },
        { regcnt: 0, draftdt: '201812' },
      ],
    },
    {
      key: 'DIFF',
      data: [
        { regcnt: 0, draftdt: '201801' },
        { regcnt: 0, draftdt: '201802' },
        { regcnt: 0, draftdt: '201803' },
        { regcnt: 0, draftdt: '201804' },
        { regcnt: 0, draftdt: '201805' },
        { regcnt: 0, draftdt: '201806' },
        { regcnt: 0, draftdt: '201807' },
        { regcnt: 0, draftdt: '201808' },
        { regcnt: 0, draftdt: '201809' },
        { regcnt: 0, draftdt: '201810' },
        { regcnt: 0, draftdt: '201811' },
        { regcnt: 0, draftdt: '201812' },
      ],
    },
    {
      key: 'IMP',
      data: [
        { regcnt: 0, draftdt: '201801' },
        { regcnt: 0, draftdt: '201802' },
        { regcnt: 0, draftdt: '201803' },
        { regcnt: 0, draftdt: '201804' },
        { regcnt: 0, draftdt: '201805' },
        { regcnt: 0, draftdt: '201806' },
        { regcnt: 0, draftdt: '201807' },
        { regcnt: 0, draftdt: '201808' },
        { regcnt: 0, draftdt: '201809' },
        { regcnt: 0, draftdt: '201810' },
        { regcnt: 0, draftdt: '201811' },
        { regcnt: 0, draftdt: '201812' },
      ],
    },
    {
      key: 'CVD',
      data: [
        { regcnt: 0, draftdt: '201801' },
        { regcnt: 0, draftdt: '201802' },
        { regcnt: 0, draftdt: '201803' },
        { regcnt: 0, draftdt: '201804' },
        { regcnt: 0, draftdt: '201805' },
        { regcnt: 0, draftdt: '201806' },
        { regcnt: 0, draftdt: '201807' },
        { regcnt: 0, draftdt: '201808' },
        { regcnt: 0, draftdt: '201809' },
        { regcnt: 0, draftdt: '201810' },
        { regcnt: 0, draftdt: '201811' },
        { regcnt: 0, draftdt: '201812' },
      ],
    },
    {
      key: 'END',
      data: [
        { regcnt: 0, draftdt: '201801' },
        { regcnt: 0, draftdt: '201802' },
        { regcnt: 0, draftdt: '201803' },
        { regcnt: 0, draftdt: '201804' },
        { regcnt: 0, draftdt: '201805' },
        { regcnt: 0, draftdt: '201806' },
        { regcnt: 0, draftdt: '201807' },
        { regcnt: 0, draftdt: '201808' },
        { regcnt: 0, draftdt: '201809' },
        { regcnt: 0, draftdt: '201810' },
        { regcnt: 0, draftdt: '201811' },
        { regcnt: 0, draftdt: '201812' },
      ],
    },
    {
      key: 'FQC',
      data: [
        { regcnt: 0, draftdt: '201801' },
        { regcnt: 0, draftdt: '201802' },
        { regcnt: 0, draftdt: '201803' },
        { regcnt: 0, draftdt: '201804' },
        { regcnt: 0, draftdt: '201805' },
        { regcnt: 0, draftdt: '201806' },
        { regcnt: 0, draftdt: '201807' },
        { regcnt: 0, draftdt: '201808' },
        { regcnt: 0, draftdt: '201809' },
        { regcnt: 0, draftdt: '201810' },
        { regcnt: 0, draftdt: '201811' },
        { regcnt: 0, draftdt: '201812' },
      ],
    },
  ]);
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
    },
  };
};

export default useHooks;
