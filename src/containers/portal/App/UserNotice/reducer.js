import { fromJS } from 'immutable';
import { SET_ISNOTIFY } from 'containers/common/Routes/constants';
import { SET_ALARM, RESET_ALARM, RECEIVE_ALARM, SET_NOTIFY } from './constants';

const initState = fromJS({
  alarm: [],
  alarmData: [],
  isNotify: '',
});

const noticeReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ALARM:
      return state.set('alarm', action.resultValue.list);
    case RESET_ALARM:
      return state.set('alarm', []);
    case RECEIVE_ALARM:
      return state.set('alarmData', action.payload).set('isNotify', '1');
    case SET_ISNOTIFY:
      return state.set('isNotify', action.isNoti);
    case SET_NOTIFY:
      return state.set('isNotify', action.result);
    default:
      return state;
  }
};
export default noticeReducer;
