import { fromJS } from 'immutable';
import * as constantTypes from './constants';

const initialState = fromJS({
  processInfo: {
    PRC_ID: -1,
  },
  processStep: [],
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_PROCESS_DATA: {
      const { processInfo, processStep } = action;
      return state.set('processInfo', fromJS(processInfo)).set('processStep', fromJS(processStep));
    }
    case constantTypes.INIT_PROCESS_DATA: {
      return initialState;
    }
    case constantTypes.CHANGE_STEP_INFO: {
      const { stepInfo } = action;
      const index = state.get('processStep').findIndex(step => step.get('STEP') === stepInfo.STEP);
      return state.setIn(['processStep', index], fromJS(stepInfo));
    }
    default:
      return state;
  }
};

export default appReducer;
