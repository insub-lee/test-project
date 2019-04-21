import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const selectOrgRole = state => state.get('orgRole');
const selectHynixCommon = state => state.get('hynix.common').toJS();

const makeTreeData = () => createSelector(
  selectOrgRole,
  org => org.get('treeData').toJS(),
);

const makeGrpTreeData = () => createSelector(
  selectOrgRole,
  org => org.get('grpTreeData').toJS(),
);

const makePstnTreeData = () => createSelector(
  selectOrgRole,
  org => org.get('pstnTreeData').toJS(),
);

const makeDutyTreeData = () => createSelector(
  selectOrgRole,
  org => org.get('dutyTreeData').toJS(),
);

const makeUsers = () => createSelector(
  selectOrgRole,
  (org) => {
    if (org.get('users') === undefined || org.get('users').length === 0) {
      return fromJS([]);
    }
    return org.get('users').toJS();
  },
);

const makeGrpUsers = () => createSelector(
  selectOrgRole,
  (org) => {
    if (org.get('grpUsers').length === 0) {
      return [];
    }
    return org.get('grpUsers').toJS();
  },
);

const makePstnUsers = () => createSelector(
  selectOrgRole,
  (org) => {
    if (org.get('pstnUsers').length === 0) {
      return [];
    }
    return org.get('pstnUsers').toJS();
  },
);

const makeDutyUsers = () => createSelector(
  selectOrgRole,
  (org) => {
    if (org.get('dutyUsers').length === 0) {
      return [];
    }
    return org.get('dutyUsers').toJS();
  },
);

const makeUser = () => createSelector(
  selectOrgRole,
  org => org.get('user'),
);

const makeOrganizationSearchResult = () => createSelector(
  selectOrgRole,
  (org) => {
    if (org.get('organizationSearchResult').length === 0) {
      return [];
    }
    return org.get('organizationSearchResult').toJS();
  },
);

const makeOrganizationSearchResultForPstn = () => createSelector(
  selectOrgRole,
  (org) => {
    if (org.get('organizationSearchResultForPstn').length === 0) {
      return [];
    }
    return org.get('organizationSearchResultForPstn').toJS();
  },
);

const makeOrganizationSearchResultForDuty = () => createSelector(
  selectOrgRole,
  (org) => {
    if (org.get('organizationSearchResultForDuty').length === 0) {
      return [];
    }
    return org.get('organizationSearchResultForDuty').toJS();
  },
);

const makeOrganizationData = () => createSelector(
  selectOrgRole,
  org => org.get('organizationData').toJS(),
);

const makeOrganizationPstnData = () => createSelector(
  selectOrgRole,
  org => org.get('organizationPstnData').toJS(),
);

const makeOrganizationDutyData = () => createSelector(
  selectOrgRole,
  org => org.get('organizationDutyData').toJS(),
);

const makeOrganizationGrpData = () => createSelector(
  selectOrgRole,
  org => org.get('organizationGrpData').toJS(),
);

const makeSelectedDept = () => createSelector(
  selectOrgRole,
  org => org.get('selectedDept'),
);

const makeSelectedPstnDept = () => createSelector(
  selectOrgRole,
  org => org.get('selectedPstnDept'),
);

const makeSelectedDutyDept = () => createSelector(
  selectOrgRole,
  org => org.get('selectedDutyDept'),
);

const makeCheckboxInitialize = () => createSelector(
  selectOrgRole,
  org => org.get('checkboxInitialize'),
);

const makeSelectEmptyRowsView = () => createSelector(
  selectOrgRole,
  org => org.get('emptyRowsView'),
);

const makeSelectEmptyRowsViewForPstn = () => createSelector(
  selectOrgRole,
  org => org.get('emptyRowsViewForPstn'),
);

const makeSelectEmptyRowsViewForDuty = () => createSelector(
  selectOrgRole,
  org => org.get('emptyRowsViewForDuty'),
);

const makeSelectEmptyRowsViewForGrp = () => createSelector(
  selectOrgRole,
  org => org.get('emptyRowsViewForGrp'),
);

const makeSelectSelectedIndex = () => createSelector(
  selectOrgRole,
  org => org.get('selectedIndex'),
);

const makeSelectSelectedPstnIndex = () => createSelector(
  selectOrgRole,
  org => org.get('selectedPstnIndex'),
);

const makeSelectSelectedDutyIndex = () => createSelector(
  selectOrgRole,
  org => org.get('selectedDutyIndex'),
);

const makeSelectSelectedGrpIndex = () => createSelector(
  selectOrgRole,
  org => org.get('selectedGrpIndex'),
);

const makeSelectSelectedId = () => createSelector(
  selectOrgRole,
  org => org.get('selectedId'),
);

const makeSelectProfile = () => createSelector(
  selectOrgRole,
  org => org.get('profile'),
);

const makeSelectSelectedUserDeptName = () => createSelector(
  selectOrgRole,
  org => org.get('selectedUserDeptName'),
);

const makeSelectSiteId = () => createSelector(
  selectOrgRole,
  org => org.get('siteId'),
);

const makeSelectView = () => createSelector(
  selectHynixCommon,
  viewState => viewState.view,
);

const makeSelectGroupData = () => createSelector(
  selectOrgRole,
  selector => selector.get('groupData'),
);

const makeSelectGroupMemberData = () => createSelector(
  selectOrgRole,
  selector => selector.get('groupMemberData'),
);

const makeSelectSearchResultData = () => createSelector(
  selectOrgRole,
  selector => selector.get('searchResultData'),
);

export {
  makeTreeData,
  makeGrpTreeData,
  makePstnTreeData,
  makeDutyTreeData,
  makeUsers,
  makeGrpUsers,
  makePstnUsers,
  makeDutyUsers,
  makeUser,
  makeOrganizationSearchResult,
  makeOrganizationSearchResultForPstn,
  makeOrganizationSearchResultForDuty,
  makeOrganizationData,
  makeOrganizationPstnData,
  makeOrganizationDutyData,
  makeOrganizationGrpData,
  makeSelectedDept,
  makeSelectedPstnDept,
  makeSelectedDutyDept,
  makeCheckboxInitialize,
  makeSelectEmptyRowsView,
  makeSelectEmptyRowsViewForPstn,
  makeSelectEmptyRowsViewForDuty,
  makeSelectEmptyRowsViewForGrp,
  makeSelectSelectedIndex,
  makeSelectSelectedPstnIndex,
  makeSelectSelectedDutyIndex,
  makeSelectSelectedGrpIndex,
  makeSelectProfile,
  makeSelectSelectedUserDeptName,
  makeSelectSelectedId,
  makeSelectSiteId,
  makeSelectView,

  makeSelectGroupData,
  makeSelectGroupMemberData,
  makeSelectSearchResultData,
};
