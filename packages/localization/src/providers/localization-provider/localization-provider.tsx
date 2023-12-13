import * as React from 'react';
import {FC, useState} from 'react';
import {IntlProvider, MissingTranslationError} from 'react-intl';
import deepmerge from 'deepmerge';
import {DEFAULT_LOCALES, DEFAULT_MESSAGES} from '../../i18n';
import {LocaleContext} from '../../contexts';
import {Locales, Messages} from '../../interfaces';

interface LocalizationProviderProps {
  customMessages?: Messages;
  customLocales?: Locales;
}

const LocalizationProvider: FC<LocalizationProviderProps> = ({
  children,
  customMessages,
  customLocales,
}) => {
  const LOCAL_STORAGE_LANG_KEY = 'NL_PORTAL_LANG';
  const savedLocale = localStorage.getItem(LOCAL_STORAGE_LANG_KEY);

  const messages = customMessages ? deepmerge(DEFAULT_MESSAGES, customMessages) : DEFAULT_MESSAGES;
  const locales = customLocales || DEFAULT_LOCALES;

  const savedLocaleIndex = Object.values(locales).findIndex(locale => locale === savedLocale);
  const localeToUse = locales[Object.keys(locales)[savedLocaleIndex !== -1 ? savedLocaleIndex : 0]];

  const [currentLocale, setCurrentLocale] = useState(localeToUse);
  const [supportedLocales] = useState(Object.values(locales));

  const hrefLang = currentLocale.toLocaleLowerCase().split('-')[0];
  const onError = (error: MissingTranslationError) => {
    if (error.code === 'MISSING_TRANSLATION') {
      console.log('Missing translation', error.message);
      return;
    }
    throw error;
  };

  localStorage.setItem(LOCAL_STORAGE_LANG_KEY, currentLocale);

  document.documentElement.lang = hrefLang;

  return (
    <LocaleContext.Provider value={{currentLocale, supportedLocales, setCurrentLocale, hrefLang}}>
      <IntlProvider locale={currentLocale} messages={messages[currentLocale]} onError={onError}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export {LocalizationProvider};
