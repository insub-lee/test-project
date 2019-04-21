import { createSelector } from 'reselect';

const selectAlarm = state => state.get('InformNoteListAlarmListPopup');

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

const makeAlarmDataList = () => createSelector(
  selectAlarm,
  params => params.get('alarmDataList').toJS(),
);

export {
  makeSdptList,
  makeFlList,
  makeModelList,
  makeDownTypeList,
  makeAlarmDataList,
};
