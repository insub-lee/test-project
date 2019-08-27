import { createSelector } from 'reselect';

const makeSelectBizBuilderWidgetState = state => state.get('apps-manual-user-BizBuilderWidget-reducer');

const makeSelectBizBuilderList = () =>
  createSelector(
    makeSelectBizBuilderWidgetState,
    state => state.getIn(['BizBuilderWidget', 'bizBuilderList']),
  );

const makeSelectBizBuilderConfigInfo = () =>
  createSelector(
    makeSelectBizBuilderWidgetState,
    state => state.getIn(['BizBuilderWidget', 'ConfigInfo']),
  );
export default {
  makeSelectBizBuilderList,
  makeSelectBizBuilderConfigInfo,
};
