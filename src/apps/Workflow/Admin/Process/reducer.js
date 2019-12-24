import { fromJS } from 'immutable';
import * as constantTypes from './constants';

const initialState = fromJS({
  processInfo: {
    PRC_ID: -1,
  },
  processStep: [],
  stepInfo: {},
  modalVisible: false,
  spinning: false,
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_PROCESS_STEP: {
      const { processStep } = action;
      return state.set('processStep', fromJS(processStep));
    }
    case constantTypes.SET_PROCESS_INFO: {
      const { prcInfo } = action;
      return state.set('processInfo', fromJS({ PRC_ID: prcInfo.PRC_ID, NAME_KOR: prcInfo.NAME_KOR }));
    }
    case constantTypes.SET_STEP_INFO: {
      const { stepInfo } = action;
      return state.set('stepInfo', fromJS(stepInfo));
    }
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
    case constantTypes.SET_MODAL_VISIBLE: {
      const { visible } = action;
      return state.set('modalVisible', visible);
    }
    case constantTypes.SET_SPINNING: {
      const { spin } = action;
      return state.set('spinning', spin);
    }
    default:
      return state;
  }
};

export default appReducer;
