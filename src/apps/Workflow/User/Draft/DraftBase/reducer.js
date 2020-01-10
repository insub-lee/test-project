import { fromJS } from 'immutable';
import * as constantTypes from './constants';

const initialState = fromJS({
  draftDetail: {},
  signline: [],
  draftHistory: [],
  isRedirect: false,
  visibleOpinionModal: false,
  approvalProcessQueId: 0,
  stepLine: {},
  processStep: [],
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_DRAFT_DETAIL: {
      const { detail, signline, draftHistory } = action;
      return state.set('draftDetail', fromJS(detail)).set('signline', fromJS(signline));
      // .set('draftHistory', fromJS(draftHistory));
    }
    case constantTypes.SET_ISREDIRECT: {
      const { isRedirect } = action;
      return state.set('isRedirect', isRedirect);
    }
    case constantTypes.SET_VISIBLE_OPINION: {
      const { visibleOpinionModal } = action;
      return state.set('visibleOpinionModal', visibleOpinionModal);
    }
    case constantTypes.INIT_DRAFT_DETAIL: {
      return initialState;
    }
    case constantTypes.SET_APPROVAL_PROCESS_QUE_ID_BY_REDUCR: {
      const { queId } = action;
      return state.set('approvalProcessQueId', queId);
    }
    case constantTypes.SET_DRAFT_STEP_INFO_BY_REDUCR: {
      const { step, stepList } = action;
      return state.setIn(['stepLine', step], stepList);
    }
    case constantTypes.SET_PROCESS_DATA_BY_REDUCR: {
      const { processInfo, processStep } = action;
      const stepLine = {};
      processStep.forEach(node => {
        stepLine[node.STEP] = [];
      });
      return state
        .set('processInfo', fromJS(processInfo))
        .set('processStep', fromJS(processStep))
        .set('stepLine', fromJS(stepLine));
    }
    default:
      return state;
  }
};

export default appReducer;
