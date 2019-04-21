import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 사용자가 즐겨찾기에 등록한 구성원들
  userSetMembers: [],
});

const FavoriteRoomReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_PARAM:
      return state.set('compList', action.compList).set('bldgList', action.bldgList).set('floorList', action.floorList);
    case constants.LOADING_MEET_ROOM:
      return state.set('detailMeetRoomList', action.detailMeetRoomList);
    default:
      return state;
  }
};

export default FavoriteRoomReducer;
