import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  workSeq: -1,
  useWorkFlow: false,
  isLoading: true,
  workFlowInfo: {},
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA: {
      const { id } = action;
      return state.set('workSeq', id);
    }
    case actionTypes.SUCCESS_FETCH_DATA: {
      const {
        data: { workFlow },
      } = action;
      return state.set('useWorkFlow', !!workFlow).set('workFlowInfo', fromJS(workFlow || {}));
    }
    case actionTypes.SUCCESS_UPDATE_PRC_ID: {
      const { data } = action;
      return state.set('workFlowInfo', fromJS(data));
    }
    case actionTypes.LOADING_ON:
      return state.set('isLoading', true);
    case actionTypes.LOADING_OFF:
      return state.set('isLoading', false);
    case actionTypes.RESET_DATA:
      return initialState;
    case actionTypes.ACTION_TYPES:
    default:
      return state;
  }
};

export default reducer;
