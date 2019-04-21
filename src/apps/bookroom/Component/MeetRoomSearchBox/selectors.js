import { createSelector } from 'reselect';

const FavoriteRoom = state => state.get('MeetRoomSearchBox');


const makeCompParams = () => createSelector(
  FavoriteRoom,
  params => params.get('compList'),
);

const makeBldgParams = () => createSelector(
  FavoriteRoom,
  params => params.get('bldgList'),
);

const makeFloorParams = () => createSelector(
  FavoriteRoom,
  params => params.get('floorList'),
);

const makeMeetRoomsDetail = () => createSelector(
  FavoriteRoom,
  detailMeetRoomList => detailMeetRoomList.get('detailMeetRoomList'),
);

 

export {
  makeCompParams,
  makeBldgParams,
  makeFloorParams,
  makeMeetRoomsDetail,

};
