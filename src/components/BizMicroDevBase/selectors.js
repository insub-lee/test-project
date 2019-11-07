import { createSelector } from 'reselect';

const selectorBizBuilderBase = state => state.get('apps.mdcs.components.BizMicroDevBase');

const makeSelectResponseData = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.id ? props.id : -1),
    (state, id) => {
      return state.getIn(['bizMicroDevBase', id, 'responseData']) !== undefined ? state.getIn(['bizMicroDevBase', id, 'responseData']).toJS() : {};
    },
  );

const makeSelectFormDataByReduxId = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.id ? props.id : -1),
    (state, id, reduxId) =>
      state.getIn(['bizMicroDevBase', id, 'formData', reduxId]) !== undefined ? state.getIn(['bizMicroDevBase', id, 'formData', reduxId]).toJS() : {},
  );

export { makeSelectResponseData, makeSelectFormDataByReduxId };
