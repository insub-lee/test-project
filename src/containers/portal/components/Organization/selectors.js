import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const selectOrg = state => state.get('org');
const selectHynixCommon = state => state.get('hynix.common').toJS();

const makeTreeData = () => createSelector(
  selectOrg,
  org => org.get('treeData').toJS(),
);

const makeGrpTreeData = () => createSelector(
  selectOrg,
  org => org.get('grpTreeData').toJS(),
);

const makePstnTreeData = () => createSelector(
  selectOrg,
  org => org.get('pstnTreeData').toJS(),
);

const makeDutyTreeData = () => createSelector(
  selectOrg,
  org => org.get('dutyTreeData').toJS(),
);

const makeUsers = () => createSelector(
  selectOrg,
  (org) => {
    if (org.get('users') === undefined || org.get('users').length === 0) {
      return fromJS([]);
    }
    return org.get('users').toJS();
  },
);

const makeGrpUsers = () => createSelector(
  selectOrg,
  (org) => {
    if (org.get('grpUsers').length === 0) {
      return [];
    }
    return org.get('grpUsers').toJS();
  },
);

const makePstnUsers = () => createSelector(
  selectOrg,
  (org) => {
    if (org.get('pstnUsers').length === 0) {
      return [];
    }
    return org.get('pstnUsers').toJS();
  },
);

const makeDutyUsers = () => createSelector(
  selectOrg,
  (org) => {
    if (org.get('dutyUsers').length === 0) {
      return [];
    }
    return org.get('dutyUsers').toJS();
  },
);

const makeUser = () => createSelector(
  selectOrg,
  org => org.get('user'),
);

const makeOrganizationSearchResult = () => createSelector(
  selectOrg,
  (org) => {
    if (org.get('organizationSearchResult').length === 0) {
      return [];
    }
    return org.get('organizationSearchResult').toJS();
  },
);

const makeOrganizationSearchResultForPstn = () => createSelector(
  selectOrg,
  (org) => {
    if (org.get('organizationSearchResultForPstn').length === 0) {
      return [];
    }
    return org.get('organizationSearchResultForPstn').toJS();
  },
);

const makeOrganizationSearchResultForDuty = () => createSelector(
  selectOrg,
  (org) => {
    if (org.get('organizationSearchResultForDuty').length === 0) {
      return [];
    }
    return org.get('organizationSearchResultForDuty').toJS();
  },
);

const makeOrganizationData = () => createSelector(
  selectOrg,
  org => org.get('organizationData').toJS(),
);

const makeOrganizationPstnData = () => createSelector(
  selectOrg,
  org => org.get('organizationPstnData').toJS(),
);

const makeOrganizationDutyData = () => createSelector(
  selectOrg,
  org => org.get('organizationDutyData').toJS(),
);

const makeOrganizationGrpData = () => createSelector(
  selectOrg,
  org => org.get('organizationGrpData').toJS(),
);

const makeSelectedDept = () => createSelector(
  selectOrg,
  org => org.get('selectedDept'),
);

const makeSelectedPstnDept = () => createSelector(
  selectOrg,
  org => org.get('selectedPstnDept'),
);

const makeSelectedDutyDept = () => createSelector(
  selectOrg,
  org => org.get('selectedDutyDept'),
);

const makeCheckboxInitialize = () => createSelector(
  selectOrg,
  org => org.get('checkboxInitialize'),
);

const makeSelectEmptyRowsView = () => createSelector(
  selectOrg,
  org => org.get('emptyRowsView'),
);

const makeSelectEmptyRowsViewForPstn = () => createSelector(
  selectOrg,
  org => org.get('emptyRowsViewForPstn'),
);

const makeSelectEmptyRowsViewForDuty = () => createSelector(
  selectOrg,
  org => org.get('emptyRowsViewForDuty'),
);

const makeSelectEmptyRowsViewForGrp = () => createSelector(
  selectOrg,
  org => org.get('emptyRowsViewForGrp'),
);

const makeSelectSelectedIndex = () => createSelector(
  selectOrg,
  org => org.get('selectedIndex'),
);

const makeSelectSelectedPstnIndex = () => createSelector(
  selectOrg,
  org => org.get('selectedPstnIndex'),
);

const makeSelectSelectedDutyIndex = () => createSelector(
  selectOrg,
  org => org.get('selectedDutyIndex'),
);

const makeSelectSelectedGrpIndex = () => createSelector(
  selectOrg,
  org => org.get('selectedGrpIndex'),
);

const makeSelectSelectedId = () => createSelector(
  selectOrg,
  org => org.get('selectedId'),
);

const makeSelectProfile = () => createSelector(
  selectOrg,
  org => org.get('profile'),
);

const makeSelectSelectedUserDeptName = () => createSelector(
  selectOrg,
  org => org.get('selectedUserDeptName'),
);

const makeSelectSiteId = () => createSelector(
  selectOrg,
  org => org.get('siteId'),
);

const makeSelectView = () => createSelector(
  selectHynixCommon,
  viewState => viewState.view,
);

export {
  selectOrg,
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
};
