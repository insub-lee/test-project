import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
  projectListSearch: [],
  projectCountInfo: 0,
});

const projectListReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_PROJECTLISTSEARCH:
      return state.set('projectListSearch', action.projectListSearch);
    case constants.LOADING_PROJECTCOUNTINFO:
      return state.set('projectCountInfo', action.projectCountInfo);
    default:
      return state;
  }
};
export default projectListReducer;
