import { createSelector } from 'reselect';

const selectApps = state => state.get('Schedule');

const makeGettp = () => createSelector(
  selectApps,
  messageState => messageState.get('tp'),
);

const makeGetweekScheduleList = () => createSelector(
  selectApps,
  messageState => messageState.get('weekScheduleList'),
);

export {
  selectApps,
  makeGettp,
  makeGetweekScheduleList,
};
