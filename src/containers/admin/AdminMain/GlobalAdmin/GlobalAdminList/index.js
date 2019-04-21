import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as feed from 'components/Feedback/functions';
import message from 'components/Feedback/message';
import { intlObj } from 'utils/commonUtils';

import { Select, Input } from 'antd';
import ReactDataGrid from 'react-data-grid';
// import { Link } from 'react-router-dom';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import StyleGlobalAdminList from './StyleGlobalAdminList';
import StyleDataGrid from '../../../../store/components/uielements/dataGrid.style';
import { LinkBtnDkGray, BtnDelete } from '../../../../store/components/uielements/buttons.style';
import messages from '../messages';

const Option = Select;

let pageNum = 20;
const pageIndex = 20;

class GlobalAdminList extends React.Component {
  constructor(prop) {
    super(prop);
    this.columns = [
      // {
      //   key: 'SEQ',
      //   name: 'No',
      //   width: 55,
      // },
      {
        key: 'MSG_KEY',
        name: '메시지코드',
        editable: true,
        sortable: true,
        formatter: this.HyperlinkFormatter,
        getRowMetaData: data => data,
        width: 140,
      },
      {
        key: 'DSCR_KOR',
        name: '메시지명(KOR)',
        editable: true,
        sortable: true,
        resizable: true,
      },
      {
        key: 'DSCR_ENG',
        name: '메시지명(ENG)',
        editable: true,
        sortable: true,
        resizable: true,
      },
      {
        key: 'DSCR_CHN',
        name: '메시지명(CHN)',
        editable: true,
        sortable: true,
        resizable: true,
      },
    ];
    this.state = {
      searchType: 'ALL',
      searchKeyword: '',
      sortColumnParam: '',
      sortDirectionParam: '',
      // rowSelection
      selectedIndexes: [],
      selectedKeys: [],
    };
    pageNum = pageIndex;
    this.props.getGlobalMsgList(
      pageNum,
      this.state.sortColumnParam,
      this.state.sortDirectionParam,
      this.state.searchType,
      this.state.searchKeyword,
    );
  }

  // rowSelection~
  onRowsSelected = (rows) => {
    const totalSelected = this.state.selectedIndexes.concat(rows.map(r => r.rowIdx));

    const totalGridSelected = this.state.getGlobalMsgList;

    if (totalSelected === totalGridSelected) {
      window.document.getElementById('select-all-checkbox').checked = false;
    } else {
      window.document.getElementById('select-all-checkbox').checked = true;
    }
    this.setState({
      selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx)),
      selectedKeys: this.state.selectedKeys.concat(rows.map(r => r.row.MSG_KEY)),
    });
  };

  onRowsDeselected = (rows) => {
    const rowIndexes = rows.map(r => r.rowIdx);
    const keyIndexes = rows.map(r => r.row.MSG_KEY);
    this.setState({
      selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1),
      selectedKeys: this.state.selectedKeys.filter(i => keyIndexes.indexOf(i) === -1),
    });
  };
  // ~rowSelection

  onChangeType = (val) => {
    this.setState({ searchType: val });
  }

  onChangeKeyword = (e) => {
    this.setState({ searchKeyword: e.target.value });
  }

  onRowClick = (rowIdx, row, col) => {
    // 조건걸지 않을 시 헤더클릭에도 호출됨
    // 메시지 코드 클릭시에만 상세이동
    if (rowIdx >= 0 && col.key === 'MSG_KEY') {
      const dtlInfo = this.props.setGlobalMsgList[rowIdx];

      this.props.history.push({ pathname: '/admin/AdminMain/GlobalAdmin/GlobalAdminDtl', search: 'D', state: dtlInfo });
    }
  };

  onDeleteGlobalMsg = () => {
    this.props.delGlobalMsg(
      this.state.selectedKeys,
      pageNum,
      this.state.sortColumnParam,
      this.state.sortDirectionParam,
      this.state.searchType,
      this.state.searchKeyword,
    );
    // 선택 항목 초기화
    this.setState({ selectedIndexes: [], selectedKeys: [] });
  }

  deleteConfirm = () => {
    if (this.state.selectedKeys.length === 0) {
      message.error(`${intlObj.get(messages.emptySelection)}`, 2);
    } else {
      feed.showConfirm(`${intlObj.get(messages.delConfirm)}`, '', this.onDeleteGlobalMsg);
    }
  }

  handleGridSort = (sortColumn, sortDirection) => {
    this.setState({
      sortColumnParam: sortColumn,
      sortDirectionParam: sortDirection,
    });
    this.props.getGlobalMsgList(
      pageNum,
      sortColumn,
      sortDirection,
      this.state.searchType,
      this.state.searchKeyword,
    );
  };

  HyperlinkFormatter = (val) => {
    const hyperlinkText = val.dependentValues.MSG_KEY;
    return (
      <hltext onClick={() => this.dtlLink(val.dependentValues)}>
        {hyperlinkText}
      </hltext>
    );
  };

  dtlLink = (data) => {
    this.props.history.push({ pathname: '/admin/AdminMain/GlobalAdmin/GlobalAdminDtl', search: 'D', state: data });
  }

  // rowGetter = (i) => {
  //   const mgs = this.props.setGlobalMsgList[i];
  //   if (this.state.searchKeyword !== '') {
  //     const searchKeywordIdx = mgs.DSCR_KOR.indexOf(this.state.searchKeyword);
  //     if (searchKeywordIdx >= 0) {
  //       // mgs.DSCR_KOR = mgs.DSCR_KOR.replace(
  //       //   this.state.searchKeyword,
  //       //   this.state.searchKeyword.fontcolor('RED'),
  //       // );
  //       // const replacePart = (<font color="RED">{this.state.searchKeyword}</font>);
  //       // mgs.DSCR_KOR = mgs.DSCR_KOR.replace(this.state.searchKeyword, replacePart);
  //     }
  //     return mgs;
  //   }
  //   return mgs;
  // }

  rowGetter = (i) => {
    if (i === pageNum - 1) {
      pageNum += pageIndex;
      this.props.getGlobalMsgList(
        pageNum,
        this.state.sortColumnParam,
        this.state.sortDirectionParam,
        this.state.searchType,
        this.state.searchKeyword,
      );
    }
    return this.props.setGlobalMsgList[i];
  }

  render() {
    // 검색결과 없을 때 표시(임시)
    const EmptyData = () =>
      <div><td colSpan="5"><font size="5">검색결과 없음</font></td></div>;
    const bInfo = {
      MSG_KEY: '',
      DSCR_KOR: '',
      DSCR_ENG: '',
      DSCR_CHN: '',
    };
    return (
      <div>
        <StyleGlobalAdminList>
          <h3 className="pageTitle list">다국어 메시지 목록
            <div className="searchBox">
              <Select
                defaultValue={this.state.searchType}
                onChange={this.onChangeType}
                className="selectOpt"
                style={{ visibility: 'hidden' }}
                dropdownStyle={{ fontSize: 13 }}
              >
                <Option value="ALL">전체</Option>
                <Option value="MSG_KEY">메시지코드</Option>
                <Option value="DSCR">메시지 명</Option>
              </Select>
              {/* 오른쪽 */}
              <div className="searchWrapper">
                <Input
                  value={this.state.searchKeyword}
                  onChange={this.onChangeKeyword}
                  placeholder="검색어를 입력해주세요."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      pageNum = pageIndex;
                      this.props.getGlobalMsgList(
                        pageNum,
                        this.state.sortColumnParam,
                        this.state.sortDirectionParam,
                        this.state.searchType,
                        this.state.searchKeyword,
                      );
                    }
                  }}
                  // suffix={<Icon type="search" />}
                  // style={{ width: 200 }}
                />
                <button
                  title="검색"
                  className="searchBtn"
                  onClick={() => {
                      pageNum = pageIndex;
                      this.props.getGlobalMsgList(
                        pageNum,
                        this.state.sortColumnParam,
                        this.state.sortDirectionParam,
                        this.state.searchType,
                        this.state.searchKeyword,
                      );
                    }
                  }
                />
              </div>
            </div>
          </h3>
          <StyleDataGrid className="globalLang">
            <ReactDataGrid
              columns={this.columns}
              rowGetter={this.rowGetter}
              rowsCount={this.props.setGlobalMsgList.length}
              // onRowClick={this.onRowClick}
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
          </StyleDataGrid>
          <div className="buttonWrapper">
            <BtnDelete onClick={this.deleteConfirm}>삭제</BtnDelete>
            <LinkBtnDkGray
              style={{ float: 'right' }}
              onClick={() => this.props.history.push({ pathname: '/admin/AdminMain/GlobalAdmin/GlobalAdminDtl', search: 'I', state: bInfo })}
            >등록
              {/* <Link to="/admin/AdminMain/GlobalAdmin/GlobalAdminDtl">등록</Link> */}
            </LinkBtnDkGray>
          </div>
        </StyleGlobalAdminList>
      </div>
    );
  }
}

GlobalAdminList.propTypes = {
  getGlobalMsgList: PropTypes.func, //eslint-disable-line
  setGlobalMsgList: PropTypes.Array, //eslint-disable-line
  delGlobalMsg: PropTypes.func, //eslint-disable-line
  delGlobalMsgList: PropTypes.func, //eslint-disable-line
  history: PropTypes.object,//eslint-disable-line
};

const mapDispatchToProps = dispatch => (
  {
    getGlobalMsgList: (num, sortColumn, sortDirection, searchType, searchKeyword) =>
      dispatch(actions.getGlobalMsgList(num, sortColumn, sortDirection, searchType, searchKeyword)),
    delGlobalMsg: (delKeys, num, sortColumn, sortDirection, searchType, searchKeyword) =>
      dispatch(actions.delGlobalMsg(
        delKeys,
        num,
        sortColumn,
        sortDirection,
        searchType,
        searchKeyword,
      )),
  }
);

const mapStateToProps = createStructuredSelector({
  setGlobalMsgList: selectors.makeSelectGlobalMsgList(),
  // delGlobalMsgList: selectors.makeDeleteGlobalMsg(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'GlobalAdmin', saga });
const withReducer = injectReducer({ key: 'GlobalAdmin', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(GlobalAdminList);
