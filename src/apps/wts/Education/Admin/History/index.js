import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { AutoSizer, Column, Table } from 'react-virtualized';
import moment from 'moment';

import StyledVirtualized from 'apps/wts/components/CommonStyledElement/StyledVirtualized';
import { exportExcel, getVirtualizedMinHeight, jsonToQueryString } from 'utils/helpers';
import MonthlyPicker from 'apps/wts/components/MonthlyPicker';
import Button from 'components/Button';
import service from '../../service';
import Wrapper from './Wrapper';
import StyledContents from '../StyledContents';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isExpanded: false,
      data: fromJS([]),
      searchDate: new Date(),
    };

    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.initData = this.initData.bind(this);
    this.handleReload = this.handleReload.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.reloadData = this.reloadData.bind(this);
    this.handleOpenReportModal = this.handleOpenReportModal.bind(this);
    this.downloadExcel = this.downloadExcel.bind(this);

    this.chemicalDiaryInfo = React.createRef();
    this.reportModal = React.createRef();
  }

  componentDidMount() {
    this.initData();
  }

  // When Changed Site
  componentDidUpdate(prevProps) {
    const currentSite = this.props.site;
    const currentFab = this.props.fab;
    if ((currentSite !== '' && prevProps.site !== currentSite) || (currentFab !== '' && prevProps.fab !== currentFab)) {
      const dateValue = document.querySelector('input[name="usageDate"]').value;
      this.handleReload(currentSite, currentFab, dateValue);
    }
  }

  initData() {
    const { site, fab } = this.props;
    const dateValue = document.querySelector('input[name="usageDate"]').value;
    this.setState({ isLoading: true }, () => {
      this.fetchData(site, fab, moment(dateValue, 'YYYY.MM').format('YYYYMM')).then(({ data }) => {
        this.setState({ data: fromJS(data), isLoading: false });
      });
    });
  }

  reloadData() {
    const { site, fab } = this.props;
    const dateValue = document.querySelector('input[name="usageDate"]').value;
    this.setState({ isLoading: true }, () => {
      this.fetchData(site, fab, moment(dateValue, 'YYYY.MM').format('YYYYMM')).then(({ data }) => {
        this.setState({ data: fromJS(data), isLoading: false });
      });
    });
  }

  handleReload(site, fab, date) {
    this.setState({ isLoading: true }, () => {
      this.fetchData(site, fab, moment(date, 'YYYY.MM').format('YYYYMM')).then(({ data }) => {
        this.setState({ data: fromJS(data), isLoading: false });
      });
    });
  }

  handleChangeDate(momentDate) {
    const date = momentDate.format('YYYYMM');
    const { site, fab } = this.props;
    this.setState({ isLoading: true, searchDate: momentDate.toDate() }, () => {
      this.fetchData(site, fab, date).then(({ data }) => {
        this.setState({ data: fromJS(data), isLoading: false });
      });
    });
  }

  async fetchData(site, fab, date) {
    const requestQuery = {
      type: 'dailyHis',
      searchSite: site,
      searchDt: date,
      fabInfo: fab,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.gcsChemDaily.get(queryString);
    if (response && !error) {
      const { dailyHis } = response;
      return {
        data: dailyHis || [],
      };
    }
    return {
      data: [],
    };
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

  handleOpenInfoModal(index, rowData, create = false) {
    const { site, fab } = this.props;
    this.chemicalDiaryInfo.current.handleOpenModal(site, fab, index, rowData, create);
  }

  handleOpenReportModal(e, rowData) {
    e.stopPropagation();
    e.preventDefault();
    const { site, fab } = this.props;
    const { occurdt, chemarea, gongno, prodnm } = rowData;
    this.reportModal.current.handleOpenModal(site, fab, occurdt, chemarea, gongno, prodnm);
  }

  downloadExcel() {
    const { data, searchDate } = this.state;
    const { site, fab } = this.props;
    const rows = data.map(row => ({
      발생일시: moment(row.get('occurdt'), 'YYYYMMDD').format('YYYY.MM.DD'),
      위치: row.get('chemarea'),
      No: row.get('gongno'),
      'Chemical Name': row.get('prodnm'),
      'DOWN 시간': moment(row.get('downtime'), 'HHmm').format('HH:mm'),
      'UP 시간': moment(row.get('uptime'), 'HHmm').format('HH:mm'),
      문제점: row.get('problem'),
      조치사항: row.get('measure'),
      'Run 피해': row.get('damage') === 'O' ? '有' : '無',
      작업자: row.get('ownid'),
    }));
    exportExcel(rows.toJS(), `${site}_${fab}_chemical_history_${moment(searchDate).format('YYYYMM')}.xlsx`);
  }

  render() {
    const { isExpanded, data, isLoading, searchDate } = this.state;
    const { fab, empno } = this.props;
    const columns = [
      {
        label: '발생일시',
        dataKey: 'occurdt',
        percentWidth: 10,
        cellRenderer: ({ cellData }) => moment(cellData, 'YYYYMMDD').format('YYYY.MM.DD'),
      },
      {
        label: '위치',
        dataKey: 'chemarea',
        percentWidth: 10,
      },
      {
        label: 'No',
        dataKey: 'gongno',
        percentWidth: 10,
      },
      {
        label: 'Chemical Name',
        dataKey: 'prodnm',
        percentWidth: 10,
      },
      {
        label: 'DOWN 시간',
        dataKey: 'downtime',
        percentWidth: 10,
        cellRenderer: ({ cellData }) => moment(cellData, 'HHmm').format('HH:mm'),
      },
      {
        label: 'UP 시간',
        dataKey: 'uptime',
        percentWidth: 10,
        cellRenderer: ({ cellData }) => moment(cellData, 'HHmm').format('HH:mm'),
      },
      {
        label: '문제점',
        dataKey: 'problem',
        percentWidth: 10,
      },
      {
        label: '조치사항',
        dataKey: 'measure',
        percentWidth: 10,
      },
      {
        label: 'Run 피해',
        dataKey: 'damage',
        percentWidth: 5,
        cellRenderer: ({ cellData }) => (cellData === 'O' ? '有' : '無'),
      },
      {
        label: '작업자',
        dataKey: 'ownid',
        percentWidth: 10,
      },
      {
        label: '리포트',
        dataKey: 'bigo',
        percentWidth: 5,
        cellRenderer: ({ rowIndex }) => (
          <button type="button" className="popable-button" style={{ fontSize: '17px' }} onClick={e => this.handleOpenReportModal(e, data.get(rowIndex).toJS())}>
            <i className="far fa-file-alt" />
          </button>
        ),
      },
    ];
    return (
      <StyledContents className={`${isExpanded ? 'expanded' : ''}`}>
        <div className="sub_wrap">
          <div className="sub_tit2">
            <span className="small">{`${fab}내 장비이력 관리`}</span>
            <div className="btn_wrap">
              <Button type="button" color="grayTwo" size="small" onClick={this.reloadData} disabled={isLoading}>
                재호출
              </Button>
              <Button type="button" color="gray" size="small" onClick={this.downloadExcel}>
                Excel 다운로드
              </Button>
              <Button type="button" color="default" size="small" onClick={() => this.handleOpenInfoModal(-1, fromJS({}), true)}>
                항목 추가
              </Button>
              <button type="button" className={`icon icon_arr_big ${isExpanded ? 'on' : ''}`} onClick={this.toggleExpanded}>
                축소/확대
              </button>
            </div>
          </div>
          <div className="sub_con">
            <Wrapper>
              <div className="search_div">
                <MonthlyPicker
                  name="usageDate"
                  value={searchDate}
                  style={{ width: 200 }}
                  disabledDate={current => !(current && current < moment().endOf('day'))}
                  onChange={this.handleChangeDate}
                />
              </div>
              <div>
                <StyledVirtualized minHeight={getVirtualizedMinHeight(39, 39, data.size, 500)} headerHeight={39} disableDefaultHover>
                  <AutoSizer>
                    {({ height, width }) => (
                      <Table
                        width={width}
                        height={height}
                        headerHeight={39}
                        rowHeight={39}
                        rowCount={data.size}
                        rowGetter={({ index }) => data.get(index)}
                        headerClassName="virtualized_header"
                        gridClassName="virtualized_grid"
                        rowClassName="virtualized_row clickable_row"
                        noRowsRenderer={() => (
                          <div className="virtualized_noData">
                            <span>{isLoading ? 'Loading...' : 'No Data'}</span>
                          </div>
                        )}
                        onRowClick={({ index, rowData }) => this.handleOpenInfoModal(index, rowData, false)}
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
              </div>
            </Wrapper>
          </div>
        </div>
      </StyledContents>
    );
  }
}

History.propTypes = {
  enableFixView: PropTypes.func,
  disableFixView: PropTypes.func,
  site: PropTypes.string,
  empno: PropTypes.string,
};

History.defaultProps = {
  enableFixView: () => false,
  disableFixView: () => false,
  site: '',
  empno: '',
};

export default History;
