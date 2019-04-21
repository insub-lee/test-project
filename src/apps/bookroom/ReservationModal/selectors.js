import { createSelector } from 'reselect';

const selectAuth = state => state.get('auth');
const selectReservationModal = state => state.get('reservationModal');

const makeSelectUserName = () => createSelector(
  selectAuth,
  (selectProfile) => {
    const userProfile = selectProfile.get('profile');
    const userName = {
      NAME_KOR: userProfile.NAME_KOR,
      NAME_ENG: userProfile.NAME_ENG,
      NAME_CHN: userProfile.NAME_CHN,
      NAME_JPN: userProfile.NAME_JPN,
      NAME_ETC: userProfile.NAME_ETC,
    };

    return userName;
  },
);

const makeSelectProfile = () => createSelector(
  selectAuth,
  selectProfile => selectProfile.get('profile'),
);

const makeSelectResModalType = () => createSelector(
  selectReservationModal,
  selectResModalType => selectResModalType.get('resModalType'),
);

const makeSelectResModalMsg = () => createSelector(
  selectReservationModal,
  selectResModalMsg => selectResModalMsg.get('resModalMsg'),
);

const makeSelectLocationAndNoti = () => createSelector(
  selectReservationModal,
  selectLocation => selectLocation.get('locationAndNoti').toJS(),
);

export {
  makeSelectUserName,
  makeSelectResModalType,
  makeSelectLocationAndNoti,
  makeSelectProfile,
  makeSelectResModalMsg,
};
