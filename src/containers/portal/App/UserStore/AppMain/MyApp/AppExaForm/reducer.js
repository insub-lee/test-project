import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  appExamineOk: false,
  APPROVALREQ_COMMENT: [],
  APPROVALPROC_COMNT: [],
  appinfo: [],
  APPROVALPROC_LIST: [],
  svcReqDt: '',
});

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.APP_EXAMINE_OK:
      return state.set('appExamineOk', action.payload);
    case constants.APPROVALREQ_COMMENT:
      return state.set('APPROVALREQ_COMMENT', action.payload);
    case constants.APPROVALPROC_COMNT:
      return state.set('APPROVALPROC_COMNT', action.payload);
    case constants.APP_INFO:
      return state.set('appinfo', action.payload);
    case constants.APPROVALPROC_LIST:
      return state.set('APPROVALPROC_LIST', action.payload);
    case constants.SVC_REQ_DT:
      return state.set('svcReqDt', action.payload);
    default:
      return state;
  }
};

export default orgReducer;
