import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { Spin } from 'antd';

import { jsonToQueryString, getVirtualizedMinHeight } from 'utils/helpers';
import StyledVirtualized from 'apps/wts/components/CommonStyledElement/StyledVirtualized';
import { AutoSizer, Column, SortDirection, SortIndicator, Table } from 'react-virtualized';
import Checkbox from 'apps/wts/components/CheckboxGroup/Checkbox';

import service from '../../service';
import StyledContent from '../../Modals/StyledContent';

const bigoOptions = ['육아휴직', '출산휴가', '임신휴가', '신병휴직', '교통사고', '가족돌봄', '시사휴직', '임산부', '기타휴직', '기타휴가', '기타'];

const Wrapper = styled.div`
  .title {
    padding: 10px 0;
    font-size: 20px;
    font-weight: 600;
  }

  .btn_wrap {
    margin-bottom: 5px;
    text-align: right;
  }

  .search_div {
    margin-bottom: 10px;

    li {
      float: left;
      list-style-type: none;
      vertical-align: bottom;
      margin: 0 30px 10px 0;
    }

    input {
      text-align: center;
    }
  }
  ul.search_div::after {
    clear: both;
  }
  ul.search_div > li {
    &:last-child::after {
      clear: both;
    }
  }
`;

class GroupManageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: false,
      data: [],
      currentArea: '',
      currentJo: '',
      area: {},
      filterWord: '',
      sortBy: 'area',
      sortDirection: SortDirection.ASC,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleChangeArea = this.handleChangeArea.bind(this);
    this.handleChangeWorkjo = this.handleChangeWorkjo.bind(this);
    this.handleFilter = debounce(this.handleFilter.bind(this), 500);
    this.initData = this.initData.bind(this);
    this.handleChangeAll = this.handleChangeAll.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.handleChangeText = debounce(this.handleChangeText.bind(this), 500);
    this.sortList = this.sortList.bind(this);
    this.sort = this.sort.bind(this);
    this.headerCheckRenderer = this.headerCheckRenderer.bind(this);
    this.getFilterData = this.getFilterData.bind(this);
    this.cellBigoRenderer = this.cellBigoRenderer.bind(this);
  }

  handleOpenModal(collSeq) {
    this.setState({ isOpen: true, isLoading: true, collSeq }, () => {
      this.initData();
    });
  }

  initData() {
    const { collSeq } = this.state;
    const { site } = this.props;
    this.setState({ data: [] }, () => {
      this.fetchData(collSeq, site).then(({ data, isError }) => {
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
      currentArea: '',
      currentJo: '',
      area: {},
    });
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

  handleChangeText(text, empno, index) {
    const { collSeq } = this.state;
    const { site } = this.props;
    const payload = {
      type: 'updateGroupEduBigo',
      empno,
      collseq: collSeq,
      site,
      bigo: text,
    };
    this.setState(
      prevState => {
        const { data } = prevState;
        data[index].isLoading = true;
        this.setState({ data });
      },
      () => {
        this.updateDate(payload).then(result => {
          if (result) {
            this.setState(prevState => {
              const { data } = prevState;
              data[index].bigo = text;
              data[index].isLoading = false;
              return { data };
            });
          } else {
            alert('데이터를 업데이트 하는 과정에서 오류가 발생했습니다.');
          }
        });
      },
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

  handleChangeAll(e) {
    const { checked } = e.target;
    const { collSeq, data } = this.state;
    const { site } = this.props;
    const payload = {
      type: 'insertGroupEduUsers',
      empnos: data.map(({ empno }) => empno),
      collseq: collSeq,
      site,
      edu_result: checked ? 'O' : 'X',
      bigo: checked ? '' : undefined,
    };
    this.setState({ isLoading: true }, () => {
      this.upsertEmpnos(payload).then(result => {
        if (result) this.initData();
      });
    });
    console.debug('@@ Payload', payload);
  }

  handleChangeCheck(e, empno, index) {
    const { checked } = e.target;
    const { collSeq } = this.state;
    const { site } = this.props;
    // 이벤트가 일어날때의 checked 기반으로 insert delete 수행
    //   if (checked) {
    // Todo - insert
    const payload = {
      type: 'insertGroupEduUser',
      empno,
      collseq: collSeq,
      site,
      edu_result: checked ? 'O' : 'X',
      bigo: checked ? '' : undefined,
    };
    this.setState(
      prevState => {
        const { data } = prevState;
        data[index].isLoading = true;
      },
      () => {
        this.insertData(payload).then(result => {
          if (result) {
            // Todo - check 처리
            this.setState(prevState => {
              const { data } = prevState;
              data[index].edu_result = payload.edu_result;
              data[index].isLoading = false;
              if (payload.edu_result === 'O') data[index].bigo = '';
              return { data };
            });
          } else {
            alert('데이터를 업데이트 하는 과정에서 오류가 발생했습니다.');
            this.setState(prevState => {
              const { data } = prevState;
              data[index].isLoading = false;
              return { data };
            });
          }
        });
      },
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

  cellBigoRenderer({ cellData, rowData, rowIndex }) {
    return (
      <select
        key={rowIndex}
        value={cellData}
        onChange={e => this.handleChangeText(e.target.value, rowData.empno, rowIndex)}
        style={{ margin: 0, padding: 0, height: '100%', lineHeight: 'initial', textAlign: 'center' }}
        disabled={rowData.edu_result === 'O'}
      >
        <option value="">-</option>
        {bigoOptions.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  headerRenderer({ label, dataKey, sortBy, sortDirection }) {
    return (
      <div>
        {label}
        {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
      </div>
    );
  }

  headerCheckRenderer({ label, dataKey, sortBy, sortDirection }) {
    const { data, currentArea, currentJo, filterWord } = this.state;
    return (
      <div>
        {currentArea === '' && currentJo === '' && filterWord === '' && (
          <Checkbox
            id="chk-all"
            name="chk-all"
            value="all"
            noPadding
            fitting
            checked={!data.some(row => row.edu_result !== 'O')}
            onChange={this.handleChangeAll}
            labelText=""
            labelStyle={{ color: '#fff' }}
          />
        )}
        {` ${label}`}
        {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
      </div>
    );
  }

  async fetchData(collSeq, searchSite) {
    const requestQuery = {
      type: 'getWorkByCollSeq',
      searchSite,
      collseq: collSeq,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manage.get(queryString);
    if (response && !error) {
      const { members } = response;
      return {
        data: members,
      };
    }
    return {
      isError: true,
      data: [],
    };
  }

  async fetchAreas(site) {
    const requestQuery = {
      type: 'workAreas',
      searchSite: site,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manHisAdmin.get(queryString);
    if (response && !error) {
      const { workAreas } = response;
      const areas = {};
      workAreas.forEach(obj => {
        if (obj.site === site) {
          if (!areas[obj.area]) {
            areas[obj.area] = [];
          }
          areas[obj.area].push(obj.workjo);
        }
      });
      return areas;
    }
    return {};
  }

  async fetchWorkerList(currentArea, currentJo, site, collseq) {
    const requestQuery = {
      type: 'getWorkAreaBayEdu',
      searchSite: site,
      area: currentArea,
      workjo: currentJo,
      collseq,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manage.get(queryString);
    if (response && !error) {
      const { list } = response;
      return {
        data: list,
      };
    }
    alert('데이터를 조회하는 과정에서 오류가 발생했습니다.');
    return {
      data: [],
    };
  }

  async upsertEmpnos(payload) {
    const { response, error } = await service.manage.post(payload);
    if (response && !error) {
      const { insertyn } = response;
      return insertyn;
    }
    return false;
  }

  async insertData(payload) {
    const { response, error } = await service.manage.post(payload);
    if (response && !error) {
      const { insertyn } = response;
      return insertyn;
    }
    return false;
  }

  async updateDate(payload) {
    const { response, error } = await service.manage.put(payload);
    if (response && !error) {
      const { updateyn } = response;
      return updateyn;
    }
    return false;
  }

  async deleteData(payload) {
    const { response, error } = await service.manage.delete(payload);
    if (response && !error) {
      const { deleteyn } = response;
      return deleteyn;
    }
    return false;
  }

  render() {
    const { isOpen, isLoading, currentArea, currentJo, area, data, sortBy, sortDirection } = this.state;
    const columns = [
      {
        label: 'AREA',
        dataKey: 'area',
        percentWidth: 10,
        disableSort: false,
        headerRenderer: this.headerRenderer,
      },
      {
        label: '근무조',
        dataKey: 'workjo',
        percentWidth: 10,
        disableSort: false,
        headerRenderer: this.headerRenderer,
      },
      {
        label: 'BAY',
        dataKey: 'bay',
        percentWidth: 10,
        disableSort: false,
        headerRenderer: this.headerRenderer,
      },
      {
        label: '성명',
        dataKey: 'usrnm',
        percentWidth: 10,
        disableSort: false,
        headerRenderer: this.headerRenderer,
      },
      {
        label: '사번',
        dataKey: 'empno',
        percentWidth: 10,
        disableSort: false,
        headerRenderer: this.headerRenderer,
      },
      {
        label: '직책',
        dataKey: 'position',
        percentWidth: 10,
        disableSort: false,
        headerRenderer: this.headerRenderer,
      },
      {
        label: '교육참가',
        dataKey: 'edu_result',
        percentWidth: 15,
        cellRenderer: ({ cellData, rowData, rowIndex }) =>
          rowData.isLoading ? (
            <Spin spinning />
          ) : (
            <Checkbox
              id={`chk-${rowData.empno}`}
              name={`chk-${rowData.empno}`}
              labelText=""
              value={rowData.empno}
              noPadding
              fitting
              checked={cellData === 'O'}
              onChange={e => this.handleChangeCheck(e, rowData.empno, rowIndex)}
            />
          ),
        disableSort: true,
        headerRenderer: this.headerCheckRenderer,
      },
      {
        label: '불참사유',
        dataKey: 'bigo',
        percentWidth: 25,
        cellRenderer: this.cellBigoRenderer,
        headerRenderer: this.headerRenderer,
        disableSort: true,
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
              집체 교육 관리
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <Spin spinning={isLoading}>
                <Wrapper>
                  <div className="" style={{ marginBottom: '10px' }}>
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
                            // sort={this.sort}
                            // sortBy={sortBy}
                            // sortDirection={sortDirection}
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
              </Spin>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

GroupManageModal.propTypes = {
  site: PropTypes.string,
};

GroupManageModal.defaultProps = {
  site: '',
};

export default GroupManageModal;
