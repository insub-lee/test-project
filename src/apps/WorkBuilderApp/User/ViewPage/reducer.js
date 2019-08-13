import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const getContSeq = (data, key) => {
  if (Array.isArray(data)) {
    return data[0] ? data[0][key] : undefined;
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
  boxes: [],
  resultFormStuffs: [],
  isLoading: true,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESS_GET_VIEW: {
      const { metaList, data } = action;
      const boxes = metaList.filter(meta => meta.COMP_TYPE === 'BOX').map(box => ({
        ...JSON.parse(box.CONFIG).property,
      }));
      const formStuffs = metaList.filter(meta => meta.COMP_TYPE === 'FIELD').map(formStuff => ({
        ...JSON.parse(formStuff.CONFIG).property,
      }));
      const resultFormStuffs = formStuffs.map(formStuff => {
        const value = data[formStuff.property.name.toUpperCase()];
        return ({
          ...formStuff,
          CONT_SEQ: getContSeq(value, 'CONT_SEQ'),
          property: {
            ...formStuff.property,
            defaultValue: getValue(value, 'DETAIL'),
            readOnly: true,
          },
        });
      });
      return state.set('boxes', fromJS(boxes))
        .set('formStuffs', fromJS(formStuffs))
        .set('resultFormStuffs', fromJS(resultFormStuffs));
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
