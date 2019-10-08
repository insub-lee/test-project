import { createSelector } from 'reselect';

const selectorNodeRegist = state => state.get('containers.admin.AdminMain.Node.NodeRegist');

const makeNodeDetail = () =>
  createSelector(
    selectorNodeRegist,
    state => state.get('node').toJS(),
  );

export default { makeNodeDetail };
