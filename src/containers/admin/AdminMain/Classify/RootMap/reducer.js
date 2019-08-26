import { fromJS } from 'immutable';
import * as constantTypes from './constants';

const initialState = fromJS({
  rootMapList: [],
  selectedRowKeys: [],
  visibleModal: false,
  selectedRootMap: {},
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_ROOTMAP_LIST: {
      const { rootMapList } = action;
      return state.set('rootMapList', fromJS(rootMapList));
    }
    case constantTypes.SET_VISIBLE_MODAL: {
      const { visibleModal } = action;
      return state.set('visibleModal', visibleModal);
    }
    case constantTypes.SET_SELECTED_ROW_KEYS: {
      const { selectedRowKeys } = action;
      return state.set('selectedRowKeys', fromJS(selectedRowKeys));
    }
    case constantTypes.SET_SELECTED_ROOTMAP: {
      const { rootMap } = action;
      return state.set('selectedRootMap', fromJS(rootMap));
    }
    default:
      return state;
  }
};

export default appReducer;
