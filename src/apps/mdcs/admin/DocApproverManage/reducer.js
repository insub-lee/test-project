import { fromJS } from 'immutable';
import * as constantTypes from './constants';

const initialState = fromJS({ categoryMapList: [], draftMapList: [], degreeMapList: [], approverMapList: [], selectedTaskSeq: -1 });

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_CATEGORYMAP_BY_REDUCR: {
      const { key, categoryMapList } = action;
      return state.set(key, categoryMapList);
    }
    case constantTypes.SET_TASK_SEQ_BY_REDUCR: {
      const { taskSeq } = action;
      return state.set('selectedTaskSeq', taskSeq);
    }
    default:
      return state;
  }
};
export default appReducer;
