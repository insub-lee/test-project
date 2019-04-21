import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
});

const serviceReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.SET_DUPCHECK_FLAG:
      return state.set('dupCheck', action.dupCheck);
    case constants.SET_SAVE_FLAG:
      return state.set('saveCheck', action.saveCheck);
    default:
      return state;
  }
};
export default serviceReducer;
