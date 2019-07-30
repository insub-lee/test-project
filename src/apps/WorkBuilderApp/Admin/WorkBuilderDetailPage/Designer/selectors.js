import { createSelector } from 'reselect';

const selectWorkBuilderDetailDesigner = state => state.get('work-builder-detail-designer');

const makeSelectCanvasProperty = () =>
  createSelector(
    selectWorkBuilderDetailDesigner,
    state => {
      const { boxes, groups, formStuffs, viewTargetId, useSignLine, signLine } = state.toJS();
      return {
        boxes,
        groups,
        formStuffs,
        viewTargetId,
        useSignLine,
        signLine,
      };
    },
  );

const makeSelectPanelsProperty = () =>
  createSelector(
    selectWorkBuilderDetailDesigner,
    state => {
      const { boxes, groups, formStuffs, tabId, viewTargetId, viewTargetType, useSignLine, signLine, blockOpenStatus } = state.toJS();
      return {
        boxes,
        groups,
        formStuffs,
        tabId,
        viewTargetId,
        viewTargetType,
        useSignLine,
        signLine,
        blockOpenStatus,
      };
    },
  );

const makeSelectProperty = () =>
  createSelector(
    selectWorkBuilderDetailDesigner,
    state => {
      const { boxes, groups, formStuffs, tabId, viewTargetId, viewTargetType, useSignLine, signLine, blockOpenStatus } = state.toJS();
      return {
        canvasProperty: {
          boxes,
          groups,
          formStuffs,
          viewTargetId,
          useSignLine,
          signLine,
        },
        panelsProperty: {
          boxes,
          groups,
          formStuffs,
          tabId,
          viewTargetId,
          viewTargetType,
          useSignLine,
          signLine,
          blockOpenStatus,
        },
      };
    },
  );

const makeSelectLayers = () =>
  createSelector(
    selectWorkBuilderDetailDesigner,
    state => ({
      boxes: state.get('boxes').toJS(),
      formStuffs: state.get('formStuffs').toJS(),
    }),
  );

const makeSelectOnPreview = () =>
  createSelector(
    selectWorkBuilderDetailDesigner,
    state => state.get('onPreview'),
  );

const makeSelectWorkSeq = () =>
  createSelector(
    selectWorkBuilderDetailDesigner,
    state => state.get('workSeq'),
  );

export { makeSelectCanvasProperty, makeSelectPanelsProperty, makeSelectProperty, makeSelectLayers, makeSelectOnPreview, makeSelectWorkSeq };
