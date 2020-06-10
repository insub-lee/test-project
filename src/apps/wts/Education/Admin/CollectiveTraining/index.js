import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { AutoSizer, Column, Table } from 'react-virtualized';
import moment from 'moment';

import StyledVirtualized from 'apps/wts/components/CommonStyledElement/StyledVirtualized';
import { exportExcel, getVirtualizedMinHeight, jsonToQueryString } from 'utils/helpers';
import Button from 'components/Button';
import service from '../../service';
import Wrapper from './Wrapper';
import StyledContents from '../StyledContents';

class CollectiveTraining extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isExpanded: false,
      data: fromJS([]),
    };

    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.initData = this.initData.bind(this);
    this.handleReload = this.handleReload.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.reloadData = this.reloadData.bind(this);
    this.downloadExcel = this.downloadExcel.bind(this);
  }

  componentDidMount() {
    // this.initData();
  }

  // When Changed Site
  componentDidUpdate(prevProps) {
    const currentSite = this.props.site;
    const currentType = this.props.type;
    if ((currentSite !== '' && prevProps.site !== currentSite) || (currentType !== '' && prevProps.type !== currentType)) {
      // this.handleReload(currentSite, currentType);
    }
  }

  initData() {
    const { site, type } = this.props;
    this.setState({ isLoading: true }, () => {
      this.fetchData(site, type).then(({ data }) => {
        this.setState({ data: fromJS(data), isLoading: false });
      });
    });
  }

  reloadData() {
    const { site, type } = this.props;
    this.setState({ isLoading: true }, () => {
      this.fetchData(site, type).then(({ data }) => {
        this.setState({ data: fromJS(data), isLoading: false });
      });
    });
  }

  handleReload(site, type) {
    this.setState({ isLoading: true }, () => {
      this.fetchData(site, type).then(({ data }) => {
        this.setState({ data: fromJS(data), isLoading: false });
      });
    });
  }

  async fetchData(site, type) {
    const requestQuery = {
      // type: 'dailyHis',
      // searchSite: site,
      // searchDt: date,
      // fabInfo: fab,
    };
    const queryString = jsonToQueryString(requestQuery);
    // const { response, error } = await service.gcsChemDaily.get(queryString);
    // if (response && !error) {
    //   const { dailyHis } = response;
    //   return {
    //     data: dailyHis || [],
    //   };
    // }
    // return {
    //   data: [],
    // };
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

  downloadExcel() {}

  render() {
    const { isExpanded, data, isLoading } = this.state;
    const { type } = this.props;
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
            <span className="small">집체 교육 관리</span>
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

CollectiveTraining.propTypes = {
  enableFixView: PropTypes.func,
  disableFixView: PropTypes.func,
  site: PropTypes.string,
  empno: PropTypes.string,
};

CollectiveTraining.defaultProps = {
  enableFixView: () => false,
  disableFixView: () => false,
  site: '',
  empno: '',
};

export default CollectiveTraining;
