import { createSelector } from 'reselect';

const makeSelectNotificationBoardState = state => state.get('apps-mdcs-user-NotificationBoard-reducer');

const makeSelectNotificationList = () => createSelector(makeSelectNotificationBoardState, state => state.get('notificationList'));

export default {
  makeSelectNotificationList,
};
