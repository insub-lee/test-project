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
  builderList: {},
  // workSeq: -1,
  // taskSeq: -1,
  // columns: [],
  // list: [],
  // boxes: [],
  // formStuffs: [],
  // resultFormStuffs: [],
  // isOpenFormModal: false,
  // isOpenEditModal: false,
  // workFlow: {},
  // signLineInfo: [],
  // isLoading: true,
  // isModalLoading: {
  //   create: true,
  //   modify: true,
  //   read: true,
  // },
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_VIEW: {
      const { widgetId, id } = action;
      return state.setIn(['builderList', widgetId, 'workSeq'], id);
    }
    case actionTypes.SUCCESS_GET_VIEW: {
      const { widgetId, columns, list } = action;
      return state
        .setIn(['builderList', widgetId, 'columns'], fromJS(columns))
        .setIn(['builderList', widgetId, 'list'], fromJS(list))
        .setIn(['builderList', widgetId, 'isLoading'], false);
    }
    case actionTypes.SUCCESS_GET_FORM_DATA: {
      const { widgetId, boxes, formStuffs, workFlow } = action;
      return state
        .setIn(['builderList', widgetId, 'boxes'], fromJS(boxes))
        .setIn(['builderList', widgetId, 'formStuffs'], fromJS(formStuffs))
        .setIn(['builderList', widgetId, 'workFlow'], fromJS(workFlow || {}));
    }
    case actionTypes.SUCCESS_GET_TASK_SEQ: {
      const { widgetId, taskSeq } = action;
      return state.setIn(['builderList', widgetId, 'taskSeq'], taskSeq);
    }
    case actionTypes.SUCCESS_GET_EDIT_DATA: {
      const { widgetId, data } = action;
      const formStuffs = state.getIn(['builderList', widgetId, 'formStuffs']).toJS();
      const resultFormStuffs = formStuffs.map(formStuff => {
        const value = data[formStuff.property.name.toUpperCase()];
        return {
          ...formStuff,
          CONT_SEQ: getContSeq(value, 'CONT_SEQ'),
          property: {
            ...formStuff.property,
            defaultValue: getValue(value, 'DETAIL'),
          },
        };
      });
      return state.setIn(['builderList', widgetId, 'resultFormStuffs'], fromJS(resultFormStuffs)).setIn(['builderList', widgetId, 'isOpenEditModal'], true);
    }
    case actionTypes.CLOSE_EDIT_MODAL: {
      const { widgetId } = action;
      return state.setIn(['builderList', widgetId, 'isOpenEditModal'], false);
    }
    case actionTypes.TOGGLE_FORM_MODAL: {
      const { widgetId, value } = action;
      return state.setIn(['builderList', widgetId, 'isOpenFormModal'], value);
    }
    case actionTypes.SUCCESS_SAVE_TASK_CONTENTS: {
      const {
        widgetId,
        data: { fieldNm, contSeq },
      } = action;
      const targetIndex = state.getIn(['builderList', widgetId, 'formStuffs']).findIndex(formStuff => formStuff.getIn(['COMP_FIELD']) === fieldNm);
      return state.setIn(['builderList', widgetId, 'formStuffs', targetIndex, 'CONT_SEQ'], contSeq);
      // const targetIndex = state.get('formStuffs').findIndex(formStuff => formStuff.get('COMP_FIELD') === fieldNm);
      // return state.setIn(['formStuffs', targetIndex, 'CONT_SEQ'], contSeq);
    }
    case actionTypes.UPDATE_SIGN_INFO: {
      const { widgetId, info } = action;
      return state.setIn(['builderList', widgetId, 'signLineInfo'], fromJS(info));
    }
    case actionTypes.RESET_DATA:
      return initialState;
    // case actionTypes.LOADING_ON:
    //   return state.set('isLoading', true);
    // case actionTypes.LOADING_OFF:
    //   return state.set('isLoading', false);
    case actionTypes.MODAL_LOADING_ON: {
      const { widgetId, key } = action;
      return state.setIn(['builderList', widgetId, 'isModalLoading', key], true);
    }
    case actionTypes.MODAL_LOADING_OFF: {
      const { widgetId, key } = action;
      return state.setIn(['builderList', widgetId, 'isModalLoading', key], false);
    }
    case actionTypes.ACTION_TYPES:
    default:
      return state;
  }
};

export default reducer;
