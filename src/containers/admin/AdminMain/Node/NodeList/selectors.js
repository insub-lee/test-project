import { createSelector } from 'reselect';

const selectorNode = state => state.get('containers.admin.AdminMain.Node.NodeList');

const makeNodeList = () =>
  createSelector(
    selectorNode,
    state => state.get('nodeList').toJS(),
  );

export default { makeNodeList };
