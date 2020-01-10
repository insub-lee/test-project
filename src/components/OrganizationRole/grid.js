import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import UserProfile from 'containers/portal/components/UserProfile';

import './app.css';
import ReactDataGridWrapper from './StyleGrid';

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

  componentDidUpdate(prevProps) {
    if (this.props.gridFlag !== prevProps.gridFlag) {
      this.initializeSelectedValue();
    }
  }

  // groupData에서 목록 클릭 시 grid에 선택된 구성원 목록 초기화
  initializeSelectedValue = () => {
    this.setState({
      selectedIndexes: [],
      selectedUsers: [],
    });
  };

  render() {
    const { checkboxInitialize, emptyRowsView, handleInitializeCheckbox, isTab, loadSelected, searchResultData } = this.props;

    const { selectedIndexes, selectedUsers } = this.state;

    let { groupMemberData } = this.props;

    if (checkboxInitialize && this.grid && this.grid.selectAllCheckbox) {
      // 전체 체크박스 초기화
      this.grid.selectAllCheckbox.checked = false;

      // 구성원별 체크박스 초기화
      this.setState({
        selectedIndexes: [],
        selectedUsers: [],
      });
      handleInitializeCheckbox();
    }

    // 검색 결과 데이터를 그리드에 표시해 주는 경우
    if (searchResultData.length !== 0) {
      groupMemberData = searchResultData;
    }

    const rowGetter = i => {
      if (groupMemberData.length > 0 && groupMemberData[i]) {
        const content = {
          GRID_DATA: [<UserProfile userProfile={groupMemberData[i]} key={groupMemberData[i].EMP_NO} />],
          users: groupMemberData[i],
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

    return (
      <ReactDataGridWrapper gridHeight={isTab ? 393 : 436}>
        <ReactDataGrid
          ref={node => {
            this.grid = node;
          }}
          rowKey="EMP_NO"
          columns={getColumns()}
          rowGetter={rowGetter}
          rowsCount={groupMemberData.length}
          enableCellSelect
          rowSelection={{
            showCheckbox: true,
            enableShiftSelect: true,
            onRowsSelected,
            onRowsDeselected,
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
  emptyRowsView: PropTypes.func.isRequired, // 그리드 데이터 없을 경우 표시해줄 컴포넌트

  checkboxInitialize: PropTypes.bool, // 체크박스 초기화 플래그
  handleInitializeCheckbox: PropTypes.func, // 체크박스 초기화 함수
  loadSelected: PropTypes.func, // 그리드의 구성원 클릭 시 선택 목록에 들어갈 데이터에 추가해주는 함수
  isTab: PropTypes.bool.isRequired,

  groupMemberData: PropTypes.array.isRequired,
  searchResultData: PropTypes.array.isRequired,

  gridFlag: PropTypes.bool.isRequired,
};

Grid.defaultProps = {
  checkboxInitialize: false,
  handleInitializeCheckbox: undefined,
  loadSelected: undefined,
};

export default Grid;
