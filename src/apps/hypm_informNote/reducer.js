import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
  userCompanyDefine: [],
});

const commonReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_USERCOMPANYDEFINE:
      return state.set('userCompanyDefine', action.list);
    default:
      return state;
  }
};

export default commonReducer;
