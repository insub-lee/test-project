import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  getIflowDataList: [],
});

const IflowReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_IFLOW_DATA_LIST:
      return state.set('getIflowDataList', action.payload);
    default:
      return state;
  }
};

export default IflowReducer;
