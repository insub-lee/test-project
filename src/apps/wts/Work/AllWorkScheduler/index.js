import React from 'react';
import PropTypes from 'prop-types';
import { debounce, orderBy } from 'lodash';
import moment from 'moment';
import { Icon, Spin } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import { admin } from 'apps/wts/Work/Admin/config';

import { jsonToQueryString, exportExcelWithAOA } from 'utils/helpers';
import MonthlyPicker from 'apps/wts/components/MonthlyPicker';
import StyledAgGrid from 'apps/wts/components/CommonStyledElement/StyledAgGrid';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledStandard from '../../StyledStandard';

import service from '../service';

const reorderData = (data, emrno) => {
  if (admin[emrno]) {
    const chiefData = data.filter(({ warea, wbay }) => warea && admin[emrno].area.some(str => warea && wbay === '반장' && warea.includes(str)));
    const prefixData = data.filter(({ warea, wbay }) => warea && admin[emrno].area.some(str => warea && wbay !== '반장' && warea.includes(str)));
    const etcData = data.filter(({ warea }) => warea && !admin[emrno].area.some(str => warea && warea.includes(str)));
    return chiefData.concat(prefixData).concat(etcData);
  }
  return data;
};

const reorderDataByAreaWorkjo = (data, area, workjo) => {
  if (area) {
    const prefixData = data.filter(({ warea }) => warea && warea.includes(area));
    const firstData = prefixData.filter(({ workjo: rowWorkjo }) => rowWorkjo === workjo);
    const second = prefixData.filter(({ workjo: rowWorkjo }) => rowWorkjo !== workjo);
    const combined = firstData.concat(second);
    // const etcData = data.filter(({ warea }) => !warea.includes(area));
    const etcData = [];
    return combined.concat(etcData);
  }
  return data;
};

class AllWorkScheduler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchDate: new Date(),
      site: '',
      isLoading: true,
      filterWord: '',
      area: {},
      currentArea: '',
      currentJo: '',
    };
    this.loadData = this.loadData.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeArea = this.handleChangeArea.bind(this);
    this.handleChangeWorkjo = this.handleChangeWorkjo.bind(this);
    this.handleFilter = debounce(this.handleFilter.bind(this), 500);
    this.downloadExcel = this.downloadExcel.bind(this);
    this.getColumnDef = this.getColumnDef.bind(this);
    this.getFilterData = this.getFilterData.bind(this);
  }

  componentDidMount() {
    const { site } = this.props;
    this.setState({ searchDate: new Date(), site, isLoading: true }, () => {
      this.loadData();
    });
  }

  handleFilter(value) {
    this.setState({ filterWord: value });
  }

  handleChangeArea(e) {
    const { value } = e.target;
    this.setState({ currentArea: value, currentJo: '' });
  }

  handleChangeWorkjo(e) {
    const { value } = e.target;
    this.setState({ currentJo: value });
  }

  loadData() {
    const { site, searchDate } = this.state;
    const { manInfo, byArea } = this.props;
    this.setState({ isLoading: true }, () => {
      this.fetchData(site, moment(searchDate).format('YYYYMM')).then(({ workList, vacationList }) => {
        const nextData = [];
        workList.forEach(work => {
          const { empno, workdt, working, wampmnnoff } = work;
          const nextWork = work;
          nextWork.isChief = work.wbay === '반장' ? 1 : 0;
          const nextDataIndex = nextData.findIndex(row => row.empno === empno);
          if (nextDataIndex < 0) {
            if (wampmnnoff && wampmnnoff.includes('OFF')) {
              nextWork[workdt] = '휴무';
            } else if (working === 'O') {
              nextWork[workdt] = '';
            }
            nextData.push(nextWork);
          } else {
            const row = nextData[nextDataIndex];
            if (wampmnnoff && wampmnnoff.includes('OFF')) {
              row[workdt] = '휴무';
            } else if (working === 'O') {
              row[workdt] = '';
            }
          }
        });
        vacationList.forEach(history => {
          const { empno, workdt, vacation, vacationnm } = history;
          const nextHistory = history;
          const nextDataIndex = nextData.findIndex(row => row.empno === empno);
          if (nextDataIndex < 0) {
            if (vacation === 'O') {
              nextHistory[workdt] = vacationnm;
            }
            nextData.push(nextHistory);
          } else {
            const row = nextData[nextDataIndex];
            if (vacation === 'O') {
              row[workdt] = vacationnm;
            }
          }
        });
        const reorderedData = byArea
          ? reorderDataByAreaWorkjo(orderBy(nextData, ['warea', 'workjo', 'isChief', 'wbay'], ['asc', 'asc', 'desc', 'asc']), manInfo.area, manInfo.workjo)
          : reorderData(orderBy(nextData, ['warea', 'workjo', 'isChief', 'wbay'], ['asc', 'asc', 'desc', 'asc']), Number(manInfo.empno));
        const area = {};
        reorderedData.forEach(({ warea, workjo }) => {
          let nextArea = warea;
          if (nextArea.split(' ').length > 1) {
            nextArea = nextArea.split(' ')[1];
          }
          if (!area[nextArea]) area[nextArea] = [];
          if (!area[nextArea].includes(workjo)) area[nextArea].push(workjo);
        });
        this.setState(
          { data: reorderedData, area, currentArea: !byArea ? (admin[Number(manInfo.empno)] ? admin[Number(manInfo.empno)].area[0] : '') : '' },
          () => {
            this.setState({ isLoading: false });
          },
        );
      });
    });
  }

  downloadExcel() {
    const { site, data, searchDate } = this.state;
    const rows = [];
    const dates = [];
    const columns = ['AREA', 'BAY', '근무', '사번', '성명'];
    const days = moment(searchDate).daysInMonth();
    const preDateMessage = moment(searchDate).format('YYYYMM');
    let i = 0;
    while (i < days) {
      columns.push(`${preDateMessage}${i + 1 < 10 ? `0${i + 1}` : i + 1}`);
      dates.push(`${preDateMessage}${i + 1 < 10 ? `0${i + 1}` : i + 1}`);
      i += 1;
    }
    rows.push(columns);
    data.forEach(row => {
      const defValues = [row.warea, row.wbay, row.workjo, row.empno, row.usrnm];
      const dateValues = dates.map(date => row[date]);
      rows.push(defValues.concat(dateValues));
    });
    exportExcelWithAOA(rows, `${site}-${moment(searchDate).format('YYYYMM')}-월별 전체 근무 스케쥴.xlsx`);
  }

  getColumnDef() {
    const { searchDate } = this.state;
    const basic = [
      {
        headerName: 'AREA',
        field: 'warea',
        width: 100,
        cellStyle: { textAlign: 'center' },
        pinned: 'left',
        sortable: true,
        resizable: true,
      },
      {
        headerName: 'BAY',
        field: 'wbay',
        width: 100,
        cellStyle: { textAlign: 'center' },
        pinned: 'left',
        sortable: true,
        resizable: true,
      },
      {
        headerName: '근무',
        field: 'workjo',
        width: 100,
        cellStyle: { textAlign: 'center' },
        pinned: 'left',
        sortable: true,
        resizable: true,
      },
      {
        headerName: '사번',
        field: 'empno',
        width: 100,
        cellStyle: { textAlign: 'center' },
        pinned: 'left',
        resizable: true,
      },
      {
        headerName: '성명',
        field: 'usrnm',
        width: 100,
        cellStyle: ({ data: { wbay } }) => {
          if (wbay === '휴직') {
            return {
              backgroundColor: '#FF6F00',
              color: 'white',
              textAlign: 'center',
            };
          }
          return {
            textAlign: 'center',
          };
        },
        pinned: 'left',
        resizable: true,
      },
    ];
    const days = moment(searchDate).daysInMonth();
    const preDateMessage = moment(searchDate).format('YYYYMM');
    let i = 0;
    while (i < days) {
      basic.push({
        headerName: moment(`${preDateMessage}${i + 1 < 10 ? `0${i + 1}` : i + 1}`, 'YYYYMMDD').format('MMDD'),
        field: `${preDateMessage}${i + 1 < 10 ? `0${i + 1}` : i + 1}`,
        width: 100,
        cellStyle: ({ value, data: { wbay } }) => {
          if (wbay === '휴직') {
            return {
              backgroundColor: '#FF6F00',
              color: 'white',
              textAlign: 'center',
            };
          }
          if (value === '휴무') {
            return {
              backgroundColor: 'rgba(31,181,173,0.8)',
              color: 'white',
              textAlign: 'center',
            };
          }
          return {
            textAlign: 'center',
          };
        },
        cellRenderer: ({ value, data: { wbay } }) => (wbay === '휴직' ? '휴직' : value),
      });
      i += 1;
    }
    return basic;
  }

  async fetchData(site, searchDt) {
    const requestQuery = {
      type: 'workV1MonthList',
      searchSite: site,
      searchDt,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manHisChief.get(queryString);
    if (response && !error) {
      const { Work1MonthList, Vacation1MonthList } = response;
      return {
        workList: Work1MonthList,
        vacationList: Vacation1MonthList,
      };
    }
    return {
      workList: [],
      vacationList: [],
    };
  }

  handleChangeDate(momentDate) {
    this.setState({ searchDate: momentDate.toDate() }, () => {
      this.loadData(() => this.multiGrid.current.forceUpdateGrids());
    });
  }

  getFilterData() {
    const { currentArea, currentJo, filterWord, data } = this.state;
    let filterData = data;
    if (currentArea && currentArea !== '') {
      filterData = filterData.filter(({ warea }) => warea.includes(currentArea));
    }
    if (currentJo && currentJo !== '') {
      filterData = filterData.filter(({ workjo }) => workjo === currentJo);
    }
    if (filterWord.trim().length > 0) {
      filterData = filterData.filter(({ empno, usrnm }) => empno.includes(filterWord) || usrnm.includes(filterWord));
    }
    return filterData;
  }

  render() {
    const { searchDate, isLoading, area, currentArea, currentJo } = this.state;
    return (
      <StyledStandard style={{ padding: '20px 30px' }}>
        <div className="search_div" style={{ position: 'relative' }}>
          <div style={{ width: 100, marginBottom: 10 }}>
            <MonthlyPicker name="date" value={searchDate} onChange={this.handleChangeDate} />
          </div>
          <div style={{ position: 'absolute', top: '16px', right: 0 }}>
            <StyledButton type="button" className="btn-light btn-sm" onClick={this.downloadExcel}>
              <i className="far fa-file-excel" /> Excel
            </StyledButton>
          </div>
        </div>
        <ul className="search_div">
          <li>
            <select name="" id="" value={currentArea} onChange={this.handleChangeArea} style={{ width: 200, height: 46 }}>
              <option value="">전체 AREA</option>
              {Object.keys(area).map(key => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </li>
          <li>
            <select name="workjoSelector" id="workjoSelector" value={currentJo} style={{ width: 100, height: 46 }} onChange={this.handleChangeWorkjo}>
              <option value="">전체 조</option>
              {area[currentArea] &&
                area[currentArea].map(workjo => (
                  <option key={workjo} value={workjo}>
                    {workjo}
                  </option>
                ))}
            </select>
          </li>
          <li>
            <input
              type="text"
              className="input"
              placeholder="성명 혹은 사번으로 조회"
              style={{ textAlign: 'left' }}
              onChange={e => this.handleFilter(e.target.value)}
            />
          </li>
        </ul>
        <div className="cr" />
        <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
          <StyledAgGrid style={{ width: '100%', height: 1000 }} className="ag-theme-balham">
            <AgGridReact columnDefs={this.getColumnDef()} rowData={this.getFilterData()} suppressCellSelection />
          </StyledAgGrid>
        </Spin>
      </StyledStandard>
    );
  }
}

AllWorkScheduler.propTypes = {
  byArea: PropTypes.bool,
};

AllWorkScheduler.defaultProps = {
  byArea: false,
};

export default AllWorkScheduler;
