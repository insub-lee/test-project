import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
const makeSelectManualListState = state => state.get('apps-ManualList-reducer');

const makeSelectManualist = () =>
  createSelector(
    makeSelectManualListState,
    state => state.getIn(['manualListState']),
  );

const makeSelectIsLoading = () =>
  createSelector(
    makeSelectManualListState,
    state => state.get('isLoding'),
  );

const makeSelectPaginationIdx = () =>
  createSelector(
    makeSelectManualListState,
    state => state.get('paginationIdx'),
  );
export default {
  makeSelectManualist,
  makeSelectIsLoading,
  makeSelectPaginationIdx,
};
