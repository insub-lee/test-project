import { fromJS } from 'immutable';
import * as constantTypes from './constants';
const initialState = fromJS({
  manualListMap: {},
  // isViewContents: false,
  // selectedMualIdx: 0,
  // totalManualList: [],
  // checkedMualList: [],
});

const appCSMualListReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_TOTALMANUALIST: {
      const { totalManualList, widgetId } = action;
      return state.setIn(['manualListMap', widgetId, 'totalManualList'], totalManualList);
    }
    case constantTypes.SET_IS_VIEW_CONTENTS_REDUCR: {
      const { flag, widgetId } = action;
      return state.setIn(['manualListMap', widgetId, 'isViewContents'], flag);
    }
    case constantTypes.SET_SELECTED_MUAL_IDX_REDUCR: {
      const { mualIdx, widgetId } = action;
      return state.setIn(['manualListMap', widgetId, 'selectedMualIdx'], mualIdx);
    }
    case constantTypes.SET_CHECK_MANUAL_REDUCR: {
      const { mualIdx, mualOrgIdx, widgetId } = action;
      const checkedMualList = state.getIn(['manualListMap', widgetId, 'checkedMualList']) || fromJS([]);
      const findIdx = checkedMualList.findIndex(item => item.get('mualIdx') === mualIdx);
      if (findIdx > -1) {
        return state.setIn(['manualListMap', widgetId, 'checkedMualList'], checkedMualList.splice(findIdx, 1));
      }
      return state.setIn(['manualListMap', widgetId, 'checkedMualList'], checkedMualList.push(fromJS({ mualIdx, mualOrgIdx })));
    }
    case constantTypes.RESET_CHECK_MANUAL_REDUCR: {
      const { widgetId } = action;
      return state.setIn(['manualListMap', widgetId, 'checkedMualList'], fromJS([]));
    }
    default:
      return state;
  }
};

export default appCSMualListReducer;
