import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
});

const bookRoomReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_MEMBERS:
      return state.set('members', action.members);
    case constants.LOADING_BOOKED_ROOMS:
      return state.set('allBookedRoomList', action.allBookedRoomList).set('avbMeetRoomList', action.avbMeetRoomList).set('expMeetRoomList', action.expMeetRoomList).set('wholeMeetRoomList', action.wholeMeetRoomList);
    case constants.LOADING_PARAM:
      return state.set('compList', action.compList).set('bldgList', action.bldgList).set('floorList', action.floorList);
    case constants.LOADING_MEET_ROOM:
      return state.set('detailMeetRoomList', action.detailMeetRoomList);
    case constants.LOADING_FAVORITE_LOC_LIST:
      return state.set('favLocList', action.favLocList).set('favCheck', action.favCheck);
    default:
      return state;
  }
};

export default bookRoomReducer;
