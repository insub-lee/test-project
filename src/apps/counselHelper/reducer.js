import { fromJS } from 'immutable';
import * as actionConst from './constants';

const initialState = fromJS({
  cardMap: {},
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionConst.SAVE_CARD_LIST: {
      const { cardList, WIDGET_ID, KEYWORD } = action;
      return state.setIn(['cardMap', WIDGET_ID, 'cardList'], cardList).setIn(['cardMap', WIDGET_ID, 'keyword'], KEYWORD);
    }
    case actionConst.CHANGE_KEYWORD: {
      const { WIDGET_ID, KEYWORD } = action;
      return state.setIn(['cardMap', WIDGET_ID, 'keyword'], KEYWORD);
    }
    default:
      return state;
  }
};
export default appReducer;
