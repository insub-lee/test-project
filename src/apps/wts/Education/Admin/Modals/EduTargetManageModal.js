import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';
import { Icon, Spin } from 'antd';
import { debounce } from 'lodash';
import { AutoSizer, Column, Table } from 'react-virtualized';

import Checkbox from 'apps/wts/components/CheckboxGroup/Checkbox';
import StyledVirtualized from 'apps/wts/components/CommonStyledElement/StyledVirtualized';
import { getVirtualizedMinHeight, jsonToQueryString } from 'utils/helpers';
import Button from 'components/Button';

import service from '../../service';
import StyledContent from '../../Modals/StyledContent';

class EduTargetManageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: false,
      data: [],
      checkedList: [],
      filterWord: '',
      area: {},
      currentArea: '',
      currentJo: '',
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.saveMembers = this.saveMembers.bind(this);
    this.handleChangeAll = this.handleChangeAll.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.handleFilter = debounce(this.handleFilter.bind(this), 500);
    this.handleChangeArea = this.handleChangeArea.bind(this);
    this.handleChangeWorkjo = this.handleChangeWorkjo.bind(this);
    this.removeMember = this.removeMember.bind(this);
  }

  handleFilter(value) {
    this.setState({ filterWord: value });
  }

  handleOpenModal(collSeq, title) {
    this.setState({ isOpen: true, isLoading: true, collSeq, title }, () => {
      this.initData();
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

  initData() {
    const { collSeq } = this.state;
    const { site } = this.props;
    this.setState({ data: [] }, () => {
      this.fetchData(collSeq, site).then(({ data, isError }) => {
        if (isError) {
          alert('데이터를 조회하는 중 오류가 발생했습니다.');
          this.handleCloseModal();
        } else {
          const area = {};
          data.forEach(row => {
            if (!area[row.area]) area[row.area] = [];
            if (!area[row.area].includes(row.workjo)) area[row.area].push(row.workjo);
          });
          Object.keys(area).forEach(value => {
            area[value] = area[value].sort((a, b) => {
              if (a < b) return -1;
              if (a > b) return 1;
              return 0;
            });
          });
          this.setState({ data, isLoading: false, area });
        }
      });
    });
  }

  handleCloseModal() {
    this.setState({
      isOpen: false,
      isLoading: false,
      data: [],
      checkedList: [],
      filterWord: '',
      area: {},
      currentArea: '',
      currentJo: '',
    });
  }

  handleChangeCheck(info) {
    this.setState(prevState => {
      const { checkedList } = prevState;
      const index = checkedList.findIndex(target => target.empno === info.empno);
      if (index > -1) {
        checkedList.splice(index, 1);
      } else {
        checkedList.push(info);
      }
      return { checkedList };
    });
  }

  handleChangeAll(e) {
    const { checked } = e.target;
    this.setState(prevState => {
      const { data } = prevState;
      return { checkedList: checked ? data.filter(item => !item.disabled).map(({ empno, usrnm }) => ({ empno, usrnm })) : [] };
    });
  }

  saveMembers() {
    const { checkedList, collSeq } = this.state;
    const { site } = this.props;
    if (checkedList.length === 0) {
      alert('선택하신 대상이 없습니다.');
    } else if (window.confirm('선택한 대상을 등록하시겠습니까?')) {
      this.postData(
        site,
        [collSeq],
        checkedList.map(({ empno }) => empno),
      ).then(result => {
        if (result) {
          alert('등록되었습니다.');
          this.setState(prevState => {
            const { checkedList: prevCheckedList, data } = prevState;
            const nextData = data.map(item => ({
              ...item,
              disabled: prevCheckedList.findIndex(checkedItem => checkedItem.empno === item.empno) > -1 ? true : item.disabled,
            }));
            return { checkedList: [], data: nextData };
          });
        } else {
          alert('등록중에 오류가 발생했습니다.');
          this.setState({ isLoading: false });
        }
      });
    }
  }

  removeMember(info) {
    const { collSeq } = this.state;
    const { site } = this.props;
    console.debug(info, collSeq, site);
    const { area, workjo, bay, usrnm, empno } = info;
    const message = `[${area} ${workjo} ${bay} ${empno} ${usrnm}]의 교육을 취소 하시겠습니까? \n * 해당 인원의 교육내용은 삭제 됩니다.`;
    if (window.confirm(message)) {
      this.removeData(site, collSeq, empno).then(result => {
        if (result) {
          alert('삭제되었습니다.');
          this.setState(prevState => {
            const { data } = prevState;
            const targetIndex = data.findIndex(row => row.empno === empno);
            if (targetIndex > -1) {
              data[targetIndex].disabled = false;
            }
            return { data };
          });
        } else {
          alert('삭제중에 오류가 발생했습니다.');
          this.setState({ isLoading: false });
        }
      });
    }
  }

  async fetchData(collSeq, searchSite) {
    const requestQuery = {
      type: 'getWorkersBySite',
      searchSite,
      collseq: collSeq,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manage.get(queryString);
    if (response && !error) {
      const { members, checkedMembers } = response;
      const data = members.map(member => ({
        ...member,
        disabled: checkedMembers.findIndex(checkedMember => checkedMember.empno === member.empno) > -1,
      }));
      return {
        data,
      };
    }
    return {
      isError: true,
      data: [],
    };
  }

  async postData(searchSite, seqs, empNos) {
    const payload = {
      type: 'insJobEdu',
      seqs,
      empNos,
      searchSite,
    };
    const { response, error } = await service.manage.post(payload);
    if (response && !error) {
      const { insertyn } = response;
      return insertyn;
    }
    return false;
  }

  async removeData(site, collseq, empno) {
    const payload = {
      type: 'deleteGroupEduUser',
      site,
      collseq,
      empno,
    };
    const { response, error } = await service.manage.delete(payload);
    if (response && !error) {
      const { deleteyn } = response;
      return deleteyn;
    }
    return false;
  }

  render() {
    const { isOpen, isLoading, data, title, checkedList, filterWord, area, currentArea, currentJo } = this.state;
    let filteredData = currentArea && currentArea !== '' ? data.filter(row => row.area === currentArea) : data;
    filteredData = currentJo && currentJo !== '' ? filteredData.filter(row => row.workjo === currentJo) : filteredData;
    filteredData = filterWord.trim().length > 0 ? filteredData.filter(row => row.usrnm.includes(filterWord) || row.empno.includes(filterWord)) : filteredData;
    const columns = [
      {
        label: '체크',
        dataKey: 'chk',
        percentWidth: 5,
        headerRenderer: () => (
          <Checkbox
            id="chk-all"
            name="chk-all"
            labelText=""
            value="all"
            noPadding
            fitting
            onChange={this.handleChangeAll}
            checked={checkedList.length > 0 && data.filter(item => !item.disabled).length === checkedList.length}
          />
        ),
        cellRenderer: ({ rowData }) =>
          rowData.disabled ? (
            <button type="button" onClick={() => this.removeMember(rowData)}>
              <i className="fa fa-times" />
            </button>
          ) : (
            <Checkbox
              id={`chk-${rowData.empno}`}
              name={`chk-${rowData.empno}`}
              labelText=""
              value={rowData.empno}
              noPadding
              fitting
              onChange={() => this.handleChangeCheck({ empno: rowData.empno, usrnm: rowData.usrnm })}
              checked={checkedList.findIndex(info => info.empno === rowData.empno) > -1}
            />
          ),
      },
      {
        label: 'AREA',
        dataKey: 'area',
        percentWidth: 15,
      },
      {
        label: '근무조',
        dataKey: 'workjo',
        percentWidth: 15,
      },
      {
        label: 'BAY',
        dataKey: 'bay',
        percentWidth: 15,
      },
      {
        label: '성명',
        dataKey: 'usrnm',
        percentWidth: 15,
      },
      {
        label: '사번',
        dataKey: 'empno',
        percentWidth: 15,
      },
      {
        label: '직책',
        dataKey: 'position',
        percentWidth: 20,
      },
    ];

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
              {`${title} 대상자 지정`}
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
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
                <div style={{ padding: '15px 0', textAlign: 'right' }}>
                  <Button type="button" color="primary" size="small" onClick={this.saveMembers} style={{ marginRight: 10 }}>
                    선택인원 교육 지정
                  </Button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <StyledVirtualized minHeight={getVirtualizedMinHeight(39, 39, data.length, 500)} headerHeight={39}>
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
      </Modal>
    );
  }
}

EduTargetManageModal.propTypes = {
  site: PropTypes.string,
};

EduTargetManageModal.defaultProps = {
  site: '',
};

export default EduTargetManageModal;
