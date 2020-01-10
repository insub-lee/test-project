import { createSelector } from 'reselect';

const selectDuty = state => state.get('Duty');

const makeSelectDutyComboList = () => createSelector(selectDuty, duty => duty.get('dutyComboData').toJS());

const makeDutyTreeData = () => createSelector(selectDuty, duty => duty.get('dutyTreeData').toJS());

const makeSelectedDept = () => createSelector(selectDuty, duty => duty.get('selectedDept'));

const makeSelectedIndex = () => createSelector(selectDuty, duty => duty.get('selectedIndex'));

export { selectDuty, makeSelectDutyComboList, makeDutyTreeData, makeSelectedDept, makeSelectedIndex };
