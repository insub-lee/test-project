import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  appRatingInfo: [],
  appRatingList: [],
  myAppRating: [],
  rtheiFlog: true,
  appRatingListSize: 0,
});

const AppRatingReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.RES_APP_RATING_INFO:
      return state.set('appRatingInfo', action.payload);
    case constants.RES_APP_RATING_LIST:
      return state.set('appRatingList', action.payload);
    case constants.MY_APP_RATING:
      return state.set('myAppRating', action.payload);
    case constants.RTHEI_FLOG:
      return state.set('rtheiFlog', action.payload);
    case constants.APP_RATING_LIST_SIZE:
      return state.set('appRatingListSize', action.payload);
    default:
      return state;
  }
};

export default AppRatingReducer;
