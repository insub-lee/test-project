import { fromJS } from 'immutable';
import * as constantTypes from './constants';

const initialState = fromJS({
  mode: 'L',
  selectedNode: {},
  treeData: [],
  categoryInfo: {},
  selectedIndex: 0,
  onHoverKey: 0,
  isWaitModal: false,
  manualListState: {},
  isLoding: false,
  paginationIdx: 1,
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.CHANGE_TEXT: {
      const { text } = action;
      return state.set('title', text);
    }
    case constantTypes.CHANGE_VIEW_MODE: {
      const { mode, node } = action;
      if (mode === 'I' || mode === 'U') {
        return state
          .set('mode', mode)
          .set('selectedNode', fromJS(node))
          .set('selectedIndex', node.CATEGORY_IDX)
          .setIn(['categoryInfo', 'CATEGORY_PARENT_IDX'], mode === 'I' ? node.CATEGORY_IDX : node.CATEGORY_PARENT_IDX)
          .setIn(['categoryInfo', 'SORT_SQ'], mode === 'I' ? 9999 : node.SORT_SQ)
          .setIn(['categoryInfo', 'LVL'], mode === 'I' ? node.LVL + 1 : node.LVL)
          .setIn(['categoryInfo', 'DISPLAY_YN'], mode === 'I' ? 'Y' : node.DISPLAY_YN)
          .setIn(['categoryInfo', 'CATEGORY_NAME'], mode === 'I' ? '' : node.CATEGORY_NAME)
          .setIn(['categoryInfo', 'CATEGORY_IDX'], mode === 'I' ? '' : node.CATEGORY_IDX);
      }
      return state.set('mode', mode).set('selectedNode', fromJS(node));
    }
    case constantTypes.CHANGE_CATEGORY_INFO: {
      const { key, value } = action;
      return state.setIn(['categoryInfo', key], value);
    }
    case constantTypes.CHANGE_CATEGORY_TREE_DATA: {
      const { treeData } = action;
      return state.set('treeData', fromJS(treeData));
    }
    case constantTypes.CHANGE_SELECTED_INDEX: {
      const { selectedIndex } = action;
      if (selectedIndex === 0) {
        const treeData = state.get('treeData');
        return state.set('selectedIndex', treeData[0].CATEGORY_IDX || 0);
      }
      return state.set('selectedIndex', selectedIndex);
    }
    case constantTypes.SET_ON_HOVER_KEY: {
      const { key } = action;
      return state.set('onHoverKey', key);
    }
    case constantTypes.SET_IS_WAIT_MODAL: {
      const { flag } = action;
      return state.set('isWaitModal', flag);
    }
    case constantTypes.SET_MANUALLIST_REDUCR: {
      const { manualList } = action;
      return state.setIn(['manualListState'], manualList).set('isLoding', false);
    }
    case constantTypes.SET_LIST_LODING_REDUCR: {
      const { flag } = action;
      return state.set('isLoding', flag);
    }
    case constantTypes.SET_PAGINATION_IDX_REDUCR: {
      const { idx } = action;
      return state.set('paginationIdx', idx);
    }
    default:
      return state;
  }
};

export default appReducer;
