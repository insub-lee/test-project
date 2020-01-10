import { createSelector } from 'reselect';

const selectPosition = state => state.get('Position');

const makeSelectPositionComboList = () => createSelector(selectPosition, position => position.get('pstnComboData').toJS());

const makePositionTreeData = () => createSelector(selectPosition, position => position.get('pstnTreeData').toJS());

const makeSelectedDept = () => createSelector(selectPosition, position => position.get('selectedDept'));

const makeSelectedIndex = () => createSelector(selectPosition, position => position.get('selectedIndex'));

export { selectPosition, makeSelectPositionComboList, makePositionTreeData, makeSelectedDept, makeSelectedIndex };
