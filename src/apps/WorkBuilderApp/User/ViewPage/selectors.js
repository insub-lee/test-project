import { createSelector } from 'reselect';

const selectWorkBuilderViewPage = state => state.get('work-builder-view-page');

const makeSelectBoxes = () => createSelector(selectWorkBuilderViewPage, state => state.get('boxes').toJS());

const makeSelectResultFormStuffs = () => createSelector(selectWorkBuilderViewPage, state => state.get('resultFormStuffs').toJS());

const makeSelectIsLoading = () => createSelector(selectWorkBuilderViewPage, state => state.get('isLoading'));

export { makeSelectBoxes, makeSelectResultFormStuffs, makeSelectIsLoading };
