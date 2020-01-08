import { createSelector } from 'reselect';

const selectProcess = state => state.get('apps.WorkFlow.Admin.SignLine');

const makeProcessInfo = () => createSelector(selectProcess, state => state.get('processInfo').toJS());

const makeProcessStep = () => createSelector(selectProcess, state => state.get('processStep').toJS());

export { makeProcessInfo, makeProcessStep };
