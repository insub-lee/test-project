import { createSelector } from 'reselect';

const selectMenuList = state => state.get('menuList');

const makeSelectCollapsed = () => createSelector(
  selectMenuList,
  menuListState => menuListState.get('collapsed'),
);

const makeSelectMenus = () => createSelector(
  selectMenuList,
  menuListState => menuListState.get('menus').toJS(),
);

const makeSearchword = () => createSelector(
  selectMenuList,
  menuListState => menuListState.get('searchword'),
);

const makeMenuName = () => createSelector(
  selectMenuList,
  menuListState => menuListState.get('menuName'),
);

const makeMenuList = () => createSelector(
  selectMenuList,
  menuListState => menuListState.get('menuList'),
);

export {
  selectMenuList,
  makeSelectCollapsed,
  makeSelectMenus,
  makeSearchword,
  makeMenuName,
  makeMenuList,
};
