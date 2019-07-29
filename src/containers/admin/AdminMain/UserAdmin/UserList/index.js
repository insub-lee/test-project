
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { intlObj, lang } from 'utils/commonUtils';

import ReactDataGrid from 'react-data-grid';

import { Select, Input } from 'antd';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actionTypes from './actions';
import StyleUserList from './StyleUserList';
import StyleDataGrid from '../../../../store/components/uielements/dataGrid.style';
import messages from '../messages';
import { LinkBtnDkGray } from '../../../../store/components/uielements/buttons.style';

const { Option } = Select;

// 페이징에 필요한 변수
const pageIndex = 5; // 페이징 단위
let pageSNum = 1; // 페이징 시작 변수
let pageENum = 5; // 페이징 종료 변수

const statusSwitch = (statusCd) => {
  switch (statusCd) {
    case 'C':
      return intlObj.get(messages.statusCdWork);
    case 'D':
      return intlObj.get(messages.statusCdDispatch);
    case 'H':
      return intlObj.get(messages.statusCdLeave);
    case 'T':
      return intlObj.get(messages.statusCdRetired);
    default:
      return '';
  }
}

class UserList extends React.Component {
  constructor(prop) {
    super(prop);
    pageSNum = 1; // 페이징 시작 변수
    pageENum = 5; // 페이징 종료 변수
    this.columns = [
      {
        key: 'EMP_NO',
        name: '사번',
        visible: true,
        sortable: true,
        formatter: this.HyperlinkFormatter,
        getRowMetaData: data => data,
      },
      {
        key: 'NAME_KOR',
        name: '이름(KOR)',
        visible: true,
        sortable: true,
        resizable: true,
      },
      {
        key: 'EMAIL',
        name: 'Email',
        visible: true,
        sortable: true,
        resizable: true,
      },
      {
        key: 'STATUS_CD',
        name: '상태',
        visible: true,
        sortable: true,
        formatter: this.StatusFormatter,
        getRowMetaData: data => data,
      },
      {
        key: 'DEPT_NAME',
        name: '부서',
        visible: true,
        sortable: true,
        resizable: true,
      },
      {
        key: 'PSTN_NAME',
        name: '직위',
        visible: true,
        sortable: true,
        resizable: true,
      },
      {
        key: 'OFFICE_TEL_NO',
        name: '전화번호',
        visible: true,
        sortable: true,
        resizable: true,
      },
    ];

    let dtKeyword = '';
    let dtKeywordType = 'userNameKor';
    let dtSortColumn = '';
    let dtSortDirection = '';

    // 상세에서 넘어온 Data
    console.log('this.props.history.location.state', this.props.history.location.state);
    if (this.props.history.location.state !== null &&
      this.props.history.location.state !== undefined) {
      const location = this.props.history.location.state;

      dtKeyword = location.keyword;
      dtKeywordType = location.keywordType;
      dtSortColumn = location.sortColumn;
      dtSortDirection = location.sortDirection;
    }

    this.state = {
      keywordType: dtKeywordType,
      keyword: dtKeyword,
      sortColumnParam: dtSortColumn,
      sortDirectionParam: dtSortDirection,
      userList: [],
    };

    this.props.getUserList(
      pageSNum,
      pageENum,
      this.state.userList,
      this.state.sortColumnParam,
      this.state.sortDirectionParam,
      this.state.keywordType,
      this.state.keyword,
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      userList: nextProps.userList,
    });
  }


  // 리스트 클릭 링크
  onListClick = (data) => {
    this.props.history.push({
      pathname: `/admin/adminmain/account/user/${data.USER_ID}`, state: data,
    });
  }

  // Input 검색값 변경 시
  handleSearch = (e) => {
    this.setState({ keyword: e.target.value });
  }

  // Input 키 누를 때
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  }

  // rowGetter
  rowGetter = (rowNumber) => {
    if (rowNumber === pageENum - 1) {
      pageSNum += pageIndex;
      pageENum += pageIndex;
      this.props.getUserList(
        pageSNum,
        pageENum,
        this.state.userList,
        this.state.sortColumnParam,
        this.state.sortDirectionParam,
        this.state.keywordType,
        this.state.keyword,
      );
    }
    return this.state.userList[rowNumber];
  }


  HyperlinkFormatter = (val) => {
    const hyperlinkRow = val.dependentValues.EMP_NO;
    return (
      <format
        onClick={() => this.onListClick({
          USER_ID: val.dependentValues.USER_ID,
          sortColumnParam: this.state.sortColumnParam,
          sortDirectionParam: this.state.sortDirectionParam,
          keywordType: this.state.keywordType,
          keyword: this.state.keyword,
          })}
      >
        {hyperlinkRow}
      </format>
    );
  };

  StatusFormatter = (val) => {
    return (
      <format>
        {statusSwitch(val.dependentValues.STATUS_CD)}
      </format>
    );
  };

  // selectbox 값 변경 시
  handleSelect = (e) => {
    this.setState({ keywordType: e });
  }

  // 검색아이콘 클릭 시(조회)
  handleClick = () => {
    pageSNum = 1;
    pageENum = pageIndex;
    this.props.getUserList(
      pageSNum,
      pageENum,
      [],
      this.state.sortColumnParam,
      this.state.sortDirectionParam,
      this.state.keywordType,
      this.state.keyword,
    );
  }

  // Grid sort
  handleGridSort = (sortColumn, sortDirection) => {
    this.setState({
      sortColumnParam: sortColumn,
      sortDirectionParam: sortDirection,
      userList: [],
    });
    pageSNum = 1;
    pageENum = pageIndex;

    this.props.getUserList(
      pageSNum,
      pageENum,
      [],
      sortColumn,
      sortDirection,
      this.state.searchText,
      this.state.keywordType,
    );
  };

  render() {
    // 검색결과 없을 때 표시(임시)
    const EmptyData = () =>
      <div colSpan="5"><font size="5">{intlObj.get(messages.noSearch)}</font></div>;

    const initGrid = {
      EMP_NO: null,
      sortColumnParam: this.state.sortColumnParam,
      sortDirectionParam: this.state.sortDirectionParam,
      keywordType: this.state.keywordType,
      keyword: this.state.keyword,
    };
    return (
      <div>
        <StyleUserList>
          <h3 className="pageTitle">계정관리</h3>
          <div className="searchBox">
            {/* <Select style={{ width: 300, float: 'left' }} >
              <Option value={0}>임시</Option>
            </Select> */}
            <Select
              defaultValue={this.state.keywordType}
              onChange={this.handleSelect}
              style={{ width: 120, marginRight: 10 }}
              dropdownStyle={{ fontSize: 13 }}
            >
              <Option value="userNameKor">이름</Option>
              <Option value="userEmpNo">사번</Option>
            </Select>
            {/* 오른쪽 */}
            <div className="searchWrapper">
              <Input
                value={this.state.keyword}
                onChange={this.handleSearch}
                onKeyPress={this.handleKeyPress}
                placeholder={intlObj.get(messages.inputSearch)}
              />
              <button title={intlObj.get(messages.search)} className="searchBtn" onClick={this.handleClick} />
            </div>
          </div>
          <StyleDataGrid className="globalLang">
            <ReactDataGrid
              columns={this.columns.filter(column => column.visible === true)}
              rowGetter={this.rowGetter}
              rowsCount={this.state.userList.length}
              onGridSort={this.handleGridSort}
              emptyRowsView={EmptyData}
            />
          </StyleDataGrid>
          <div className="buttonWrapper">
            <LinkBtnDkGray
              style={{ float: 'right' }}
              onClick={() => this.props.history.push({ pathname: '/admin/adminmain/account/userReg', state: initGrid })}
            >
              {intlObj.get(messages.lblReg)}
            </LinkBtnDkGray>
          </div>
        </StyleUserList>
      </div>
    );
  }
}

UserList.propTypes = {
  getUserList: PropTypes.func, //eslint-disable-line
  userList: PropTypes.array, //eslint-disable-line
  history: PropTypes.object,//eslint-disable-line
};

const mapDispatchToProps = dispatch => (
  {
    getUserList: (sNum, eNum, userList, sortColumn, sortDirection, keywordType, keyword) =>
      dispatch(actionTypes.getUserList(sNum, eNum, userList, sortColumn, sortDirection, keywordType, keyword)),
  }
);

const mapStateToProps = createStructuredSelector({
  userList: selectors.makeSelectUserList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'UserList', saga });
const withReducer = injectReducer({ key: 'UserList', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserList);
