import { fromJS } from 'immutable';
import * as constantTypes from './constants';

const initialState = fromJS({
  classifyList: [],
  selectedNode: {
    NODE_ID: -1,
    PARENT_NODE_ID: null,
    LVL: 0,
    NODE_ORDINAL: '',
    FULL_PATH: '',
    NAME_KOR: '',
    NAME_ENG: '',
    NAME_CHN: '',
    GUBUN: 1,
    children: [],
  },
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_CLASSIFY_LIST: {
      const { classifyList } = action;
      return state.set('classifyList', fromJS(classifyList)).set('selectedNode', initialState.get('selectedNode'));
    }
    case constantTypes.SET_SELECTED_NODE: {
      const { nodeInfo } = action;
      return state.set('selectedNode', fromJS(nodeInfo));
    }
    case constantTypes.INIT_CLASSIFY_DATA: {
      return state.set('selectedNode', initialState.get('selectedNode'));
    }
    default:
      return state;
  }
};

export default appReducer;
