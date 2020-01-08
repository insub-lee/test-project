import { createSelector } from 'reselect';

const selectProcess = state => state.get('apps.WorkFlow.Admin.Process');

const makeProcessInfo = () => createSelector(selectProcess, state => state.get('processInfo').toJS());

const makeProcessStep = () => createSelector(selectProcess, state => state.get('processStep').toJS());

const makeStepInfo = () => createSelector(selectProcess, state => state.get('stepInfo').toJS());

const makeModalVisible = () => createSelector(selectProcess, state => state.get('modalVisible'));

const makeSpinning = () => createSelector(selectProcess, state => state.get('spinning'));

export { makeProcessInfo, makeProcessStep, makeStepInfo, makeModalVisible, makeSpinning };
