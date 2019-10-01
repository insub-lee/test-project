import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  bookmarkWidget: {},
});

const CSManualWidgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_BOOKMARK_DATA: {
      const { widgetId, bookmarkList } = action;
      return state.setIn(['bookmarkWidget', widgetId, 'bookmarkList'], bookmarkList);
    }

    // 위젯 - INIT DATA SET
    case constants.SET_WIDGET_INIT_DATA: {
      const { item } = action;
      return state.setIn(['bookmarkWidget', item.WIDGET_ID, 'viewMualIdx'], item.data.selectedBookmark);
    }

    // 위젯 - 페이지 이동
    case constants.SET_WIDGET_MUALIDX: {
      const { widgetId, selectedMual } = action;
      return state.setIn(['bookmarkWidget', widgetId, 'viewMualIdx'], selectedMual);
    }

    default:
      return state;
  }
};

export default CSManualWidgetReducer;
