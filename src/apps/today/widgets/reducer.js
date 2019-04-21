import { fromJS } from 'immutable';

import * as actionType from './constants';

const initialState = fromJS({
  weekTodayList: [],
  tp: '',
});

const todayReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionType.SET_WEEK_TODAYLIST: {
      return state.set('weekTodayList', action.payload).set('tp',action.tp);
    }
    default:
      return state;
  }
};

export default todayReducer;