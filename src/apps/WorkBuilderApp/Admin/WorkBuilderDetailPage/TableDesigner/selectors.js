import { createSelector } from 'reselect';

const selectWorkBuilderDetailTableDesigner = state => state.get('work-builder-detail-table-designer');

const makeSelectHeaders = () => createSelector(selectWorkBuilderDetailTableDesigner, state => state.get('headers').toJS());

const makeSelectUsableItems = () => createSelector(selectWorkBuilderDetailTableDesigner, state => state.get('usableItems').toJS());

const makeSelectColumn = () => createSelector(selectWorkBuilderDetailTableDesigner, state => state.get('column').toJS());

export { makeSelectHeaders, makeSelectUsableItems, makeSelectColumn };
