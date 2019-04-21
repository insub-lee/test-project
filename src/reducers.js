import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

// import globalReducer from './containers/App/reducer';
import languageProviderReducer from './containers/common/LanguageProvider/reducer';
import authReducer from './containers/common/Auth/reducer';

const routeInitialState = fromJS({
  location: null,
});

const routeReducer = (state = routeInitialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
};

const createReducer = injectedReducers => (
  combineReducers({
    route: routeReducer,
    // global: globalReducer,
    language: languageProviderReducer,
    auth: authReducer,
    ...injectedReducers,
  })
);

export default createReducer;
