import { LOAD_ALARM, READ_ALARM_SAGA, ALL_READ_SAGA, DELETE_ALARM_SAGA, DELETE_ALL_ALARM_SAGA, ALARM_OFF } from './constants';

export const loadAlarm = pageNum => ({
  type: LOAD_ALARM,
  pageNum,
});

export const readAlarm = id => ({
  type: READ_ALARM_SAGA,
  id,
});

export const allReadAlarm = () => ({
  type: ALL_READ_SAGA,
});

export const deleteAlarm = id => ({
  type: DELETE_ALARM_SAGA,
  id,
});

export const deleteAllAlarm = id => ({
  type: DELETE_ALL_ALARM_SAGA,
  id,
});

export const offAlarm = () => ({
  type: ALARM_OFF,
});
