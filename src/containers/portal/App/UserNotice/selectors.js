import { createSelector } from 'reselect';

const selectNotice = state => state.get('notice');
const selectView = state => state.get('hynix.common');

const makeNotice = () => createSelector(
  selectNotice,
  noticeState => noticeState.get('notice'),
);

const makeAllRead = () => createSelector(
  selectNotice,
  noticeState => noticeState.get('allread'),
);

const makeAlarm = () => createSelector(
  selectNotice,
  noticeState => noticeState.get('alarm'),
);

const makeSelectIsNotify = () => createSelector(
  selectNotice,
  noticeState => noticeState.get('isNotify'),
);

const currentView = () => createSelector(
  selectView,
  viewState => viewState.get('view'),
);

export {
  selectNotice,
  makeNotice,
  makeAllRead,
  makeAlarm,
  currentView,

  // Notify Dot
  makeSelectIsNotify,
};
