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

import Footer from 'containers/admin/App/Footer';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actionTypes from './actions';
import StyleUserList from './StyleUserList';
import StyleDataGrid from '../../../../store/components/uielements/dataGrid.style';
import messages from '../messages';
import { LinkBtnDkGray, LinkBtnLgtGray } from '../../../../store/components/uielements/buttons.style';
import UserRegTree from '../../../components/UserRegTree';
import StyledButton from '../../../../../components/Button/StyledButton';

const { Option } = Select;

// 페이징에 필요한 변수
const pageIndex = 20; // 페이징 단위
let pageSNum = 1; // 페이징 시작 변수
let pageENum = 20; // 페이징 종료 변수

const statusSwitch = statusCd => {
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
};

// 검색결과 없을 때 표시(임시)
const EmptyData = () => (
  <div style={{ textAlign: 'center', fontSize: 15, fontWeight: 800, padding: 15 }}>
    <span>{intlObj.get(messages.noSearch)}</span>
  </div>
);

class UserList extends React.Component {
  constructor(prop) {
    super(prop);
    pageSNum = 1; // 페이징 시작 변수
    pageENum = 20; // 페이징 종료 변수
    this.columns = [
      {
        key: 'EMP_NO',
        name: `${intlObj.get(messages.titleUserEmpNo)}`,
        visible: true,
        sortable: true,
        resizable: true,
      },
      {
        key: 'NAME_KOR',
        name: `${intlObj.get(messages.nameKor)}`,
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
        name: `${intlObj.get(messages.titleUserStatus)}`,
        visible: true,
        sortable: true,
        formatter: this.StatusFormatter,
        getRowMetaData: data => data,
      },
      {
        key: 'DEPT_NAME',
        name: `${intlObj.get(messages.titleUserDept)}`,
        visible: true,
        sortable: true,
        resizable: true,
      },
      {
        key: 'PSTN_NAME',
        name: `${intlObj.get(messages.titleUserPSTN)}`,
        visible: true,
        sortable: true,
        resizable: true,
      },
      {
        key: 'OFFICE_TEL_NO',
        name: `${intlObj.get(messages.titleUserOfficeTel)}`,
        visible: true,
        sortable: true,
        resizable: true,
      },
    ];

    let dtKeyword = '';
    const dtKeywordType = 'userNameKor';
    let dtSortColumn = '';
    let dtSortDirection = '';
    let dtDeptId = 0;
    let dtPstnId = 0;
    let dtDeptName = '';
    let dtPstnName = '';
    let dtStatusCode = 'C';

    // 상세에서 넘어온 Data
    if (this.props.history.location.state !== null && this.props.history.location.state !== undefined) {
      const location = this.props.history.location.state;

      dtStatusCode = location.statusCode;
      dtKeyword = location.keyword;
      dtSortColumn = location.sortColumn;
      dtSortDirection = location.sortDirection;
      dtDeptId = location.deptId;
      dtPstnId = location.pstnId;
      dtDeptName = location.deptName;
      dtPstnName = location.pstnName;
    }

    this.state = {
      statusCode: dtStatusCode,
      keywordType: dtKeywordType,
      keyword: dtKeyword,
      sortColumnParam: dtSortColumn,
      sortDirectionParam: dtSortDirection,
      deptId: dtDeptId,
      pstnId: dtPstnId,
      deptName: dtDeptName,
      pstnName: dtPstnName,
    };

    this.props.getUserList(
      pageSNum,
      pageENum,
      [],
      this.state.sortColumnParam,
      this.state.sortDirectionParam,
      this.state.statusCode,
      this.state.keywordType,
      this.state.keyword,
      this.state.deptId,
      this.state.pstnId,
    );
  }

  // 리스트 클릭 링크
  onRowClick = i => {
    if (i === -1) return;
    const data = {
      sortColumnParam: this.state.sortColumnParam,
      sortDirectionParam: this.state.sortDirectionParam,
      statusCode: this.state.statusCode,
      keywordType: this.state.keywordType,
      keyword: this.state.keyword,
      deptId: this.state.deptId,
      pstnId: this.state.pstnId,
      deptName: this.state.deptName,
      pstnName: this.state.pstnName,
    };
    this.props.history.push({
      pathname: `/admin/adminmain/account/user/${this.props.userList[i].USER_ID}`,
      state: data,
    });
  };

  // Input 검색값 변경 시
  handleSearch = e => {
    this.setState({ keyword: e.target.value });
  };

  // Input 키 누를 때
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  };

  // rowGetter
  rowGetter = rowNumber => {
    const { userList } = this.props;
    if (rowNumber === pageENum - 1) {
      pageSNum = pageENum + 1;
      pageENum += pageIndex;
      this.props.getUserList(
        pageSNum,
        pageENum,
        userList,
        this.state.sortColumnParam,
        this.state.sortDirectionParam,
        this.state.statusCode,
        this.state.keywordType,
        this.state.keyword,
        this.state.deptId,
        this.state.pstnId,
      );
    }
    return userList[rowNumber];
  };

  StatusFormatter = val => <format>{statusSwitch(val.dependentValues.STATUS_CD)}</format>;

  // selectbox 값 변경 시
  handleSelect = e => {
    this.setState({ keywordType: e });
  };

  handleStatusSelect = e => {
    this.setState({ statusCode: e }, () => {
      pageSNum = 1;
      pageENum = pageIndex;
      this.props.getUserList(
        pageSNum,
        pageENum,
        [],
        this.state.sortColumnParam,
        this.state.sortDirectionParam,
        this.state.statusCode,
        this.state.keywordType,
        this.state.keyword,
        this.state.deptId,
        this.state.pstnId,
      );
    });
  };

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
      this.state.statusCode,
      this.state.keywordType,
      this.state.keyword,
      this.state.deptId,
      this.state.pstnId,
    );
  };

  // Grid sort
  handleGridSort = (sortColumn, sortDirection) => {
    this.setState({
      sortColumnParam: sortDirection === 'NONE' ? '' : sortColumn,
      sortDirectionParam: sortDirection === 'NONE' ? '' : sortDirection,
      userList: [],
    });
    pageSNum = 1;
    // pageENum = pageIndex;

    this.props.getUserList(
      pageSNum,
      pageENum,
      [],
      sortColumn,
      sortDirection,
      this.state.statusCode,
      this.state.keywordType,
      this.state.keyword,
      this.state.deptId,
      this.state.pstnId,
    );
  };

  // 트리 선택 화면

  getSelectNode = node => {
    this.setState({
      selectedNode: node,
    });
  };

  getSelectDept = id => {
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
    this.setState(
      {
        visible: false,
        [`${this.state.modalType}Name`]: this.state.selectedNode.NAME_KOR,
        [`${this.state.modalType}Id`]: this.state.selectedNode.key,
      },
      () => {
        pageSNum = 1;
        pageENum = pageIndex;
        this.props.getUserList(
          pageSNum,
          pageENum,
          [],
          this.state.sortColumnParam,
          this.state.sortDirectionParam,
          this.state.statusCode,
          this.state.keywordType,
          this.state.keyword,
          this.state.deptId,
          this.state.pstnId,
        );
      },
    );
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
      statusCode: 'C',
      keyword: '',
      keywordType: 'userNameKor',
      sortColumnParam: '',
      sortDirectionParam: '',
      deptId: 0,
      pstnId: 0,
      deptName: '',
      pstnName: '',
    });
  };

  render() {
    const { userList, history } = this.props;
    const initGrid = {
      USER_ID: null,
      sortColumnParam: this.state.sortColumnParam,
      sortDirectionParam: this.state.sortDirectionParam,
      statusCode: this.state.statusCode,
      keywordType: this.state.keywordType,
      keyword: this.state.keyword,
      deptId: this.state.deptId,
      pstnId: this.state.pstnId,
      deptName: this.state.deptName,
      pstnName: this.state.pstnName,
    };
    return (
      <div>
        <Modal
          title={this.state.modalTitle}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={400}
          bodyStyle={{ maxHeight: 400 }}
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
          <h3 className="pageTitle">{intlObj.get(messages.userManage)}</h3>
          <div className="searchBox">
            <Input
              placeholder={intlObj.get(messages.lblDeptPlaceholder)}
              name="deptName"
              value={this.state.deptName}
              onClick={() => this.showModal(intlObj.get(messages.titleUserDept), 'dept')}
              maxLength={200}
              id="dept"
              style={{ width: 200, marginRight: 10, float: 'left' }}
              readOnly
            />
            <Input
              placeholder={intlObj.get(messages.lblPSTNPlaceholder)}
              name="pstnName"
              value={this.state.pstnName}
              onClick={() => this.showModal(intlObj.get(messages.titleUserPSTN), 'pstn')}
              maxLength={200}
              id="pstn"
              style={{ width: 200, marginRight: 10, float: 'left' }}
              readOnly
            />
            <Select
              value={this.state.statusCode}
              onChange={this.handleStatusSelect}
              style={{ width: 120, marginRight: 10, float: 'left' }}
              dropdownStyle={{ fontSize: 13 }}
            >
              <Option value="C">{intlObj.get(messages.statusCdWork)}</Option>
              <Option value="D">{intlObj.get(messages.statusCdDispatch)}</Option>
              <Option value="H">{intlObj.get(messages.statusCdLeave)}</Option>
              <Option value="T">{intlObj.get(messages.statusCdRetired)}</Option>
              <Option value="">{intlObj.get(messages.lblAll)}</Option>
            </Select>

            {/* 오른쪽 */}
            <StyledButton className="btn-dark btn-sm init-search" onClick={this.initSearch} style={{ marginRight: '10px' }}>
              {intlObj.get(messages.initSearch)}
            </StyledButton>
            <Select value={this.state.keywordType} onChange={this.handleSelect} style={{ width: 120, marginRight: 10 }} dropdownStyle={{ fontSize: 13 }}>
              <Option value="userNameKor">{intlObj.get(messages.nameKor)}</Option>
              <Option value="userEmpNo">{intlObj.get(messages.titleUserEmpNo)}</Option>
              <Option value="deptName">{intlObj.get(messages.titleUserDept)}</Option>
              <Option value="pstnName">{intlObj.get(messages.titleUserPSTN)}</Option>
              <Option value="officeTel">{intlObj.get(messages.titleUserOfficeTel)}</Option>
            </Select>
            <div className="searchWrapper">
              <Input value={this.state.keyword} onChange={this.handleSearch} onKeyPress={this.handleKeyPress} placeholder={intlObj.get(messages.inputSearch)} />
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
            <StyledButton
              className="btn-primary"
              style={{ float: 'right' }}
              onClick={() => history.push({ pathname: '/admin/adminmain/account/userReg', state: initGrid })}
            >
              {intlObj.get(messages.lblReg)}
            </StyledButton>
          </div>
        </StyleUserList>
        <Footer />
      </div>
    );
  }
}

UserList.propTypes = {
  getUserList: PropTypes.func, //eslint-disable-line
  userList: PropTypes.array, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line

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

const mapDispatchToProps = dispatch => ({
  getUserList: (sNum, eNum, userList, sortColumn, sortDirection, statusCode, keywordType, keyword, deptId, pstnId) =>
    dispatch(actionTypes.getUserList(sNum, eNum, userList, sortColumn, sortDirection, statusCode, keywordType, keyword, deptId, pstnId)),

  getChangeDeptTreeData: DEPT_ID => dispatch(actionTypes.getChangeDeptTreeData(DEPT_ID)),
  getDeptComboData: () => dispatch(actionTypes.getDeptComboData()),
  getChangeDutyTreeData: DUTY_ID => dispatch(actionTypes.getChangeDutyTreeData(DUTY_ID)),
  getDutyComboData: () => dispatch(actionTypes.getDutyComboData()),
  getChangePSTNTreeData: PSTN_ID => dispatch(actionTypes.getChangePSTNTreeData(PSTN_ID)),
  getPSTNComboData: () => dispatch(actionTypes.getPSTNComboData()),
  getChangeRANKTreeData: RANK_ID => dispatch(actionTypes.getChangeRANKTreeData(RANK_ID)),
  getRANKComboData: () => dispatch(actionTypes.getRANKComboData()),
});

const mapStateToProps = createStructuredSelector({
  userList: selectors.makeSelectUserList(),

  comboData: selectors.makeSelectComboData(),
  treeData: selectors.makeTreeData(),
  isLoading: selectors.makeIsLoading(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'UserList', saga });
const withReducer = injectReducer({ key: 'UserList', reducer });

export default compose(withReducer, withSaga, withConnect)(UserList);
