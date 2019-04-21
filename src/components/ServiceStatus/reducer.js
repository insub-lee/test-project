import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  serviceData: [],
});

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_SERVICE_DATA:
      return state.set('serviceData', action.servicedata);
    default:
      return state;
  }
};

export default serviceReducer;
