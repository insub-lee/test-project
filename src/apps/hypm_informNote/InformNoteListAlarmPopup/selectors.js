import { createSelector } from 'reselect';

const selectAlarm = state => state.get('InformNoteListAlarmPopup');

const makeSdptList = () => createSelector(
  selectAlarm,
  params => params.get('sdptList'),
);

const makeFlList = () => createSelector(
  selectAlarm,
  params => params.get('flList'),
);

const makeModelList = () => createSelector(
  selectAlarm,
  params => params.get('modelList'),
);

const makeDownTypeList = () => createSelector(
  selectAlarm,
  params => params.get('downTypeList'),
);

const makeAlarmList = () => createSelector(
  selectAlarm,
  params => params.get('alarmData'),
);

export {
  makeSdptList,
  makeFlList,
  makeModelList,
  makeDownTypeList,
  makeAlarmList,
};
