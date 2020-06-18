import React, { Component } from 'react';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { Icon, Spin, Modal, message } from 'antd';

import UserSelect from 'components/UserSelect';
import StyledVirtualized from 'apps/wts/components/CommonStyledElement/StyledVirtualized';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import Checkbox from 'apps/wts/components/CheckboxGroup/Checkbox';
import { getVirtualizedMinHeight, jsonToQueryString } from 'utils/helpers';
import EtcMemberGroupManageModal from '../../Modals/EtcMemberGroupManageModal';

import Wrapper from './Wrapper';

const AntdModal = StyledAntdModal(Modal);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      list: [],
      isShowUser: false,
      isShowGroup: false,
      userInfo: {},
      treeData: [],
      checkedList: [],
      isMulti: false,
    };

    this.onInitTreeDataBind = this.onInitTreeDataBind.bind(this);
    this.handleCheckAll = this.handleCheckAll.bind(this);
  }

  componentDidMount() {
    const { sagaKey, submitHandlerBySaga } = this.props;
    submitHandlerBySaga(sagaKey, 'GET', '/api/wts/v1/common/etcMember', {}, this.onInitDataBind);
  }

  onInitDataBind = (id, response) => {
    const { list } = response;
    this.setState({ list, isLoading: false }, () => {
      const { sagaKey, submitHandlerBySaga, profile } = this.props;
      const requestQuery = {
        type: 'manBanList',
        searchSite: profile.BAREA_CD === 'GP' ? '구미' : '청주',
      };
      const queryString = jsonToQueryString(requestQuery);
      submitHandlerBySaga(sagaKey, 'GET', `/api/wts/v1/common/ManHisManaged2?${queryString}`, {}, this.onInitTreeDataBind);
    });
  };

  onInitTreeDataBind(id, response) {
    if (response) {
      const { workBanList } = response;
      const tree = [];
      workBanList
        .filter(({ workjo, bay }) => workjo !== '정상조' && workjo !== '통상' && bay !== '반장')
        .forEach(info => {
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
          // if (nextWorkJo.children.findIndex(bay => bay.id === '반장') < 0) {
          //   nextWorkJo.children.push({
          //     key: `${areaIndex}-${workJoIndex}-${nextWorkJo.children.length}`,
          //     type: 'BAY',
          //     id: '반장',
          //     title: '반장',
          //     children: [],
          //   });
          // }
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
      this.setState({ treeData: newTree });
    }
  }

  onClickUserSelect = () => {
    this.setState({ isShowUser: true });
  };

  onCancelUserSelect = () => this.setState({ isShowUser: false });

  onUserSelectedComplete = selectedUserList => {
    this.setState(
      prevState => {
        const { list } = prevState;
        const tempList = [...list];
        selectedUserList.forEach(node => {
          if (tempList.findIndex(iNode => iNode.ETC_USER_ID === node.USER_ID) === -1) {
            tempList.push({ ETC_USER_ID: node.USER_ID, EMP_NO: node.EMP_NO, AREA: '', BAY: '', USER_NAME: node.NAME_KOR, PSTN_NAME: node.PSTN_NAME_KOR });
          }
        });
        return { list: tempList };
      },
      () => this.onCancelUserSelect(),
    );
  };

  onClickGroup = userInfo => {
    this.setState({ isShowGroup: true, userInfo });
  };

  onCancelGroup = () => this.setState({ isShowGroup: false, userInfo: {}, isMulti: false });

  setWorkEtcMember = selectedData => {
    const { userInfo, checkedList, isMulti } = this.state;
    const PARAM = { ...userInfo, ...selectedData };
    const { sagaKey, submitHandlerBySaga } = this.props;
    if (isMulti) {
      submitHandlerBySaga(sagaKey, 'POST', '/api/wts/v1/common/etcMemberMulti', { PARAM: { userList: checkedList, setData: selectedData } }, this.onResult);
    } else {
      submitHandlerBySaga(sagaKey, 'POST', '/api/wts/v1/common/etcMember', { PARAM }, this.onResult);
    }
  };

  onResult = (id, response) => {
    const { list } = response;
    this.setState(
      prevState => {
        const { list: prevList } = prevState;
        const tempList = [...prevList];
        const resultList = tempList.map(node => {
          const nodeIdx = list.findIndex(iNode => iNode.ETC_USER_ID === node.ETC_USER_ID);
          if (nodeIdx > -1) {
            const tempNode = { ...list[nodeIdx] };
            return tempNode;
          }
          return node;
        });
        return { list: resultList, checkedList: [] };
      },
      () => this.onCancelGroup(),
    );
  };

  handleCheckAll() {
    this.setState(prevState => {
      const { list, checkedList } = prevState;
      if (list.length === checkedList.length) {
        return { checkedList: [] };
      }
      return { checkedList: [...list] };
    });
  }

  handleCheckSingle = rowData => {
    this.setState(prevState => {
      const { checkedList } = prevState;
      const targetIndex = checkedList.findIndex(iNode => iNode.ETC_USER_ID === rowData.ETC_USER_ID);
      if (targetIndex > -1) {
        checkedList.splice(targetIndex, 1);
        return { checkedList };
      }
      checkedList.push(rowData);
      return { checkedList };
    });
  };

  onClickGroupMulti = () => {
    const { checkedList } = this.state;
    if (checkedList.length > 0) {
      this.setState({ isShowGroup: true, isMulti: true });
    } else {
      message.warning('대상자가 선택되지 않았습니다.');
    }
  };

  render() {
    const { isLoading, isShowUser, list, isShowGroup, treeData, checkedList } = this.state;
    const workColumns = [
      {
        label: '',
        dataKey: 'ETC_USER_ID',
        percentWidth: 10,
        headerRenderer: () => (
          <Checkbox id="allCheck" checked={list.length > 0 && list.length === checkedList.length} onChange={this.handleCheckAll} noPadding />
        ),
        cellRenderer: ({ cellData, rowData }) => (
          <Checkbox
            id={cellData}
            checked={checkedList.findIndex(item => item.ETC_USER_ID === cellData) > -1}
            onChange={() => this.handleCheckSingle(rowData)}
            noPadding
          />
        ),
      },
      {
        label: 'AREA',
        dataKey: 'AREA',
        percentWidth: 15,
      },
      {
        label: 'BAY',
        dataKey: 'BAY',
        percentWidth: 15,
      },
      {
        label: '사번',
        dataKey: 'EMP_NO',
        percentWidth: 15,
      },
      {
        label: '성명',
        dataKey: 'USER_NAME',
        percentWidth: 20,
      },
      {
        label: '직책',
        dataKey: 'PSTN_NAME',
        percentWidth: 15,
      },
      {
        label: 'BAY 지정',
        dataKey: 'ETC_USER_ID',
        percentWidth: 10,
        cellRenderer: ({ rowData }) => (
          <button
            type="button"
            onClick={() => this.onClickGroup(rowData)}
            style={{ border: '1px solid #eaecee', borderRadius: 5, width: 50, height: 30, lineHeight: '30px' }}
          >
            설정
          </button>
        ),
      },
    ];
    return (
      <Wrapper>
        <div className="btn_wrap">
          <StyledButton className="btn-gray btn-sm mr5" onClick={this.onClickGroupMulti}>
            일괄설정
          </StyledButton>
          <StyledButton className="btn-gray btn-sm" onClick={this.onClickUserSelect}>
            인원 추가
          </StyledButton>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
            <StyledVirtualized minHeight={getVirtualizedMinHeight(39, 39, list.length, 500)} headerHeight={39} style={{ minWidth: 1000 }}>
              <AutoSizer>
                {({ height, width }) => (
                  <Table
                    width={width}
                    height={height}
                    headerHeight={39}
                    rowHeight={39}
                    rowCount={list.length}
                    rowGetter={({ index }) => list[index]}
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
        <AntdModal
          className="modalWrapper modalTechDoc modalCustom"
          title="사용자 선택"
          width={1000}
          destroyOnClose
          visible={isShowUser}
          onCancel={this.onCancelUserSelect}
          footer={[]}
        >
          <UserSelect
            // initUserList={userList}
            // treeDataSource={distDeptList}
            // userDataList={result.userList && result.userList.list}
            // onTreeSelect={this.onTreeSelect}
            // onUserSelectHandler={this.onUserSelect}
            onUserSelectedComplete={this.onUserSelectedComplete}
            onCancel={this.onCancelUserSelect}
          />
        </AntdModal>
        <AntdModal
          className="modalWrapper modalTechDoc modalCustom"
          title="AREA/BAY 선택"
          // width={1000}
          destroyOnClose
          visible={isShowGroup}
          onCancel={this.onCancelGroup}
          footer={[]}
        >
          <EtcMemberGroupManageModal tree={treeData} setWorkEtcMember={this.setWorkEtcMember} />
        </AntdModal>
      </Wrapper>
    );
  }
}

export default List;
