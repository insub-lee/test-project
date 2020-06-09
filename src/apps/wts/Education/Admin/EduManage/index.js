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

const renderTitle = code => {
  switch (code) {
    case '00':
      return '직무능력평가';
    case '01':
      return '직무능력평가(MASK)';
    case '02':
      return '직무능력평가(계측기)';
    case '03':
      return 'Handling평가표';
    case '04':
      return '공정교육';
    case '05':
      return '청정도교육';
    default:
      return '';
  }
};

const getStudy = eduType => {
  switch (eduType) {
    case '00':
      return 'job';
    case '01':
      return 'job_mask';
    case '02':
      return 'job_meter';
    case '03':
      return 'job_handling';
    case '04':
      return '';
    case '05':
      return '';
    default:
      return '';
  }
};

class EduManage extends React.Component {
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
    this.uploadExcel = this.uploadExcel.bind(this);
  }

  componentDidMount() {
    this.initData();
  }

  // When Changed Site
  componentDidUpdate(prevProps) {
    const currentSite = this.props.site;
    const currentType = this.props.type;
    const currentEduType = this.props.eduType;
    if (
      (currentSite !== '' && prevProps.site !== currentSite) ||
      (currentType !== '' && prevProps.type !== currentType) ||
      (currentEduType !== '' && prevProps.eduType !== currentEduType)
    ) {
      this.handleReload(currentSite, currentEduType);
    }
  }

  initData() {
    const { site, eduType } = this.props;
    // const dateValue = document.querySelector('input[name="usageDate"]').value;
    this.setState({ isLoading: true }, () => {
      this.fetchData(site, eduType).then(({ data }) => {
        this.setState({ data: data.length > 0 ? fromJS(JSON.parse(data)) : fromJS([]), isLoading: false });
      });
    });
  }

  reloadData() {
    const { site, eduType } = this.props;
    this.setState({ isLoading: true }, () => {
      this.fetchData(site, eduType).then(({ data }) => {
        this.setState({ data: data.length > 0 ? fromJS(JSON.parse(data)) : fromJS([]), isLoading: false });
      });
    });
  }

  handleReload(site, eduType) {
    this.setState({ isLoading: true }, () => {
      this.fetchData(site, eduType).then(({ data }) => {
        this.setState({ data: data.length > 0 ? fromJS(JSON.parse(data)) : fromJS([]), isLoading: false });
      });
    });
  }

  async fetchData(site, eduType) {
    const requestQuery = {
      type: 'eduJobList',
      // empNo: empno,
      searchStudy: getStudy(eduType),
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manage.get(queryString);
    if (response && !error) {
      const { eduJobList } = response;
      if (eduJobList.length > 0) {
        return {
          data: eduJobList[0].chk_content || [],
        };
      }
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
    console.debug('downloadExcel');
  }

  uploadExcel() {
    console.debug('uploadExcel');
  }

  render() {
    const { isExpanded, data, isLoading } = this.state;
    const { type, eduType } = this.props;
    let columns = [];
    switch (eduType) {
      case '00':
      case '01':
        columns = [
          {
            label: '평가항목',
            dataKey: 'title',
            percentWidth: 40,
            cellRenderer: ({ rowData }) => `${rowData.get('key') + 1}. ${rowData.get('title')}`,
          },
          {
            label: '이론',
            dataKey: 'theory',
            percentWidth: 5,
            cellRenderer: ({ cellData }) => (cellData === true ? 'O' : ''),
          },
          {
            label: '실기',
            dataKey: 'practice',
            percentWidth: 5,
            cellRenderer: ({ cellData }) => (cellData === true ? 'O' : ''),
          },
          {
            label: 'A등급',
            dataKey: 'AGrade',
            percentWidth: 10,
          },
          {
            label: 'B등급',
            dataKey: 'BGrade',
            percentWidth: 10,
          },
          {
            label: 'C등급',
            dataKey: 'CGrade',
            percentWidth: 10,
          },
          {
            label: 'D등급',
            dataKey: 'DGrade',
            percentWidth: 10,
          },
          {
            label: '비고',
            dataKey: 'desc',
            percentWidth: 10,
          },
        ];
        break;
      case '02':
        columns = [
          // {
          //   label: '항목',
          //   dataKey: 'title',
          //   percentWidth: 15,
          //   // cellRenderer: '계측 Operation',
          // },
          {
            label: 'No',
            dataKey: 'key',
            percentWidth: 5,
            cellRenderer: ({ rowData }) => `${rowData.get('key') + 1}`,
          },
          {
            label: '필요능력LIST  세부항목',
            dataKey: 'title',
            percentWidth: 45,
          },
          {
            label: '평가구분',
            dataKey: 'type',
            percentWidth: 10,
            cellRenderer: ({ rowData }) => (rowData.get('theory') ? '이론' : '실기'),
          },
          {
            label: 'A등급',
            dataKey: 'AGrade',
            percentWidth: 10,
          },
          {
            label: 'B등급',
            dataKey: 'BGrade',
            percentWidth: 10,
          },
          {
            label: 'C등급',
            dataKey: 'CGrade',
            percentWidth: 10,
          },
          {
            label: 'D등급',
            dataKey: 'DGrade',
            percentWidth: 10,
          },
        ];
        break;
      case '03':
        columns = [
          {
            label: '평가항목',
            dataKey: 'title',
            percentWidth: 50,
          },
          {
            label: '점수',
            dataKey: 'score',
            percentWidth: 10,
          },
          {
            label: '감점 점수',
            dataKey: 'minusPer',
            percentWidth: 10,
          },
          {
            label: '감점 횟수',
            dataKey: 'minusNumber',
            percentWidth: 20,
          },
          {
            label: '항목별점수',
            dataKey: 'itemNumber',
            percentWidth: 20,
          },
        ];
        break;
      default:
        columns = [];
    }
    return (
      <StyledContents className={`${isExpanded ? 'expanded' : ''}`}>
        <div className="sub_wrap">
          <div className="sub_tit2">
            <span className="small">{`${renderTitle(eduType)} 지문 관리`}</span>
            <div className="btn_wrap">
              <Button type="button" color="grayTwo" size="small" onClick={this.reloadData} disabled={isLoading}>
                재호출
              </Button>
              <Button type="button" color="gray" size="small" onClick={this.downloadExcel}>
                Excel 다운로드
              </Button>
              <Button type="button" color="primary" size="small" onClick={this.uploadExcel}>
                Excel 업로드
              </Button>
              {/* <Button type="button" color="default" size="small" onClick={() => this.handleOpenInfoModal(-1, fromJS({}), true)}>
                항목 추가
              </Button> */}
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

EduManage.propTypes = {
  enableFixView: PropTypes.func,
  disableFixView: PropTypes.func,
  site: PropTypes.string,
  empno: PropTypes.string,
};

EduManage.defaultProps = {
  enableFixView: () => false,
  disableFixView: () => false,
  site: '',
  empno: '',
};

export default EduManage;
