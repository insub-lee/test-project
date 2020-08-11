import React, { Component } from 'react';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { Icon, Spin, Modal, message, Popconfirm } from 'antd';

import UserSelect from 'components/UserSelect';
import StyledVirtualized from 'apps/wts/components/CommonStyledElement/StyledVirtualized';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import Checkbox from 'apps/wts/components/CheckboxGroup/Checkbox';
import { getVirtualizedMinHeight, jsonToQueryString } from 'utils/helpers';

import Wrapper from './Wrapper';
import JemAreaBaySelect from './JemAreaBaySelect';

const AntdModal = StyledAntdModal(Modal);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      list: [],
      isShowUser: false,
      isShowModal: false,
      categoryMapList: [],
      checkedList: [],
    };

    this.onInitTreeDataBind = this.onInitTreeDataBind.bind(this);
    this.handleCheckAll = this.handleCheckAll.bind(this);
  }

  componentDidMount() {
    const { sagaKey, submitHandlerBySaga } = this.props;
    submitHandlerBySaga(sagaKey, 'GET', '/api/wts/v1/common/jemMember', {}, this.onInitDataBind);
  }

  onInitDataBind = (id, response) => {
    const { list } = response;
    this.setState({ list, isLoading: false }, () => {
      const { sagaKey, submitHandlerBySaga } = this.props;
      const requestQuery = {
        MAP_ID: 85,
      };
      const queryString = jsonToQueryString(requestQuery);
      submitHandlerBySaga(sagaKey, 'GET', `/api/admin/v1/common/categoryMap?${queryString}`, {}, this.onInitTreeDataBind);
    });
  };

  onInitTreeDataBind(id, response) {
    if (response) {
      const { categoryMapList } = response;
      this.setState({ categoryMapList });
    }
  }

  onClickUserSelect = () => {
    this.setState({ isShowUser: true });
  };

  onCancelUserSelect = () => this.setState({ isShowUser: false });

  onUserSelectedComplete = selectedUserList => {
    console.debug(selectedUserList);
    // [73158, 73084]
    this.setState(
      prevState => {
        const { list } = prevState;
        const tempList = [...list];
        selectedUserList.forEach(node => {
          if (tempList.findIndex(iNode => iNode.USER_ID === node.USER_ID) === -1) {
            tempList.push({
              USER_ID: node.USER_ID,
              EMP_NO: node.EMP_NO,
              AREA: '',
              BAY: '',
              USER_NAME: node.NAME_KOR,
              DEPT_NAME: node.DEPT_NAME_KOR,
              isNew: true,
            });
          }
        });
        return { list: tempList };
      },
      () => this.onCancelUserSelect(),
    );
  };

  onCancelModal = () => this.setState({ isShowModal: false });

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
      const targetIndex = checkedList.findIndex(iNode => iNode.USER_ID === rowData.USER_ID);
      if (targetIndex > -1) {
        checkedList.splice(targetIndex, 1);
        return { checkedList };
      }
      checkedList.push(rowData);
      return { checkedList };
    });
  };

  onClickSetAreaBay = () => {
    const { checkedList } = this.state;
    if (checkedList.length > 0) {
      this.setState({ isShowModal: true });
    } else {
      message.warning('대상자가 선택되지 않았습니다.');
    }
  };

  saveJemMemberData = (area, bay) => {
    const { checkedList } = this.state;
    const { sagaKey, submitHandlerBySaga } = this.props;
    submitHandlerBySaga(sagaKey, 'POST', '/api/wts/v1/common/jemMember', { PARAM: { userList: checkedList, area, bay } }, this.onResult);
  };

  onResult = (id, response) => {
    const { list } = response;
    this.setState(
      prevState => {
        const { list: prevList } = prevState;
        const tempList = [...prevList];
        const resultList = tempList.map(node => {
          const nodeIdx = list.findIndex(iNode => iNode.USER_ID === node.USER_ID);
          if (nodeIdx > -1) {
            const tempNode = { ...list[nodeIdx] };
            return tempNode;
          }
          return node;
        });
        return { list: resultList, checkedList: [] };
      },
      () => this.onCancelModal(),
    );
  };

  onClickRemove = () => {
    const { checkedList } = this.state;
    const { sagaKey, submitHandlerBySaga } = this.props;
    submitHandlerBySaga(sagaKey, 'POST', '/api/wts/v1/common/removeJemMember', { PARAM: { userList: checkedList } }, this.onRemoveResult);
  };

  onRemoveResult = (id, response) => {
    const { list, PARAM } = response;
    const { userList } = PARAM;

    this.setState(
      prevState => {
        const { list: prevList } = prevState;
        const tempList = [...prevList];
        const resultList = [];
        tempList.forEach(node => {
          const nodeIdx = list.findIndex(iNode => iNode.USER_ID === node.USER_ID);
          if (nodeIdx > -1) {
            const tempNode = { ...list[nodeIdx] };
            resultList.push(tempNode);
          } else if (nodeIdx === -1 && !node.AREA) {
            const removeIdx = userList.findIndex(iNode => iNode.USER_ID === node.USER_ID);
            if (removeIdx === -1) resultList.push(node);
          }
        });
        return { list: resultList, checkedList: [] };
      },
      () => this.onCancelModal(),
    );
  };

  render() {
    const { isLoading, isShowUser, list, categoryMapList, checkedList, isShowModal } = this.state;
    const workColumns = [
      {
        label: '',
        dataKey: 'USER_ID',
        percentWidth: 10,
        headerRenderer: () => (
          <Checkbox id="allCheck" checked={list.length > 0 && list.length === checkedList.length} onChange={this.handleCheckAll} noPadding />
        ),
        cellRenderer: ({ cellData, rowData }) => (
          <Checkbox
            id={cellData}
            checked={checkedList.findIndex(item => item.USER_ID === cellData) > -1}
            onChange={() => this.handleCheckSingle(rowData)}
            noPadding
          />
        ),
      },
      {
        label: '부서',
        dataKey: 'DEPT_NAME',
        percentWidth: 25,
      },
      {
        label: 'Area',
        dataKey: 'AREA',
        percentWidth: 15,
      },
      {
        label: 'Bay',
        dataKey: 'BAY',
        percentWidth: 15,
      },
      {
        label: '성명',
        dataKey: 'USER_NAME',
        percentWidth: 20,
      },
      {
        label: '사번',
        dataKey: 'EMP_NO',
        percentWidth: 15,
      },
    ];
    return (
      <Wrapper>
        <div className="btn_wrap">
          <StyledButton className="btn-gray btn-sm mr5" onClick={this.onClickSetAreaBay}>
            Area/Bay 지정
          </StyledButton>
          <Popconfirm title="삭제하시겠습니까?" onConfirm={this.onClickRemove} okText="Yes" cancelText="No">
            <StyledButton className="btn-gray btn-sm mr5">삭제</StyledButton>
          </Popconfirm>
          <StyledButton className="btn-gray btn-sm" onClick={this.onClickUserSelect}>
            대상자 등록
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
          <UserSelect onUserSelectedComplete={this.onUserSelectedComplete} onCancel={this.onCancelUserSelect} notSearchDeptIds={[73158, 73084]} />
        </AntdModal>
        <AntdModal
          className="modalWrapper modalTechDoc modalCustom"
          title="Area / Bay 지정"
          width={1000}
          destroyOnClose
          visible={isShowModal}
          onCancel={this.onCancelModal}
          footer={[]}
        >
          <JemAreaBaySelect
            categoryMapList={categoryMapList}
            checkedList={checkedList}
            onCancelModal={this.onCancelModal}
            saveJemMemberData={this.saveJemMemberData}
          />
        </AntdModal>
      </Wrapper>
    );
  }
}

export default List;
