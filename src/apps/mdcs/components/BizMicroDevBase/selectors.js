import { createSelector } from 'reselect';

const selectorBizBuilderBase = state => state.get('apps.mdcs.components.BizMicroDevBase');

const makeSelectResponseData = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.id ? props.id : -1),
    (state, id) => {
      console.debug('id', id);
      return state.getIn(['bizMicroDevBase', id, 'responseData']) !== undefined ? state.getIn(['bizMicroDevBase', id, 'responseData']).toJS() : {};
    },
  );

export { makeSelectResponseData };
