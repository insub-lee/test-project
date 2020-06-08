import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { AutoSizer, Column, Table } from 'react-virtualized';
import XLSX from 'xlsx';
import StyledVirtualized from 'apps/wts/components/CommonStyledElement/StyledVirtualized';
import { getVirtualizedMinHeight, jsonToQueryString } from 'utils/helpers';
import DatePicker from 'apps/wts/components/DatePicker';
import Button from 'components/Button';
import { Icon, Spin } from 'antd';
import Wrapper from './Wrapper';
import WorkerModifyCommentModal from '../../Modals/WorkerModifyCommentModal';
import StyledContents from '../../StyledContents';
import service from '../../service';
import NightWorkAcceptModal from '../../Modals/NightWorkAcceptModal';
import NightWorkCanselModal from '../../Modals/NightWorkCanselModal';
import NightWorkAllAcceptModal from '../../Modals/NightWorkAllAcceptModal';
import NightWorkAllCancelModal from '../../Modals/NightWorkAllCancelModal';
import ChiefWorkerRecordWriterModal from '../../Modals/ChiefWorkerRecordWriterModal';
import WorkerRecordModifyModal from '../../Modals/WorkerRecordModifyModal';
import AllWorkSchedulerModal from '../../Modals/AllWorkSchedulerModal';

class SubBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      manWorkHisInfoList: [],
      manSameAreaWorkJoList: [],
      isLoading: true,
      manInfo: undefined,
      currentJo: '',
    };
    this.fetchWorkList = this.fetchWorkList.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.openCommentModal = this.openCommentModal.bind(this);
    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.initData = this.initData.bind(this);
    this.openNightWorkAcceptModal = this.openNightWorkAcceptModal.bind(this);
    this.openNightWorkCanselModal = this.openNightWorkCanselModal.bind(this);
    this.openNightWorkAllAcceptModal = this.openNightWorkAllAcceptModal.bind(this);
    this.openNightWorkAllCancelModal = this.openNightWorkAllCancelModal.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.downloadExcel = this.downloadExcel.bind(this);
    this.handleChangeWorkjo = this.handleChangeWorkjo.bind(this);
    this.openRecordWriter = this.openRecordWriter.bind(this);
    this.handleOpenWorkerRecordModifyModal = this.handleOpenWorkerRecordModifyModal.bind(this);
    this.openAllWorkScheduler = this.openAllWorkScheduler.bind(this);

    this.workerModifyCommentModal = React.createRef();
    this.nightWorkAcceptModal = React.createRef();
    this.nightWorkCanselModal = React.createRef();
    this.nightWorkAllAcceptModal = React.createRef();
    this.nightWorkAllCancelModal = React.createRef();
    this.workerRecordWriterModal = React.createRef();
    this.workerRecordModifyModal = React.createRef();
    this.allWorkSchedulerModal = React.createRef();
  }

  componentDidMount() {
    const { manInfo } = this.props;
    this.setState({ manInfo }, () => this.initData());
  }

  componentDidUpdate(prevProps) {
    if (this.state.manInfo === undefined && prevProps.manInfo === undefined && this.props.manInfo !== undefined) {
      this.updateManInfo(this.props.manInfo);
    }
  }

  updateManInfo(manInfo) {
    this.setState({ manInfo }, () => this.initData());
  }

  openAllWorkScheduler() {
    const { manInfo } = this.state;
    this.allWorkSchedulerModal.current.handleOpenModal(manInfo ? manInfo.site : '');
  }

  initData() {
    const { manInfo } = this.state;
    const { empno, workjo, area } = manInfo;
    this.setState({ isLoading: true, manWorkHisInfoList: [], manSameAreaWorkJoList: [], currentJo: workjo }, () => {
      this.fetchWorkList(empno, area, workjo, moment(new Date()).format('YYYYMMDD'), manInfo.site).then(payload => {
        const { manWorkHisInfoList, manSameAreaWorkJoList } = payload;
        this.setState({ manWorkHisInfoList, manSameAreaWorkJoList, isLoading: false });
      });
    });
  }

  refreshData() {
    const { manInfo } = this.state;
    const { empno, workjo, area } = manInfo;
    const date = document.querySelector('input[name=searchDt]').value;
    this.setState({ isLoading: true, manWorkHisInfoList: [] }, () => {
      this.fetchWorkList(empno, area, workjo, moment(date, 'YYYY.MM.DD').format('YYYYMMDD'), manInfo.site).then(payload => {
        this.setState({ manWorkHisInfoList: payload.manWorkHisInfoList, isLoading: false });
      });
    });
  }

  toggleExpanded() {
    const { enableFixView, disableFixView } = this.props;
    this.setState(
      prevState => ({
        isExpanded: !prevState.isExpanded,
      }),
      () => {
        if (this.state.isExpanded) {
          enableFixView();
        } else {
          disableFixView();
        }
      },
    );
  }

  async fetchWorkList(empNo, area, workjo, date, site) {
    const requestQuery = {
      empNo,
      area,
      workjo,
      type: 'manWorkHisInfoList',
      searchDt: date,
      searchSite: site,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manHisChief.get(queryString);
    const payload = {};
    if (response && !error) {
      const { manWorkHisInfoList, manSameAreaWorkJoList } = response;
      payload.manWorkHisInfoList = manWorkHisInfoList;
      payload.manSameAreaWorkJoList = manSameAreaWorkJoList;
      return payload;
    }
    payload.manWorkHisInfoList = [];
    payload.manSameAreaWorkJoList = [];
    return payload;
  }

  handleChangeWorkjo(e) {
    const { manInfo } = this.state;
    const { empno, area } = manInfo;
    const workjo = e.target.value;
    const date = document.querySelector('input[name=searchDt]').value;
    this.setState({ isLoading: true, manWorkHisInfoList: [], manSameAreaWorkJoList: [], currentJo: workjo }, () => {
      this.fetchWorkList(empno, area, workjo, moment(date, 'YYYY.MM.DD').format('YYYYMMDD')).then(payload => {
        this.setState({ ...payload, isLoading: false });
      });
    });
  }

  handleChangeDate(momentDate) {
    const { manInfo } = this.state;
    const { empno, area } = manInfo;
    const workjo = document.querySelector('#workjoSelector').value;
    this.setState({ isLoading: true, manWorkHisInfoList: [], manSameAreaWorkJoList: [] }, () => {
      this.fetchWorkList(empno, area, workjo, momentDate.format('YYYYMMDD')).then(payload => {
        this.setState({ ...payload, isLoading: false });
      });
    });
  }

  openCommentModal(rowData) {
    const { empno, workdt, owcoment } = rowData;
    this.workerModifyCommentModal.current.handleOpenModal(empno, workdt, owcoment);
  }

  openNightWorkAcceptModal(rowData) {
    const { empno, workdt } = rowData;
    this.nightWorkAcceptModal.current.handleOpenModal(empno, workdt);
  }

  openNightWorkCanselModal(rowData) {
    const { empno, workdt } = rowData;
    this.nightWorkCanselModal.current.handleOpenModal(empno, workdt);
  }

  openNightWorkAllAcceptModal() {
    const { manWorkHisInfoList } = this.state;
    const empnos = manWorkHisInfoList.map(info => info.empno);
    const workdt = document.querySelector('input[name=searchDt]').value;
    this.nightWorkAllAcceptModal.current.handleOpenModal(empnos, moment(workdt, 'YYYY.MM.DD').format('YYYYMMDD'));
  }

  openNightWorkAllCancelModal() {
    const { manWorkHisInfoList } = this.state;
    const empnos = manWorkHisInfoList.map(info => info.empno);
    const workdt = document.querySelector('input[name=searchDt]').value;
    this.nightWorkAllCancelModal.current.handleOpenModal(empnos, moment(workdt, 'YYYY.MM.DD').format('YYYYMMDD'));
  }

  downloadExcel() {
    const { manWorkHisInfoList, manInfo, currentJo } = this.state;
    const date = document.querySelector('input[name=searchDt]').value;
    const downloadable = manWorkHisInfoList.map(row => ({
      날짜: row.workdt,
      근무조: row.workjo,
      구분: row.wampmnnoff,
      사번: row.empno,
      이름: row.usrnm,
      근태: row.working,
      출근: moment(row.wst, 'HHmm').format('HH:mm'),
      퇴근: moment(row.wet, 'HHmm').format('HH:mm'),
      야근시작: moment(row.owst, 'HHmm').format('HH:mm'),
      야근종료: moment(row.owet, 'HHmm').format('HH:mm'),
      야근내용: row.owcoment,
      야근시간: row.owt,
      야근식사: row.meal,
      반장확인: row.bsign,
    }));
    const ws = XLSX.utils.json_to_sheet(downloadable);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    XLSX.writeFile(wb, `${manInfo.area}-${currentJo}-history-${date}.xlsx`);
  }

  openRecordWriter() {
    const { manInfo } = this.state;
    this.workerRecordWriterModal.current.handleOpenModal(manInfo.area);
  }

  handleOpenWorkerRecordModifyModal(record) {
    this.workerRecordModifyModal.current.handleOpenModal(record);
  }

  render() {
    const { manWorkHisInfoList, manSameAreaWorkJoList, isExpanded, isLoading, manInfo, currentJo } = this.state;
    const { canUseThisPage } = this.props;
    const workColumns = [
      // {
      //   label: 'BAY',
      //   dataKey: 'bay',
      //   percentWidth: 12,
      // },
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
        label: '작업자',
        dataKey: 'work',
        percentWidth: 12,
        headerRenderer: () => (
          <ul>
            <li style={{ height: 39, lineHeight: '39px' }}>작업자</li>
            <li style={{ height: 39, lineHeight: '39px' }}>
              <ul className="row">
                <li style={{ height: 39, lineHeight: '39px', flexBasis: 'calc(100% / 2)' }}>사번</li>
                <li style={{ height: 39, lineHeight: '39px', flexBasis: 'calc(100% / 2)' }}>이름</li>
              </ul>
            </li>
          </ul>
        ),
        cellRenderer: ({ rowData }) => (
          <ul className="row">
            <li style={{ height: 39, lineHeight: '39px', flexBasis: 'calc(100% / 2)' }}>{rowData.empno}</li>
            <li style={{ height: 39, lineHeight: '39px', flexBasis: 'calc(100% / 2)' }}>{rowData.usrnm}</li>
          </ul>
        ),
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
            <li style={{ height: 39, lineHeight: '39px', flexBasis: '40%' }}>{rowData.wst ? moment(rowData.wst, 'HHmm').format('HH:mm') : ''}</li>
            <li style={{ height: 39, lineHeight: '39px', flexBasis: '40%' }}>{rowData.wet ? moment(rowData.wet, 'HHmm').format('HH:mm') : ''}</li>
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
            <li style={{ height: 39, lineHeight: '39px', flexBasis: '14%' }}>{rowData.owst ? moment(rowData.owst, 'HHmm').format('HH:mm') : ''}</li>
            <li style={{ height: 39, lineHeight: '39px', flexBasis: '14%' }}>{rowData.owet ? moment(rowData.owet, 'HHmm').format('HH:mm') : ''}</li>
            <li style={{ height: 39, lineHeight: '39px', flexBasis: '56%', position: 'relative' }}>
              {rowData.owcoment || '-'}
              {/*
              <button type="button" onClick={() => this.openCommentModal(rowData)}>
                {rowData.owcoment}
              </button>
              */}
            </li>
            <li style={{ height: 39, lineHeight: '39px', flexBasis: '8%' }}>{rowData.owt || '-'}</li>
            <li style={{ height: 39, lineHeight: '39px', flexBasis: '8%' }}>{rowData.meal}</li>
          </ul>
        ),
      },
      {
        label: '반장확인',
        dataKey: 'bsign',
        percentWidth: 8.5,
        cellRenderer: ({ rowData }) =>
          rowData.bsign === 'O' ? (
            <button
              type="button"
              className="popable-button"
              onClick={e => {
                e.stopPropagation();
                this.openNightWorkCanselModal(rowData);
              }}
              style={{ color: 'rgb(213, 0, 0)' }}
            >
              {rowData.bsign}
            </button>
          ) : (
            <button
              type="button"
              className="popable-button"
              onClick={e => {
                e.stopPropagation();
                this.openNightWorkAcceptModal(rowData);
              }}
              style={{ color: 'rgb(213, 0, 0)' }}
            >
              X
            </button>
          ),
      },
    ];
    return (
      <StyledContents className={`${isExpanded ? 'expanded' : ''}`}>
        <div className="sub_wrap">
          <div className="sub_tit2">
            <span className="small">담당 근무자 일일근무 이력</span>
            <div className="btn_wrap">
              <button type="button" className={`icon icon_arr_big ${isExpanded ? 'on' : ''}`} onClick={this.toggleExpanded}>
                축소/확대
              </button>
            </div>
          </div>
          <div className="sub_con">
            <Wrapper>
              {canUseThisPage && manInfo !== undefined ? (
                <>
                  <ul className="search_div">
                    <li>
                      <select name="workjoSelector" id="workjoSelector" value={currentJo} style={{ width: 100, height: 46 }} onChange={this.handleChangeWorkjo}>
                        <option value="" disabled>
                          조 선택
                        </option>
                        {manSameAreaWorkJoList.map(obj => (
                          <option key={obj.workjo} value={obj.workjo}>
                            {obj.workjo}
                          </option>
                        ))}
                      </select>
                    </li>
                    <li>
                      <DatePicker
                        values={[
                          {
                            name: 'searchDt',
                            value: moment(new Date())
                              .subtract(7, 'hours')
                              .format('YYYYMMDD'),
                          },
                        ]}
                        cbChangeDate={date => this.handleChangeDate(date)}
                        single
                        style={{ display: 'inline-block' }}
                      />
                    </li>
                    {/* <MonthlyPicker name="date" value={new Date()} onChange={this.handleChangeDate} /> */}
                  </ul>

                  <div className="btn_wrap" style={{ float: 'right', marginTop: 10 }}>
                    <Button type="button" size="small" color="default" onClick={this.openAllWorkScheduler}>
                      월별 전체 근무 스케쥴
                    </Button>
                    <Button type="button" size="small" color="default" onClick={this.openRecordWriter}>
                      근무 이력 등록
                    </Button>
                    {manWorkHisInfoList.length > 0 && (
                      <>
                        <Button type="button" size="small" color="default" style={{ marginRight: 6 }} onClick={this.downloadExcel}>
                          엑셀로 받기
                        </Button>
                        <Button type="button" size="small" color="primary" onClick={this.openNightWorkAllAcceptModal}>
                          전체 승인
                        </Button>
                        <Button type="button" size="small" color="gray" onClick={this.openNightWorkAllCancelModal}>
                          전체 취소
                        </Button>
                      </>
                    )}
                  </div>
                  <div className="cr" />
                  <div style={{ overflowX: 'auto' }}>
                    <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
                      <StyledVirtualized
                        minHeight={getVirtualizedMinHeight(78, 39, manWorkHisInfoList.length, 500)}
                        headerHeight={78}
                        style={{ minWidth: 1000 }}
                      >
                        <AutoSizer>
                          {({ height, width }) => (
                            <Table
                              width={width}
                              height={height}
                              headerHeight={78}
                              rowHeight={39}
                              rowCount={manWorkHisInfoList.length}
                              rowGetter={({ index }) => manWorkHisInfoList[index]}
                              headerClassName="virtualized_header"
                              gridClassName="virtualized_grid"
                              rowClassName="virtualized_row"
                              noRowsRenderer={() => (
                                <div className="virtualized_noData">
                                  <span>{isLoading ? 'Loading...' : 'No Data'}</span>
                                </div>
                              )}
                              onRowClick={({ rowData }) => this.handleOpenWorkerRecordModifyModal(rowData)}
                            >
                              {workColumns.map(column => (
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
                  <ChiefWorkerRecordWriterModal ref={this.workerRecordWriterModal} callbackHandler={this.refreshData} site={manInfo.site} />
                  <WorkerModifyCommentModal ref={this.workerModifyCommentModal} callbackHandler={this.refreshData} />
                  <NightWorkAcceptModal ref={this.nightWorkAcceptModal} callbackHandler={this.refreshData} />
                  <NightWorkCanselModal ref={this.nightWorkCanselModal} callbackHandler={this.refreshData} />
                  <NightWorkAllAcceptModal ref={this.nightWorkAllAcceptModal} callbackHandler={this.refreshData} />
                  <NightWorkAllCancelModal ref={this.nightWorkAllCancelModal} callbackHandler={this.refreshData} />
                  <WorkerRecordModifyModal ref={this.workerRecordModifyModal} onClose={this.refreshData} apiType={1} editable />
                  <AllWorkSchedulerModal ref={this.allWorkSchedulerModal} manInfo={manInfo} byArea />
                </>
              ) : (
                <div>현재 사용자는 사용 불가능한 페이지입니다.</div>
              )}
            </Wrapper>
          </div>
        </div>
      </StyledContents>
    );
  }
}

SubBody.propTypes = {
  enableFixView: PropTypes.func,
  disableFixView: PropTypes.func,
  canUseThisPage: PropTypes.bool,
};

SubBody.defaultProps = {
  enableFixView: () => false,
  disableFixView: () => false,
  canUseThisPage: false,
};

export default SubBody;
