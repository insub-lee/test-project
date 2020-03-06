import { createSelector } from 'reselect';

const selectorBizBuilderBase = state => state.get('apps.mdcs.components.BizMicroDevBase');

const makeSelectResponseData = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => ((props && props.sagaKey) || props.id ? props.sagaKey || props.id : -1),
    (state, id) => (state.getIn(['bizMicroDevBase', id, 'responseData']) !== undefined ? state.getIn(['bizMicroDevBase', id, 'responseData']).toJS() : {}),
  );

const makeSelectFormData = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => ((props && props.sagaKey) || props.id ? props.sagaKey || props.id : -1),
    (state, id) => (state.getIn(['bizMicroDevBase', id, 'formData']) !== undefined ? state.getIn(['bizMicroDevBase', id, 'formData']).toJS() : {}),
  );

export { makeSelectResponseData, makeSelectFormData };
