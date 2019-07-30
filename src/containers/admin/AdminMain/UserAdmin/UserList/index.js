
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { intlObj, lang } from 'utils/commonUtils';

import ReactDataGrid from 'react-data-grid';

import { Select, Input, Modal } from 'antd';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actionTypes from './actions';
import StyleUserList from './StyleUserList';
import StyleDataGrid from '../../../../store/components/uielements/dataGrid.style';
import messages from '../messages';
import { LinkBtnDkGray, LinkBtnLgtGray } from '../../../../store/components/uielements/buttons.style';
import UserRegTree from '../../../components/UserRegTree';

const { Option } = Select;

// 페이징에 필요한 변수
const pageIndex = 20; // 페이징 단위
let pageSNum = 1; // 페이징 시작 변수
let pageENum = 20; // 페이징 종료 변수

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
    pageENum = 20; // 페이징 종료 변수
    this.columns = [
      {
        key: 'EMP_NO',
        name: '사번',
        visible: true,
        sortable: true,
        resizable: true,
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
    let dtDeptId = 0;
    let dtPstnId = 0;

    // 상세에서 넘어온 Data
    console.log('this.props.history.location.state', this.props.history.location.state);
    if (this.props.history.location.state !== null &&
      this.props.history.location.state !== undefined) {
      const location = this.props.history.location.state;

      dtKeyword = location.keyword;
      dtKeywordType = location.keywordType;
      dtSortColumn = location.sortColumn;
      dtSortDirection = location.sortDirection;
      dtDeptId = location.deptId;
      dtPstnId = location.pstnId;
    }

    this.state = {
      keywordType: dtKeywordType,
      keyword: dtKeyword,
      sortColumnParam: dtSortColumn,
      sortDirectionParam: dtSortDirection,
      deptId: dtDeptId,
      pstnId: dtPstnId,
    };

    this.props.getUserList(
      pageSNum,
      pageENum,
      [],
      this.state.sortColumnParam,
      this.state.sortDirectionParam,
      this.state.keywordType,
      this.state.keyword,
      this.state.deptId,
      this.state.pstnId,
    );
  }

  // 리스트 클릭 링크
  onRowClick = (i) => {
    const data = {
      sortColumnParam: this.state.sortColumnParam,
      sortDirectionParam: this.state.sortDirectionParam,
      keywordType: this.state.keywordType,
      keyword: this.state.keyword,
      deptId: this.state.deptId,
      pstnId: this.state.pstnId,
    };
    this.props.history.push({
      pathname: `/admin/adminmain/account/user/${this.props.userList[i].USER_ID}`, state: data,
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
    const { userList } = this.props;
    if (rowNumber === pageENum - 1) {
      pageSNum += pageIndex;
      pageENum += pageIndex;
      this.props.getUserList(
        pageSNum,
        pageENum,
        userList,
        this.state.sortColumnParam,
        this.state.sortDirectionParam,
        this.state.keywordType,
        this.state.keyword,
        this.state.deptId,
        this.state.pstnId,
      );
    }
    return userList[rowNumber];
  }

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
      this.state.deptId,
      this.state.pstnId,
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
      this.state.deptId,
      this.state.pstnId,
    );
  };

  // 트리 선택 화면 

  getSelectNode = (node) => {
    this.setState({
      selectedNode: node,
    });
  };

  getSelectDept = (id) => {
    switch (this.state.modalType) {
      case 'dept':
        this.props.getChangeDeptTreeData(id);
        break;
      case 'duty':
        this.props.getChangeDutyTreeData(id);
        break;
      case 'pstn':
        this.props.getChangePSTNTreeData(id);
        break;
      case 'rank':
        this.props.getChangeRANKTreeData(id);
        break;
      default:
        break;
    }
  };

  showModal = (title, type) => {
    console.log('showModal');
    switch (type) {
      case 'dept':
        this.props.getDeptComboData();
        break;
      case 'duty':
        this.props.getDutyComboData();
        break;
      case 'pstn':
        this.props.getPSTNComboData();
        break;
      case 'rank':
        this.props.getRANKComboData();
        break;
      default:
        break;
    }
    this.setState({
      visible: true,
      modalTitle: title,
      modalType: type,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
      [`${this.state.modalType}Name`]: this.state.selectedNode.NAME_KOR,
      [`${this.state.modalType}Id`]: this.state.selectedNode.key,
    }, () => {
      this.props.getUserList(
        pageSNum,
        pageENum,
        [],
        this.state.sortColumnParam,
        this.state.sortDirectionParam,
        this.state.keywordType,
        this.state.keyword,
        this.state.deptId,
        this.state.pstnId,
      );
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      selectedNode: {},
      modalType: '',
      // eslint-disable-next-line react/no-unused-state
      treeData: [],
    });
  };

  initSearch = () => {
    this.setState({
      keyword: '',
      keywordType: 'userNameKor',
      sortColumnParam: '',
      sortDirectionParam: '',
      deptId: 0,
      pstnId: 0,
      deptName: '',
      pstnName: '',
    });
  }

  render() {
    // 검색결과 없을 때 표시(임시)
    const EmptyData = () =>
      <div colSpan="5"><font size="5">{intlObj.get(messages.noSearch)}</font></div>;
    const { userList, history } = this.props;
    const initGrid = {
      USER_ID: null,
      sortColumnParam: this.state.sortColumnParam,
      sortDirectionParam: this.state.sortDirectionParam,
      keywordType: this.state.keywordType,
      keyword: this.state.keyword,
      deptId: this.state.deptId,
      pstnId: this.state.pstnId,
    };
    return (
      <div>
        <Modal
          title={this.state.modalTitle}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={400}
          bodyStyle={{ maxHeight: 500 }}
        >
          <UserRegTree
            treeType={this.state.modalType}
            treeData={this.props.treeData}
            comboData={this.props.comboData}
            getSelectNode={this.getSelectNode}
            getSelectDept={this.getSelectDept}
            isLoading={this.props.isLoading}
          />
        </Modal>
        <StyleUserList>
          <h3 className="pageTitle">계정관리</h3>
          <div className="searchBox">
            <Input
              placeholder={intlObj.get(messages.lblDeptPlaceholder)}
              name="deptName"
              value={this.state.deptName}
              onClick={() => this.showModal(intlObj.get(messages.titleUserDept), 'dept')}
              maxLength={200}
              id="dept"
              style={{ width: 200, marginRight: 10, float: 'left' }}
              readOnly={true}
            />
            <Input
              placeholder={intlObj.get(messages.lblPSTNPlaceholder)}
              name="pstnName"
              value={this.state.pstnName}
              onClick={() => this.showModal(intlObj.get(messages.titleUserPSTN), 'pstn')}
              maxLength={200}
              id="pstn"
              style={{ width: 200, marginRight: 10, float: 'left' }}
              readOnly={true}
            />
            <LinkBtnLgtGray onClick={this.initSearch} style={{ marginRight: '10px' }}>
              검색조건초기화
            </LinkBtnLgtGray>
            <Select
              value={this.state.keywordType}
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
              rowsCount={userList.length}
              onGridSort={this.handleGridSort}
              emptyRowsView={EmptyData}
              onRowClick={this.onRowClick}
            />
          </StyleDataGrid>
          <div className="buttonWrapper">
            <LinkBtnDkGray
              style={{ float: 'right' }}
              onClick={() => history.push({ pathname: '/admin/adminmain/account/userReg', state: initGrid })}
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

  treeData: PropTypes.array, //eslint-disable-line
  isLoading: PropTypes.bool, //eslint-disable-line
  comboData: PropTypes.array, //eslint-disable-line
  getChangeDeptTreeData: PropTypes.func, //eslint-disable-line
  getDeptComboData: PropTypes.func, //eslint-disable-line
  getChangeDutyTreeData: PropTypes.func, //eslint-disable-line
  getDutyComboData: PropTypes.func, //eslint-disable-line
  getChangePSTNTreeData: PropTypes.func, //eslint-disable-line
  getPSTNComboData: PropTypes.func, //eslint-disable-line
  getChangeRANKTreeData: PropTypes.func, //eslint-disable-line
  getRANKComboData: PropTypes.func, //eslint-disable-line  

};

const mapDispatchToProps = dispatch => (
  {
    getUserList: (sNum, eNum, userList, sortColumn, sortDirection, keywordType, keyword, deptId, pstnId) =>
      dispatch(actionTypes.getUserList(sNum, eNum, userList, sortColumn, sortDirection, keywordType, keyword, deptId, pstnId)),

    getChangeDeptTreeData: DEPT_ID => dispatch(actionTypes.getChangeDeptTreeData(DEPT_ID)),
    getDeptComboData: () => dispatch(actionTypes.getDeptComboData()),
    getChangeDutyTreeData: DUTY_ID => dispatch(actionTypes.getChangeDutyTreeData(DUTY_ID)),
    getDutyComboData: () => dispatch(actionTypes.getDutyComboData()),
    getChangePSTNTreeData: PSTN_ID => dispatch(actionTypes.getChangePSTNTreeData(PSTN_ID)),
    getPSTNComboData: () => dispatch(actionTypes.getPSTNComboData()),
    getChangeRANKTreeData: RANK_ID => dispatch(actionTypes.getChangeRANKTreeData(RANK_ID)),
    getRANKComboData: () => dispatch(actionTypes.getRANKComboData()),
  }
);

const mapStateToProps = createStructuredSelector({
  userList: selectors.makeSelectUserList(),

  comboData: selectors.makeSelectComboData(),
  treeData: selectors.makeTreeData(),
  isLoading: selectors.makeIsLoading(),

});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'UserList', saga });
const withReducer = injectReducer({ key: 'UserList', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserList);
