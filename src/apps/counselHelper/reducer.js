import { fromJS } from 'immutable';
import * as actionConst from './constants';

const initialState = fromJS({
  cardMap: {},
  starList: {},
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionConst.SAVE_CARD_LIST: {
      const { cardList, WIDGET_ID, KEYWORD } = action;
      console.debug('Reducer keyword >> ', KEYWORD);
      return state.setIn(['cardMap', WIDGET_ID, 'cardList'], cardList).setIn(['cardMap', WIDGET_ID, 'keyword'], KEYWORD);
    }

    default:
      return state;
  }
};
export default appReducer;
