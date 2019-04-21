import { createSelector } from 'reselect';

// const selectPortal = state => state.get('single').toJS();
const selectRoute = state => state.get('hynix.common').toJS();

const makeSelectApps = () => createSelector(
  selectRoute,
  portalState => portalState.selectedApp,
);

export default makeSelectApps;
