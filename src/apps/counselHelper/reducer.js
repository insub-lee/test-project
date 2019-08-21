import { fromJS } from 'immutable';
import * as actionConst from './constants';

const initialState = fromJS({
  categorie: [],
  detail: [],
  menu: [],
  searchWord: '',
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionConst.SAVE_WIDGET_INFO: {
      return state.set('categorie', fromJS(action.categorie));
    }
    case actionConst.SAVE_DETAIL: {
      return state.set('detail', fromJS(action.detail));
    }
    case actionConst.SAVE_MENU_INFO: {
      return state.set('menu', fromJS(action.menu));
    }
    case actionConst.SAVE_SEARCH: {
      return state.set('detail', fromJS(action.detail));
    }
    case actionConst.REMOVE_DETAIL: {
      return state.set('detail', fromJS([]));
    }
    case actionConst.SAVE_WIDGETSIZE: {
      return state.set('widgetSize', action.widgetSize);
    }
    case actionConst.SAVE_SEARCH_WORD: {
      return state.set('searchWord', action.text);
    }

    default:
      return state;
  }
};
export default appReducer;
