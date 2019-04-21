import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
});

const serviceReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.SERVICE_INFO:
      return state.set('serviceData', action.serviceData);
    case constants.SET_UPDATE_FLAG:
      return state.set('updateCheck', action.updateCheck);
    default:
      return state;
  }
};
export default serviceReducer;
