import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
});

const FavoriteLocationReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_PARAM:
      return state.set('compList', action.compList).set('bldgList', action.bldgList).set('floorList', action.floorList);
    case constants.LOADING_FAV_LOC:
      return state.set('favLocList', action.favLocList);
    default:
      return state;
  }
};

export default FavoriteLocationReducer;
