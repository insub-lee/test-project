import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as feed from 'components/Feedback/functions';
import { intlObj, lang } from 'utils/commonUtils';

import { Input } from 'antd';
import ReactDataGrid from 'react-data-grid';
// import { Link } from 'react-router-dom';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import messages from '../messages';

import Select, { SelectOption } from '../../../../../components/Select';

import StyleDataGrid from '../../../../store/components/uielements/dataGrid.style';
import StyleCodeAdminList from './StyleCodeAdminList';
import { LinkBtnDkGray, BtnDelete } from '../../../../store/components/uielements/buttons.style';

const Option = SelectOption;

// 페이징에 필요한 변수
const pageIndex = 20; // 페이징 단위
let pageSNum = 1; // 페이징 시작 변수
let pageENum = 20; // 페이징 종료 변수

class CodeAdminList extends React.Component {
  // 생성자
  constructor(props) {
    super(props);
    pageSNum = 1; // 페이징 시작 변수
    pageENum = 20; // 페이징 종료 변수
    // 컬럼 설정
    this.columns = [
      {
        key: 'CODE_GRP_CD',
        name: intlObj.get(messages.codeGrpCd),
        visible: true,
        sortable: true,
        formatter: this.HyperlinkFormatter,
        getRowMetaData: data => data,
      },
      {
        key: intlObj.get(messages.codeGrpNameGlobal),
        name: intlObj.get(messages.codeGrpName),
        visible: true,
        sortable: true,
        formatter: this.HyperlinkFormatter2,
        getRowMetaData: data => data,
      },
      {
        key: 'SYS_YN',
        name: '시스템 여부',
        visible: false,
      },
      {
        key: 'USER_ID',
        name: '등록자 ID',
        visible: false,
      },
      {
        key: intlObj.get(messages.regUserGlobal),
        name: intlObj.get(messages.regUser),
        visible: true,
        sortable: true,
        width: 200,
      },
      {
        key: 'REG_DTTM',
        name: intlObj.get(messages.regDttm),
        visible: true,
        sortable: true,
        formatter: this.timeToDate,
        getRowMetaData: data => data,
        width: 100,
      },
    ];

    let dtKeyword = '';
    let dtKeywordType = 'codeNameKor';
    let dtSortColumn = '';
    let dtSortDirection = '';
    // 공통코드 상세에서 넘어온 Data
    if (this.props.history.location.state !== null &&
      this.props.history.location.state !== undefined) {
      const location = this.props.history.location.state;

      dtKeyword = location.keyword;
      dtKeywordType = location.keywordType;
      dtSortColumn = location.sortColumn;
      dtSortDirection = location.sortDirection;
    }

    // state 값 설정
    this.state = {
      selectedIndexes: [],
      delData: [],
      keywordType: dtKeywordType,
      keyword: dtKeyword,
      sortColumnParam: dtSortColumn,
      sortDirectionParam: dtSortDirection,
      codeAdminList: [],
    };

    // 화면 로드 시 데이터 가져옴
    this.props.getCodeAdminList(
      pageSNum,
      pageENum,
      this.state.codeAdminList,
      this.state.sortColumnParam,
      this.state.sortDirectionParam,
      this.state.keywordType,
      this.state.keyword,
    );

    // 함수 bind arrow func 사용시 bind 필요없음
    // this.onRowsSelected = this.onRowsSelected.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      codeAdminList: nextProps.setCodeAdminList,
    });
  }

  // 로우선택 시
  onRowsSelected = (rows) => {
    const totalSelected = this.state.selectedIndexes.concat(rows.map(r => r.rowIdx));

    const totalGridSelected = this.state.codeAdminList;

    if (totalSelected === totalGridSelected) {
      window.document.getElementById('select-all-checkbox').checked = false;
    } else {
      window.document.getElementById('select-all-checkbox').checked = true;
    }
    this.setState({
      selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx)),
      delData: this.state.delData.concat(rows.map(r => r.row.CODE_GRP_CD)),
    });
  };

  // 로우선택 해제 시
  onRowsDeselected = (rows) => {
    const rowIndexes = rows.map(r => r.rowIdx);
    const rowCodes = rows.map(r => r.row.CODE_GRP_CD);
    this.setState({
      selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1),
      delData: this.state.delData.filter(i => rowCodes.indexOf(i) === -1),
    });
  };

  onTextClick = (data) => {
    this.props.history.push({
      pathname: `/admin/AdminMain/CodeAdmin/CodeAdminDtl/D/${data.CODE_GRP_CD}`, state: data,
    });
  }

  HyperlinkFormatter = (val) => {
    const hyperlinkRow = val.dependentValues.CODE_GRP_CD;
    return (
      <format
        onClick={() => this.onTextClick({
          CODE_GRP_CD: val.dependentValues.CODE_GRP_CD,
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

  HyperlinkFormatter2 = (val) => {
    const hyperlinkRow = lang.get('CODE_NAME', val.dependentValues);
    return (
      <format
        onClick={() => this.onTextClick({
          CODE_GRP_CD: val.dependentValues.CODE_GRP_CD,
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

  // 날짜변환함수
  timeToDate = (val) => {
    const orgTime = val.dependentValues.REG_DTTM;
    const timestamp = new Date(orgTime).getTime();
    const todate = new Date(timestamp).getDate();
    const tomonth = new Date(timestamp).getMonth() + 1;
    const toyear = new Date(timestamp).getFullYear();
    let originalDate = '';
    // 숫자체크
    if (!Number.isNaN(Number(orgTime))) {
      originalDate = `${toyear}.${tomonth}.${todate}`;
    }
    return (
      <format>
        {originalDate}
      </format>
    );
  }

  // Grid sort
  handleGridSort = (sortColumn, sortDirection) => {
    this.setState({
      sortColumnParam: sortColumn,
      sortDirectionParam: sortDirection,
      codeAdminList: [],
    });
    pageSNum = 1;
    pageENum = pageIndex;
    this.props.getCodeAdminList(
      pageSNum,
      pageENum,
      [],
      sortColumn,
      sortDirection,
      this.state.searchText,
      this.state.searchType,
    );
  };

  // state 값 초기화
  initState = () => {
    this.setState({ selectedIndexes: [], delData: [] });
  }

  // selectbox 값 변경 시
  handleSelect = (e) => {
    this.setState({ keywordType: e });
  }

  // 삭제버튼 클릭 시
  handleDel = () => {
    this.setState({
      codeAdminList: [],
    });
    pageSNum = 1;
    pageENum = pageIndex;
    this.props.delRow(
      pageSNum,
      pageENum,
      [],
      this.state.sortColumnParam,
      this.state.sortDirectionParam,
      this.state.delData,
      this.state.keywordType,
      this.state.keyword,
    );
    this.initState();
  }

  // 등록버튼 클릭 시
  handleRegist = () => {
    // console.log(this.state.selectedIndexes);
  }

  // Input 검색아이콘 클릭 시(조회)
  handleClick = () => {
    // this.initState();
    // this.setState({
    //   codeAdminList: [],
    // });
    pageSNum = 1;
    pageENum = pageIndex;
    this.props.getCodeAdminList(
      pageSNum,
      pageENum,
      [],
      this.state.sortColumnParam,
      this.state.sortDirectionParam,
      this.state.keywordType,
      this.state.keyword,
    );
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
      this.props.getCodeAdminList(
        pageSNum,
        pageENum,
        this.state.codeAdminList,
        this.state.sortColumnParam,
        this.state.sortDirectionParam,
        this.state.keywordType,
        this.state.keyword,
      );
    }
    // return this.props.setCodeAdminList[rowNumber];
    return this.state.codeAdminList[rowNumber];
  }
  render() {
    // 검색결과 없을 때 표시(임시)
    const EmptyData = () =>
      <div colSpan="5"><font size="5">{intlObj.get(messages.noSearch)}</font></div>;
    const initGrid = {
      CODE_GRP_CD: null,
      sortColumnParam: this.state.sortColumnParam,
      sortDirectionParam: this.state.sortDirectionParam,
      keywordType: this.state.keywordType,
      keyword: this.state.keyword,
    };
    return (
      <div>
        <StyleCodeAdminList>
          <h3 className="pageTitle list">{intlObj.get(messages.codeGrpList)}
            <div className="searchBox">
              {/* <p className="totalResultNum">
                * 등록된 공통코드 총  {this.props.setCodeAdminList.length} 개
              </p> */}
              <Select
                defaultValue={this.state.keywordType}
                onChange={this.handleSelect}
                className="selectOpt"
                style={{ visibility: 'hidden' }}
                dropdownStyle={{ fontSize: 13 }}
              >
                <Option value="codeGrpCd">{intlObj.get(messages.codeGrpCd)}</Option>
                <Option value="codeNameKor">{intlObj.get(messages.codeGrpName)}</Option>
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
          </h3>
          <StyleDataGrid className="codeAdmin">
            <ReactDataGrid
              columns={this.columns.filter(column => column.visible === true)}
              rowGetter={this.rowGetter}
              // rowsCount={this.props.setCodeAdminList.length}
              rowsCount={this.state.codeAdminList.length}
              rowSelection={{
                showCheckbox: true,
                enableShiftSelect: true,
                onRowsSelected: this.onRowsSelected,
                onRowsDeselected: this.onRowsDeselected,
                selectBy: {
                  indexes: this.state.selectedIndexes,

                },
              }}
              onGridSort={this.handleGridSort}
              emptyRowsView={EmptyData}
            />
          </StyleDataGrid>
          <div className="buttonWrapper">
            <BtnDelete onClick={() => feed.showConfirm(`${intlObj.get(messages.delConfirm)}`, '', this.handleDel)}>{intlObj.get(messages.delete)}</BtnDelete>
            <LinkBtnDkGray
              style={{ float: 'right' }}
              onClick={() => this.props.history.push({ pathname: '/admin/AdminMain/CodeAdmin/CodeAdminDtl/R', state: initGrid })}
            >
              {intlObj.get(messages.register)}
            </LinkBtnDkGray>
          </div>
        </StyleCodeAdminList>
      </div>
    );
  }
}

CodeAdminList.propTypes = {
  getCodeAdminList: PropTypes.func, //eslint-disable-line
  setCodeAdminList: PropTypes.array, //eslint-disable-line
  delRow: PropTypes.func, //eslint-disable-line
  delAdminList: PropTypes.array, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
};

// 컴포넌트의 특정 함수형 props 를 실행 했을 때, 개발자가 지정한 action을 dispatch 하도록 설정
const mapDispatchToProps = dispatch => (
  {
    getCodeAdminList: (sNum, eNum, codeAdminList, sortColumn, sortDirection, keywordType, keyword) =>
      dispatch(actions.getCodeAdminList(sNum, eNum, codeAdminList, sortColumn, sortDirection, keywordType, keyword)),
    delRow: (sNum, eNum, codeAdminList, sortColumn, sortDirection, delData, keywordType, keyword) =>
      dispatch(actions.delRow(sNum, eNum, codeAdminList, sortColumn, sortDirection, delData, keywordType, keyword)),
  }
);

// (Function) store 의 state 를 컴포넌트의 props 에 매핑
const mapStateToProps = createStructuredSelector({
  setCodeAdminList: selectors.makeSelectCodeAdminList(),
  delAdminList: selectors.makeSelectDelRow(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'codeAdmin', saga });
const withReducer = injectReducer({ key: 'codeAdmin', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CodeAdminList);
