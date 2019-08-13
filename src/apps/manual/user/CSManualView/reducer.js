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
        .setIn(['manualViewMap', widgetId, 'selectedCompIdx'], fromJS([]))
        .setIn(['manualViewMap', widgetId, 'manualTabList'], fromJS([]));
    }
    case constantTypes.SET_SCROLL_COMPONENT_REDUCR: {
      const { item, widgetId } = action;
      return state.setIn(['manualViewMap', widgetId, 'scrollComp'], fromJS(item));
    }
    default:
      return state;
  }
};

export default appReducer;
