import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import UserProfile from 'containers/portal/components/UserProfile';
import './app.css';
import ReactDataGridWrapper from './StyleGrid';
import * as constantsType from './constants';

class Grid extends Component {
  constructor(props) {
    super(props);

    // 사용자 목록 컬럼
    this.columns = [
      {
        key: 'GRID_DATA',
        name: '',
        resizable: true,
        width: 329,
      },
    ];

    this.state = {
      selectedIndexes: [],
      selectedUsers: [],
    };
  }

  componentDidUpdate() {
    if (this.grid && this.grid.base.viewport) {
      if (this.grid.base.isAdded === undefined) {
        this.grid.base.onScroll = () => {
          try {
            const {
              loadingGridData,
              loadingCountTree,
              loadingCountSearch,
              emptyRowsView,
              keywordSearched,
              loadingGridDataFunctions,
              selected,
              compCdSearched,
              setScrollTop,
              tabType,
              isProfile,
              selectedIndex,
              selectedId,
              gridType,

              siteId,
              siteIdParam,
              selectedGrpDept,
            } = this.props;

            const scrollTop = Math.floor(this.grid.base.viewport.canvas.getScroll().scrollTop);
            const startLoadingValue = this.grid.base.viewport.canvas.canvas.scrollHeight - this.grid.base.viewport.canvas.canvas.offsetHeight;
            // rowNum을 구할 때 필요한 40은 Grid의 Row의 높이값임
            const rowNum = Math.floor(this.grid.base.viewport.canvas.canvas.scrollHeight / 40);
            const EmptyRowsView = emptyRowsView;
            const type = new EmptyRowsView().getType();

            if (type === constantsType.TREE) {
              // loadingCount * 10 에서 10은 한번에 Grid에서 보여줄 Row의 개수
              // 핸들러의 paramForPaging에 선언되어있음
              if (scrollTop === startLoadingValue && loadingCountTree * 20 === rowNum) {
                if (!isProfile) {
                  this.grid.selectAllCheckbox.disabled = 'disabled';
                  if (this.grid.selectAllCheckbox.disabled) {
                    this.grid.selectAllCheckbox.nextSibling.style.background = '#EDEDED';
                  }
                }

                // 가상그룹의 경우 loadingGridData에 grpId, siteId를 보내줘야함
                if (gridType === 'grp') {
                  if (siteIdParam) {
                    loadingGridData(selectedIndex === '' ? selectedId : selectedIndex, siteIdParam, loadingCountTree + 1);
                  } else if (siteId) {
                    loadingGridData(selectedIndex === '' ? selectedId : selectedIndex, siteId, loadingCountTree + 1);
                  } else if (selectedGrpDept) {
                    // 세션, props로 SITE_ID를 받지 못했을 경우 selectedGrpDept를 SITE_ID로 이용하는데,
                    // 트리위의 selectbox를 한번도 선택하지 않은 경우는 selectedGrpDept값도 undefined이므로
                    // default SITE_ID인 1을 넣어준다.
                    loadingGridData(selectedIndex === '' ? selectedId : selectedIndex, selectedGrpDept, loadingCountTree + 1);
                  } else {
                    loadingGridData(selectedIndex === '' ? selectedId : selectedIndex, 1, loadingCountTree + 1);
                  }
                } else {
                  loadingGridData(selectedIndex === '' ? selectedId : selectedIndex, loadingCountTree + 1);
                }
                loadingGridDataFunctions.updateLoadingCount(selected, type);
              }
            } else if (scrollTop === startLoadingValue && loadingCountSearch * 20 === rowNum) {
              if (!isProfile) {
                this.grid.selectAllCheckbox.disabled = 'disabled';
                if (this.grid.selectAllCheckbox.disabled) {
                  this.grid.selectAllCheckbox.nextSibling.style.background = '#EDEDED';
                }
              }

              loadingGridDataFunctions.loadingOrganizationUser(keywordSearched, loadingCountSearch + 1, compCdSearched, tabType[selected]);
              loadingGridDataFunctions.updateLoadingCount(selected, type);
            }
            setScrollTop(scrollTop, selected);
          } catch (error) {
            console.log(error, 'error');
          }
        };
        this.grid.base.isAdded = true;
        this.forceUpdate();
      }
    }
  }

  getSnapshotBeforeUpdate(prevProps) {
    const { users } = this.props;
    // 추가 데이터 로딩 중일때 막아 두었던 전체 체크 박스를 다시 활성화 시켜주는 작업
    if (prevProps.users !== users && this.grid && this.grid.selectAllCheckbox && this.grid.selectAllCheckbox.nextSibling) {
      this.grid.selectAllCheckbox.removeAttribute('disabled');
      this.grid.selectAllCheckbox.nextSibling.removeAttribute('style');
      return null;
    }
    return null;
  }

  render() {
    let { users } = this.props;

    const { scrollTop, setScrollTop, selected } = this.props;

    const {
      organizationSearchResult,
      checkboxInitialize,
      loadingGridDataFunctions,
      scrollTopFlag,
      emptyRowsView,
      handleInitializeCheckbox,
      isProfile,
      gridType,
      isTab,
      // isProfile = true 일 때, 그리드의 구성원 클릭시 불릴 콜백
      loadProfileData,
      loadSelectedUser,
      // isProfile = false 일 때, 그리드의 구성원 체크박스 클릭시 불릴 콜백
      loadSelected,
    } = this.props;

    const { selectedIndexes, selectedUsers } = this.state;

    if (!isProfile && checkboxInitialize && this.grid && this.grid.selectAllCheckbox) {
      // 전체 체크박스 초기화
      this.grid.selectAllCheckbox.checked = false;

      // 구성원별 체크박스 초기화
      this.setState({
        selectedIndexes: [],
        selectedUsers: [],
      });
      handleInitializeCheckbox();
    }

    if (organizationSearchResult && organizationSearchResult.length !== 0) {
      users = organizationSearchResult;
    }

    if (this.grid && this.grid.base.viewport) {
      this.grid.base.viewport.canvas.canvas.scrollTop = scrollTop;
    }

    if (scrollTopFlag && this.grid && this.grid.base.viewport) {
      setScrollTop(0, selected);
      loadingGridDataFunctions.backScrollTopFlag(gridType);
    }

    const rowGetter = i => {
      if (users[i] !== undefined) {
        const content = {
          GRID_DATA: [<UserProfile userProfile={users[i]} key={users[i].EMP_NO} />],
          users: users[i],
        };
        return content;
      }
      return {};
    };

    const getColumns = () => {
      const clonedColumns = this.columns.slice();

      return clonedColumns;
    };

    // ****************** 조직도 선택목록 연동 ******************
    const onRowsSelected = rows => {
      this.setState({
        selectedIndexes: selectedIndexes.concat(rows.map(r => r.rowIdx)),
      });
      for (let i = 0; i < rows.length; i += 1) {
        selectedUsers.push(rows[i].row.users);
      }
      loadSelected(selectedUsers);
    };

    const onRowsDeselected = rows => {
      const rowIndexes = rows.map(r => r.rowIdx);
      const empNoArr = rows.map(r => r.row.users.EMP_NO);
      this.setState({
        selectedIndexes: selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1),
      });
      for (let i = 0; i < rows.length; i += 1) {
        const idx = selectedUsers.findIndex(s => s.EMP_NO === empNoArr[i]);
        selectedUsers.splice(idx, 1);
      }
      loadSelected(selectedUsers);
    };
    // ****************** 조직도 선택목록 연동 끝 ******************

    // ****************** 조직도 프로필 연동 ******************
    const onRowClick = rows => {
      loadProfileData(users[rows].USER_ID);
      loadSelectedUser(users[rows]);
    };
    // ****************** 조직도 프로필 연동 끝 ******************

    return (
      <ReactDataGridWrapper gridHeight={isTab ? 393 : 436}>
        <ReactDataGrid
          ref={node => {
            this.grid = node;
          }}
          rowKey="EMP_NO"
          columns={getColumns()}
          rowGetter={rowGetter}
          rowsCount={users.length}
          onRowClick={isProfile ? onRowClick : false}
          enableRowSelect={!isProfile}
          enableCellSelect
          rowSelection={{
            showCheckbox: !isProfile,
            enableShiftSelect: true,
            onRowsSelected: isProfile ? false : onRowsSelected,
            onRowsDeselected: isProfile ? false : onRowsDeselected,
            selectBy: {
              indexes: selectedIndexes,
            },
          }}
          emptyRowsView={emptyRowsView}
          rowHeight={40}
        />
      </ReactDataGridWrapper>
    );
  }
}

Grid.propTypes = {
  users: PropTypes.array.isRequired, // 그리드에 표시될 데이터
  emptyRowsView: PropTypes.func.isRequired, // 그리드 데이터 없을 경우 표시해줄 컴포넌트
  loadingGridData: PropTypes.func.isRequired, // 무한 스크롤 시 추가적으로 그리드 데이터를 불러오는 함수
  // 무한 스크롤 시 추가적으로 그리드 데이터를 가져오기 위해 전달될 ID(DEPT, PSTN, DUTY, GRP)
  selectedId: PropTypes.string.isRequired,
  loadingCountTree: PropTypes.number.isRequired, // 무한 스크롤 횟수 카운터 (트리에서 노드 선택 시 나오는 그리드 데이터 기준)
  loadingCountSearch: PropTypes.number.isRequired, // 무한 스크롤 횟수 카운터 (검색 시 나오는 그리드 데이터 기준)
  scrollTopFlag: PropTypes.bool.isRequired, // 그리드의 스크롤을 최상단으로 올려줄지 말지를 결정하는 플래그
  loadingGridDataFunctions: PropTypes.object.isRequired, // 무한 스크롤 시 필요한 함수들을 모은 객체
  setScrollTop: PropTypes.func.isRequired, // 그리드의 스크롤 높이 조절 함수
  scrollTop: PropTypes.number.isRequired, // 그리드의 현재 스크롤 높이
  isProfile: PropTypes.bool, // 조직도 우측이 선택목록인지 프로필인지에 대한 플래그

  checkboxInitialize: PropTypes.bool, // 체크박스 초기화 플래그
  handleInitializeCheckbox: PropTypes.func, // 체크박스 초기화 함수
  selected: PropTypes.number, // 현재 선택된 탭
  tabType: PropTypes.object, // 현재 선택된 탭 이름
  loadSelected: PropTypes.func, // 그리드의 구성원 클릭 시 선택 목록에 들어갈 데이터에 추가해주는 함수
  keywordSearched: PropTypes.string, // 검색된 검색어
  compCdSearched: PropTypes.number, // 구성원 검색 시 사용된 회사 코드
  organizationSearchResult: PropTypes.array, // 검색 결과 데이터
  gridType: PropTypes.string, // dept, pstn, duty, grp
  isTab: PropTypes.bool.isRequired,
  selectedIndex: PropTypes.string.isRequired,
  loadProfileData: PropTypes.func.isRequired,
  loadSelectedUser: PropTypes.func.isRequired,

  siteId: PropTypes.number.isRequired,
  siteIdParam: PropTypes.number.isRequired,
  // 가상그룹 무한 스크롤을 위해 필요한 값(SITE_ID)
  selectedGrpDept: PropTypes.number.isRequired,
};

Grid.defaultProps = {
  checkboxInitialize: false,
  handleInitializeCheckbox: undefined,
  selected: 1,
  tabType: 'user',
  isProfile: true,
  loadSelected: undefined,
  keywordSearched: '',
  compCdSearched: 0,
  organizationSearchResult: undefined,
  gridType: '',
};

export default Grid;
