import { createSelector } from 'reselect';

const selectMenuList = state => state.get('adminMenu');

const makeSearchword = () =>
  createSelector(
    selectMenuList,
    menuListState => menuListState.get('searchword'),
  );

const makeMenuName = () =>
  createSelector(
    selectMenuList,
    menuListState => menuListState.get('menuName'),
  );

const makeMenuList = () =>
  createSelector(
    selectMenuList,
    menuListState => menuListState.get('menuList'),
  );

export { selectMenuList, makeSearchword, makeMenuName, makeMenuList };
