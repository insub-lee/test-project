import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  searchType: '',
  approveList: [],
  selectedRow: {},
  viewVisible: false,
  opinionVisible: false,
  opinion: '',
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_APPROVE_LIST: {
      const { payload } = action;
      return state.set('searchType', payload.searchType);
    }
    case actionTypes.SET_APPROVE_LIST: {
      const { list } = action;
      return state
        .set('approveList', fromJS(list))
        .set('viewVisible', false)
        .set('opinionVisible', false)
        .set('selectedRow', fromJS({}))
        .set('opinion', '');
    }
    case actionTypes.SET_SELECTED_ROW: {
      const { row } = action;
      console.debug(row);
      return state.set('selectedRow', fromJS(row));
    }
    case actionTypes.SET_VIEW_VISIBLE: {
      const { visible } = action;
      return state.set('viewVisible', visible);
    }
    case actionTypes.SET_OPINION_VISIBLE: {
      const { visible } = action;
      return state.set('opinionVisible', visible);
    }
    case actionTypes.SET_OPINION: {
      const { opinion } = action;
      return state.set('opinion', opinion);
    }
    case actionTypes.SET_BIZFORMDATA: {
      const { formData } = action;
      return state.set('formData', formData);
    }
    default:
      return state;
  }
};

export default appReducer;
