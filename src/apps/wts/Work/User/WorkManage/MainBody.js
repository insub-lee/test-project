import React from 'react';
import moment from 'moment';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { Icon, Spin } from 'antd';
import 'rc-dialog/assets/index.css';

import StyledVirtualized from 'apps/wts/components/CommonStyledElement/StyledVirtualized';
import { getVirtualizedMinHeight, jsonToQueryString } from 'utils/helpers';
import MonthlyPicker from 'apps/wts/components/MonthlyPicker';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import Wrapper from './Wrapper';
import WorkerRecordWriterModal from '../../Modals/WorkerRecordWriterModal';
import WorkerRecordModifyModal from '../../Modals/WorkerRecordModifyModal';
import WorkerTimeSimulatorModal from '../../Modals/WorkerTimeSimulatorModal';
import service from '../../service';
import StyledTable from '../../StyledTable';

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
    this.fetchWorkList = this.fetchWorkList.bind(this);
    this.fetchHasInfo = this.fetchHasInfo.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.initData = this.initData.bind(this);
    this.handleOpenWorkerRecordModifyModal = this.handleOpenWorkerRecordModifyModal.bind(this);

    this.workerRecordWriterModal = React.createRef();
    this.workerRecordModifyModal = React.createRef();
    this.workerTimeSimulatorModal = React.createRef();
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
    this.setState({ isLoading: true, manHisInfoList: [] }, () => {
      this.fetchWorkList(profile.EMP_NO, moment(new Date()).format('YYYYMM')).then(payload => {
        this.setState({ ...payload, isLoading: false });
      });
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

  async fetchWorkList(empNo, date) {
    const requestQuery = {
      empNo,
      type: 'manHisInfoList',
      searchDt: date,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manHis.get(queryString);
    const payload = {};
    if (response && !error) {
      payload[requestQuery.type] = response[requestQuery.type]
        .sort((a, b) => descCompare(a, b))
        .filter(history => history.workdt <= moment(new Date()).format('YYYYMMDD'));
    }
    return payload;
  }

  handleChangeDate(momentDate) {
    const { profile } = this.props;
    this.setState({ isLoading: true, manHisInfoList: [] }, () => {
      this.fetchWorkList(profile.EMP_NO, momentDate.format('YYYYMM')).then(payload => {
        this.setState({ ...payload, isLoading: false });
      });
    });
  }

  handleOpenModal(type) {
    switch (type) {
      case 0:
        this.workerRecordWriterModal.current.handleOpenModal();
        break;
      case 2:
        this.workerTimeSimulatorModal.current.handleOpenModal();
        break;
      default:
        break;
    }
  }

  handleOpenWorkerRecordModifyModal(record) {
    this.workerRecordModifyModal.current.handleOpenModal(record);
  }

  render() {
    const { manInfo, manHisInfoList, hasInfo, canUseThisPage, isLoading } = this.state;
    const { profile } = this.props;
    const columns = [
      {
        label: '날짜',
        dataKey: 'workdt',
        percentWidth: 12,
        cellRenderer: ({ cellData }) => moment(cellData, 'YYYYMMDD').format('YYYY년 MM월 DD일'),
      },
      {
        label: '조',
        dataKey: 'workjo',
        percentWidth: 4,
      },
      {
        label: '구분',
        dataKey: 'wampmnnoff',
        percentWidth: 8,
      },
      {
        label: '일일근태',
        dataKey: 'working',
        percentWidth: 17.5,
        headerRenderer: () => (
          <ul>
            <li style={{ height: 39, lineHeight: '39px' }}>일일근태</li>
            <li style={{ height: 39, lineHeight: '39px' }}>
              <ul className="row">
                <li style={{ height: 39, lineHeight: '39px', flexBasis: '20%' }}>근태</li>
                <li style={{ height: 39, lineHeight: '39px', flexBasis: '40%' }}>출근</li>
                <li style={{ height: 39, lineHeight: '39px', flexBasis: '40%' }}>퇴근</li>
              </ul>
            </li>
          </ul>
        ),
        cellRenderer: ({ rowData }) => (
          <ul className="row">
            <li style={{ height: 39, lineHeight: '39px', flexBasis: '20%' }}>{rowData.working === 'X' ? 'OFF' : rowData.working}</li>
            <li style={{ height: 39, lineHeight: '39px', flexBasis: '40%' }}>{rowData.wst ? moment(rowData.wst, 'HHmm').format('HH:mm') : '-'}</li>
            <li style={{ height: 39, lineHeight: '39px', flexBasis: '40%' }}>{rowData.wet ? moment(rowData.wet, 'HHmm').format('HH:mm') : '-'}</li>
          </ul>
        ),
      },
      {
        label: '연장근무',
        dataKey: 'overWorking',
        percentWidth: 50,
        headerRenderer: () => (
          <ul>
            <li style={{ height: 39, lineHeight: '39px' }}>연장근무</li>
            <li style={{ height: 39, lineHeight: '39px' }}>
              <ul className="row">
                <li style={{ height: 39, lineHeight: '39px', flexBasis: '14%' }}>시작</li>
                <li style={{ height: 39, lineHeight: '39px', flexBasis: '14%' }}>종료</li>
                <li style={{ height: 39, lineHeight: '39px', flexBasis: '56%' }}>내용</li>
                <li style={{ height: 39, lineHeight: '39px', flexBasis: '8%' }}>시간</li>
                <li style={{ height: 39, lineHeight: '39px', flexBasis: '8%' }}>식사</li>
              </ul>
            </li>
          </ul>
        ),
        cellRenderer: ({ rowData }) => (
          <ul className="row">
            <li style={{ height: 39, lineHeight: '39px', flexBasis: '14%' }}>{rowData.owst ? moment(rowData.owst, 'HHmm').format('HH:mm') : '-'}</li>
            <li style={{ height: 39, lineHeight: '39px', flexBasis: '14%' }}>{rowData.owet ? moment(rowData.owet, 'HHmm').format('HH:mm') : '-'}</li>
            <li style={{ height: 39, lineHeight: '39px', flexBasis: '56%' }}>{rowData.owcoment || '-'}</li>
            <li style={{ height: 39, lineHeight: '39px', flexBasis: '8%' }}>{rowData.owt || '-'}</li>
            <li style={{ height: 39, lineHeight: '39px', flexBasis: '8%' }}>{rowData.meal}</li>
          </ul>
        ),
      },
      {
        label: '반장확인',
        dataKey: 'bsign',
        percentWidth: 8.5,
      },
    ];
    return (
      <Wrapper>
        {canUseThisPage ? (
          <>
            <div className="title">
              <span>금주 근무 현황</span>
            </div>
            <div className="btn_wrap">
              <StyledButton className="btn-gray btn-sm mr5" onClick={() => this.handleOpenModal(2)}>
                근무시간 시뮬레이터
              </StyledButton>
              <StyledButton className="btn-gray btn-sm" onClick={() => this.handleOpenModal(0)}>
                근무 이력 등록
              </StyledButton>
            </div>
            <StyledTable className="tb_wrap">
              <table className="tb02">
                <colgroup>
                  <col width="15%" />
                  <col width="15%" />
                  <col width="20%" />
                  <col width="12.5%" />
                  <col width="12.5%" />
                  <col width="12.5%" />
                  <col width="12.5%" />
                </colgroup>
                <tbody>
                  <tr className="bd">
                    <th rowSpan={2}>사번</th>
                    <th rowSpan={2}>이름</th>
                    <th rowSpan={2}>근무조(반장)</th>
                    <th colSpan={2}>근무위치</th>
                    <th colSpan={2}>52시간</th>
                  </tr>
                  <tr className="bd">
                    <th>AREA</th>
                    <th>BAY</th>
                    <th>시간</th>
                    <th>연장근무횟수</th>
                  </tr>
                  <tr className="bd">
                    <td>{manInfo.empno}</td>
                    <td>{manInfo.usrnm}</td>
                    <td>{`${manInfo.workjo}(${manInfo.banjang || ''})`}</td>
                    <td>{manInfo.area}</td>
                    <td>{manInfo.bay}</td>
                    <td>{manInfo.time52 || 0}</td>
                    <td>
                      <span style={{ color: '#D50000', fontWeight: 600 }}>{manInfo.count52 || 0}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </StyledTable>
            <hr
              style={{
                border: '1px solid #eaecee',
                marginTop: 40,
                marginBottom: 40,
              }}
            />
            <div className="title">
              <span>월별근무 이력</span>
            </div>
            <div className="search_div">
              <MonthlyPicker name="date" value={new Date()} onChange={this.handleChangeDate} />
            </div>
            <div style={{ overflowX: 'auto' }}>
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
                <StyledVirtualized minHeight={getVirtualizedMinHeight(78, 39, manHisInfoList.length, 500)} headerHeight={78} style={{ minWidth: 1000 }}>
                  <AutoSizer>
                    {({ height, width }) => (
                      <Table
                        width={width}
                        height={height}
                        headerHeight={78}
                        rowHeight={39}
                        rowCount={manHisInfoList.length}
                        rowGetter={({ index }) => manHisInfoList[index]}
                        headerClassName="virtualized_header"
                        gridClassName="virtualized_grid"
                        rowClassName="virtualized_row clickable_row"
                        noRowsRenderer={() => (
                          <div className="virtualized_noData">
                            <span>{isLoading ? 'Loading...' : 'No Data'}</span>
                          </div>
                        )}
                        onRowClick={({ rowData }) => this.handleOpenWorkerRecordModifyModal(rowData)}
                      >
                        {columns.map(column => (
                          <Column
                            key={column.dataKey}
                            {...column}
                            width={(width * column.percentWidth) / 100}
                            style={{
                              ...column.style,
                              lineHeight: '39px',
                            }}
                          />
                        ))}
                      </Table>
                    )}
                  </AutoSizer>
                </StyledVirtualized>
              </Spin>
            </div>
            <WorkerRecordWriterModal
              ref={this.workerRecordWriterModal}
              empNo={profile.EMP_NO}
              usrNm={profile.NAME_KOR}
              onClose={this.initData}
              workJo={manInfo.workjo}
              site={manInfo.site}
              limited={(manInfo.count52 || 0) > 2}
            />
            <WorkerRecordModifyModal ref={this.workerRecordModifyModal} onClose={this.initData} site={manInfo.site} />
            <WorkerTimeSimulatorModal ref={this.workerTimeSimulatorModal} />
          </>
        ) : (
          <div>현재 사용자는 사용 불가능한 페이지입니다.</div>
        )}
      </Wrapper>
    );
  }
}

export default MainBody;
