import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  categoryData: [],
  bizGroupInfo: {},
  authArr: [],
  bizMenuSecKeyList: [],
});

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_CATEGORY_DATA:
      return state.set('categoryData', action.categoryData)
        .set('authArr', action.authArr)
        .set('bizGroupInfo', action.bizGroupInfo || state.get('bizGroupInfo'))
        .set('bizMenuSecKeyList', action.bizMenuSecKeyList || state.get('bizMenuSecKeyList'));
    case constants.SET_MENUSEC_LIST:
      return state.set('bizMenuSecKeyList', action.bizMenuSecKeyList || state.get('bizMenuSecKeyList'));
    default:
      return state;
  }
};

export default orgReducer;
