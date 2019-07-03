import { fromJS } from 'immutable';

import { reorder } from 'utils/helpers';

import * as actionTypes from './constants';

const initialState = fromJS({
  usableItems: [],
  headers: [],
  column: {},
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ON_DRAG_END: {
      const { dropResult } = action;
      if (!dropResult.destination) return state;

      const { source, destination } = dropResult;

      if (source.droppableId === destination.droppableId && source.index === destination.index) return state;

      if (dropResult.type === 'header-item') {
        const headers = state.get('headers').toJS();
        return state.set('headers', fromJS(reorder(headers, source.index, destination.index).map((header, index) => ({ ...header, seq: index }))));
      }

      if (dropResult.type === 'column-item') {
        const usableItems = state.get('usableItems').toJS();
        const headers = state.get('headers').toJS();
        const column = state.get('column').toJS();
        const item = usableItems[source.index];
        column[item.column] = item;
        const { droppableId } = destination;
        const index = parseInt(droppableId.split('-'), 10);
        headers[index].dataKey = item.column;
        return state.set('column', fromJS('column')).set('headers', fromJS('headers'));
      }
      return state;
    }
    case actionTypes.ADD_HEADER: {
      const { label } = action;
      if (label.trim().length > 0) {
        const headers = state.get('headers').toJS();
        headers.push({ label, dataKey: '' });
        return state.set('headers', fromJS(headers.map((item, index) => ({ ...item, seq: index }))));
      }
      return state;
    }
    case actionTypes.SUCCESS_FETCH_DATA: {
      const { data } = action;
      console.debug('@@ success', data);
      return state;
    }
    case actionTypes.ACTION_TYPES:
    default:
      return state;
  }
};

export default reducer;
