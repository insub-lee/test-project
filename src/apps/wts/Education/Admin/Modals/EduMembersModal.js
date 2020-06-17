import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';
import { Icon, Spin } from 'antd';
import moment from 'moment';

import StyledVirtualized from 'apps/wts/components/CommonStyledElement/StyledVirtualized';
import { exportExcel, getVirtualizedMinHeight, jsonToQueryString } from 'utils/helpers';
import { AutoSizer, Column, SortDirection, SortIndicator, Table } from 'react-virtualized';
import Button from 'components/Button';
import { debounce } from 'lodash';
import EduManageModal from '../../Modals/EduManageModal';
import service from '../../service';
import StyledContent from '../../Modals/StyledContent';
import JobEvaluationReadOnly from '../../Modals/JobEvaluationReadOnly';

class EduMembersModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: false,
      data: [],
      sortBy: 'job_chk_result',
      sortDirection: SortDirection.ASC,
      currentArea: '',
      currentJo: '',
      area: {},
      filterWord: '',
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.downloadExcel = this.downloadExcel.bind(this);
    this.sort = this.sort.bind(this);
    this.handleChangeArea = this.handleChangeArea.bind(this);
    this.handleChangeWorkjo = this.handleChangeWorkjo.bind(this);
    this.handleFilter = debounce(this.handleFilter.bind(this), 500);
    this.getFilterData = this.getFilterData.bind(this);
    this.onRowClick = this.onRowClick.bind(this);

    this.jobEvaluationReadOnlyRef = React.createRef();
    this.eduManageModalRef = React.createRef();
  }

  handleOpenModal(collSeq, title, type) {
    this.setState({ isOpen: true, isLoading: true, collSeq, title, type }, () => {
      this.initData();
    });
  }

  initData() {
    const { collSeq } = this.state;
    this.setState({ data: [] }, () => {
      this.fetchData(collSeq).then(({ data, isError }) => {
        if (isError) {
          alert('데이터를 조회하는 중 오류가 발생했습니다.');
          this.handleCloseModal();
        } else {
          this.setState(prevState => {
            const nextArea = {};
            data.forEach(({ area, workjo }) => {
              if (!nextArea[area]) nextArea[area] = [];
              if (!nextArea[area].includes(workjo)) nextArea[area].push(workjo);
            });
            const { sortBy, sortDirection } = prevState;
            const sortedList = this.sortList({ sortBy, sortDirection }, data);
            return { data: sortedList, isLoading: false, area: nextArea };
          });
        }
      });
    });
  }

  handleCloseModal() {
    this.setState({
      isOpen: false,
      isLoading: false,
      data: [],
      title: '',
      currentArea: '',
      currentJo: '',
      area: {},
    });
  }

  downloadExcel() {
    const { data, title } = this.state;
    const rows = data.map((row, index) => ({
      No: index + 1,
      AREA: row.area,
      근무조: row.workjo,
      BAY: row.bay,
      성명: row.usrnm,
      사번: row.empno,
      직책: row.position,
      교육수료여부: row.job_chk_result === 'O' ? '수료' : '미수료',
    }));
    if (rows.length > 0) {
      exportExcel(rows, `${title}_${moment(new Date()).format('YYYYMMDD')}.xlsx`);
    } else {
      alert('Excel로 받을 내용이 없습니다.');
    }
  }

  handleChangeArea(e) {
    const { value } = e.target;
    this.setState({ currentArea: value, currentJo: '' });
  }

  handleChangeWorkjo(e) {
    const { value } = e.target;
    this.setState({ currentJo: value });
  }

  handleFilter(value) {
    this.setState({ filterWord: value });
  }

  sort({ sortBy, sortDirection }) {
    this.setState(prevState => {
      const { data } = prevState;
      const sortedList = this.sortList({ sortBy, sortDirection }, data);
      return { sortBy, sortDirection, data: sortedList };
    });
  }

  sortList({ sortBy, sortDirection }, data) {
    const sortedData = data.sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }
      return 0;
    });
    return sortDirection === SortDirection.DESC ? sortedData.reverse() : sortedData;
  }

  headerRenderer({ label, dataKey, sortBy, sortDirection }) {
    return (
      <div>
        {label}
        {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
      </div>
    );
  }

  getFilterData() {
    const { currentArea, currentJo, filterWord, data } = this.state;
    let filterData = data;
    if (currentArea && currentArea !== '') {
      filterData = filterData.filter(({ area }) => area.includes(currentArea));
    }
    if (currentJo && currentJo !== '') {
      filterData = filterData.filter(({ workjo }) => workjo === currentJo);
    }
    if (filterWord.trim().length > 0) {
      filterData = filterData.filter(({ empno, usrnm }) => empno.includes(filterWord) || usrnm.includes(filterWord));
    }
    return filterData;
  }

  handleEduManageModal(planseq, reportAuth) {
    this.eduManageModalRef.current.handleOpenModal(planseq, reportAuth);
  }

  onRowClick(rowData) {
    const { type } = this.state;
    const { eduInfo, edu_result: eduResult, plan_seq: planseq } = rowData;
    if (eduResult !== 'O') {
      alert('미수료자의 정보는 조회 불가능합니다.');
    } else if (type === 'job_training') {
      this.handleEduManageModal(planseq, 'readonly');
      console.debug('Job Training!!!');
    } else {
      const { site, area, workjo, bay, empno, position, usrnm, sex, chk_content: chkContent, study: type, comment } = eduInfo;
      const info = {
        site,
        area,
        workjo,
        bay,
        empno,
        position,
        usrnm,
        sex,
      };
      this.jobEvaluationReadOnlyRef.current.handleOpenModal(info, type, JSON.parse(chkContent || '[]'), comment, eduResult);
    }
  }

  async fetchData(collSeq) {
    const requestQuery = {
      type: 'eduMembers',
      collseq: collSeq,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manage.get(queryString);
    if (response && !error) {
      const { eduMembers, checkedMembers } = response;
      const data = checkedMembers.map(checkedMember => {
        const target = eduMembers.find(member => checkedMember.empno === member.empno);
        return {
          ...checkedMember,
          job_chk_result: target ? target.job_chk_result : 'X',
          eduInfo: target,
        };
      });
      return {
        data,
      };
    }
    return {
      isError: true,
      data: [],
    };
  }

  render() {
    const { isOpen, isLoading, title, sortBy, sortDirection, currentArea, currentJo, area } = this.state;
    const columns = [
      {
        label: 'AREA',
        dataKey: 'area',
        percentWidth: 15,
        disableSort: false,
        headerRenderer: this.headerRenderer,
      },
      {
        label: '근무조',
        dataKey: 'workjo',
        percentWidth: 12.5,
        disableSort: false,
        headerRenderer: this.headerRenderer,
      },
      {
        label: 'BAY',
        dataKey: 'bay',
        percentWidth: 15,
        disableSort: false,
        headerRenderer: this.headerRenderer,
      },
      {
        label: '성명',
        dataKey: 'usrnm',
        percentWidth: 15,
        disableSort: false,
        headerRenderer: this.headerRenderer,
      },
      {
        label: '사번',
        dataKey: 'empno',
        percentWidth: 15,
        disableSort: false,
        headerRenderer: this.headerRenderer,
      },
      {
        label: '직책',
        dataKey: 'position',
        percentWidth: 15,
        disableSort: false,
        headerRenderer: this.headerRenderer,
      },
      {
        label: '교육수료',
        dataKey: 'edu_result',
        percentWidth: 12.5,
        disableSort: false,
        headerRenderer: this.headerRenderer,
        cellRenderer: ({ cellData }) =>
          cellData === 'O' ? <span style={{ color: 'rgb(31,181,173)' }}>수료</span> : <span style={{ color: '#ff7f29' }}>미수료</span>,
      },
    ];
    const filteredData = this.getFilterData();
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 800,
        }}
        bodyStyle={{
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <div>
          <StyledContent>
            <div className="pop_tit">
              {`${title} 인원`}
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
                <div className="" style={{ marginBottom: '10px', position: 'relative' }}>
                  <div style={{ display: 'inline-block', marginRight: '10px' }}>
                    <select name="" id="" value={currentArea} onChange={this.handleChangeArea} style={{ width: 200, height: 46 }}>
                      <option value="">전체 AREA</option>
                      {Object.keys(area).map(key => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: 'inline-block', marginRight: '10px' }}>
                    <select name="workjoSelector" id="workjoSelector" value={currentJo} style={{ width: 100, height: 46 }} onChange={this.handleChangeWorkjo}>
                      <option value="">전체 조</option>
                      {area[currentArea] &&
                        area[currentArea].map(workjo => (
                          <option key={workjo} value={workjo}>
                            {workjo}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div style={{ display: 'inline-block', marginRight: '10px' }}>
                    <input
                      type="text"
                      className="input"
                      placeholder="성명 혹은 사번으로 조회"
                      style={{ textAlign: 'left' }}
                      onChange={e => this.handleFilter(e.target.value)}
                    />
                  </div>
                  <div style={{ position: 'absolute', padding: '15px 0', textAlign: 'right', top: 0, right: 0 }}>
                    <Button type="button" color="gray" size="small" onClick={this.downloadExcel} style={{ marginRight: 10 }}>
                      Excel 다운로드
                    </Button>
                  </div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <StyledVirtualized minHeight={getVirtualizedMinHeight(39, 39, filteredData.length, 500)} headerHeight={39}>
                    <AutoSizer>
                      {({ height, width }) => (
                        <Table
                          width={width}
                          height={height}
                          headerHeight={39}
                          rowHeight={39}
                          rowCount={filteredData.length}
                          rowGetter={({ index }) => filteredData[index]}
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
                          onRowClick={({ rowData }) => this.onRowClick(rowData)}
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
              </Spin>
            </div>
          </StyledContent>
        </div>
        <JobEvaluationReadOnly ref={this.jobEvaluationReadOnlyRef} />
        <EduManageModal ref={this.eduManageModalRef} site={this.props.site} />
      </Modal>
    );
  }
}

EduMembersModal.propTypes = {
  site: PropTypes.string,
};

EduMembersModal.defaultProps = {
  site: '',
};

export default EduMembersModal;
