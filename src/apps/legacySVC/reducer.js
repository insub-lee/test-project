import { fromJS } from 'immutable';

const initialState = fromJS({
});

const legacySVCReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default legacySVCReducer;