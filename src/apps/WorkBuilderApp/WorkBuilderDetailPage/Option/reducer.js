import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  useWorkFlow: true,
  useDynamicWorkFlow: false,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_USE_WORK_FLOW: {
      const useWorkFlow = state.get('useWorkFlow');
      const useDynamicWorkFlow = state.get('useDynamicWorkFlow');
      return state.set('useWorkFlow', !useWorkFlow).set('useDynamicWorkFlow', useWorkFlow ? false : useDynamicWorkFlow);
    }
    case actionTypes.TOGGLE_USE_DYNAMIC_WORK_FLOW: {
      const useDynamicWorkFlow = state.get('useDynamicWorkFlow');
      return state.set('useDynamicWorkFlow', useDynamicWorkFlow);
    }
    case actionTypes.SUCCESS_FETCH_DATA: {
      const { data } = action;
      console.debug('@@ success', data);
      return state;
    }
    case actionTypes.ACTION_TYPES:
    default:
      return state;
  }
};

export default reducer;
