import { fromJS } from 'immutable';
import * as actionType from './constants';

export const getTreeData = () => ({
  type: actionType.GET_TREE_DATA_SAGA,
});

export const updateTreeData = treeData => ({
  type: actionType.SET_TREE_DATA,
  treeData: fromJS(treeData),
});

export const getGrpTreeData = () => ({
  type: actionType.GET_GRP_TREE_DATA_SAGA,
});

export const updateGrpTreeData = grpTreeData => ({
  type: actionType.SET_GRP_TREE_DATA,
  grpTreeData: fromJS(grpTreeData),
});

export const getPstnTreeData = () => ({
  type: actionType.GET_PSTN_TREE_DATA_SAGA,
});

export const updatePstnTreeData = pstnTreeData => ({
  type: actionType.SET_PSTN_TREE_DATA,
  pstnTreeData: fromJS(pstnTreeData),
});

export const getDutyTreeData = () => ({
  type: actionType.GET_DUTY_TREE_DATA_SAGA,
});

export const updateDutyTreeData = dutyTreeData => ({
  type: actionType.SET_DUTY_TREE_DATA,
  dutyTreeData: fromJS(dutyTreeData),
});

export const getUsers = data => ({
  type: actionType.GET_USERS_SAGA,
  data,
});

export const getGrpUsers = (grpId, siteId) => ({
  type: actionType.GET_GRP_USERS_SAGA,
  grpId,
  siteId,
});

export const getPstnUsers = data => ({
  type: actionType.GET_PSTN_USERS_SAGA,
  data,
});

export const getDutyUsers = data => ({
  type: actionType.GET_DUTY_USERS_SAGA,
  data,
});

export const getUser = empno => ({
  type: actionType.GET_USER_SAGA,
  empno,
});

// 검색
export const getOrganizationUser = (keyword, compCd, type) => ({
  type: actionType.GET_ORGANIZATION_USER_SAGA,
  keyword,
  compCd,
  tabType: type,
});

// 무한 스크롤 데이터 로딩 작업
export const loadingOrganizationUser = (keyword, page, compCd, type) => ({
  type: actionType.LOADING_SEARCH_DATA,
  keyword,
  page,
  compCd,
  tabType: type,
});

export const getOrganizationData = () => ({
  type: actionType.GET_ORANIZATION_DATA_SAGA,
});

export const getOrganizationPstnData = () => ({
  type: actionType.GET_ORANIZATION_PSTNDATA_SAGA,
});

export const getOrganizationDutyData = () => ({
  type: actionType.GET_ORANIZATION_DUTYDATA_SAGA,
});

export const getOrganizationGrpData = () => ({
  type: actionType.GET_ORANIZATION_GRPDATA_SAGA,
});

export const getChangeTreeData = depId => ({
  type: actionType.GET_CHANGE_TREE_DATA_SAGA,
  depId,
});

export const getChangePstnTreeData = pstnId => ({
  type: actionType.GET_CHANGE_PSTNTREE_DATA_SAGA,
  pstnId,
});

export const getChangeDutyTreeData = dutyId => ({
  type: actionType.GET_CHANGE_DUTYTREE_DATA_SAGA,
  dutyId,
});

export const getChangeGrpTreeData = siteId => ({
  type: actionType.GET_CHANGE_GRPTREE_DATA_SAGA,
  siteId,
});

export const initializeCheckbox = () => ({
  type: actionType.INITIALIZE_CHECKBOX,
});

export const resetCheckbox = () => ({
  type: actionType.RESET_CHECKBOX,
});

export const closeModalInit = () => ({
  type: actionType.CLOSE_MODAL,
});

// 트리 선택시 그리드 무한 스크롤 해주는 함수
export const loadingGridData = (data, page) => ({
  type: actionType.LOADING_GRIDDATA,
  data,
  page,
});

export const loadingGridDataPstn = (data, page) => ({
  type: actionType.LOADING_GRIDDATA_PSTN,
  data,
  page,
});

export const loadingGridDataDuty = (data, page) => ({
  type: actionType.LOADING_GRIDDATA_DUTY,
  data,
  page,
});

// 가상 그룹의 경우 그리드 목록 로딩시 grpId, siteId가 필요
export const loadingGridDataGrp = (grpId, siteId, page) => ({
  type: actionType.LOADING_GRIDDATA_GRP,
  grpId,
  siteId,
  page,
});
// 트리 선택시 그리드 무한 스크롤 해주는 함수 끝

export const getSaveTree = (treeData, selectedIndex) => ({
  type: actionType.GET_SAVE_TREE,
  treeData,
  selectedIndex,
});

export const getSaveGrpTree = (grpTreeData, selectedGrpIndex) => ({
  type: actionType.GET_SAVE_GRP_TREE,
  grpTreeData,
  selectedGrpIndex,
});

export const getSavePstnTree = (pstnTreeData, selectedPstnIndex) => ({
  type: actionType.GET_SAVE_PSTN_TREE,
  pstnTreeData,
  selectedPstnIndex,
});

export const getSaveDutyTree = (dutyTreeData, selectedDutyIndex) => ({
  type: actionType.GET_SAVE_DUTY_TREE,
  dutyTreeData,
  selectedDutyIndex,
});

export const setSelectedIndex = selectedIndex => ({
  type: actionType.SET_SELECTEDINDEX,
  selectedIndex,
});

export const setSelectedIndexPstn = selectedIndex => ({
  type: actionType.SET_SELECTEDINDEX_PSTN,
  selectedIndex,
});

export const setSelectedIndexDuty = selectedIndex => ({
  type: actionType.SET_SELECTEDINDEX_DUTY,
  selectedIndex,
});

export const setSelectedIndexGrp = selectedIndex => ({
  type: actionType.SET_SELECTEDINDEX_GRP,
  selectedIndex,
});

export const setSelectedDept = selectedDept => ({
  type: actionType.SET_SELECTEDDEPT,
  selectedDept,
});

export const setSelectedPstnDept = selectedDept => ({
  type: actionType.SET_SELECTEDDEPT_PSTN,
  selectedDept,
});

export const setSelectedDutyDept = selectedDept => ({
  type: actionType.SET_SELECTEDDEPT_DUTY,
  selectedDept,
});

export const setSelectedUserDeptName = selectedUserDeptName => ({
  type: actionType.SET_SELECTEDUSERDEPTNAME,
  selectedUserDeptName,
});

export const loadProfileData = id => ({
  type: actionType.GET_PROFILE_DATA_SAGA,
  id,
});

export const getProfileData = id => ({
  type: actionType.GET_PROFILE_SAGA,
  id,
});

export const setSelectedProfile = data => ({
  type: actionType.SET_SELECTEDPROFILE_SAGA,
  name: data.name,
  path: data.path,
  // {name, path, fpath} => 각각 selectedUserDeptName, selectedIndex, selectedDept를 설정
  fpath: data.fpath,
});

export const initializeTreeData = () => ({
  type: actionType.INITIALIZE_UNMOUNT,
});


// ****************** 조직도 팝업용 ******************
export const getFirstDeptUser = DEPT_ID => ({
  type: actionType.GET_FIRST_DEPTUSER,
  DEPT_ID,
});

export const getTreeDataForProfile = DEPT_ID => ({
  type: actionType.GET_TREE_DATA_PROFILE_SAGA,
  DEPT_ID,
});

export const setLocale = locale => ({
  type: actionType.SET_LOCALE,
  locale,
});
// ****************** 조직도 팝업용 끝 ******************
