import { fromJS } from 'immutable';

import * as constants from './constants';

const initState = fromJS({
  reservationData: {},
});

const reservationDetailModalReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_RESERVATION_DETAIL:
      return state.set('reservationData', action.reservationData);
    default:
      return state;
  }
};

export default reservationDetailModalReducer;
