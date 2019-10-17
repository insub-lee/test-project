import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  settingData: {},
});

const MyInfoWidgetReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.CHANGE_USER_INFO: {
      const { target, value } = action;
      return state.setIn(['settingData', target], value);
    }

    default:
      return state;
  }
};

export default MyInfoWidgetReducer;
