import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  appSecList: [],
  appAuthCnl: undefined,
});

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_APPSECLIST:
      return state.set('appSecList', action.appSecList).set('appAuthCnl', action.appAuthCnl);
    default:
      return state;
  }
};

export default orgReducer;
