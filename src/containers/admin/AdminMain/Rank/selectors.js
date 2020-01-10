import { createSelector } from 'reselect';

const selectRank = state => state.get('Rank');

const makeSelectRankComboList = () => createSelector(selectRank, position => position.get('rankComboData').toJS());

const makeRankTreeData = () => createSelector(selectRank, position => position.get('rankTreeData').toJS());

const makeSelectedDept = () => createSelector(selectRank, position => position.get('selectedDept'));

const makeSelectedIndex = () => createSelector(selectRank, position => position.get('selectedIndex'));

export { selectRank, makeSelectRankComboList, makeRankTreeData, makeSelectedDept, makeSelectedIndex };
