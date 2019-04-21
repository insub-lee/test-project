import { createSelector } from 'reselect';

const selectRooms = state => state.get('bookroom');
const selectHynixCommon = state => state.get('hynix.common');

const makeAllBookedRoomList = () => createSelector(
  selectRooms,
  allBookedRoomList => allBookedRoomList.get('allBookedRoomList'),
);

const makeTopBookedRoomList = () => createSelector(
  selectRooms,
  topBookedRoomList => topBookedRoomList.get('topBookedRoomList'),
);

const makeAvbMeetRoomList = () => createSelector(
  selectRooms,
  avbMeetRoomList => avbMeetRoomList.get('avbMeetRoomList'),
);

const makeExpMeetRoomList = () => createSelector(
  selectRooms,
  expMeetRoomList => expMeetRoomList.get('expMeetRoomList'),
);

const makeWholeMeetRoomList = () => createSelector(
  selectRooms,
  wholeMeetRoomList => wholeMeetRoomList.get('wholeMeetRoomList'),
);

const makeCompParams = () => createSelector(
  selectRooms,
  params => params.get('compList'),
);

const makeBldgParams = () => createSelector(
  selectRooms,
  params => params.get('bldgList'),
);

const makeFloorParams = () => createSelector(
  selectRooms,
  params => params.get('floorList'),
);

const makeFavLocList = () => createSelector(
  selectRooms,
  favLocList => favLocList.get('favLocList'),
);

const makeFavCheck = () => createSelector(
  selectRooms,
  favCheck => favCheck.get('favCheck'),
);

const makeSelectView = () => createSelector(
  selectHynixCommon,
  selectView => selectView.get('view'),
);

const selectLoading = state => state.get('loading');

const makeIsLoading = () => createSelector(
  selectLoading,
  authState => authState.get('isLoading'),
);

export {
  selectRooms,
  makeAllBookedRoomList,
  makeTopBookedRoomList,
  makeAvbMeetRoomList,
  makeExpMeetRoomList,
  makeWholeMeetRoomList,
  makeCompParams,
  makeBldgParams,
  makeFloorParams,
  makeFavLocList,
  makeFavCheck,
  makeSelectView,
  makeIsLoading,
};
