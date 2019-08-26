import { createSelector } from 'reselect';

const makeSelectBizBuilderWidgetState = state => state.get('apps-manual-user-BizBuilderWidget-ConfigBizBuilder-reducer');

const makeSelectBizBuilderConfigInfo = () =>
  createSelector(
    makeSelectBizBuilderWidgetState,
    state => state.getIn(['BizBuilderWidget', 'BizBuilderConfigInfo', 'data']),
  );

export default {
  makeSelectBizBuilderConfigInfo,
};
