import { fromJS } from 'immutable';

const initialState = fromJS({
});

const portalReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default portalReducer;
