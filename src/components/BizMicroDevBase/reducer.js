import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  bizMicroDevBase: {},
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${actionTypes.SET_CALLDATA_SAGA}_${action.id}`: {
      const { id, apiKey, response } = action;
      return state.setIn(['bizMicroDevBase', id, 'responseData', apiKey], response);
    }
    case `${actionTypes.CHANGE_FORMDATA}_${action.id}`: {
      const { id, key, val } = action;
      return state.setIn(['bizMicroDevBase', id, 'formData', key], fromJS(val));
    }
    case `${actionTypes.SET_FORMDATA}_${action.id}`: {
      const { id, obj } = action;
      return state.setIn(['bizMicroDevBase', id, 'formData'], fromJS(obj));
    }
    case `${actionTypes.REMOVE_REDUX_STATE}_${action.id}`: {
      const { id } = action;
      return state.removeIn(['bizMicroDevBase', id]);
    }
    case `${actionTypes.REMOVE_ID_BYSTORAGE}_${action.id}`: {
      const { id, storage } = action;
      return state.removeIn(['bizMicroDevBase', id, storage]);
    }
    case `${actionTypes.REMOVE_RESPONSE_REDUX_STATE_BYKEY}_${action.id}`: {
      const { id, key } = action;
      return state.removeIn(['bizMicroDevBase', id, 'responseData', key]);
    }
    case `${actionTypes.REMOVE_FORMDATA_REDUX_STATE_BYKEY}_${action.id}`: {
      const { id, key } = action;
      return state.removeIn(['bizMicroDevBase', id, 'formData', key]);
    }
    default:
      return state;
  }
};

export default reducer;
