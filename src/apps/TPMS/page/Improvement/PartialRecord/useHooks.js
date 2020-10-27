import { useState, useEffect, useMemo, useRef } from 'react';
import moment from 'moment';
import request from 'utils/request';

import alertMessage from '../../../components/Notification/Alert';
import jsonToQueryString from '../../../utils/jsonToQueryString';

export const useHooks = () => {
  const expandableContainerRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectorFab, setSelectorFab] = useState([]);
  const [selectorArea, setSelectorArea] = useState([]);
  const [selectorKeyno, setSelectorKeyno] = useState([]);
  const [selectorModel, setSelectorModel] = useState([]);
  const [detailRequestQuery, setDetailRequestQuery] = useState({});
  const [fab, setFab] = useState('all');
  const [area, setArea] = useState('all');

  const status = useMemo(
    () => [
      { value: 'all', text: '전체' },
      { value: '01', text: '등록' },
      { value: '02', text: '진행' },
      { value: '03', text: '완료' },
      { value: '04', text: 'Drop' },
    ],
    [],
  );

  const searchType = useMemo(
    () => [
      { value: 1, text: '검색조건1' },
      { value: 2, text: '검색조건2' },
      { value: 3, text: '검색조건3' },
    ],
    [],
  );

  useEffect(() => {
    fetchSelectorKeyno();
    fetchselectorModel();
  }, [fab, area]);

  const [headQuarts, setHeadQuarts] = useState([{ value: '', text: '' }]);
  const [part, setPart] = useState([{ value: 0, text: '' }]);
  const [team, setTeam] = useState([{ value: 0, text: '' }]);

  const projectlevel = useMemo(
    () => ({
      label: 'Project Level',
      name: 'projectLevel',
      values: [
        { label: '본부', value: '1', checked: false },
        { label: '담당', value: '2' },
        { label: '팀', value: '3' },
        { label: 'Part', value: '4' },
      ],
    }),
    [],
  );
  const optionPjtType = useMemo(
    () => ({
      label: 'Project Type',
      name: 'projectType',
      values: [
        { label: '전체', value: '', checked: true },
        { label: '개별개선', value: 'G' },
        { label: 'TFT', value: 'T' },
        { label: 'Wafer Loss', value: 'W' },
      ],
    }),
    [],
  );
  const startDate = useMemo(
    () =>
      moment()
        .add(-1, 'year')
        .format('YYYY.MM.DD'),
    [],
  );
  const endDate = useMemo(() => moment().format('YYYY.MM.DD'), []);
  const stdDate = useMemo(() => moment().format('YYYY.MM.DD'), []);

  const optionTerm = useMemo(
    () => ({
      label: '등록기간',
      values: [
        { name: 'startDate', value: startDate },
        { name: 'endDate', value: endDate },
      ],
    }),
    [],
  );
  useEffect(() => {
    const fetchData = async () => {
      const requestQuery = {
        type: 'usrIdDeptInfo',
      };
      const queryString = jsonToQueryString(requestQuery);
      const { response, error } = await request({
        url: `/apigate/v1/portal/sign/report?${queryString}`,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        method: 'GET',
      });

      if (response && !error) {
        const { deptInfo } = response;
        setHeadQuarts([{ value: deptInfo.dpcd, text: deptInfo.dpnm }]);
      } else {
        console.debug(error);
        alertMessage.alert('Server Error');
      }
    };
    //   await fetchData();
    //   await fetchPart();
    //   await fetchTeam();
    //   await fetchSelectorFab();
    //   await fetchSelectorArea();
    //   await fetchSelectorKeyno();
    //   await fetchselectorModel();

    fetchData();
  }, []);

  useEffect(() => {
    if (headQuarts[0].value !== '') {
      fetchPart();
      fetchTeam();
      fetchSelectorFab();
      fetchSelectorArea();
    }
  }, [headQuarts]);

  const fetchPart = async () => {
    const requestQuery = {
      type: 'partList',
      partcd: headQuarts[0]?.value || '',
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await request({
      url: `/apigate/v1/portal/sign/report?${queryString}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    });

    if (response && !error) {
      const { deptInfoList } = response;
      setPart(
        deptInfoList.map(item => ({
          value: item.dpcd,
          text: item.dpnm,
        })),
      );
    } else {
      console.debug(error);
      alertMessage.alert('Server Error');
    }
  };

  const fetchTeam = async () => {
    const selectObject = document.querySelector(`select[name=part]`);
    let selectValue = '';
    if (selectObject !== null) {
      selectValue = selectObject.options[selectObject.selectedIndex].value;
    }

    const requestQuery = {
      type: 'teamList',
      teamcd: selectValue,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await request({
      url: `/apigate/v1/portal/sign/report?${queryString}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    });
    if (response && !error) {
      const { deptInfoList } = response;
      setTeam(
        deptInfoList.map(item => ({
          value: item?.dpcd,
          text: item?.dpnm,
        })),
      );
    } else {
      console.debug(error);
      alertMessage.alert('Server Error');
    }
  };

  const fetchSelectorFab = async () => {
    const url = '/apigate/v1/portal/sign/task?sysid=TPMS&mnuid=FABLIST';
    const { response, error } = await request({
      url,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    });
    if (response && !error) {
      const { list } = response;
      setSelectorFab(list);
    } else {
      console.debug(error);
      alertMessage.alert('Server Error');
    }
  };

  const fetchSelectorArea = async () => {
    const url = '/apigate/v1/portal/sign/task?sysid=TPMS&mnuid=AREALIST';
    const { response, error } = await request({
      url,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    });
    if (response && !error) {
      const { list } = response;
      setSelectorArea(list);
    } else {
      console.debug(error);
      alertMessage.alert('Server Error');
    }
  };

  const fetchSelectorKeyno = async () => {
    const requestQuery = {
      fab: fab === 'all' ? undefined : fab,
      area: area === 'all' ? undefined : area,
    };
    const queryString = jsonToQueryString(requestQuery);
    const url = `/apigate/v1/portal/sign/task?sysid=TPMS&mnuid=KEYNOLIST`;
    const getUrl = `${url}&${queryString}`;
    const { response, error } = await request({
      url: getUrl,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    });
    if (response && !error) {
      const { list } = response;
      setSelectorKeyno(list);
    } else {
      console.debug(error);
      alertMessage.alert('Server Error');
    }
  };

  const fetchselectorModel = async () => {
    const requestQuery = {
      fab: fab === 'all' ? undefined : fab,
      area: area === 'all' ? undefined : area,
    };
    const queryString = jsonToQueryString(requestQuery);
    const url = `/apigate/v1/portal/sign/task?sysid=TPMS&mnuid=MODELLIST`;
    const getUrl = `${url}&${queryString}`;
    const { response, error } = await request({
      url: getUrl,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    });
    if (response && !error) {
      const { list } = response;
      setSelectorModel(list);
    } else {
      console.debug(error);
      alertMessage.alert('Server Error');
    }
  };

  const submitData = e => {
    e.preventDefault();
    const requestQuery = {};
    const data = new FormData(e.target);
    let headQuartsLabel = '';
    let partLabel = '';
    let teamLable = '';
    let prjTypeLabel = '';
    const prjLvlLabels = [];
    const prjLvValues = [];
    let statusLabel = '';
    let fabLabel = '';
    let areaLabel = '';
    let keynoLabel = '';
    let modelLabel = '';
    data.forEach((value, key) => {
      requestQuery[key] = value;
      if (key === 'headQuarts') {
        const selectObject = document.querySelector(`select[name=${key}]`);
        headQuartsLabel = selectObject.options[selectObject.selectedIndex].text;
      } else if (key === 'part') {
        const selectObject = document.querySelector(`select[name=${key}]`);
        partLabel = selectObject.options[selectObject.selectedIndex].text;
      } else if (key === 'team') {
        const selectObject = document.querySelector(`select[name=${key}]`);
        teamLable = selectObject.options[selectObject.selectedIndex].text;
      } else if (key === 'projectType') {
        const label = document.querySelector(`input[name=${key}]:checked`).parentElement.innerText;
        prjTypeLabel = label;
      } else if (key.includes('projectLevel')) {
        const label = document.querySelector(`input[name=${key}]`).parentElement.innerText;
        prjLvlLabels.push(label);
        prjLvValues.push(value);
      } else if (key === 'status') {
        const selectObject = document.querySelector(`select[name=${key}]`);
        statusLabel = selectObject.options[selectObject.selectedIndex].text;
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

    requestQuery.partLabel = partLabel;
    requestQuery.headQuartsLabel = headQuartsLabel;
    requestQuery.teamLable = teamLable;
    requestQuery.prjTypeLabel = prjTypeLabel;
    requestQuery.prjLvlLabels = prjLvlLabels.join(',');
    requestQuery.prjLvValues = prjLvValues.join(',');
    requestQuery.statusLabel = statusLabel;
    requestQuery.fabLabel = fabLabel;
    requestQuery.areaLabel = areaLabel;
    requestQuery.keynoLabel = keynoLabel;
    requestQuery.modelLabel = modelLabel;
    requestQuery.searchKey = new Date().getTime();

    if (requestQuery !== {}) {
      setDetailRequestQuery(requestQuery);
    }

    // todo fix
    expandableContainerRef.current.toggleCollapsed();
    expandableContainerRef.current.disableExpanded();
    // this.props.disableExpandedView();
    setShowDetail(true);
  };

  return {
    isLoading,
    part,
    team,
    projectlevel,
    selectorKeyno,
    selectorModel,
    selectorFab,
    selectorArea,
    optionTerm,
    optionPjtType,
    showDetail,
    headQuarts,
    searchType,
    expandableContainerRef,
    detailRequestQuery,
    status,
    action: { submitData, fetchTeam, setFab, setArea },
  };
};
