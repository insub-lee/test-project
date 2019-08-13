import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import '../../components/Organization/app.css';
import ReactDataGrid from 'react-data-grid';
import UserProfile from '../../components/UserProfile';
import ReactDataGridWrapper from '../../components/Organization/StyleGrid';
import injectSaga from '../../../../utils/injectSaga';
import saga from './saga';
import injectReducer from '../../../../utils/injectReducer';
import reducer from './reducer';
import { loadProfileData, loadProfileDataSearch } from './actions';
import { makeLoadProfile } from './selectors';
import * as constantsType from './constants';

// 조직도, 사용자 목록

let selectedUsers = [];

class UserGrid extends Component {
  constructor(props) {
    super(props);

    // 사용자 목록 컬럼
    this.columns = [
      {
        key: 'GRID_DATA',
        name: '',
        resizable: true,
        width: 329,
      }
    ];

    this.state = {
      selectedIndexes: [],
      selectedUsers: [],
       // onScroll 이벤트 추가 후 true로 변경
      // 단지 componentDidUpdate를 호출 하기 위한 트리거 역할
      isAddedScrollEvent: false,
      loading: false,
    };
  }

  componentDidMount() {
    if (this.state.loading === false) {
      this.setState({
        loading: true,
      });
    }
  }

  componentDidUpdate() {
    if (this.grid && this.grid.base.viewport) {
      if (this.grid.base.isAdded === undefined) {
        this.grid.base.onScroll = () => {
          try {
            const canvas = this.grid.base.viewport.canvas;
            const {
              loadingGridData,
              selectedId,
              loadingCountTree,
              loadingCountSearch,
              emptyRowsView,
              keywordSearched,
              loadingGridDataFunctions,
              selected,
              compCdSearched,
              setScrollTop,
            } = this.props;
            const scrollTop = Math.floor(canvas.getScroll().scrollTop);
            const startLoadingValue = canvas.canvas.scrollHeight - canvas.canvas.offsetHeight;
            // rowNum을 구할 때 필요한 40은 Grid의 Row의 높이값임
            const rowNum = Math.floor(canvas.canvas.scrollHeight / 40);
            const type = new emptyRowsView().getType();


            if (type === constantsType.TREE) {
              // loadingCount * 10 에서 10은 한번에 Grid에서 보여줄 Row의 개수
              // 핸들러의 paramForPaging에 선언되어있음
              if (scrollTop === startLoadingValue && loadingCountTree * 12 === rowNum) {
                // action으로 loadingCount + 1 값을 보낸다.
                // setState로 loadingCount를 1 증가시킨다.
                loadingGridData(selectedId, loadingCountTree + 1);
                loadingGridDataFunctions.updateLoadingCount(selected, type);
              }
            } else {
              if (scrollTop === startLoadingValue && loadingCountSearch * 12 === rowNum) {
                loadingGridDataFunctions.loadingOrganizationUser(keywordSearched, loadingCountSearch + 1, compCdSearched, selected);
                loadingGridDataFunctions.updateLoadingCount(selected, type);
              }
            }

            setScrollTop(scrollTop, selected);

          } catch (error) {
            console.log(error, 'error');
            return;
          }
        }
      this.grid.base.isAdded = true;
      this.setState({
        isAddedScrollEvent: true,
      });
      }
    }
  }

  render() {

    // 사용자 목록
    let { users, emptyRowsView, scrollTopFlag, loadingGridDataFunctions, scrollTop } = this.props;

    const {
      organizationSearchResult,
    } = this.props;

    const { selectedIndexes, selectedUsers } = this.state;
	 
    if (organizationSearchResult.length !== 0) {
      users = organizationSearchResult;
    }

    if (this.grid && this.grid.base.viewport) {
      this.grid.base.viewport.canvas.canvas.scrollTop = scrollTop;
    }

    if (scrollTopFlag && this.grid && this.grid.base.viewport) {
      const canvas = this.grid.base.viewport.canvas;
      canvas.canvas.scrollTop = 0;
      loadingGridDataFunctions.backScrollTopFlag();
    }

    const rowGetter = (i) => {
      if (users[i] !== undefined) {
        const content = {
          GRID_DATA: [
            <UserProfile
              userProfile={users[i]}
              customClass='listImg'
              fontSize='12px'
              key={users[i].EMP_NO}
            />
          ],
          users: users[i],
        };
        return content;
      }
    }

    const getColumns = () => {
      const clonedColumns = this.columns.slice();

      return clonedColumns;
    };

    const onRowClick = (rows) => {
      const type = new emptyRowsView().getType();2
      console.log(type, 'type^^^^^^');

      if (type === constantsType.TREE) {
        this.props.loadProfileData(users[rows].USER_ID);
      } else {
        this.props.loadProfileDataSearch(users[rows].USER_ID);
      }
      
      this.props.loadSelectedUser(users[rows]);
    }

    return (
        <ReactDataGridWrapper>
          <ReactDataGrid
          ref={ node => this.grid = node }
          enableRowSelect='single'
          enableCellSelect={true}
          rowKey="EMP_NO"
          columns={getColumns()}
          rowGetter={rowGetter}
          rowsCount={users.length}
          emptyRowsView={emptyRowsView}
          rowHeight={40}
          onRowClick={onRowClick}
          rowSelection={{
            showCheckbox: false,
            enableShiftSelect: true,
            selectBy: {
              indexes: this.state.selectedIndexes
            }
          }}
        />
      </ReactDataGridWrapper>
    );
  }
}

UserGrid.propTypes = {
  users: PropTypes.array, //eslint-disable-line
  organizationSearchResult: PropTypes.array.isRequired,
  emptyRowsView: PropTypes.func.isRequired,
  loadingGridData: PropTypes.func.isRequired,
  selectedId: PropTypes.string.isRequired,
  loadingCountTree: PropTypes.number.isRequired,
  loadingCountSearch: PropTypes.number.isRequired,
  updateLoadingCount: PropTypes.func.isRequired,
  scrollTopFlag: PropTypes.bool.isRequired,
  backScrollTopFlag: PropTypes.func.isRequired,

  loadingGridDataFunctions: PropTypes.object.isRequired,
  selected: PropTypes.number,
  compCdSearched: PropTypes.number.isRequired,
  scrollTop: PropTypes.number.isRequired,
  setScrollTop: PropTypes.func.isRequired,
  loadSelectedUser: PropTypes.func.isRequired,
};

UserGrid.defaultPropTypes = {
  selected: 0,
};

export function mapDispatchToProps(dispatch) {
  return {
    loadProfileData: id => dispatch(loadProfileData(id)),
    loadProfileDataSearch: id => dispatch(loadProfileDataSearch(id)),
  };
}

const mapStateToProps = createStructuredSelector({
  loadProfile: makeLoadProfile(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'prof', reducer });
const withSaga = injectSaga({ key: 'prof', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserGrid);
