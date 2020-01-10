import { createSelector } from 'reselect';

const selectClassifyRootMap = state => state.get('containers.admin.AdminMain.Classify.RootMap');

const makeRootMapList = () => createSelector(selectClassifyRootMap, state => state.get('rootMapList').toJS());

const makeVisibleModal = () => createSelector(selectClassifyRootMap, state => state.get('visibleModal'));

const makeSelectedRowKeys = () => createSelector(selectClassifyRootMap, state => state.get('selectedRowKeys').toJS());

const makeSelectedRootMap = () => createSelector(selectClassifyRootMap, state => state.get('selectedRootMap').toJS());

const makeRootMapGuun = () => createSelector(selectClassifyRootMap, state => state.get('GUBUN'));

export { makeRootMapList, makeVisibleModal, makeSelectedRowKeys, makeSelectedRootMap, makeRootMapGuun };
