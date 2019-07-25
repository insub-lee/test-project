import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  workSeq: -1,
  taskSeq: -1,
  columns: [],
  list: [],
  boxes: [],
  formStuffs: [],
  resultFormStuffs: [],
  isOpenFormModal: false,
  isOpenEditModal: false,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_VIEW: {
      const { id } = action;
      return state.set('workSeq', id);
    }
    case actionTypes.SUCCESS_GET_VIEW: {
      const { columns, list } = action;
      console.debug(columns, list);
      return state.set('columns', fromJS(columns)).set('list', fromJS(list));
    }
    case actionTypes.SUCCESS_GET_FORM_DATA: {
      const { boxes, formStuffs } = action;
      return state.set('boxes', fromJS(boxes)).set('formStuffs', fromJS(formStuffs));
    }
    case actionTypes.SUCCESS_GET_TASK_SEQ: {
      const { taskSeq } = action;
      return state.set('taskSeq', taskSeq);
    }
    case actionTypes.SUCCESS_GET_EDIT_DATA: {
      const { data } = action;
      const formStuffs = state.get('formStuffs').toJS();
      const resultFormStuffs = formStuffs.map(formStuff => ({
        ...formStuff,
        property: {
          ...formStuff.property,
          defaultValue: data[formStuff.property.name.toUpperCase()],
        },
      }));
      return state.set('resultFormStuffs', fromJS(resultFormStuffs)).set('isOpenEditModal', true);
    }
    case actionTypes.CLOSE_EDIT_MODAL: {
      return state.set('isOpenEditModal', false);
    }
    case actionTypes.TOGGLE_FORM_MODAL: {
      const { value } = action;
      return state.set('isOpenFormModal', value);
    }
    case actionTypes.SUCCESS_SAVE_TASK_CONTENTS: {
      const { data: { taskSeq, fieldNm, contSeq } } = action;
      console.debug('@@@ ~', taskSeq, fieldNm, contSeq);
      console.debug('@@@@ ~', state.get('formStuffs').toJS());
      const targetIndex = state.get('formStuffs').findIndex(formStuff => formStuff.get('FIELD_NM') === fieldNm);
      return state.setIn(['formStuffs', targetIndex, 'CONT_SEQ'], contSeq);
    }
    case actionTypes.ACTION_TYPES:
    default:
      return state;
  }
};

export default reducer;
