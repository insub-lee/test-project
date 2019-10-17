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
    case actionTypes.SET_CALLDATA_SAGA: {
      const { id, apiKey, response } = action;
      return state.setIn(['bizMicroDevBase', id, 'responseData', apiKey], response);
    }
    default:
      return state;
  }
};

export default reducer;
