import React, { Component } from 'react';
import Modal from 'react-modal';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button, Row, Col } from 'antd';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import PropTypes from 'prop-types';
import { intlObj, lang as language } from 'utils/commonUtils';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import basicStyle from 'config/basicStyle';
import StyleModal from 'containers/portal/components/Modal/StyleModal';
import Input from 'components/Input';
import { BtnDkGray, BtnLgtGray } from 'containers/portal/components/uielements/buttons.style';
import SelectedUser from './selecteduser';
import reducer from './reducer';
import saga from './saga';
import Tree from './tree';
import Grid from './grid';
import Profile from './profile';
import * as constantsType from './constants';
import * as selectors from './selectors';
import * as actions from './actions';
import messages from './messages';

const { colStyle, gutter } = basicStyle;

// 트리에서 선택한 데이터(부서, 직위, 직책, 가상그룹)를 임시로 저장할 변수
let deptList = [];
let grpList = [];
let pstnList = [];
let dutyList = [];

/*
  1. profile 조직도
  2. 접속한 사용자의 profile
   - EMP_NO 없을 때?
  3. 탭 종류 => 탭없이
  4. 반응형
  5. 모바일 => 모바일에서는 안쓸듯
*/

class Organization extends Component {
  constructor(props) {
    super(props);
    console.log(props.orgName, 'constructor******');

    const {
      userTab,
      pstnTab,
      dutyTab,
      grpTab,
      isTab,
      // handleGetTreeData,
      handleGetPstnTreeData,
      handleGetDutyTreeData,
      handleGetGrpTreeData,
      handleGetOrganizationData,
      handleGetOrganizationPstnData,
      handleGetOrganizationDutyData,
      handleGetOrganizationGrpData,
      // isProfile,
      handleGetProfileData,
      // userProfile,

      handleGetFirstDeptUser,
      handleGetTreeDataForProfile,
      handleSetLocale,
      lang,
      deptId,
      userId,
    } = props;

    // 사용자데이터 다국어처리를 위한 언어 설정 변경
    language.setLang(language.translator[lang]);
    // messages 다국어처리를 위한 언어 설정 변경
    handleSetLocale(lang);

    // 차후 다국어 처리
    const tabLabel = [
      ['구성원', '@구성원', '@@구성원', '@@@구성원', '@@@@구성원'],
      ['직위', '@직위', '@@직위', '@@@직위', '@@@@직위'],
      ['직책', '@직책', '@@직책', '@@@직책', '@@@@직책'],
      ['가상그룹', '@가상그룹', '@@가상그룹', '@@@가상그룹', '@@@@가상그룹'],
    ];
    const tabArr = [];
    const tabType = {};
    let tabIndex = 0;

    if (!isTab) {
      handleGetTreeDataForProfile(Number(deptId));
      handleGetOrganizationData();
      tabArr.push(tabLabel[0]);
      tabType[tabIndex] = 'user';
      tabIndex += 1;
    } else if (!(userTab || pstnTab || dutyTab || grpTab)) {
      handleGetTreeDataForProfile(Number(deptId));
      handleGetOrganizationData();
      tabArr.push(tabLabel[0]);
      tabType[tabIndex] = 'user';
      tabIndex += 1;
    } else {
      if (userTab) {
        handleGetTreeDataForProfile(Number(deptId));
        handleGetOrganizationData();
        tabArr.push(tabLabel[0]);
        tabType[tabIndex] = 'user';
        tabIndex += 1;
      }

      if (pstnTab) {
        handleGetPstnTreeData();
        handleGetOrganizationPstnData();
        tabArr.push(tabLabel[1]);
        tabType[tabIndex] = 'pstn';
        tabIndex += 1;
      }

      if (dutyTab) {
        handleGetDutyTreeData();
        handleGetOrganizationDutyData();
        tabArr.push(tabLabel[2]);
        tabType[tabIndex] = 'duty';
        tabIndex += 1;
      }

      if (grpTab) {
        handleGetGrpTreeData();
        handleGetOrganizationGrpData();
        tabArr.push(tabLabel[3]);
        tabType[tabIndex] = 'grp';
        tabIndex += 1;
      }
    }

    if (userId) {
      // query string에 USER_ID가 포함되어 있는 경우
      handleGetProfileData(Number(userId));
    } else {
      // query string에 USER_ID가 없는 경우 DEPT_ID를 보내 해당 부서의 첫 번째 구성원의 프로필 정보를 받아온다.
      handleGetFirstDeptUser(Number(deptId));
    }

    this.state = {
      reset: false,

      // 트리의 검색어
      searchString: undefined,
      searchStringPstn: undefined,
      searchStringDuty: undefined,
      searchStringGrp: undefined,

      // 현재 선택된 탭 (구성원: 0, 직위: 1, 직책: 2, 가상그룹: 3)
      selected: 0,

      // 선택 목록에 선택된 구성원, 부서, 가상그룹, 직위, 직책
      // 초기값을 undefined로 해주는 이유 : componentDidUpdate에서 아래의 값들이 undefiend일 때만
      // 바닥에서 가져오는 데이터들을 state로 저장해주기 위함.
      // 초기화 함수에서도 해당 값들을 undefined로 setState 해줘야 함
      selectedusers: undefined,
      checkedDept: undefined,
      selectedGrp: undefined,
      checkedPstn: undefined,
      checkedDuty: undefined,

      // 예전꺼..
      // selectedusers: props.selectedUsers && props.selectedUsers.size !== 0
      //   ? props.selectedUsers : [],
      // checkedDept: props.checkedDept ? props.checkedDept : [],
      // selectedGrp: props.checkedGrp ? props.checkedGrp : [],
      // checkedPstn: props.checkedPstn ? props.checkedPstn : [],
      // checkedDuty: props.checkedDuty ? props.checkedDuty : [],

      complete: false,
      users: [],
      checkDept: [],
      checkgrp: [],
      checkpstn: [],
      checkduty: [],
      checkAll: false,
      tabType,
      tabArr,

      // 조직도 Tab 변경시 Input 태그 초기화 시 필요
      isTabChange: false,

      // Grid 무한 스크롤
      selectedIdForDuty: 0,
      scrollTopFlagForDuty: false,

      selectedIdForPstn: 0,
      scrollTopFlagForPstn: false,

      selectedIdForGrp: 0,
      scrollTopFlagForGrp: false,

      scrollTopFlag: false,

      // 무한 스크롤 시 필요한 loadingCount
      loadingCountTree: 1,
      loadingCountTreeForPstn: 1,
      loadingCountTreeForDuty: 1,
      loadingCountTreeForGrp: 1,

      loadingCountSearch: 1,
      loadingCountSearchForPstn: 1,
      loadingCountSearchForDuty: 1,

      // 검색 시 필요한 COMP_CD 값
      compCd: 0,
      compCdForPstn: 0,
      compCdForDuty: 0,

      // 검색어, 무한 스크롤 때 필요한 검색된 검색어
      keyword: '',
      keywordSearched: '',
      compCdSearched: 0,

      keywordForPstn: '',
      keywordSearchedForPstn: '',
      compCdSearchedForPstn: 0,

      keywordForDuty: '',
      keywordSearchedForDuty: '',
      compCdSearchedForDuty: 0,

      // 각 Grid별 현재 스크롤바의 높이
      scrollTop: 0,
      scrollTopForPstn: 0,
      scrollTopForDuty: 0,
      scrollTopForGrp: 0,

      isDragged: false,
      isDraggedEnd: true,

      // 가상그룹 트리의 selectbox에 선택되어진 SITE_ID 값
      // 1. 트리 클릭 시 해당 가상그룹의 구성원 목록을 그리드에 뿌려줄 때 사용
      // 2. 트리 클릭 상태에서 그리드 무한 스크롤 시, 추가 구성원 목록을 가져올 떄 사용
      selectedGrpDept: undefined,
    };
  }

  shouldComponentUpdate(nextProps) {
    const { treeData, pstnTreeData, dutyTreeData, grpTreeData, organizationData, organizationPstnData, organizationDutyData, isProfile, profile } = nextProps;

    // 생성자에서 각 탭별 treeData를 가져오는 액션을 발행하는데, 이 액션들의 결과 값들이 하나하나 속성에
    // 전달될 때 마다 리랜더링이 일어남. 이를 최적화 하기 위해 모두 들어왔을 때 렌더링 실행
    if (
      (treeData.length !== 0 && organizationData.length !== 0) ||
      (pstnTreeData.length !== 0 && organizationPstnData.length !== 0) ||
      (dutyTreeData.length !== 0 && organizationDutyData.length !== 0) ||
      grpTreeData.length !== 0
    ) {
      if (!isProfile) {
        return true;
      }
      if (profile) {
        return true;
      }
      return false;
    }
    return false;
  }

  getTab = () => {
    // 조직도
    const {
      organizationData,
      organizationPstnData,
      organizationDutyData,
      organizationGrpData,
      organizationSearchResult,
      organizationSearchResultForPstn,
      organizationSearchResultForDuty,
      checkboxInitialize,
      handleInitializeCheckbox,
      emptyRowsView,
      emptyRowsViewForPstn,
      emptyRowsViewForDuty,
      emptyRowsViewForGrp,
      selectedIndex,
      selectedGrpIndex,
      selectedPstnIndex,
      selectedDutyIndex,
      selectedId,

      // selectedGrpDept 빼고는 사용 안하는듯..
      // selectedGrpDept 역시 props가 아니라 state로 사용
      selectedDept,
      selectedPstnDept,
      selectedDutyDept,
      // selectedGrpDept,
    } = this.props;

    // 사용자 목록
    const {
      // data
      treeData,
      pstnTreeData,
      dutyTreeData,
      grpTreeData,
      users,
      // user,
      grpUsers,
      pstnUsers,
      dutyUsers,
      // func
      handleGetUsers,
      handleGetGrpUsers,
      handleGetPstnUsers,
      handleGetDutyUsers,

      // 무한 스크롤
      handleLoadingGridDataDuty,
      handleLoadingGridDataPstn,
      handleLoadingGridDataGrp,
      handleLoadingGridData,
      handleLoadingOrganizationUser,

      handleSetSelectedIndex,
      handleSetSelectedUserDeptName,

      isTab,
      isTreeCheckbox,
      isProfile,

      selectedUserDeptName,

      // 그리드에 전달될 콜백
      // isProfile = true 일 때, 그리드의 구성원 클릭 이벤트
      handleLoadProfileData,

      siteId,
      siteIdParam,
    } = this.props;

    const {
      // selectedId,
      scrollTopFlag,
      selectedIdForDuty,
      scrollTopFlagForDuty,
      selectedIdForPstn,
      scrollTopFlagForPstn,
      selectedIdForGrp,
      scrollTopFlagForGrp,
      loadingCountTree,
      loadingCountTreeForPstn,
      loadingCountTreeForDuty,
      loadingCountTreeForGrp,
      loadingCountSearch,
      loadingCountSearchForPstn,
      loadingCountSearchForDuty,
      selected,

      // 검색
      keywordSearched,
      compCdSearched,

      keywordSearchedForPstn,
      compCdSearchedForPstn,

      keywordSearchedForDuty,
      compCdSearchedForDuty,

      scrollTop,
      scrollTopForPstn,
      scrollTopForDuty,
      scrollTopForGrp,

      tabType,
      reset,

      searchString,
      searchStringPstn,
      searchStringDuty,
      searchStringGrp,

      selectedGrpDept,
    } = this.state;

    const loadingGridDataFunctions = {
      updateLoadingCount: this.updateLoadingCount,
      backScrollTopFlag: this.backScrollTopFlag,
      loadingOrganizationUser: handleLoadingOrganizationUser,
    };
    const content = [];

    if (tabType[content.length] === 'user') {
      /* eslint-disable */
      content.push(
        <div className="members" key={content.length}>
          <Tree
            initializeSearchInput={this.initializeSearchInput}
            setSelectedIdAndCount={this.setSelectedIdAndCount}
            isTreeCheckbox={isProfile ? false : isTreeCheckbox}
            reset={reset}
            setSearchString={this.setSearchString}
            treeData={treeData}
            getUsers={handleGetUsers}
            loadSelected={this.loadSelectedDept}
            organizationData={organizationData}
            selectedDept={selectedDept}
            changeTreeData={this.changeTreeData}
            getSaveTree={this.getSaveTree}
            selectedIndex={selectedIndex}
            treeType='user'
            searchString={searchString}
            isTab={isTab}
            handleSetSelectedUserDeptName={handleSetSelectedUserDeptName}
            // isProfile = true 일 경우
            isProfile={isProfile}
            selectedUserDeptName={isProfile ? selectedUserDeptName : undefined}
            handleSetSelectedIndex={handleSetSelectedIndex}
          />
          <div className={isTab === false ? 'userGridResult userGridResultNoTab' : 'userGridResult'}>
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
            <Grid
              users={users}
              organizationSearchResult={organizationSearchResult}
              emptyRowsView={emptyRowsView}
              loadingGridData={handleLoadingGridData}
              selectedId={selectedId}
              loadingCountTree={loadingCountTree}
              loadingCountSearch={loadingCountSearch}
              loadingGridDataFunctions={loadingGridDataFunctions}
              selected={selected}
              tabType={tabType}
              scrollTopFlag={scrollTopFlag}
              scrollTop={scrollTop}
              setScrollTop={this.setScrollTop}

              loadSelected={this.loadSelected}
              checkboxInitialize={checkboxInitialize}
              handleInitializeCheckbox={handleInitializeCheckbox}
              keywordSearched={keywordSearched}
              compCdSearched={compCdSearched}
              isProfile={isProfile}
              gridType={'user'}
              isTab={isTab}
              loadProfileData={handleLoadProfileData}
              loadSelectedUser={this.loadSelectedUser}
              selectedIndex={selectedIndex}
            />
          </div>
        </div>
      );
      /* eslint-disable */
    }

    if (tabType[content.length] === 'pstn') {
      content.push(
        <div className="pstn" key={content.length}>
          <Tree
            // 공통 속성
            isTreeCheckbox={isProfile ? false : isTreeCheckbox}
            reset={reset}
            initializeSearchInput={this.initializeSearchInput}
            setSelectedIdAndCount={this.setSelectedIdAndCount}
            handleSetSelectedUserDeptName={handleSetSelectedUserDeptName}

            // 탭별 상이한 속성
            treeData={pstnTreeData}
            getUsers={handleGetPstnUsers}
            loadSelected={this.loadSelectedPstn}
            organizationData={organizationPstnData}
            selectedDept={selectedPstnDept}
            changeTreeData={this.changePstnTreeData}
            getSaveTree={this.getSavePstnTree}
            selectedIndex={selectedPstnIndex}
            treeType='pstn'
            searchString={searchStringPstn}
            handleSetSelectedIndex={handleSetSelectedIndex}
            setSearchString={this.setSearchString}
            isTab={isTab}
            isProfile={isProfile}
          />
          <div className="userGridResult">
            <div className="userSearch">
              <div className="inputWrapper" ref={ref => this.searchInputPstn = ref}>
                <Input placeholder={intlObj.get(messages.inputKeyowrd)} onKeyUp={this.changeInputKeyword} name='searchInput' />
                <Button className="searchButton" title={intlObj.get(messages.search)} onClick={this.organizationUserSearch} />
              </div>
            </div>
            <Grid
              // 공통
              loadingGridDataFunctions={loadingGridDataFunctions}
              loadSelected={this.loadSelected}
              checkboxInitialize={checkboxInitialize}
              handleInitializeCheckbox={handleInitializeCheckbox}
              isProfile={isProfile}
              selected={selected}
              tabType={tabType}
              setScrollTop={this.setScrollTop}
              scrollTopFlag={scrollTopFlagForPstn}
              scrollTop={scrollTopForPstn}

              // 개별
              users={pstnUsers}
              organizationSearchResult={organizationSearchResultForPstn}
              emptyRowsView={emptyRowsViewForPstn}
              loadingGridData={handleLoadingGridDataPstn}
              selectedId={selectedIdForPstn}
              loadingCountTree={loadingCountTreeForPstn}
              loadingCountSearch={loadingCountSearchForPstn}
              keywordSearched={keywordSearchedForPstn}
              compCdSearched={compCdSearchedForPstn}
              gridType={'pstn'}
              isTab={isTab}
              selectedIndex={selectedPstnIndex}
              loadProfileData={handleLoadProfileData}
              loadSelectedUser={this.loadSelectedUser}
            />
          </div>
        </div>
      );
    }

    if (tabType[content.length] === 'duty') {
      content.push(
        <div className="duty" key={content.length}>
          <Tree
            // 공통 속성
            isTreeCheckbox={isProfile ? false : isTreeCheckbox}
            reset={this.state.reset}
            initializeSearchInput={this.initializeSearchInput}
            setSelectedIdAndCount={this.setSelectedIdAndCount}
            setSearchString={this.setSearchString}
            handleSetSelectedUserDeptName={handleSetSelectedUserDeptName}

            // 탭별 상이한 속성
            treeData={dutyTreeData}
            getUsers={handleGetDutyUsers}
            loadSelected={this.loadSelectedDuty}
            organizationData={organizationDutyData}
            selectedDept={selectedDutyDept}
            changeTreeData={this.changeDutyTreeData}
            getSaveTree={this.getSaveDutyTree}
            selectedIndex={selectedDutyIndex}
            treeType='duty'
            searchString={searchStringDuty}
            handleSetSelectedIndex={handleSetSelectedIndex}
            isTab={isTab}
            isProfile={isProfile}
          />
          <div className="userGridResult">
            <div className="userSearch">
              <div className="inputWrapper" ref={ref => this.searchInputDuty = ref}>
                <Input placeholder={intlObj.get(messages.inputKeyowrd)} onKeyUp={this.changeInputKeyword} name='searchInput' />
                <Button className="searchButton" title={intlObj.get(messages.search)} onClick={this.organizationUserSearch} />
              </div>
            </div>
            <Grid
              // 공통
              loadingGridDataFunctions={loadingGridDataFunctions}
              loadSelected={this.loadSelected}
              checkboxInitialize={checkboxInitialize}
              handleInitializeCheckbox={handleInitializeCheckbox}
              isProfile={isProfile}
              selected={selected}
              tabType={tabType}
              setScrollTop={this.setScrollTop}
              scrollTopFlag={scrollTopFlagForDuty}
              scrollTop={scrollTopForDuty}

              // 개별
              users={dutyUsers}
              organizationSearchResult={organizationSearchResultForDuty}
              emptyRowsView={emptyRowsViewForDuty}
              loadingGridData={handleLoadingGridDataDuty}
              selectedId={selectedIdForDuty}
              loadingCountTree={loadingCountTreeForDuty}
              loadingCountSearch={loadingCountSearchForDuty}
              keywordSearched={keywordSearchedForDuty}
              compCdSearched={compCdSearchedForDuty}
              gridType={'duty'}
              isTab={isTab}
              selectedIndex={selectedDutyIndex}
              loadProfileData={handleLoadProfileData}
              loadSelectedUser={this.loadSelectedUser}
            />
          </div>
        </div>
      );
    }

    if (tabType[content.length] === 'grp') {
      content.push(
        <div className="grp" key={content.length}>
          <Tree
            // 공통 속성
            isTreeCheckbox={isProfile ? false : isTreeCheckbox}
            reset={this.state.reset}
            setSelectedIdAndCount={this.setSelectedIdAndCount}
            setSearchString={this.setSearchString}
            handleSetSelectedUserDeptName={handleSetSelectedUserDeptName}

            // 탭별 상이한 속성
            treeData={grpTreeData}
            getUsers={handleGetGrpUsers}
            changeTreeData={this.changeGrpTreeData}
            loadSelected={this.loadSelectedGrp}
            getSaveTree={this.getSaveGrpTree}
            selectedIndex={selectedGrpIndex}
            organizationData={organizationGrpData}
            selectedDept={selectedGrpDept}
            treeType='grp'
            searchString={searchStringGrp}
            handleSetSelectedIndex={handleSetSelectedIndex}
            isTab={isTab}
            siteId={siteId}
            siteIdParam={siteIdParam}
            isProfile={isProfile}
          />
          <div className="userGridResult">
            <div className="userSearch">
              <div className="inputWrapper" ref={ref => this.searchInputGrp = ref}>
                <Input onKeyUp={this.changeInputKeyword} name='searchInput' disabled style={{ cursor: 'not-allowed' }} />
                <Button className="searchButton" style={{ cursor: 'not-allowed' }} />
              </div>
            </div>
            <Grid
              // 공통
              loadingGridDataFunctions={loadingGridDataFunctions}
              loadSelected={this.loadSelected}
              checkboxInitialize={checkboxInitialize}
              handleInitializeCheckbox={handleInitializeCheckbox}
              isProfile={isProfile}
              selected={selected}
              tabType={tabType}
              setScrollTop={this.setScrollTop}
              scrollTopFlag={scrollTopFlagForGrp}
              scrollTop={scrollTopForGrp}

              // 개별
              users={grpUsers}
              emptyRowsView={emptyRowsViewForGrp}
              loadingGridData={handleLoadingGridDataGrp}
              selectedId={selectedIdForGrp}
              loadingCountTree={loadingCountTreeForGrp}
              gridType={'grp'}
              isTab={isTab}
              selectedIndex={selectedGrpIndex}
              loadProfileData={handleLoadProfileData}
              loadSelectedUser={this.loadSelectedUser}

              siteId={siteId}
              siteIdParam={siteIdParam}
              selectedGrpDept={selectedGrpDept}
            />
          </div>
        </div>
      );
    }
    return content;
  };

  getSearchSet = (selected) => {
    const {
      compCd,
      compCdForPstn,
      compCdForDuty,
      keyword,
      keywordForPstn,
      keywordForDuty,
      keywordSearched,
      keywordSearchedForPstn,
      keywordSearchedForDuty,
    } = this.state;

    if (selected === 0) {
      return {
        compCd,
        keyword,
        keywordSearched,
      };
    } else if (selected === 1) {
      return {
        compCd: compCdForPstn,
        keyword: keywordForPstn,
        keywordSearched: keywordSearchedForPstn,
      };
    }

    return {
      compCd: compCdForDuty,
      keyword: keywordForDuty,
      keywordSearched: keywordSearchedForDuty,
    };
  };

  getSaveTree = (treeData, selectedIndex) => {
    const { handleGetSaveTree } = this.props;
    handleGetSaveTree(treeData, selectedIndex);
  };

  getSaveGrpTree = (treeData, selectedIndex) => {
    const { handleGetSaveGrpTree } = this.props;
    handleGetSaveGrpTree(treeData, selectedIndex);
  };

  getSavePstnTree = (treeData, selectedIndex) => {
    const { handleGetSavePstnTree } = this.props;
    handleGetSavePstnTree(treeData, selectedIndex);
  };

  getSaveDutyTree = (treeData, selectedIndex) => {
    const { handleGetSaveDutyTree } = this.props;
    handleGetSaveDutyTree(treeData, selectedIndex);
  };

  // 탭 변경 시 Grid 스크롤바 높이 유지
  setScrollTop = (scrollTop, selected) => {
    const { tabType } = this.state;
    const scrollTopNames = {
      user: 'scrollTop',
      pstn: 'scrollTopForPstn',
      duty: 'scrollTopForDuty',
      grp: 'scrollTopForGrp',
    };

    this.setState({
      [scrollTopNames[tabType[selected]]]: scrollTop,
    });
  };

  // 탭변경
  handleSelect = (key, label) => {
    const { tabArr, tabType } = this.state;
    let i = 0;

    tabArr.map((la, index) => la.map((l) => {
      if (l === label) {
        i = index;
        this.setState({ selected: index });
      }
    }
    ));

    const type = tabType[i];

    this.setState({
      users: [],
      checkDept: [],
      checkgrp: [],
      checkpstn: [],
      checkduty: [],
      isTabChange: true,
      typeTabChange: type,
      reset: true,
    });

    deptList = [];
    grpList = [];
    pstnList = [];
    dutyList = [];
  };

  setSearchInput = (selected) => {
    const {
      tabType,
      keywordSearched,
      keywordSearchedForPstn,
      keywordSearchedForDuty,
    } = this.state;

    switch (tabType[selected]) {
      case 'user':
        this.searchInputUser.firstChild.value = keywordSearched;
        break;
      case 'pstn':
        this.searchInputPstn.firstChild.value = keywordSearchedForPstn;
        break;
      case 'duty':
        this.searchInputDuty.firstChild.value = keywordSearchedForDuty;
        break;
      case 'grp':
        this.searchInputGrp.firstChild.value = '';
        break;
    }
  };

  sendAdd = () => {
    const { addCallback, isModal, item } = this.props;

    let copyusers = this.state.users.slice();

    let list = this.state.selectedusers.size === 0 ? [] : this.state.selectedusers;
    let copyselectedusers = this.state.selectedusers.slice();

    let checklist = [];
    let comparelist = [];
    let selectedDept = this.state.checkDept;
    let selectedGrp = this.state.checkgrp;
    let selectedPstn = this.state.checkpstn;
    let selectedDuty = this.state.checkduty;

    let copyselectedDept = '';
    let copyselectedPstn = '';
    let copyselectedDuty = '';
    let copyselectedGrp = '';

    // 그리드에 표시된 구성원들의 사번을 comparelist에 넣는다.
    copyusers.map(l => comparelist.push(l.EMP_NO));
    list.map(l => checklist.push(l.EMP_NO));

    if (checklist.length > 0) {
      for (let i = 0; i < copyselectedusers.length; i++) {
        var idx = copyusers.findIndex(t => t.EMP_NO === checklist[i]);
        if (idx !== -1) {
          copyusers.splice(idx, 1);
          comparelist.splice(idx, 1);
        }
      }
    }

    if (copyusers.length !== 0) {
      for (let i = 0; i < copyusers.length; i++) {
        list.push(copyusers[i]);
      }
      this.setState({ selectedusers: list, checkAll: false });
    }

    if (selectedDept !== undefined && selectedDept.length !== 0) {
      copyselectedDept = this.state.checkDept.slice();// Tree에서 Check 를 제거 했을 경우 바로 반영안되게 하기 위함
      this.setState({ checkedDept: copyselectedDept, checkAll: false, checkDept: [] });
    }

    if (selectedPstn !== undefined && selectedPstn.length !== 0) {
      copyselectedPstn = this.state.checkpstn.slice();
      this.setState({ checkedPstn: copyselectedPstn, checkAll: false });
    }

    if (selectedDuty !== undefined && selectedDuty.length !== 0) {
      copyselectedDuty = this.state.checkduty.slice();
      this.setState({ checkedDuty: copyselectedDuty, checkAll: false });
    }

    if (selectedGrp !== undefined && selectedGrp.length !== 0) {
      copyselectedGrp = this.state.checkgrp.slice();
      this.setState({ selectedGrp: copyselectedGrp, checkAll: false });
    }

    if (!isModal) {
      if (item) {
        addCallback({ users: list, dept: copyselectedDept, pstn: copyselectedPstn, duty: copyselectedDuty, grp: copyselectedGrp }, item);
      } else {
        addCallback({ users: list, dept: copyselectedDept, pstn: copyselectedPstn, duty: copyselectedDuty, grp: copyselectedGrp });
      }
    }

    // addCallback({ users: list, dept: copyselectedDept, pstn: copyselectedPstn, duty: copyselectedDuty, grp: copyselectedGrp });

    this.props.resetCheckbox();
    this.resetUsers();
  };

  resetUsers = () => {
    this.setState({
      users: [],
      checkDept: [],
      checkgrp: [],
      checkpstn: [],
      checkduty: [],
      reset: true,
    });
  };

  deleteAll = () => {
    const {
      deleteAllCallback,
      isModal,
      item,
    } = this.props;

    this.setState({
      selectedusers: [],
      checkedDept: [],
      checkedPstn: [],
      checkedDuty: [],
      selectedGrp: [],
    }, () => {
      if (!isModal) {
        if (item) {
          deleteAllCallback(item);
        } else {
          deleteAllCallback();
        }
      }
    });
  };

  sendDelete = (id, type) => {
    const {
      selectedusers,
      checkedDept,
      checkedPstn,
      checkedDuty,
      selectedGrp,
    } = this.state;

    const {
      deleteCallback,
      isModal,
      item,
    } = this.props;

    let deletedData = '';

    if (type === 'user') {
      deletedData = selectedusers.splice(selectedusers.findIndex(user => (
        user.USER_ID === id
      )), 1);

      this.setState({
        selectedusers
      }, () => {
        if (!isModal) {
          if (item) {
            deleteCallback(deletedData, item);
          } else {
            deleteCallback(deletedData);
          }
        }
      });
    } else if (type === 'dept') {
      deletedData = checkedDept.splice(checkedDept.findIndex(dept => (
        dept.id === id
      )), 1);

      this.setState({
        checkedDept
      }, () => {
        if (!isModal) {
          if (item) {
            deleteCallback(deletedData, item);
          } else {
            deleteCallback(deletedData);
          }
        }
      });
    } else if (type === 'pstn') {
      deletedData = checkedPstn.splice(checkedPstn.findIndex(pstn => (
        pstn.id === id
      )), 1);

      this.setState({
        checkedPstn
      }, () => {
        if (!isModal) {
          if (item) {
            deleteCallback(deletedData, item);
          } else {
            deleteCallback(deletedData);
          }
        }
      });
    } else if (type === 'duty') {
      deletedData = checkedDuty.splice(checkedDuty.findIndex(duty => (
        duty.id === id
      )), 1);

      this.setState({
        checkedDuty
      }, () => {
        if (!isModal) {
          if (item) {
            deleteCallback(deletedData, item);
          } else {
            deleteCallback(deletedData);
          }
        }
      });
    } else if (type === 'grp') {
      deletedData = selectedGrp.splice(selectedGrp.findIndex(grp => (
        grp.id === id
      )), 1);

      this.setState({
        selectedGrp
      }, () => {
        if (!isModal) {
          if (item) {
            deleteCallback(deletedData, item);
          } else {
            deleteCallback(deletedData);
          }
        }
      });
    }
  };

  dndChangePositionUser = (draggedEmpNo, EmpNo) => {
    const {
      selectedusers
    } = this.state;

    const index = selectedusers.findIndex(i => i.EMP_NO === draggedEmpNo);
    const afterIndex = selectedusers.findIndex(i => i.EMP_NO === EmpNo);

    let temp = selectedusers[index];
    let temp2 = selectedusers[afterIndex];

    let selectedusersCopy = selectedusers.slice();

    selectedusersCopy.splice(index, 1, temp2);
    selectedusersCopy.splice(afterIndex, 1, temp);

    this.setState({
      selectedusers: selectedusersCopy,
    });
  };

  dndChangePositionCallback = () => {
    const {
      dndChangePositionCallback,
      item,
    } = this.props;

    const {
      selectedusers,
      checkedDept,
      checkedPstn,
      checkedDuty,
      selectedGrp,
    } = this.state;

    if (item) {
      dndChangePositionCallback({
        users: selectedusers,
        dept: checkedDept,
        pstn: checkedPstn,
        duty: checkedDuty,
        grp: selectedGrp,
      }, item);
    } else {
      dndChangePositionCallback({
        users: selectedusers,
        dept: checkedDept,
        pstn: checkedPstn,
        duty: checkedDuty,
        grp: selectedGrp,
      });
    }
  };

  onSave = () => {
    const {
      selectedusers,
      checkedDept,
      checkedPstn,
      checkedDuty,
      selectedGrp,
    } = this.state;

    const { getDataFromOrganization } = this.props;

    const resultObj = {
      selectedUsers: selectedusers,
      checkedDept,
      checkedPstn,
      checkedDuty,
      checkedGrp: selectedGrp,
    };

    if (getDataFromOrganization) {
      getDataFromOrganization(resultObj);
    }

    this.setState({
      reload: true,
      reset: true
    });

    this.initializeSelectedList();
    this.props.closeModalInit();
    this.props.closeModal();
  };

  initializeSelectedList = () => {
    this.setState({
      users: [],
      selectedusers: undefined,
      checkDept: [],
      checkedDept: undefined,
      selectedGrp: undefined,
      checkgrp: [],
      checkedPstn: undefined,
      checkpstn: [],
      checkedDuty: undefined,
      checkduty: [],
    });

    deptList = [];
    grpList = [];
    pstnList = [];
    dutyList = [];
  };

  closeModal = () => {
    deptList = [];
    grpList = [];
    pstnList = [];
    dutyList = [];

    this.setState({
      reload: true,
      reset: true,
      selected: 0,

      users: [],
      checkDept: [],
      checkpstn: [],
      checkduty: [],
      checkgrp: [],
      
      selectedusers: undefined,
      checkedDept: undefined,
      checkedPstn: undefined,
      checkedDuty: undefined,
      selectedGrp: undefined,
    }, () => {
      this.props.closeModalInit();
      this.props.closeModal();
    });
  };

  initializeSearchInput = (type) => {
    switch (type) {
      case 'pstn':
        this.searchInputPstn.firstChild.value = '';
        break;
      case 'duty':
        this.searchInputDuty.firstChild.value = '';
        break;
      default:
        this.searchInputUser.firstChild.value = '';
        break;
    }
  };

  setIsDragged = () => {
    const {
      isDragged,
    } = this.state;

    this.setState({
      isDragged: true,
    });
  };

  setIsDraggedEnd = () => {
    const {
      isDraggedEnd,
    } = this.state;

    this.setState({
      isDraggedEnd: false,
    });
  };

  // Grid의 무한 스크롤링을 위한 함수들
  setSelectedIdAndCount = (id, type) => {
    switch (type) {
      case 'duty': {
        this.setState({
          selectedIdForDuty: id,
          loadingCountTreeForDuty: 1,
          scrollTopFlagForDuty: true,
          scrollTopForDuty: 0,
        });
        break;
      }
      case 'pstn': {
        this.setState({
          selectedIdForPstn: id,
          loadingCountTreeForPstn: 1,
          scrollTopFlagForPstn: true,
          scrollTopForPstn: 0,
        });
        break;
      }
      case 'grp': {
        this.setState({
          selectedIdForGrp: id,
          loadingCountTreeForGrp: 1,
          scrollTopFlagForGrp: true,
          scrollTopForGrp: 0,
        });
        break;
      }
      default: {
        this.setState({
          selectedId: id,
          loadingCountTree: 1,
          scrollTopFlag: true,
          scrollTop: 0,
        });
      }
    }
  };
  backScrollTopFlag = (type) => {
    switch (type) {
      case 'duty': {
        this.setState({
          scrollTopFlagForDuty: false,
        });
        break;
      }
      case 'pstn': {
        this.setState({
          scrollTopFlagForPstn: false,
        });
        break;
      }
      case 'grp': {
        this.setState({
          scrollTopFlagForGrp: false,
        });
        break;
      }
      default: {
        this.setState({
          scrollTopFlag: false,
        });
      }
    }
  };
  updateLoadingCount = (selected, type) => {
    const { tabType } = this.state;
    if (type === constantsType.TREE) {
      const loadingCountTreeNames = {
        user: 'loadingCountTree',
        pstn: 'loadingCountTreeForPstn',
        duty: 'loadingCountTreeForDuty',
        grp: 'loadingCountTreeForGrp',
      };
      const loadingCountTrees = {
        user: this.state.loadingCountTree,
        pstn: this.state.loadingCountTreeForPstn,
        duty: this.state.loadingCountTreeForDuty,
        grp: this.state.loadingCountTreeForGrp,
      };

      this.setState({
        [loadingCountTreeNames[tabType[selected]]]: loadingCountTrees[tabType[selected]] + 1,
      });
    } else {
      const loadingCountSearchNames = {
        user: 'loadingCountSearch',
        pstn: 'loadingCountSearchForPstn',
        duty: 'loadingCountSearchForDuty',
      };
      const loadingCountSearchs = {
        user: this.state.loadingCountSearch,
        pstn: this.state.loadingCountSearchForPstn,
        duty: this.state.loadingCountSearchForDuty,
      };

      this.setState({
        [loadingCountSearchNames[tabType[selected]]]: loadingCountSearchs[tabType[selected]] + 1,
      });
    }
  };

  // Input 태그의 경우 Tab 변경 후 Input 태그가 렌더링 되므로, handleSelect 함수에서 아래의 작업을 할 수 없다. 
  componentDidUpdate(prevProps) {
    const {
      isTabChange,
      selected,
      isDragged,
      isDraggedEnd,
    } = this.state;
    const {
      userProfile,
      isProfile,
      handleGetProfileData,
      show,
      closeModalInit,

      selectedUsers,
      checkedDept,
      checkedPstn,
      checkedDuty,
      checkedGrp,
    } = this.props;

    if (isTabChange) {
      this.setSearchInput(selected);
      this.setState({
        isTabChange: false,
      });
    }

    if (prevProps.userProfile !== userProfile && isProfile) {
      handleGetProfileData(userProfile.USER_ID);
    }

    if (!this.state.selectedusers) {
      if (!isDragged && isDraggedEnd) {
        this.setState({
          selectedusers: selectedUsers.slice(),
        });
      }
    }

    if (!this.state.checkedDept) {
      this.setState({
        checkedDept: checkedDept.slice(),
      });
    }

  if (!this.state.checkedPstn) {
      this.setState({
        checkedPstn: checkedPstn.slice(),
      });
    }

    if (!this.state.checkedDuty) {
      this.setState({
        checkedDuty: checkedDuty.slice(),
      });
    }

    if (!this.state.selectedGrp) {
      this.setState({
        selectedGrp: checkedGrp.slice(),
      });
    }

    if (!prevProps.show && show) {
      closeModalInit();
      if (isProfile) {
        handleGetProfileData(userProfile.USER_ID);
      }
    }

    // if (isDragged && !isDraggedEnd) {
    //   this.setState({
    //     isDragged: false,
    //     isDraggedEnd: true,
    //   });
    // }
  }

  componentWillUnmount() {
    const {
      handleInitializeTreeData,
    } = this.props;

    handleInitializeTreeData();
  }

  isEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    arr1.forEach((v) => {
      arr2.forEach((v2) => {
        if (v.USER_ID !== v2.USER_ID) {
          return false;
        }
      })
    });

    return true;
  };

  // 트리에서 검색어 onChange 호출 시 불리는 함수
  setSearchString = (searchString, treeType) => {
    switch (treeType) {
      case 'user':
        this.setState({
          searchString: searchString,
        });
        break;
      case 'pstn':
        this.setState({
          searchStringPstn: searchString,
        });
        break;
      case 'duty':
        this.setState({
          searchStringDuty: searchString,
        });
        break;
      case 'grp':
        this.setState({
          searchStringGrp: searchString,
        });
        break;
    }
  };

  // 조직도 우측 사용자 프로필 화면에서 프로필사진 옆의 부서 클릭 시 트리를 변경시켜 줄 콜백 함수
  selectedProfileTree = (name, path, fpath) => {
    // fpath는 전체 트리의 deptId
    // path는 deptId

    const {
      handleSetSelectedProfile,
    } = this.props;

    handleSetSelectedProfile({ name, path, fpath });
  };

  initializeCheckbox = () => {
    const { handleInitializeCheckbox } = this.props;
    handleInitializeCheckbox();
  };

  // 그리드에서 구성원 클릭 시 해당 구성원의 부서명을 이용해 선택 목록에 들어갈 데이터를 생성
  loadSelected = (users) => {
    if (users.length > 0 && users[0].ACNT_TYPE === 'D') {
      users[0]["checked"] = true;
      users[0]["title"] = users[0].NAME_KOR;
      users[0]["id"] = users[0].USER_ID;
      let deptname = users[0].DEPT_NAME_KOR;
      deptList = this.state.checkedDept.slice();
      this.loadSelectedDept(users[0], deptname);
    } else if (users.length > 0) {
      this.setState({ users });
    }
  };

  // 조직도 그리드의 한 구성원을 선택했을 때, 조직도 우측에 선택한 구성원의 정보를 표시해줌
  // isProfile = true 일 때 사용됨
  loadSelectedUser = (selectedUser) => {
    this.setState({
      selectedUser,
    });
  };

  loadSelectedDept = (dept, name) => {
    const {
      checkedDept,
    } = this.state;

    // 상위 컴포넌트로부터 전달된 데이터와, 사용자가 선택한 데이터 중복 처리
    if (checkedDept.findIndex((item) => item.id === dept.id) === -1) {
      const idx = deptList.findIndex(t => t.id === dept.id);
      if (deptList.length === 0) {
        deptList = this.state.checkedDept.slice();
      }
      if (dept.checked === true) {
        if (idx === -1) {
          let obj = {
            id: dept.id,
            NAME_KOR: dept.node.NAME_KOR,
            NAME_ENG: dept.node.NAME_ENG,
            NAME_CHN: dept.node.NAME_CHN,
            NAME_JPN: dept.node.NAME_JPN,
            NAME_ETC: dept.node.NAME_ETC,
          };
          if (name !== undefined) {
            obj["deptName"] = name;
          }
          deptList.push(obj);
        }
      } else if (dept.checked === false) {
        let listcheck = this.state.checkedDept.findIndex(t => t.id === dept.id);
        if (listcheck === -1) {
          deptList.splice(idx, 1);
        }
      }
      this.setState({ checkDept: deptList, reload: false, reset: false });
    }
  };

  loadSelectedGrp = (grp) => {
    const {
      selectedGrp,
    } = this.state;

    // 상위 컴포넌트로부터 전달된 데이터와, 사용자가 선택한 데이터 중복 처리
    if (selectedGrp.findIndex((item) => item.id === grp.id) === -1) {
      const idx = grpList.findIndex(t => t.id === grp.id);
      if (grpList.length === 0) {
        grpList = this.state.selectedGrp.slice();
      }
      if (grp.checked === true) {
        if (idx === -1) {
          const obj = {
            id: grp.id,
            NAME_KOR: grp.node.NAME_KOR,
            NAME_ENG: grp.node.NAME_ENG,
            NAME_CHN: grp.node.NAME_CHN,
            NAME_JPN: grp.node.NAME_JPN,
            NAME_ETC: grp.node.NAME_ETC,
          };
          grpList.push(obj);
        }
      } else if (grp.checked === false) {
        let listcheck = this.state.selectedGrp.findIndex(t => t.id === grp.id);
        if (listcheck === -1) {
          grpList.splice(idx, 1);
        }
      }
      this.setState({ checkgrp: grpList, reload: false, reset: false });
    }
  };

  loadSelectedPstn = (pstn, name) => {
    const {
      checkedPstn,
    } = this.state;

    // 상위 컴포넌트로부터 전달된 데이터와, 사용자가 선택한 데이터 중복 처리
    if (checkedPstn.findIndex((item) => item.id === pstn.id) === -1) {
      let idx = pstnList.findIndex(t => t.id === pstn.id);
      if (pstnList.length === 0) {
        pstnList = this.state.checkedPstn.slice();
      }
      if (pstn.checked === true) {
        if (idx === -1) {
          let obj = {
            id: pstn.id,
            NAME_KOR: pstn.node.NAME_KOR,
            NAME_ENG: pstn.node.NAME_ENG,
            NAME_CHN: pstn.node.NAME_CHN,
            NAME_JPN: pstn.node.NAME_JPN,
            NAME_ETC: pstn.node.NAME_ETC,
          };
          if (name !== undefined) {
            obj["deptName"] = name;
          }
          pstnList.push(obj);
        }
      } else if (pstn.checked === false) {
        let listcheck = this.state.checkedPstn.findIndex(t => t.id === pstn.id);
        if (listcheck === -1) {
          pstnList.splice(idx, 1);
        }
      }
      this.setState({ checkpstn: pstnList, reload: false, reset: false });
    }
  };

  loadSelectedDuty = (duty, name) => {
    const {
      checkedDuty,
    } = this.state;

    // 상위 컴포넌트로부터 전달된 데이터와, 사용자가 선택한 데이터 중복 처리
    if (checkedDuty.findIndex((item) => item.id === duty.id) === -1) {
      const idx = dutyList.findIndex(t => t.id === duty.id);
      if (dutyList.length === 0) {
        dutyList = this.state.checkedDuty.slice();
      }
      if (duty.checked === true) {
        if (idx === -1) {
          let obj = {
            id: duty.id,
            NAME_KOR: duty.node.NAME_KOR,
            NAME_ENG: duty.node.NAME_ENG,
            NAME_CHN: duty.node.NAME_CHN,
            NAME_JPN: duty.node.NAME_JPN,
            NAME_ETC: duty.node.NAME_ETC,
          };
          if (name !== undefined) {
            obj["deptName"] = name;
          }
          dutyList.push(obj);
        }
      } else if (duty.checked === false) {
        let listcheck = this.state.checkedDuty.findIndex(t => t.id === duty.id);
        if (listcheck === -1) {
          dutyList.splice(idx, 1);
        }
      }
      this.setState({ checkduty: dutyList, reload: false, reset: false });
    }
  };

  // changeGrpTreeData = (grpId) => {
  //   const { handleGetChangeGrpTreeData } = this.props;
  //   handleGetChangeGrpTreeData(grpId);
  // }

  changePstnTreeData = (data) => {
    const { handleGetChangePstnTreeData, organizationPstnData } = this.props;
    const pstnId = parseInt(data);
    const compCd = organizationPstnData[organizationPstnData.findIndex(data => data.PSTN_ID === pstnId)].COMP_CD;
    this.setState({
      selectedPstnDept: pstnId,
      compCdForPstn: compCd,
    });
    handleGetChangePstnTreeData(pstnId);
  };

  changeDutyTreeData = (data) => {
    const { handleGetChangeDutyTreeData, organizationDutyData } = this.props;
    const dutyId = parseInt(data);
    const compCd = organizationDutyData[organizationDutyData.findIndex(data => data.DUTY_ID === dutyId)].COMP_CD;
    this.setState({
      selectedDutyDept: dutyId,
      compCdForDuty: compCd,
    });
    handleGetChangeDutyTreeData(dutyId);
  };

  changeTreeData = (data) => {
    const { handleGetChangeTreeData, organizationData } = this.props;
    const deptId = parseInt(data);
    const compCd = organizationData[organizationData.findIndex(data => data.DEPT_ID === deptId)].COMP_CD;
    this.setState({
      selectedDept: deptId,
      compCd: compCd,
    });
    handleGetChangeTreeData(deptId);
  };

  changeGrpTreeData = (data) => {
    const { handleGetChangeGrpTreeData } = this.props;
    const siteId = parseInt(data);
    this.setState({
      selectedGrpDept: siteId,
    });
    handleGetChangeGrpTreeData(siteId);
  };

  changeInputKeyword = (e) => {
    const { handleGetOrganizationUser, organizationData, selectedDept } = this.props;
    const { selected, tabType } = this.state;
    const { compCd } = this.getSearchSet(selected);
    const getKeywordNames = {
      user: 'keyword',
      pstn: 'keywordForPstn',
      duty: 'keywordForDuty',
    };
    const getKeywordSearchedNames = {
      user: 'keywordSearched',
      pstn: 'keywordSearchedForPstn',
      duty: 'keywordSearchedForDuty',
    };
    const getCompCdSearchedNames = {
      user: 'compCdSearched',
      pstn: 'compCdSearchedForPstn',
      duty: 'compCdSearchedForDuty',
    };
    let compCdResult = compCd;
    // 트리의 selectbox를 선택한적이 없는 경우
    if (compCdResult === 0) {
      compCdResult = organizationData[organizationData.findIndex(o => o.DEPT_ID === selectedDept)].COMP_CD;
    }

    if (e.target.name === 'searchInput' && e.keyCode === 13) {
      handleGetOrganizationUser(e.target.value.trim(), compCdResult, tabType[selected]);

      this.setState({
        [getKeywordNames[tabType[selected]]]: e.target.value,
        [getKeywordSearchedNames[tabType[selected]]]: e.target.value,
        [getCompCdSearchedNames[tabType[selected]]]: compCdResult,
        loadingCountSearch: 1,
        loadingCountSearchForPstn: 1,
        loadingCountSearchForDuty: 1,
        scrollTopFlag: true,
        scrollTopFlagForDuty: true,
        scrollTopFlagForGrp: true,
        scrollTopFlagForPstn: true,
      });
    } else {
      this.setState({
        [getKeywordNames[tabType[selected]]]: e.target.value,
      });
    }
  };

  organizationUserSearch = () => {
    const { selected, tabType } = this.state;
    const { handleGetOrganizationUser, organizationData, selectedDept } = this.props;
    const { compCd, keyword } = this.getSearchSet(selected);

    const getKeywordSearchedNames = {
      user: 'keywordSearched',
      pstn: 'keywordSearchedForPstn',
      duty: 'keywordSearchedForDuty',
    };
    const getCompCdSearchedNames = {
      user: 'compCdSearched',
      pstn: 'compCdSearchedForPstn',
      duty: 'compCdSearchedForDuty',
    };
    let compCdResult = compCd;

    // 트리의 selectbox를 선택한적이 없는 경우
    if (compCdResult === 0) {
      compCdResult = organizationData[organizationData.findIndex(o => o.DEPT_ID === selectedDept)].COMP_CD;
    }

    handleGetOrganizationUser(keyword, compCdResult, tabType[selected]);

    this.setState({
      [getKeywordSearchedNames[tabType[selected]]]: keyword,
      [getCompCdSearchedNames[tabType[selected]]]: compCdResult,
      loadingCountSearch: 1,
      loadingCountSearchForPstn: 1,
      loadingCountSearchForDuty: 1,
      scrollTopFlag: true,
      scrollTopFlagForDuty: true,
      scrollTopFlagForGrp: true,
      scrollTopFlagForPstn: true,
    });
  };

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

    const {
      tabType,
      selectedUser,
    } = this.state;

    const {
      isModal,
      isTab,
      isProfile,
      profile,
      isDraggable,
    } = this.props;

    const content = this.getTab();

    const e = React.createElement;
    const modalProperty = {
      isOpen: this.props.show,
      onRequestClose: this.closeModal,
      contentLabel: 'SearchTree',
      style: customstyle,
      shouldCloseOnOverlayClick: false,
      ariaHideApp: false,
      portalClassName: 'portalCommonModal',
    };

    let common =
      <StyleModal className="modalWrapper">
        {
          isModal ?
            <h2 className="modalTitle">
              {intlObj.get(messages.organization)}
              <Button className="modalClose" onClick={this.closeModal} title={intlObj.get(messages.closeModal)} />
            </h2>
            :
            ''
        }
        <div style={{ justifyContent: 'center' }} className="modalContents orgAcivityBody">
          <Row style={{ paddingRight: 15 }} gutter={gutter} className="orgActivityInnerBody">
            <Col xl={16} style={colStyle} className="leftActivity">
              {
                isTab ?
                  <Tabs selected={this.state.selected} onSelect={this.handleSelect}>
                    {content.map((v, i) => {
                      const e = React.createElement;
                      return e(Tab, { label: intlObj.get(messages[tabType[i] === 'user' ? 'member' : tabType[i] === 'pstn' ? 'position' : tabType[i] === 'grp' ? 'virtualGroup' : 'duty']) }, v);
                    })}
                  </Tabs>
                  :
                  <div className='noTab'>
                    {content}
                  </div>
              }
              {
                !isProfile
                  ?
                  <Button className="inBtn" title={intlObj.get(messages.add)} onClick={this.sendAdd} />
                  :
                  ''
              }
            </Col>
            <Col xl={8} style={colStyle} className="rightActivity" >
              {
                isProfile ?
                  profile ?
                    <Profile
                      selectedUser={selectedUser}
                      loadProfile={profile}
                      selectedProfileTree={this.selectedProfileTree}
                    />
                    :
                    ''
                  :
                  <SelectedUser
                    selectedUsers={this.state.selectedusers}
                    complete={this.state.complete}
                    deptList={this.state.checkedDept}
                    grpList={this.state.selectedGrp}
                    pstnList={this.state.checkedPstn}
                    dutyList={this.state.checkedDuty}
                    checkAll={this.state.checkAll}
                    deleteCallback={this.sendDelete}
                    dndChangePositionUser={this.dndChangePositionUser}
                    dndChangePositionCallback={this.dndChangePositionCallback}
                    isDraggable={isDraggable}
                    deleteAll={this.deleteAll}
                    setIsDragged={this.setIsDragged}
                    setIsDraggedEnd={this.setIsDraggedEnd}
                  />
              }
            </Col>
          </Row>
        </div>
        {
          isModal
            ?
            <div className="modalFooter">
              <BtnLgtGray onClick={this.closeModal}>{intlObj.get(messages.cancel)}</BtnLgtGray>
              <BtnDkGray onClick={this.onSave} >{intlObj.get(messages.confirm)}</BtnDkGray>
            </div>
            :
            ''
        }
      </StyleModal>;

    if (isModal) {
      common = e(Modal, modalProperty, common);
    }
    return (
      <div>
        {common}
      </div>
    );
  }
}

Organization.propTypes = {
  lang: PropTypes.string.isRequired,
  handleSetLocale: PropTypes.func.isRequired,
  deptId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  handleGetFirstDeptUser: PropTypes.func.isRequired,
  handleGetTreeDataForProfile: PropTypes.func.isRequired,
  
  treeData: PropTypes.array.isRequired,
  grpTreeData: PropTypes.array.isRequired,
  pstnTreeData: PropTypes.array.isRequired,
  dutyTreeData: PropTypes.array.isRequired,

  // orginizationData : 트리의 selectbox에 들어갈 목록
  organizationData: PropTypes.array.isRequired,
  organizationPstnData: PropTypes.array.isRequired,
  organizationDutyData: PropTypes.array.isRequired,
  organizationGrpData: PropTypes.array.isRequired,

  users: PropTypes.array.isRequired,
  grpUsers: PropTypes.array.isRequired,
  pstnUsers: PropTypes.array.isRequired,
  dutyUsers: PropTypes.array.isRequired,

  organizationSearchResult: PropTypes.array.isRequired,
  organizationSearchResultForPstn: PropTypes.array.isRequired,
  organizationSearchResultForDuty: PropTypes.array.isRequired,

  emptyRowsView: PropTypes.func.isRequired,
  emptyRowsViewForPstn: PropTypes.func.isRequired,
  emptyRowsViewForDuty: PropTypes.func.isRequired,
  emptyRowsViewForGrp: PropTypes.func.isRequired,

  selectedUsers: PropTypes.array,
  checkedDept: PropTypes.array,
  checkedGrp: PropTypes.array,
  checkedPstn: PropTypes.array,
  checkedDuty: PropTypes.array,

  // selectedDept : 트리의 선택박스에 현재 선택된 값
  selectedDept: PropTypes.object.isRequired,
  selectedPstnDept: PropTypes.object.isRequired,
  selectedDutyDept: PropTypes.object.isRequired,
  selectedGrpDept: PropTypes.object.isRequired,

  selectedIndex: PropTypes.string.isRequired,
  selectedPstnIndex: PropTypes.string.isRequired,
  selectedDutyIndex: PropTypes.string.isRequired,
  selectedGrpIndex: PropTypes.string.isRequired,
  selectedId: PropTypes.number,
  
  checkboxInitialize: PropTypes.bool.isRequired,
  closeModalInit: PropTypes.func.isRequired,
  handleLoadProfileData: PropTypes.func.isRequired,
  handleGetTreeData: PropTypes.func.isRequired,
  handleGetGrpTreeData: PropTypes.func.isRequired,
  handleGetPstnTreeData: PropTypes.func.isRequired,
  handleGetDutyTreeData: PropTypes.func.isRequired,
  handleGetOrganizationData: PropTypes.func.isRequired,
  handleGetOrganizationPstnData: PropTypes.func.isRequired,
  handleGetOrganizationDutyData: PropTypes.func.isRequired,
  handleGetOrganizationGrpData: PropTypes.func.isRequired,
  handleGetUsers: PropTypes.func.isRequired,
  handleGetGrpUsers: PropTypes.func.isRequired,
  handleGetPstnUsers: PropTypes.func.isRequired,
  handleGetDutyUsers: PropTypes.func.isRequired,
  handleGetChangeTreeData: PropTypes.func.isRequired,
  handleGetChangeGrpTreeData: PropTypes.func.isRequired,
  handleGetChangePstnTreeData: PropTypes.func.isRequired,
  handleGetChangeDutyTreeData: PropTypes.func.isRequired,
  handleGetUser: PropTypes.func.isRequired,
  handleGetOrganizationUser: PropTypes.func.isRequired,
  handleInitializeCheckbox: PropTypes.func.isRequired,
  handleLoadingGridDataDuty: PropTypes.func.isRequired,
  handleLoadingGridDataPstn: PropTypes.func.isRequired,
  handleLoadingGridDataGrp: PropTypes.func.isRequired,
  handleLoadingGridData: PropTypes.func.isRequired,
  handleLoadingOrganizationUser: PropTypes.func.isRequired,
  handleGetSaveTree: PropTypes.func.isRequired,
  handleGetSaveGrpTree: PropTypes.func.isRequired,
  handleGetSavePstnTree: PropTypes.func.isRequired,
  handleGetSaveDutyTree: PropTypes.func.isRequired,

  // 탭 플래그
  isTab: PropTypes.bool,
  userTab: PropTypes.bool,
  pstnTab: PropTypes.bool,
  dutyTab: PropTypes.bool,
  grpTab: PropTypes.bool,
  
  // 모달 플래그
  isModal: PropTypes.bool,
  show: PropTypes.bool, // 모달을 보일지 말지 결정하는 플래그
  
  // 선택 목록, 프로필 플래그
  isProfile: PropTypes.bool,
  // isProfile = true 일 때, 프로필 정보를 로딩하기 위해 필요한 정보
  userProfile: PropTypes.object, // Organization으로 전달될 선택된 구성원의 정보
  selectedUserDeptId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  profile: PropTypes.object, // userProfile을 통해 얻은, 프로필 형식에 맞는 구성원의 정보
  selectedUserDeptName: PropTypes.string, // 트리에 선택된 구성원의 부서가 주황색으로 표시되게 하기 위한 부서명
  
  // 선택 목록의 구성원 드래그 앤 드랍 플래그
  isDraggable: PropTypes.bool,

  isTreeCheckbox: PropTypes.bool.isRequired,
  
  // 조직도로부터 데이터 가져가는 함수
  getDataFromOrganization: PropTypes.func,

  // set SelectedIndex
  handleSetSelectedIndex: PropTypes.func.isRequired,
  handleSetSelectedIndexPstn: PropTypes.func.isRequired,
  handleSetSelectedIndexDuty: PropTypes.func.isRequired,
  handleSetSelectedIndexGrp: PropTypes.func.isRequired,

  // set SelectedDept
  // 지워도되나..쓰는곳없음
  handleSetSelectedDept: PropTypes.func.isRequired,
  handleSetSelectedPstnDept: PropTypes.func.isRequired,
  handleSetSelectedDutyDept: PropTypes.func.isRequired,

  // set SelectedUserDeptName
  // isProfile = true 일 때, 트리에 선택된 구성원의 부서가 주황색 배경으로 표시되는데,
  // 부서 검색을 하거나 트리의 다른 부서를 클릭 했을 경우, 처음 선택된 구성원의 부서 표시를
  // 초기화해 주기 위한 함수
  handleSetSelectedUserDeptName: PropTypes.func.isRequired,

  // 일괄
  handleGetProfileData: PropTypes.func.isRequired,
  handleSetSelectedProfile: PropTypes.func.isRequired,

  // selecteduser에서 구성원 추가, 삭제, 드래그를 위한 콜백
  // isModal = false 일 때만 필요
  addCallback: PropTypes.func,
  deleteCallback: PropTypes.func,
  dndChangePositionCallback: PropTypes.func,
  deleteAllCallback: PropTypes.func,

  orgName: PropTypes.string.isRequired,

  // componentWillUnmount에서 불리는 함수로,
  // 조직도 데이터들을 초기화
  handleInitializeTreeData: PropTypes.func.isRequired,

  // 위젯에서 조직도 사용할 경우 위젯 item 정보
  item: PropTypes.object,

  // SITE_ID
  // SITE_ID는 조직도의 props로 넘겨주는 siteIdParam과
  // 서버에서 세션을 통해 가져오는 siteId 2개가 존재함
  // 현재는 가상 그룹 탭의 트리 위의 selectbox 표현을 위해 사용
  siteId: PropTypes.number.isRequired,
  siteIdParam: PropTypes.number,
};

Organization.defaultProps = {
  isTab: false,
  userTab: false,
  pstnTab: false,
  dutyTab: false,
  grpTab: false,
  isModal: true,
  show: false,
  isProfile: false,
  userProfile: undefined,
  selectedUserDeptId: '',
  isDraggable: false,
  isTreeCheckbox: true,
  addCallback: undefined,
  deleteCallback: undefined,
  deleteAllCallback: undefined,

  getDataFromOrganization: undefined,
  orgName: 'Nothing',

  item: undefined,

  selectedUsers: [],
  checkedDept: [],
  checkedGrp: [],
  checkedPstn: [],
  checkedDuty: [],

  selectedId: -1,
  selectedUserDeptName: '',

  siteIdParam: undefined,
};

export function mapDispatchToProps(dispatch) {
  return {
    handleGetFirstDeptUser: DEPT_ID => dispatch(actions.getFirstDeptUser(DEPT_ID)),
    handleGetTreeDataForProfile: DEPT_ID => dispatch(actions.getTreeDataForProfile(DEPT_ID)),
    handleSetLocale: locale => dispatch(actions.setLocale(locale)),
    // 조직도
    handleGetTreeData: () => dispatch(actions.getTreeData()),
    handleGetChangeTreeData: deptId => dispatch(actions.getChangeTreeData(deptId)),
    handleGetChangeGrpTreeData: grpId => dispatch(actions.getChangeGrpTreeData(grpId)),
    handleGetChangePstnTreeData: pstnId => dispatch(actions.getChangePstnTreeData(pstnId)),
    handleGetChangeDutyTreeData: dutyId => dispatch(actions.getChangeDutyTreeData(dutyId)),

    // 가상그룹
    handleGetGrpTreeData: () => dispatch(actions.getGrpTreeData()),
    // 직위
    handleGetPstnTreeData: () => dispatch(actions.getPstnTreeData()),
    // 직책
    handleGetDutyTreeData: () => dispatch(actions.getDutyTreeData()),

    // 구성원 법인 리스트
    handleGetOrganizationData: () => dispatch(actions.getOrganizationData()),
    // 직위별 법인 리스트
    handleGetOrganizationPstnData: () => dispatch(actions.getOrganizationPstnData()),
    // 직책별 법인 리스트
    handleGetOrganizationDutyData: () => dispatch(actions.getOrganizationDutyData()),
    // 가상그룹별 법인 리스트
    handleGetOrganizationGrpData: () => dispatch(actions.getOrganizationGrpData()),

    // 사용자
    handleGetUsers: data => dispatch(actions.getUsers(data)),
    handleGetGrpUsers: (grpId, siteId) => dispatch(actions.getGrpUsers(grpId, siteId)),
    handleGetPstnUsers: data => dispatch(actions.getPstnUsers(data)),
    handleGetDutyUsers: data => dispatch(actions.getDutyUsers(data)),

    // 사용자 목록
    handleGetUser: empno => dispatch(actions.getUser(empno)),

    // 조직도 검색
    handleGetOrganizationUser: (keyword, compCd, type) => dispatch(actions.getOrganizationUser(keyword, compCd, type)),
    handleInitializeCheckbox: () => dispatch(actions.initializeCheckbox()),
    resetCheckbox: () => dispatch(actions.resetCheckbox()),
    closeModalInit: () => dispatch(actions.closeModalInit()),

    // Grid 추가 데이터 로딩 작업
    handleLoadingGridDataDuty: (data, page) => dispatch(actions.loadingGridDataDuty(data, page)),
    handleLoadingGridDataPstn: (data, page) => dispatch(actions.loadingGridDataPstn(data, page)),
    handleLoadingGridDataGrp: (grpId, siteId, page) => dispatch(actions.loadingGridDataGrp(grpId, siteId, page)),
    handleLoadingGridData: (data, page) => dispatch(actions.loadingGridData(data, page)),

    // 검색결과 추가 데이터 로딩 작업
    handleLoadingOrganizationUser: (keyword, page, compCd, type) => dispatch(actions.loadingOrganizationUser(keyword, page, compCd, type)),

    // 트리 유지
    handleGetSaveTree: (data, data2) => dispatch(actions.getSaveTree(data, data2)),
    handleGetSaveGrpTree: (data, data2) => dispatch(actions.getSaveGrpTree(data, data2)),
    handleGetSavePstnTree: (data, data2) => dispatch(actions.getSavePstnTree(data, data2)),
    handleGetSaveDutyTree: (data, data2) => dispatch(actions.getSaveDutyTree(data, data2)),

    // set selectedIndex
    handleSetSelectedIndex: selectedIndex => dispatch(actions.setSelectedIndex(selectedIndex)),
    handleSetSelectedIndexPstn: selectedIndex => dispatch(actions.setSelectedIndexPstn(selectedIndex)),
    handleSetSelectedIndexDuty: selectedIndex => dispatch(actions.setSelectedIndexDuty(selectedIndex)),
    handleSetSelectedIndexGrp: selectedIndex => dispatch(actions.setSelectedIndexGrp(selectedIndex)),

    // set SelectedDept
    handleSetSelectedDept: selectedDept => dispatch(actions.setSelectedDept(selectedDept)),
    handleSetSelectedPstnDept: selectedDept => dispatch(actions.setSelectedPstnDept(selectedDept)),
    handleSetSelectedDutyDept: selectedDept => dispatch(actions.setSelectedDutyDept(selectedDept)),

    // set SelectedUserDeptName
    handleSetSelectedUserDeptName: selectedUserDeptName => dispatch(actions.setSelectedUserDeptName(selectedUserDeptName)),

    // load profile data
    // 해당 함수 실행 시, store의 profile에 값이 들어감
    handleLoadProfileData: USER_ID => dispatch(actions.loadProfileData(USER_ID)),
    handleGetProfileData: USER_ID => dispatch(actions.getProfileData(USER_ID)),
    handleSetSelectedProfile: data => dispatch(actions.setSelectedProfile(data)),

    // 조직도 종료 시, 트리데이터 및 각종 초기화가 필요한 데이터의 초기화 작업
    handleInitializeTreeData: () => dispatch(actions.initializeTreeData()),
  };
}

const mapStateToProps = createStructuredSelector({
  // 조직도
  treeData: selectors.makeTreeData(),
  grpTreeData: selectors.makeGrpTreeData(),
  pstnTreeData: selectors.makePstnTreeData(),
  dutyTreeData: selectors.makeDutyTreeData(),
  // 사용자 목록
  users: selectors.makeUsers(),
  grpUsers: selectors.makeGrpUsers(),
  pstnUsers: selectors.makePstnUsers(),
  dutyUsers: selectors.makeDutyUsers(),
  organizationSearchResult: selectors.makeOrganizationSearchResult(),
  organizationSearchResultForPstn: selectors.makeOrganizationSearchResultForPstn(),
  organizationSearchResultForDuty: selectors.makeOrganizationSearchResultForDuty(),
  // 법인목록
  organizationData: selectors.makeOrganizationData(),
  organizationPstnData: selectors.makeOrganizationPstnData(),
  organizationDutyData: selectors.makeOrganizationDutyData(),
  organizationGrpData: selectors.makeOrganizationGrpData(),

  selectedDept: selectors.makeSelectedDept(),
  selectedPstnDept: selectors.makeSelectedPstnDept(),
  selectedDutyDept: selectors.makeSelectedDutyDept(),
  checkboxInitialize: selectors.makeCheckboxInitialize(),
  // emptyRowsView
  emptyRowsView: selectors.makeSelectEmptyRowsView(),
  emptyRowsViewForPstn: selectors.makeSelectEmptyRowsViewForPstn(),
  emptyRowsViewForDuty: selectors.makeSelectEmptyRowsViewForDuty(),
  emptyRowsViewForGrp: selectors.makeSelectEmptyRowsViewForGrp(),
  // tree 유지
  selectedIndex: selectors.makeSelectSelectedIndex(),
  selectedPstnIndex: selectors.makeSelectSelectedPstnIndex(),
  selectedDutyIndex: selectors.makeSelectSelectedDutyIndex(),
  selectedGrpIndex: selectors.makeSelectSelectedGrpIndex(),
  // Profile 용 selectedIndex
  selectedId: selectors.makeSelectSelectedId(),
  // profile 정보
  profile: selectors.makeSelectProfile(),
  selectedUserDeptName: selectors.makeSelectSelectedUserDeptName(),

  searchString: selectors.makeSelectSelectedUserDeptName(),
  siteId: selectors.makeSelectSiteId(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'organizationPopup', reducer });
const withSaga = injectSaga({ key: 'organizationPopup', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Organization);
