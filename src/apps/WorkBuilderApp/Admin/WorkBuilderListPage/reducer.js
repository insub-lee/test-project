import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  columns: [
    {
      name: '업무빌더ID',
      key: 'id',
    },
    {
      name: '업무빌더명',
      key: 'title',
    },
    {
      name: '등록일',
      key: 'registerDate',
    },
    {
      name: '상태',
      key: 'status',
    },
  ],
  list: [
    {
      id: '0001',
      title: '용수 Chemical',
      registerDate: '2019-06-28',
      status: '00',
    },
  ],
  modalStatus: {
    formModal: {
      visible: false,
      loading: false,
    },
  },
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_MODAL_VISIBLE: {
      const { key, status } = action.payload;
      return state.setIn(['modalStatus', key, 'visible'], status);
    }
    case actionTypes.SUCCESS_GET_LIST: {
      const { list } = action;
      return state.set('list', fromJS(list));
    }
    case actionTypes.ACTION_TYPES:
    default:
      return state;
  }
};

export default reducer;
