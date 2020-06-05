import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Spin } from 'antd';
import { AutoSizer, Column, Table } from 'react-virtualized';

import StyledVirtualized from 'apps/wts/components/CommonStyledElement/StyledVirtualized';
import Button from 'components/Button';
import { jsonToQueryString } from 'utils/helpers';

import Wrapper from './Wrapper';
import WorkerModifyCommentModal from '../../Modals/WorkerModifyCommentModal';
import ChiefScheduleManageModal from '../../Modals/ChiefScheduleManageModal';
import WorkerGroupManageModal from '../../Modals/WorkerGroupManageModal';
import service from '../../service';

class MainBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manWorkJoList: [],
      isLoading: true,
      tree: [],
    };
    this.fetchInfo = this.fetchInfo.bind(this);
    this.openSchedulerModal = this.openSchedulerModal.bind(this);
    this.openGroupManageModal = this.openGroupManageModal.bind(this);
    this.initData = this.initData.bind(this);
    this.refreshData = this.refreshData.bind(this);

    this.workerModifyCommentModal = React.createRef();
    this.chiefScheduleManageModal = React.createRef();
    this.workerGroupManageModal = React.createRef();
  }

  componentDidMount() {
    this.initData();
  }

  initData() {
    const { profile, manInfo } = this.props;
    this.setState({ manWorkJoList: [], tree: [], isLoading: true }, () => {
      this.fetchInfo(profile.emrno, manInfo.site).then(payload => {
        const { manWorkJoList = [] } = payload;
        const { area, workjo } = manInfo;

        // 담당 조를 우선으로 재정렬
        const ownWorkJoList = manWorkJoList.filter(member => member.area === area && member.workjo === workjo);
        // 비담당 조
        const etcWorkJoList = manWorkJoList.filter(member => member.area !== area || member.workjo !== workjo);

        this.setState({ ...payload, manWorkJoList: ownWorkJoList.concat(etcWorkJoList), isLoading: false });
        const tree = [];
        manWorkJoList.forEach(info => {
          const parentIndex = tree.findIndex(obj => obj.id === info.area);
          if (parentIndex > -1) {
            const bayList = tree[parentIndex].children;
            const bayIndex = bayList.findIndex(obj => obj.id === info.bay);
            if (bayIndex > -1) {
              const userList = bayList[bayIndex].children;
              userList.push({
                key: `${parentIndex}-${bayIndex}-${userList.length}`,
                type: 'USER',
                id: info.empno,
                title: `${info.usrnm}(${info.empno})`,
              });
            } else {
              bayList.push({
                key: `${parentIndex}-${bayList.length}`,
                type: 'BAY',
                id: info.bay,
                title: info.bay,
                children: [{ key: `${parentIndex}-${bayList.length}-0`, type: 'USER', id: info.empno, title: `${info.usrnm}(${info.empno})` }],
              });
            }
          } else {
            tree.push({
              key: `${tree.length}`,
              type: 'AREA',
              id: info.area,
              title: info.area,
              children: [
                {
                  key: `${tree.length}-0`,
                  type: 'BAY',
                  id: info.bay,
                  title: info.bay,
                  children: [{ key: `${tree.length}-0-0`, type: 'USER', id: info.empno, title: `${info.usrnm}(${info.empno})` }],
                },
              ],
            });
          }
        });
        const newTree = tree.map((area, index) => {
          const nextArea = area;
          if (nextArea.children.findIndex(bay => bay.id === '휴직') < 0) {
            nextArea.children.push({ key: `${index}-${nextArea.children.length}`, type: 'BAY', id: '휴직', title: '휴직', children: [] });
          }
          if (nextArea.children.findIndex(bay => bay.id === '미배정') < 0) {
            nextArea.children.push({ key: `${index}-${nextArea.children.length}`, type: 'BAY', id: '미배정', title: '미배정', children: [] });
          }
          return nextArea;
        });
        this.setState({ tree: newTree });
      });
    });
  }

  refreshData() {
    this.initData();
  }

  async fetchInfo(empNo, site) {
    const requestQuery = {
      empNo,
      type: 'manWorkJoList',
      searchSite: site,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manHisChief.get(queryString);
    const payload = {};
    if (response && !error) {
      payload[requestQuery.type] = response[requestQuery.type];
    }
    return payload;
  }

  openSchedulerModal() {
    this.chiefScheduleManageModal.current.handleOpenModal();
  }

  openGroupManageModal() {
    const { profile } = this.props;
    this.workerGroupManageModal.current.handleOpenModal(profile.emrno);
  }

  openAllWorkScheduler() {
    this.allWorkSchedulerModal.current.handleOpenModal();
  }

  render() {
    const { manWorkJoList, isLoading } = this.state;
    const { profile, canUseThisPage, manInfo } = this.props;
    const columns = [
      {
        label: 'AREA',
        dataKey: 'area',
        percentWidth: 15,
      },
      {
        label: 'BAY',
        dataKey: 'bay',
        percentWidth: 15,
      },
      {
        label: '조',
        dataKey: 'workjo',
        percentWidth: 15,
      },
      {
        label: 'PART',
        dataKey: 'part',
        percentWidth: 15,
      },
      {
        label: '작업자',
        dataKey: 'work',
        percentWidth: 40,
        headerRenderer: () => (
          <ul>
            <li style={{ height: 39, lineHeight: '39px' }}>작업자</li>
            <li style={{ height: 39, lineHeight: '39px' }}>
              <ul className="row">
                <li style={{ height: 39, lineHeight: '39px', flexBasis: 'calc(100% / 2)' }}>사번</li>
                <li style={{ height: 39, lineHeight: '39px', flexBasis: 'calc(100% / 2)' }}>이름</li>
              </ul>
            </li>
          </ul>
        ),
        cellRenderer: ({ rowData }) => (
          <ul className="row">
            <li style={{ height: 39, lineHeight: '39px', flexBasis: 'calc(100% / 2)' }}>{rowData.empno}</li>
            <li style={{ height: 39, lineHeight: '39px', flexBasis: 'calc(100% / 2)' }}>{rowData.usrnm}</li>
          </ul>
        ),
      },
    ];
    return (
      <Wrapper>
        {canUseThisPage ? (
          <>
            <div className="title">
              <span>현재 담당 근무자</span>
            </div>
            <div className="btn_wrap" style={{ position: 'relative', height: 45 }}>
              <Button type="button" size="small" color="default" onClick={this.openGroupManageModal}>
                BAY 설정
              </Button>
              <Button type="button" size="small" color="default" onClick={this.openSchedulerModal}>
                근무이력조회
              </Button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
                <StyledVirtualized minHeight={300} headerHeight={78} style={{ minWidth: 800 }}>
                  <AutoSizer>
                    {({ height, width }) => (
                      <Table
                        width={width}
                        height={height}
                        headerHeight={78}
                        rowHeight={39}
                        rowCount={manWorkJoList.length}
                        rowGetter={({ index }) => manWorkJoList[index]}
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
              </Spin>
            </div>
            <WorkerModifyCommentModal ref={this.workerModifyCommentModal} />
            <ChiefScheduleManageModal ref={this.chiefScheduleManageModal} empNo={profile.emrno} manInfo={manInfo} />
            <WorkerGroupManageModal ref={this.workerGroupManageModal} callbackHandler={this.refreshData} />
          </>
        ) : (
          <div>현재 사용자는 사용 불가능한 페이지입니다.</div>
        )}
      </Wrapper>
    );
  }
}

MainBody.propTypes = {
  canUseThisPage: PropTypes.bool,
};

MainBody.defaultProps = {
  canUseThisPage: false,
};

export default MainBody;
