import { fromJS } from 'immutable';
import * as constantTypes from './constants';

const initialState = fromJS({
  rootMapList: [],
  categoryMapList: [],
  selectedNode: {
    NODE_ID: -1,
    MAP_ID: -1,
    PARENT_NODE_ID: -1,
    LVL: 0,
    NODE_ORDINAL: '',
    FULL_PATH: '',
    NAME_KOR: '',
    NAME_ENG: '',
    NAME_CHN: '',
    children: [],
  },
  isAdd: false,
  addNodeInfo: {
    NAME_KOR: '',
    NAME_ENG: '',
    NAME_CHN: '',
  },
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_ROOTMAP_LIST: {
      const { rootMapList } = action;
      return state.set('rootMapList', fromJS(rootMapList));
    }
    case constantTypes.SET_CATEGORYMAP_LIST: {
      const { categoryMapList } = action;
      return state.set('categoryMapList', fromJS(categoryMapList));
    }
    case constantTypes.SET_SELECTED_NODE: {
      const { selectedNode } = action;
      return state.set('selectedNode', fromJS(selectedNode));
    }
    case constantTypes.SET_IS_ADD: {
      const { isAdd } = action;
      return state.set('isAdd', isAdd);
    }
    case constantTypes.INIT_ADDNODE_INFO: {
      return state.set('addNodeInfo', initialState.get('addNodeInfo'));
    }
    case constantTypes.SET_ADDNODE_INFO: {
      const { nodeInfo } = action;
      return state.set('addNodeInfo', fromJS(nodeInfo));
    }
    default:
      return state;
  }
};

export default appReducer;
