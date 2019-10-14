import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  workSeq: -1,
  useWorkFlow: false,
  useDynamicWorkFlow: false,
  isLoading: true,
  workFlowInfo: {},
  useRevision: false,
  revisionInfo: {},
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
      const {
        data: { workFlow, revision },
      } = action;
      // Work Flow Data가 있으면 useWorkFlow
      return state
        .set('useWorkFlow', !!workFlow)
        .set('workFlowInfo', fromJS(workFlow || {}))
        .set('useRevision', !!revision)
        .set('revisionInfo', fromJS(revision || {}));
    }
    case actionTypes.LOADING_ON:
      return state.set('isLoading', true);
    case actionTypes.LOADING_OFF:
      return state.set('isLoading', false);
    case actionTypes.RESET_DATA:
      return initialState;
    case actionTypes.TOGGLE_USE_REVISION: {
      const { checked } = action;
      return state.set('useRevision', checked);
    }
    case actionTypes.SUCCESS_ENABLE_USE_REVISION: {
      const { data } = action;
      return state.set('useRevision', true).set('revisionInfo', fromJS(data));
    }
    case actionTypes.SUCCESS_DISABLE_USE_REVISION: {
      return state.set('useRevision', false).set('revisionInfo', fromJS({}));
    }
    case actionTypes.ACTION_TYPES:
    default:
      return state;
  }
};

export default reducer;
