import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  getIfBoardDataList: [],
});

const IfBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_IFBOARD_DATA_LIST:
      return state.set('getIfBoardDataList', action.payload);
    default:
      return state;
  }
};

export default IfBoardReducer;
