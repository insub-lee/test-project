import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import koLocaleData from 'react-intl/locale-data/ko';
import zhLocaleData from 'react-intl/locale-data/zh';

import { DEFAULT_LOCALE } from './containers/common/LanguageProvider/constants';

import enTranslationMessages from './translations/en.json';
import koTranslationMessages from './translations/ko.json';
import cnTranslationMessages from './translations/zh.json';

addLocaleData(enLocaleData);
addLocaleData(koLocaleData);
addLocaleData(zhLocaleData);

export const appLocales = [
  'en',
  'ko',
  'zh',
];

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE ?
    formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages) : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE ?
      defaultFormattedMessages[key] : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  }, {});
};

export const translationMessages = {
  zh: formatTranslationMessages('zh', cnTranslationMessages),
  en: formatTranslationMessages('en', enTranslationMessages),
  ko: formatTranslationMessages('ko', koTranslationMessages),
};
