import { fromJS } from 'immutable';
import * as actionType from './constants';
import EmptyRowsViewSearch from './emptyRowsViewSearch';
import EmptyRowsViewTree from './emptyRowsViewTree';

const initialState = fromJS({
  searchString: '',
  searchFocusIndex: 0,
  searchFoundCount: null,
  treeData: [],
  grpTreeData: [],
  pstnTreeData: [],
  dutyTreeData: [],

  users: [],
  selectedIndexes: [],
  selectedIndexes2: [],
  selectedIndexes3: [],
  selectedIndexes4: [],
  grpUsers: [],
  pstnUsers: [],
  dutyUsers: [],
  selectedDept: 0,
  selectedPstnDept: [],
  selectedDutyDept: [],
  selectedGrpDept: [],
  user: '',
  organizationData: [],
  organizationPstnData: [],
  organizationDutyData: [],
  organizationGrpData: [],
  checkboxInitialize: false,

  // EmptyRowsView
  emptyRowsView: EmptyRowsViewTree,
  emptyRowsViewForPstn: EmptyRowsViewTree,
  emptyRowsViewForDuty: EmptyRowsViewTree,
  emptyRowsViewForGrp: EmptyRowsViewTree,

  // 검색 결과 데이터
  organizationSearchResult: [],
  organizationSearchResultForPstn: [],
  organizationSearchResultForDuty: [],

  // 트리유지
  selectedIndex: '',
  selectedPstnIndex: '',
  selectedDutyIndex: '',
  selectedGrpIndex: '',

  profile: undefined,
  selectedUserDeptName: undefined,

  siteId: undefined,
});

const organizationSearchResultNames = {
  user: 'organizationSearchResult',
  pstn: 'organizationSearchResultForPstn',
  duty: 'organizationSearchResultForDuty',
};

const emptyRowsViewNames = {
  user: 'emptyRowsView',
  pstn: 'emptyRowsViewForPstn',
  duty: 'emptyRowsViewForDuty',
  grp: 'emptyRowsViewForGrp',
};

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_TREE_DATA:
      if (state.get('selectedIndex') === '') {
        return state.set('treeData', action.treeData).set('selectedIndex', '');
      }
      return state.set('treeData', action.treeData);
    case actionType.SET_GRP_TREE_DATA:
      return state
        .set('grpTreeData', action.grpTreeData)
        .set('selectedGrpIndex', '')
        .set('siteId', action.siteId);
    case actionType.SET_PSTN_TREE_DATA:
      return state.set('pstnTreeData', action.pstnTreeData).set('selectedPstnIndex', '');
    case actionType.SET_DUTY_TREE_DATA:
      return state.set('dutyTreeData', action.dutyTreeData).set('selectedDutyIndex', '');
    case actionType.SET_USERS:
      return state
        .set('users', action.users)
        .set('selectedIndexes', action.selectedIndexes)
        .set('organizationSearchResult', fromJS([]))
        .set('emptyRowsView', EmptyRowsViewTree);
    case actionType.SET_GRP_USERS:
      return state
        .set('grpUsers', action.grpUsers)
        .set('selectedIndexes4', action.selectedIndexes4)
        .set('emptyRowsViewForGrp', EmptyRowsViewTree);
    case actionType.SET_PSTN_USERS:
      return state
        .set('pstnUsers', action.pstnUsers)
        .set('selectedIndexes2', action.selectedIndexes2)
        .set('organizationSearchResultForPstn', fromJS([]))
        .set('emptyRowsViewForPstn', EmptyRowsViewTree);
    case actionType.SET_DUTY_USERS:
      return state
        .set('dutyUsers', action.dutyUsers)
        .set('selectedIndexes3', action.selectedIndexes3)
        .set('organizationSearchResultForDuty', fromJS([]))
        .set('emptyRowsViewForDuty', EmptyRowsViewTree);
    case actionType.SET_USER:
      return state.set('user', action.user);
    case actionType.GET_ORGANIZATION_USER: {
      if (action.result.size === 0) {
        return state
          .set(organizationSearchResultNames[action.aType], action.result)
          .set('users', fromJS([]))
          .set('checkboxInitialize', true)
          .set(emptyRowsViewNames[action.aType], EmptyRowsViewSearch);
      }
      return state
        .set(organizationSearchResultNames[action.aType], action.result)
        .set('checkboxInitialize', true)
        .set(emptyRowsViewNames[action.aType], EmptyRowsViewSearch);
    }
    case actionType.SET_ORGANIZATION_DATA:
      return state.set('organizationData', action.organizationData).set('selectedDept', action.selectedDept);
    case actionType.SET_ORGANIZATION_PSTNDATA:
      return state.set('organizationPstnData', action.organizationPstnData).set('selectedPstnDept', action.selectedPstnDept);
    case actionType.SET_ORGANIZATION_DUTYDATA:
      return state.set('organizationDutyData', action.organizationDutyData).set('selectedDutyDept', action.selectedDutyDept);
    case actionType.SET_ORGANIZATION_GRPDATA:
      return state.set('organizationGrpData', action.organizationGrpData).set('selectedGrpDept', action.selectedGrpDept);
    case actionType.SET_CHANGE_TREE_DATA:
      return state.set('treeData', action.treeData).set('selectedDept', action.selectedDept);
    case actionType.SET_CHANGE_GRPTREE_DATA:
      return state.set('grpTreeData', action.grpTreeData).set('selectedGrpDept', action.selectedGrpDept);
    case actionType.SET_CHANGE_PSTNTREE_DATA:
      return state.set('pstnTreeData', action.pstnTreeData).set('selectedPstnDept', action.selectedPstnDept);
    case actionType.SET_CHANGE_DUTYTREE_DATA:
      return state.set('dutyTreeData', action.dutyTreeData).set('selectedDutyDept', action.selectedDutyDept);
    case actionType.INITIALIZE_CHECKBOX:
      return state.set('checkboxInitialize', false);
    case actionType.RESET_CHECKBOX:
      return state.set('checkboxInitialize', true);
    case actionType.CLOSE_MODAL:
      return state
        .set('users', [])
        .set('grpUsers', [])
        .set('pstnUsers', [])
        .set('dutyUsers', [])
        .set('organizationSearchResult', fromJS([]))
        .set('organizationSearchResultForPstn', fromJS([]))
        .set('organizationSearchResultForDuty', fromJS([]));
    case actionType.GET_SAVE_TREE:
      return state.set('treeData', fromJS(action.treeData)).set('selectedIndex', action.selectedIndex);
    case actionType.GET_SAVE_GRP_TREE:
      return state.set('grpTreeData', fromJS(action.grpTreeData)).set('selectedGrpIndex', action.selectedGrpIndex);
    case actionType.GET_SAVE_PSTN_TREE:
      return state.set('pstnTreeData', fromJS(action.pstnTreeData)).set('selectedPstnIndex', action.selectedPstnIndex);
    case actionType.GET_SAVE_DUTY_TREE:
      return state.set('dutyTreeData', fromJS(action.dutyTreeData)).set('selectedDutyIndex', action.selectedDutyIndex);
    case actionType.SET_SELECTEDINDEX:
      return state.set('selectedIndex', action.selectedIndex);
    case actionType.SET_SELECTEDINDEX_PSTN:
      return state.set('selectedPstnIndex', action.selectedIndex);
    case actionType.SET_SELECTEDINDEX_DUTY:
      return state.set('selectedDutyIndex', action.selectedIndex);
    case actionType.SET_SELECTEDINDEX_GRP:
      return state.set('selectedGrpIndex', action.selectedIndex);
    case actionType.SET_PROFILE_DATA:
      return state.set('profile', action.result);
    case actionType.SET_PROFILE:
      return state
        .set('profile', action.result)
        .set('selectedDept', action.selectedDept)
        .set('selectedIndex', action.selectedIndex)
        .set('selectedUserDeptName', action.selectedUserDeptName)
        .set('users', action.users)
        .set('selectedId', action.selectedIndex)
        .set('emptyRowsView', EmptyRowsViewTree);
    case actionType.SET_SELECTEDDEPT:
      return state.set('selectedDept', action.selectedDept);
    case actionType.SET_SELECTEDDEPT_PSTN:
      return state.set('selectedPstnDept', action.selectedDept);
    case actionType.SET_SELECTEDDEPT_DUTY:
      return state.set('selectedDutyDept', action.selectedDept);
    case actionType.SET_SELECTEDUSERDEPTNAME:
      return state.set('selectedUserDeptName', action.selectedUserDeptName);
    case actionType.SET_SELECTEDPROFILE:
      return state
        .set('treeData', action.treeData)
        .set('users', action.users)
        .set('selectedIndex', action.selectedIndex)
        .set('selectedDept', action.selectedDept)
        .set('selectedUserDeptName', action.selectedUserDeptName);
    case actionType.INITIALIZE_UNMOUNT:
      return state
        .set('treeData', fromJS([]))
        .set('selectedIndex', '')
        .set('profile', undefined)
        .set('selectedUserDeptName', undefined);
    case actionType.GET_TREE_DATA_PROFILE:
      if (state.get('selectedIndex') === '') {
        return state.set('treeData', action.treeData).set('selectedIndex', '');
      }
      return state.set('treeData', action.treeData);
    default:
      return state;
  }
};

export default orgReducer;
