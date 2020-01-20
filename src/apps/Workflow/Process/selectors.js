import { createSelector } from 'reselect';

const selectProcess = state => state.get('apps.Workflow.Process');

const makeProcessInfo = () =>
  createSelector(
    selectProcess,
    state => state.get('processInfo').toJS(),
  );

const makeProcessStep = () =>
  createSelector(
    selectProcess,
    state => state.get('processStep').toJS(),
  );

const makeStepInfo = () =>
  createSelector(
    selectProcess,
    state => state.get('stepInfo').toJS(),
  );

export { makeProcessInfo, makeProcessStep, makeStepInfo };
