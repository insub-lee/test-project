import { createSelector } from 'reselect';

const selectApps = state => state.get('Today');

const makeGettp = () => createSelector(
  selectApps,
  messageState => messageState.get('tp'),
);
const makeGetweekTodayList = () => createSelector(
  selectApps,
  messageState => messageState.get('weekTodayList'),
);

export {
  selectApps,
  makeGetweekTodayList,
  makeGettp,
};
