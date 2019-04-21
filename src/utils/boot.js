import createReducer from '../reducers';

export default () => (
  new Promise(() => {
    console.log('test', createReducer);
    // store.dispatch(authActions.checkAuthorization())
  })
);
