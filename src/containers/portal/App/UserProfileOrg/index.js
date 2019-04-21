import React, { Component } from 'react';
import Modal from 'react-modal';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { intlObj, lang } from 'utils/commonUtils';
import LayoutWrapper from '../../components/Organization/utils/layoutWrapper';
import injectReducer from '../../../../utils/injectReducer';
import reducer from './reducer';
import injectSaga from '../../../../utils/injectSaga';
import saga from './saga';
import UserTree from './userTree';
import UserGrid from './userGrid';
import * as constantsType from './constants';
import basicStyle from '../../../../config/basicStyle';
import {
  makeTreeData, makeUsers, makeOrganizationSearchResult,
  makeOrganizationData, makeSelectEmptyRowsView, makeLoadProfile,
} from './selectors';
import {
  getTreeData,
  getUsers, getUser, getOrganizationUser,
  getOrganizationData, getChangeTreeData,
  closeModalInit, loadingGridData, loadProfileData,
} from './actions';
import StyleModal from '../../components/Modal/StyleModal';
import StyleUserProfileOrg from './StyleUserProfileOrg';
import { BtnDkGray } from '../../components/uielements/buttons.style';
import Input from '../../../../components/Input';
import Profile from './profile';
const { rowStyle, colStyle, gutter } = basicStyle;
import messages from './messages';

class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      selected: 0,
      keyword: '',
      selectedusers: [],
      complete: false,
      // 조직도 우측의 선택된 구성원 정보
      selectedUser: {},
      checkDept: [],
      checkedDept: [],
      selectedGrp: [],
      all: false,

      // 조직도 Tab 변경시 Input 태그 초기화 시 필요
      isTabChange: false,
      typeTabChange: '',

      // 검색 시 필요한 COMP_CD 값
      compCd: 0,

      // 검색어, 무한 스크롤 때 필요한 검색된 검색어
      keyword: '',
      keywordSearched: '',
      compCdSearched: 0,

      // 각 Grid별 현재 스크롤바의 높이
      scrollTop: 0,

      // Grid 무한 스크롤
      scrollTopFlag: false,

      // 무한 스크롤 시 필요한 loadingCount
      loadingCountTree: 1,
      loadingCountSearch: 1,

      // 트리로 보내줄 데이터 2개
      selectedUserDeptName: lang.get('DEPT_NAME', this.props.userProfile),
      selectedUserDeptId: this.props.selectedUserDeptId,
    };

    this.organizationUserSearch = this.organizationUserSearch.bind(this);
    this.changeInputKeyword = this.changeInputKeyword.bind(this);
    this.changeTreeData = this.changeTreeData.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.selectedProfileTree = this.selectedProfileTree.bind(this);
  }

  componentWillMount() {
    const {
      userProfile,
    } = this.props;

    const {
      handleGetTreeData,
      handleGetOrganizationData,
      handleLoadProfileData,
    } = this.props;

    // 1. 조직도 트리 데이터 로딩
    handleGetTreeData();
    // 2. 조직도 트리 위의 회사 선택 selectBox 데이터 로딩
    handleGetOrganizationData();
    // 3. 조직도 우측 프로필 화면에 표시될 사용자 데이터 로딩
    handleLoadProfileData(userProfile.USER_ID);
  }

  componentWillReceiveProps(nextProps) {
    const {
      show,
      loadProfile,
      organizationData, // 조직도 좌측 selectBox List
      handleLoadProfileData
    } = this.props;

    // 조직도 켜졌을 경우
    if (show !== nextProps.show && nextProps.show === true) {
      handleLoadProfileData(nextProps.userProfile.USER_ID);
    }
    if (loadProfile !== nextProps.loadProfile) {
      if (nextProps.loadProfile.FULL_PATH !== " " && organizationData.length > 0) {
        let fPath = nextProps.loadProfile.FULL_PATH.split("|");
        let comp = fPath[0];
        let deptCd = [];
        
        this.props.organizationData.map(a => deptCd.push(a.DEPT_ID));
        let deptIdx = deptCd.findIndex(t => t + '' === comp);

        if (!nextProps.loadProfile.isSearch) {
          this.props.handleGetUsers(nextProps.loadProfile.DEPT_ID);
          this.setState({
            selectedUserDeptName: lang.get('DEPT_NAME', nextProps.loadProfile),
            selectedUserDeptId: `${nextProps.loadProfile.DEPT_ID}`,
            selectedDept: comp,
            compCd: this.props.organizationData[deptIdx].COMP_CD
          });
          // 조직도 좌측 트리를 다시 그려줄 함수
          this.props.handleGetChangeTreeData(comp);
        }
      }
    }
  }

  closeModal() {
    this.props.closeModalInit();
    this.props.closeModal();

    this.setState({
      selectedUserDeptId: this.props.userProfile.DEPT_ID,
      scrollTop: 0,
      loadingCountTree: 1,
      loadingCountSearch: 1,
    });
  }

  // 조직도 우측 사용자 프로필 화면에서 프로필사진 옆의 부서 클릭 시 트리를 변경시켜 줄 콜백 함수
  selectedProfileTree(name, path, fpath) {
    this.props.handleGetChangeTreeData(fpath);
    this.props.handleGetUsers(path);

    let deptCd = [];

    this.props.organizationData.map(a => deptCd.push(a.DEPT_ID));
    let deptIdx = deptCd.findIndex(t => t + '' === fpath);

    this.setState({
      selectedUserDeptId: path,
      selectedUserDeptName: name,
      selectedDept: fpath,
      compCd: this.props.organizationData[deptIdx].COMP_CD
    });
  }

  changeTreeData = (data) => {
    const { handleGetChangeTreeData, organizationData } = this.props;
    const deptId = parseInt(data);
    const compCd = organizationData[organizationData.findIndex(data => data.DEPT_ID === deptId)].COMP_CD;

    
    // 선택한 부서 및 회사 변경하기
    this.setState({
      selectedDept: deptId,
      compCd: compCd,
    }, () => {
      // 검색창 초기화
      this.searchInputUser.firstChild.value = '';
      // 트리 변경하기
      handleGetChangeTreeData(deptId);
    });
  }


  // 조직도 그리드의 한 구성원을 선택했을 때, 조직도 우측에 선택한 구성원의 정보를 표시해줌
  loadSelectedUser = (selectedUser) => {
    this.setState({
      selectedUser,
    });
  }

  // 검색
  organizationUserSearch = () => {
    const { selected } = this.state;
    const { handleGetOrganizationUser, organizationData } = this.props;
    const { compCd, keyword, keywordSearched } = this.state;

    let compCdResult = compCd;
    if (compCdResult === 0) {
      compCdResult = organizationData[0].COMP_CD;
    }

    handleGetOrganizationUser(keyword, compCdResult, selected);

    this.setState({
      keywordSearched: keyword,
      compCdSearched: compCdResult,
      keywordSearched: keyword,
      compCdSearched: compCdResult,
      loadingCountSearch: 1,
      scrollTopFlag: true,
    });
  }

  // 검색(엔터 이벤트)
  changeInputKeyword = (e) => {
    const { handleGetOrganizationUser, organizationData } = this.props;
    const { selected } = this.state;
    const { compCd, keyword, keywordSearched } = this.state;

    let compCdResult = compCd;
    if (compCdResult === 0) {
      compCdResult = organizationData[0].COMP_CD;
    }

    if (e.target.name === 'searchInput' && e.keyCode === 13) {
      handleGetOrganizationUser(e.target.value.trim(), compCdResult, selected);

      this.setState({
        keyword: e.target.value,
        keywordSearched: e.target.value,
        compCdSearched: compCdResult,
        loadingCountSearch: 1,
        scrollTopFlag: true,
      });

    } else {
      this.setState({
        keyword: e.target.value,
      });
    }
  }

    // 사용자 검색 후 검색창 초기화
    initializeSearchInput = () => {
      this.searchInputUser.firstChild.value = '';
    }
  
  // 탭 변경 시 Grid 스크롤바 높이 유지
  setScrollTop = (scrollTop, selected) => {
    this.setState({
      scrollTop: scrollTop,
    });
  }

  // Grid의 무한 스크롤링을 위한 함수들
  setSelectedIdAndCount = (id, type) => {
    this.setState({
      selectedUserDeptId: id,
      loadingCountTree: 1,
      scrollTopFlag: true,
      scrollTop: 0,
    });
  }

  backScrollTopFlag = (type) => {
    this.setState({
      scrollTopFlag: false,
    });
  }

  updateLoadingCount = (selected, type) => {
    if (type === constantsType.TREE) {
      this.setState({
        loadingCountTree: this.state.loadingCountTree + 1,
      });
    } else {
      this.setState({
        loadingCountSearch: this.state.loadingCountSearch + 1,
      });
    }
  }

  render() {
    const customstyle = {
      content: {
        width: 1200,
        height: 650,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
    };

    // 조직도
    const {
      // data
      treeData,
      organizationData,
      selectedDept,
      emptyRowsView,
      organizationSearchResult,
    } = this.props;

    // 사용자 목록
    const {
      // data
      users,
      // func
      handleGetUsers,
      handleGetUser,
      changeTreeData,

      // 무한 스크롤
      handleLoadingGridData,
      handleLoadingOrganizationUser,

      userProfile,
    } = this.props;

    const {
      scrollTopFlag,
      selectedUserDeptName,
      selectedUserDeptId,
      loadingCountTree,
      loadingCountSearch,
      keywordSearched,
      selected,
      compCdSearched,
      scrollTop,
    } = this.state;

    const loadingGridDataFunctions = {
      updateLoadingCount: this.updateLoadingCount,
      backScrollTopFlag: this.backScrollTopFlag,
      loadingOrganizationUser: handleLoadingOrganizationUser,
    };

    return (
      <LayoutWrapper>
        <Modal
          isOpen={this.props.show}
          onRequestClose={this.closeModal}
          contentLabel="SearchTree"
          style={customstyle}
          shouldCloseOnOverlayClick={false}
          ariaHideApp={false}
          portalClassName="portalCommonModal"
        >
          <StyleModal className="modalWrapper">
            <h2 className="modalTitle">
              {intlObj.get(messages.organization)}
              <Button className="modalClose" onClick={this.closeModal} title={intlObj.get(messages.closeModal)} />
            </h2>
            <StyleUserProfileOrg className="modalContents memberSearch">
              <Row style={rowStyle} gutter={gutter} className="orgActivityInnerBody">
                <Col xl={16} style={colStyle} className="leftActivity">
                  <UserTree
                    treeData={treeData}
                    getUsers={handleGetUsers}
                    organizationData={organizationData}
                    selectedDept={this.state.selectedDept ? this.state.selectedDept : selectedDept}
                    getOrganizationData={getOrganizationData}
                    changeTreeData={this.changeTreeData}
                    initializeSearchInput={this.initializeSearchInput}
                    changeEmptyView={this.changeEmptyView}
                    setSelectedIdAndCount={this.setSelectedIdAndCount}

                    // 선택된 구성원이 속한 부서를 트리에 표시해 주기 위한 상태값
                    selectedUserDeptId={selectedUserDeptId}
                    selectedUserDeptName={selectedUserDeptName}
                  />
                  <div className="userGridResult">
                    <div className="userSearch">
                      <div className="inputWrapper" ref={ref => this.searchInputUser = ref}>
                        <Input
                          placeholder={intlObj.get(messages.inputKeyowrd)}
                          onKeyUp={this.changeInputKeyword}
                          name='searchInput'
                        />
                        <Button className="searchButton" title={intlObj.get(messages.search)} onClick={this.organizationUserSearch} />
                      </div>
                    </div>
                    <UserGrid
                      users={users}
                      loadSelectedUser={this.loadSelectedUser}
                      organizationSearchResult={organizationSearchResult}
                      emptyRowsView={emptyRowsView}
                      loadingGridData={handleLoadingGridData}
                      selectedId={selectedUserDeptId}
                      updateLoadingCount={this.updateLoadingCount}
                      scrollTopFlag={scrollTopFlag}
                      backScrollTopFlag={this.backScrollTopFlag}
                      loadingCountTree={loadingCountTree}
                      loadingCountSearch={loadingCountSearch}
                      keywordSearched={keywordSearched}
                      selected={selected}
                      compCdSearched={compCdSearched}
                      scrollTop={scrollTop}
                      loadingGridDataFunctions={loadingGridDataFunctions}
                      setScrollTop={this.setScrollTop}
                    />
                  </div>
                </Col>
                <Col xl={8} style={colStyle} className="rightActivity" >
                  <Profile
                    userProfile={this.props.userProfile}
                    selectedUser={this.state.selectedUser}
                    loadProfile={this.props.loadProfile}
                    selectedProfileTree={this.selectedProfileTree}
                  />
                </Col>
              </Row>
            </StyleUserProfileOrg>
            <div className="modalFooter">
              <BtnDkGray className="mainBtn" onClick={this.closeModal}>{intlObj.get(messages.confirm)}</BtnDkGray>
            </div>
          </StyleModal>
        </Modal>
      </LayoutWrapper>
    );
  }
}

Organization.propTypes = {
  treeData: PropTypes.array, //eslint-disable-line
  organizationData: PropTypes.array, //eslint-disable-line
  users: PropTypes.array, //eslint-disable-line
  organizationSearchResult: PropTypes.array.isRequired,
  emptyRowsView: PropTypes.func.isRequired,
  handleGetTreeData: PropTypes.func, //eslint-disable-line
  handleGetOrganizationData: PropTypes.func, //eslint-disable-line
  handleGetUsers: PropTypes.func, //eslint-disable-line
  handleGetChangeTreeData: PropTypes.func, //eslint-disable-line
  handleGetUser: PropTypes.func, //eslint-disable-line
  handleGetOrganizationUser: PropTypes.func.isRequired,
  handleLoadingGridData: PropTypes.func.isRequired,
  handleLoadingOrganizationUser: PropTypes.func.isRequired,
  closeModalInit: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  // 구성원 즐겨찾기 위젯에서
  userProfile: PropTypes.object.isRequired,
  selectedUserDeptId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};


export function mapDispatchToProps(dispatch) {
  return {
    // 조직도
    handleGetTreeData: () => dispatch(getTreeData()),
    handleGetChangeTreeData: deptId => dispatch(getChangeTreeData(deptId)),
    // 구성원 법인 리스트
    handleGetOrganizationData: () => dispatch(getOrganizationData()),

    // 사용자
    handleGetUsers: data => dispatch(getUsers(data)),

    // 사용자 목록
    handleGetUser: empno => dispatch(getUser(empno)),

    // 조직도 검색
    handleGetOrganizationUser: (keyword, compCd, selected) => dispatch(getOrganizationUser(keyword, compCd, selected)),
    closeModalInit: () => dispatch(closeModalInit()),

    // 조직도 우측 사용자 프로필 데이터 로딩해오는 함수
    handleLoadProfileData: id => dispatch(loadProfileData(id)),

    // 검색결과 추가 데이터 로딩 작업
    handleLoadingOrganizationUser: (keyword, page, compCd, selected) => dispatch(loadingOrganizationUser(keyword, page, compCd, selected)),
    handleLoadingGridData: (data, page) => dispatch(loadingGridData(data, page)),
  };
}

const mapStateToProps = createStructuredSelector({
  // 조직도
  treeData: makeTreeData(),
  // 사용자 목록
  users: makeUsers(),
  organizationSearchResult: makeOrganizationSearchResult(),
  // 법인목록
  organizationData: makeOrganizationData(),
  // emptyRowsView
  emptyRowsView: makeSelectEmptyRowsView(),
  // 사용자의 프로필 정보
  loadProfile: makeLoadProfile(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'prof', reducer });
const withSaga = injectSaga({ key: 'prof', saga });

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(Organization);