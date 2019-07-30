import { createSelector } from 'reselect';

const selectWorkBuilderDetailPage = state => state.get('work-builder-viewer-page');

const makeSelectColumns = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    state => state.get('columns').toJS(),
  );

const makeSelectList = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    state => state.get('list').toJS(),
  );

const makeSelectBoxes = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    state => state.get('boxes').toJS(),
  );

const makeSelectFormStuffs = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    state => state.get('formStuffs').toJS(),
  );

const makeSelectWorkFlow = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    state => state.get('workFlow').toJS(),
  );

const makeSelectWorkFlowConfig = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    state => {
      const config = state.getIn(['workFlow', 'CONFIG']);
      return config ? JSON.parse(config) : { info: {} };
    },
  );

const makeSelectIsOpenFormModal = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    state => state.get('isOpenFormModal'),
  );

const makeSelectIsOpenEditModal = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    state => state.get('isOpenEditModal'),
  );

const makeSelectWorkSeq = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    state => state.get('workSeq'),
  );

const makeSelectTaskSeq = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    state => state.get('taskSeq'),
  );

const makeSelectResultFormStuffs = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    state => state.get('resultFormStuffs').toJS(),
  );

export { makeSelectColumns, makeSelectList, makeSelectBoxes, makeSelectFormStuffs, makeSelectIsOpenFormModal, makeSelectWorkSeq, makeSelectTaskSeq, makeSelectIsOpenEditModal, makeSelectResultFormStuffs, makeSelectWorkFlow, makeSelectWorkFlowConfig };
