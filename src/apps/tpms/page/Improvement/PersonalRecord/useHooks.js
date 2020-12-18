/* eslint-disable camelcase */
import { useState, useEffect, useMemo, useRef } from 'react';
import moment from 'moment';
import request from 'utils/request';
import alertMessage from '../../../components/Notification/Alert';
import jsonToQueryString from '../../../utils/jsonToQueryString';

export const useHooks = ({ authInfo, isAuthLoading, isAuthError }) => {
  const expandableContainerRef = useRef();

  const [label, setLabel] = useState(``);
  const [empNo, setEmpNo] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectorFab, setSelectorFab] = useState([]);
  const [selectorArea, setSelectorArea] = useState([]);
  const [selectorKeyno, setSelectorKeyno] = useState([]);
  const [selectorModel, setSelectorModel] = useState([]);
  const [detailRequestQuery, setDetailRequestQuery] = useState({});
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [fab, setFab] = useState('all');
  const [area, setArea] = useState('all');
  const [showDetail, setShowdetail] = useState(false);
  const startDate = useMemo(
    () =>
      moment()
        .add(-1, 'year')
        .format('YYYY.MM.DD'),
    [],
  );
  const endDate = useMemo(() => moment().format('YYYY.MM.DD'), []);
  const stdDate = useMemo(() => moment().format('YYYY.MM.DD'), []);

  const optionTerm = {
    label: '등록기간',
    values: [
      { name: 'startDate', value: startDate },
      { name: 'endDate', value: endDate },
    ],
  };
  const project_type = {
    label: 'Project Type',
    name: 'project_type',
    values: [
      { label: '전체', value: '', checked: true },
      { label: '개별개선', value: 'G' },
      { label: 'TFT', value: 'T' },
      { label: 'Wafer Loss', value: 'W' },
    ],
  };

  const fetchSelectorFab = async () => {
    const { response, error } = await request({
      url: `/api/tpms/v1/common/searchInfo?type=fab`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    });
    if (response && !error) {
      const { list } = response;
      setSelectorFab(list);
    } else {
      alertMessage.alert('Server Error');
    }
  };
  const fetchSelectorArea = async () => {
    const { response, error } = await request({
      url: `/api/tpms/v1/common/searchInfo?type=area`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    });
    if (response && !error) {
      const { list } = response;
      setSelectorArea(list);
    } else {
      alertMessage.alert('Server Error');
    }
  };

  const fetchSelectorKeyno = async () => {
    const requestQuery = {
      fab: fab === 'all' ? undefined : fab,
      area: area === 'all' ? undefined : area,
      type: 'keyno',
    };
    const url = `/api/tpms/v1/common/searchInfo?${jsonToQueryString(requestQuery)}`;
    const { response, error } = await request({
      url,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    });
    if (response && !error) {
      const { list } = response;
      setSelectorKeyno(list);
    } else {
      alertMessage.alert('Server Error');
    }
  };

  const fetchselectorModel = async () => {
    const requestQuery = {
      fab: fab === 'all' ? undefined : fab,
      area: area === 'all' ? undefined : area,
      type: 'model',
    };
    const url = `/api/tpms/v1/common/searchInfo?${jsonToQueryString(requestQuery)}`;
    const { response, error } = await request({
      url,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    });
    if (response && !error) {
      const { list } = response;
      setSelectorModel(list);
    } else {
      alertMessage.alert('Server Error');
    }
  };

  useEffect(() => {
    if (!isAuthLoading && !isAuthError) {
      const { empNo: id, usrNm, userRoleInfoList } = authInfo;
      setLabel(`${id} ${usrNm} ${userRoleInfoList.length > 0 ? userRoleInfoList[0].psnm : ''}`);
      setEmpNo(id);
      setSelectedOption([{ key: id, label: `${id} ${usrNm} ${userRoleInfoList.length > 0 ? userRoleInfoList[0].psnm : ''}` }]);
      setOptions([{ key: id, label: `${id} ${usrNm} ${userRoleInfoList.length > 0 ? userRoleInfoList[0].psnm : ''}` }]);
    }
  }, [isAuthLoading, isAuthError]);

  useEffect(() => {
    fetchSelectorFab();
    fetchSelectorArea();
    fetchSelectorKeyno();
    fetchselectorModel();
  }, []);

  const submitData = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const requestQuery = {};
    let project_type_label = '';
    let fabLabel = '';
    let areaLabel = '';
    let keynoLabel = '';
    let modelLabel = '';
    data.forEach((value, key) => {
      requestQuery[key] = value;
      if (key === 'project_type') {
        project_type_label = document.querySelector(`input[name=${key}]:checked`).parentElement.innerText;
      } else if (key === 'fab') {
        const selectObject = document.querySelector(`select[name=${key}]`);
        fabLabel = selectObject.options[selectObject.selectedIndex].text;
      } else if (key === 'area') {
        const selectObject = document.querySelector(`select[name=${key}]`);
        areaLabel = selectObject.options[selectObject.selectedIndex].text;
      } else if (key === 'keyno') {
        const selectObject = document.querySelector(`select[name=${key}]`);
        keynoLabel = selectObject.options[selectObject.selectedIndex].text;
      } else if (key === 'model') {
        const selectObject = document.querySelector(`select[name=${key}]`);
        modelLabel = selectObject.options[selectObject.selectedIndex].text;
      }
    });
    requestQuery.project_type_label = project_type_label;
    requestQuery.fabLabel = fabLabel;
    requestQuery.areaLabel = areaLabel;
    requestQuery.keynoLabel = keynoLabel;
    requestQuery.modelLabel = modelLabel;
    requestQuery.userInfo = label;
    requestQuery.searchKey = new Date().getTime();

    if (requestQuery !== {}) {
      setDetailRequestQuery(requestQuery);
    }

    expandableContainerRef.current.toggleCollapsed();
    expandableContainerRef.current.disableExpanded();
    // this.props.disableExpandedView();
    setShowdetail(true);
  };

  const handleChangeEmployee = value => {
    setSelectedOption({ selectedOption: [value], usrid: value.key, label: value.label });
  };

  // todo
  const getUsers = () => {};

  return {
    isLoading,
    expandableContainerRef,
    empNo,
    selectorFab,
    selectorArea,
    selectorKeyno,
    selectorModel,
    selectedOption,
    options,
    isLoadingOptions,
    showDetail,
    startDate,
    endDate,
    stdDate,
    detailRequestQuery,
    optionTerm,
    project_type,
    action: { submitData, handleChangeEmployee, getUsers, setFab, setArea },
  };
};
