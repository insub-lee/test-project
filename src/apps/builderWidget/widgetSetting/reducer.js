import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  workList: [],
  WORK_SEQ: -1,
  ITEM_VALUE: {},
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_WORK_LIST: {
      const { workList } = action;
      return state.set('workList', fromJS(workList));
    }
    case actionTypes.CHANGE_WORK_SEQ: {
      const { workSeq } = action;
      console.debug('reducer workSeq >> ', workSeq);
      return state.setIn(['ITEM_VALUE', 'data'], workSeq);
    }
    case actionTypes.SET_BUILDER_WIDGET_CONFIG: {
      const { ITEM_VALUE } = action;
      return state.set('ITEM_VALUE', fromJS(ITEM_VALUE));
    }
    case actionTypes.INIT_SETTING_DATA: {
      return initialState;
    }
    default:
      return state;
  }
};

export default reducer;
