import { fromJS } from 'immutable';
import * as actionConst from './constants';

const initialState = fromJS({
  detailMap: {},
  starList: {},
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionConst.SAVE_DETAIL: {
      const { detail, WIDGET_ID } = action;
      return state.setIn(['detailMap', WIDGET_ID, 'detail'], fromJS(detail));
    }
    case actionConst.SAVE_STAR_POINT: {
      const { starList } = action;
      return state.set('starList', starList);
    }
    default:
      return state;
  }
};
export default appReducer;
