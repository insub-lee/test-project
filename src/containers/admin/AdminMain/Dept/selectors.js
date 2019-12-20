import { createSelector } from 'reselect';

const selectDept = state => state.get('Dept');

const makeSelectDeptComboList = () => createSelector(selectDept, dept => dept.get('deptComboData').toJS());

const makeDeptTreeData = () => createSelector(selectDept, dept => dept.get('deptTreeData').toJS());

const makeSelectedDept = () => createSelector(selectDept, dept => dept.get('selectedDept'));

const makeSelectedIndex = () => createSelector(selectDept, dept => dept.get('selectedIndex'));

export { selectDept, makeSelectDeptComboList, makeDeptTreeData, makeSelectedDept, makeSelectedIndex };
