import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  mapList: [],
});

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_MAPLIST:
      return state.set('mapList', action.mapList);
    default:
      return state;
  }
};

export default orgReducer;
