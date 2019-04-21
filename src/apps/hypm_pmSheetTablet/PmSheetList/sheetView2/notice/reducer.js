import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  noticeList: [],
});

const pmsheetReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_NOTICE_LIST:
      return state.set('noticeList', action.noticeList);
    default:
      return state;
  }
};
export default pmsheetReducer;
