import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  bizMicroDevBase: {},
  // workSeq: -1,
  // taskSeq: -1,
  // apiArr: [],
  // responseData: {},
  // metaList: [],
  // workFlow: {},
  // formData: {},
  // extraApiData: {},
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${actionTypes.SET_CALLDATA_SAGA}_${action.id}`: {
      const { id, apiKey, response } = action;
      return state.setIn(['bizMicroDevBase', id, 'responseData', apiKey], response);
    }
    case `${actionTypes.CHANGE_FORMDATA}_${action.id}`: {
      const { id, key, val } = action;
      return state.setIn(['bizMicroDevBase', id, 'formData', key], val);
    }
    case `${actionTypes.REMOVE_REDUX_STATE}_${action.id}`: {
      const { id } = action;
      return state.removeIn(['bizMicroDevBase', id]);
    }
    case `${actionTypes.REMOVE_REDUX_STATE_BYKEY}_${action.id}`: {
      const { id, key } = action;
      return state.removeIn(['bizMicroDevBase', id, 'responseData', key]);
    }
    default:
      return state;
  }
};

export default reducer;
