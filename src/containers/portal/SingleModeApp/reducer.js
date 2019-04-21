import { fromJS } from 'immutable';

const initialState = fromJS({
});

const portalSingleReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default portalSingleReducer;
