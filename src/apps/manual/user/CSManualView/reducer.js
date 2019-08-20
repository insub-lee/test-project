import { fromJS } from 'immutable';
import * as constantTypes from './constants';

const initialState = fromJS({
  manualViewMap: {},
  // selectedMualTabIdx: 0,
  // selectedMualIdx: 0,
  // selectedTabIdx: 0,
  // selectedCompIdx: 0,
  // manualTabList: [],
  // scrollComp: {},
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_MANUAL_VIEW_REDUCR: {
      const { maulTabList, widgetId } = action;
      return state.setIn(['manualViewMap', widgetId, 'manualTabList'], maulTabList);
    }
    case constantTypes.SET_SELECTED_MUAL_IDX_REDUCR: {
      const { mualIdx, widgetId } = action;
      return state.setIn(['manualViewMap', widgetId, 'selectedMualIdx'], mualIdx);
    }
    case constantTypes.SET_SELECTED_TAB_IDX_REDUCR: {
      const { idx, widgetId } = action;
      return state.setIn(['manualViewMap', widgetId, 'selectedTabIdx'], idx);
    }
    case constantTypes.SET_SELECTED_COMPONENT_IDX_REDUCR: {
      const { idx, widgetId } = action;
      return state.setIn(['manualViewMap', widgetId, 'selectedCompIdx'], idx);
    }
    case constantTypes.RESET_MANUAL_VIEW_REDUCR: {
      const { widgetId } = action;
      return state
        .setIn(['manualViewMap', widgetId, 'selectedMualTabIdx'], 0)
        .setIn(['manualViewMap', widgetId, 'selectedTabIdx'], 0)
        .setIn(['manualViewMap', widgetId, 'selectedCompIdx'], 0)
        .setIn(['manualViewMap', widgetId, 'manualTabList'], fromJS([]))
        .setIn(['manualViewMap', widgetId, 'historyList'], fromJS([]))
        .setIn(['manualViewMap', widgetId, 'bookmarkList'], fromJS([]))
        .setIn(['manualViewMap', widgetId, 'manualMaster'], fromJS({}))
        .setIn(['manualViewMap', widgetId, 'navList'], fromJS([]));
    }
    case constantTypes.SET_SCROLL_COMPONENT_REDUCR: {
      const { item, widgetId } = action;
      return state.setIn(['manualViewMap', widgetId, 'scrollComp'], fromJS(item));
    }
    case constantTypes.SET_MANUAL_VIEW_HISTORY_REDUCR: {
      const { historyList, widgetId } = action;
      return state.setIn(['manualViewMap', widgetId, 'historyList'], historyList);
    }
    case constantTypes.SET_MANUAL_BOOKMARK_REDUCR: {
      const { historyList, widgetId } = action;
      return state.setIn(['manualViewMap', widgetId, 'bookmarkList'], historyList);
    }
    case constantTypes.SET_MANUAL_MASTER_REDUCR: {
      const { manualMaster, widgetId } = action;
      return state.setIn(['manualViewMap', widgetId, 'manualMaster'], manualMaster);
    }
    case constantTypes.SET_MANUAL_VIEW_NAV_LIST_REDUCR: {
      const { navList, widgetId } = action;
      return state.setIn(['manualViewMap', widgetId, 'navList'], navList);
    }
    default:
      return state;
  }
};

export default appReducer;
