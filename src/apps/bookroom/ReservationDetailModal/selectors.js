import { createSelector } from 'reselect';

const selectReservationDetailModal = state => state.get('reservationDetailModal');

const makeSelectReservationData = () => createSelector(
  selectReservationDetailModal,
  reservationData => reservationData.get('reservationData'),
);

export {
  makeSelectReservationData,
};
