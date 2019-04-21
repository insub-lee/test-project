import { createSelector } from 'reselect';

const selecUserMenu = state => state.get('previewMenu');
const selectPortal = state => state.get('preview').toJS();

const makeMyAppTree = () => createSelector(
  selecUserMenu,
  myAppState => myAppState.get('myAppTreeData').toJS(),
);

const makeSelectMNotiList = () => createSelector(
  selectPortal,
  portalState => portalState.myMNotiList,
);

export {
  selecUserMenu,
  makeMyAppTree,
  makeSelectMNotiList,
};
