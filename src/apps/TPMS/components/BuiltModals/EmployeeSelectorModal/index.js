/* eslint-disable camelcase */
import React from 'react';
import Modal from 'rc-dialog';
import TreeView from 'react-treeview';
import Table from 'react-virtualized/dist/es/Table/Table';
import Column from 'react-virtualized/dist/es/Table/Column';
import 'react-treeview/react-treeview.css';
import 'react-virtualized/styles.css';
import ReactTooltip from 'react-tooltip';
import { AutoSizer } from 'react-virtualized';

import { getTreeFromFlatData } from 'react-sortable-tree';
import jsonToQueryString from '../../../utils/jsonToQueryString';
import Button from '../../Button';
import StyledContent from './StyledContent';
import service from './service';
import Wrapper from './StyledEmployeeSearcher';
import alertMessage from '../../Notification/Alert';
import StyledVirtualized from '../../CommonStyledElement/StyledVirtualized';

// Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,.7)';

const treeRenderer = (tree, action) =>
  tree.map(({ title: dpnm, value: dpcd, lvl, children }) => {
    if (children?.length > 0) {
      // const label = <span className="node">{dpnm}</span>;
      const label =
        dpcd === '%' || lvl === 1 ? (
          <>
            <p className="node node_title" title={dpnm} data-tip data-for={`${dpnm}|${dpcd}`}>
              {dpnm}
            </p>
            <ReactTooltip id={`${dpnm}|${dpcd}`} type="dark">
              <span>{dpnm}</span>
            </ReactTooltip>
          </>
        ) : (
          <>
            <button key={`${dpnm}|${dpcd}`} type="button" onClick={() => action.fetchUsers(dpcd)} className="node" data-tip data-for={`${dpnm}|${dpcd}`}>
              <p className="node_title" title={dpnm}>
                {dpnm}
              </p>
              <ReactTooltip id={`${dpnm}|${dpcd}`} type="dark">
                <span>{dpnm}</span>
              </ReactTooltip>
            </button>
          </>
        );
      return (
        <TreeView key={`${dpnm}|${dpcd}`} nodeLabel={label} defaultCollapsed>
          {treeRenderer(children, action)}
        </TreeView>
      );
    }
    return (
      <button
        key={`${dpnm}|${dpcd}`}
        className="no_children_target"
        type="button"
        onClick={() => action.fetchUsers(dpcd)}
        style={{ display: 'block' }}
        data-tip
        data-for={`${dpnm}|${dpcd}`}
      >
        <div className="no_children_arrow" />
        <p className="node_title" title={dpnm}>
          {dpnm}
        </p>
        <ReactTooltip id={`${dpnm}|${dpcd}`} type="dark">
          <span>{dpnm}</span>
        </ReactTooltip>
      </button>
    );
  });

class EmployeeSelectorModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      values: [],
      tree: [],
      userList: [],
      selectedList: [],
      callback: () => false,
      type: 'SINGLE',
      isLoading: true,
      type2: '',
      name: '',
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchDeptTree = this.fetchDeptTree.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.addList = this.addList.bind(this);
    this.handleUsers = this.handleUsers.bind(this);
    this.handleSearchName = this.handleSearchName.bind(this);
    this.handleClickSearchName = this.handleClickSearchName.bind(this);

    this.searchNameRef = React.createRef();
  }

  handleOpen(index, values, callback, type, type2) {
    this.fetchDeptTree().then(() => {
      this.setState(
        {
          index,
          isOpen: true,
          selectedList: values,
          callback,
          type,
          type2: type2 || '',
        },
        () => {
          this.handleUsers(this.props.initdpcd);
          // if (this.props.initdpcd && this.props.initdpcd.length > 0) this.handleUsers(this.props.initdpcd);
        },
      );
    });
  }

  handleClose() {
    this.setState({ isOpen: false, userList: [], selectedList: [], type: 'SINGLE', callback: () => false });
    // Todo - Need Common Api handler
  }

  handleSubmit() {
    this.setState(prevState => {
      const { callback, selectedList, index, type2 } = prevState;
      callback(index, selectedList, type2);
      return { isOpen: false, userList: [], selectedList: [], type: 'SINGLE', callback: () => false };
    });
  }

  handleSearchName(e) {
    if (e.key === 'Enter') {
      this.handleClickSearchName();
    }
  }

  handleClickSearchName() {
    const { value } = this.searchNameRef.current;
    if (value.length > 1) {
      this.setState({ isLoading: true, userList: [] }, () => {
        this.fetchNames(value).then(({ userList, error }) => {
          if (!error) {
            this.setState({ userList, isLoading: false });
          }
        });
      });
    } else {
      alert('2자리 이상 입력해주십시오.');
    }
  }

  async fetchNames(name) {
    const requestQuery = {
      name,
    };
    const queryString = jsonToQueryString(requestQuery);
    const url = `/api/tpms/v1/common/searchInfo?type=userList`;
    const getUrl = `${url}&${queryString}`;
    const { response, error } = await service.users.get(getUrl);
    const payload = {};
    if (response && !error) {
      const { list } = response;
      payload.userList = list;
    } else {
      alertMessage.alert('Server Error');
      payload.userList = [];
      payload.error = true;
    }
    return payload;
  }

  async fetchDeptTree() {
    // const { response, error } = await service.deptTree.get();
    const { response: res, error: err } = await service.deptTree.getV2();

    if (res && !err) {
      const { list } = res;

      const tree = getTreeFromFlatData({
        flatData: list.map(item => ({
          title: item.NAME_KOR,
          value: `${item.DEPT_ID}`,
          key: `${item.DEPT_ID}`,
          parentValue: `${item.PRNT_ID}`,
          ...item,
        })),
        getKey: node => node.key,
        getParentKey: node => node.parentValue,
        rootKey: '-1',
      });
      this.setState({ tree });
    } else {
      console.debug('# error', err);
      alertMessage.alert('Server Error');
    }

    // if (response && !error) {
    //   const root = {
    //     isFolrder: true,
    //     title: 'Magnachip',
    //     dpnm: 'Magnachip',
    //     dpnm_en: 'Magnachip',
    //     isRoot: true,
    //     dpcd: '%',
    //   };

    //   root.children = response || [];
    //   const tree = [root];
    //   this.setState({ tree });
    // } else {
    //   console.debug('# error', error);
    //   alertMessage.alert('Server Error');
    // }
  }

  handleUsers(dpcd) {
    this.setState({ isLoading: true, userList: [] }, () => {
      this.fetchUsers(dpcd).then(({ userList, error }) => {
        if (!error) {
          this.setState({ userList, isLoading: false });
        }
      });
    });
  }

  async fetchUsers(deptId) {
    // const url = `/apigate/v1/portal/accountList?coid=00&dpcd=0410&page=-1`;
    const url = `/api/tpms/v1/common/searchInfo?type=deptUserList&deptId=${deptId}`;

    const { response, error } = await service.users.get(url);
    const payload = {};
    if (response && !error) {
      const { list } = response;
      payload.userList = list || [];
    } else {
      alertMessage.alert('Server Error');
      payload.userList = [];
      payload.error = true;
    }
    return payload;
  }

  rowRenderer({ key, index, style }) {
    const { userList } = this.state;
    const userInfo = userList[index];
    return (
      <div key={key} style={style}>
        {`${userInfo.EMP_NO} ${userInfo.NAME_KOR} ${userInfo.PSTN_NAME_KOR}`}
      </div>
    );
  }

  addList(rowData) {
    const { type } = this.state;
    const { EMP_NO, NAME_KOR, psnm, PSTN_NAME_KOR, USER_ID, DEPT_ID, DEPT_NAME_KOR, EMAIL } = rowData;

    if (this.state.selectedList.findIndex(user => user.EMP_NO === EMP_NO) < 0) {
      this.setState(prevState => {
        switch (type) {
          case 'SINGLE': {
            return {
              selectedList: [{ EMP_NO, NAME_KOR, psnm, PSTN_NAME_KOR, USER_ID, DEPT_ID, DEPT_NAME_KOR, EMAIL }],
            };
          }
          default: {
            prevState.selectedList.push({ EMP_NO, NAME_KOR, psnm, PSTN_NAME_KOR, USER_ID, DEPT_ID, DEPT_NAME_KOR, EMAIL });
            return {
              selectedList: prevState.selectedList,
            };
          }
        }
      });
    }
  }

  removeUser(index) {
    this.setState(prevState => {
      const { selectedList } = prevState;
      selectedList.splice(index, 1);
      return { selectedList };
    });
  }

  render() {
    const { isOpen, tree, userList, selectedList, isLoading } = this.state;
    const action = {
      fetchUsers: dpcd => this.handleUsers(dpcd),
    };
    const columns = [
      {
        label: '사번',
        dataKey: 'EMP_NO',
        percentWidth: 26,
      },
      {
        label: '이름',
        dataKey: 'NAME_KOR',
        percentWidth: 20,
      },
      {
        label: '부서',
        dataKey: 'DEPT_NAME_KOR',
        percentWidth: 28,
      },
      // {
      //   label: '직책',
      //   dataKey: 'psnm',
      //   percentWidth: 17,
      // },
      {
        label: '직위',
        dataKey: 'PSTN_NAME_KOR',
        percentWidth: 26,
      },
    ];
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleClose}
        style={{
          width: 1000,
        }}
        bodyStyle={{
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <div id="modal-content" ref={this.contentRef}>
          <StyledContent>
            <div>
              <div className="pop_tit">
                대상 선택하기
                <button type="button" className="icon icon_pclose" onClick={this.handleClose} />
              </div>
              <div className="pop_con">
                <div style={{ textAlign: 'right' }}>
                  <input
                    ref={this.searchNameRef}
                    type="text"
                    className="input"
                    onKeyDown={this.handleSearchName}
                    style={{ display: 'inline-block', width: 200, height: 35 }}
                    placeholder="이름으로 검색 (2자 이상 검색)"
                  />
                  <button
                    type="button"
                    value="검색"
                    onClick={this.handleClickSearchName}
                    style={{ width: 30, height: 35, border: '1px solid #d9e0e7', verticalAlign: 'middle' }}
                  >
                    <i className="fas fa-search" />
                  </button>
                </div>
                <Wrapper>
                  <div className="child dept_tree">
                    <div>{treeRenderer(tree, action)}</div>
                  </div>
                  <div className="child selector_view">
                    <div className="selectable_table">
                      <StyledVirtualized minHeight={399} headerHeight={20}>
                        <AutoSizer>
                          {({ height, width }) => (
                            <Table
                              width={width}
                              height={height}
                              headerHeight={20}
                              rowHeight={30}
                              rowCount={userList?.length}
                              rowGetter={({ index }) => userList[index]}
                              // rowRenderer={this.rowRenderer}
                              onRowClick={({ rowData }) => this.addList(rowData)}
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
                    <div className="selected_list">
                      <div className="column">
                        <span>선택된 인원</span>
                      </div>
                      <ul>
                        {selectedList.map(({ EMP_NO, NAME_KOR, PSTN_NAME_KOR }, index) => (
                          <li className="user_tag" key={EMP_NO}>
                            <span>{`${EMP_NO} ${NAME_KOR} ${PSTN_NAME_KOR}`}</span>
                            <button type="button" className="close" onClick={() => this.removeUser(index)}>
                              <i className="fas fa-times" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="btn_wrap" style={{ width: '100%', paddingBottom: 20, textAlign: 'center' }}>
                    <Button type="button" color="primary" onClick={this.handleSubmit} size="small">
                      선택하기
                    </Button>
                  </div>
                </Wrapper>
              </div>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

export default EmployeeSelectorModal;
