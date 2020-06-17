import React from 'react';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { debounce } from 'lodash';
import StyledVirtualized from 'apps/wts/components/CommonStyledElement/StyledVirtualized';
import { getVirtualizedMinHeight, jsonToQueryString } from 'utils/helpers';
import Checkbox from 'apps/wts/components/CheckboxGroup/Checkbox';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import { Icon, Spin } from 'antd';
import service from '../../service';
import { admin } from '../config';
import Wrapper from './Wrapper';
import WorkJoSelectorModal from '../../Modals/WorkJoSelectorModal';
import AdminWorkerGroupManageModal from '../../Modals/AdminWorkerGroupManageModal';
import StyledStandard from '../../../StyledStandard';

const reorderData = (data, emrno) => {
  if (admin[emrno]) {
    const prefixData = data.filter(row => admin[emrno].area.some(str => row.area.includes(str)));
    const etcData = data.filter(row => !admin[emrno].area.some(str => row.area.includes(str)));
    return prefixData.concat(etcData);
  }
  return data;
};

class MainBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canUseThisPage: true,
      newManList: [],
      manJoList: [],
      checkedList: [],
      isLoading: true,
      manBanList: [],
      tree: [],
      filterWord: '',
      currentArea: '',
      currentJo: '',
      areas: {},
      manBanArea: {},
      currentManBanArea: '',
      currentManBanJo: '',
    };
    this.initNewWorkerList = this.initNewWorkerList.bind(this);
    this.initWorkerList = this.initWorkerList.bind(this);
    this.handleCheckAll = this.handleCheckAll.bind(this);
    this.handleCheckSingle = this.handleCheckSingle.bind(this);
    this.openWorkJoSelectorModal = this.openWorkJoSelectorModal.bind(this);
    this.refreshNewWorkersData = this.refreshNewWorkersData.bind(this);
    this.refreshWorkersData = this.refreshWorkersData.bind(this);
    this.handleFilter = debounce(this.handleFilter.bind(this), 500);
    this.openWorkJoSelector = this.openWorkJoSelector.bind(this);
    this.fetchNewWorkerList = this.fetchNewWorkerList.bind(this);
    this.fetchWorkerList = this.fetchWorkerList.bind(this);
    this.initAreas = this.initAreas.bind(this);
    this.handleChangeAreas = this.handleChangeAreas.bind(this);
    this.handleChangeWorkjo = this.handleChangeWorkjo.bind(this);
    this.handleChangeManBanArea = this.handleChangeManBanArea.bind(this);
    this.handleChangeManBanWorkjo = this.handleChangeManBanWorkjo.bind(this);

    this.workJoSelectorModalRef = React.createRef();
    this.adminWorkerGroupManageModalRef = React.createRef();
  }

  componentDidMount() {
    this.initNewWorkerList();
    this.initWorkerList();
    this.initAreas();
  }

  handleFilter(value) {
    this.setState({ filterWord: value });
  }

  initNewWorkerList() {
    const { profile, manInfo } = this.props;
    this.setState({ isLoading: true, newManList: [], manJoList: [] }, () => {
      this.fetchNewWorkerList(manInfo.site).then(payload => {
        this.setState({ ...payload, isLoading: false });
      });
    });
  }

  initWorkerList() {
    const { manInfo } = this.props;
    this.setState({ isLoading: true, manBanList: [] }, () => {
      this.fetchWorkerList(manInfo.site).then(payload => {
        const { manBanList: data } = payload;
        const manBanArea = {};
        data.forEach(row => {
          if (!manBanArea[row.area]) manBanArea[row.area] = [];
          if (!manBanArea[row.area].includes(row.workjo)) manBanArea[row.area].push(row.workjo);
        });
        Object.keys(manBanArea).forEach(value => {
          manBanArea[value] = manBanArea[value].sort((a, b) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
          });
        });
        const nextData = reorderData(data, Number(manInfo.empno));
        this.setState({ ...payload, manBanList: nextData, isLoading: false, manBanArea });
      });
    });
  }

  initAreas() {
    const { manInfo } = this.props;
    this.fetchAreas(manInfo.site).then(areas => {
      this.setState({ areas });
    });
  }

  handleChangeAreas(e) {
    const { value } = e.target;
    this.setState({ currentArea: value, currentJo: '' });
  }

  handleChangeManBanArea(e) {
    const { value } = e.target;
    this.setState({ currentManBanArea: value, currentManBanJo: '' });
  }

  handleChangeWorkjo(e) {
    const { value } = e.target;
    this.setState({ isLoading: true, currentJo: value, manBanList: [] }, () => {
      const { currentArea, currentJo } = this.state;
      const { manInfo } = this.props;
      this.fetchWorkerList(manInfo.site).then(payload => {
        this.setState({ ...payload, isLoading: false });
      });
    });
  }

  handleChangeManBanWorkjo(e) {
    const { value } = e.target;
    this.setState({ currentManBanJo: value });
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
      workAreas
        .filter(workArea => workArea.site === site)
        .forEach(obj => {
          if (!areas[obj.area]) {
            areas[obj.area] = [];
          }
          areas[obj.area].push(obj.workjo);
        });
      return areas;
    }
    return {};
  }

  async fetchNewWorkerList(site) {
    const requestQuery = {
      type: 'manJoList',
      searchSite: site,
    };
    const queryString = jsonToQueryString(requestQuery);
    const payload = {};
    const { response, error } = await service.manHisAdmin.get(queryString);
    if (response && !error) {
      const { newManList, manJoList } = response;
      payload.newManList = newManList;
      payload.manJoList = manJoList;
    }
    return payload;
  }

  handleCheckAll() {
    this.setState(prevState => {
      const { newManList, checkedList } = prevState;
      if (newManList.length === checkedList.length) {
        return { checkedList: [] };
      }
      return { checkedList: newManList.map(newMan => newMan.usrid) };
    });
  }

  handleCheckSingle(usrid) {
    this.setState(prevState => {
      const { checkedList } = prevState;
      const targetIndex = checkedList.findIndex(checked => checked === usrid);
      if (targetIndex > -1) {
        checkedList.splice(targetIndex, 1);
        return { checkedList };
      }
      checkedList.push(usrid);
      return { checkedList };
    });
  }

  openWorkJoSelectorModal() {
    const { checkedList, newManList } = this.state;
    this.workJoSelectorModalRef.current.handleOpenModal(newManList.filter(newMan => checkedList.includes(newMan.usrid)));
  }

  refreshNewWorkersData() {
    this.initNewWorkerList();
  }

  refreshWorkersData() {
    this.initWorkerList();
  }

  async fetchWorkerList(site) {
    const requestQuery = {
      type: 'manBanList',
      searchSite: site,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manHisAdmin.get(queryString);
    const payload = {};
    if (response && !error) {
      const { manBanList, workBanList } = response;
      payload.manBanList = manBanList;
      const tree = [];
      workBanList.forEach(info => {
        const parentIndex = tree.findIndex(obj => obj.id === info.area);
        if (parentIndex > -1) {
          const workjoList = tree[parentIndex].children;
          const workjoIndex = workjoList.findIndex(obj => obj.id === info.workjo);
          if (workjoIndex > -1) {
            const bayList = workjoList[workjoIndex].children;
            bayList.push({
              key: `${parentIndex}-${workjoIndex}-${bayList.length}`,
              type: 'BAY',
              id: info.bay,
              title: `${info.bay}`,
            });
          } else {
            workjoList.push({
              key: `${parentIndex}-${workjoList.length}`,
              type: 'WORKJO',
              id: info.workjo,
              title: info.workjo,
              children: [{ key: `${tree.length}-${workjoList.length}-0`, type: 'BAY', id: info.bay, title: `${info.bay}` }],
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
                type: 'WORKJO',
                id: info.workjo,
                title: info.workjo,
                children: [{ key: `${tree.length}-0-0`, type: 'BAY', id: info.bay, title: `${info.bay}` }],
              },
            ],
          });
        }
      });
      const newTree = tree.map((area, areaIndex) => {
        const newArea = area;
        const workJos = area.children;
        const newWorkJos = workJos.map((workJo, workJoIndex) => {
          const nextWorkJo = workJo;
          nextWorkJo.children.forEach(bay => console.debug('@@@ bay', bay));
          if (nextWorkJo.children.findIndex(bay => bay.id === '반장') < 0) {
            nextWorkJo.children.push({
              key: `${areaIndex}-${workJoIndex}-${nextWorkJo.children.length}`,
              type: 'BAY',
              id: '반장',
              title: '반장',
              children: [],
            });
          }
          if (nextWorkJo.children.findIndex(bay => bay.id === '휴직') < 0) {
            nextWorkJo.children.push({
              key: `${areaIndex}-${workJoIndex}-${nextWorkJo.children.length}`,
              type: 'BAY',
              id: '휴직',
              title: '휴직',
              children: [],
            });
          }
          if (nextWorkJo.children.findIndex(bay => bay.id === '미배정') < 0) {
            nextWorkJo.children.push({
              key: `${areaIndex}-${workJoIndex}-${nextWorkJo.children.length}`,
              type: 'BAY',
              id: '미배정',
              title: '미배정',
              children: [],
            });
          }
          return nextWorkJo;
        });
        newArea.children = newWorkJos;
        return newArea;
      });
      payload.tree = newTree;
    }
    return payload;
  }

  openWorkJoSelector(rowData) {
    const { tree } = this.state;
    const { profile } = this.props;
    this.adminWorkerGroupManageModalRef.current.handleOpenModal(profile.emrno, rowData, tree);
  }

  render() {
    const {
      newManList,
      manJoList,
      canUseThisPage,
      isLoading,
      checkedList,
      manBanList,
      filterWord,
      tree,
      currentArea,
      currentJo,
      areas,
      manBanArea,
      currentManBanArea,
      currentManBanJo,
    } = this.state;
    const columns = [
      {
        label: '',
        dataKey: 'usrid',
        percentWidth: 10,
        headerRenderer: () => (
          <Checkbox id="allCheck" checked={newManList.length === checkedList.length && newManList.length !== 0} onChange={this.handleCheckAll} noPadding />
        ),
        cellRenderer: ({ cellData }) => (
          <Checkbox
            id={cellData}
            checked={checkedList.findIndex(checked => checked === cellData) > -1}
            onChange={() => this.handleCheckSingle(cellData)}
            noPadding
          />
        ),
      },
      {
        label: '사번',
        dataKey: 'usrid',
        percentWidth: 20,
      },
      {
        label: '성명',
        dataKey: 'usrnm',
        percentWidth: 25,
      },
      {
        label: '직책',
        dataKey: 'POSITION',
        percentWidth: 25,
      },
      {
        label: '성별',
        dataKey: 'sex',
        percentWidth: 20,
      },
    ];
    const workColumns = [
      {
        label: 'AREA',
        dataKey: 'area',
        percentWidth: 10,
      },
      {
        label: 'WORKJO',
        dataKey: 'workjo',
        percentWidth: 10,
      },
      {
        label: 'BAY',
        dataKey: 'bay',
        percentWidth: 10,
      },
      {
        label: 'PART',
        dataKey: 'part',
        percentWidth: 10,
      },
      {
        label: '사번',
        dataKey: 'empno',
        percentWidth: 10,
      },
      {
        label: '성명',
        dataKey: 'usrnm',
        percentWidth: 20,
      },
      {
        label: '직책',
        dataKey: 'position',
        percentWidth: 15,
      },
      {
        label: '성별',
        dataKey: 'sex',
        percentWidth: 5,
      },
      {
        label: '근무조 지정',
        dataKey: 'empno',
        percentWidth: 10,
        cellRenderer: ({ rowData }) => (
          <button
            type="button"
            onClick={() => this.openWorkJoSelector(rowData)}
            style={{ border: '1px solid #eaecee', borderRadius: 5, width: 50, height: 30, lineHeight: '30px' }}
          >
            설정
          </button>
        ),
      },
    ];
    let currentList = currentManBanArea && currentManBanArea !== '' ? manBanList.filter(row => row.area === currentManBanArea) : manBanList;
    currentList = currentManBanJo && currentManBanJo !== '' ? currentList.filter(row => row.workjo === currentManBanJo) : currentList;
    currentList =
      filterWord.trim().length > 0 ? currentList.filter(worker => worker.usrnm.includes(filterWord) || worker.empno.includes(filterWord)) : currentList;
    return (
      <Wrapper>
        <StyledStandard>
          <div className="sub_con">
            <div className="title">
              <span>새로운 근무자</span>
            </div>
            <div className="btn_wrap" style={{ height: 36 }}>
              {checkedList.length > 0 && (
                <StyledButton type="button" className="btn-sm btn-primary" onClick={this.openWorkJoSelectorModal}>
                  근무조 지정하기
                </StyledButton>
              )}
            </div>
            <div>
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
                <StyledVirtualized minHeight={getVirtualizedMinHeight(39, 39, newManList.length, 500)} headerHeight={39}>
                  <AutoSizer>
                    {({ height, width }) => (
                      <Table
                        width={width}
                        height={height}
                        headerHeight={39}
                        rowHeight={39}
                        rowCount={newManList.length}
                        rowGetter={({ index }) => newManList[index]}
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
            <hr
              style={{
                border: '1px solid #eaecee',
                marginTop: 40,
                marginBottom: 40,
              }}
            />
            <div className="title">
              <span>전체 근무자 리스트</span>
            </div>
            {/* <div className="search_div" style={{ textAlign: 'right', position: 'relative', height: 50 }}>
          <div style={{ position: 'absolute', width: 300, left: '0', top: '-10px', textAlign: 'left' }}>
            <input
              type="text"
              className="input"
              placeholder="성명 혹은 사번으로 조회"
              style={{ textAlign: 'left' }}
              onChange={e => this.handleFilter(e.target.value)}
            />
          </div>
        </div> */}
            <ul className="search_div">
              <li>
                <select name="" id="" value={currentManBanArea} onChange={this.handleChangeManBanArea} style={{ width: 200, height: 46 }}>
                  <option value="">전체 AREA</option>
                  {Object.keys(manBanArea).map(key => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                <select name="" id="" value={currentManBanJo} style={{ width: 100, height: 46 }} onChange={this.handleChangeManBanWorkjo}>
                  <option value="">전체 조</option>
                  {manBanArea[currentManBanArea] &&
                    manBanArea[currentManBanArea].map(workjo => (
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
            <div style={{ overflowX: 'auto' }}>
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
                <StyledVirtualized minHeight={getVirtualizedMinHeight(39, 39, currentList.length, 500)} headerHeight={39} style={{ minWidth: 1000 }}>
                  <AutoSizer>
                    {({ height, width }) => (
                      <Table
                        width={width}
                        height={height}
                        headerHeight={39}
                        rowHeight={39}
                        rowCount={currentList.length}
                        rowGetter={({ index }) => currentList[index]}
                        headerClassName="virtualized_header"
                        gridClassName="virtualized_grid"
                        rowClassName="virtualized_row"
                        noRowsRenderer={() => (
                          <div className="virtualized_noData">
                            <span>{isLoading ? 'Loading...' : 'No Data'}</span>
                          </div>
                        )}
                      >
                        {workColumns.map(column => (
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
            <WorkJoSelectorModal
              ref={this.workJoSelectorModalRef}
              list={manJoList}
              title="근무조 지정하기"
              callbackHandler={() => {
                this.refreshNewWorkersData();
                this.refreshWorkersData();
              }}
            />
            <AdminWorkerGroupManageModal ref={this.adminWorkerGroupManageModalRef} tree={tree} callbackHandler={this.refreshWorkersData} />
          </div>
        </StyledStandard>
      </Wrapper>
    );
  }
}

export default MainBody;
