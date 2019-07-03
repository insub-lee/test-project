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
});

const getDefaultFormProperty = (type, id) => {
  const defaultFormProperty = {
    className: '',
    style: {},
    name: id,
    defaultValue: '',
  };
  switch (type) {
    case 'checkbox':
      return {
        ...defaultFormProperty,
        style: { ...defaultFormProperty.style },
        label: 'Label',
        id,
        options: [{ label: 'label 1', value: 'label 1' }, { label: 'label 2', value: 'label 2' }, { label: 'label 3', value: 'label 3' }],
        defaultValue: [],
      };
    case 'radio':
      return {
        ...defaultFormProperty,
        style: { ...defaultFormProperty.style },
        label: 'Label',
        id,
        options: [{ label: 'label 1', value: 'label 1' }, { label: 'label 2', value: 'label 2' }, { label: 'label 3', value: 'label 3' }],
      };
    default:
      return {
        ...defaultFormProperty,
        style: { ...defaultFormProperty.style },
        label: 'Label',
        id,
      };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA: {
      const { id } = action;
      return state.set('workSeq', id);
    }
    case actionTypes.ACTIVE_TAB: {
      const { tabId } = action;
      return state.set('tabId', tabId);
    }
    // case actionTypes.ADD_BOX: {
    //   const defaultBox = { type: 'Box', id: `box-${new Date().getTime()}`, property: { label: 'Box Title', useLabel: true, type: 'normal', column: 1 } };
    //   return state.update('boxes', arr => arr.push(fromJS(defaultBox)));
    // }
    case actionTypes.SUCCESS_ADD_BOX: {
      const { box } = action;
      return state.update('boxes', arr => arr.push(fromJS(box)));
    }
    // case actionTypes.ADD_FORM_STUFF: {
    //   const { formStuffType } = action;
    //   const viewTargetId = state.get('viewTargetId');
    //   const newId = `${formStuffType}-${new Date().getTime()}`;
    //   const newObj = {
    //     type: formStuffType,
    //     id: newId,
    //     // groupId: viewTargetId,
    //     parentId: viewTargetId,
    //     property: getDefaultFormProperty(formStuffType, newId),
    //   };
    //   return state.update('formStuffs', arr => arr.push(fromJS(newObj)));
    // }
    case actionTypes.SUCCESS_ADD_FORM_STUFF: {
      const { formStuff } = action;
      return state.update('formStuffs', arr => arr.push(fromJS(formStuff)));
    }
    case actionTypes.REMOVE_PANEL: {
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
    case actionTypes.CHANGE_BOX_TYPE: {
      const { index, value } = action;
      return state.setIn(['boxes', index, 'property', 'type'], value);
    }
    case actionTypes.CHANGE_FORM_STUFF_SPAN: {
      const { index, value } = action;
      return state.setIn(['formStuffs', index, 'property', 'span'], parseInt(value, 10));
    }
    case actionTypes.CHANGE_BOX_COLUMN_COUNT: {
      const { index, value } = action;
      return state.setIn(['boxes', index, 'property', 'column'], parseInt(value, 10));
    }
    case actionTypes.CHANGE_ID: {
      const { type, index, value } = action.payload;
      return state.setIn([type, index, 'id'], value).set('viewTargetId', value);
    }
    case actionTypes.CHANGE_TITLE: {
      const { type, index, value } = action.payload;
      return state.setIn([type, index, 'property', 'label'], value);
    }
    case actionTypes.CHANGE_NAME: {
      const { type, index, value } = action.payload;
      return state.setIn([type, index, 'property', 'name'], value);
    }
    case actionTypes.CHANGE_USE_LABEL: {
      const { type, index, value } = action.payload;
      return state.setIn([type, index, 'property', 'useLabel'], value);
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
    case actionTypes.SUCCESS_FETCH_DATA: {
      const { data } = action;
      console.debug('@@ success', data);
      return state;
    }
    case actionTypes.ON_PREVIEW: {
      return state.set('onPreview', true);
    }
    case actionTypes.OFF_PREVIEW: {
      return state.set('onPreview', false);
    }
    case actionTypes.ACTION_TYPES:
    default:
      return state;
  }
};

export default reducer;
