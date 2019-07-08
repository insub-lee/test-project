import { createSelector } from 'reselect';

const selectHynixCommon = state => state.get('hynix.common');

// ****************** 초기 로그인 성공시 라우터의 스토어에서 가져오는 state ******************
const makeMyAppTree = () => createSelector(
  selectHynixCommon,
  portalState => portalState.get('myAppTreeData').toJS(),
);

const makeMyAppStoreTree = () => createSelector(
  selectHynixCommon,
  portalState => portalState.get('myAppStoreTreeData').toJS(),
);

export {
  makeMyAppTree,
  makeMyAppStoreTree,
};
