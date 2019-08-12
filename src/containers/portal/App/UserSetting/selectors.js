import { createSelector } from 'reselect';

const selectMessages = state => state.get('messagetab');
const selectLanguage = state => state.get('language');
const selectView = state => state.get('common');

const makeCheckList = () => createSelector(
  selectMessages,
  messageState => messageState.get('list'),
);

const loadSkin = () => createSelector(
  selectMessages,
  messageState => messageState.get('skincheck'),
);

const mySkin = () => createSelector(
  selectMessages,
  messageState => messageState.get('mySkin'),
);

const loadLang = () => createSelector(
  selectMessages,
  messageState => messageState.get('langcheck'),
);

const myLang = () => createSelector(
  selectMessages,
  messageState => messageState.get('myLang'),
);

const makeLanguage = () => createSelector(
  selectLanguage,
  languageState => languageState.get('locale'),
);

const disabled = () => createSelector(
  selectMessages,
  messageState => messageState.get('disabled'),
);

const currentView = () => createSelector(
  selectView,
  viewState => viewState.get('view'),
);

export {
  selectMessages,
  makeCheckList,
  loadSkin,
  mySkin,
  loadLang,
  myLang,
  makeLanguage,
  disabled,
  currentView,
};
