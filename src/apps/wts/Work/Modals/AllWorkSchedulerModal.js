import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';
import { fromJS } from 'immutable';
import moment from 'moment';
import { MultiGrid, AutoSizer } from 'react-virtualized';
import { debounce } from 'lodash';

import StyledModalContent from 'apps/wts/components/CommonStyledElement/StyledModalContent';
import { jsonToQueryString, exportExcelWithAOA } from 'utils/helpers';
import MonthlyPicker from 'apps/wts/components/MonthlyPicker';
import { Icon, Spin } from 'antd';
import Button from 'components/Button';
import service from '../service';
import { admin } from '../Admin/config';

const reorderData = (data, emrno) => {
  if (admin[emrno]) {
    const prefixData = data.filter(row => admin[emrno].area.some(str => (row[0] ? row[0].includes(str) : false)));
    const etcData = data.filter(row => !admin[emrno].area.some(str => (row[0] ? row[0].includes(str) : false)));
    return prefixData.concat(etcData);
  }
  return data;
};

const reorderDataByAreaWorkjo = (data, area, workjo) => {
  console.debug('@@ reorderDataByAreaWorkjo : ', data, area, workjo);
  if (area) {
    const prefixData = data.filter(row => row[0].includes(area));
    const firstData = prefixData.filter(row => row[1] === workjo);
    const second = prefixData.filter(row => row[1] !== workjo);
    const combined = firstData.concat(second);
    const etcData = data.filter(row => !row[0].includes(area));
    return combined.concat(etcData);
  }
  return data;
};

const cellStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: '1px solid #eee',
  borderRight: '1px solid #eee',
};

const STYLE = {
  border: '1px solid #ddd',
};
const STYLE_BOTTOM_LEFT_GRID = {
  borderRight: '2px solid #aaa',
  backgroundColor: '#e7e7e7',
};
const STYLE_TOP_LEFT_GRID = {
  borderBottom: '2px solid #aaa',
  borderRight: '2px solid #aaa',
  fontWeight: 'bold',
};
const STYLE_TOP_RIGHT_GRID = {
  borderBottom: '2px solid #aaa',
  fontWeight: 'bold',
};

const workStyle = status => {
  switch (status) {
    case '휴직':
      return {
        backgroundColor: '#FF6F00',
        color: 'white',
      };
    case '휴무':
      return {
        backgroundColor: 'rgba(31,181,173,0.8)',
        color: 'white',
      };
    default:
      return {};
  }
};

const buttonStyle = {
  fontWeight: 'bold',
};

class AllWorkSchedulerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      firstRow: fromJS([]),
      data: fromJS([]),
      sortOption: ['ASC', 'ASC', 'ASC'],
      searchDate: new Date(),
      site: '',
      isLoading: true,
      filterWord: '',
      area: {},
      currentArea: '',
      currentJo: '',
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.loadData = this.loadData.bind(this);
    this.cellRenderer = this.cellRenderer.bind(this);
    this.sortData = this.sortData.bind(this);
    this.handleChangeSortOption = this.handleChangeSortOption.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.downloadExcel = this.downloadExcel.bind(this);
    this.handleFilter = debounce(this.handleFilter.bind(this), 500);
    this.handleChangeArea = this.handleChangeArea.bind(this);
    this.handleChangeWorkjo = this.handleChangeWorkjo.bind(this);

    this.multiGrid = React.createRef();
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

  handleOpenModal(site) {
    this.setState({ isOpen: true, searchDate: new Date(), site, isLoading: true }, () => {
      this.loadData();
    });
  }

  handleCloseModal() {
    this.setState({
      isOpen: false,
      firstRow: fromJS([]),
      data: fromJS([]),
      sortOption: ['ASC', 'ASC', 'ASC'],
      searchDate: new Date(),
      site: '',
      isLoading: true,
      filterWord: '',
      area: {},
      currentArea: '',
      currentJo: '',
    });
  }

  handleAfterOpen() {}

  handleChangeSortOption(sortIndex) {
    this.setState(
      prevState => {
        const { sortOption } = prevState;
        sortOption[sortIndex] = sortOption[sortIndex] === 'ASC' ? 'DESC' : 'ASC';
        return {
          sortOption,
        };
      },
      () => {
        this.setState(
          prevState => ({ data: prevState.data.sort((a, b) => this.sortData(a, b)) }),
          () => {
            this.multiGrid.current.forceUpdateGrids();
          },
        );
      },
    );
  }

  loadData(callbackFunction = () => false) {
    const { site, searchDate } = this.state;
    const { manInfo, byArea } = this.props;
    this.setState({ isLoading: true }, () => {
      this.fetchData(site, moment(searchDate).format('YYYYMM')).then(({ workList, vacationList }) => {
        const nextData = [];
        const firstRow = ['AREA', 'BAY', '근무조', '사번', '성명'];
        const days = moment(searchDate).daysInMonth();
        const preDateMessage = moment(searchDate).format('YYYYMM');
        let i = 0;
        while (i < days) {
          firstRow[i + 5] = `${preDateMessage}${i + 1 < 10 ? `0${i + 1}` : i + 1}`;
          i += 1;
        }
        // nextData.push(firstRow);
        workList.forEach(work => {
          const { warea, wbay, workjo, empno, usrnm, workdt, working, vacation, wampmnnoff } = work;
          const nextDataIndex = nextData.findIndex(row => row[3] === empno);
          if (nextDataIndex < 0) {
            const row = [warea, wbay, workjo, empno, usrnm];
            const dataIndex = parseInt(moment(workdt, 'YYYYMMDD').format('D'), 10) + 4;
            // row[dataIndex] = [working === 'O' ? 1 : 0, vacation === 'O' ? 1 : 0].join(':');
            // 주기적 휴무 기간
            if (wampmnnoff && wampmnnoff.includes('OFF')) {
              row[dataIndex] = '휴무';
            }
            // 근무 기간
            if (working === 'O') {
              row[dataIndex] = '';
            }
            nextData.push(row);
          } else {
            const row = nextData[nextDataIndex];
            const dataIndex = parseInt(moment(workdt, 'YYYYMMDD').format('D'), 10) + 4;
            if (wampmnnoff && wampmnnoff.includes('OFF')) {
              row[dataIndex] = '휴무';
            }
            // 근무 기간
            if (working === 'O') {
              row[dataIndex] = '';
            }
          }
        });

        vacationList.forEach(history => {
          const { warea, wbay, workjo, empno, usrnm, workdt, working, vacation, wampmnnoff, vacationnm } = history;
          const nextDataIndex = nextData.findIndex(row => row[3] === empno);
          if (nextDataIndex < 0) {
            const row = [warea, wbay, workjo, empno, usrnm];
            const dataIndex = parseInt(moment(workdt, 'YYYYMMDD').format('D'), 10) + 4;
            if (vacation === 'O') {
              row[dataIndex] = vacationnm;
            }
            nextData.push(row);
          } else {
            const row = nextData[nextDataIndex];
            const dataIndex = parseInt(moment(workdt, 'YYYYMMDD').format('D'), 10) + 4;
            if (vacation === 'O') {
              row[dataIndex] = vacationnm;
            }
          }
        });
        const data = fromJS(nextData).sort((a, b) => this.sortData(a, b));
        const area = {};
        data.toJS().forEach(row => {
          if (!area[row[0]]) area[row[0]] = [];
          if (!area[row[0]].includes(row[2])) area[row[0]].push(row[2]);
        });
        Object.keys(area).forEach(value => {
          area[value] = area[value].sort((a, b) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
          });
        });
        const reorderedData = fromJS(
          byArea ? reorderDataByAreaWorkjo(data.toJS(), manInfo.area, manInfo.workjo) : reorderData(data.toJS(), Number(manInfo.empno)),
        );
        this.setState({ firstRow: fromJS(firstRow), data: reorderedData, area }, () => {
          callbackFunction();
          this.setState({ isLoading: false });
        });
      });
    });
  }

  downloadExcel() {
    const { site, firstRow, data, searchDate } = this.state;
    const nextData = data.toJS().map(row => {
      const nextRow = [...row];
      if (nextRow[1] === '휴직') {
        let i = 5;
        while (i < nextRow.length) {
          nextRow[i] = '휴직';
          i += 1;
        }
      }
      return nextRow;
    });
    const rows = [firstRow.toJS()].concat(nextData);
    exportExcelWithAOA(rows, `${site}-${moment(searchDate).format('YYYYMM')}-월별 전체 근무 스케쥴.xlsx`);
  }

  sortData(a, b) {
    const { sortOption } = this.state;
    if (a.get(0) < b.get(0)) {
      return sortOption[0] === 'ASC' ? -1 : 1;
    }
    if (a.get(0) > b.get(0)) {
      return sortOption[0] === 'ASC' ? 1 : -1;
    }
    // if (a.get(1) < b.get(1)) {
    //   return sortOption[1] === 'ASC' ? -1 : 1;
    // }
    // if (a.get(1) > b.get(1)) {
    //   return sortOption[1] === 'ASC' ? 1 : -1;
    // }
    if (a.get(2) < b.get(2)) {
      return sortOption[2] === 'ASC' ? -1 : 1;
    }
    if (a.get(2) > b.get(2)) {
      return sortOption[2] === 'ASC' ? 1 : -1;
    }
    return 0;
  }

  cellRenderer({ columnIndex, key, rowIndex, style }) {
    const { data, firstRow, sortOption, currentArea, currentJo, filterWord } = this.state;
    let filteredData = currentArea && currentArea !== '' ? data.filter(row => row.get(0) === currentArea) : data;
    filteredData = currentJo && currentJo !== '' ? filteredData.filter(row => row.get(2) === currentJo) : filteredData;
    filteredData = filterWord.trim().length > 0 ? filteredData.filter(row => row.get(3).includes(filterWord) || row.get(4).includes(filterWord)) : filteredData;
    if (rowIndex === 0) {
      switch (columnIndex) {
        case 0:
          return (
            <div key={key} style={{ ...style, ...cellStyle }}>
              <button type="button" onClick={() => this.handleChangeSortOption(0)} style={buttonStyle}>
                AREA <i className={`fa fa-caret-${sortOption[0] === 'ASC' ? 'up' : 'down'}`} />
              </button>
            </div>
          );
        case 1:
          // return (
          //   <div key={key} style={{ ...style, ...cellStyle }}>
          //     <button type="button" onClick={() => this.handleChangeSortOption(1)} style={buttonStyle}>
          //       BAY <i className={`fa fa-caret-${sortOption[1] === 'ASC' ? 'up' : 'down'}`} />
          //     </button>
          //   </div>
          // );
          return (
            <div key={key} style={{ ...style, ...cellStyle }}>
              BAY
            </div>
          );
        case 2:
          return (
            <div key={key} style={{ ...style, ...cellStyle }}>
              <button type="button" onClick={() => this.handleChangeSortOption(2)} style={buttonStyle}>
                근무조 <i className={`fa fa-caret-${sortOption[2] === 'ASC' ? 'up' : 'down'}`} />
              </button>
            </div>
          );
        case 3:
          return (
            <div key={key} style={{ ...style, ...cellStyle }}>
              사번
            </div>
          );
        case 4:
          return (
            <div key={key} style={{ ...style, ...cellStyle }}>
              성명
            </div>
          );
        default:
          return (
            <div key={key} style={{ ...style, ...cellStyle }}>
              {firstRow.get(columnIndex)}
            </div>
          );
      }
    }
    if (rowIndex > 0 && columnIndex > 4) {
      let status = filteredData.getIn([rowIndex - 1, columnIndex]);
      if (filteredData.getIn([rowIndex - 1, 1]) === '휴직') {
        status = '휴직';
      }
      return (
        <div key={key} style={{ ...style, ...cellStyle, ...workStyle(status) }}>
          {status === '휴직' ? '휴직' : filteredData.getIn([rowIndex - 1, columnIndex])}
        </div>
      );
    }
    if (rowIndex > 0 && columnIndex === 4 && filteredData.getIn([rowIndex - 1, 1]) === '휴직') {
      return (
        <div key={key} style={{ ...style, ...cellStyle, ...workStyle('휴직') }}>
          {filteredData.getIn([rowIndex - 1, columnIndex])}
        </div>
      );
    }
    return (
      <div key={key} style={{ ...style, ...cellStyle }}>
        {filteredData.getIn([rowIndex - 1, columnIndex])}
      </div>
    );
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

  render() {
    const { isOpen, data, firstRow, searchDate, isLoading, site, area, currentArea, currentJo, filterWord } = this.state;
    let filteredData = currentArea && currentArea !== '' ? data.filter(row => row.get(0) === currentArea) : data;
    filteredData = currentJo && currentJo !== '' ? filteredData.filter(row => row.get(2) === currentJo) : filteredData;
    filteredData = filterWord.trim().length > 0 ? filteredData.filter(row => row.get(3).includes(filterWord) || row.get(4).includes(filterWord)) : filteredData;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 1000,
        }}
        bodyStyle={{
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <div>
          <StyledModalContent>
            <div className="pop_tit">
              {`${site} 월별 전체 근무 스케쥴`}
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <div className="search_div" style={{ position: 'relative' }}>
                <div style={{ width: 100, marginBottom: 10 }}>
                  <MonthlyPicker name="date" value={searchDate} onChange={this.handleChangeDate} />
                </div>
                <div style={{ position: 'absolute', top: '16px', right: 0 }}>
                  <Button type="button" size="small" color="default" onClick={this.downloadExcel}>
                    <i className="far fa-file-excel" /> Excel
                  </Button>
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
                <AutoSizer disableHeight>
                  {({ width }) => (
                    <MultiGrid
                      ref={this.multiGrid}
                      fixedColumnCount={5}
                      fixedRowCount={1}
                      cellRenderer={this.cellRenderer}
                      columnWidth={75}
                      columnCount={firstRow.size}
                      enableFixedColumnScroll
                      enableFixedRowScroll
                      height={600}
                      rowHeight={30}
                      rowCount={firstRow.size + filteredData.size}
                      style={STYLE}
                      styleBottomLeftGrid={STYLE_BOTTOM_LEFT_GRID}
                      styleTopLeftGrid={STYLE_TOP_LEFT_GRID}
                      styleTopRightGrid={STYLE_TOP_RIGHT_GRID}
                      width={width}
                      hideTopRightGridScrollbar
                      hideBottomLeftGridScrollbar
                    />
                  )}
                </AutoSizer>
              </Spin>
            </div>
          </StyledModalContent>
        </div>
      </Modal>
    );
  }
}

AllWorkSchedulerModal.propTypes = {
  byArea: PropTypes.bool,
};

AllWorkSchedulerModal.defaultProps = {
  byArea: false,
};

export default AllWorkSchedulerModal;
