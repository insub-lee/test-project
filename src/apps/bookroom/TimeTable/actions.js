import * as constants from './constants';

export const loadingBookedRooms = (searchDate, searchFrTime, searchToTime, searchTerm, searchCompCd, searchBldgCd, searchFloor, searchLoc, searchAllFloor, searchTab) => (
  {
    type: constants.LOADING_BOOKED_ROOMS_SAGA,
    payload : {
      searchDate, searchFrTime, searchToTime, searchTerm, searchCompCd, searchBldgCd, searchFloor, searchLoc, searchAllFloor, searchTab
    }
  }
);

export const loadingParam = () => (
  {
    type: constants.LOADING_PARAM_SAGA,
  }
);

export const loadingMeetRoom = () => (
  {
    type: constants.LOADING_MEET_ROOM_SAGA,
  }
);

export const loadingFavoriteLocList = (history) => (
  {
    type: constants.LOADING_FAVORITE_LOC_LIST_SAGA,
    payload : {
      history
    }
  }
);
