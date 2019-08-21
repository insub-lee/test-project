import { fromJS } from 'immutable';
import * as actionConst from './constants';

const initialState = fromJS({
  categorie: [],
  detail: [],
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionConst.SAVE_WIDGET_INFO: {
      return state.set('categorie', fromJS(action.categorie));
    }
    case actionConst.SAVE_DETAIL: {
      return state.set('detail', fromJS(action.detail));
    }

    default:
      return state;
  }
};
export default appReducer;
