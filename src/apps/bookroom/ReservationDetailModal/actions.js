import * as constants from './constants';

export const loadingReservationDetail = mrReqNo => ({
  type: constants.LOADING_RESERVATION_DETAIL_SAGA,
  mrReqNo,
});

export const saveCancelBook = (loadingBookedRoomParam, mrReqNo) => ({
  type: constants.SAVE_CANCEL_BOOK_SAGA,
  loadingBookedRoomParam,
  mrReqNo,
});
