import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  siteListAll: [],
  BcUdt: [],
});

const BcInfoReducer = (state = initialState, action) => {
  
  console.log('#####################[BcinfoEdit....BcInfoReducer]#######################');

  switch (action.type) {
    case constants.SET_SITE_DETAIL:
      return state.set('siteListAll', action.payload);
    
    default:
      return state;
  }
};

export default BcInfoReducer;


