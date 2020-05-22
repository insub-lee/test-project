import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  daemonList: [],
  isLoading: false,
});

const DaemonListReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_DAEMON_LIST:
      return state.set('daemonList', action.payload);
    case constants.IS_LOADING:
      return state.set('isLoading', action.isLoading);
    default:
      return state;
  }
};

export default DaemonListReducer;
