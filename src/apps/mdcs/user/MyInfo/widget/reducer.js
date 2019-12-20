import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  settingData: {},
});

const MyInfoWidgetReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.CHANGE_USER_INFO: {
      const { poolData } = action;
      return state;
    }

    default:
      return state;
  }
};

export default MyInfoWidgetReducer;
