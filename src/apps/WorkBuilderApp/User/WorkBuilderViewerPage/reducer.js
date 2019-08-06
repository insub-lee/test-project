import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const getContSeq = (data, key) => {
  if (Array.isArray(data)) {
    return data[0] ? data[0][key] : undefined;
    // return data.map((item => item[key]));
  }
  return data[key];
};

const getValue = (data, key) => {
  if (data === 'object') {
    if (Array.isArray(data)) {
      return data.map(item => item[key]);
    }
    return data[key];
  }
  return data;
};

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
  workFlow: {},
  signLineInfo: [],
  isLoading: true,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_VIEW: {
      const { id } = action;
      return initialState.set('workSeq', id);
    }
    case actionTypes.SUCCESS_GET_VIEW: {
      const { columns, list } = action;
      return state.set('columns', fromJS(columns)).set('list', fromJS(list)).set('isLoading', false);
    }
    case actionTypes.SUCCESS_GET_FORM_DATA: {
      const { boxes, formStuffs, workFlow } = action;
      console.debug('@@@ success get', boxes, formStuffs, workFlow);
      return state.set('boxes', fromJS(boxes)).set('formStuffs', fromJS(formStuffs)).set('workFlow', fromJS(workFlow || {}));
    }
    case actionTypes.SUCCESS_GET_TASK_SEQ: {
      const { taskSeq } = action;
      return state.set('taskSeq', taskSeq);
    }
    case actionTypes.SUCCESS_GET_EDIT_DATA: {
      const { data } = action;
      const formStuffs = state.get('formStuffs').toJS();
      console.debug('@@@', formStuffs);
      const resultFormStuffs = formStuffs.map(formStuff => {
        const value = data[formStuff.property.name.toUpperCase()];
        return ({
          ...formStuff,
          CONT_SEQ: getContSeq(value, 'CONT_SEQ'),
          property: {
            ...formStuff.property,
            defaultValue: getValue(value, 'DETAIL'),
          },
        });
      });
      console.debug('@@@ success', formStuffs, resultFormStuffs);
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
      const targetIndex = state.get('formStuffs').findIndex(formStuff => formStuff.get('COMP_FIELD') === fieldNm);
      return state.setIn(['formStuffs', targetIndex, 'CONT_SEQ'], contSeq);
    }
    case actionTypes.UPDATE_SIGN_INFO: {
      const { info } = action;
      return state.set('signLineInfo', fromJS(info));
    }
    case actionTypes.RESET_DATA:
      return initialState;
    case actionTypes.ACTION_TYPES:
    default:
      return state;
  }
};

export default reducer;
