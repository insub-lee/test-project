import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleWare from 'redux-saga';
// import logger from 'redux-logger';
import createReducer from './reducers';

const sagaMiddleware = createSagaMiddleWare();

const configureStore = (initialState = {}, history) => {
  const middleWares = [
    sagaMiddleware,
    routerMiddleware(history),
    // logger,
  ];

  const enhancers = [
    applyMiddleware(...middleWares),
  ];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? //eslint-disable-line
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ //eslint-disable-line
        shouldHotReload: false,
      }) : compose;

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers),
  );

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {};
  store.injectedSagas = {};

  return store;
};

export default configureStore;
