import { fromJS } from 'immutable';

import { reorder } from 'utils/helpers';

import * as actionTypes from './constants';

const initialState = fromJS({
  workSeq: -1,
  tabId: '',
  viewTargetId: '',
  viewTargetType: '',
  boxes: [],
  groups: [],
  formStuffs: [],
  useSignLine: false,
  signLine: [{ step: 1, label: '' }],
  blockOpenStatus: {
    basic: false,
    custom: false,
  },
  onPreview: false,
  isLoading: true,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA: {
      const { id } = action;
      return state.set('workSeq', id);
    }
    case actionTypes.SUCCESS_FETCH_DATA: {
      const { data } = action;
      const boxesData = data.filter(meta => meta.COMP_TYPE === 'BOX');
      const boxes = boxesData.map(({ WORK_SEQ, PRNT_SEQ, ORD, NAME_KOR, DCSR, COMP_TYPE, COMP_TAG, META_SEQ, COMP_FIELD, CONFIG }) => ({
        ...JSON.parse(CONFIG).property,
        WORK_SEQ,
        PRNT_SEQ,
        ORD,
        NAME_KOR,
        DCSR,
        COMP_TYPE,
        COMP_TAG,
        META_SEQ,
        COMP_FIELD,
      }));
      const formStuffsData = data.filter(meta => meta.COMP_TYPE === 'FIELD');
      const formStuffs = formStuffsData.map(({ WORK_SEQ, PRNT_SEQ, ORD, NAME_KOR, DCSR, COMP_TYPE, COMP_TAG, META_SEQ, COMP_FIELD, CONFIG }) => ({
        ...JSON.parse(CONFIG).property,
        WORK_SEQ,
        PRNT_SEQ,
        ORD,
        NAME_KOR,
        DCSR,
        COMP_TYPE,
        COMP_TAG,
        META_SEQ,
        COMP_FIELD,
      }));
      return state.set('boxes', fromJS(boxes)).set('formStuffs', fromJS(formStuffs));
    }
    case actionTypes.ACTIVE_TAB: {
      const { tabId } = action;
      return state.set('tabId', tabId);
    }
    case actionTypes.SUCCESS_ADD_BOX: {
      const { box } = action;
      return state.update('boxes', arr => arr.push(fromJS(box)));
    }
    case actionTypes.SUCCESS_ADD_FORM_STUFF: {
      const { formStuff } = action;
      return state.update('formStuffs', arr => arr.push(fromJS(formStuff)));
    }
    case actionTypes.SUCCESS_REMOVE_LAYER: {
      const { id, layerType } = action;

      if (id === state.get('viewTargetId')) {
        return state
          .update(layerType === 'Box' ? 'boxes' : 'formStuffs', arr => arr.filter(obj => obj.get('id') !== id))
          .set('viewTargetId', '')
          .set('viewTargetType', '');
      }

      if (layerType === 'Box') {
        const hasTargetId = state.get('formStuffs').some(obj => obj.get('parentId') === id);
        return state
          .update('boxes', arr => arr.filter(obj => obj.get('id') !== id))
          .update('formStuffs', arr => arr.filter(obj => obj.get('parentId') !== id))
          .set('viewTargetId', hasTargetId ? '' : state.get('viewTargetId'))
          .set('viewTargetType', hasTargetId ? '' : state.get('viewTargetType'));
      }

      return state.update('formStuffs', arr => arr.filter(obj => obj.id !== id));
    }
    case actionTypes.ACTIVE_LAYER: {
      const { id, layerType } = action;
      return state.set('viewTargetId', id).set('viewTargetType', layerType);
    }
    case actionTypes.DISABLE_LAYERS: {
      return state.set('viewTargetId', '').set('viewTargetType', '');
    }

    case actionTypes.SUCCESS_CHANGE_BOX_TYPE: {
      const { index, value } = action;
      return state.setIn(['boxes', index], fromJS(value));
    }
    case actionTypes.SUCCESS_CHANGE_FORM_STUFF_SPAN: {
      const { index, value } = action;
      return state.setIn(['formStuffs', index], fromJS(value));
    }
    case actionTypes.SUCCESS_CHANGE_BOX_COLUMN_COUNT: {
      const { index, value } = action;
      return state.setIn(['boxes', index], fromJS(value));
    }
    case actionTypes.SUCCESS_CHANGE_ID: {
      const { type, index, value, id } = action.payload;
      return state.setIn([type, index], fromJS(value)).set('viewTargetId', id);
    }
    case actionTypes.SUCCESS_CHANGE_TITLE: {
      const { type, index, value } = action.payload;
      return state.setIn([type, index], fromJS(value));
    }
    case actionTypes.SUCCESS_CHANGE_NAME: {
      const { type, index, value } = action.payload;
      return state.setIn([type, index], fromJS(value));
    }
    case actionTypes.SUCCESS_CHANGE_MAX_LENGTH: {
      const { type, index, value } = action.payload;
      return state.setIn([type, index], fromJS(value));
    }
    case actionTypes.SUCCESS_CHANGE_USE_LABEL: {
      const { type, index, value } = action.payload;
      return state.setIn([type, index], fromJS(value));
    }
    case actionTypes.SUCCESS_CHANGE_REQUIRED: {
      const { type, index, value } = action.payload;
      return state.setIn([type, index], fromJS(value));
    }
    case actionTypes.TOGGLE_BLOCK_OPEN_STATUS: {
      const { blockType } = action;
      return state.setIn(['blockOpenStatus', blockType], !state.getIn(['blockOpenStatus', blockType]));
    }
    case actionTypes.ON_DRAG_END: {
      const { dropResult } = action;
      if (!dropResult.destination) {
        return state;
      }

      const { source, destination } = dropResult;

      if (source.droppableId === destination.droppableId && source.index === destination.index) {
        return state;
      }

      if (dropResult.type === 'layer') {
        return state.set('boxes', fromJS(reorder(state.get('boxes').toJS(), source.index, destination.index)));
      }
      return state;
    }
    case actionTypes.CLEAR_LAYERS: {
      return initialState;
    }
    case actionTypes.ON_PREVIEW: {
      return state.set('onPreview', true);
    }
    case actionTypes.OFF_PREVIEW: {
      return state.set('onPreview', false);
    }
    case actionTypes.LOADING_ON:
      return state.set('isLoading', true);
    case actionTypes.LOADING_OFF:
      return state.set('isLoading', false);
    case actionTypes.RESET_DATA:
      return initialState;
    case actionTypes.ACTION_TYPES:
    default:
      return state;
  }
};

export default reducer;
