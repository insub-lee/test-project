import { createSelector } from 'reselect';

const makeSelectDocListState = state => state.get('apps-mdcs-user-docArchitect-reducer');

const makeSelectDocList = () =>
  createSelector(
    makeSelectDocListState,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : 11052),
    (state, WIDGET_ID) => state.getIn(['docMap', WIDGET_ID, 'docList']),
  );
const makeSelectDocNum = () =>
  createSelector(
    makeSelectDocListState,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : 11052),
    (state, WIDGET_ID) => state.getIn(['docMap', WIDGET_ID, 'num']),
  );
export default { makeSelectDocListState, makeSelectDocList, makeSelectDocNum };
