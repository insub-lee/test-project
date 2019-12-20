import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  initType: '',
  menuType: 'NORMAL',
  mapList: [],
  categoryData: [],
  categoryFlatData: [],
  // bizMenuData: [],
  searchword: '',
});

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_CATEGORY_DATA:
      return state.set('categoryData', action.categoryData).set('categoryFlatData', action.categoryFlatData);
    case constants.SET_MENU_TYPE:
      return state.set('menuType', action.menuType);
    case constants.SET_MAPLIST:
      return state.set('mapList', action.mapList);
    case constants.SET_MAPLIST_ONE:
      return state.set('initType', 'ONE').set('mapList', action.mapList);
    case constants.SET_MAPLIST_ALL:
      return state.set('initType', 'ALL').set('mapList', action.mapList);
    case constants.SET_MAPLIST_SEARCH:
      return state
        .set('initType', 'SEARCH')
        .set('mapList', action.mapList)
        .set('searchword', action.searchword);
    case constants.SET_MAPLIST_MORE:
      return state.set('mapList', action.mapList);
    default:
      return state;
  }
};

export default orgReducer;
