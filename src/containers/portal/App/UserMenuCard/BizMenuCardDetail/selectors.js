import { createSelector } from 'reselect';

const selectOrg = state => state.get('bizMenuCardDetail');

const makeMapList = () => createSelector(selectOrg, state => state.get('mapList').toJS());

const makgeBizMenuData = () => createSelector(selectOrg, state => state.get('bizMenuData').toJS());

const makeSelectedIndex = () => createSelector(selectOrg, state => state.get('selectedIndex'));

const makeSelectLoading = () => createSelector(selectOrg, state => state.get('loading'));

export { selectOrg, makeMapList, makgeBizMenuData, makeSelectedIndex, makeSelectLoading };
