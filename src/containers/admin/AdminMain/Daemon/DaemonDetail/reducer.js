import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  isLoading: false,
  daemonInfo: {},
});

const DaemonDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_DAEMON_INFO:
      return state.set('daemonInfo', action.payload);
    case constants.IS_LOADING:
      return state.set('isLoading', action.isLoading);
    default:
      return state;
  }
};

export default DaemonDetailReducer;
