import React from 'react';
import moment from 'moment';
import Modal from 'rc-dialog';
import { orderBy } from 'lodash';
import { Spin } from 'antd';

import { AutoSizer, Column, Table } from 'react-virtualized';
import StyledVirtualized from 'apps/wts/components/CommonStyledElement/StyledVirtualized';
import { jsonToQueryString } from 'utils/helpers';

import StyledContent from './StyledContent';
import SchedulerView from './ChiefSchedulerView';
// import { getVirtualizedMinHeight } from 'utils/helpers';
import service from '../service';

class ChiefScheduleManageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      manWorkVacationInfoList: [],
      sddGroup: [],
      loaded: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.loadWorkerTimeHistory = this.loadWorkerTimeHistory.bind(this);
    this.fetchWorkList = this.fetchWorkList.bind(this);
  }

  handleOpenModal() {
    this.setState({ isOpen: true });
    this.loadWorkerTimeHistory();
  }

  handleCloseModal() {
    this.setState({ isOpen: false, manWorkVacationInfoList: [], sddGroup: [], loaded: false });
  }

  handleAfterOpen() {
    const { id } = this.state;
    console.debug('Opened Modal : ', id);
  }

  loadWorkerTimeHistory() {
    const { empNo, manInfo } = this.props;
    this.fetchWorkList(empNo, moment(new Date()).format('YYYYMMDD')).then(({ list }) => {
      const workJo = [];
      const sddGroup = [];
      list.forEach(({ area, bay, usrid, usrnm, workjo, sdd, edd, worktime, wweek, wwgrp, overtime }) => {
        const targetIndex = workJo.findIndex(worker => worker.usrid === usrid);
        if (targetIndex >= 0) {
          workJo[targetIndex].time[sdd] = {
            sdd,
            edd,
            wweek,
            worktime,
            overtime,
            wwgrp,
          };
        } else {
          const time = {};
          time[sdd] = {
            sdd,
            edd,
            wweek,
            worktime,
            overtime,
            wwgrp,
          };
          workJo.push({ usrid, area, bay, usrnm, workjo, time });
        }
        if (!sddGroup.includes(sdd)) sddGroup.push(sdd);
      });
      const { area, workjo } = manInfo;
      const prefixWorkJoList = workJo.filter(member => member.bay === '반장');
      const ownWorkJoList = orderBy(
        workJo.filter(member => member.area === area && member.workjo === workjo && member.bay !== '반장'),
        ['workjo', 'bay'],
        ['asc', 'asc'],
      );
      const etcWorkJoList = orderBy(
        workJo.filter(member => member.area !== area || member.workjo !== workjo),
        ['workjo', 'bay'],
        ['asc', 'asc'],
      );
      const nextSddGroup = sddGroup.sort();
      if (nextSddGroup.length > 8) {
        let i = nextSddGroup.length - 8;
        while (i > 0) {
          nextSddGroup.shift();
          i -= 1;
        }
      }
      this.setState({ manWorkVacationInfoList: [...prefixWorkJoList, ...ownWorkJoList, ...etcWorkJoList], sddGroup: nextSddGroup, loaded: true });
      /* 자기 담당조를 우선 보이도록 수정 */
      // const { area, workjo } = manInfo;
      // const { manWorkVacationInfoList } = payload;
      // const ownWorkJoList = manWorkVacationInfoList.filter(member => member.area === area && member.workjo === workjo);
      // const etcWorkJoList = manWorkVacationInfoList.filter(member => member.area !== area || member.workjo !== workjo);

      // this.setState({ ...payload, manWorkVacationInfoList: ownWorkJoList.concat(etcWorkJoList) });
    });
  }

  async fetchWorkList(empNo, date) {
    const requestQuery = {
      empNo,
      // type: 'manWorkVacationInfoList',
      type: 'workjoworktime',
      searchDt: date,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manHisChief.get(queryString);
    const payload = {};
    if (response && !error) {
      const { workJoWorkTimeListInfo } = response;
      payload.list = workJoWorkTimeListInfo;
      // payload[requestQuery.type] = response[requestQuery.type];
    }
    return payload;
  }

  render() {
    const { isOpen, manWorkVacationInfoList, loaded, sddGroup } = this.state;
    const { empNo, manInfo } = this.props;
    const columns = [
      {
        label: '근무조',
        dataKey: 'workjo',
        percentWidth: 10,
      },
      {
        label: 'BAY',
        dataKey: 'bay',
        percentWidth: 10,
      },
      {
        label: '작업자',
        dataKey: 'worker',
        percentWidth: 20,
        cellRenderer: ({ rowData }) => `${rowData.usrnm}(${rowData.usrid})`,
      },
      {
        label: '52시간(연장근무횟수)',
        dataKey: 'work',
        percentWidth: 60,
        headerRenderer: () => (
          <ul>
            <li style={{ height: 39, lineHeight: '39px' }}>52시간(연장근무횟수)</li>
            <li style={{ height: 39, lineHeight: '39px' }}>
              <ul className="row">
                {sddGroup.map((sdd, index) => (
                  <li key={sdd} style={{ height: 39, lineHeight: '39px', flexBasis: `calc(100% / ${sddGroup.length})` }}>
                    {sddGroup.length - 1 === index ? '금주' : `${sddGroup.length - (index + 1)}주일 전`}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        ),
        cellRenderer: ({ rowData }) => (
          <ul className="row">
            {sddGroup.map(sdd => (
              <li key={sdd} style={{ height: 39, lineHeight: '39px', flexBasis: `calc(100% / ${sddGroup.length})` }}>
                <span style={{ color: rowData.time[sdd].worktime >= 52 ? '#FFAB00' : 'black' }}>{rowData.time[sdd.toString()].worktime}</span>{' '}
                {rowData.time[sdd.toString()].overtime && <span style={{ color: '#D50000' }}>{`(${rowData.time[sdd].overtime})`}</span>}
              </li>
            ))}
          </ul>
        ),
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
          width: 860,
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
              근무이력조회
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <Spin spinning={!loaded}>
                <div>
                  <div>
                    <StyledVirtualized minHeight={300} headerHeight={78}>
                      <AutoSizer>
                        {({ height, width }) => (
                          <Table
                            width={width}
                            height={height}
                            headerHeight={78}
                            rowHeight={39}
                            rowCount={manWorkVacationInfoList.length}
                            rowGetter={({ index }) => manWorkVacationInfoList[index]}
                            headerClassName="virtualized_header"
                            gridClassName="virtualized_grid"
                            rowClassName="virtualized_row"
                            noRowsRenderer={() => (
                              <div className="virtualized_noData">
                                <span>No Data</span>
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
                </div>
              </Spin>
              {isOpen && <SchedulerView empNo={empNo} manInfo={manInfo} />}
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

export default ChiefScheduleManageModal;
