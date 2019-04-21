import { fromJS } from 'immutable';

import * as actionType from './constants';

const initialState = fromJS({
  weekScheduleList: [],
  tp: '',
});

const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionType.SET_WEEK_SCHEDULELIST: {
      return state.set('weekScheduleList', action.payload).set('tp',action.tp);
    }

    default:
      return state;
  }
};

export default scheduleReducer;