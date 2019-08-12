import { fromJS } from 'immutable';

const initialState = fromJS({
  open: false,
  headerMenuOpen: false,
  isFullscreenEnabled: false,
  set: false,
  visible: false,
  show: false,
  isClose: {},
  isSpinnerShow: false,
  count: 0,
  isMakingApps: false,
});

const portalReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default portalReducer;
