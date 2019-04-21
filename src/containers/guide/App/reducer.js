import { fromJS } from 'immutable';
import * as actionTypes from './constants';

// const preKeys = getDefaultPath();

const initialState = fromJS({
  height: window.innerHeight,
  openDrawer: false,
  selectedIndex: '1',
  selectedArticle: 'A_a',
});
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FIRST_LEVEL_SELECTED:
      return state.set('selectedIndex', action.selectedIndex);
    case actionTypes.ARTICLE_SELECTED:
      return state.set('selectedArticle', action.selectedArticle);
    default:
      return state;
  }
};
export default appReducer;
