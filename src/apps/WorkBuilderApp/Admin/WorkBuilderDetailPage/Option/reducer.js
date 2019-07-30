import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  workSeq: -1,
  useWorkFlow: false,
  useDynamicWorkFlow: false,
  isLoading: true,
  workFlowInfo: {},
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_USE_WORK_FLOW: {
      const { checked } = action;
      return state.set('useWorkFlow', checked);
    }
    case actionTypes.SUCCESS_ENABLE_USE_WORK_FLOW: {
      const { data } = action;
      return state.set('useWorkFlow', true).set('workFlowInfo', fromJS(data));
    }
    case actionTypes.SUCCESS_DISABLE_USE_WORK_FLOW: {
      return state.set('useWorkFLow', false).set('workFlowInfo', fromJS({}));
    }
    case actionTypes.TOGGLE_USE_DYNAMIC_WORK_FLOW: {
      const useDynamicWorkFlow = state.get('useDynamicWorkFlow');
      return state.set('useDynamicWorkFlow', useDynamicWorkFlow);
    }
    case actionTypes.FETCH_DATA: {
      const { id } = action;
      return state.set('workSeq', id);
    }
    case actionTypes.SUCCESS_FETCH_DATA: {
      const { data: { workFlow } } = action;
      // Work Flow Data가 있으면 useWorkFlow
      return state.set('useWorkFlow', !!workFlow).set('workFlowInfo', fromJS(workFlow || {}));
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
