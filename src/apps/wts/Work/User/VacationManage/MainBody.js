import SchedulerView from 'apps/wts/Work/Modals/SchedulerView';
import React from 'react';
import moment from 'moment';

import { jsonToQueryString } from 'utils/helpers';

import Wrapper from './Wrapper';
import service from '../../service';

const descCompare = (a, b) => {
  const diff = a.workdt - b.workdt;
  if (diff < 0) {
    return 1;
  }
  if (diff > 0) {
    return -1;
  }
  return 0;
};

class MainBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canUseThisPage: true,
      hasInfo: false,
      manInfo: {
        empno: '', // 사번
        usrnm: '', // 이름
        workjo: '',
        banjang: '', // 반장
        area: '',
        bay: '',
        time52: 0,
        count52: 0,
      },
      /* 날짜, 근무조, 구분, 근태, 출근, 퇴근, 시작, 종료, 내용, 시간, 서명, 식사
       * workdt, workjo, wampmnnoff, working, wst, wet, owst, owet, owcoment, owt, psign, meal
       *
       */
      manHisInfoList: [],
      isLoading: true,
    };
    this.fetchInfo = this.fetchInfo.bind(this);
    this.fetchHasInfo = this.fetchHasInfo.bind(this);
    this.initData = this.initData.bind(this);
  }

  componentDidMount() {
    this.initData();
  }

  initData() {
    const { profile } = this.props;
    this.fetchInfo(profile.EMP_NO).then(payload => {
      /*
      if (payload.manInfo && payload.manInfo.bangubun === '0') {
        this.setState({ ...payload });
      } else {
        this.setState({ canUseThisPage: false });
      }
      */
      if (payload.manInfo) {
        this.setState({ ...payload });
      } else if (profile.EMP_NO === 'ADMIN') {
        this.setState({ canUseThisPage: true });
      } else {
        this.setState({ canUseThisPage: false });
      }
    });
    this.fetchHasInfo(profile.EMP_NO, moment(new Date()).format('YYYYMMDD')).then(payload => {
      this.setState({ hasInfo: payload.hisOXInfo !== null });
    });
  }

  async fetchHasInfo(empNo, date) {
    const requestQuery = {
      empNo,
      type: 'hisOXInfo',
      searchDt: date,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manHis.get(queryString);
    const payload = {};
    if (response && !error) {
      payload[requestQuery.type] = response[requestQuery.type];
    }
    return payload;
  }

  async fetchInfo(empNo) {
    const requestQuery = {
      empNo,
      type: 'manInfo',
      searchDt: moment(new Date()).format('YYYYMMDD'),
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manHis.get(queryString);
    const payload = {};
    if (response && !error) {
      payload[requestQuery.type] = response[requestQuery.type];
    }
    return payload;
  }

  render() {
    const { manInfo, manHisInfoList, hasInfo, canUseThisPage, isLoading } = this.state;
    const { profile } = this.props;
    return (
      <Wrapper>
        {canUseThisPage ? (
          <SchedulerView empNo={profile.EMP_NO} usrNm={profile.NAME_KOR} banjangId={manInfo.banjangId} site={manInfo.site} />
        ) : (
          <div>현재 사용자는 사용 불가능한 페이지입니다.</div>
        )}
      </Wrapper>
    );
  }
}

export default MainBody;
