import { createSelector } from 'reselect';

const selectMenu = state => state.get('cardList');

const makeMenuList = () =>
  createSelector(
    selectMenu,
    menuList => menuList.get('menuList'),
  );

export { selectMenu, makeMenuList };
