import {
  LOAD_LIST_SAGA,
  SKIN_CHANGE_SAGA,
  SAVE_MESSAGE_LIST_SAGA,
  SAVE_SETTING_SAGA,
  SAVE_ALL_SAGA,
  LOAD_SKIN_SAGA,
  SAVE_SKIN_SAGA,
  LOAD_LANG_SAGA,
  SAVE_LANG_SAGA,
  ONCHANGE_SKIN_REDUCER,
  DISABLE_FALSE,
} from './constants';

export const onLoadCheck = () => ({
  type: LOAD_LIST_SAGA,
});

export const skincheck = value => ({
  type: SKIN_CHANGE_SAGA,
  payload: {
    value,
  },
});

export const loadSkin = () => ({
  type: LOAD_SKIN_SAGA,
});

export const loadLang = () => ({
  type: LOAD_LANG_SAGA,
});

export const onSaveMessage = data => ({
  type: SAVE_MESSAGE_LIST_SAGA,
  data,
});

export const onSaveSkin = value => ({
  type: SAVE_SKIN_SAGA,
  value,
});

export const onSaveLang = value => ({
  type: SAVE_LANG_SAGA,
  value,
});

export const onSaveMessageALL = (data, stat) => ({
  type: SAVE_ALL_SAGA,
  payload: {
    data,
    stat,
  },
});

export const onLoadChange = () => ({
  type: ONCHANGE_SKIN_REDUCER,
});

export const onNotDisabled = () => ({
  type: DISABLE_FALSE,
});
