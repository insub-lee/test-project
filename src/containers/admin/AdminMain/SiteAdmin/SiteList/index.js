/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Input } from 'antd';
import ReactDataGrid from 'react-data-grid';
import { Link } from 'react-router-dom';
// import message from 'components/Feedback/message';
import ErrorBoundary from 'containers/common/ErrorBoundary';
import { lang, intlObj } from 'utils/commonUtils';
import * as feed from 'components/Feedback/functions';
import messages from '../messages';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import Select, { SelectOption } from '../../../../../components/Select';
import StyleSiteAdminList from './StyleSiteAdminList';
import StyleDataGrid from '../../../../store/components/uielements/dataGrid.style';
// import { LinkBtnDkGray, BtnDelete } from '../../../../store/components/uielements/buttons.style';
import StyledButton from '../../../../../components/Button/StyledButton';

const Option = SelectOption;
// 페이징에 필요한 변수
const pageIndex = 20; // 페이징 단위
let pageSNum = 1; // 페이징 시작 변수
let pageENum = 20; // 페이징 종료 변수

const EmptyData = () => (
  <div style={{ textAlign: 'center', fontSize: 15, fontWeight: 800, padding: 15 }}>
    <span>검색 결과가 없습니다.</span>
  </div>
);

class SiteList extends React.Component {
  constructor(prop) {
    super(prop);
    // 사용자 목록 컬럼
    this.columns = [
      // {
      //   key: 'SITE_ID',
      //   name: 'No.',
      //   sortable: true,
      //   // resizable: true,
      //   width: 55,
      // },
      {
        key: 'NAME_KOR',
        name: `${intlObj.get(messages.titleSiteName)}`,
        sortable: true,
        resizable: true,
        formatter: this.HyperlinkFomatter,
        getRowMetaData: data => data,
      },
      {
        key: 'URL',
        name: `${intlObj.get(messages.titleUrl)}`,
        resizable: true,
        sortable: true,
        formatter: this.HyperlinkFomatter1,
        getRowMetaData: data => data,
      },
      {
        key: 'REG_DTTM',
        name: `${intlObj.get(messages.titleRegdtm)}`,
        sortable: true,
        width: 150,
      },
    ];

    // const originalRows = this.props.getRow.slice(0);
    //    const rows = originalRows.slice(0);
    this.state = {
      title: `${intlObj.get(messages.titleSiteList)}`,
      selectedIndexes: [],
      delData: [],
      keywordType: 'ALL',
      keyword: '',
      sortColumnParam: '',
      sortDirectionParam: '',
      // siteId: prop.siteId,
    };

    pageSNum = 1;
    pageENum = pageIndex;
    this.props.getList(pageSNum, pageENum, this.state.sortColumnParam, this.state.sortDirectionParam, this.state.keywordType, this.state.keyword, []);

    // 함수 bind
    this.onRowsSelected = this.onRowsSelected.bind(this);
    this.onRowsDeselected = this.onRowsDeselected.bind(this);
    this.initState = this.initState.bind(this);
    this.rowList = this.rowList.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    // this.handleRegist = this.handleRegist.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  // componentDidMount() {
  //   this.props.getList(this.state.keywordType, this.state.keyword);
  // }

  // componentWillReceiveProps(nextProps) {
  //   alert(nextProps.getList);
  //   alert(nextProps.getRow);
  // }

  onRowsSelected = rows => {
    const totalSelected = this.state.selectedIndexes.concat(rows.map(r => r.rowIdx));

    const totalGridSelected = this.state.getList;

    if (totalSelected === totalGridSelected) {
      window.document.getElementById('select-all-checkbox').checked = false;
    } else {
      window.document.getElementById('select-all-checkbox').checked = true;
    }
    this.setState({
      selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx)),
      delData: this.state.delData.concat(rows.map(r => r.row.SITE_ID)),
    });
  };

  onRowsDeselected = rows => {
    const rowIndexes = rows.map(r => r.rowIdx);
    const rowSites = rows.map(r => r.row.SITE_ID);
    this.setState({
      selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1),
      delData: this.state.delData.filter(i => rowSites.indexOf(i) === -1),
    });
  };

  HyperlinkFomatter = val => {
    const hyperlinkName = lang.get('NAME', val.dependentValues);
    return <hltext onClick={() => this.dtlLink(val.dependentValues)}>{hyperlinkName}</hltext>;
  };

  dtlLink = data => {
    this.props.history.push({ pathname: '/admin/adminmain/siteadmin/SiteDetail', search: 'D', state: data });
  };

  openClick = url => {
    const linkUrl = url.startsWith('http') ? url : `http://${url}`;
    window.open(linkUrl);
  };

  HyperlinkFomatter1 = val => {
    const hyperlinkName = val.dependentValues.URL;
    const detailKey = val.dependentValues.URL;

    return (
      <span
        onClick={() => this.openClick(detailKey)}
        // onKeyPress={detailKey}
        onKeyPress={() => this.openClick(detailKey)}
        role="button"
        tabIndex="0"
      >
        {hyperlinkName}
      </span>
    );
  };

  initState = () => {
    pageSNum = 1;
    pageENum = pageIndex;
    this.setState({
      selectedIndexes: [],
      delData: [],
      keywordType: 'ALL',
      keyword: '',
      sortColumnParam: '',
      sortDirectionParam: '',
    });
  };

  rowList = i => {
    if (i === pageENum - 1) {
      pageSNum = pageENum + 1;
      pageENum += pageIndex;
      this.props.getList(
        pageSNum,
        pageENum,
        this.state.sortColumnParam,
        this.state.sortDirectionParam,
        this.state.keywordType,
        this.state.keyword,
        this.props.getRow,
      );
    }
    return this.props.getRow[i];
  };

  delConfirm = () => {
    if (this.state.delData.length <= 0) return;

    feed.showConfirm(`${intlObj.get(messages.delConfirm)}`, '', this.deleteRow);
  };

  deleteRow = () => {
    pageSNum = 1;
    // pageENum = pageIndex;
    this.props.delRow(
      this.state.delData,
      pageSNum,
      pageENum,
      this.state.sortColumnParam,
      this.state.sortDirectionParam,
      this.state.keywordType,
      this.state.keyword,
    );
    this.initState();
  };

  handleGridSort = (sortColumn, sortDirection) => {
    this.setState({
      sortColumnParam: sortColumn,
      sortDirectionParam: sortDirection,
    });
    pageSNum = 1;
    // pageENum = pageIndex;
    this.props.getList(pageSNum, pageENum, sortColumn, sortDirection, this.state.keywordType, this.state.keyword, []);
  };

  // Input 검색아이콘 클릭 시(조회)
  handleClick = () => {
    // this.initState();
    pageSNum = 1;
    pageENum = pageIndex;
    this.props.getList(pageSNum, pageENum, this.state.sortColumnParam, this.state.sortDirectionParam, this.state.keywordType, this.state.keyword, []);
  };

  // Input 검색값 변경 시
  handleSearch(e) {
    // console.log(e.target.value);
    this.setState({ keyword: e.target.value });
    // this.handleClick();
    pageSNum = 1;
    pageENum = pageIndex;
    this.props.getList(pageSNum, pageENum, this.state.sortColumnParam, this.state.sortDirectionParam, this.state.keywordType, e.target.value, []);
  }

  // Input 키 누를 때
  handleKeyPress() {
    // console.log('handleKeyPress', e.charCode);
    // this.handleSearch();
    // this.setState({ keyword: e.target.value });
    // if (e.charCode === 13) {
    this.handleClick();
    // } else {
    //   this.handleClick();
    // }
  }

  // selectbox 값 변경 시
  handleSelect(e) {
    this.setState({ keywordType: e });
  }

  render() {
    return (
      <div>
        <StyleSiteAdminList>
          <h3 className="pageTitle list">
            {this.state.title}
            <div className="searchBox">
              <ErrorBoundary>
                <Select
                  value={this.state.keywordType}
                  onChange={this.handleSelect}
                  className="selectOpt"
                  style={{ visibility: 'hidden' }}
                  dropdownStyle={{ fontSize: 13 }}
                >
                  <Option value="ALL">{intlObj.get(messages.lblAll)}</Option>
                  <Option value="NAME_KOR">{intlObj.get(messages.titleSiteName)}</Option>
                  <Option value="URL">{intlObj.get(messages.titleUrl)}</Option>
                </Select>
                <div className="searchWrapper">
                  <Input
                    placeholder={intlObj.get(messages.lblSearchPlaceholder)}
                    // suffix={
                    //   <Icon
                    //     type="search"
                    //     onClick={this.handleClick}
                    //   />}
                    value={this.state.keyword}
                    onChange={this.handleSearch}
                    // onKeyPress={this.handleKeyPress}
                  />
                  <button title={intlObj.get(messages.lblSearch)} className="searchBtn" onClick={this.handleClick} />
                </div>
              </ErrorBoundary>
            </div>
          </h3>
          <StyleDataGrid className="siteAdmin">
            <div>
              <ErrorBoundary>
                <ReactDataGrid
                  // rowKey="SITE_ID"
                  columns={this.columns}
                  rowGetter={this.rowList}
                  rowsCount={this.props.getRow.length}
                  // onRowClick={this.onRowClick}
                  // getCellActions={this.getCellActions}
                  onGridSort={this.handleGridSort}
                  rowSelection={{
                    showCheckbox: true,
                    enableShiftSelect: true,
                    onRowsSelected: this.onRowsSelected,
                    onRowsDeselected: this.onRowsDeselected,
                    selectBy: {
                      indexes: this.state.selectedIndexes,
                    },
                  }}
                  emptyRowsView={EmptyData}
                />
              </ErrorBoundary>
            </div>
          </StyleDataGrid>
          <div className="buttonWrapper">
            <ErrorBoundary>
              <StyledButton className="btn-light" onClick={this.delConfirm}>
                {intlObj.get(messages.lblDelete)}
              </StyledButton>
            </ErrorBoundary>
            <ErrorBoundary>
              <StyledButton className="btn-primary" style={{ float: 'right' }}>
                <Link to="/admin/adminmain/siteadmin/SiteReg">{intlObj.get(messages.lblReg)}</Link>
              </StyledButton>
            </ErrorBoundary>
          </div>
        </StyleSiteAdminList>
      </div>
    );
  }
}

SiteList.propTypes = {
  siteId: PropTypes.string, //eslint-disable-line
  getList: PropTypes.func, //eslint-disable-line
  delRow: PropTypes.func, //eslint-disable-line
  getRow: PropTypes.array, //eslint-disable-line
  delList: PropTypes.array, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  historyPush: PropTypes.func, //eslint-disable-line
};

const mapDispatchToProps = dispatch => ({
  getList: (sNum, eNum, sortColumnParam, sortDirectionParam, keywordType, keyword, siteList) =>
    dispatch(actions.getList(sNum, eNum, sortColumnParam, sortDirectionParam, keywordType, keyword, siteList)),
  historyPush: url => dispatch(push(url)),
  delRow: (delData, sNum, eNum, sortColumnParam, sortDirectionParam, keywordType, keyword) =>
    dispatch(actions.delRow(delData, sNum, eNum, sortColumnParam, sortDirectionParam, keywordType, keyword)),
});

const mapStateToProps = createStructuredSelector({
  getRow: selectors.makeSelectSiteList(),
  delList: selectors.makeDelRow(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'SiteList', saga });
const withReducer = injectReducer({ key: 'SiteList', reducer });

export default compose(withReducer, withSaga, withConnect)(SiteList);
