import { fromJS } from 'immutable';
import * as actionConst from './constants';

const initialState = fromJS({
  categorie: [],
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionConst.SAVE_WIDGET_INFO: {
      return state.set('categorie', fromJS(action.categorie));
    }
    default:
      return state;
  }
};
export default appReducer;
