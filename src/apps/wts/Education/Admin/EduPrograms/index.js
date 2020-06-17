import React from 'react';
import { Icon, Spin } from 'antd';
import { fromJS } from 'immutable';
import moment from 'moment';

import { getVirtualizedMinHeight, jsonToQueryString } from 'utils/helpers';
import { AutoSizer, Column, Table, SortDirection, SortIndicator } from 'react-virtualized';
import StyledVirtualized from 'apps/wts/components/CommonStyledElement/StyledVirtualized';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import EduProgramFormModal from '../Modals/EduProgramFormModal';
import EduProgramManageEvaluationModal from '../Modals/EduProgramManageEvaluation';
import GroupManageModal from '../Modals/GroupManageModal';
import EduPlanQuestionsModal from '../Modals/EduPlanQuestionsModal';
import EduMembersModal from '../Modals/EduMembersModal';
import EduTargetManageModal from '../Modals/EduTargetManageModal';
import service from '../../service';
import StyledStandard from '../../../StyledStandard';

import Wrapper from './Wrapper';

const eduButtonStyle = {
  padding: '2px 10px',
  margin: '0 5px',
  border: '1px solid black',
  borderRadius: 30,
  fontSize: '13px',
  lineHeight: '1.5',
  background: 'transparent',
};

const colorSelector = (startDate, endDate) => {
  const currentTime = new Date().valueOf();
  const startTime = moment(startDate, 'YYYYMMDD').valueOf();
  const endTime = moment(endDate, 'YYYYMMDD')
    .add(1, 'days')
    .valueOf();
  let color = 'black';
  if (startTime < currentTime) {
    // color = '#1fb5ad';
    color = 'black';
  }
  if (endTime <= currentTime) {
    // color = 'rgb(255, 127, 41)';
    color = 'red';
  }
  return color;
};

class EduPrograms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: fromJS([]),
      searchDate: new Date(),
      sortBy: 'collecsdt',
      sortDirection: SortDirection.DESC,
      filter: {
        currentEdu: '',
        currentType: '',
        currentTime: '',
      },
      edus: [],
      types: [],
      times: [],
    };

    this.columnsRenderer = this.columnsRenderer.bind(this);
    this.initData = this.initData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleOpenEduProgramFormModal = this.handleOpenEduProgramFormModal.bind(this);
    this.handleOpenEduProgramManageEvaluationModal = this.handleOpenEduProgramManageEvaluationModal.bind(this);
    this.handleChangeSearchDate = this.handleChangeSearchDate.bind(this);
    this.dateOptionRenderer = this.dateOptionRenderer.bind(this);
    this.handleOpenGroupManageModal = this.handleOpenGroupManageModal.bind(this);
    this.handleOpenEduPlanQuestionsModal = this.handleOpenEduPlanQuestionsModal.bind(this);
    this.handleOpenEduMembers = this.handleOpenEduMembers.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.buttonsRenderer = this.buttonsRenderer.bind(this);
    this.handleOpenRemoveEduModal = this.handleOpenRemoveEduModal.bind(this);
    this.handleOpenEduTargetManageModal = this.handleOpenEduTargetManageModal.bind(this);
    this.sortList = this.sortList.bind(this);
    this.sort = this.sort.bind(this);
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.getFilterData = this.getFilterData.bind(this);

    this.eduPlanQuestionsModal = React.createRef();
    this.eduProgramFormModalRef = React.createRef();
    this.eduProgramManageEvaluationModal = React.createRef();
    this.groupManageModal = React.createRef();
    this.eduMembers = React.createRef();
    this.eduTargetManageModal = React.createRef();
  }

  componentDidMount() {
    this.initData();
  }

  initData() {
    const { searchDate } = this.state;
    const { manInfo } = this.props;
    this.setState({ isLoading: true }, () => {
      // function fetchData(site, colldt)
      this.fetchData(manInfo.site, searchDate.getFullYear()).then(({ data }) => {
        const { sortBy, sortDirection } = this.state;
        const edus = [];
        const types = [];
        const times = [];
        data.forEach(row => {
          if (!edus.includes(this.getTitle(fromJS(row)))) edus.push(this.getTitle(fromJS(row)));
          if (!types.includes(row.group_study === 'O' ? '집체교육' : '개별')) types.push(row.group_study === 'O' ? '집체교육' : '개별');
          if (!times.includes(row.times)) times.push(row.times);
        });
        const sortedList = this.sortList({ sortBy, sortDirection }, fromJS(data));
        this.setState({ data: sortedList, isLoading: false, edus, types, times, filter: { currentEdu: '', currentType: '', currentTime: '' } });
      });
    });
  }

  handleOpenEduProgramFormModal() {
    this.eduProgramFormModalRef.current.handleOpenModal();
  }

  handleOpenEduPlanQuestionsModal() {
    this.eduPlanQuestionsModal.current.handleOpenModal();
  }

  handleOpenEduProgramManageEvaluationModal() {
    this.eduProgramManageEvaluationModal.current.handleOpenModal();
  }

  handleOpenGroupManageModal(collSeq) {
    this.groupManageModal.current.handleOpenModal(collSeq);
  }

  handleOpenEduMembers(collSeq, title, type) {
    this.eduMembers.current.handleOpenModal(collSeq, title, type);
  }

  handleChangeSearchDate(e) {
    const { value } = e.target;
    const { manInfo } = this.props;
    this.setState({ searchDate: moment(value, 'YYYY').toDate() }, () => {
      // function fetchData(site, colldt)
      this.fetchData(manInfo.site, value).then(({ data }) => {
        const { sortBy, sortDirection } = this.state;
        const edus = [];
        const types = [];
        const times = [];
        data.forEach(row => {
          if (!edus.includes(this.getTitle(fromJS(row)))) edus.push(this.getTitle(fromJS(row)));
          if (!types.includes(row.group_study === 'O' ? '집체교육' : '개별')) types.push(row.group_study === 'O' ? '집체교육' : '개별');
          if (!times.includes(row.times)) times.push(row.times);
        });
        const sortedList = this.sortList({ sortBy, sortDirection }, fromJS(data));
        this.setState({ data: sortedList, isLoading: false, edus, types, times, filter: { currentEdu: '', currentType: '', currentTime: '' } });
      });
    });
  }

  dateOptionRenderer() {
    const maxYear = new Date().getFullYear();
    const minYear = 2019;
    const options = [];
    for (let i = 0; i <= maxYear - minYear; i += 1) {
      options.push({ value: maxYear - i, label: `${maxYear - i}년` });
    }
    return options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
  }

  getTitle(rowData) {
    const type = rowData.get('study');
    const timetype = rowData.get('type');
    const isGroup = rowData.get('group_study') === 'O';
    let timetypeStr = '(16시간)';
    if (timetype === 'B') {
      timetypeStr = '(40시간)';
    }
    let title = '';
    switch (type) {
      case 'job': // 직무능력평가
        title = '직무능력평가';
        break;
      case 'job_mask': // 직무 (mask)
        title = '직무능력평가(MASK)';
        break;
      case 'job_meter': // 직무 (meter)
        title = '직무능력평가(계측기)';
        break;
      case 'job_handling': // 핸들링
        title = 'Handling 평가';
        break;
      case 'job_proc': // 공정
        title = '공정 교육';
        break;
      case 'job_clean': // 청정
        title = '청정도 교육';
        break;
      case 'job_return':
        title = `복직자 교육 ${timetypeStr}`;
        break;
      case 'job_training':
        title = '신입/전배 교육';
        break;
      default:
        title = '';
        break;
    }
    if (isGroup) {
      title += ` ${rowData.get('title') || ''}`;
    }
    if (!isGroup && type === 'job_proc') {
      title += ` (${rowData.get('type')}형)`;
    }
    if (type === 'job_training') {
      title += ` (${rowData.get('type') === 'A' ? '1단계 부터' : '2단계 부터'})`;
    }
    return title;
  }

  handleOpenRemoveEduModal(collSeq, title) {
    const message = `${title} 교육을 삭제 하시겠습니까? \n(기존 평가된 모든 데이터가 삭제됩니다.)`;
    if (window.confirm(message)) {
      this.deleteProgram(collSeq).then(({ result }) => {
        if (result) {
          alert('삭제되었습니다.');
          this.initData();
        } else {
          alert('삭제하는 과정에서 오류가 발생했습니다.');
        }
      });
    }
  }

  handleOpenEduTargetManageModal(collSeq, title) {
    console.debug('# Open Manage Modal ', collSeq, title);
    this.eduTargetManageModal.current.handleOpenModal(collSeq, title);
  }

  buttonsRenderer(rowData) {
    const { searchDate } = this.state;
    const child = [];
    // const currentTime = moment(new Date().valueOf(), 'YYYYMMDD').valueOf();
    const date = new Date();
    const yearStr = date.getFullYear().toString();
    const monthInt = date.getMonth() + 1;
    const monthIntStr = monthInt.toString();
    const zeroMonth = '0';
    const monthPlusZero = zeroMonth + monthIntStr;
    let monthVar;
    if (monthInt < 10) {
      monthVar = monthPlusZero;
    } else {
      monthVar = monthIntStr;
    }
    const monthStr = monthVar;
    const dayStr = date.getDate().toString();
    const currentDay = yearStr + monthStr + dayStr;
    const currentTime = moment(currentDay, 'YYYYMMDD').valueOf();
    const startTime = moment(rowData.get('collecsdt'), 'YYYYMMDD').valueOf();
    const title = `${moment(searchDate).format('YYYY')}년 ${rowData.get('times')}차 ${this.getTitle(rowData)}`;
    if (rowData.get('group_study') === 'O') {
      child.push(
        <button
          type="button"
          key="action-buttons-0"
          style={{ ...eduButtonStyle, borderColor: 'rgb(31, 181, 173)', color: 'rgb(31, 181, 173)' }}
          onClick={() => this.handleOpenGroupManageModal(rowData.get('coll_seq'))}
        >
          집체교육 관리
        </button>,
      );
    } else {
      child.push(
        <button
          type="button"
          key="action-buttons-1"
          style={{ ...eduButtonStyle, borderColor: '#636a78', color: '#636a78' }}
          onClick={() => this.handleOpenEduMembers(rowData.get('coll_seq'), title, rowData.get('study'))}
        >
          교육인원 조회
        </button>,
      );
    }
    const commonButtons = (
      <React.Fragment key="commonButtons">
        {currentTime <= startTime && (
          <button
            type="button"
            key="common-buttons-0"
            style={{ ...eduButtonStyle, borderColor: '#ff7f29', color: '#ff7f29' }}
            onClick={() => this.handleOpenEduTargetManageModal(rowData.get('coll_seq'), title)}
          >
            교육대상자 지정
          </button>
        )}
        <button
          type="button"
          key="common-buttons-1"
          style={{ ...eduButtonStyle, borderColor: '#999', color: '#999' }}
          onClick={() => this.handleOpenRemoveEduModal(rowData.get('coll_seq'), title)}
        >
          교육 삭제
        </button>
      </React.Fragment>
    );
    child.push(commonButtons);
    return child;
  }

  handleChangeFilter(e) {
    const { name, value } = e.target;
    this.setState(prevState => {
      const { filter } = prevState;
      filter[name] = value;
      return { filter };
    });
  }

  async fetchData(site, colldt) {
    const requestQuery = {
      type: 'collectiveEduList',
      searchSite: site,
      colldt,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manage.get(queryString);
    if (response && !error) {
      const { collectiveEduList } = response;
      return {
        data: collectiveEduList || [],
      };
    }
    return { data: [] };
  }

  async deleteProgram(collseq) {
    const payload = {
      type: 'deleteProgram',
      collseq,
    };
    const { response, error } = await service.manage.delete(payload);
    if (response && !error) {
      const { deleteyn } = response;
      return { result: deleteyn };
    }
    return { result: false };
  }

  headerRenderer({ label, dataKey, sortBy, sortDirection }) {
    return (
      <div>
        {label}
        {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
      </div>
    );
  }

  sort({ sortBy, sortDirection }) {
    this.setState(prevState => {
      const { data } = prevState;
      const sortedList = this.sortList({ sortBy, sortDirection }, data);
      return { sortBy, sortDirection, data: sortedList };
    });
  }

  sortList({ sortBy, sortDirection }, data) {
    // .update(list => (sortDirection === SortDirection.DESC ? list.reverse() : list))
    // const sortedData = data.sortBy(item => Number(item[sortBy]));
    const sortedData = data.sort((a, b) => {
      const valueA = a.get(sortBy);
      const valueB = b.get(sortBy);
      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }
      return 0;
    });
    return sortedData.update(list => (sortDirection === SortDirection.DESC ? list.reverse() : list));
  }

  getFilterData() {
    const {
      filter: { currentEdu, currentType, currentTime },
      data,
    } = this.state;
    let filterData = data;
    if (currentEdu && currentEdu !== '') {
      filterData = filterData.filter(row => this.getTitle(row) === currentEdu);
    }
    if (currentType && currentType !== '') {
      filterData = filterData.filter(row => (row.get('group_study') === 'O' ? '집체교육' : '개별') === currentType);
    }
    if (currentTime && currentTime !== '') {
      filterData = filterData.filter(row => row.get('times') === currentTime);
    }
    return filterData;
  }

  columnsRenderer() {
    return [
      {
        label: '교육',
        dataKey: 'study',
        percentWidth: 15,
        headerRenderer: this.headerRenderer,
        cellRenderer: ({ cellData, rowData }) => (
          <span style={{ color: colorSelector(rowData.get('collecsdt'), rowData.get('collecedt')) }}>{this.getTitle(rowData)}</span>
        ),
        disableSort: false,
      },
      {
        label: '구분',
        dataKey: 'group_study',
        percentWidth: 15,
        headerRenderer: this.headerRenderer,
        cellRenderer: ({ cellData }) => (cellData === 'O' ? '집체교육' : '개별'),
        disableSort: false,
      },
      {
        label: '회차',
        dataKey: 'times',
        percentWidth: 5,
        headerRenderer: this.headerRenderer,
        disableSort: false,
      },
      {
        label: '시작날짜',
        dataKey: 'collecsdt',
        percentWidth: 15,
        headerRenderer: this.headerRenderer,
        cellRenderer: ({ cellData }) => moment(cellData, 'YYYYMMDD').format('YYYY.MM.DD'),
      },
      {
        label: '종료날짜',
        dataKey: 'collecedt',
        percentWidth: 15,
        headerRenderer: this.headerRenderer,
        cellRenderer: ({ cellData }) => moment(cellData, 'YYYYMMDD').format('YYYY.MM.DD'),
        disableSort: false,
      },
      {
        label: '기능',
        dataKey: 'usrid',
        percentWidth: 35,
        headerRenderer: this.headerRenderer,
        cellRenderer: ({ rowData }) => this.buttonsRenderer(rowData),
        disableSort: true,
      },
    ];
  }

  render() {
    const {
      isLoading,
      data,
      searchDate,
      sortBy,
      sortDirection,
      filter: { currentEdu, currentType, currentTime },
      edus,
      types,
      times,
    } = this.state;
    const { manInfo } = this.props;
    const filteredData = this.getFilterData();
    return (
      <Wrapper>
        <StyledStandard>
          <div className="title">년도별 교육목록</div>
          <StyledButtonWrapper className="btn-wrap-right" style={{ position: 'relative', marginBottom: 30 }}>
            <div style={{ position: 'absolute', width: 100, top: 0, left: 0 }}>
              <select name="" value={moment(searchDate).format('YYYY')} onChange={this.handleChangeSearchDate}>
                {this.dateOptionRenderer()}
              </select>
            </div>
            <StyledButton type="button" className="btn-gray btn-sm mr5" onClick={this.handleOpenEduPlanQuestionsModal}>
              신입/전배 교육 문항 관리
            </StyledButton>
            <StyledButton type="button" className="btn-gray btn-sm mr5" onClick={this.handleOpenEduProgramManageEvaluationModal}>
              교육 평가 문항 관리
            </StyledButton>
            <StyledButton type="button" className="btn-primary btn-sm" onClick={this.handleOpenEduProgramFormModal}>
              교육 추가하기
            </StyledButton>
          </StyledButtonWrapper>
          <div>
            <div style={{ marginBottom: '10px' }}>
              <div style={{ display: 'inline-block', marginRight: '10px' }}>
                <select name="currentEdu" value={currentEdu} onChange={this.handleChangeFilter} style={{ width: 150, height: 46 }}>
                  <option value="">전체 교육</option>
                  {edus.map(value => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'inline-block', marginRight: '10px' }}>
                <select name="currentType" value={currentType} onChange={this.handleChangeFilter} style={{ width: 150, height: 46 }}>
                  <option value="">전체 구분</option>
                  {types.map(value => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'inline-block', marginRight: '10px' }}>
                <select name="currentTime" value={currentTime} onChange={this.handleChangeFilter} style={{ width: 150, height: 46 }}>
                  <option value="">전체 회차</option>
                  {times.map(value => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
              <StyledVirtualized minHeight={getVirtualizedMinHeight(48, 48, filteredData.size, 500)} headerHeight={48} disableDefaultHover>
                <AutoSizer>
                  {({ height, width }) => (
                    <Table
                      width={width}
                      height={height}
                      headerHeight={48}
                      rowHeight={48}
                      rowCount={filteredData.size}
                      rowGetter={({ index }) => filteredData.get(index)}
                      headerClassName="virtualized_header"
                      gridClassName="virtualized_grid"
                      rowClassName="virtualized_row"
                      noRowsRenderer={() => (
                        <div className="virtualized_noData">
                          <span>{isLoading ? 'Loading...' : 'No Data'}</span>
                        </div>
                      )}
                      sort={this.sort}
                      sortBy={sortBy}
                      sortDirection={sortDirection}
                    >
                      {this.columnsRenderer().map(column => (
                        <Column
                          key={column.dataKey}
                          {...column}
                          width={(width * column.percentWidth) / 100}
                          style={{
                            ...column.style,
                            lineHeight: '48px',
                          }}
                        />
                      ))}
                    </Table>
                  )}
                </AutoSizer>
              </StyledVirtualized>
            </Spin>
          </div>
          <EduMembersModal ref={this.eduMembers} site={manInfo.site} />
          <EduTargetManageModal ref={this.eduTargetManageModal} site={manInfo.site} />
          <GroupManageModal ref={this.groupManageModal} site={manInfo.site} />
          <EduProgramFormModal ref={this.eduProgramFormModalRef} site={manInfo.site} callbackHandler={this.initData} />
          <EduProgramManageEvaluationModal ref={this.eduProgramManageEvaluationModal} site={manInfo.site} empno={manInfo.empno} />
          <EduPlanQuestionsModal ref={this.eduPlanQuestionsModal} site={manInfo.site} empno={manInfo.empno} />
        </StyledStandard>
      </Wrapper>
    );
  }
}

export default EduPrograms;
