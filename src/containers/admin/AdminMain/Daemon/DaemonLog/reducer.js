import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  daemonLogList: [],
  isLoading: false,
});

const DaemonLogListReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_DAEMONLOG_LIST:
      return state.set('daemonLogList', action.payload);
    case constants.IS_LOADING:
      return state.set('isLoading', action.isLoading);
    default:
      return state;
  }
};

export default DaemonLogListReducer;
