import { fromJS } from 'immutable';

import { CHANGE_LIST_REDUCER, LOAD_SKIN_REDUCER, LOAD_LANG_REDUCER, ONCHANGE_SKIN_REDUCER, DISABLE_FALSE } from './constants';

const initialState = fromJS({
  list: [],
  skincheck: '',
  mySkin:'',
  langcheck: '',
  myLang: '',
  disabled: false,
});

const messageComponentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LIST_REDUCER: {
      return state.set('list', action.resultValue);
    }
    case LOAD_SKIN_REDUCER:
      console.log(action.resultValue, 'action.resultValue123123');
      return state.set('skincheck', action.resultValue.theme)
                  .set('mySkin', action.resultValue.settingList[0])
    case LOAD_LANG_REDUCER:
      return state.set('langcheck', action.resultValue.lang)
                  .set('myLang', action.resultValue.settingList[0]);
    case ONCHANGE_SKIN_REDUCER:
      return state.set('disabled', true);
    case DISABLE_FALSE:
      return state.set('disabled', false);
    default:
      return state;
  }
};

export default messageComponentReducer;
