import { createSelector } from 'reselect';

const selectMenu = state => state.get('menu-cardList');

const makeMenuList = () =>
  createSelector(
    selectMenu,
    menuList => menuList.get('menuList').toJS(),
  );

const makeParentInfo = () =>
  createSelector(
    selectMenu,
    parentInfo => parentInfo.get('parentInfo'),
  );

export { selectMenu, makeMenuList, makeParentInfo };
