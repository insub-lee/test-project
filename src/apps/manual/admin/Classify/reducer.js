import { fromJS } from 'immutable';
import * as constantTypes from './constants';

const initialState = fromJS({
  classifyList: [],
  selectedClassify: {
    NODE_ID: null,
    PARENT_NODE_ID: null,
    LVL: 1,
    NODE_ORDINAL: '',
    FULL_PATH: '',
    NAME_KOR: '',
    NAME_ENG: '',
    NAME_CHN: '',
  },
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_CLASSIFY_LIST: {
      const { classifyList } = action;
      return state.set('classifyList', fromJS(classifyList));
    }
    default:
      return state;
  }
};

export default appReducer;
